/* Vaults EVM de Kosmara: Aave v3 y Morpho (vaults de curadores conocidos y vaults Kosmara).
   Lee rendimientos y posiciones, y prepara las transacciones (permiso, depósito, retirada) que firma la wallet del usuario.
   Kosmara no cobra por depositar ni por retirar. Necesita evm-pos.js (kzEvmPos) para las llamadas a la red. */
(function (G) {
  "use strict";
  var AAVE = "https://api.v3.aave.com/graphql", MORPHO = "https://api.morpho.org";
  var KEY = { 1: "ETH", 56: "BSC", 8453: "BASE", 42161: "ARB", 10: "OP" };
  var NET = { 1: "eth", 56: "bsc", 8453: "base", 42161: "arbitrum", 10: "optimism" };
  var WETH = { 1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 8453: "0x4200000000000000000000000000000000000006", 10: "0x4200000000000000000000000000000000000006", 42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", 56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" };
  var AAVE_MK = { AaveV3Ethereum: 1, AaveV3Base: 8453, AaveV3Arbitrum: 42161, AaveV3Optimism: 10, AaveV3BNB: 56 };
  /* Vaults de Morpho elegidas (curadores Steakhouse, Gauntlet y Re7; más de ~1 M$ depositados). fee = comisión del curador en %. */
  var MV = [
    [8453, 2, "0xbeef0e0834849aCC03f0089F01f4F1Eeb06873C9", "Steakhouse Prime USDC", "USDC", 6, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", 0],
    [8453, 1, "0xeE8F4eC5672F09119b96Ab6fB59C27E1b7e44b61", "Gauntlet USDC Prime", "USDC", 6, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", 0],
    [8453, 2, "0x050cE30b927Da55177A4914EC73480238BAD56f0", "Gauntlet USDC Prime v2", "USDC", 6, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", 0],
    [8453, 2, "0xbeeff7aE5E00Aae3Db302e4B0d8C883810a58100", "Steakhouse High Yield USDC", "USDC", 6, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", 5],
    [8453, 2, "0x1deEfABEe758AAbdC29a542B24ca3b75aFD56765", "Gauntlet USDC Frontier", "USDC", 6, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", 0],
    [8453, 2, "0xbeef00f0A818894a2Cf111644A5098421611100E", "Steakhouse Prime ETH", "WETH", 18, "0x4200000000000000000000000000000000000006", 5],
    [8453, 2, "0xFeFeC33668E22677c4762d0853d56245a800ff08", "Gauntlet WETH Balanced", "WETH", 18, "0x4200000000000000000000000000000000000006", 0],
    [8453, 2, "0x94Af495DE1F56Aa5576dEB17986bDCeE5Dd9778D", "Gauntlet EURC Balanced", "EURC", 6, "0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42", 0],
    [1, 2, "0xbeef088055857739C12CD3765F20b7679Def0f51", "Steakhouse Prime USDC", "USDC", 6, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 0],
    [1, 2, "0x8c106EEDAd96553e64287A5A6839c3Cc78afA3D0", "Gauntlet USDC Prime", "USDC", 6, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 0],
    [1, 2, "0xbeeff2C5bF38f90e3482a8b19F12E5a6D2FCa757", "Steakhouse High Yield USDC", "USDC", 6, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 5],
    [1, 2, "0x9a1D6bd5b8642C41F25e0958129B85f8E1176F3e", "Gauntlet USDC Frontier", "USDC", 6, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 0],
    [1, 2, "0xbeef003C68896c7D2c3c60d363e8d71a49Ab2bf9", "Steakhouse Prime USDT", "USDT", 6, "0xdAC17F958D2ee523a2206206994597C13D831ec7", 0],
    [1, 2, "0x43fCd85E8D9D003D515f886891B7C742AC9f92da", "Gauntlet WETH Prime", "WETH", 18, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 0],
    [1, 2, "0xbeef0046fcab1dE47E41fB75BB3dC4Dfc94108E3", "Steakhouse Prime ETH", "WETH", 18, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 5],
    [42161, 1, "0x7c574174DA4b2be3f705c6244B4BfA0815a8B3Ed", "Gauntlet USDC Prime", "USDC", 6, "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", 10],
    [42161, 1, "0x5c0C306Aaa9F877de636f4d5822cA9F2E81563BA", "Steakhouse High Yield USDC", "USDC", 6, "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", 10],
    [10, 2, "0x3d63934715b6D4c4DFbBC1a00Fe2A2145079DD76", "Re7 WETH", "WETH", 18, "0x4200000000000000000000000000000000000006", 10],
  ].map(function (x) { return { chain: x[0], ver: x[1], vault: x[2], name: x[3], sym: x[4], dec: x[5], asset: x[6], cfee: x[7] }; });
  /* Vaults Kosmara (envoltorio Fee Wrapper de Morpho sobre una vault V2). Vacío hasta que se desplieguen:
     { chain, vault (dirección del envoltorio), name, sym, dec, asset, under (vault de debajo), kfee (comisión de Kosmara en %) } */
  var KZ = [];

  var SEL = { approve: "0x095ea7b3", allowance: "0xdd62ed3e", balanceOf: "0x70a08231", supply: "0x617ba037", withdrawAave: "0x69328dec",
    deposit4626: "0x6e553f65", withdraw4626: "0xb460af94", redeem4626: "0xba087652", convertToAssets: "0x07a2d13a", wrap: "0xd0e30db0" };
  function w(x) { var h = typeof x === "bigint" ? x.toString(16) : /^0x/i.test(String(x)) ? String(x).slice(2) : BigInt(x).toString(16); return h.toLowerCase().padStart(64, "0"); }
  function U(hex) { return hex && hex !== "0x" ? BigInt(hex.slice(0, 66)) : 0n; }
  function dstr(raw, dec) { raw = BigInt(raw); var s = raw.toString().padStart(dec + 1, "0"), i = s.slice(0, s.length - dec), f = s.slice(s.length - dec).replace(/0+$/, ""); return f ? i + "." + f : i; }
  function hx(v) { return "0x" + BigInt(v || 0).toString(16); }
  async function gql(q, v) { var r = await fetch(AAVE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: q, variables: v }) }), j = await r.json(); if (!r.ok || j.errors) throw new Error("Aave: " + ((j.errors && j.errors[0] && j.errors[0].message) || "HTTP " + r.status)); return j.data; }
  async function mo(p) { var r = await fetch(MORPHO + p, { headers: { accept: "application/json" } }); if (!r.ok) throw new Error("Morpho HTTP " + r.status); return r.json(); }
  async function calls(chain, L) { return G.kzEvmPos._calls(KEY[chain], L); }

  /* ---------- Rendimientos ---------- */
  var AM = null; /* mercados de Aave: { chainId: { market, reserves: { assetLower: reserva } } } */
  async function aaveMarkets() {
    var d = await gql("{markets(request:{chainIds:[1,8453,42161,10,56]}){name address chain{chainId} reserves(request:{reserveType:SUPPLY}){underlyingToken{symbol address decimals imageUrl} aToken{address} acceptsNative{symbol} permitSupported isFrozen isPaused size{usd} usdExchangeRate supplyInfo{apy{value} supplyCapReached}}}}");
    var M = {}, out = [];
    (d.markets || []).forEach(function (m) {
      var c = AAVE_MK[m.name]; if (!c || m.chain.chainId !== c) return; M[c] = { market: m.address, reserves: {} };
      (m.reserves || []).forEach(function (r) {
        var t = r.underlyingToken || {}, it = { pr: "Aave", chain: c, market: m.address, asset: t.address, sym: t.symbol, dec: t.decimals, img: t.imageUrl || "", aToken: r.aToken && r.aToken.address,
          native: r.acceptsNative ? r.acceptsNative.symbol : "", permit: !!r.permitSupported, apy: +r.supplyInfo.apy.value * 100, tvl: +r.size.usd, px: +r.usdExchangeRate || 0, capped: !!r.supplyInfo.supplyCapReached, off: r.isFrozen || r.isPaused };
        M[c].reserves[String(t.address).toLowerCase()] = it;
        if (!it.off && !it.capped && it.tvl >= 2e6 && it.apy > 0.05) out.push(it);
      });
    });
    AM = M; return out;
  }
  var PX = {};
  async function price(chain, asset) { var k = chain + ":" + asset; if (PX[k] && Date.now() - PX[k].t < 600000) return PX[k].v; try { var j = await mo("/v0/tokens/" + k + "/price"), v = +(j.data && j.data.price) || 0; PX[k] = { v: v, t: Date.now() }; return v; } catch (e) { return PX[k] ? PX[k].v : 0; } }
  async function vaultStat(v) {
    var s = v.chain + ":" + v.vault, pre = v.ver === 1 ? "/v0/vaults-v1/" : "/v1/vaults-v2/";
    var R = await Promise.all([mo(pre + s + "/state").catch(function () { return {}; }), mo(pre + s + "/apy-averages?lookback=seven_days").catch(function () { return {}; }), price(v.chain, v.asset)]);
    var st = R[0].data || {}, ap = R[1].data || {}, ta = Number(st.total_assets || 0) / Math.pow(10, v.dec);
    return Object.assign({}, v, { pr: v.kfee != null ? "Kosmara" : "Morpho", apy: ap.apy != null ? ap.apy * 100 : null, tvl: ta * (R[2] || 0), px: R[2] || 0 });
  }
  async function morphoVaults() { return (await Promise.all(MV.concat(KZ).map(function (v) { return vaultStat(v).catch(function () { return null; }); }))).filter(function (x) { return x && x.apy != null && x.apy > 0; }); }

  /* ---------- Posiciones del usuario ---------- */
  var VD = {}; /* detalle de vaults fuera de la lista */
  function find(chain, vault) { vault = String(vault).toLowerCase(); return MV.concat(KZ).filter(function (v) { return v.chain === chain && v.vault.toLowerCase() === vault; })[0]; }
  async function positions(owner) {
    var out = [];
    var A = (async function () {
      if (!AM) await aaveMarkets();
      var mk = Object.keys(AM).map(function (c) { return { address: AM[c].market, chainId: +c }; });
      var d = await gql("query($r:UserSuppliesRequest!){userSupplies(request:$r){market{address chain{chainId}} currency{symbol address decimals imageUrl} balance{amount{value raw} usd} apy{value}}}", { r: { markets: mk, user: owner } });
      (d.userSupplies || []).forEach(function (x) {
        var c = x.market.chain.chainId, r = AM[c] && AM[c].reserves[String(x.currency.address).toLowerCase()] || {};
        if (!(+x.balance.amount.value > 0)) return;
        out.push({ pr: "Aave", chain: c, market: x.market.address, asset: x.currency.address, sym: x.currency.symbol, dec: x.currency.decimals, img: x.currency.imageUrl || "", native: r.native || "",
          amt: +x.balance.amount.value, raw: x.balance.amount.raw, usd: +x.balance.usd, apy: +x.apy.value * 100, name: "Aave v3" });
      });
    })().catch(function (e) { out.err = (out.err || []).concat(["Aave"]); });
    var M = (async function () {
      var R = await Promise.all([mo("/v0/vaults-v1/users/" + owner + "/positions?limit=100"), mo("/v0/vaults-v2/users/" + owner + "/positions?limit=100")]);
      var L = [];
      R.forEach(function (j, i) { (j.data || []).forEach(function (p) { if (KEY[p.chain_id] && p.chain_id !== 56 && BigInt(p.shares || 0) > 0n) L.push({ ver: i + 1, chain: p.chain_id, vault: p.vault_address, shares: p.shares, assets: p.assets }); }); });
      await Promise.all(L.map(async function (p) {
        var v = find(p.chain, p.vault);
        if (!v) { var k = p.chain + ":" + p.vault; if (!VD[k]) { var d = (await mo((p.ver === 1 ? "/v0/vaults-v1/" : "/v0/vaults-v2/") + k)).data || {}; VD[k] = { chain: p.chain, ver: p.ver, vault: p.vault, name: d.name || "Vault", sym: (d.asset || {}).symbol || "", dec: (d.asset || {}).decimals || 18, asset: (d.asset || {}).address }; } v = VD[k]; }
        var px = await price(p.chain, v.asset), amt = Number(p.assets) / Math.pow(10, v.dec);
        out.push(Object.assign({}, v, { pr: "Morpho", shares: p.shares, amt: amt, usd: amt * px }));
      }));
    })().catch(function () { out.err = (out.err || []).concat(["Morpho"]); });
    /* Vaults Kosmara: la API de Morpho no las incluye en las posiciones, se leen de la red */
    var K = Promise.all(KZ.map(async function (v) {
      var r = await calls(v.chain, [[v.vault, SEL.balanceOf + w(owner)]]), sh = U(r[0]); if (sh <= 0n) return;
      var a = U((await calls(v.chain, [[v.vault, SEL.convertToAssets + w(sh)]]))[0]), px = await price(v.chain, v.asset), amt = Number(a) / Math.pow(10, v.dec);
      out.push(Object.assign({}, v, { pr: "Kosmara", shares: sh.toString(), amt: amt, usd: amt * px }));
    })).catch(function () {});
    await Promise.all([A, M, K]);
    return out;
  }

  /* ---------- Transacciones ---------- */
  function approveData(spender, amt) { return SEL.approve + w(spender) + w(amt); }
  async function allowance(chain, token, owner, spender) { return U((await calls(chain, [[token, SEL.allowance + w(owner) + w(spender)]]))[0]); }
  async function balance(chain, token, owner) { return U((await calls(chain, [[token, SEL.balanceOf + w(owner)]]))[0]); }
  /* Depósito: devuelve { spender, to, data, value } (spender = a quién hay que dar permiso; vacío si se paga en nativo) */
  async function depositTx(it, owner, raw, useNative) {
    raw = BigInt(raw);
    if (it.pr === "Aave") {
      if (!useNative) return { spender: it.market, token: it.asset, to: it.market, data: SEL.supply + w(it.asset) + w(raw) + w(owner) + w(0), value: "0x0" };
      var d = await gql("query($r:SupplyRequest!){supply(request:$r){__typename ...on TransactionRequest{to data value} ...on ApprovalRequired{originalTransaction{to data value}} ...on InsufficientBalanceError{required{value}}}}",
        { r: { market: it.market, chainId: it.chain, sender: owner, amount: { native: dstr(raw, 18) } } });
      var s = d.supply; if (s.__typename === "InsufficientBalanceError") throw new Error("No tienes saldo suficiente.");
      var t = s.__typename === "ApprovalRequired" ? s.originalTransaction : s; return { spender: "", to: t.to, data: t.data, value: hx(t.value) };
    }
    return { spender: it.vault, token: it.asset, to: it.vault, data: SEL.deposit4626 + w(raw) + w(owner), value: "0x0" };
  }
  /* Retirada: pct 1-100. Devuelve una lista de pasos [{to,data,value,why}] */
  async function withdrawTxs(p, owner, pct, toNative) {
    if (p.pr === "Aave") {
      var max = pct >= 100, raw = max ? 0n : BigInt(p.raw) * BigInt(pct) / 100n;
      if (!toNative) return [{ to: p.market, data: SEL.withdrawAave + w(p.asset) + (max ? "f".repeat(64) : w(raw)) + w(owner), value: "0x0" }];
      var v = max ? { max: true } : { exact: dstr(raw, p.dec) };
      var d = await gql("query($r:WithdrawRequest!){withdraw(request:$r){__typename ...on TransactionRequest{to data value} ...on ApprovalRequired{approval{to data} originalTransaction{to data value}} ...on InsufficientBalanceError{required{value}}}}",
        { r: { market: p.market, chainId: p.chain, sender: owner, amount: { native: { value: v } } } });
      var s = d.withdraw; if (s.__typename === "InsufficientBalanceError") throw new Error("No hay suficiente para retirar.");
      if (s.__typename === "ApprovalRequired") return [{ to: s.approval.to, data: s.approval.data, value: "0x0", why: "permiso" }, { to: s.originalTransaction.to, data: s.originalTransaction.data, value: hx(s.originalTransaction.value) }];
      return [{ to: s.to, data: s.data, value: hx(s.value) }];
    }
    var sh = await balance(p.chain, p.vault, owner);
    if (pct >= 100) return [{ to: p.vault, data: SEL.redeem4626 + w(sh) + w(owner) + w(owner), value: "0x0" }];
    return [{ to: p.vault, data: SEL.redeem4626 + w(sh * BigInt(pct) / 100n) + w(owner) + w(owner), value: "0x0" }];
  }
  function wrapTx(chain, raw) { return { to: WETH[chain], data: SEL.wrap, value: hx(raw) }; }

  G.kzVault = { ready: true, version: "1.0.0", KEY: KEY, NET: NET, WETH: WETH, MV: MV, KZ: KZ, aaveMarkets: aaveMarkets, morphoVaults: morphoVaults, positions: positions,
    depositTx: depositTx, withdrawTxs: withdrawTxs, wrapTx: wrapTx, approveData: approveData, allowance: allowance, balance: balance, dstr: dstr, price: price, aave: function () { return AM; } };
})(typeof window !== "undefined" ? window : globalThis);
