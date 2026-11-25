import { chromium } from "playwright";
import fs from "fs";
const SOLA="8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21",RP="https://base-rpc.publicnode.com";
const R=async(m,p)=>(await (await fetch(RP,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})})).json()).result;
let ME="";{const blk=await R("eth_getBlockByNumber",["latest",true]);for(const t of blk.transactions){if((await R("eth_getCode",[t.from,"latest"]))!=="0x")continue;const b=BigInt(await R("eth_getBalance",[t.from,"latest"]));if(b>5000000000000000n){ME=t.from;break}}}
console.log("ME",ME);
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},locale:"es-ES"});const errs=[];pg.on("pageerror",e=>errs.push(e.message));
pg.on("console",m=>{const t=m.text();if(/TXCAP|error/i.test(t))console.log("CONSOLE",t.slice(0,700))});
await pg.exposeFunction("__anv",async(m,p)=>R(m,p));
await pg.addInitScript(([A,ME])=>{const pk={toString:()=>A,toBase58:()=>A,toBytes:()=>new solanaWeb3.PublicKey(A).toBytes()};
 const cap=(t)=>{try{const m=t.message,K=m.staticAccountKeys.map(k=>k.toBase58());const L=m.compiledInstructions.map(ix=>{const pid=K[ix.programIdIndex];let d="";if(/^Memo/.test(pid))d="memo="+new TextDecoder().decode(ix.data);else if(pid==="11111111111111111111111111111111"){const v=new DataView(ix.data.buffer,ix.data.byteOffset);d="type="+v.getUint32(0,true)+" lamports="+v.getBigUint64(4,true)+" to="+K[ix.accountKeyIndexes[1]]}return pid.slice(0,8)+(d?"("+d+")":"")});console.log("TXCAP "+L.join(" | ")+" ALT="+(m.addressTableLookups||[]).length)}catch(e){console.log("TXCAP err "+e.message)}};
 const prov={isPhantom:true,isConnected:true,publicKey:pk,connect:async()=>({publicKey:pk}),disconnect:async()=>{},on(){},
  signTransaction:async(t)=>{cap(t);throw new Error("FIRMA_SIMULADA")},signAllTransactions:async(L)=>L,signAndSendTransaction:async(t)=>{cap(t);throw new Error("FIRMA_SIMULADA")}};
 window.phantom={solana:prov};window.solana=prov;localStorage.setItem("kz_w","ph");localStorage.setItem("kz_pk",A);
 const ev={isMetaMask:true,on(){},removeListener(){},request:async({method,params})=>{if(method==="eth_requestAccounts"||method==="eth_accounts")return [ME];if(method==="eth_chainId")return "0x2105";if(method==="wallet_getCapabilities")return {};if(method==="eth_sendTransaction")throw new Error("FIRMA_SIMULADA_EVM");return window.__anv(method,params)}};
 window.ethereum=ev;const ann=()=>window.dispatchEvent(new CustomEvent("eip6963:announceProvider",{detail:Object.freeze({info:{uuid:"mm-test",name:"MetaMask",icon:"data:,",rdns:"io.metamask"},provider:ev})}));window.addEventListener("eip6963:requestProvider",ann);ann()},[SOLA,ME]);
await pg.goto("http://127.0.0.1:8080/?t="+Date.now(),{waitUntil:"domcontentloaded"});await pg.waitForTimeout(7000);
const click=async(attr,val)=>pg.evaluate(([a,v])=>{const x=document.createElement("button");x.setAttribute(a,v);x.style.display="none";document.body.appendChild(x);x.click();x.remove()},[attr,val]);
await click("data-w","mm");await pg.waitForTimeout(4000);
console.log("CONN",(await pg.$eval("#bConn",e=>e.textContent).catch(()=>"?")).trim());
await click("data-v","swap");await pg.waitForTimeout(1000);await click("data-sm","x");
for(let i=0;i<20;i++){await pg.waitForTimeout(1500);if(await pg.$("#xf"))break}
const opts=await pg.$$eval("#xf option",L=>L.map(o=>o.value));console.log("FROM OPTS",opts.length,opts.filter(v=>/^SOL|^X\|SOL/.test(v)).join(" , ").slice(0,600));
const to=(await pg.$$eval("#xt option",L=>L.map(o=>o.value))).find(v=>/^ETH\.USDC/.test(v));console.log("TO",to);
async function run(tag,from,amt){await pg.selectOption("#xf",from);await pg.waitForTimeout(700);await pg.selectOption("#xt",to);await pg.waitForTimeout(700);await pg.fill("#xamt",amt);await pg.waitForTimeout(300);
 await pg.click('[data-act="xquote"]');for(let i=0;i<15;i++){await pg.waitForTimeout(1000);const t=await pg.$eval("#xq",e=>e.innerText);if(t)break}
 console.log(tag,"QUOTE",(await pg.$eval("#xq",e=>e.innerText)).replace(/\n+/g," | "),"||",(await pg.$eval("#xres",e=>e.innerText)));
 await pg.click('[data-act="xswap"]');for(let i=0;i<25;i++){await pg.waitForTimeout(1200);const t=await pg.$eval("#xres",e=>e.innerText);if(!/Calculando|Consultando|firma|Preparando/i.test(t))break}
 console.log(tag,"RES",(await pg.$eval("#xres",e=>e.innerText)).slice(0,300))}
await run("S1 SOL→USDC(ETH)","SOL.SOL","0.05");
const xt=opts.find(v=>/^X\|SOL\|/.test(v));if(xt)await run("S2 "+xt.split("|")[3]+"→USDC(ETH)",xt,String(Math.max(1,0)));
const xe=opts.find(v=>/^X\|(ETH|BASE|BSC)\|/.test(v));console.log("EVM X",xe);
await pg.screenshot({path:"shots/x1.png"});
// Vault desde Solana
await click("data-v","lottery");for(let i=0;i<30;i++){await pg.waitForTimeout(2000);if(await pg.evaluate(()=>document.querySelectorAll('#lotInfo [data-pool^="vt:"]').length))break}
await click("data-pool","vt:8453:0xbeef0e0834849acc03f0089f01f4f1eeb06873c9");await pg.waitForTimeout(5000);
const vo=await pg.$$eval("#vtpay option",L=>L.map(o=>o.value+"="+o.textContent));console.log("VT PAY",vo.join(" , ").slice(0,700));
const sv=vo.map(x=>x.split("=")[0]).find(v=>v==="sol:So11111111111111111111111111111111111111112");
if(sv){await pg.selectOption("#vtpay",sv);await pg.waitForTimeout(800);await pg.fill("#vtamt","0.05");await pg.waitForTimeout(3000);
 console.log("VT SUM",(await pg.$eval("#vtsum",e=>e.innerText)).replace(/\n+/g," | "));await pg.screenshot({path:"shots/x2.png"});
 await pg.click('[data-act="vtdep"]');for(let i=0;i<25;i++){await pg.waitForTimeout(1500);const t=await pg.$eval("#vtres",e=>e.innerText);if(t&&!/Consultando|firma|Preparando/i.test(t))break}
 console.log("VT RES",(await pg.$eval("#vtres",e=>e.innerText)).slice(0,300))}
console.log("ERRS",JSON.stringify(errs).slice(0,600));
for(const f of fs.readdirSync("shots")){const p2=await b.newPage();await p2.goto("file://"+process.cwd()+"/shots/"+f);const j=(await p2.screenshot({type:"jpeg",quality:55})).toString("base64");await p2.close();j.match(/.{1,3000}/g).forEach((c,i)=>console.log("IMG "+f+" "+i+" "+c))}
await b.close();
