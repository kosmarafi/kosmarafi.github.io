const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
const { PublicKey } = await import("@solana/web3.js");
const PROG=new PublicKey("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8"),WP=new PublicKey("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc");
const AUTO="EyTd3kbpSmRKyJ9nuujZpzPRUGX7P36dftrWm7he8B8c",DEL="BTx1hsRXg4EL1MzATNtWZcuVcnnBK9PNVUaYfAjXrbSY";
const i=await call("getAccountInfo",[AUTO,{encoding:"base64"}]);const d=Buffer.from(i.value.data[0],"base64");
console.log("HEX",d.toString("hex"));
for(let o=0;o+32<=d.length;o++){const k=new PublicKey(d.subarray(o,o+32)).toBase58();if(["BTx1hs","CG2m57","4XWwPS","DCpVrK","DV8msy","at1s2A","8u4k1U","B78teY","9MxmA1"].some(p=>k.startsWith(p)))console.log("key@",o,k)}
// brute: delegate = PDA(PROG, [str, automation]) etc
const strs=["delegate","authority","position_authority","automation_authority","auto","signer","owner","vault","automation","position","keeper","pda","Delegate","automation_delegate","position_delegate",""];
const objs={auto:new PublicKey(AUTO),ta:new PublicKey("CG2m57zVtqkqQE3yX3eJSSXKXUnTbzbMzKb1BsT4QHYB"),pos:new PublicKey("4XWwPShcSxkNu6NVSVpdnn23EV4ZxrrFoS4YReboZNna"),mint:new PublicKey("DV8msyuktcoyfeapkEYBQ8jSZrvifD2qrftpiszSEhmJ")};
const progs={PROG,WP};
let found=0;
for(const [pn,pg] of Object.entries(progs))for(const s of strs)for(const [a,ka] of Object.entries(objs)){
 const tries=[[Buffer.from(s),ka.toBuffer()],[ka.toBuffer(),Buffer.from(s)]];
 for(const [b,kb] of Object.entries(objs)){if(a!==b)tries.push([Buffer.from(s),ka.toBuffer(),kb.toBuffer()])}
 for(const t of tries){for(const ex of [null,0,1]){const seeds=(ex===null?t:[...t,Buffer.from([ex])]).filter(x=>x.length);try{const r=PublicKey.findProgramAddressSync(seeds,pg)[0].toBase58();if(r===DEL){console.log("FOUND",pn,s,a,ex,seeds.length);found++}}catch(e){}}}
}
console.log("found",found);
