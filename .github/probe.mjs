import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage();
pg.on("pageerror", e => console.log("PAGEERR", e.message));
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForTimeout(15000);
console.log("DIAG", await pg.evaluate(() => JSON.stringify({ ok: window.kzOK, log: window.kzLog, pc: typeof posCard, rcx: typeof rc, v: window.kzSdk && kzSdk.version, so: typeof swapOpenOne, src: [...document.scripts].map(s => s.src).filter(Boolean) })));
const out = await pg.evaluate(async () => {
  const log = []; const rc = kzTest.rc, swapOpenOne = kzTest.swapOpenOne;
  const USDC = "EPjFWWd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
  let owner = null;
  for (const w of ["5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9", "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", "2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S"]) {
    const bal = await rc("getBalance", [w]); const ta = await rc("getTokenAccountsByOwner", [w, { mint: USDC }, { encoding: "jsonParsed" }]);
    const u = (ta.value || []).reduce((x, a) => x + (a.account.data.parsed.info.tokenAmount.uiAmount || 0), 0);
    log.push(w.slice(0, 6) + " sol " + ((bal.value || bal) / 1e9).toFixed(1) + " usdc " + u.toFixed(0));
    if ((bal.value || bal) > 2e9 && u > 100 && !owner) owner = w;
  }
  log.push("owner " + owner);
  S.pk = owner; S.sw = { signTransaction: async () => { throw new Error("STOP_OK llega a la firma") } };
  const P = await (await fetch("https://lite-api.jup.ag/price/v3?ids=" + SOLM)).json();
  const px = +P[SOLM].usdPrice;
  S.bal = { [SOLM]: 3, [USDC]: 50 };
  for (const [name, payB, swapIn] of [["paga USDC", true, 10], ["paga SOL", false, 10 / px]]) {
    const p = { id: "Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE", A: { m: SOLM, d: 9, s: "SOL" }, B: { m: USDC, d: 6, s: "USDC" } };
    const c = { payB, swapIn, aA: 10 / px, aB: 10, pa: px * 0.95, pb: px * 1.05 };
    if (!payB) S.bal = { [SOLM]: 3, [USDC]: 0 }; else S.bal = { [SOLM]: 0.05, [USDC]: 50 };
    for (const via of ["Jupiter", "Orca"]) {
      ST.via = via; ST.slip = 1;
      try { await swapOpenOne(p, c, payB ? p.B : p.A, payB ? p.A : p.B, Math.floor(swapIn * (payB ? 1e6 : 1e9))); log.push(name + " " + via + ": sin parar?") }
      catch (e) { log.push(name + " " + via + ": " + (e.kzBig ? "[GRANDE] " : "") + e.message.slice(0, 300)) }
    }
  }
  return log;
});
console.log(out.join("\n"));
await b.close();
