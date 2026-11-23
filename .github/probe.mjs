const { PublicKey } = await import("@solana/web3.js");
const PROG=new PublicKey("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8");
for(const [n,k] of Object.entries({auto:"EyTd3kbpSmRKyJ9nuujZpzPRUGX7P36dftrWm7he8B8c",ta:"CG2m57zVtqkqQE3yX3eJSSXKXUnTbzbMzKb1BsT4QHYB",pos:"4XWwPShcSxkNu6NVSVpdnn23EV4ZxrrFoS4YReboZNna",owner:"DCpVrKPdytGgDUDBfjzMzYSnTAeMXPanf5BoPbQ7cWKS",pool:"J7mEHdBtAKGUsfiGnk3bL9cRVxqqcqx4HTxXb4wNnrsk",mint:"DV8msyuktcoyfeapkEYBQ8jSZrvifD2qrftpiszSEhmJ"})){
 const [a,b]=PublicKey.findProgramAddressSync([Buffer.from("automation-authority"),new PublicKey(k).toBuffer()],PROG);console.log(n,a.toBase58(),b)}
console.log("target BTx1hsRXg4EL1MzATNtWZcuVcnnBK9PNVUaYfAjXrbSY");
