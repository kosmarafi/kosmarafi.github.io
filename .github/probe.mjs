import { chromium } from "playwright";
import fs from "fs";
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},locale:"es-ES"});const errs=[];pg.on("pageerror",e=>errs.push(e.message));
await pg.goto("http://127.0.0.1:8080/?t="+Date.now(),{waitUntil:"domcontentloaded"});await pg.waitForTimeout(5000);
const click=async(attr,val)=>pg.evaluate(([a,v])=>{const x=document.createElement("button");x.setAttribute(a,v);x.style.display="none";document.body.appendChild(x);x.click();x.remove()},[attr,val]);
await click("data-v","lottery");for(let i=0;i<30;i++){await pg.waitForTimeout(2000);if(await pg.evaluate(()=>document.querySelectorAll('#lotInfo [data-pool^="vt:"]').length))break}
const sh=async(n)=>{await pg.evaluate(()=>{const k=[...document.querySelectorAll("#lotInfo .k")].pop();k.scrollIntoView()});await pg.waitForTimeout(400);await pg.screenshot({path:"shots/"+n+".png"})};
const rows=async()=>(await pg.$$eval("#lotInfo .prow",L=>L.map(r=>r.innerText.replace(/\n+/g," ")))).join(" || ").slice(0,700);
await sh("t1-todos");console.log("TODOS",await rows());
await click("data-vf","Aave");await pg.waitForTimeout(500);await sh("t2-aave");console.log("AAVE",await rows());
await click("data-vf","Morpho");await click("data-vs","apy");await pg.waitForTimeout(500);await sh("t3-morpho-apy");console.log("MORPHO APY",await rows());
console.log("ERRS",JSON.stringify(errs));
for(const f of fs.readdirSync("shots")){const p2=await b.newPage();await p2.goto("file://"+process.cwd()+"/shots/"+f);const j=(await p2.screenshot({type:"jpeg",quality:55})).toString("base64");await p2.close();j.match(/.{1,3000}/g).forEach((c,i)=>console.log("IMG "+f+" "+i+" "+c))}
await b.close();
