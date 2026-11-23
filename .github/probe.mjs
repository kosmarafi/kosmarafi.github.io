const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
const { PublicKey } = await import("@solana/web3.js");
const P="wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8",PROG=new PublicKey(P),W="whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";
const bs="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const hex=s=>{let n=0n;for(const c of s)n=n*58n+BigInt(bs.indexOf(c));let h=n.toString(16);if(h.length%2)h="0"+h;return h};
const sigs=await call("getSignaturesForAddress",[P,{limit:200}]);let n=0;
for(const s of sigs){if(n>=2)break;if(s.err)continue;const t=await call("getTransaction",[s.signature,{encoding:"jsonParsed",maxSupportedTransactionVersion:0}]);if(!t)continue;
 const L=(t.meta.logMessages||[]).join("|");if(!/HarvestSwapAndReinvestPre/.test(L))continue;n++;
 console.log("\n### HARVEST",s.signature.slice(0,10),"signers",t.transaction.message.accountKeys.filter(k=>k.signer).map(k=>k.pubkey).join(","));
 const outer=t.transaction.message.instructions;
 outer.forEach((ix,k)=>{if(ix.programId===P)console.log(" auto ix",k,"data",hex(ix.data).slice(0,60),"\n  acc",ix.accounts.join(" "))});
 const all=[];(t.meta.innerInstructions||[]).forEach(g=>g.instructions.forEach(i=>{if(i.programId===W)all.push(i)}));
 all.forEach(i=>console.log(" whirl inner data",hex(i.data).slice(0,16),"acc",(i.accounts||[]).slice(0,6).join(" ")));
 // fuerza bruta: autoridad de CollectFeesV2 = acc[1]
 const auth=all[0]&&all[0].accounts[1];console.log(" AUTH",auth);
 const cand=[...new Set(outer.filter(i=>i.programId===P).flatMap(i=>i.accounts))];
 const S=["","delegate","authority","position_authority","automation","automation_authority","signer","pda","auth","vault","delegate_authority","position_delegate"];
 for(const st of S)for(const a of cand)for(const b of [null,...cand])for(const x of [[],[Buffer.from([0])]]){const seeds=[...(st?[Buffer.from(st)]:[]),new PublicKey(a).toBuffer(),...(b&&b!==a?[new PublicKey(b).toBuffer()]:[]),...x];try{const [p]=PublicKey.findProgramAddressSync(seeds,PROG);if(p.toBase58()===auth)console.log(" MATCH auth",st,a,b,x.length)}catch(e){}}
}
