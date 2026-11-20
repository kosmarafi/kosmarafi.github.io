const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<6;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1000));continue}return (await r.json()).result}};
const POOL="J7mEHdBtAKGUsfiGnk3bL9cRVxqqcqx4HTxXb4wNnrsk";
const A="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const enc=(u)=>{let n=0n;for(const x of u)n=n*256n+BigInt(x);let s="";while(n>0n){s=A[Number(n%58n)]+s;n/=58n}for(const x of u){if(x)break;s="1"+s}return s};
const accs=await call("getProgramAccounts",["whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",{encoding:"base64",filters:[{dataSize:216},{memcmp:{offset:8,bytes:POOL}}]}]);
console.log("positions",accs.length);
let wallet=null;
for(const a of accs){const d=Buffer.from(a.account.data[0],"base64");const mint=enc(d.subarray(40,72));const L=d.readBigUInt64LE(72)+(d.readBigUInt64LE(80)<<64n);const tl=d.readInt32LE(88),tu=d.readInt32LE(92);
 const la=await call("getTokenLargestAccounts",[mint]);const ta=la&&la.value&&la.value.find(v=>v.uiAmount===1);if(!ta)continue;
 const ai=await call("getAccountInfo",[ta.address,{encoding:"jsonParsed"}]);const ow=ai?.value?.data?.parsed?.info?.owner;
 if(ow&&ow.startsWith("8AMf")){wallet=ow;console.log("USER",ow,"L",L.toString(),tl,tu,mint)} }
const w=await call("getAccountInfo",[POOL,{encoding:"base64"}]);const wd=Buffer.from(w.value.data[0],"base64");
console.log("pool liquidity",(wd.readBigUInt64LE(49)+(wd.readBigUInt64LE(57)<<64n)).toString());
if(wallet){for(const u of [`wallet/${wallet}/positions`,`positions?wallet=${wallet}`,`positions?owner=${wallet}`,`portfolio/${wallet}`,`wallets/${wallet}/positions`]){const r=await fetch("https://api.orca.so/v2/solana/"+u);console.log("==",u,r.status,(await r.text()).slice(0,2500))}}
const p=await (await fetch("https://api.orca.so/v2/solana/pools/"+POOL)).json();const d=p.data;console.log("liq",d.liquidity,"tvl",d.tvlUsdc,"yot",d.yieldOverTvl,JSON.stringify(d.stats["24h"]),"adaptive",d.adaptiveFeeEnabled,JSON.stringify(d.adaptiveFee));
