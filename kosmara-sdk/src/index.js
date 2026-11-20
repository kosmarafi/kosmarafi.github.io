// Kosmara SDK: abre posiciones en Orca Whirlpools y lee las posiciones de una wallet.
// Se compila con Vite a ../sdk/kz-sdk.js y lo carga la web (index.html) como modulo.
// La web llama a window.kzSdk.openPosition / positions / closePosition / harvest.
import { openPositionInstructions, fetchPositionsForOwner, closePositionInstructions, harvestPositionInstructions } from "@orca-so/whirlpools";
import { fetchAllWhirlpool } from "@orca-so/whirlpools-client";
import {
  createSolanaRpcFromTransport,
  createDefaultRpcTransport,
  address,
  createNoopSigner,
  pipe,
  createTransactionMessage,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  partiallySignTransactionMessageWithSigners,
  getTransactionEncoder,
} from "@solana/kit";

// El SDK de Orca usa Buffer.from() de Node en dos funciones (posiciones agrupadas).
// En el navegador no existe, asi que damos un sustituto minimo.
if (typeof globalThis.Buffer === "undefined") {
  globalThis.Buffer = { from: (x) => (typeof x === "string" ? new TextEncoder().encode(x) : Uint8Array.from(x)) };
}

const COMPUTE_BUDGET = address("ComputeBudget111111111111111111111111111111");
const STABLES = {
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: "USDT",
};
const MAX_TX_BYTES = 1232;
const PRIORITY_MICROLAMPORTS = 20000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// RPC con reintentos: si el proveedor responde 429 (demasiadas peticiones), espera y repite.
function createSolanaRpc(url) {
  const base = createDefaultRpcTransport({ url });
  const transport = async (req) => {
    for (let i = 0; ; i++) {
      try {
        return await base(req);
      } catch (e) {
        const code = e && e.context && e.context.statusCode;
        const busy = code === 429 || (code >= 500 && code < 600) || /8100002/.test(String(e && e.message));
        if (!busy || i >= 5) throw e;
        await sleep(400 * Math.pow(2, i) + Math.random() * 200);
      }
    }
  };
  return createSolanaRpcFromTransport(transport);
}

// Instruccion del programa Compute Budget: etiqueta + entero little-endian.
function budgetIx(tag, value, bytes) {
  const data = new Uint8Array(1 + bytes);
  data[0] = tag;
  let v = BigInt(value);
  for (let i = 0; i < bytes; i++) {
    data[1 + i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return { programAddress: COMPUTE_BUDGET, accounts: [], data };
}

function toUnits(amount, decimals) {
  const n = Math.floor((+amount || 0) * Math.pow(10, decimals));
  return BigInt(n > 0 ? n : 0);
}

async function confirm(rpc, signature) {
  for (let i = 0; i < 30; i++) {
    await sleep(2000);
    let st = null;
    try {
      st = (await rpc.getSignatureStatuses([signature]).send()).value[0];
    } catch (e) {
      continue;
    }
    if (!st) continue;
    if (st.err) throw new Error("La red rechazó la transacción: " + JSON.stringify(st.err, (k, v) => (typeof v === "bigint" ? String(v) : v)));
    if (st.confirmationStatus === "confirmed" || st.confirmationStatus === "finalized") return true;
  }
  return false;
}

/**
 * Abre una posicion de liquidez concentrada en un pool de Orca.
 * El programa de Orca acuna el NFT de la posicion directamente en la wallet que firma.
 * o = { rpc, pool, owner, amountA, amountB, decA, decB, lower, upper, slipBps, provider }
 *   amountA / amountB: maximo de cada token a depositar, en unidades normales (no lamports)
 *   lower / upper: precios del rango (token B por token A)
 *   provider: window.phantom.solana (firma y envia)
 */
async function openPosition(o) {
  if (!o || !o.provider || !o.owner) throw new Error("Conecta tu wallet primero");
  const V = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!V) throw new Error("No se cargó la librería de Solana");
  const tokenMaxA = toUnits(o.amountA, o.decA);
  const tokenMaxB = toUnits(o.amountB, o.decB);
  if (tokenMaxA <= 0n && tokenMaxB <= 0n) throw new Error("Introduce una cantidad");
  if (!(o.lower > 0) || !(o.upper > o.lower)) throw new Error("Rango de precios no válido");

  const rpc = createSolanaRpc(o.rpc);
  const funder = createNoopSigner(address(o.owner));
  const res = await openPositionInstructions(rpc, address(o.pool), { tokenMaxA, tokenMaxB }, o.lower, o.upper, {
    slippageToleranceBps: Math.max(1, Math.round(o.slipBps || 100)),
    funder,
  });

  const blockhash = (await rpc.getLatestBlockhash().send()).value;
  const build = async (instructions) => {
    const message = pipe(
      createTransactionMessage({ version: 0 }),
      (m) => setTransactionMessageFeePayerSigner(funder, m),
      (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
      (m) => appendTransactionMessageInstructions(instructions, m),
    );
    // Firma con las claves temporales que genera el SDK (el mint del NFT); la wallet firma despues.
    const partial = await partiallySignTransactionMessageWithSigners(message);
    return new Uint8Array(getTransactionEncoder().encode(partial));
  };
  // Con comision de prioridad (mejora la entrada en bloque). Si la transaccion
  // no cabe en el limite de Solana (1232 bytes), se envia sin ella.
  let bytes = await build([budgetIx(3, PRIORITY_MICROLAMPORTS, 8)].concat(res.instructions));
  if (bytes.length > MAX_TX_BYTES) bytes = await build(res.instructions);
  if (bytes.length > MAX_TX_BYTES) throw new Error("La transacción es demasiado grande para enviarla de una vez (" + bytes.length + " bytes)");

  const sent = await o.provider.signAndSendTransaction(V.deserialize(bytes));
  const signature = (sent && sent.signature) || String(sent);
  const confirmed = await confirm(rpc, signature);
  return {
    signature,
    confirmed,
    positionMint: String(res.positionMint),
    initializationCost: Number(res.initializationCost) / 1e9,
    bytes: bytes.length,
  };
}


const b64 = (u8) => {
  let s = "";
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return btoa(s);
};

async function rpcCall(url, method, params) {
  // Reintenta si el RPC pide calma (429): el plan gratuito limita peticiones por segundo.
  for (let i = 0; ; i++) {
    const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }) });
    if ((r.status === 429 || r.status >= 500) && i < 5) {
      await sleep(400 * Math.pow(2, i) + Math.random() * 200);
      continue;
    }
    const txt = await r.text();
    let j;
    try {
      j = JSON.parse(txt);
    } catch (e) {
      throw new Error("El RPC respondió: " + txt.slice(0, 60));
    }
    if (j.error) throw new Error(j.error.message || "Error del RPC");
    return j.result;
  }
}

// Monta la transaccion, la simula y la pasa a la wallet para firmar.
// Simular antes evita enviar algo que fallaria y reduce los avisos rojos de la wallet.
async function sendIxs(o, instructions) {
  const V = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!V) throw new Error("No se cargó la librería de Solana");
  const rpc = createSolanaRpc(o.rpc);
  const payer = o.signer || createNoopSigner(address(o.owner));
  const blockhash = (await rpc.getLatestBlockhash().send()).value;
  const build = async (ixs) => {
    const message = pipe(
      createTransactionMessage({ version: 0 }),
      (m) => setTransactionMessageFeePayerSigner(payer, m),
      (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
      (m) => appendTransactionMessageInstructions(ixs, m),
    );
    const partial = await partiallySignTransactionMessageWithSigners(message);
    return new Uint8Array(getTransactionEncoder().encode(partial));
  };
  let bytes = await build([budgetIx(3, PRIORITY_MICROLAMPORTS, 8)].concat(instructions));
  if (bytes.length > MAX_TX_BYTES) bytes = await build(instructions);
  if (bytes.length > MAX_TX_BYTES) throw new Error("La transacción es demasiado grande (" + bytes.length + " bytes)");

  const sim = await rpcCall(o.rpc, "simulateTransaction", [b64(bytes), { encoding: "base64", sigVerify: false, replaceRecentBlockhash: true, commitment: "confirmed" }]);
  const sv = sim && (sim.value || sim);
  if (sv && sv.err) {
    const logs = (sv.logs || []).filter((l) => /Error|error|failed/.test(l)).slice(-2).join(" · ");
    throw new Error("La simulación falló, no se ha enviado nada. " + (logs || JSON.stringify(sv.err)));
  }

  const tx = V.deserialize(bytes);
  let signature;
  if (o.provider.signTransaction) {
    const signed = await o.provider.signTransaction(tx);
    signature = await rpcCall(o.rpc, "sendTransaction", [b64(signed.serialize()), { encoding: "base64", skipPreflight: false, preflightCommitment: "confirmed", maxRetries: 3 }]);
  } else {
    const sent = await o.provider.signAndSendTransaction(tx);
    signature = (sent && sent.signature) || String(sent);
  }
  const confirmed = await confirm(rpc, signature);
  return { signature, confirmed };
}

/**
 * Cierra una posicion: retira toda la liquidez, cobra comisiones y recompensas,
 * y quema el NFT (te devuelve el alquiler de la cuenta).
 * o = { rpc, owner, mint, slipBps, provider }
 */
async function closePosition(o) {
  if (!o || !o.provider || !o.owner) throw new Error("Conecta tu wallet primero");
  const rpc = createSolanaRpc(o.rpc);
  // Un solo firmante para la wallet: si hubiera dos objetos con la misma direccion, @solana/kit lo rechaza.
  const signer = createNoopSigner(address(o.owner));
  const res = await closePositionInstructions(rpc, address(o.mint), {
    slippageToleranceBps: Math.max(1, Math.round(o.slipBps || 100)),
    authority: signer,
  });
  return sendIxs(Object.assign({}, o, { signer }), res.instructions);
}

/**
 * Cobra las comisiones y recompensas pendientes sin tocar la liquidez.
 * o = { rpc, owner, mint, provider }
 */
async function harvest(o) {
  if (!o || !o.provider || !o.owner) throw new Error("Conecta tu wallet primero");
  const rpc = createSolanaRpc(o.rpc);
  const signer = createNoopSigner(address(o.owner));
  const res = await harvestPositionInstructions(rpc, address(o.mint), { authority: signer });
  return sendIxs(Object.assign({}, o, { signer }), res.instructions);
}

const YIELD_WINDOWS = ["5m", "15m", "30m", "1h", "4h", "8h", "24h", "7d", "30d", "365d"];

async function poolMeta(addr) {
  try {
    const r = await fetch("https://api.orca.so/v2/solana/pools/" + addr + "?stats=" + YIELD_WINDOWS.join(","));
    if (!r.ok) return null;
    const j = await r.json();
    const d = j && j.data ? j.data : j;
    return Array.isArray(d) ? d[0] : d;
  } catch (e) {
    return null;
  }
}


const WHIRLPOOL_PROGRAM = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";
const TOKEN_PROGRAMS = { TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: 1, TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb: 1 };
const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function b58decode(str) {
  const bytes = [0];
  for (const ch of str) {
    let carry = B58.indexOf(ch);
    if (carry < 0) return new Uint8Array(0);
    for (let i = 0; i < bytes.length; i++) {
      carry += bytes[i] * 58;
      bytes[i] = carry & 0xff;
      carry >>= 8;
    }
    while (carry) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }
  for (const ch of str) {
    if (ch !== "1") break;
    bytes.push(0);
  }
  return new Uint8Array(bytes.reverse());
}

// Prefijo de 8 bytes que identifica cada instruccion del programa de Orca (Anchor).
let DISC = null;
async function discriminators() {
  if (DISC) return DISC;
  const kinds = {
    increase_liquidity: "inc", increase_liquidity_v2: "inc",
    decrease_liquidity: "dec", decrease_liquidity_v2: "dec",
    collect_fees: "fee", collect_fees_v2: "fee",
    collect_reward: "rew", collect_reward_v2: "rew",
  };
  DISC = {};
  for (const name of Object.keys(kinds)) {
    const h = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode("global:" + name)));
    DISC[Array.from(h.slice(0, 8)).join(",")] = kinds[name];
  }
  return DISC;
}

// Precio (B por A, en unidades crudas) que explica un deposito o retirada de a y b dentro del rango.
function priceFromAmounts(a, b, sa, sb) {
  if (a > 0 && b > 0) {
    const target = b / a;
    let lo = sa;
    let hi = sb;
    for (let i = 0; i < 80; i++) {
      const sp = (lo + hi) / 2;
      const r = (sp - sa) / (1 / sp - 1 / sb);
      if (r < target) lo = sp;
      else hi = sp;
    }
    const sp = (lo + hi) / 2;
    return sp * sp;
  }
  if (a > 0) return sa * sa;
  if (b > 0) return sb * sb;
  return null;
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const k = i++;
        try {
          out[k] = await fn(items[k]);
        } catch (e) {
          out[k] = null;
        }
      }
    }),
  );
  return out;
}

/**
 * Historial de una posicion a partir de sus transacciones:
 * depositos, retiradas y cobros (en unidades crudas de cada token) y fecha de apertura.
 */
async function history(url, posAddr, vaultA, vaultB, rewardVaults) {
  const disc = await discriminators();
  let sigs = [];
  let before;
  for (let page = 0; page < 3; page++) {
    const r = await rpcCall(url, "getSignaturesForAddress", [posAddr, Object.assign({ limit: 1000 }, before ? { before } : {})]);
    sigs = sigs.concat(r || []);
    if (!r || r.length < 1000) break;
    before = r[r.length - 1].signature;
  }
  const opened = sigs.length ? sigs[sigs.length - 1].blockTime : null;
  let ok = sigs.filter((x) => !x.err);
  // Si hay muchas, nos quedamos con las mas recientes y las mas antiguas (donde estan los depositos iniciales).
  if (ok.length > 100) ok = ok.slice(0, 70).concat(ok.slice(-30));
  const txs = await pool(ok, 3, (x) => rpcCall(url, "getTransaction", [x.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" }]));

  const ev = [];
  const rew = {};
  txs.forEach((tx) => {
    if (!tx || !tx.transaction) return;
    const outer = tx.transaction.message.instructions || [];
    const inner = {};
    ((tx.meta && tx.meta.innerInstructions) || []).forEach((g) => (inner[g.index] = g.instructions || []));
    outer.forEach((ix, idx) => {
      const seq = [ix].concat(inner[idx] || []);
      let cur = null;
      seq.forEach((x) => {
        if (x.programId === WHIRLPOOL_PROGRAM && x.data && Array.isArray(x.accounts)) {
          const kind = disc[Array.from(b58decode(x.data).slice(0, 8)).join(",")];
          // Instrucciones nuevas o desconocidas que tocan la posicion: se clasifican por el sentido de las transferencias.
          cur = x.accounts.indexOf(posAddr) >= 0 ? { kind: kind || "unk", ai: 0, bi: 0, ao: 0, bo: 0 } : null;
          if (cur && cur.kind !== "rew") ev.push(cur);
          return;
        }
        if (!cur || !TOKEN_PROGRAMS[x.programId] || !x.parsed) return;
        const t = x.parsed.type;
        if (t !== "transfer" && t !== "transferChecked") return;
        const info = x.parsed.info || {};
        const amt = Number(info.amount || (info.tokenAmount && info.tokenAmount.amount) || 0);
        if (cur.kind === "rew") {
          const m = rewardVaults[info.source];
          if (m) rew[m] = (rew[m] || 0) + amt;
          return;
        }
        if (info.destination === vaultA) cur.ai += amt;
        else if (info.source === vaultA) cur.ao += amt;
        else if (info.destination === vaultB) cur.bi += amt;
        else if (info.source === vaultB) cur.bo += amt;
      });
    });
  });
  const events = [];
  ev.forEach((e) => {
    let k = e.kind;
    if (k === "unk") k = e.ai + e.bi > 0 ? "inc" : e.ao + e.bo > 0 ? "dec" : null;
    if (!k) return;
    if (k === "inc") events.push({ kind: k, a: e.ai, b: e.bi });
    else events.push({ kind: k, a: e.ao, b: e.bo });
  });
  return { opened, events, rewards: rew, txCount: sigs.length };
}

async function usdPrices(mints) {
  const P = {};
  try {
    const r = await fetch("https://lite-api.jup.ag/price/v3?ids=" + mints.join(","));
    const j = await r.json();
    mints.forEach((m) => {
      const v = j && j[m] && j[m].usdPrice;
      if (v > 0) P[m] = +v;
    });
  } catch (e) {}
  return P;
}

function duration(sec) {
  if (!(sec > 0)) return "—";
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return d ? d + "d " + h + "h" : h ? h + "h " + m + "m" : Math.max(1, m) + "m";
}

// Escala de decimales de cada pool ya leido, para refrescar precios sin volver a cargarlo todo.
const POOLSCALE = {};

/**
 * Precio actual de los pools indicados (token B por token A), leido directamente de la cuenta del pool.
 * o = { rpc, pools: [direccion] } -> { direccion: precio }
 */
async function livePrices(o) {
  const addrs = (o.pools || []).filter((a) => POOLSCALE[a] != null);
  if (!addrs.length) return {};
  const rpc = createSolanaRpc(o.rpc);
  const ws = await fetchAllWhirlpool(rpc, addrs.map((a) => address(a)));
  const out = {};
  ws.forEach((w) => {
    const sp = Number(w.data.sqrtPrice) / 18446744073709551616;
    out[String(w.address)] = sp * sp * POOLSCALE[String(w.address)];
  });
  return out;
}

function short(a) {
  a = String(a);
  return a.slice(0, 4) + "…" + a.slice(-4);
}

/**
 * Lee las posiciones de Orca de una wallet y las devuelve listas para pintar.
 * o = { rpc, owner }
 */
async function positions(o) {
  const rpc = createSolanaRpc(o.rpc);
  const found = await fetchPositionsForOwner(rpc, address(o.owner));
  const list = [];
  found.forEach((x) => {
    if (x.isPositionBundle) (x.positions || []).forEach((p) => list.push(p));
    else list.push(x);
  });
  if (!list.length) return [];

  const poolAddrs = Array.from(new Set(list.map((p) => String(p.data.whirlpool))));
  const pools = await fetchAllWhirlpool(rpc, poolAddrs.map((a) => address(a)));
  const P = {};
  pools.forEach((w) => (P[String(w.address)] = w.data));

  const mints = Array.from(new Set(pools.flatMap((w) => [String(w.data.tokenMintA), String(w.data.tokenMintB)])));
  const DEC = {};
  const accs = (await rpc.getMultipleAccounts(mints.map((m) => address(m)), { encoding: "jsonParsed" }).send()).value;
  mints.forEach((m, i) => {
    const info = accs[i] && accs[i].data && accs[i].data.parsed && accs[i].data.parsed.info;
    DEC[m] = info ? Number(info.decimals) : 6;
  });

  const META = {};
  await Promise.all(poolAddrs.map(async (a) => (META[a] = await poolMeta(a))));

  // Reward mints y sus vaults (para valorar lo cobrado y lo pendiente).
  const rewardMints = new Set();
  pools.forEach((w) => (w.data.rewardInfos || []).forEach((r) => {
    const m = String(r.mint);
    if (m !== "11111111111111111111111111111111") rewardMints.add(m);
  }));
  const PX = await usdPrices(Array.from(new Set(mints.concat(Array.from(rewardMints)))));
  if (Array.from(rewardMints).some((m) => DEC[m] == null)) {
    const rm = Array.from(rewardMints).filter((m) => DEC[m] == null);
    const ra = (await rpc.getMultipleAccounts(rm.map((m) => address(m)), { encoding: "jsonParsed" }).send()).value;
    rm.forEach((m, i) => {
      const info = ra[i] && ra[i].data && ra[i].data.parsed && ra[i].data.parsed.info;
      DEC[m] = info ? Number(info.decimals) : 6;
    });
  }

  const owner = createNoopSigner(address(o.owner));
  const now = Date.now() / 1000;

  const out = await pool(list, 2, async (p) => {
    const d = p.data;
    const w = P[String(d.whirlpool)];
    if (!w) return null;
    const mA = String(w.tokenMintA);
    const mB = String(w.tokenMintB);
    const dA = DEC[mA];
    const dB = DEC[mB];
    const meta = META[String(d.whirlpool)] || {};
    const tA = meta.tokenA || {};
    const tB = meta.tokenB || {};
    const symA = tA.symbol || STABLES[mA] || short(mA);
    const symB = tB.symbol || STABLES[mB] || short(mB);

    const scale = Math.pow(10, dA - dB);
    POOLSCALE[String(d.whirlpool)] = scale;
    const sp = Number(w.sqrtPrice) / 18446744073709551616; // Q64.64
    const sa = Math.pow(1.0001, d.tickLowerIndex / 2);
    const sb = Math.pow(1.0001, d.tickUpperIndex / 2);
    const L = Number(d.liquidity);
    let rawA = 0;
    let rawB = 0;
    if (sp <= sa) rawA = L * (1 / sa - 1 / sb);
    else if (sp >= sb) rawB = L * (sb - sa);
    else {
      rawA = L * (1 / sp - 1 / sb);
      rawB = L * (sp - sa);
    }
    const amtA = rawA / Math.pow(10, dA);
    const amtB = rawB / Math.pow(10, dB);
    const price = sp * sp * scale;

    // Precios en dolares: Jupiter; si falta uno, se deduce del precio del pool.
    let pA = PX[mA];
    let pB = PX[mB];
    if (STABLES[mB] && !pB) pB = 1;
    if (STABLES[mA] && !pA) pA = 1;
    if (!pA && pB) pA = pB * price;
    if (!pB && pA && price > 0) pB = pA / price;
    const val = (ra, rb) => (pA && pB ? (ra / Math.pow(10, dA)) * pA + (rb / Math.pow(10, dB)) * pB : null);
    const usd = val(rawA, rawB);

    // Pendiente: el SDK de Orca calcula comisiones y recompensas sin cobrar.
    let pend = null;
    let pendA = 0;
    let pendB = 0;
    let pendRew = [];
    try {
      const h = await harvestPositionInstructions(rpc, address(String(d.positionMint)), { authority: owner });
      pendA = Number(h.feesQuote.feeOwedA);
      pendB = Number(h.feesQuote.feeOwedB);
      pend = val(pendA, pendB);
      (w.rewardInfos || []).forEach((r, i) => {
        const q = h.rewardsQuote.rewards[i];
        const m = String(r.mint);
        if (!q || !(Number(q.rewardsOwed) > 0) || m === "11111111111111111111111111111111") return;
        const amt = Number(q.rewardsOwed) / Math.pow(10, DEC[m] || 6);
        pendRew.push({ mint: m, amt });
        if (pend != null && PX[m]) pend += amt * PX[m];
      });
    } catch (e) {}

    // Historial: depositos, retiradas, cobros y fecha de apertura.
    let hist = null;
    try {
      const rv = {};
      (w.rewardInfos || []).forEach((r) => (rv[String(r.vault)] = String(r.mint)));
      hist = await history(o.rpc, String(p.address), String(w.tokenVaultA), String(w.tokenVaultB), rv);
    } catch (e) {}

    let dep = null;
    let wd = null;
    let harv = null;
    let entry = null;
    let pnl = null;
    let dur = "—";
    if (hist) {
      if (hist.opened) dur = duration(now - hist.opened);
      let depB = 0; // depositado, valorado en token B al precio de ese momento
      let wdB = 0;
      let wsum = 0;
      let wpx = 0;
      let fa = 0;
      let fb = 0;
      hist.events.forEach((e) => {
        if (e.kind === "fee") {
          fa += e.a;
          fb += e.b;
          return;
        }
        const pr = priceFromAmounts(e.a, e.b, sa, sb);
        const v = pr == null ? 0 : e.a * pr + e.b; // en crudo de B
        if (e.kind === "inc") {
          depB += v;
          if (pr != null && v > 0) {
            wpx += pr * scale * v;
            wsum += v;
          }
        } else wdB += v;
      });
      if (wsum > 0) entry = wpx / wsum;
      if (pB) {
        dep = (depB / Math.pow(10, dB)) * pB;
        wd = (wdB / Math.pow(10, dB)) * pB;
      }
      harv = val(fa, fb);
      if (harv != null) {
        Object.keys(hist.rewards).forEach((m) => {
          if (PX[m]) harv += (hist.rewards[m] / Math.pow(10, DEC[m] || 6)) * PX[m];
        });
      }
      if (dep > 0 && usd != null) pnl = usd + (wd || 0) + (harv || 0) + (pend || 0) - dep;
    }

    // Rendimiento estimado por periodo, con la misma formula que Orca:
    // (volumen del periodo x comision base del pool + recompensas del periodo) x tu parte de la liquidez activa / tu saldo.
    // Los periodos vienen de la API de Orca (5m ... 365d); si falta alguno se deduce del mas cercano.
    let est = null;
    let est24 = null;
    try {
      const st = meta.stats || {};
      const lp = Number(w.liquidity);
      const inRange = sp > sa && sp < sb;
      if (!inRange) {
        est = { out: true };
        est24 = 0;
      } else if (usd > 0 && lp > 0) {
        const rate = Number(w.feeRate) / 1e6;
        const share = L / lp;
        const earn = (x) => (x ? ((+x.volume || 0) * rate + (+x.rewards || 0)) * share : null);
        const HRS = { "5m": 1 / 12, "15m": 0.25, "30m": 0.5, "1h": 1, "4h": 4, "8h": 8, "24h": 24, "7d": 168, "30d": 720, "365d": 8760 };
        est = {};
        YIELD_WINDOWS.forEach((k) => {
          let v = earn(st[k]);
          if (v == null) {
            const base = st["30d"] ? ["30d", earn(st["30d"])] : st["24h"] ? ["24h", earn(st["24h"])] : null;
            if (base && base[1] != null) v = (base[1] * HRS[k]) / HRS[base[0]];
          }
          est[k] = v == null ? null : (v / usd) * 100;
        });
        est24 = est["24h"];
      }
    } catch (e) {}

    return {
      pair: symA + "/" + symB,
      fee: w.feeRate != null ? String(Number(w.feeRate) / 10000) : "",
      price,
      lo: sa * sa * scale,
      hi: sb * sb * scale,
      usd,
      amtA,
      amtB,
      symA,
      symB,
      dep,
      pnl,
      pnlPct: pnl != null && dep > 0 ? (pnl / dep) * 100 : null,
      harv,
      pend,
      pendA: pendA / Math.pow(10, dA),
      pendB: pendB / Math.pow(10, dB),
      pendRew,
      est,
      est24,
      entry,
      dur,
      mint: String(d.positionMint),
      pool: String(d.whirlpool),
    };
  });
  return out.filter(Boolean);
}

window.kzSdk = { ready: true, version: "0.5.0", openPosition, positions, closePosition, harvest, livePrices };
window.dispatchEvent(new Event("kzsdk"));
