import { chromium } from "playwright";
const r0=await fetch("https://li.quest/v1/tokens?chains=8453");console.log("DIRECT",r0.status,(await r0.text()).length);
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},locale:"es-ES"});const errs=[];pg.on("pageerror",e=>errs.push(e.message));
pg.on("response",r=>{if(/li\.quest/.test(r.url()))console.log("NET",r.status(),r.url().slice(0,120))});pg.on("requestfailed",r=>{if(/li\.quest/.test(r.url()))console.log("FAIL",r.failure()&&r.failure().errorText,r.url().slice(0,100))});
await pg.goto("https://kosmarafi.github.io/?t="+Date.now(),{waitUntil:"networkidle"});
await pg.evaluate(()=>{location.hash="#swap"});await pg.waitForTimeout(2000);
await pg.click('[data-act="netpick"]');await pg.waitForTimeout(500);await pg.click('[data-net="8453"]');
for(const t of [1000,4000,10000]){await pg.waitForTimeout(t);console.log("SWAP@"+t,(await pg.$eval("#swap",e=>e.innerText)).replace(/\n+/g," | ").slice(0,200))}
console.log("ERRS",JSON.stringify(errs).slice(0,500));await b.close();
