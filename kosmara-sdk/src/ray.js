// Kosmara · Raydium CLMM: prepara la transaccion para abrir una posicion en un pool concentrado de Raydium.
// Se compila aparte (../sdk/kz-ray.js) y la web solo lo carga cuando abres un pool de Raydium.
// La web firma y envia los bytes que devuelve buildOpen (simula antes, firma con la wallet y envia por su RPC).
import "./buffer-shim.js";
import { Connection, PublicKey } from "@solana/web3.js";
import { Raydium, TxVersion, TickUtils, PoolUtils } from "@raydium-io/raydium-sdk-v2";
import Decimal from "decimal.js";
import BN from "bn.js";

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
  const t1 = TickUtils.getPriceAndTick({ poolInfo, price: new Decimal(o.lower), baseIn: true }).tick;
  const t2 = TickUtils.getPriceAndTick({ poolInfo, price: new Decimal(o.upper), baseIn: true }).tick;
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
  // margen de deslizamiento sobre el otro token, sin pasar de lo que hay
  const r2 = await PoolUtils.getLiquidityAmountOutFromAmountIn({ poolInfo, slippage: 0, inputA: base === "MintA", tickUpper, tickLower, amount: baseAmount, add: true, amountHasFee: true, epochInfo });
  const needOther = new BN((base === "MintA" ? r2.amountSlippageB : r2.amountSlippageA).amount.toString());
  let withSlip = needOther.muln(Math.round((1 + slip) * 10000)).divn(10000);
  if (withSlip.gt(otherMax)) withSlip = otherMax;

  const res = await raydium.clmm.openPositionFromBase({
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
  const tx = res.transaction;
  if (res.signers && res.signers.length) tx.sign(res.signers);
  return { bytes: tx.serialize(), nftMint: res.extInfo && res.extInfo.nftMint ? res.extInfo.nftMint.toBase58() : "" };
}

window.kzRay = { ready: true, version: "0.1.0", buildOpen };
