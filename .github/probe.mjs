const TCB="https://gateway.liquify.com/chain/thorchain_api/thorchain",RP="https://ethereum-rpc.publicnode.com";
const R=async(m,p)=>(await (await fetch(RP,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})})).json());
const h32=x=>(typeof x==="bigint"?x.toString(16):String(x).replace(/^0x/i,"").toLowerCase()).padStart(64,"0");const hexU=s=>Buffer.from(s).toString("hex");
let ME="";{const blk=(await R("eth_getBlockByNumber",["latest",true])).result;for(const t of blk.transactions){if((await R("eth_getCode",[t.from,"latest"])).result!=="0x")continue;const b=BigInt((await R("eth_getBalance",[t.from,"latest"])).result);if(b>200000000000000000n){ME=t.from;break}}}
const q=await (await fetch(TCB+"/quote/swap?from_asset=ETH.ETH&to_asset=SOL.SOL&amount=10000000&streaming_interval=1&streaming_quantity=0&destination=5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9&affiliate=thor15te48306vf9l354lpd2me70tezeep7aee6zg25&affiliate_bps=30")).json();
console.log("QRAW",JSON.stringify(q).slice(0,300));console.log("Q",q.router,q.inbound_address,q.memo,q.expiry);
const amt=100000000000000000n,mb=hexU(q.memo),ml=mb.length/2;
const data="0x44bc937b"+h32(q.inbound_address)+h32("0x0000000000000000000000000000000000000000")+h32(amt)+h32(160n)+h32(BigInt(q.expiry))+h32(BigInt(ml))+mb.padEnd(Math.ceil(ml/32)*64,"0");
console.log("EST router",ME,JSON.stringify(await R("eth_estimateGas",[{from:ME,to:q.router,data,value:"0x"+amt.toString(16)}])));
