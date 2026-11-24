import { chromium } from "playwright";
await new Promise(z=>setTimeout(z,70000));
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,locale:"es-ES"});const errs=[];pg.on("pageerror",e=>errs.push(e.message));
await pg.addInitScript(()=>{localStorage.setItem("kz_watch",JSON.stringify({a:"AhXkpxcNzpo5u8dS4ZHibm3tG39AofBELyRr8ossTG6a",t:"sol"}))});
await pg.goto("https://kosmarafi.github.io/?t="+Date.now(),{waitUntil:"networkidle"});
await pg.evaluate(()=>{location.hash="#pools"});await pg.waitForTimeout(15000);
console.log("POOLSTAT",(await pg.$eval("#pools .stat",e=>e.textContent)).slice(0,200));
const f=await pg.$('[data-flt="Meteora"]');if(f){await f.click();await pg.waitForTimeout(800);console.log("METROWS",await pg.$$eval("#plist .prow",x=>x.length));const r=await pg.$("#plist .prow");if(r){await r.click();await pg.waitForTimeout(4000);console.log("SHEET",(await pg.$eval("#ps",e=>e.innerText)).replace(/\n+/g," | ").slice(0,400))}}
await pg.click('[data-act="closeps"]').catch(()=>{});
await pg.evaluate(()=>{location.hash="#portfolio"});await pg.waitForTimeout(2000);const t=await pg.$('[data-pft="liq"]');if(t)await t.click();await pg.waitForTimeout(25000);
console.log("CARDS",await pg.$$eval(".pos",x=>x.map(e=>e.querySelector("b").textContent+" "+e.querySelector(".tag").textContent)));
const el=await pg.$(".pos");if(el){await el.scrollIntoViewIfNeeded();const s=(await el.screenshot({type:"jpeg",quality:55})).toString("base64");for(let i=0;i<s.length;i+=3000)console.log("MS"+String(i/3000).padStart(3,"0")+" "+s.slice(i,i+3000))}
console.log("ERRS",JSON.stringify(errs).slice(0,500));await b.close();
