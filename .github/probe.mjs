import { id, AbiCoder } from "ethers";
const RPC={ETH:"https://ethereum-rpc.publicnode.com",BSC:"https://bsc-rpc.publicnode.com",BASE:"https://base-rpc.publicnode.com",ARB:"https://arbitrum-one-rpc.publicnode.com",OP:"https://optimism-rpc.publicnode.com"};
const call=async(c,to,data)=>{const r=await fetch(RPC[c],{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_call",params:[{to,data},"latest"]})});const j=await r.json();return j.result||null};
const C=[["BASE","uni","0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1"],["ARB","uni","0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],["OP","uni","0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
["BASE","pcs","0x46A15B0b27311cedF172AB29E4f4766fbE7F4364"],["ARB","pcs","0x46A15B0b27311cedF172AB29E4f4766fbE7F4364"],
["ETH","sushi","0x2214A42d8e2A1d20635c2cb0664422c528B6A432"],["ARB","sushi","0xF0cBce1942A68BEB3d1b73F0dd86C8DCc363eF49"],["BASE","sushi","0x80C7DD17B01855a6D2347444a0FCC36136a314de"],["BSC","sushi","0xF70c086618dcf2b1A461311275e00D6B722ef914"],["OP","sushi","0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e"],
["BASE","aero","0x827922686190790b37229fd06084350E74485b72"],["BASE","aero2","0xa990C6a764b73BF43cee5Bb40339c3322FB9D55F"],["OP","velo","0x416b433906b1B72FA758e166e239c43d68dC6F29"],["OP","velo2","0x991d5546C4B442B4c5fdc4c8B8b8d131DEB24702"],["OP","velo3","0xbB5DFE1380333CEE4c2EeBd7202c80dE2256AdF4"]];
const ab=AbiCoder.defaultAbiCoder();
const dstr=h=>{try{return ab.decode(["string"],h)[0]}catch(e){return "?"}};
for(const [c,k,a] of C){
 const [fac,weth,ts,nm]=await Promise.all(["0xc45a0155","0x4aa4a4fc","0x18160ddd","0x06fdde03"].map(s=>call(c,a,s)));
 let line=`NPM ${c} ${k} ${a} name=${nm?dstr(nm):"-"} factory=${fac?"0x"+fac.slice(-40):"-"} weth=${weth?"0x"+weth.slice(-40):"-"} total=${ts?BigInt(ts):"-"}`;
 if(ts&&BigInt(ts)>0n){const tid=await call(c,a,"0x4f6ccce7"+(BigInt(ts)-3n).toString(16).padStart(64,"0"));if(tid){const p=await call(c,a,"0x99fbab88"+tid.slice(2));if(p){const w=p.slice(2).match(/.{64}/g);const t0="0x"+w[2].slice(24),t1="0x"+w[3].slice(24),f=BigInt("0x"+w[4]);line+=` pos.f4=${f}`;
   const g1=await call(c,"0x"+fac.slice(-40),"0x1698ee82"+t0.slice(2).padStart(64,"0")+t1.slice(2).padStart(64,"0")+f.toString(16).padStart(64,"0"));
   const g2=await call(c,"0x"+fac.slice(-40),id("getPool(address,address,int24)").slice(0,10)+t0.slice(2).padStart(64,"0")+t1.slice(2).padStart(64,"0")+f.toString(16).padStart(64,"0"));
   line+=` getPool(uint24)=${g1?"0x"+g1.slice(-40):"-"} getPool(int24)=${g2?"0x"+g2.slice(-40):"-"}`;
   const pool=g2&&BigInt(g2)>0n?"0x"+g2.slice(-40):g1&&BigInt(g1)>0n?"0x"+g1.slice(-40):null;
   if(pool){const fee=await call(c,pool,"0xddca3f43"),s0=await call(c,pool,"0x3850c7bd"),tsp=await call(c,pool,"0xd0c93a7c");line+=` pool.fee=${fee?BigInt(fee):"-"} tickSpacing=${tsp?BigInt(tsp):"-"} slot0len=${s0?s0.length:"-"}`}}}}
 console.log(line)}
for(const s of ["mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))","mint((address,address,int24,int24,int24,uint256,uint256,uint256,uint256,address,uint256,uint160))","getPool(address,address,int24)","fee()","tickSpacing()","token0()","token1()","liquidity()","stakedValues(address)","gauge()"])console.log("SEL",s,id(s).slice(0,10));
