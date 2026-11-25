import { chromium } from "playwright";
const ANV="http://127.0.0.1:8545",ME="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const USDC="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",WETH="0x4200000000000000000000000000000000000006";
const rpc=async(method,params)=>{const r=await fetch(ANV,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method,params})});const j=await r.json();if(j.error)throw new Error(JSON.stringify(j.error));return j.result};
const bal=async(t,a=ME)=>BigInt(await rpc("eth_call",[{to:t,data:"0x70a08231"+a.slice(2).toLowerCase().padStart(64,"0")},"latest"]));
const eth=async()=>BigInt(await rpc("eth_getBalance",[ME,"latest"]));
const AM=(await (await fetch("https://api.v3.aave.com/graphql",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({query:'{markets(request:{chainIds:[8453]}){name reserves(request:{reserveType:SUPPLY}){underlyingToken{symbol} aToken{address}}}}'})})).json()).data.markets.find(m=>m.name==="AaveV3Base");
const aT=s=>AM.reserves.find(r=>r.underlyingToken.symbol===s).aToken.address;
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844},locale:"es-ES"});const errs=[];pg.on("pageerror",e=>errs.push(e.message));
pg.on("console",m=>{const t=m.text();if(/error|Vault EVM/i.test(t))console.log("CONSOLE",t.slice(0,300))});
await pg.route(/base-rpc\.publicnode\.com|mainnet\.base\.org/,async r=>{const res=await fetch(ANV,{method:"POST",headers:{"content-type":"application/json"},body:r.request().postData()});r.fulfill({status:200,headers:{"content-type":"application/json","access-control-allow-origin":"*"},body:await res.text()})});
await pg.route(/li\.quest\/v1\/wallets\/.*\/balances/,async r=>{const e=Number(await eth())/1e18,u=Number(await bal(USDC))/1e6;
 r.fulfill({status:200,headers:{"content-type":"application/json","access-control-allow-origin":"*"},body:JSON.stringify({balances:{8453:[{address:"0x0000000000000000000000000000000000000000",symbol:"ETH",decimals:18,amount:String(BigInt(Math.floor(e*1e18))),priceUSD:"3000",verificationStatus:"verified"},{address:USDC,symbol:"USDC",decimals:6,amount:String(Math.floor(u*1e6)),priceUSD:"1",verificationStatus:"verified"}]}})})});
await pg.exposeFunction("__anv",async(m,p)=>rpc(m,p));
await pg.addInitScript((ME)=>{window.__atomic=false;window.__n=0;const B={};
 const prov={isMetaMask:true,on(){},removeListener(){},request:async({method,params})=>{
  if(method==="eth_requestAccounts"||method==="eth_accounts")return [ME];
  if(method==="eth_chainId")return "0x2105";
  if(method==="wallet_switchEthereumChain")return null;
  if(method==="wallet_getCapabilities")return window.__atomic?{"0x2105":{atomic:{status:"supported"}}}:{};
  if(method==="eth_sendTransaction"){window.__n++;const t=Object.assign({},params[0]);delete t.gas;return window.__anv("eth_sendTransaction",[t])}
  if(method==="wallet_sendCalls"){if(!window.__atomic)throw Object.assign(new Error("Method not supported"),{code:4200});window.__n++;const id="b"+Date.now(),R=[];
   for(const c of params[0].calls){const h=await window.__anv("eth_sendTransaction",[{from:ME,to:c.to,data:c.data,value:c.value}]);R.push(await window.__anv("eth_getTransactionReceipt",[h]))}B[id]=R;return {id}}
  if(method==="wallet_getCallsStatus")return {status:200,receipts:B[params[0]]};
  return window.__anv(method,params)}};
 window.ethereum=prov;
 const ann=()=>window.dispatchEvent(new CustomEvent("eip6963:announceProvider",{detail:Object.freeze({info:{uuid:"mm-test",name:"MetaMask",icon:"data:,",rdns:"io.metamask"},provider:prov})}));
 window.addEventListener("eip6963:requestProvider",ann);ann();localStorage.setItem("kz_w","-")},ME);
await pg.goto("http://127.0.0.1:8080/?t="+Date.now(),{waitUntil:"domcontentloaded"});await pg.waitForTimeout(6000);
const click=async(attr,val)=>pg.evaluate(([a,v])=>{const x=document.createElement("button");x.setAttribute(a,v);x.style.display="none";document.body.appendChild(x);x.click();x.remove()},[attr,val]);
await click("data-w","mm");await pg.waitForTimeout(3000);
await click("data-v","lottery");
for(let i=0;i<30;i++){await pg.waitForTimeout(2000);const n=await pg.evaluate(()=>document.querySelectorAll('#lotInfo [data-pool^="vt:"]').length);if(n){console.log("VAULT ROWS",n);break}}
console.log("LOTINFO",(await pg.$eval("#lotInfo",e=>e.innerText)).replace(/\n+/g," | ").slice(0,900));
console.log("LOTMAIN",(await pg.$eval("#lotMain",e=>e.innerText)).replace(/\n+/g," | ").slice(0,500));
await pg.screenshot({path:"/tmp/v1.png"});
async function dep(tag,key,pay,amt,atomic){await pg.evaluate(a=>{window.__atomic=a;window.__n=0},atomic);await click("data-pool",key);await pg.waitForTimeout(2500);
 if(pay)await pg.selectOption("#vtpay",pay).catch(e=>console.log("SEL ERR",e.message.slice(0,100)));await pg.waitForTimeout(500);await pg.fill("#vtamt",amt);await pg.waitForTimeout(2500);
 console.log(tag,"SUM",(await pg.$eval("#vtsum",e=>e.innerText)).replace(/\n+/g," | "));
 await pg.click('[data-act="vtdep"]');let t="";for(let i=0;i<60;i++){await pg.waitForTimeout(1500);t=await pg.$eval("#vtres",e=>e.innerText).catch(()=>"");if(/Depositado|No |falló|rechaz|Algo|error|Error|saldo|ruta/i.test(t)&&!/Buscando|esperando|firma en/i.test(t))break}
 console.log(tag,"RES","confirmaciones:",await pg.evaluate(()=>window.__n),t.slice(0,300));await pg.click('[data-act="closeps"]').catch(()=>{});await pg.waitForTimeout(500)}
const k=a=>"vt:8453:"+a.toLowerCase();
const e0=await eth();console.log("ETH inicial",Number(e0)/1e18);
await dep("A1 Aave USDC con ETH (autoswap)",k(USDC),"8453:0x0000000000000000000000000000000000000000","0.01",false);
console.log("  aUSDC",Number(await bal(aT("USDC")))/1e6,"USDC wallet",Number(await bal(USDC))/1e6);
await pg.evaluate(()=>{});await dep("A2 Aave WETH con ETH (nativo)",k(WETH),"8453:0x0000000000000000000000000000000000000000","0.01",false);
console.log("  aWETH",Number(await bal(aT("WETH")))/1e18);
// conseguir USDC para pruebas directas: autoswap a la wallet con KyberSwap ya hecho; si no, swap vía Morpho no. Usamos el USDC sobrante o hacemos un depósito directo pequeño
const MPU="0xbeef0e0834849aCC03f0089F01f4F1Eeb06873C9",MGW="0xFeFeC33668E22677c4762d0853d56245a800ff08",MV1="0xeE8F4eC5672F09119b96Ab6fB59C27E1b7e44b61";
await dep("B1 Morpho Steakhouse Prime USDC con ETH (autoswap, sin agrupar)",k(MPU),"8453:0x0000000000000000000000000000000000000000","0.004",false);
console.log("  shares steakUSDC",String(await bal(MPU)));
await dep("B2 Morpho Gauntlet WETH con ETH (convertir + permiso + depósito)",k(MGW),"8453:0x0000000000000000000000000000000000000000","0.005",false);
console.log("  shares gtWETH",String(await bal(MGW)));
await dep("B3 Morpho Gauntlet USDC Prime v1 con ETH (agrupado, 1 confirmación)",k(MV1),"8453:0x0000000000000000000000000000000000000000","0.004",true);
console.log("  shares gtUSDCp",String(await bal(MV1)),"USDC wallet",Number(await bal(USDC))/1e6);
const u=await bal(USDC);if(u>1000000n){await dep("C1 Aave USDC directo (permiso + depósito)",k(USDC),"8453:"+USDC,"1",false);console.log("  aUSDC",Number(await bal(aT("USDC")))/1e6)}
// Retiradas con los constructores de kzVault, enviadas al fork
for(const [tag,pos] of [["W1 Morpho redeem 100%",{pr:"Morpho",chain:8453,vault:MPU,dec:6}],["W2 Morpho 50%",{pr:"Morpho",chain:8453,vault:MGW,dec:18}],["W3 Aave USDC máx",{pr:"Aave",chain:8453,market:"0xA238Dd80C259a72e81d7e4664a9801593F98d1c5",asset:USDC,dec:6,raw:"0"}]]){
 try{const L=await pg.evaluate(([p,me])=>window.kzVault.withdrawTxs(p,me,100-(p.vault==="0xFeFeC33668E22677c4762d0853d56245a800ff08"?50:0),false),[pos,ME]);const u0=await bal(pos.pr==="Aave"?USDC:(pos.vault===MGW?WETH:USDC));
  for(const t of L){const h=await rpc("eth_sendTransaction",[{from:ME,to:t.to,data:t.data,value:t.value}]);const rc=await rpc("eth_getTransactionReceipt",[h]);if(rc.status!=="0x1")throw new Error("revert")}
  const u1=await bal(pos.pr==="Aave"?USDC:(pos.vault===MGW?WETH:USDC));console.log(tag,"OK recibido",String(u1-u0),pos.vault?"shares restantes "+String(await bal(pos.vault)):"aUSDC "+String(await bal(aT("USDC"))))}catch(e){console.log(tag,"ERR",e.message.slice(0,200))}}
// Puente: la ruta de LI.FI con comisión
const q=await (await fetch("https://li.quest/v1/quote?fromChain=42161&toChain=8453&fromToken=0xaf88d065e77c8cC2239327C5EDb3A432268e5831&toToken="+USDC+"&fromAmount=20000000&fromAddress="+ME+"&toAddress="+ME+"&slippage=0.005&integrator=kosmara-defi&fee=0.002")).json();
console.log("LIFI",q.transactionRequest?"ok":"ERR "+JSON.stringify(q).slice(0,200),q.estimate&&q.estimate.toAmount,(q.estimate&&q.estimate.feeCosts||[]).map(f=>f.name+":"+f.amountUSD).join(","));
// Portafolio: un vigilado con depósitos reales (Aave en Ethereum y Morpho)
await pg.evaluate(()=>{});
console.log("ERRS",JSON.stringify(errs).slice(0,600));
const img=(await pg.screenshot()).toString("base64");
await b.close();
