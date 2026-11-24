import { chromium } from "playwright";
await new Promise(z=>setTimeout(z,75000));
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
const errs=[];pg.on("pageerror",e=>errs.push(e.message));pg.on("console",m=>{if(m.type()==="error")errs.push("console: "+m.text())});
await pg.addInitScript(()=>{localStorage.setItem("kz_watch",JSON.stringify({a:"0x7759a8c71dbf02976f9637703921cde0987d9f1b",t:"evm"}))});
await pg.goto("https://kosmarafi.github.io/?t="+Date.now(),{waitUntil:"networkidle"});
console.log("evm module",await pg.evaluate(()=>!!window.kzEvmPos&&kzEvmPos.version));
await pg.evaluate(()=>{location.hash="#portfolio"});await pg.waitForTimeout(2500);
const tab=await pg.$('[data-pft="liq"]');if(tab)await tab.click();
await pg.waitForTimeout(12000);
console.log("cards",await pg.$$eval(".pos",x=>x.length),"headers",await pg.$$eval(".pfnet",x=>x.map(e=>e.textContent)));
const el=await pg.$("#pfList");if(el){await el.scrollIntoViewIfNeeded();const shot=await el.screenshot();console.log("SHOT "+shot.toString("base64"))}
console.log("ERRS",JSON.stringify(errs).slice(0,800));await b.close();
