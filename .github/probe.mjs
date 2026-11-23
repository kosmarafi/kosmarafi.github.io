import { createSolanaRpcFromTransport, createDefaultRpcTransport, address, createNoopSigner } from "@solana/kit";
import { harvestPositionInstructions } from "@orca-so/whirlpools";
const URL="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const rpc=createSolanaRpcFromTransport(createDefaultRpcTransport({url:URL,headers:{origin:"https://kosmarafi.github.io"}}));
const AUTO="5who9tNcJ1LmhK1PuKCRUdbkSp1hDr7qvyuoiG2qH66N",OWNER="8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21";
const ai=(await rpc.getAccountInfo(address(AUTO),{encoding:"base64"}).send()).value;
if(!ai){console.log("AUTO no existe (desactivada)");}
else{const d=Buffer.from(ai.data[0],"base64");console.log("AUTO next",new Date(Number(d.readBigInt64LE(99))*1000).toISOString(),"len",d.length);
 const pos=(await import("@solana/kit")).getAddressDecoder().decode(d.subarray(464,496));
 const pi=(await rpc.getAccountInfo(pos,{encoding:"base64"}).send()).value;const pd=Buffer.from(pi.data[0],"base64");
 const mint=(await import("@solana/kit")).getAddressDecoder().decode(pd.subarray(40,72));console.log("pos",pos,"mint",mint);

}
const sigs=(await rpc.getSignaturesForAddress(address(AUTO),{limit:50}).send());
for(const s of sigs){const t=await rpc.getTransaction(s.signature,{encoding:"json",maxSupportedTransactionVersion:0}).send();
 console.log("TX",new Date(Number(s.blockTime)*1000).toISOString(),"err",JSON.stringify(s.err),"signer",t.transaction.message.accountKeys[0],"pre/post",JSON.stringify((t.meta.preTokenBalances||[]).filter(b=>b.owner===OWNER).map(b=>[b.mint.slice(0,4),b.uiTokenAmount.uiAmountString]))+" -> "+JSON.stringify((t.meta.postTokenBalances||[]).filter(b=>b.owner===OWNER).map(b=>[b.mint.slice(0,4),b.uiTokenAmount.uiAmountString])),(t.meta.logMessages||[]).filter(l=>/Instruction: /.test(l)).map(l=>l.replace("Program log: Instruction: ","")).join(","))}

for(const s of sigs){const t=await rpc.getTransaction(s.signature,{encoding:"jsonParsed",maxSupportedTransactionVersion:0}).send();
 for(const g of (t.meta.innerInstructions||[]))for(const ix of g.instructions){if(ix.parsed&&/transfer/.test(ix.parsed.type))console.log("XFER",s.signature.slice(0,6),ix.parsed.type,JSON.stringify(ix.parsed.info.tokenAmount?ix.parsed.info.tokenAmount.uiAmountString:ix.parsed.info.amount),ix.parsed.info.mint?ix.parsed.info.mint.slice(0,4):"")}}
