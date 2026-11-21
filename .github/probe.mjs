import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage();
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForTimeout(4000);
const out = await pg.evaluate(async () => {
  const log = []; const RPC = "https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
  const call = async (m, p) => { for (let i = 0; i < 6; i++) { const r = await fetch(RPC, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: m, params: p }) }); if (r.status === 429) { await new Promise(z => setTimeout(z, 900)); continue } return await r.json() } };
  const sim = async (bytes) => { let bin = ""; bytes.forEach(c => bin += String.fromCharCode(c)); const s = await call("simulateTransaction", [btoa(bin), { encoding: "base64", sigVerify: false, replaceRecentBlockhash: true, commitment: "confirmed" }]); const v = s.result && s.result.value; return JSON.stringify(v && v.err) + " " + ((v && v.logs) || []).filter(l => /rror|failed/.test(l)).slice(-2).join(" | ") };
  const s = document.createElement("script"); s.type = "module"; s.src = "./sdk/kz-ray.js?t=" + Date.now(); document.head.appendChild(s);
  for (let i = 0; i < 200 && !(window.kzRay && kzRay.positions); i++) await new Promise(z => setTimeout(z, 100));
  log.push("kzRay " + kzRay.version);
  /* 1) una firma: cambio de Jupiter + apertura en Raydium */
  const W = "2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S", SOL = "So11111111111111111111111111111111111111112", USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", POOL = "3ucNos4NbumPLZNWztqGHNFFgkHeRMBQAVemeeomsUxv";
  const H = { "content-type": "application/json", "x-api-key": "jup_pub_fc0db5" };
  try {
    const px = 69;
    const q = await (await fetch("https://lite-api.jup.ag/swap/v1/quote?inputMint=" + USDC + "&outputMint=" + SOL + "&amount=1000000&slippageBps=100&maxAccounts=20")).json();
    const si = await (await fetch("https://lite-api.jup.ag/swap/v1/swap-instructions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ quoteResponse: q, userPublicKey: W, wrapAndUnwrapSol: true, dynamicComputeUnitLimit: false }) })).json();
    const pre = [].concat(si.setupInstructions || [], [si.swapInstruction], si.cleanupInstruction ? [si.cleanupInstruction] : [], si.otherInstructions || []);
    const p0 = (await (await fetch("https://api-v3.raydium.io/pools/info/ids?ids=" + POOL)).json()).data[0].price;
    const r = await kzRay.buildOpen({ rpc: RPC, owner: W, pool: POOL, lower: p0 * .95, upper: p0 * 1.05, amountA: (+q.otherAmountThreshold / 1e9) * .99, amountB: 1, decA: 9, decB: 6, slipBps: 100, pre, alts: si.addressLookupTableAddresses || [] });
    log.push("una firma: bytes " + r.bytes.length + " sim " + await sim(r.bytes));
  } catch (e) { log.push("una firma ERR " + (e.kzBig ? "[GRANDE] " : "") + e.message.slice(0, 200)) }
  /* 2) posiciones de Raydium de una wallet con posiciones */
  const accs = await call("getProgramAccounts", ["CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK", { encoding: "base64", dataSlice: { offset: 9, length: 32 }, filters: [{ dataSize: 281 }, { memcmp: { offset: 41, bytes: POOL } }] }]);
  log.push("posiciones en pool " + (accs.result ? accs.result.length : JSON.stringify(accs.error).slice(0, 120)));
  const A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const enc = (u) => { let n = 0n; for (const x of u) n = n * 256n + BigInt(x); let s = ""; while (n > 0n) { s = A[Number(n % 58n)] + s; n /= 58n } for (const x of u) { if (x) break; s = "1" + s } return s };
  let done = 0;
  for (const a of (accs.result || []).sort(() => Math.random() - .5).slice(0, 15)) {
    if (done) break;
    const mint = enc(Uint8Array.from(atob(a.account.data[0]), c => c.charCodeAt(0)));
    const la = await call("getTokenLargestAccounts", [mint]); const ta = la.result && la.result.value.find(v => v.uiAmount === 1); if (!ta) continue;
    const ai = await call("getAccountInfo", [ta.address, { encoding: "jsonParsed" }]); const ow = ai.result && ai.result.value && ai.result.value.data.parsed && ai.result.value.data.parsed.info.owner; if (!ow) continue;
    try {
      const t0 = Date.now(); const ps = await kzRay.positions({ rpc: RPC, owner: ow }); if (!ps.length || ps.length > 10) continue; done = 1;
      log.push("owner " + ow.slice(0, 6) + " n=" + ps.length + " t=" + (Date.now() - t0) + "ms");
      ps.slice(0, 2).forEach(p => log.push(JSON.stringify(p, (k, v) => typeof v === "number" ? +v.toPrecision(5) : v).slice(0, 700)));
      for (const kind of ["harv", "close"]) { try { const m = await kzRay.buildManage({ rpc: RPC, owner: ow, mint: ps[0].mint, kind, amtA: ps[0].amtA, amtB: ps[0].amtB, slipBps: 100 }); log.push(kind + " bytes " + m.bytes.length + " sim " + await sim(m.bytes)) } catch (e) { log.push(kind + " ERR " + e.message.slice(0, 200)) } }
    } catch (e) { log.push("positions ERR " + e.message.slice(0, 200)) }
  }
  return log;
});
console.log(out.join("\n")); await b.close();
