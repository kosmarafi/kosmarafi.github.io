import { Connection, VersionedTransaction, PublicKey } from "@solana/web3.js";
const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const c=new Connection(RPC,{httpHeaders:{origin:"https://kosmarafi.github.io"},commitment:"confirmed"});
const KEEPER="at1s2AR2Ury6CFpXqpd4r6EpUPKiZ5uKBg8xWZaYDWu",OTHER=new PublicKey("7ZeR8DKhdDDXsYHk5oBWPvf9edAzF6cvaJBmuJsry9Uw");
const sigs=await c.getSignaturesForAddress(new PublicKey(KEEPER),{limit:40});
let done=0;
for(const s of sigs){if(s.err||done>=2)continue;
 const raw=await c._rpcRequest("getTransaction",[s.signature,{encoding:"base64",maxSupportedTransactionVersion:0,commitment:"confirmed"}]);const r=raw.result;if(!r)continue;
 if(!(r.meta.logMessages||[]).some(l=>l.includes("HarvestSwapAndReinvestPre")))continue;done++;
 const buf=Buffer.from(r.transaction[0],"base64");
 for(const who of ["keeper","otro"]){
  const tx=VersionedTransaction.deserialize(buf);
  if(who==="otro"){const keys=tx.message.staticAccountKeys;const idx=keys.findIndex(k=>k.toBase58()===KEEPER);keys[idx]=OTHER;console.log("signer idx",idx)}
  const sim=await c.simulateTransaction(tx,{sigVerify:false,replaceRecentBlockhash:true});
  console.log("SIM",s.signature.slice(0,8),who,"err",JSON.stringify(sim.value.err));
  console.log((sim.value.logs||[]).filter(l=>/wpAuto|Error|error|failed|log:/.test(l)&&!/Instruction: (Transfer|GetAccount|Initialize)/.test(l)).slice(0,14).map(l=>"   "+l.slice(0,220)).join("\n"))}}
