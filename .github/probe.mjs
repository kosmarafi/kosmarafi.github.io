import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage();
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => window.kzSdk && kzSdk.ready, null, { timeout: 60000 });
const out = await pg.evaluate(async () => {
  const RPC = "https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
  const call = async (m, p) => { for (let i = 0; i < 6; i++) { const r = await fetch(RPC, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: m, params: p }) }); if (r.status === 429) { await new Promise(z => setTimeout(z, 800 * (i + 1))); continue } return (await r.json()).result } };
  const log = [kzSdk.version];
  const accs = await call("getProgramAccounts", ["whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", { encoding: "base64", dataSlice: { offset: 40, length: 32 }, filters: [{ dataSize: 216 }, { memcmp: { offset: 8, bytes: "Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE" } }] }]);
  log.push("posiciones en pool " + (accs ? accs.length : "null"));
  const owners = new Set();
  const A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const enc = (u) => { let n = 0n; for (const x of u) n = n * 256n + BigInt(x); let s = ""; while (n > 0n) { s = A[Number(n % 58n)] + s; n /= 58n } for (const x of u) { if (x) break; s = "1" + s } return s };
  const pickd = (accs || []).sort(() => Math.random() - 0.5).slice(0, 25);
  for (const a of pickd) {
    if (owners.size >= 8) break;
    const mint = enc(Uint8Array.from(atob(a.account.data[0]), c => c.charCodeAt(0)));
    const la = await call("getTokenLargestAccounts", [mint]);
    const ta = la && la.value && la.value.find(v => v.uiAmount === 1);
    if (!ta) continue;
    const ai = await call("getAccountInfo", [ta.address, { encoding: "jsonParsed" }]);
    const ow = ai && ai.value && ai.value.data.parsed && ai.value.data.parsed.info.owner;
    if (ow) owners.add(ow);
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
