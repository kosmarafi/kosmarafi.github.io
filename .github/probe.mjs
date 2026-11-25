import { chromium } from "playwright";
import fs from "fs";
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},locale:"es-ES"});const errs=[];pg.on("pageerror",e=>errs.push(e.message));
await pg.goto("http://127.0.0.1:8080/?t="+Date.now(),{waitUntil:"domcontentloaded"});await pg.waitForTimeout(5000);
await pg.screenshot({path:"shots/f1-boton.png"});
await pg.click("#kzh");await pg.waitForTimeout(500);await pg.screenshot({path:"shots/f2-abierto.png"});
await pg.click('[data-h="t:fees"]');await pg.waitForTimeout(300);await pg.click('#kzhp .ops button.q');await pg.waitForTimeout(400);await pg.screenshot({path:"shots/f3-respuesta.png"});
await pg.fill("#kzhq","cuantas firmas");await pg.waitForTimeout(600);console.log("BUSCA",(await pg.$eval("#kzhb",e=>e.innerText)).replace(/\n+/g," | "));
await pg.fill("#kzhq","xyzzy cosa rara");await pg.waitForTimeout(600);console.log("NADA",(await pg.$eval("#kzhb",e=>e.innerText)).replace(/\n+/g," | "));
console.log("ERRS",JSON.stringify(errs));
for(const f of fs.readdirSync("shots")){const p2=await b.newPage();await p2.goto("file://"+process.cwd()+"/shots/"+f);const j=(await p2.screenshot({type:"jpeg",quality:55})).toString("base64");await p2.close();j.match(/.{1,3000}/g).forEach((c,i)=>console.log("IMG "+f+" "+i+" "+c))}
await b.close();
