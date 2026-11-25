const K="jup_pub_fc0db5fe4cd24284045be587a267338b6e067d0f97e76712fbf9692bd3830f69",H={"content-type":"application/json","x-api-key":K,origin:"https://kosmarafi.github.io"};
const w="8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21";
const p=await (await fetch("https://api.jup.ag/lend/v1/earn/positions?users="+w,{headers:H})).json();
p.forEach(x=>{const y=Object.assign({},x);delete y.token;console.log("POSKEYS",x.token.symbol,JSON.stringify(y).slice(0,300))});
await new Promise(z=>setTimeout(z,1500));
for(const [ep,b] of [["redeem-instructions",{asset:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",signer:w,shares:"1000000"}],["deposit-instructions",{asset:"So11111111111111111111111111111111111111112",signer:w,amount:"10000000"}]]){const r=await fetch("https://api.jup.ag/lend/v1/earn/"+ep,{method:"POST",headers:H,body:JSON.stringify(b)});const t=await r.text();let j=null;try{j=JSON.parse(t)}catch(e){}
 console.log("EP",ep,r.status,j&&j.instructions?("n="+j.instructions.length+" progs="+j.instructions.map(i=>i.programId.slice(0,6)).join(",")+" dataLen="+j.instructions.map(i=>(i.data||"").length).join(",")+" keys="+Object.keys(j).join(",")):t.slice(0,300));await new Promise(z=>setTimeout(z,1200))}
