import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 400, height: 860 }, deviceScaleFactor: 2 });
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => window.kzSdk && kzSdk.livePrices, null, { timeout: 60000 });
await pg.evaluate(() => {
  document.querySelector('[data-v="pf"],[data-v="port"],[data-v="portfolio"]')?.click();
  S.pfTab = "liq";
  S.positions = [{ pair: "ANT/USDC", fee: "0.04", price: 91.6654, lo: 89.7453, hi: 94.0826, usd: 156.54, amtA: 0.9419, amtB: 70.306, symA: "ANT", symB: "USDC", pnl: 0.63, pnlPct: 0.4, harv: 0, pend: 0.17, est: { "1h": 0.126, "24h": 3.02 }, entry: 91.177, dur: "28m", mint: "X", pool: "Y" }];
  rPf();
});
const el = await pg.$("#pfList");
console.log(await pg.evaluate(() => document.getElementById("pb_X")?.innerText));
await (el || pg).screenshot({ path: "shot.png" });
await b.close();
