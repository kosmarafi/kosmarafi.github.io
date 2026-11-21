// Kosmara · Raydium CLMM: prepara la transaccion para abrir una posicion en un pool concentrado de Raydium.
// Se compila aparte (../sdk/kz-ray.js) y la web solo lo carga cuando abres un pool de Raydium.
// La web firma y envia los bytes que devuelve buildOpen (simula antes, firma con la wallet y envia por su RPC).
import "./buffer-shim.js";
import { Connection, PublicKey, TransactionMessage, TransactionInstruction, VersionedTransaction, ComputeBudgetProgram } from "@solana/web3.js";
import { Raydium, TxVersion, TickUtil, PoolUtils, CLMM_PROGRAM_ID, PoolInfoLayout, TickArrayLayout } from "@raydium-io/raydium-sdk-v2";
import Decimal from "decimal.js";
import BN from "bn.js";

const RAY_LUT = "AcL1Vo8oy1ULiavEcjSUcwfBSForXMudcZvDZy5nzJkU";
let RAY = null;
let RAY_OWNER = null;

async function load(rpc, owner) {
  if (RAY && RAY_OWNER === owner) return RAY;
  RAY = await Raydium.load({
    connection: new Connection(rpc, "confirmed"),
    owner: new PublicKey(owner),
    cluster: "mainnet",
    disableFeatureCheck: true,
    disableLoadToken: true,
    blockhashCommitment: "confirmed",
  });
  RAY_OWNER = owner;
  return RAY;
}

const units = (v, d) => new BN(Math.floor((+v || 0) * Math.pow(10, d)).toString());

/**
 * o = { rpc, owner, pool, lower, upper, amountA, amountB, decA, decB, slipBps }
 * Devuelve { bytes (transaccion v0 serializada, ya firmada por la clave del NFT), nftMint }.
 */
async function buildOpen(o) {
  const raydium = await load(o.rpc, o.owner);
  const data = await raydium.api.fetchPoolById({ ids: o.pool });
  const poolInfo = data && data[0];
  if (!poolInfo || poolInfo.type !== "Concentrated") throw new Error("Este pool de Raydium no es de liquidez concentrada");
  const tk = (p) => TickUtil.getPriceAndTick({ price: new Decimal(p), mintADecimals: poolInfo.mintA.decimals, mintBDecimals: poolInfo.mintB.decimals, zeroForOne: true, tickSpacing: poolInfo.config.tickSpacing }).tick;
  const t1 = tk(o.lower);
  const t2 = tk(o.upper);
  const tickLower = Math.min(t1, t2);
  const tickUpper = Math.max(t1, t2);
  if (tickLower === tickUpper) throw new Error("Rango de precios demasiado estrecho para este pool");
  const epochInfo = await raydium.fetchEpochInfo();
  const slip = Math.max(1, Math.round(o.slipBps || 100)) / 10000;
  const maxA = units(o.amountA, o.decA);
  const maxB = units(o.amountB, o.decB);

  // Se parte del token A; si para eso haria falta mas B del que hay, se parte del B.
  let base = "MintA";
  let baseAmount = maxA;
  let otherMax = maxB;
  if (maxA.gtn(0)) {
    const r = await PoolUtils.getLiquidityAmountOutFromAmountIn({ poolInfo, slippage: 0, inputA: true, tickUpper, tickLower, amount: maxA, add: true, amountHasFee: true, epochInfo });
    const needB = new BN(r.amountSlippageB.amount.toString());
    if (needB.gt(maxB)) {
      base = "MintB";
      baseAmount = maxB;
      otherMax = maxA;
    }
  } else {
    base = "MintB";
    baseAmount = maxB;
    otherMax = maxA;
  }
  // Maximo del otro token: lo que hay disponible (el programa solo toma lo necesario para el rango).
  const withSlip = otherMax;

  // Con cambio delante (una sola transacción): NFT de Token-2022 con los datos dentro del propio NFT, que ocupa menos.
  const res = await raydium.clmm.openPositionFromBase({
    ...(o.pre && o.pre.length ? { nft2022: true } : {}),
    poolInfo,
    tickUpper,
    tickLower,
    base,
    ownerInfo: { useSOLBalance: true },
    baseAmount,
    otherAmountMax: withSlip,
    txVersion: TxVersion.V0,
    computeBudgetConfig: { units: 600000, microLamports: 20000 },
  });
  const nftMint = res.extInfo && res.extInfo.nftMint ? res.extInfo.nftMint.toBase58() : "";
  let tx = res.transaction;
  if (o.pre && o.pre.length) tx = await withPre(raydium.connection, tx, o.pre, o.alts || [], o.owner);
  if (res.signers && res.signers.length) tx.sign(res.signers);
  let bytes;
  try { bytes = tx.serialize(); } catch (e) { bytes = null; }
  if (!bytes || bytes.length > 1232) {
    let n = 0;
    try { n = tx.message.serialize().length + 1 + 64 * tx.message.header.numRequiredSignatures; } catch (e) {}
    const er = new Error("La transacción es demasiado grande" + (n ? " (" + n + " bytes)" : ""));
    er.kzBig = true;
    throw er;
  }
  return { bytes, nftMint };
}

/* Mete el cambio de Jupiter (y la comisión) delante de la apertura de Raydium en UNA transacción:
   se reconstruyen las instrucciones de Raydium, se añaden las del cambio y se vuelve a compilar con las tablas de ambos. */
async function withPre(conn, tx, pre, alts, owner) {
  const msg = tx.message;
  const luts = [];
  for (const l of msg.addressTableLookups || []) { const r = await conn.getAddressLookupTable(l.accountKey); if (r.value) luts.push(r.value); }
  const dec = TransactionMessage.decompile(msg, { addressLookupTableAccounts: luts });
  const cb = ComputeBudgetProgram.programId.toBase58();
  const rest = dec.instructions.filter((i) => i.programId.toBase58() !== cb);
  const jup = pre.map((ix) => new TransactionInstruction({ programId: new PublicKey(ix.programId), keys: ix.accounts.map((a) => ({ pubkey: new PublicKey(a.pubkey), isSigner: a.isSigner, isWritable: a.isWritable })), data: Buffer.from(ix.data, "base64") }));
  // tablas de Jupiter + la tabla pública de Raydium (programas y cuentas comunes)
  for (const a of alts.concat([RAY_LUT])) { try { const r = await conn.getAddressLookupTable(new PublicKey(a)); if (r.value && !luts.some((x) => x.key.equals(r.value.key))) luts.push(r.value); } catch (e) {} }
  const ixs = [ComputeBudgetProgram.setComputeUnitLimit({ units: 1100000 }), ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 20000 })].concat(jup, rest);
  const m2 = new TransactionMessage({ payerKey: new PublicKey(owner), recentBlockhash: dec.recentBlockhash, instructions: ixs }).compileToV0Message(luts);
  return new VersionedTransaction(m2);
}


/* ---------- Posiciones de Raydium de una wallet (para el Portafolio) ---------- */
const POS = {}; // nftMint -> { pos, poolInfo } para cerrar o cobrar despues
const Q64 = 18446744073709551616;
const big = (v) => BigInt(v && v.toString ? v.toString() : v || 0);
const M128 = (1n << 128n) - 1n;
const sub128 = (a, b) => (a - b) & M128;

async function usdPrices(mints) {
  const P = {};
  try {
    const j = await (await fetch("https://lite-api.jup.ag/price/v3?ids=" + mints.join(","))).json();
    mints.forEach((m) => { const v = j && j[m] && j[m].usdPrice; if (v > 0) P[m] = +v; });
  } catch (e) {}
  return P;
}

function tickArrayAddr(poolId, start) {
  const b = new Uint8Array(4);
  new DataView(b.buffer).setInt32(0, start, false);
  return PublicKey.findProgramAddressSync([Buffer.from("tick_array"), new PublicKey(poolId).toBuffer(), Buffer.from(b)], new PublicKey(CLMM_PROGRAM_ID))[0];
}

// Comisiones sin cobrar: misma cuenta que hace el programa (crecimiento dentro del rango desde la ultima vez).
async function pendingFees(conn, pos, st) {
  const sp = st.tickSpacing, size = sp * 60;
  const startOf = (t) => Math.floor(t / size) * size;
  const [aL, aU] = [tickArrayAddr(pos.poolId, startOf(pos.tickLower)), tickArrayAddr(pos.poolId, startOf(pos.tickUpper))];
  const acc = await conn.getMultipleAccountsInfo([aL, aU]);
  if (!acc[0] || !acc[1]) return null;
  const tl = TickArrayLayout.decode(acc[0].data).ticks[(pos.tickLower - startOf(pos.tickLower)) / sp];
  const tu = TickArrayLayout.decode(acc[1].data).ticks[(pos.tickUpper - startOf(pos.tickUpper)) / sp];
  const cur = st.tickCurrent;
  const one = (g, lo, up, last, owed) => {
    const below = cur >= pos.tickLower ? lo : sub128(g, lo);
    const above = cur < pos.tickUpper ? up : sub128(g, up);
    const inside = sub128(sub128(g, below), above);
    return big(owed) + (big(pos.liquidity) * sub128(inside, last)) / (1n << 64n);
  };
  return {
    a: one(big(st.feeGrowthGlobalX64A), big(tl.feeGrowthOutsideX64A), big(tu.feeGrowthOutsideX64A), big(pos.feeGrowthInsideLastX64A), pos.tokenFeesOwedA),
    b: one(big(st.feeGrowthGlobalX64B), big(tl.feeGrowthOutsideX64B), big(tu.feeGrowthOutsideX64B), big(pos.feeGrowthInsideLastX64B), pos.tokenFeesOwedB),
  };
}

async function positions(o) {
  const raydium = await load(o.rpc, o.owner);
  const list = (await raydium.clmm.getOwnerPositionInfo({ programId: CLMM_PROGRAM_ID })) || [];
  if (!list.length) return [];
  const ids = Array.from(new Set(list.map((p) => p.poolId.toBase58())));
  const infos = await raydium.api.fetchPoolById({ ids: ids.join(",") });
  const INFO = {};
  (infos || []).forEach((p) => p && (INFO[p.id] = p));
  const accs = await raydium.connection.getMultipleAccountsInfo(ids.map((i) => new PublicKey(i)));
  const ST = {};
  ids.forEach((id, i) => { try { if (accs[i]) ST[id] = PoolInfoLayout.decode(accs[i].data); } catch (e) {} });
  const mints = [];
  ids.forEach((id) => { const p = INFO[id]; if (p) mints.push(p.mintA.address, p.mintB.address); });
  const PX = await usdPrices(Array.from(new Set(mints)));
  const out = [];
  for (const pos of list) {
    const id = pos.poolId.toBase58(), p = INFO[id], st = ST[id];
    if (!p || !st) continue;
    const dA = p.mintA.decimals, dB = p.mintB.decimals, scale = Math.pow(10, dA - dB);
    const sp = Number(big(st.sqrtPriceX64)) / Q64, sa = Math.pow(1.0001, pos.tickLower / 2), sb = Math.pow(1.0001, pos.tickUpper / 2), L = Number(big(pos.liquidity));
    let rA = 0, rB = 0;
    if (sp <= sa) rA = L * (1 / sa - 1 / sb);
    else if (sp >= sb) rB = L * (sb - sa);
    else { rA = L * (1 / sp - 1 / sb); rB = L * (sp - sa); }
    const price = sp * sp * scale, mA = p.mintA.address, mB = p.mintB.address;
    let pA = PX[mA], pB = PX[mB];
    if (!pA && pB) pA = pB * price;
    if (!pB && pA && price > 0) pB = pA / price;
    const val = (a, b) => (pA && pB ? (a / Math.pow(10, dA)) * pA + (b / Math.pow(10, dB)) * pB : null);
    let pend = null;
    try { const f = await pendingFees(raydium.connection, pos, st); if (f) pend = val(Number(f.a), Number(f.b)); } catch (e) {}
    const usd = val(rA, rB);
    let est = null;
    try {
      const lp = Number(big(st.liquidity)), inRange = sp > sa && sp < sb;
      if (!inRange) est = { out: true };
      else if (usd > 0 && lp > 0) {
        const share = L / lp, rate = p.feeRate || 0, w = (k) => (p[k] && p[k].volume != null ? ((p[k].volume * rate + (p[k].rewardApr ? 0 : 0)) * share / usd) * 100 : null);
        const d = w("day"), wk = w("week"), mo = w("month");
        est = { "5m": d != null ? d / 288 : null, "15m": d != null ? d / 96 : null, "30m": d != null ? d / 48 : null, "1h": d != null ? d / 24 : null, "4h": d != null ? d / 6 : null, "8h": d != null ? d / 3 : null, "24h": d, "7d": wk, "30d": mo, "365d": mo != null ? (mo * 365) / 30 : null };
      }
    } catch (e) {}
    const mint = pos.nftMint.toBase58();
    POS[mint] = { pos, poolInfo: p };
    out.push({
      dex: "Raydium", pair: (p.mintA.symbol === "WSOL" ? "SOL" : p.mintA.symbol) + "/" + (p.mintB.symbol === "WSOL" ? "SOL" : p.mintB.symbol),
      symA: p.mintA.symbol === "WSOL" ? "SOL" : p.mintA.symbol, symB: p.mintB.symbol === "WSOL" ? "SOL" : p.mintB.symbol,
      fee: String(+(p.feeRate * 100).toFixed(4)), price, lo: sa * sa * scale, hi: sb * sb * scale, usd,
      amtA: rA / Math.pow(10, dA), amtB: rB / Math.pow(10, dB), pend, harv: null, pnl: null, pnlPct: null, entry: null, dur: "—", est, est24: est && est["24h"],
      mint, pool: id,
    });
  }
  return out;
}

// Cerrar (retira todo, cobra comisiones y quema el NFT) o cobrar solo las comisiones (retira 0 de liquidez).
async function buildManage(o) {
  const raydium = await load(o.rpc, o.owner);
  const c = POS[o.mint];
  if (!c) throw new Error("No encuentro esta posición de Raydium; recarga el Portafolio");
  const close = o.kind === "close";
  const slip = Math.max(1, Math.round(o.slipBps || 100)) / 10000;
  const minOf = (v) => new BN(Math.floor(Math.max(0, v) * (1 - slip)).toString());
  const res = await raydium.clmm.decreaseLiquidity({
    poolInfo: c.poolInfo,
    ownerPosition: c.pos,
    ownerInfo: { useSOLBalance: true, closePosition: close },
    liquidity: close ? c.pos.liquidity : new BN(0),
    amountMinA: close ? minOf((o.amtA || 0) * Math.pow(10, c.poolInfo.mintA.decimals)) : new BN(0),
    amountMinB: close ? minOf((o.amtB || 0) * Math.pow(10, c.poolInfo.mintB.decimals)) : new BN(0),
    txVersion: TxVersion.V0,
    computeBudgetConfig: { units: 400000, microLamports: 20000 },
  });
  const tx = res.transaction;
  if (res.signers && res.signers.length) tx.sign(res.signers);
  return { bytes: tx.serialize() };
}

window.kzRay = { ready: true, version: "0.2.1", buildOpen, positions, buildManage };
