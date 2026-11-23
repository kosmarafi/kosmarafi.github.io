import zlib from "node:zlib";
import crypto from "node:crypto";
const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<6;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1000));continue}return (await r.json()).result}};
const { PublicKey } = await import("@solana/web3.js");
const PROG=new PublicKey("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8");
// IDL de Anchor (antiguo): createWithSeed(PDA([],prog), "anchor:idl", prog)
const [base]=PublicKey.findProgramAddressSync([],PROG);
const idlAddr=await PublicKey.createWithSeed(base,"anchor:idl",PROG);
console.log("idl addr",idlAddr.toBase58());
const ai=await call("getAccountInfo",[idlAddr.toBase58(),{encoding:"base64"}]);
if(ai&&ai.value){const d=Buffer.from(ai.value.data[0],"base64");const len=d.readUInt32LE(40);try{const j=zlib.inflateSync(d.subarray(44,44+len)).toString();console.log("IDL LEN",j.length);console.log(j.slice(0,12000))}catch(e){console.log("inflate err",e.message)}}else console.log("sin IDL anchor antiguo");
// IDL de Program Metadata (nuevo estandar)
const tx=await call("getTransaction",["3fSTmCaiiixiAZakCizvop4kT6ae1dMhXzNYsJBnYhUbrsQDN5LdZYSktzE7oXNjpAob1FAeaNTZU6GCNfBwPKeB",{encoding:"jsonParsed",maxSupportedTransactionVersion:0}]);
const ix=tx.transaction.message.instructions[4];
console.log("ACCOUNTS",JSON.stringify(ix.accounts));
console.log("DATA",ix.data);
const disc=n=>crypto.createHash("sha256").update("global:"+n).digest().subarray(0,8).toString("hex");
console.log("disc create_automation",disc("create_automation"));
const bs58="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const dec=s=>{let n=0n;for(const c of s)n=n*58n+BigInt(bs58.indexOf(c));let h=n.toString(16);if(h.length%2)h="0"+h;return h};
console.log("DATA hex",dec(ix.data));
console.log("DfXyg info",JSON.stringify(await call("getAccountInfo",["DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh",{encoding:"jsonParsed"}])).slice(0,300));
console.log("delegate 8dFH info",JSON.stringify(await call("getAccountInfo",["8dFH7oR3As2J58HeWXvsekgZwddbPCFu1Hfs8yFNifpE",{encoding:"base64"}])).slice(0,200));
const auto=await call("getAccountInfo",["7V3yCqvBQGk6zZUXr57mpzgYuhLPkrLN7fzD1PatZrNH",{encoding:"base64"}]);
console.log("automation acct hex",Buffer.from(auto.value.data[0],"base64").subarray(0,200).toString("hex"));
const sigs=await call("getSignaturesForAddress",[PROG.toBase58(),{limit:20}]);
for(const s of sigs.slice(0,6)){const t=await call("getTransaction",[s.signature,{encoding:"jsonParsed",maxSupportedTransactionVersion:0}]);if(!t)continue;console.log("\nPROG TX",s.signature.slice(0,10),"signers",t.transaction.message.accountKeys.filter(k=>k.signer).map(k=>k.pubkey).join(","),(t.meta.logMessages||[]).filter(l=>/Instruction:/.test(l)).join(" | ").slice(0,500))}
