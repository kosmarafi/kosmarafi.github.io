const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
const A='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const b58d=s=>{let n=0n;for(const c of s)n=n*58n+BigInt(A.indexOf(c));let h=n.toString(16);if(h.length%2)h="0"+h;let b=n?Buffer.from(h,"hex"):Buffer.alloc(0);const z=s.length-s.replace(/^1+/,"").length;return Buffer.concat([Buffer.alloc(z),b])};
const sigs=await call("getSignaturesForAddress",["wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8",{limit:300}]);
const now=Date.now()/1000;let n=0;
for(const s of sigs){if(s.err||now-s.blockTime>3600)continue;const t=await call("getTransaction",[s.signature,{encoding:"json",maxSupportedTransactionVersion:0}]);if(!t)continue;
 const keys=t.transaction.message.accountKeys;
 for(const ix of t.transaction.message.instructions){if(keys[ix.programIdIndex]!=="wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8")continue;const d=b58d(ix.data);if(d[0]!==2)continue;
  const interval=d.readUInt32LE(13),thrA=d.readBigUInt64LE(18),thrB=d.readBigUInt64LE(27),next=Number(d.readBigInt64LE(4));
  console.log("CREATE",new Date(s.blockTime*1000).toISOString(),"owner",keys[ix.accounts[0]],"auto",keys[ix.accounts[1]],"pool",keys[ix.accounts[6]],"interval",interval,"thrA",thrA,"thrB",thrB,"next",new Date(next*1000).toISOString(),"sig",s.signature);n++}}
console.log("creates last hour",n);
