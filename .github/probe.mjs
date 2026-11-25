const K="jup_pub_fc0db5fe4cd24284045be587a267338b6e067d0f97e76712fbf9692bd3830f69",H={"content-type":"application/json","x-api-key":K,origin:"https://kosmarafi.github.io"};
const t=await (await fetch("https://api.jup.ag/lend/v1/earn/tokens",{headers:H})).json();
console.log("TOKENS",t.length,JSON.stringify(t[0]).slice(0,900));
const w="8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21";
const p=await (await fetch("https://api.jup.ag/lend/v1/earn/positions?users="+w,{headers:H})).text();console.log("POS",p.slice(0,700));
for(const ep of ["deposit-instructions","withdraw-instructions","deposit"]){const r=await fetch("https://api.jup.ag/lend/v1/earn/"+ep,{method:"POST",headers:H,body:JSON.stringify({asset:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",signer:w,amount:"1000000"})});console.log("EP",ep,r.status,(await r.text()).slice(0,900))}
const e=await (await fetch("https://api.jup.ag/lend/v1/earn/earnings?user="+w+"&positions="+(t[0]&&t[0].address),{headers:H})).text();console.log("EARN",e.slice(0,300));
