import { chromium } from "playwright";
await new Promise(z=>setTimeout(z,60000));
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
const errs=[];pg.on("pageerror",e=>errs.push(e.message));
await pg.goto("https://kosmarafi.github.io/?t="+Date.now(),{waitUntil:"networkidle"});
console.log("evm",await pg.evaluate(()=>window.kzEvmPos&&kzEvmPos.version));
await pg.evaluate(()=>{location.hash="#pools"});await pg.waitForTimeout(40000);
for(const id of ["poolsEth","poolsBnb","poolsBase","poolsArb","poolsOp"])console.log("SEC",id,(await pg.$eval("#"+id,e=>e.querySelector(".k")?.textContent+" | "+e.querySelector(".stat")?.textContent)).slice(0,160));
const shot=async(tag)=>{const s=(await pg.screenshot({type:"jpeg",quality:55})).toString("base64");for(let i=0;i<s.length;i+=3000)console.log(tag+String(i/3000).padStart(3,"0")+" "+s.slice(i,i+3000))};
let row=await pg.$("#poolsBase .prow");if(row){await row.click();await pg.waitForTimeout(6000);
 console.log("FORM",(await pg.$eval("#ps",e=>e.innerText)).replace(/\n+/g," | ").slice(0,600));
 const inp=await pg.$("#ecamt");if(inp){await inp.fill("100");await pg.waitForTimeout(500);console.log("SUM",(await pg.$eval("#ecsum",e=>e.innerText)).replace(/\n+/g," | "))}
 await shot("SA")}
await pg.click('[data-act="closeps"]').catch(()=>{});
row=await pg.$("#poolsOp .prow");if(row){await row.click();await pg.waitForTimeout(6000);console.log("FORM2",(await pg.$eval("#ps",e=>e.innerText)).replace(/\n+/g," | ").slice(0,400))}
console.log("ERRS",JSON.stringify(errs).slice(0,600));await b.close();
