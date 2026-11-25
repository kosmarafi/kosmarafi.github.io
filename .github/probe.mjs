const post=async(u,q,v)=>{const r=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:q,variables:v})});return r.json()};
const A="https://api.v3.aave.com/graphql",M="https://api.morpho.org";
const RPC={1:"https://ethereum-rpc.publicnode.com",8453:"https://base-rpc.publicnode.com",42161:"https://arbitrum-one-rpc.publicnode.com",10:"https://optimism-rpc.publicnode.com",56:"https://bsc-rpc.publicnode.com"};
const call=async(c,to,data)=>{const r=await fetch(RPC[c],{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_call",params:[{to,data},"latest"]})});return (await r.json()).result};
const mk=await post(A,`{markets(request:{chainIds:[1,8453,42161,10,56]}){name address chain{chainId} reserves(request:{reserveType:SUPPLY}){underlyingToken{symbol address decimals} aToken{address} acceptsNative{symbol} permitSupported isFrozen isPaused size{usd} supplyInfo{apy{value} supplyCapReached}}}}`);
if(mk.errors)console.log("AAVE ERR",JSON.stringify(mk.errors).slice(0,800));
for(const m of (mk.data&&mk.data.markets)||[]){const c=m.chain.chainId;const ap=await call(c,m.address,"0x0542975c");const prov="0x"+(ap||"").slice(26);const gp=await call(c,prov,"0x026b1d5f");
 const R=(m.reserves||[]).filter(r=>!r.isFrozen&&!r.isPaused&&+r.size.usd>=5e6);
 console.log("AAVE MKT",c,m.name,m.address,"provider",prov,"getPool ok:",("0x"+(gp||"").slice(26)).toLowerCase()===m.address.toLowerCase(),"reservas>5M:",R.length,R.slice(0,6).map(r=>r.underlyingToken.symbol+"("+(+r.supplyInfo.apy.value*100).toFixed(2)+"%"+(r.acceptsNative?",nat":"")+(r.permitSupported?",permit":"")+(r.supplyInfo.supplyCapReached?",CAP":"")+")").join(" "))}
const base=(mk.data.markets||[]).find(m=>m.chain.chainId===8453&&/Base/.test(m.name));
const U="0x3304E22DDaa22bCdC5fCa2269b418046aE7b566A";
const usdc=base.reserves.find(r=>r.underlyingToken.symbol==="USDC");
const s1=await post(A,`query($r:SupplyRequest!){supply(request:$r){__typename ...on TransactionRequest{to data value} ...on ApprovalRequired{reason requiredAmount{value} approval{to data} originalTransaction{to data value}} ...on InsufficientBalanceError{required{value} available{value}}}}`,{r:{market:base.address,chainId:8453,sender:U,amount:{erc20:{currency:usdc.underlyingToken.address,value:"1"}}}});
console.log("AAVE SUPPLY erc20",JSON.stringify(s1).slice(0,900));
const s2=await post(A,`query($r:SupplyRequest!){supply(request:$r){__typename ...on TransactionRequest{to data value} ...on ApprovalRequired{reason} ...on InsufficientBalanceError{required{value} available{value}}}}`,{r:{market:base.address,chainId:8453,sender:U,amount:{native:"0.001"}}});
console.log("AAVE SUPPLY native",JSON.stringify(s2).slice(0,900));
const w=await post(A,`{__type(name:"WithdrawErc20AmountInput"){inputFields{name type{name kind ofType{name}}}} n:__type(name:"WithdrawNativeAmountInput"){inputFields{name type{name kind ofType{name}}}} e:__type(name:"Erc20AmountInput"){inputFields{name type{name kind ofType{name}}}} p:__type(name:"PermitTypedDataResponse"){fields{name}} s:__type(name:"Erc20AmountInput"){inputFields{name}} am:__type(name:"AmountInputVariant"){inputFields{name}}}`);
console.log("AAVE TYPES",JSON.stringify(w).slice(0,1500));
const us=await post(A,`query($r:UserSuppliesRequest!){userSupplies(request:$r){market{address chain{chainId}} currency{symbol address decimals} balance{amount{value} usd} apy{value}}}`,{r:{markets:[{address:base.address,chainId:8453}],user:"0x9a8E2cA5FBb6A2C8f9D1a2B6E2C1b6aB8d3f4E10"}});
console.log("AAVE USERSUP",JSON.stringify(us).slice(0,600));
const g=async p=>{const r=await fetch(M+p,{headers:{accept:"application/json"}});const t=await r.text();return r.status+" "+t};
for(const v of ["v0/vaults-v1","v0/vaults-v2"]){const t=await g("/"+v+"?chain_ids=1,8453,42161,10&limit=1000");console.log("MORPHO",v,t.slice(0,600));
 try{const j=JSON.parse(t.slice(4));const L=(j.data||[]);console.log("MORPHO",v,"n=",L.length,"cursor",j.cursor);console.log("MORPHO",v,"names",L.filter(x=>/steak|gauntlet|smokehouse|spark|re7|mev|block ?analitica|moonwell|seamless|k3/i.test(x.name)).map(x=>(x.chain_id||x.chainId||"")+":"+x.vault_address+":"+x.name).join(" ; ").slice(0,6000))}catch(e){console.log("parse",e.message)}}
console.log("MORPHO v1 state",(await g("/v0/vaults-v1/1:0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB/state")).slice(0,800));
console.log("MORPHO v1 apy",(await g("/v0/vaults-v1/1:0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB/apy-averages?lookback=seven_days")).slice(0,600));
console.log("MORPHO v1 detail",(await g("/v0/vaults-v1/1:0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB")).slice(0,1500));
console.log("MORPHO pos",(await g("/v0/vaults-v1/users/0x3304E22DDaa22bCdC5fCa2269b418046aE7b566A/positions")).slice(0,600));
console.log("MORPHO price",(await g("/v0/tokens/1:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/price")).slice(0,300));
