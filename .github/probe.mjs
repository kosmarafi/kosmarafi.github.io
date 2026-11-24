const O={origin:"https://kosmarafi.github.io"};
// Balancer: estructura
for(const q of ['{poolGetPools(first:2,orderBy:totalLiquidity,orderDirection:desc,where:{chainIn:[MAINNET,ARBITRUM,BASE,OPTIMISM]}){id address name chain type poolTokens{symbol address} dynamicData{totalLiquidity} userBalance{totalBalanceUsd walletBalance stakedBalances{balanceUsd}}}}',
 '{poolGetPools(where:{userAddress:"0x8f38e5a7b4a9b5a5a2d3b3c3f3e9d0e8b8a6f1c2",chainIn:[MAINNET]}){id}}']){
 const r=await fetch("https://api-v3.balancer.fi/",{method:"POST",headers:Object.assign({"content-type":"application/json"},O),body:JSON.stringify({query:q})});
 console.log("BAL",r.status,"cors",r.headers.get("access-control-allow-origin"),(await r.text()).slice(0,600))}
// Curve
for(const c of ["ethereum","arbitrum","base","optimism","bsc"]){for(const host of ["https://api.curve.finance/v1/getPools/all/","https://api.curve.fi/api/getPools/all/"]){try{const r=await fetch(host+c,{headers:O});const t=await r.text();let j=null;try{j=JSON.parse(t)}catch(e){}
 const L=j&&j.data&&j.data.poolData||[];const big=L.filter(p=>+p.usdTotal>=500000);console.log("CRV",host.slice(8,26),c,r.status,"cors",r.headers.get("access-control-allow-origin"),"pools",L.length,"big",big.length,big[0]?JSON.stringify({address:big[0].address,name:big[0].name,lp:big[0].lpTokenAddress,gauge:big[0].gaugeAddress,usd:big[0].usdTotal,ts:big[0].totalSupply,coins:(big[0].coins||[]).map(x=>x.symbol)}).slice(0,300):"");break}catch(e){console.log("CRVERR",c,e.message)}}}
// Uniswap v4: PositionManager enumerable?
const V4="0xbd216513d74c8cf14cf4747e6aaa6420ff64ee9e";const r=await fetch("https://ethereum-rpc.publicnode.com",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_call",params:[{to:V4,data:"0x4f6ccce70000000000000000000000000000000000000000000000000000000000000001"},"latest"]})});console.log("V4 tokenByIndex",JSON.stringify(await r.json()).slice(0,200));
