import { chromium } from "playwright";
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1.5 });
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => window.kzSdk && kzSdk.version === "0.7.0", null, { timeout: 90000 });
const out = await pg.evaluate(async () => {
  const log = []; const RPC = "https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
  const call = async (m, p) => { for (let i = 0; i < 6; i++) { const r = await fetch(RPC, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: m, params: p }) }); if (r.status === 429) { await new Promise(z => setTimeout(z, 900)); continue } return (await r.json()).result } };
  const A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const enc = (u) => { let n = 0n; for (const x of u) n = n * 256n + BigInt(x); let s = ""; while (n > 0n) { s = A[Number(n % 58n)] + s; n /= 58n } for (const x of u) { if (x) break; s = "1" + s } return s };
  const accs = await call("getProgramAccounts", ["whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", { encoding: "base64", dataSlice: { offset: 40, length: 32 }, filters: [{ dataSize: 216 }, { memcmp: { offset: 8, bytes: "Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE" } }] }]);
  const fake = { signTransaction: async () => { throw new Error("STOP_OK") } };
  let done = 0;
  for (const a of (accs || []).sort(() => Math.random() - .5).slice(0, 25)) {
    if (done) break;
    const mint = enc(Uint8Array.from(atob(a.account.data[0]), c => c.charCodeAt(0)));
    const la = await call("getTokenLargestAccounts", [mint]); const ta = la && la.value.find(v => v.uiAmount === 1); if (!ta) continue;
    const ai = await call("getAccountInfo", [ta.address, { encoding: "jsonParsed" }]); const ow = ai && ai.value && ai.value.data.parsed.info.owner; if (!ow) continue;
    const bal = await call("getBalance", [ow]); if (!(bal && bal.value > 1e8)) continue;
    let ps; try { ps = await kzSdk.positions({ rpc: RPC, owner: ow }) } catch (e) { continue }
    const p = ps.find(x => +x.liq > 0); if (!p || ps.length > 8) continue; done = 1;
    log.push("owner " + ow.slice(0, 6) + " " + p.pair + " liq " + p.liq + " dec " + p.decA + "/" + p.decB + " sol " + bal.value / 1e9);
    try { await kzSdk.decrease({ rpc: RPC, owner: ow, mint: p.mint, liquidity: p.liq, pct: 50, slipBps: 100, provider: fake }); log.push("decrease sin parar?") } catch (e) { log.push("decrease: " + e.message.slice(0, 200)) }
    try { await kzSdk.increase({ rpc: RPC, owner: ow, mint: p.mint, amountA: 0.001, amountB: 0.001 * p.price, decA: p.decA, decB: p.decB, slipBps: 100, provider: fake }); log.push("increase sin parar?") } catch (e) { log.push("increase: " + e.message.slice(0, 200)) }
  }
  document.querySelectorAll("[id*=splash],.splash").forEach(e => e.remove());
  document.querySelector('[data-v="portfolio"]').click();
  S.pk = "8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21"; S.wid = "ph"; S.wname = "Phantom"; S.sw = {}; window.hSol = () => S.pk; S.pfTab = "liq";
  S.positions = [{ dex: "Orca", pair: "ANT/USDC", fee: "0.04", price: 91.94, lo: 89.7453, hi: 94.0826, usd: 157.11, amtA: 0.83, amtB: 80.45, symA: "ANT", symB: "USDC", pnl: 1.25, pnlPct: 0.8, harv: 0, pend: 0.28, est: { "24h": 7.53 }, entry: 91.177, dur: "55m", mint: "X", pool: "Y", liq: "1000" }];
  rConn(); rPf(); document.querySelector('[data-pmenu="X"]').click();
  document.querySelector(".pmenu").scrollIntoView({ block: "center" });
  return log;
});
console.log(out.join("\n"));
await pg.waitForTimeout(600); await pg.screenshot({ path: "a.png" });
await b.close();
