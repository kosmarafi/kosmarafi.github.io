import { chromium } from "playwright";
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => document.querySelector('[aria-label*="THORChain"]'), null, { timeout: 90000 });
await pg.evaluate(() => document.querySelectorAll("[id*=splash],.splash").forEach(e => e.remove()));
await pg.waitForTimeout(1500);
const d = await pg.$("#door");
for (const [f, w] of [["a", 1300], ["b", 900], ["c", 2200]]) { await pg.waitForTimeout(w); await d.screenshot({ path: f + ".png" }) }
await b.close();
