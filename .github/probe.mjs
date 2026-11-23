const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
const { PublicKey } = await import("@solana/web3.js");
const PROG=new PublicKey("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8"),WP=new PublicKey("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc");
const pk=s=>new PublicKey(s),pda=(seeds,prog)=>PublicKey.findProgramAddressSync(seeds,prog)[0].toBase58();
// muestra del usuario
const mint="CatuLmjYg7oeJsu8FaivXRXyTobQ3wHzMd1wMZ9kXXyc";
console.log("position pda (whirlpool) =",pda([Buffer.from("position"),pk(mint).toBuffer()],WP),"vs acc4 7V23aYpgETVKZYqq5ttunnxN5PSGP1irhEkiSyXo61Jw");
// harvest sample
const H1=["at1s2AR2Ury6CFpXqpd4r6EpUPKiZ5uKBg8xWZaYDWu","9MxmA1o7yQSXnC2FwMB4M6MNtkFAWhURkj8gdGSEuvUb","B78teYb3g42dNLzFtYmFyyqcmtQbV91QdoQxBdZ5w7iE","EyTd3kbpSmRKyJ9nuujZpzPRUGX7P36dftrWm7he8B8c","BTx1hsRXg4EL1MzATNtWZcuVcnnBK9PNVUaYfAjXrbSY","CG2m57zVtqkqQE3yX3eJSSXKXUnTbzbMzKb1BsT4QHYB","4XWwPShcSxkNu6NVSVpdnn23EV4ZxrrFoS4YReboZNna"];
for(const b of [0,1]){console.log("auto pda(ta,pos,"+b+") =",pda([Buffer.from("automation"),pk(H1[5]).toBuffer(),pk(H1[6]).toBuffer(),Buffer.from([b])],PROG))}
for(const a of H1.slice(1)){const i=await call("getAccountInfo",[a,{encoding:"base64"}]);console.log(a.slice(0,6),i&&i.value?("owner "+i.value.owner.slice(0,8)+" len "+Buffer.from(i.value.data[0],"base64").length):"none")}
const ta=await call("getAccountInfo",[H1[5],{encoding:"jsonParsed"}]);console.log("ta info",JSON.stringify(ta&&ta.value&&ta.value.data.parsed&&ta.value.data.parsed.info).slice(0,300));
