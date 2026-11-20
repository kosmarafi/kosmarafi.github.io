import { chromium } from "playwright";
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1.5 });
await pg.goto("https://kosmarafi.github.io/?t=" + Date.now(), { waitUntil: "load" });
await pg.waitForFunction(() => typeof posCard === "function", null, { timeout: 60000 });
await pg.waitForTimeout(5000);
const msgs = {};
await pg.exposeFunction("cap", (k, m) => { msgs[k] = m });
await pg.evaluate(() => {
  document.querySelectorAll("[id*=splash],.splash").forEach(e => e.remove());
  document.querySelector('[data-v="portfolio"]').click();
  S.pk = "8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21"; S.wid = "ph"; S.wname = "Phantom"; S.sw = {}; S.wch = {};
  window.hSol = () => S.pk; window.needSol = async () => true;
  S.pfTab = "liq";
  S.positions = [{ pair: "ANT/USDC", fee: "0.04", price: 91.94, lo: 89.7453, hi: 94.0826, usd: 157.11, amtA: 0.83, amtB: 80.45, symA: "ANT", symB: "USDC", pnl: 1.25, pnlPct: 0.8, harv: 0, pend: 0.28, est: { "24h": 7.53 }, entry: 91.177, dur: "55m", mint: "X", pool: "Y" }];
  rConn(); rPf();
});
for (const [k, act] of [["a", "harv"], ["b", "close"]]) {
  await pg.evaluate((k) => { window.confirm = (m) => { cap(k, m); return false } }, k);
  await pg.evaluate((act) => document.querySelector(`[data-pact="${act}"]`).click(), act);
  await pg.waitForTimeout(800);
  await pg.evaluate(([k, act]) => {
    document.getElementById("pb_X").closest(".pos").querySelector(`[data-pact="${act}"]`).scrollIntoView({ block: "center" });
    const old = document.getElementById("fakedlg"); if (old) old.remove();
    const d = document.createElement("div"); d.id = "fakedlg";
    d.style.cssText = "position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;font-family:Roboto,Arial,sans-serif";
    d.innerHTML = '<div style="background:#2b2d31;color:#e8e8ea;width:86%;border-radius:26px;padding:24px 24px 14px;box-shadow:0 10px 40px #000"><div style="font-size:15px;color:#bdbdc4;margin-bottom:12px">kosmarafi.github.io dice</div><div id="ft" style="font-size:16px;line-height:1.45;white-space:pre-wrap"></div><div style="display:flex;justify-content:flex-end;gap:28px;margin-top:22px;color:#a8c7fa;font-weight:600;font-size:15px"><span>Cancelar</span><span>Aceptar</span></div></div>';
    document.body.appendChild(d);
  }, [k, act]);
  await pg.evaluate((m) => document.getElementById("ft").textContent = m, msgs[k] || "(sin aviso)");
  await pg.screenshot({ path: k + ".png" });
}
console.log("MSGS", JSON.stringify(msgs));
await b.close();
