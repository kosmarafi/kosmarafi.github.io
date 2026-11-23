import { createSolanaRpcFromTransport, createDefaultRpcTransport, address, createNoopSigner, pipe, createTransactionMessage, setTransactionMessageFeePayerSigner, setTransactionMessageLifetimeUsingBlockhash, appendTransactionMessageInstructions, partiallySignTransactionMessageWithSigners, getBase64EncodedWireTransaction } from "@solana/kit";
import * as A from "./src/auto.js";
const URL="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const rpc=createSolanaRpcFromTransport(createDefaultRpcTransport({url:URL,headers:{origin:"https://kosmarafi.github.io"}}));
const owner="DCpVrKPdytGgDUDBfjzMzYSnTAeMXPanf5BoPbQ7cWKS",mint="DV8msyuktcoyfeapkEYBQ8jSZrvifD2qrftpiszSEhmJ";
const S=x=>JSON.stringify(x,(k,v)=>typeof v==="bigint"?String(v):v);
const c=await A.autoCtx(rpc,owner,mint);const signer=createNoopSigner(address(owner));
const cfg=(await rpc.getAccountInfo(await A.globalConfigPda(),{encoding:"base64"}).send()).value;
console.log("CFG len",cfg&&Buffer.from(cfg.data[0],"base64").length,"hex",cfg&&Buffer.from(cfg.data[0],"base64").toString("hex").slice(0,400));
const sim=async(name,ixs)=>{const bh=(await rpc.getLatestBlockhash().send()).value;const m=pipe(createTransactionMessage({version:0}),x=>setTransactionMessageFeePayerSigner(signer,x),x=>setTransactionMessageLifetimeUsingBlockhash(bh,x),x=>appendTransactionMessageInstructions(ixs,x));const t=await partiallySignTransactionMessageWithSigners(m);const b=getBase64EncodedWireTransaction(t);
 const r=(await rpc.simulateTransaction(b,{encoding:"base64",sigVerify:false,replaceRecentBlockhash:true}).send()).value;console.log("SIM",name.padEnd(22),r.err?"RECHAZADA "+S(r.err)+" | "+(r.logs||[]).filter(l=>/Error|error|failed|log: (?!Instruction|Create|Init)/.test(l)).slice(-3).join(" · "):"ACEPTADA")};
const off=await A.autoOffIxs(c,signer);
const px={EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:1};
for(const [name,minUsd,interval] of [["Orca 5$/12h",5,43200],["5$/4h",5,14400],["1$/1h",1,3600],["0.5$/30min",0.5,1800],["0.1$/10min",0.1,600],["1$/1min",1,60],["10$/24h",10,86400],["0.000001$/1s",0.000001,1]]){
 const on=await A.autoOnIxs(Object.assign({},c),signer,px,{minUsd,interval});await sim(name,off.concat(on.ixs));await new Promise(z=>setTimeout(z,800))}
