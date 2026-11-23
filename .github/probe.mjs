import { createSolanaRpc, address, createNoopSigner, pipe, createTransactionMessage, setTransactionMessageFeePayerSigner, setTransactionMessageLifetimeUsingBlockhash, appendTransactionMessageInstructions, partiallySignTransactionMessageWithSigners, getBase64EncodedWireTransaction } from "@solana/kit";
import * as A from "./src/auto.js";
const URL="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const rpc=createSolanaRpc(URL);
const owner="DCpVrKPdytGgDUDBfjzMzYSnTAeMXPanf5BoPbQ7cWKS",mint="DV8msyuktcoyfeapkEYBQ8jSZrvifD2qrftpiszSEhmJ";
const S=x=>JSON.stringify(x,(k,v)=>typeof v==="bigint"?String(v):v);
const c=await A.autoCtx(rpc,owner,mint);console.log("CTX",S({ta:c.ta,auto:c.auto,authority:c.authority,active:c.active,delegate:c.delegate,bA:c.bA,bB:c.bB,cfg:await A.globalConfigPda(),pp:c.poolPrice}));
const signer=createNoopSigner(address(owner));
const sim=async(name,ixs)=>{const bh=(await rpc.getLatestBlockhash().send()).value;const m=pipe(createTransactionMessage({version:0}),x=>setTransactionMessageFeePayerSigner(signer,x),x=>setTransactionMessageLifetimeUsingBlockhash(bh,x),x=>appendTransactionMessageInstructions(ixs,x));const t=await partiallySignTransactionMessageWithSigners(m);const b=getBase64EncodedWireTransaction(t);
 const r=(await rpc.simulateTransaction(b,{encoding:"base64",sigVerify:false,replaceRecentBlockhash:true}).send()).value;console.log("SIM",name,"bytes",Buffer.from(b,"base64").length,"err",S(r.err));console.log((r.logs||[]).filter(l=>!/consumed|success|invoke \[/.test(l)).slice(0,25).join("\n"))};
const off=await A.autoOffIxs(c,signer);await sim("off",off);
const on=await A.autoOnIxs(Object.assign({},c),signer,{},{});console.log("thr",S({a:on.thrA,b:on.thrB}));
await sim("off+on",off.concat(on.ixs));
console.log("STATUS",S(await A.autoStatus(rpc,owner,[{mint,pos:c.pos}])));
// transacciones RemoveAutomations reales para comparar
const sigs=(await rpc.getSignaturesForAddress(A.AUTO_PROGRAM,{limit:400}).send());let shown=0;
for(const s of sigs){if(shown>=1)break;if(s.err)continue;const t=await rpc.getTransaction(s.signature,{encoding:"json",maxSupportedTransactionVersion:0}).send();if(!t||!(t.meta.logMessages||[]).some(l=>l.includes("RemoveAutomation")))continue;shown++;
 const keys=t.transaction.message.accountKeys.concat(t.meta.loadedAddresses?t.meta.loadedAddresses.writable.concat(t.meta.loadedAddresses.readonly):[]);
 for(const ix of t.transaction.message.instructions){const p=keys[ix.programIdIndex];console.log("RM ix",p.slice(0,8),"data",ix.data,"accs",ix.accounts.map(i=>keys[i].slice(0,6)).join(","))}}
