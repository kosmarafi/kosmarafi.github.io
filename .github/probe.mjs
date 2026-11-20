import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 400, height: 860 }, deviceScaleFactor: 2, hasTouch: true });
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => typeof pbTip === "function", null, { timeout: 60000 });
await pg.waitForTimeout(5000);
await pg.evaluate(() => {
  document.querySelectorAll("[id*=splash],.splash").forEach(e => e.remove());
  S.pfTab = "liq";
  S.positions = [{ pair: "ANT/USDC", fee: "0.04", price: 91.944, lo: 89.7453, hi: 94.0826, usd: 157.11, amtA: 0.83, amtB: 80.45, symA: "ANT", symB: "USDC", pnl: 1.25, pnlPct: 0.8, harv: 0, pend: 0.28, est: { "24h": 7.53 }, entry: 91.177171, dur: "55m", mint: "X", pool: "Y" }];
  rPf(); document.getElementById("pb_X").closest(".pos").scrollIntoView();
});
await pg.tap('[data-pbt="e"]');
await pg.waitForTimeout(500);
console.log("TIP", await pg.evaluate(() => document.querySelector(".pbtip")?.innerText));
const el = await pg.$(".pos");
await el.screenshot({ path: "shot.png", clip: undefined });
await b.close();
