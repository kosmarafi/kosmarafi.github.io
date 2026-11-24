// Kosmara · Meteora DLMM: leer posiciones y preparar las transacciones (crear, depositar, retirar, cobrar, cerrar).
// Se compila aparte (../sdk/kz-met.js) y la web solo lo carga cuando hace falta. Devuelve transacciones v0 serializadas
// para que la web las simule, las firme con la wallet y las envíe, igual que con Raydium.
import "./buffer-shim.js";
import { Connection, PublicKey, Keypair, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import * as M from "@meteora-ag/dlmm";
import BN from "bn.js";

const DLMM = M.default || M.DLMM;
const StrategyType = M.StrategyType || (M.default && M.default.StrategyType);
const POOLS = {};

const conn = (rpc) => new Connection(rpc, "confirmed");
const pk = (x) => (x && x.toBase58 ? x.toBase58() : String(x));
const dec = (t) => (t && (t.decimal != null ? t.decimal : t.mint && t.mint.decimals != null ? t.mint.decimals : t.decimals)) || 0;
const mintOf = (t) => pk((t && (t.mint && t.mint.address ? t.mint.address : t.publicKey)) || "");
const num = (x) => Number(x && x.toString ? x.toString() : x || 0);

async function pool(c, addr) {
  if (POOLS[addr] && Date.now() - POOLS[addr].at < 30000) return POOLS[addr].d;
  const d = await DLMM.create(c, new PublicKey(addr));
  POOLS[addr] = { d, at: Date.now() };
  return d;
}
async function meta(mints) {
  const out = {};
  try {
    const r = await fetch("https://lite-api.jup.ag/tokens/v2/search?query=" + mints.join(","));
    if (r.ok) (await r.json()).forEach((t) => (out[t.id] = { s: t.symbol, px: +t.usdPrice || 0, i: t.icon || "" }));
  } catch (e) {}
  const miss = mints.filter((m) => !(out[m] && out[m].px));
  if (miss.length) {
    try {
      const r = await fetch("https://lite-api.jup.ag/price/v3?ids=" + miss.join(","));
      if (r.ok) { const j = await r.json(); miss.forEach((m) => { if (j[m]) (out[m] = out[m] || {}).px = +j[m].usdPrice || 0; }); }
    } catch (e) {}
  }
  return out;
}
const binPrice = (id, step, dx, dy) => Math.pow(1 + step / 10000, id) * Math.pow(10, dx - dy);

/** Posiciones de Meteora DLMM de una wallet, con el mismo formato que las de Orca en la web. */
async function positions(o) {
  const c = conn(o.rpc);
  const map = await DLMM.getAllLbPairPositionsByUser(c, new PublicKey(o.owner));
  const list = [];
  map.forEach((info, key) => list.push([pk(key), info]));
  if (!list.length) return [];
  const mints = [];
  list.forEach(([, info]) => [mintOf(info.tokenX), mintOf(info.tokenY)].forEach((m) => mints.indexOf(m) < 0 && mints.push(m)));
  const T = await meta(mints);
  const out = [];
  list.forEach(([pair, info]) => {
    const lb = info.lbPair, step = Number(lb.binStep), act = Number(lb.activeId), dx = dec(info.tokenX), dy = dec(info.tokenY);
    const mX = mintOf(info.tokenX), mY = mintOf(info.tokenY), tx = T[mX] || {}, ty = T[mY] || {};
    const price = binPrice(act, step, dx, dy), bf = lb.parameters ? Number(lb.parameters.baseFactor) : 0;
    let pxX = tx.px || 0, pxY = ty.px || 0;
    if (!pxX && pxY) pxX = pxY * price;
    if (!pxY && pxX && price > 0) pxY = pxX / price;
    (info.lbPairPositionsData || []).forEach((p) => {
      const d = p.positionData, aX = num(d.totalXAmount) / Math.pow(10, dx), aY = num(d.totalYAmount) / Math.pow(10, dy);
      const fX = num(d.feeX) / Math.pow(10, dx), fY = num(d.feeY) / Math.pow(10, dy);
      const lo = binPrice(Number(d.lowerBinId), step, dx, dy), hi = binPrice(Number(d.upperBinId) + 1, step, dx, dy);
      out.push({
        met: true, dex: "Meteora", mint: pk(p.publicKey), pool: pair, pair: (tx.s || mX.slice(0, 4)) + "/" + (ty.s || mY.slice(0, 4)),
        fee: bf && step ? (bf * step) / 1e6 : step / 100, binStep: step, lowerBin: Number(d.lowerBinId), upperBin: Number(d.upperBinId),
        mA: mX, mB: mY, symA: tx.s || mX.slice(0, 4), symB: ty.s || mY.slice(0, 4), decA: dx, decB: dy, amtA: aX, amtB: aY,
        price, lo, hi, usd: aX * pxX + aY * pxY, pendA: fX, pendB: fY, pend: fX * pxX + fY * pxY,
        pnl: null, harv: null, est: null, est24: null, entry: null, dur: null,
      });
    });
  });
  out.sort((a, b) => b.usd - a.usd);
  return out;
}

async function toV0(c, owner, txs, signers) {
  const L = [].concat(txs || []).filter(Boolean);
  const { blockhash } = await c.getLatestBlockhash("confirmed");
  return L.map((t) => {
    const msg = new TransactionMessage({ payerKey: new PublicKey(owner), recentBlockhash: blockhash, instructions: t.instructions }).compileToV0Message();
    const v = new VersionedTransaction(msg);
    const need = (signers || []).filter((k) => msg.staticAccountKeys.some((x) => x.equals(k.publicKey)));
    if (need.length) v.sign(need);
    return v.serialize();
  });
}
const units = (v, d) => new BN(Math.floor((+v || 0) * Math.pow(10, d)).toString());

/** o = { rpc, owner, pool, position, kind: harv|dec|close|inc, pct, amountA, amountB, slipBps } -> { txs: [bytes] } */
async function buildManage(o) {
  const c = conn(o.rpc), d = await pool(c, o.pool), owner = new PublicKey(o.owner);
  const pos = await d.getPosition(new PublicKey(o.position)), pd = pos.positionData;
  let txs;
  if (o.kind === "harv") txs = await d.claimAllRewardsByPosition({ owner, position: pos });
  else if (o.kind === "dec" || o.kind === "close") {
    const bps = o.kind === "close" ? 10000 : Math.max(1, Math.min(9999, Math.round(o.pct * 100)));
    txs = await d.removeLiquidity({ user: owner, position: pos.publicKey, fromBinId: pd.lowerBinId, toBinId: pd.upperBinId, bps: new BN(bps), shouldClaimAndClose: o.kind === "close" });
  } else if (o.kind === "inc") {
    txs = await d.addLiquidityByStrategy({
      positionPubKey: pos.publicKey, user: owner,
      totalXAmount: units(o.amountA, d.tokenX.mint ? d.tokenX.mint.decimals : d.tokenX.decimal),
      totalYAmount: units(o.amountB, d.tokenY.mint ? d.tokenY.mint.decimals : d.tokenY.decimal),
      strategy: { minBinId: pd.lowerBinId, maxBinId: pd.upperBinId, strategyType: StrategyType.Spot },
      slippage: (o.slipBps || 100) / 100,
    });
  } else throw new Error("Acción no válida");
  return { txs: await toV0(c, o.owner, txs) };
}

/** Crear posición. o = { rpc, owner, pool, lower, upper (precios humanos Y por X), amountA (X), amountB (Y), slipBps } */
async function buildOpen(o) {
  const c = conn(o.rpc), d = await pool(c, o.pool), owner = new PublicKey(o.owner);
  const dx = d.tokenX.mint ? d.tokenX.mint.decimals : d.tokenX.decimal, dy = d.tokenY.mint ? d.tokenY.mint.decimals : d.tokenY.decimal;
  const step = Number(d.lbPair.binStep), act = Number(d.lbPair.activeId), k = Math.pow(10, dx - dy);
  const bin = (p, up) => { const v = Math.log(p / k) / Math.log(1 + step / 10000); return up ? Math.ceil(v) : Math.floor(v); };
  let lo = bin(o.lower, false), hi = bin(o.upper, true);
  // Una posición de Meteora admite hasta 70 bins: se recorta alrededor del precio actual si el rango es más ancho.
  if (hi - lo + 1 > 69) { const half = 34; lo = Math.max(lo, act - half); hi = Math.min(hi, lo + 68); if (hi - lo < 68) lo = hi - 68; }
  const kp = Keypair.generate();
  const tx = await d.initializePositionAndAddLiquidityByStrategy({
    positionPubKey: kp.publicKey, user: owner, totalXAmount: units(o.amountA, dx), totalYAmount: units(o.amountB, dy),
    strategy: { minBinId: lo, maxBinId: hi, strategyType: StrategyType.Spot }, slippage: (o.slipBps || 100) / 100,
  });
  const txs = await toV0(c, o.owner, tx, [kp]);
  return { txs, position: kp.publicKey.toBase58(), lowerBin: lo, upperBin: hi, lowerPrice: binPrice(lo, step, dx, dy), upperPrice: binPrice(hi + 1, step, dx, dy) };
}

window.kzMet = { ready: true, version: "0.1.0", positions, buildManage, buildOpen };
