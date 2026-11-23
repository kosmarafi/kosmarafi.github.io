const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
const { PublicKey } = await import("@solana/web3.js");
const PROG=new PublicKey("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8");
for(const [auto,dele,ta,pos] of [["9MxmA1o7yQSXnC2FwMB4M6MNtkFAWhURkj8gdGSEuvUb","BTx1hsRXg4EL1MzATNtWZcuVcnnBK9PNVUaYfAjXrbSY","CG2m57zVtqkqQE3yX3eJSSXKXUnTbzbMzKb1BsT4QHYB","4XWwPShcSxkNu6NVSVpdnn23EV4ZxrrFoS4YReboZNna"]]){
 const a=await call("getAccountInfo",[auto,{encoding:"base64"}]);if(!a||!a.value){console.log("no acct",auto);continue}
 const d=Buffer.from(a.value.data[0],"base64");console.log("owner",a.value.owner,"len",d.length);
 const db=new PublicKey(dele).toBuffer();console.log("delegate offset",d.indexOf(db));
 for(const [n,k] of [["ta",ta],["pos",pos]])console.log(n,"offset",d.indexOf(new PublicKey(k).toBuffer()));
 console.log("hex",d.toString("hex").replace(/(0{64,})/g,"[0..]"));
 // automation PDA check
 for(let b=0;b<4;b++){const [p]=PublicKey.findProgramAddressSync([Buffer.from("automation"),new PublicKey(ta).toBuffer(),new PublicKey(pos).toBuffer(),Buffer.from([b])],PROG);console.log("auto pda type",b,p.toBase58()===auto)}
 // delegate: candidates with automation key and bytes
 const S=["","delegate","authority","signer","automation","automation_authority","position_authority","delegate_authority","vault"];
 for(const s of S)for(const extra of [[],[0],[1],[2],[255]])for(const keys of [[auto],[ta],[pos],[ta,pos],[pos,ta],[auto,ta],[auto,pos]]){const seeds=[...(s?[Buffer.from(s)]:[]),...keys.map(k=>new PublicKey(k).toBuffer()),...(extra.length?[Buffer.from(extra)]:[])];try{const [p]=PublicKey.findProgramAddressSync(seeds,PROG);if(p.toBase58()===dele)console.log("DELE MATCH",s,keys.length,extra)}catch(e){}}
}
