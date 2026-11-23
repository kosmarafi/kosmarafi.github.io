const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
const { PublicKey } = await import("@solana/web3.js");
const PROG=new PublicKey("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8"),WP=new PublicKey("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc");
const AUTO="EyTd3kbpSmRKyJ9nuujZpzPRUGX7P36dftrWm7he8B8c",DEL="BTx1hsRXg4EL1MzATNtWZcuVcnnBK9PNVUaYfAjXrbSY";
const i=await call("getAccountInfo",[AUTO,{encoding:"base64"}]);const d=Buffer.from(i.value.data[0],"base64");
const fe=d.indexOf(Buffer.from([0xfe,0xfe]));console.log("len",d.length,"fefe@",fe,"around",d.subarray(fe-4,fe+16).toString("hex"));
const keys={};for(let o=fe+2;o+32<=d.length;o++){const s=d.subarray(o,o+32);if(s.every(x=>x===0))continue;}
for(const o of [fe+14,fe+46,fe+78,fe+110,fe+142,fe+174,400,432,464,496,528]){const s=d.subarray(o,o+32);console.log(o,new PublicKey(s).toBase58())}
// find exact key starts: scan for any 32-byte window that's a PDA-able key; just print windows aligned after first nonzero after fefe
let st=fe+2;while(d[st]===0)st++;console.log("first nonzero after fefe at",st);
const extra=[];for(let o=st;o+32<=d.length;o+=32){const s=d.subarray(o,o+32);if(s.every(x=>x===0))break;const k=new PublicKey(s);extra.push(k);console.log("K",o,k.toBase58())}
const objs={auto:new PublicKey(AUTO),ta:new PublicKey("CG2m57zVtqkqQE3yX3eJSSXKXUnTbzbMzKb1BsT4QHYB"),pos:new PublicKey("4XWwPShcSxkNu6NVSVpdnn23EV4ZxrrFoS4YReboZNna"),mint:new PublicKey("DV8msyuktcoyfeapkEYBQ8jSZrvifD2qrftpiszSEhmJ"),owner:new PublicKey("DCpVrKPdytGgDUDBfjzMzYSnTAeMXPanf5BoPbQ7cWKS"),cfg:new PublicKey("8u4k1UWfjsXHf4qkew5G4kNUdL9VgfQJzmfF6GcptzNh")};
extra.forEach((k,j)=>objs["x"+j]=k);
const strs=["delegate","authority","position_authority","automation_authority","auto","signer","owner","vault","automation","position","keeper","pda","automation_delegate","position_delegate","delegation","delegated","approve","program_authority","escrow","bridge",""];
let found=0;const names=Object.keys(objs);
for(const pg of [PROG,WP])for(const s of strs){
 const S=Buffer.from(s);
 for(const a of names){const A=objs[a].toBuffer();
  const tries=[[S,A],[A,S],[A]];
  for(const b of names){if(a===b)continue;const B=objs[b].toBuffer();tries.push([S,A,B],[A,B],[S,A,B,Buffer.from([0])])}
  for(const t of tries){const seeds=t.filter(x=>x.length);for(const ex of [null,0,1]){const ss=ex===null?seeds:[...seeds,Buffer.from([ex])];try{if(PublicKey.findProgramAddressSync(ss,pg)[0].toBase58()===DEL){console.log("FOUND",pg.toBase58().slice(0,4),JSON.stringify(s),a,ss.length,ex);found++}}catch(e){}}}
 }}
console.log("found",found);
