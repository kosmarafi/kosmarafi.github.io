import { chromium } from "playwright";
await new Promise(z=>setTimeout(z,70000));
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},locale:"es-ES"});const errs=[];pg.on("pageerror",e=>errs.push(e.message));
pg.on("console",m=>{const t=m.text();if(/sim|Simul|error|Kosmara/i.test(t))console.log("CONSOLE",t.slice(0,300))});
await pg.addInitScript(()=>{const A="8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21",pk={toString:()=>A,toBase58:()=>A};
 window.__sig=0;const prov={isPhantom:true,isConnected:true,publicKey:pk,connect:async()=>({publicKey:pk}),disconnect:async()=>{},on(){},
  signTransaction:async(t)=>{window.__sig++;return t},signAllTransactions:async(L)=>L,signAndSendTransaction:async()=>{throw new Error("FIRMA_SIMULADA")}};
 window.phantom={solana:prov};window.solana=prov;localStorage.setItem("kz_w","ph")});
await pg.goto("https://kosmarafi.github.io/?t="+Date.now(),{waitUntil:"networkidle"});await pg.waitForTimeout(8000);
console.log("CONN",(await pg.$eval("#bConn",e=>e.textContent)).trim());
await pg.evaluate(()=>{location.hash="#pools"});await pg.waitForTimeout(6000);
const f=await pg.$('[data-flt="Jupiter"]');if(f)await f.click();await pg.waitForTimeout(800);
const rows=await pg.$$("#plist .prow");let opened=false;for(const r of rows){const t=await r.innerText();if(/USDC/.test(t)&&/Earn/.test(t)){await r.click();opened=true;break}}
console.log("OPENED",opened);await pg.waitForTimeout(4000);console.log("SHEET",(await pg.$eval("#ps",e=>e.innerText)).replace(/\n+/g," | ").slice(0,500));
for(const [pay,amt] of [["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v","0.1"],["So11111111111111111111111111111111111111112","0.005"]]){
 await pg.selectOption("#jepay",pay).catch(()=>{});await pg.waitForTimeout(400);await pg.fill("#jeamt",amt);await pg.click('[data-act="jedep"]');
 for(let i=0;i<20;i++){await pg.waitForTimeout(1500);const t=await pg.$eval("#jeres",e=>e.innerText).catch(()=>"");if(t&&!/Buscando|Preparando|Firma en/.test(t)){console.log("RES",pay.slice(0,4),"firmas",await pg.evaluate(()=>window.__sig),t.slice(0,400));break}}}
console.log("ERRS",JSON.stringify(errs).slice(0,500));await b.close();
