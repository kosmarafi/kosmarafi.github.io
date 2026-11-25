import { chromium } from "playwright";
const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36",H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const rc=async(m,p)=>(await (await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})})).json()).result;
const big=await rc("getTokenLargestAccounts",["9BEcn9aPEmhSPbPQeFGjidRiEKki46fVQDyPpSQXPA2D"]);
let owner=null;for(const a of (big&&big.value||[]).slice(3,12)){const i=await rc("getAccountInfo",[a.address,{encoding:"jsonParsed"}]);const o=i&&i.value&&i.value.data.parsed.info.owner;const oi=await rc("getAccountInfo",[o,{encoding:"base64"}]);if(oi&&oi.value&&oi.value.owner==="11111111111111111111111111111111"){owner=o;break}}
console.log("OWNER",owner);
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},locale:"es-ES"});
pg.on("console",m=>{const t=m.text();if(/Kosmara/.test(t))console.log("CONSOLE",t.slice(0,300))});
await pg.addInitScript((A)=>{const pk={toString:()=>A,toBase58:()=>A};window.__sig=0;const prov={isPhantom:true,isConnected:true,publicKey:pk,connect:async()=>({publicKey:pk}),disconnect:async()=>{},on(){},signTransaction:async(t)=>{window.__sig++;return t},signAllTransactions:async(L)=>L};window.phantom={solana:prov};window.solana=prov;localStorage.setItem("kz_w","ph")},owner);
await pg.goto("https://kosmarafi.github.io/?t="+Date.now(),{waitUntil:"networkidle"});await pg.waitForTimeout(6000);
await pg.evaluate(()=>{location.hash="#portfolio"});await pg.waitForTimeout(1500);await pg.click('[data-pft="vault"]');await pg.waitForTimeout(6000);
console.log("VAULTS",(await pg.$eval("#pfList",e=>e.innerText)).replace(/\n+/g," | ").slice(0,400));
const w=await pg.$("[data-vwd]");if(w){await w.click();await pg.waitForTimeout(800);await pg.click('.kzc .kzpct[data-o="50"]');await pg.click('.kzc [data-k="ok"]').catch(async()=>{const bs=await pg.$$(".kzc button");await bs[bs.length-1].click()});
 for(let i=0;i<15;i++){await pg.waitForTimeout(1500);const t=await pg.$eval('[id^="vr_"]',e=>e.innerText).catch(()=>"");if(t&&!/Preparando|Firma en/.test(t)){console.log("WD firmas",await pg.evaluate(()=>window.__sig),t.slice(0,300));break}}}
await b.close();
