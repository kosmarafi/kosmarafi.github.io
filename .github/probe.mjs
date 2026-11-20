import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage();
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForTimeout(4000);
const out = await pg.evaluate(async () => {
  const log = []; const RPC = "https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
  const call = async (m, p) => { for (let i = 0; i < 6; i++) { const r = await fetch(RPC, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: m, params: p }) }); if (r.status === 429) { await new Promise(z => setTimeout(z, 900)); continue } return await r.json() } };
  const s = document.createElement("script"); s.type = "module"; s.src = "./sdk/kz-ray.js?t=" + Date.now(); document.head.appendChild(s);
  for (let i = 0; i < 200 && !(window.kzRay && kzRay.ready); i++) await new Promise(z => setTimeout(z, 100));
  log.push("kzRay " + (window.kzRay && kzRay.version));
  const lst = await (await fetch("https://api-v3.raydium.io/pools/info/mint?mint1=So11111111111111111111111111111111111111112&mint2=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&poolType=concentrated&poolSortField=default&sortType=desc&pageSize=5&page=1")).json();
  log.push("n " + lst.data.data.length + " " + lst.data.data.slice(0,5).map(p=>p.mintA.symbol+"/"+p.mintB.symbol).join(","));const pools = lst.data.data.filter(p => p.mintA.address === "So11111111111111111111111111111111111111112" && p.mintB.address === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v").slice(0, 2);
  for (const p of pools) {
    log.push("pool " + p.id + " " + p.mintA.symbol + "/" + p.mintB.symbol + " price " + p.price + " fee " + p.feeRate);
    try {
      const t0 = Date.now();
      const r = await kzRay.buildOpen({ rpc: RPC, owner: "2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S", pool: p.id, lower: p.price * .95, upper: p.price * 1.05, amountA: 0.01, amountB: 2, decA: 9, decB: 6, slipBps: 100 });
      log.push("bytes " + r.bytes.length + " nft " + r.nftMint + " t " + (Date.now() - t0) + "ms");
      let bin = ""; r.bytes.forEach(c => bin += String.fromCharCode(c));
      const sim = await call("simulateTransaction", [btoa(bin), { encoding: "base64", sigVerify: false, replaceRecentBlockhash: true, commitment: "confirmed" }]);
      const v = sim.result && sim.result.value;
      log.push("sim err " + JSON.stringify(v && v.err) + " " + (sim.error ? JSON.stringify(sim.error) : "") + " " + ((v && v.logs) || []).filter(l => /rror|failed/.test(l)).slice(-3).join(" | "));
    } catch (e) { log.push("ERR " + e.message.slice(0, 300)) }
  }
  return log;
});
console.log(out.join("\n")); await b.close();
