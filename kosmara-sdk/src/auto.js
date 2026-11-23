// Auto-composición de Orca: activa o quita la automatización de una posición.
// Usa el programa de automatizaciones de Orca (wpAuto…). Su keeper cobra las comisiones,
// hace el swap y las reinvierte en la misma posición sin que el usuario firme cada vez.
// Activar = delegar el NFT de la posición a la autoridad del programa + CreateAutomation.
// Quitar  = revocar la delegación + RemoveAutomations (devuelve el depósito y lo que haya en tránsito).
import { address, getAddressEncoder, getProgramDerivedAddress, AccountRole } from "@solana/kit";
import { findAssociatedTokenPda, getCreateAssociatedTokenIdempotentInstruction, getCloseAccountInstruction } from "@solana-program/token";
import { fetchPosition, fetchWhirlpool } from "@orca-so/whirlpools-client";

export const AUTO_PROGRAM = address("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8");
const WHIRLPOOL = address("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc");
const TOKEN = address("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const TOKEN22 = address("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
const SYSTEM = address("11111111111111111111111111111111");
const ATA_PROGRAM = address("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
const WSOL = "So11111111111111111111111111111111111111112";
// Los mismos valores que pone Orca: cada 12 h, si hay al menos ~5 $ de cada token pendiente.
export const AUTO_INTERVAL = 43200;
export const AUTO_MIN_USD = 5;

const enc = getAddressEncoder();
const utf8 = (s) => new TextEncoder().encode(s);
const pda = async (prog, seeds) => (await getProgramDerivedAddress({ programAddress: prog, seeds }))[0];

export const globalConfigPda = () => pda(AUTO_PROGRAM, [utf8("global_config")]);
export const automationPda = (ta, pos, idx = 0) => pda(AUTO_PROGRAM, [utf8("automation"), enc.encode(ta), enc.encode(pos), new Uint8Array([idx])]);
export const authorityPda = (ta) => pda(AUTO_PROGRAM, [utf8("automation-authority"), enc.encode(ta)]);
export const positionPda = (mint) => pda(WHIRLPOOL, [utf8("position"), enc.encode(mint)]);

const le = (v, bytes) => {
  const out = new Uint8Array(bytes);
  let x = BigInt(v);
  for (let i = 0; i < bytes; i++) {
    out[i] = Number(x & 0xffn);
    x >>= 8n;
  }
  return out;
};
const cat = (...parts) => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  parts.forEach((p) => {
    out.set(p, o);
    o += p.length;
  });
  return out;
};
const acc = (a, role, signer) => (signer ? { address: a, role, signer } : { address: a, role });

/**
 * Todo lo que hace falta de una posición para (des)activar la auto-composición.
 * rpc: cliente de @solana/kit. owner: dirección. mint: NFT de la posición.
 */
export async function autoCtx(rpc, owner, mint) {
  owner = address(owner);
  mint = address(mint);
  const tas = (await rpc.getTokenAccountsByOwner(owner, { mint }, { encoding: "jsonParsed" }).send()).value;
  const hold = tas.find((t) => t.account.data.parsed.info.tokenAmount.amount === "1");
  if (!hold) throw new Error("No encuentro el NFT de esta posición en tu wallet");
  const ta = address(String(hold.pubkey));
  const taProg = address(String(hold.account.owner));
  const pos = await positionPda(mint);
  const p = await fetchPosition(rpc, pos);
  const w = await fetchWhirlpool(rpc, p.data.whirlpool);
  const mA = w.data.tokenMintA;
  const mB = w.data.tokenMintB;
  const ms = (await rpc.getMultipleAccounts([mA, mB], { encoding: "jsonParsed" }).send()).value;
  const progA = address(String(ms[0].owner));
  const progB = address(String(ms[1].owner));
  const decA = Number(ms[0].data.parsed.info.decimals);
  const decB = Number(ms[1].data.parsed.info.decimals);
  const auto = await automationPda(ta, pos, 0);
  const authority = await authorityPda(ta);
  const [bA] = await findAssociatedTokenPda({ owner: auto, mint: mA, tokenProgram: progA });
  const [bB] = await findAssociatedTokenPda({ owner: auto, mint: mB, tokenProgram: progB });
  const ai = (await rpc.getAccountInfo(auto, { encoding: "base64" }).send()).value;
  const delegate = hold.account.data.parsed.info.delegate || null;
  const sp = Number(w.data.sqrtPrice) / 18446744073709551616;
  return {
    owner, mint, ta, taProg, pos, pool: p.data.whirlpool, mA, mB, progA, progB, decA, decB,
    auto, authority, bA, bB, active: !!ai, delegate, poolPrice: sp * sp * Math.pow(10, decA - decB),
  };
}

/**
 * Instrucciones para activar. c = autoCtx(...), signer = firmante de la wallet (noop).
 * prices = { [mint]: usd } para fijar el mínimo de ~5 $ de cada token.
 */
export async function autoOnIxs(c, signer, prices = {}, opts = {}) {
  const minUsd = opts.minUsd || AUTO_MIN_USD;
  const interval = opts.interval || AUTO_INTERVAL;
  let pA = prices[String(c.mA)];
  let pB = prices[String(c.mB)];
  if (!pA && pB) pA = pB * c.poolPrice;
  if (!pB && pA && c.poolPrice > 0) pB = pA / c.poolPrice;
  if (!pA || !pB) throw new Error("No tengo el precio de los tokens para fijar el mínimo de reinversión");
  const raw = (usd, px, dec) => BigInt(Math.max(1, Math.ceil((usd / px) * Math.pow(10, dec))));
  const thrA = raw(minUsd, pA, c.decA);
  const thrB = raw(minUsd, pB, c.decB);
  const next = Math.floor(Date.now() / 1000) + interval;
  const cfg = await globalConfigPda();

  // ApproveChecked (13): delega 1 NFT a la autoridad del programa de Orca.
  const approve = {
    programAddress: c.taProg,
    accounts: [acc(c.ta, AccountRole.WRITABLE), acc(c.mint, AccountRole.READONLY), acc(c.authority, AccountRole.READONLY), acc(signer.address, AccountRole.READONLY_SIGNER, signer)],
    data: cat(new Uint8Array([13]), le(1, 8), new Uint8Array([0])),
  };
  // CreateAutomation (2): acción 1 (cobrar, swap y reinvertir), índice 0,
  // condiciones: próxima ejecución + intervalo, mínimo de A, mínimo de B.
  const create = {
    programAddress: AUTO_PROGRAM,
    accounts: [
      acc(signer.address, AccountRole.WRITABLE_SIGNER, signer),
      acc(c.auto, AccountRole.WRITABLE),
      acc(c.bA, AccountRole.WRITABLE),
      acc(c.bB, AccountRole.WRITABLE),
      acc(c.pos, AccountRole.READONLY),
      acc(c.ta, AccountRole.READONLY),
      acc(c.pool, AccountRole.READONLY),
      acc(cfg, AccountRole.READONLY),
      acc(c.mA, AccountRole.READONLY),
      acc(c.mB, AccountRole.READONLY),
      acc(c.progA, AccountRole.READONLY),
      acc(c.progB, AccountRole.READONLY),
      acc(SYSTEM, AccountRole.READONLY),
      acc(ATA_PROGRAM, AccountRole.READONLY),
    ],
    data: cat(new Uint8Array([2, 1, 0, 1]), le(next, 8), new Uint8Array([1]), le(interval, 4), new Uint8Array([2]), le(thrA, 8), new Uint8Array([3]), le(thrB, 8)),
  };
  return { ixs: [approve, create], thrA, thrB, next };
}

/** Instrucciones para quitar la auto-composición (y recuperar el depósito). */
export async function autoOffIxs(c, signer) {
  const [uA] = await findAssociatedTokenPda({ owner: c.owner, mint: c.mA, tokenProgram: c.progA });
  const [uB] = await findAssociatedTokenPda({ owner: c.owner, mint: c.mB, tokenProgram: c.progB });
  const ixs = [];
  // Revoke (5): quita la delegación del NFT.
  ixs.push({ programAddress: c.taProg, accounts: [acc(c.ta, AccountRole.WRITABLE), acc(signer.address, AccountRole.READONLY_SIGNER, signer)], data: new Uint8Array([5]) });
  ixs.push(getCreateAssociatedTokenIdempotentInstruction({ payer: signer, ata: uA, owner: c.owner, mint: c.mA, tokenProgram: c.progA }));
  ixs.push(getCreateAssociatedTokenIdempotentInstruction({ payer: signer, ata: uB, owner: c.owner, mint: c.mB, tokenProgram: c.progB }));
  ixs.push({
    programAddress: AUTO_PROGRAM,
    accounts: [
      acc(signer.address, AccountRole.WRITABLE_SIGNER, signer),
      acc(uA, AccountRole.WRITABLE),
      acc(uB, AccountRole.WRITABLE),
      acc(c.ta, AccountRole.READONLY),
      acc(c.mA, AccountRole.WRITABLE),
      acc(c.mB, AccountRole.WRITABLE),
      acc(c.progA, AccountRole.READONLY),
      acc(c.progB, AccountRole.READONLY),
      acc(SYSTEM, AccountRole.READONLY),
      acc(ATA_PROGRAM, AccountRole.READONLY),
      acc(c.auto, AccountRole.WRITABLE),
      acc(c.bA, AccountRole.WRITABLE),
      acc(c.bB, AccountRole.WRITABLE),
    ],
    data: new Uint8Array([3]),
  });
  // Si uno de los tokens es SOL, lo devuelto llega como wSOL: se desenvuelve.
  if (String(c.mA) === WSOL) ixs.push(getCloseAccountInstruction({ account: uA, destination: c.owner, owner: signer }, { programAddress: c.progA }));
  if (String(c.mB) === WSOL) ixs.push(getCloseAccountInstruction({ account: uB, destination: c.owner, owner: signer }, { programAddress: c.progB }));
  return ixs;
}

/**
 * Qué posiciones tienen la auto-composición activa. items = [{ mint, pos }] (pos = cuenta de la posición).
 * Devuelve { [mint]: { next } } solo para las activas. next = próxima ejecución (segundos unix).
 */
export async function autoStatus(rpc, owner, items) {
  owner = address(owner);
  const cands = [];
  for (const it of items) {
    for (const prog of [TOKEN, TOKEN22]) {
      const [ta] = await findAssociatedTokenPda({ owner, mint: address(it.mint), tokenProgram: prog });
      cands.push({ mint: it.mint, auto: await automationPda(ta, address(it.pos), 0) });
    }
  }
  const out = {};
  for (let i = 0; i < cands.length; i += 100) {
    const part = cands.slice(i, i + 100);
    const v = (await rpc.getMultipleAccounts(part.map((x) => x.auto), { encoding: "base64" }).send()).value;
    part.forEach((x, j) => {
      if (!v[j] || String(v[j].owner) !== String(AUTO_PROGRAM)) return;
      const d = Uint8Array.from(atob(v[j].data[0]), (ch) => ch.charCodeAt(0));
      let next = null;
      // conditionsData empieza en el byte 98: [1][i64 próxima ejecución]
      if (d[98] === 1) {
        let t = 0n;
        for (let k = 7; k >= 0; k--) t = (t << 8n) | BigInt(d[99 + k]);
        next = Number(t);
      }
      out[x.mint] = { next };
    });
  }
  return out;
}
