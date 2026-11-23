const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
const { PublicKey } = await import("@solana/web3.js");
const P="wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8",PROG=new PublicKey(P);
const bs="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const hex=s=>{let n=0n;for(const c of s)n=n*58n+BigInt(bs.indexOf(c));let h=n.toString(16);if(h.length%2)h="0"+h;let z="";for(const c of s){if(c!=="1")break;z+="00"}return z+h};
let before,found={c:0,r:0};const seen=[];
for(let page=0;page<6&&(found.c<5||found.r<3);page++){
 const sigs=await call("getSignaturesForAddress",[P,Object.assign({limit:1000},before?{before}:{})]);if(!sigs||!sigs.length)break;before=sigs[sigs.length-1].signature;
 for(const s of sigs){if(s.err)continue;if(found.c>=5&&found.r>=3)break;
  const t=await call("getTransaction",[s.signature,{encoding:"jsonParsed",maxSupportedTransactionVersion:0}]);if(!t)continue;
  const L=(t.meta.logMessages||[]).join("|");const isC=/CreateAutomation/.test(L),isR=/RemoveAutomations/.test(L);
  if(!(isC&&found.c<5)&&!(isR&&found.r<3))continue;if(isC)found.c++;if(isR)found.r++;
  console.log("\n### "+(isC?"CREATE":"REMOVE")+" "+s.signature.slice(0,12)+" "+new Date(s.blockTime*1000).toISOString());
  t.transaction.message.instructions.forEach((ix,k)=>{if(ix.programId===P)console.log(" ix",k,"data",hex(ix.data),"\n  acc",ix.accounts.join(" "));else if(ix.parsed)console.log(" ix",k,ix.programId.slice(0,6),ix.parsed.type,JSON.stringify(ix.parsed.info).slice(0,260));else console.log(" ix",k,ix.programId.slice(0,8),"data",ix.data&&hex(ix.data).slice(0,40),"acc",(ix.accounts||[]).join(" ").slice(0,200))});
  (t.meta.innerInstructions||[]).forEach(g=>g.instructions.forEach(i=>{if(i.parsed&&/approve|revoke|transfer|closeAccount/i.test(i.parsed.type))console.log("  inner",i.programId.slice(0,6),i.parsed.type,JSON.stringify(i.parsed.info).slice(0,220))}));
  if(isC){const ix=t.transaction.message.instructions.find(i=>i.programId===P);seen.push(ix.accounts)}
 }
}
// semillas candidatas para la cuenta de automatización (acc[1]) y el delegado
const enc=s=>Buffer.from(s);
for(const a of seen.slice(0,2)){
 const [owner,auto,ataA,ataB,posPda,posTa,pool,x8,mA,mB]=a;
 const posMint=(await call("getAccountInfo",[posTa,{encoding:"jsonParsed"}]))?.value?.data?.parsed?.info?.mint;
 console.log("\nposition mint",posMint,"posPda",posPda,"x8",x8);
 const cands={"[automation,position]":[enc("automation"),new PublicKey(posPda).toBuffer()],"[automation,mint]":posMint?[enc("automation"),new PublicKey(posMint).toBuffer()]:null,"[position]":[new PublicKey(posPda).toBuffer()],"[mint]":posMint?[new PublicKey(posMint).toBuffer()]:null,"[automation,owner,position]":[enc("automation"),new PublicKey(owner).toBuffer(),new PublicKey(posPda).toBuffer()],"[automation,owner,mint]":posMint?[enc("automation"),new PublicKey(owner).toBuffer(),new PublicKey(posMint).toBuffer()]:null,"[owner,position]":[new PublicKey(owner).toBuffer(),new PublicKey(posPda).toBuffer()],"[automations,position]":[enc("automations"),new PublicKey(posPda).toBuffer()],"[position_automation,position]":[enc("position_automation"),new PublicKey(posPda).toBuffer()]};
 for(const [k,v] of Object.entries(cands)){if(!v)continue;const [pda]=PublicKey.findProgramAddressSync(v,PROG);if(pda.toBase58()===auto)console.log("AUTO SEED MATCH",k)}
 for(const s of ["authority","delegate","automation_authority","program_authority","signer","vault_authority","keeper","config"]){const [pda]=PublicKey.findProgramAddressSync([enc(s)],PROG);console.log("seed",s,pda.toBase58())}
 console.log("x8 info",JSON.stringify(await call("getAccountInfo",[x8,{encoding:"base64"}])).slice(0,260));
}
