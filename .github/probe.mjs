const { PublicKey } = await import("@solana/web3.js");
const PROG=new PublicKey("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8");
const DEL="BTx1hsRXg4EL1MzATNtWZcuVcnnBK9PNVUaYfAjXrbSY";
const objs={auto:"EyTd3kbpSmRKyJ9nuujZpzPRUGX7P36dftrWm7he8B8c",ta:"CG2m57zVtqkqQE3yX3eJSSXKXUnTbzbMzKb1BsT4QHYB",pos:"4XWwPShcSxkNu6NVSVpdnn23EV4ZxrrFoS4YReboZNna",mint:"DV8msyuktcoyfeapkEYBQ8jSZrvifD2qrftpiszSEhmJ",owner:"DCpVrKPdytGgDUDBfjzMzYSnTAeMXPanf5BoPbQ7cWKS",cfg:"8u4k1UWfjsXHf4qkew5G4kNUdL9VgfQJzmfF6GcptzNh",pool:"J7mEHdBtAKGUsfiGnk3bL9cRVxqqcqx4HTxXb4wNnrsk",ma:"ANTBTZQ1EUuTxUs3tfeampxdqTWPHmwyJmcWj4xoAyNe",mb:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",ba:"8Gzz3wPheP4GkeAAKQgC9pjiUjm9n6ykQEeiiTLxuskr",bb:"272tUKnc41KqUYCh5oC2yvSWYSmHgBTqzm8GKQ4mKAnr"};
for(const k in objs)objs[k]=new PublicKey(objs[k]).toBuffer();
const strs=["","delegate","authority","position_authority","automation_authority","auto","signer","owner","vault","automation","position","keeper","pda","automation_delegate","position_delegate","delegation","program_authority","escrow","bridge","whirlpool","harvest","reinvest","compound","autocompound","auto_compound","Delegate","Authority","AUTHORITY","DELEGATE","state","global","seed","wp_auto","wpauto","orca","position_delegate_authority","automation_signer","signer_authority","pos_authority","position_auth","delegate_authority"];
const names=Object.keys(objs);const bytesX=[null,[0],[1],[0,0,0,0],[0,0,0,0,0,0,0,0]];
let n=0,found=0;
const test=(seeds,label)=>{n++;try{const [k,b]=PublicKey.findProgramAddressSync(seeds,PROG);if(k.toBase58()===DEL){console.log("FOUND",label,"bump",b);found++}}catch(e){}};
for(const s of strs){const S=s?[Buffer.from(s)]:[];
 for(const a of names){for(const x of bytesX){const X=x?[Buffer.from(x)]:[];
   test([...S,objs[a],...X],s+"|"+a+"|"+x);test([objs[a],...S,...X],a+"|"+s+"|"+x);
   for(const b of names){if(a===b)continue;test([...S,objs[a],objs[b],...X],s+"|"+a+"|"+b+"|"+x);test([objs[a],...S,objs[b],...X],a+"|"+s+"|"+b+"|"+x)}
 }}}
// 3 keys no string
for(const a of names)for(const b of names)for(const c of names){if(a===b||b===c||a===c)continue;test([objs[a],objs[b],objs[c]],a+b+c);for(const s of strs.slice(1,12))test([Buffer.from(s),objs[a],objs[b],objs[c]],s+a+b+c)}
console.log("tested",n,"found",found);
