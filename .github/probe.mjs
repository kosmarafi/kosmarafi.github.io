import { chromium } from "playwright";
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForTimeout(9000);
await pg.evaluate(() => document.querySelectorAll("[id*=splash],.splash").forEach(e => e.remove()));
await pg.waitForTimeout(500);
await (await pg.$("#door")).screenshot({ path: "a.png" });
await b.close();
