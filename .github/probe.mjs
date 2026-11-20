import { chromium } from "playwright";
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => document.querySelector('[aria-label*="Dogecoin"]'), null, { timeout: 90000 });
await pg.evaluate(() => document.querySelectorAll("[id*=splash],.splash").forEach(e => e.remove()));
const t0 = Date.now(); const shots = [];
for (const at of [2500, 5000, 11000, 12200, 13400, 14600, 15800, 17000]) {
  await pg.waitForTimeout(Math.max(0, at - (Date.now() - t0)));
  shots.push(await pg.evaluate(() => document.getElementById("door").toDataURL("image/png")));
}
const html = '<body style="margin:0;background:#1d3a44">' + shots.map(s => `<img src="${s}" style="width:358px;display:inline-block">`).join("") + "</body>";
const p2 = await b.newPage({ viewport: { width: 716, height: 944 } }); await p2.setContent(html); await p2.waitForTimeout(500);
await p2.screenshot({ path: "all.png", fullPage: true });
await b.close();
