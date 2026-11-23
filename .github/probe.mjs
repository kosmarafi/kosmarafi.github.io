const { PublicKey } = await import("@solana/web3.js");
const PROG=new PublicKey("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8");
const K={owner:"8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21",auto:"7V3yCqvBQGk6zZUXr57mpzgYuhLPkrLN7fzD1PatZrNH",pos:"7V23aYpgETVKZYqq5ttunnxN5PSGP1irhEkiSyXo61Jw",ta:"2xc9GXx7dVaGJz77yjkNMHzURjF8ZsUF6gphVAWUzzSm",pool:"J7mEHdBtAKGUsfiGnk3bL9cRVxqqcqx4HTxXb4wNnrsk",mint:"CatuLmjYg7oeJsu8FaivXRXyTobQ3wHzMd1wMZ9kXXyc",cfg:"8u4k1UWfjsXHf4qkew5G4kNUdL9VgfQJzmfF6GcptzNh"};
const T={dele:"8dFH7oR3As2J58HeWXvsekgZwddbPCFu1Hfs8yFNifpE"};
const B=Object.fromEntries(Object.entries(K).map(([k,v])=>[k,new PublicKey(v).toBuffer()]));
const S=["position_delegate","delegated_authority","nft_delegate","delegate_pda","delegate_signer","automation_delegate","auth","pda","position_signer","position_owner","nft_authority","token_authority","pos_delegate","whirlpool_delegate","approve","approval","permission","operator","executor","manager","controller","automation","automation_signer","automations","auto","compound","autocompound","auto_compound","auto-compound","position","position_automation","automation_position","delegate","authority","position_authority","delegate_authority","automation_authority","signer","harvest","vault","owner","user","config","reinvest","strategy","task","job","delegation","wp_auto","wpauto",""];
const keys=Object.keys(B);
const tries=[];
for(const s of S){const sb=s?[Buffer.from(s)]:[];tries.push([s,sb]);for(const a of keys){tries.push([s+"|"+a,[...sb,B[a]]]);for(const b of keys){if(a!==b)tries.push([s+"|"+a+"|"+b,[...sb,B[a],B[b]]])}}}
for(const extra of [[],[Buffer.from([0])],[Buffer.from([1])],[Buffer.from([2])],[Buffer.from([3])]]){for(const [name,seeds] of tries){try{const [p]=PublicKey.findProgramAddressSync([...seeds,...extra],PROG);const b=p.toBase58();for(const [t,v] of Object.entries(T))if(b===v)console.log("MATCH",t,name,extra.length?"+byte"+extra[0][0]:"")}catch(e){}}}
console.log("done",tries.length);
