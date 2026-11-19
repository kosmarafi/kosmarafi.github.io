import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage();
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => window.kzSdk && kzSdk.ready, null, { timeout: 60000 });
const out = await pg.evaluate(async () => {
  const RPC = "https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
  const call = async (m, p) => (await (await fetch(RPC, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: m, params: p }) })).json()).result;
  const log = [kzSdk.version];
  const sigs = await call("getSignaturesForAddress", ["whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", { limit: 300 }]);
  const owners = new Set();
  for (let i = 0; i < sigs.length && owners.size < 12; i += 10) {
    const txs = await Promise.all(sigs.slice(i, i + 10).filter(s => !s.err).map(s => call("getTransaction", [s.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }])));
    txs.forEach(t => { if (!t) return; const l = (t.meta.logMessages || []).join("|"); if (/Instruction: (IncreaseLiquidity|CollectFees|DecreaseLiquidity)/.test(l) && !/Instruction: (Swap|TwoHopSwap)/.test(l)) owners.add(t.transaction.message.accountKeys[0].pubkey) });
  }
  log.push("candidatos " + owners.size);
  for (const ow of owners) {
    let ps;
    const t0 = Date.now();
    try { ps = await kzSdk.positions({ rpc: RPC, owner: ow }) } catch (e) { log.push("ERR positions " + e.message); continue }
    if (!ps.length || ps.length > 15) continue;
    log.push("owner " + ow.slice(0, 6) + " n=" + ps.length + " t=" + (Date.now() - t0) + "ms");
    ps.slice(0, 3).forEach(p => log.push(JSON.stringify(p, (k, v) => typeof v === "number" ? +v.toPrecision(6) : v)));
    const p = ps[0];
    const fake = { signTransaction: async () => { throw new Error("STOP_OK firmaria") } };
    for (const fn of ["harvest", "closePosition"]) {
      try { await kzSdk[fn]({ rpc: RPC, owner: ow, mint: p.mint, slipBps: 100, provider: fake }); log.push(fn + " sin parar?") }
      catch (e) { log.push(fn + ": " + e.message) }
    }
    if (log.filter(x => x.startsWith("owner")).length >= 2) break;
  }
  return log;
});
console.log(out.join("\n"));
await b.close();
