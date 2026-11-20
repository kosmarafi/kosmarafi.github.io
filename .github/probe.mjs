import { chromium } from "playwright";
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 390, height: 1100 }, deviceScaleFactor: 1.5 });
pg.on("pageerror", e => console.log("PAGEERR", e.message, e.stack));
await pg.goto("https://kosmarafi.github.io/bocetos.html?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForTimeout(6500);
await pg.screenshot({ path: "a.png", fullPage: true });
await b.close();
