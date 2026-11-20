import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage();
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => window.kzSdk && kzSdk.version === "0.5.0", null, { timeout: 90000 });
const r = await pg.evaluate(async () => {
  const RPC = "https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
  const ps = await kzSdk.positions({ rpc: RPC, owner: "8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21" });
  const lp = await kzSdk.livePrices({ rpc: RPC, pools: ps.map(p => p.pool) });
  return JSON.stringify({ usd: ps[0].usd, pnl: ps[0].pnl, pend: ps[0].pend, entry: ps[0].entry, dur: ps[0].dur, est: ps[0].est, lp });
});
console.log("RES", r);
await b.close();
