await import("../evm-pos.js");const K=globalThis.kzEvmPos;
// el gauge de 3pool tiene tokens LP de 3pool: debe salir como posición de Curve
const P=await K.positions("0xbfcf63294ad7105dea65aa58f8ae5be2d9d0952a");
console.log("N",P.length);P.filter(p=>p.lp).slice(0,5).forEach(p=>console.log("LP",p.dex,p.chainName,p.pair,p.usd.toFixed(0),p.url));
const t0=Date.now();const P2=await K.positions("0x0000000000000000000000000000000000000001");console.log("EMPTY",P2.length,"ms",Date.now()-t0);
