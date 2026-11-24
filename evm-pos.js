/* Posiciones de liquidez EVM (Uniswap v3 y PancakeSwap v3) en Ethereum y BNB Chain.
   Lee los NFT de posición con nodos públicos y prepara las transacciones (cobrar, retirar, cerrar, depositar)
   para que las firme la wallet del usuario. Sin librerías: llamadas JSON-RPC y codificación ABI a mano. */
(function (G) {
  "use strict";
  var CH = {
    ETH: { name: "Ethereum", id: 1, rpc: ["https://ethereum-rpc.publicnode.com", "https://eth.drpc.org"], llama: "ethereum", tx: "https://etherscan.io/tx/", nft: "https://etherscan.io/token/", acct: "https://etherscan.io/address/", native: "ETH", gas: 0.004 },
    BSC: { name: "BNB Chain", id: 56, rpc: ["https://bsc-rpc.publicnode.com", "https://bsc-dataseed.binance.org"], llama: "bsc", tx: "https://bscscan.com/tx/", nft: "https://bscscan.com/token/", acct: "https://bscscan.com/address/", native: "BNB", gas: 0.002 },
    BASE: { name: "Base", id: 8453, rpc: ["https://base-rpc.publicnode.com", "https://mainnet.base.org"], llama: "base", tx: "https://basescan.org/tx/", nft: "https://basescan.org/token/", acct: "https://basescan.org/address/", native: "ETH", gas: 0.0004 },
    ARB: { name: "Arbitrum", id: 42161, rpc: ["https://arbitrum-one-rpc.publicnode.com", "https://arb1.arbitrum.io/rpc"], llama: "arbitrum", tx: "https://arbiscan.io/tx/", nft: "https://arbiscan.io/token/", acct: "https://arbiscan.io/address/", native: "ETH", gas: 0.0004 },
    OP: { name: "Optimism", id: 10, rpc: ["https://optimism-rpc.publicnode.com", "https://mainnet.optimism.io"], llama: "optimism", tx: "https://optimistic.etherscan.io/tx/", nft: "https://optimistic.etherscan.io/token/", acct: "https://optimistic.etherscan.io/address/", native: "ETH", gas: 0.0004 },
  };
  // Gestores de posiciones verificados en la blockchain (nombre del NFT, fábrica y WETH9). slip: Aerodrome/Velodrome (Slipstream).
  var DEX = [
    { k: "uni", name: "Uniswap v3", chain: "ETH", npm: "0xc36442b4a4522e871399cd717abdd847ab11fe88" },
    { k: "pcs", name: "PancakeSwap v3", chain: "ETH", npm: "0x46a15b0b27311cedf172ab29e4f4766fbe7f4364" },
    { k: "sushi", name: "Sushi v3", chain: "ETH", npm: "0x2214a42d8e2a1d20635c2cb0664422c528b6a432" },
    { k: "uni", name: "Uniswap v3", chain: "BSC", npm: "0x7b8a01b39d58278b5de7e48c8449c9f4f5170613" },
    { k: "pcs", name: "PancakeSwap v3", chain: "BSC", npm: "0x46a15b0b27311cedf172ab29e4f4766fbe7f4364" },
    { k: "sushi", name: "Sushi v3", chain: "BSC", npm: "0xf70c086618dcf2b1a461311275e00d6b722ef914" },
    { k: "uni", name: "Uniswap v3", chain: "BASE", npm: "0x03a520b32c04bf3beef7beb72e919cf822ed34f1" },
    { k: "pcs", name: "PancakeSwap v3", chain: "BASE", npm: "0x46a15b0b27311cedf172ab29e4f4766fbe7f4364" },
    { k: "sushi", name: "Sushi v3", chain: "BASE", npm: "0x80c7dd17b01855a6d2347444a0fcc36136a314de" },
    { k: "aero", name: "Aerodrome", chain: "BASE", npm: "0x827922686190790b37229fd06084350e74485b72", slip: true },
    { k: "aero2", name: "Aerodrome", chain: "BASE", npm: "0xa990c6a764b73bf43cee5bb40339c3322fb9d55f", slip: true },
    { k: "uni", name: "Uniswap v3", chain: "ARB", npm: "0xc36442b4a4522e871399cd717abdd847ab11fe88" },
    { k: "pcs", name: "PancakeSwap v3", chain: "ARB", npm: "0x46a15b0b27311cedf172ab29e4f4766fbe7f4364" },
    { k: "sushi", name: "Sushi v3", chain: "ARB", npm: "0xf0cbce1942a68beb3d1b73f0dd86c8dcc363ef49" },
    { k: "uni", name: "Uniswap v3", chain: "OP", npm: "0xc36442b4a4522e871399cd717abdd847ab11fe88" },
    { k: "sushi", name: "Sushi v3", chain: "OP", npm: "0x1af415a1eba07a4986a52b6f2e7de7003d82231e" },
    { k: "velo", name: "Velodrome", chain: "OP", npm: "0x416b433906b1b72fa758e166e239c43d68dc6f29", slip: true },
  ];
  var STABLE = /^(USDC|USDT|DAI|BUSD|FDUSD|USD1|USDE|PYUSD|TUSD|USDS|LUSD|FRAX|USDC\.E|BSC-USD)$/i;
  var MAX128 = (1n << 128n) - 1n;
  var Q96 = 2 ** 96;

  /* ---------- JSON-RPC ---------- */
  var rid = 1;
  async function rpcBatch(chain, calls) {
    var urls = CH[chain].rpc, last;
    for (var u = 0; u < urls.length; u++) {
      for (var t = 0; t < 3; t++) {
        try {
          var body = calls.map(function (c) { return { jsonrpc: "2.0", id: rid++, method: c[0], params: c[1] }; });
          var r = await fetch(urls[u], { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
          if (r.status === 429 || r.status >= 500) { last = new Error("HTTP " + r.status); await sleep(600 * (t + 1)); continue; }
          var j = await r.json();
          if (!Array.isArray(j)) throw new Error((j && j.error && j.error.message) || "Respuesta no válida del nodo");
          var byId = {};
          j.forEach(function (x) { byId[x.id] = x; });
          return body.map(function (b) { var x = byId[b.id]; return x && !x.error ? x.result : null; });
        } catch (e) { last = e; await sleep(400 * (t + 1)); }
      }
    }
    throw last || new Error("No se pudo leer " + CH[chain].name);
  }
  async function calls(chain, list) { // list: [[to,data,from?]] -> results (hex) en trozos de 40
    var out = [];
    for (var i = 0; i < list.length; i += 40) {
      var part = list.slice(i, i + 40).map(function (c) { var o = { to: c[0], data: c[1] }; if (c[2]) o.from = c[2]; return ["eth_call", [o, "latest"]]; });
      out = out.concat(await rpcBatch(chain, part));
    }
    return out;
  }
  function sleep(ms) { return new Promise(function (z) { setTimeout(z, ms); }); }

  /* ---------- ABI ---------- */
  function w(x) { // palabra de 32 bytes: bigint, número o dirección
    if (typeof x === "string") return x.replace(/^0x/i, "").toLowerCase().padStart(64, "0");
    var b = BigInt(x);
    if (b < 0n) b = (1n << 256n) + b;
    return b.toString(16).padStart(64, "0");
  }
  function words(hex) { hex = (hex || "0x").replace(/^0x/, ""); var o = []; for (var i = 0; i + 64 <= hex.length; i += 64) o.push(hex.slice(i, i + 64)); return o; }
  function U(word) { return BigInt("0x" + (word || "0")); }
  function I(word, bits) { var v = U(word) & ((1n << BigInt(bits)) - 1n); return v >= 1n << BigInt(bits - 1) ? v - (1n << BigInt(bits)) : v; }
  function A(word) { return "0x" + (word || "").slice(24); }
  function str(hex) { // string ABI o bytes32
    var ws = words(hex);
    if (!ws.length) return "";
    try {
      if (ws.length >= 3 && U(ws[0]) === 32n) {
        var n = Number(U(ws[1])), h = ws.slice(2).join("").slice(0, n * 2);
        return new TextDecoder().decode(Uint8Array.from(h.match(/../g) || [], function (b) { return parseInt(b, 16); }));
      }
      return new TextDecoder().decode(Uint8Array.from(ws[0].match(/../g), function (b) { return parseInt(b, 16); })).replace(/\0+$/, "");
    } catch (e) { return ""; }
  }
  function multicall(datas) { // multicall(bytes[])
    var n = datas.length, head = w(32) + w(n), offs = "", tail = "", pos = n * 32;
    datas.forEach(function (d) {
      var h = d.replace(/^0x/, ""), len = h.length / 2, padded = h.padEnd(Math.ceil(len / 32) * 64, "0");
      offs += w(pos);
      tail += w(len) + padded;
      pos += 32 + padded.length / 2;
    });
    return "0xac9650d8" + head + offs + tail;
  }
  var SEL = {
    balanceOf: "0x70a08231", tokenOfOwnerByIndex: "0x2f745c59", positions: "0x99fbab88", factory: "0xc45a0155", getPool: "0x1698ee82",
    slot0: "0x3850c7bd", decimals: "0x313ce567", symbol: "0x95d89b41", collect: "0xfc6f7865", decrease: "0x0c49ccbe", increase: "0x219f5d17",
    burn: "0x42966c68", getPoolTs: "0x28af8d0b", fee: "0xddca3f43", tickSpacing: "0xd0c93a7c", token0: "0x0dfe1681", token1: "0xd21220a7",
    mint: "0x88316456", mintSlip: "0xb5007d1f", unwrap: "0x49404b7c", sweep: "0xdf2ab5bb", weth: "0x4aa4a4fc", refund: "0x12210e8a", allowance: "0xdd62ed3e", approve: "0x095ea7b3",
  };

  /* ---------- matemáticas de liquidez ---------- */
  function sqrtAt(tick) { return Math.pow(1.0001, tick / 2); }
  function amounts(L, sp, tl, tu) { // cantidades brutas (float) de token0 y token1
    var sa = sqrtAt(tl), sb = sqrtAt(tu), l = Number(L);
    if (sp <= sa) return [l * (sb - sa) / (sa * sb), 0];
    if (sp >= sb) return [0, l * (sb - sa)];
    return [l * (sb - sp) / (sp * sb), l * (sp - sa)];
  }
  function rank(sym, addr, wnat) { return STABLE.test(sym) ? 2 : addr === wnat ? 1 : 0; }

  /* ---------- caché de datos que no cambian ---------- */
  var TOK = {}, POOL = {}, FACT = {}, WN = {};
  async function prices(keys) { // keys: ["ethereum:0x.."] -> { key: usd }
    var out = {};
    for (var i = 0; i < keys.length; i += 60) {
      try {
        var r = await fetch("https://coins.llama.fi/prices/current/" + keys.slice(i, i + 60).join(","));
        if (r.ok) { var c = (await r.json()).coins || {}; Object.keys(c).forEach(function (k) { out[k.toLowerCase()] = +c[k].price || 0; }); }
      } catch (e) {}
    }
    return out;
  }

  /* ---------- Curve y Balancer: tokens LP (sin rango ni NFT), solo lectura ---------- */
  var CRV = { ETH: "ethereum", ARB: "arbitrum", BASE: "base" }, CRVP = {};
  var BALCH = { MAINNET: "ETH", ARBITRUM: "ARB", BASE: "BASE", OPTIMISM: "OP" };
  async function curvePools(chain) {
    if (CRVP[chain] && Date.now() - CRVP[chain].at < 600000) return CRVP[chain].L;
    var r = await fetch("https://api.curve.finance/v1/getPools/all/" + CRV[chain]), j = await r.json();
    var L = ((j.data && j.data.poolData) || []).filter(function (p) { return +p.usdTotal >= 500000 && p.lpTokenAddress && +p.totalSupply > 0; });
    CRVP[chain] = { L: L, at: Date.now() };
    return L;
  }
  async function curvePositions(chain, owner) {
    var L = await curvePools(chain), q = [];
    L.forEach(function (p) { q.push([p.lpTokenAddress, SEL.balanceOf + w(owner)]); q.push([p.gaugeAddress || p.lpTokenAddress, SEL.balanceOf + w(owner)]); });
    if (!q.length) return [];
    var r = await calls(chain, q), out = [];
    L.forEach(function (p, i) {
      var lp = U(words(r[2 * i])[0]), g = p.gaugeAddress ? U(words(r[2 * i + 1])[0]) : 0n;
      if (lp + g === 0n) return;
      var share = Number(lp + g) / Number(BigInt(p.totalSupply)), usd = share * +p.usdTotal;
      if (usd < 0.01) return;
      out.push({ evm: true, lp: true, chain: chain, chainName: CH[chain].name, dex: "Curve", owner: owner, mint: "lp_crv_" + chain + "_" + String(p.address).toLowerCase(),
        pair: (p.coins || []).map(function (c) { return c.symbol; }).join("/") || p.name, usd: usd, stakedUsd: Number(g) / Number(BigInt(p.totalSupply)) * +p.usdTotal,
        url: "https://www.curve.finance/dex/" + CRV[chain] + "/pools/" + (p.id || p.address) + "/deposit", pend: 0 });
    });
    return out;
  }
  async function balancerPositions(owner) {
    var q = '{poolGetPools(where:{userAddress:"' + owner + '",chainIn:[MAINNET,ARBITRUM,BASE,OPTIMISM]}){id address name chain protocolVersion poolTokens{symbol} userBalance{totalBalanceUsd stakedBalances{balanceUsd}}}}';
    var r = await fetch("https://api-v3.balancer.fi/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: q }) }), j = await r.json();
    return ((j.data && j.data.poolGetPools) || []).filter(function (p) { return BALCH[p.chain] && p.userBalance && +p.userBalance.totalBalanceUsd >= 0.01; }).map(function (p) {
      var chain = BALCH[p.chain];
      return { evm: true, lp: true, chain: chain, chainName: CH[chain].name, dex: "Balancer", owner: owner, mint: "lp_bal_" + chain + "_" + String(p.address).toLowerCase(),
        pair: (p.poolTokens || []).map(function (t) { return t.symbol; }).join("/") || p.name, usd: +p.userBalance.totalBalanceUsd,
        stakedUsd: (p.userBalance.stakedBalances || []).reduce(function (a, x) { return a + (+x.balanceUsd || 0); }, 0),
        url: "https://balancer.fi/pools/" + String(p.chain).toLowerCase() + "/v" + (p.protocolVersion || 2) + "/" + p.id, pend: 0 };
    });
  }

  /** Posiciones de una dirección EVM: liquidez concentrada (Uniswap v3 y copias) y tokens LP de Curve y Balancer. */
  async function positions(owner, opts) {
    owner = String(owner || "").toLowerCase();
    if (!/^0x[0-9a-f]{40}$/.test(owner)) return [];
    opts = opts || {};
    var out = [], errs = [];
    await Promise.all(Object.keys(CH).map(async function (chain) {
      try { out = out.concat(await chainPositions(chain, owner, opts)); } catch (e) { errs.push(CH[chain].name); }
    }).concat(Object.keys(CRV).map(async function (chain) {
      try { out = out.concat(await curvePositions(chain, owner)); } catch (e) {}
    })).concat([(async function () { try { out = out.concat(await balancerPositions(owner)); } catch (e) {} })()]));
    out.sort(function (a, b) { return b.usd - a.usd; });
    if (errs.length) out.errors = errs;
    return out;
  }

  async function chainPositions(chain, owner, opts) {
    var dexes = DEX.filter(function (d) { return d.chain === chain; });
    // 1) cuántas posiciones tiene en cada gestor, fábrica y token nativo envuelto
    var head = [];
    dexes.forEach(function (d) {
      head.push([d.npm, SEL.balanceOf + w(owner)]);
      if (!FACT[chain + d.npm]) head.push([d.npm, SEL.factory]);
      if (!WN[chain + d.npm]) head.push([d.npm, SEL.weth]);
    });
    var hr = await calls(chain, head), k = 0, ids = [];
    dexes.forEach(function (d) {
      d.n = Number(U(words(hr[k++])[0]));
      if (!FACT[chain + d.npm]) FACT[chain + d.npm] = A(words(hr[k++])[0]);
      if (!WN[chain + d.npm]) WN[chain + d.npm] = A(words(hr[k++])[0]);
    });
    // 2) ids de los NFT
    var q = [];
    dexes.forEach(function (d) { for (var i = 0; i < Math.min(d.n, 100); i++) q.push([d, [d.npm, SEL.tokenOfOwnerByIndex + w(owner) + w(i)]]); });
    if (!q.length) return [];
    var ir = await calls(chain, q.map(function (x) { return x[1]; }));
    q.forEach(function (x, i) { if (ir[i]) ids.push({ d: x[0], id: U(words(ir[i])[0]) }); });
    // 3) datos de cada posición y rendimiento pendiente (simulando collect desde el dueño)
    var pr = await calls(chain, ids.map(function (x) { return [x.d.npm, SEL.positions + w(x.id)]; }));
    var cr = await calls(chain, ids.map(function (x) { return [x.d.npm, SEL.collect + w(x.id) + w(owner) + w(MAX128) + w(MAX128), owner]; }));
    var list = [];
    ids.forEach(function (x, i) {
      var p = words(pr[i]);
      if (p.length < 12) return;
      var liq = U(p[7]), c = words(cr[i]), f0 = c.length >= 2 ? U(c[0]) : U(p[10]), f1 = c.length >= 2 ? U(c[1]) : U(p[11]);
      if (liq === 0n && f0 === 0n && f1 === 0n && !opts.all) return; // cerrada y vacía
      var f4 = Number(I(p[4], 24));
      list.push({ d: x.d, id: x.id, t0: A(p[2]), t1: A(p[3]), fee: x.d.slip ? null : f4, ts: x.d.slip ? f4 : null, tl: Number(I(p[5], 24)), tu: Number(I(p[6], 24)), liq: liq, f0: f0, f1: f1 });
    });
    if (!list.length) return [];
    // 4) tokens y pools (con caché)
    var need = [];
    list.forEach(function (x) {
      [x.t0, x.t1].forEach(function (t) { if (!TOK[chain + t] && need.indexOf(t) < 0) need.push(t); });
    });
    if (need.length) {
      var tr = await calls(chain, need.map(function (t) { return [t, SEL.decimals]; }).concat(need.map(function (t) { return [t, SEL.symbol]; })));
      need.forEach(function (t, i) { TOK[chain + t] = { dec: Number(U(words(tr[i])[0] || "12")), sym: str(tr[need.length + i]) || t.slice(0, 6) }; });
    }
    var pk = [];
    list.forEach(function (x) { x.pkey = chain + x.d.npm + x.t0 + x.t1 + (x.d.slip ? "s" + x.ts : x.fee); if (!POOL[x.pkey] && pk.indexOf(x) < 0) pk.push(x); });
    if (pk.length) {
      var gr = await calls(chain, pk.map(function (x) { return [FACT[chain + x.d.npm], (x.d.slip ? SEL.getPoolTs : SEL.getPool) + w(x.t0) + w(x.t1) + w(x.d.slip ? x.ts : x.fee)]; }));
      pk.forEach(function (x, i) { POOL[x.pkey] = A(words(gr[i])[0]); });
    }
    var pools = [];
    list.forEach(function (x) { if (pools.indexOf(POOL[x.pkey]) < 0) pools.push(POOL[x.pkey]); });
    var sr = await calls(chain, pools.map(function (a) { return [a, SEL.slot0]; }).concat(pools.map(function (a) { return [a, SEL.fee]; }))), SP = {}, PF = {};
    pools.forEach(function (a, i) { var s = words(sr[i]); SP[a] = s.length ? Number(U(s[0])) / Q96 : 0; PF[a] = Number(U(words(sr[pools.length + i])[0] || "0")); });
    list.forEach(function (x) { if (x.fee == null) x.fee = PF[POOL[x.pkey]] || 0; });
    // 5) precios en dólares
    var keys = [];
    list.forEach(function (x) { [x.t0, x.t1].forEach(function (t) { var kk = CH[chain].llama + ":" + t; if (keys.indexOf(kk) < 0) keys.push(kk); }); });
    var PX = await prices(keys);
    return list.map(function (x) { return build(chain, x, SP[POOL[x.pkey]], POOL[x.pkey], PX, owner); });
  }

  function build(chain, x, sp, pool, PX, owner) {
    var a = TOK[chain + x.t0], b = TOK[chain + x.t1], wn = WN[chain + x.d.npm];
    var raw = amounts(x.liq, sp, x.tl, x.tu);
    var am0 = raw[0] / Math.pow(10, a.dec), am1 = raw[1] / Math.pow(10, b.dec);
    var fe0 = Number(x.f0) / Math.pow(10, a.dec), fe1 = Number(x.f1) / Math.pow(10, b.dec);
    var k = Math.pow(10, a.dec - b.dec), p01 = sp * sp * k, lo01 = Math.pow(1.0001, x.tl) * k, hi01 = Math.pow(1.0001, x.tu) * k;
    var px0 = PX[(CH[chain].llama + ":" + x.t0).toLowerCase()] || 0, px1 = PX[(CH[chain].llama + ":" + x.t1).toLowerCase()] || 0;
    if (!px0 && px1 && p01 > 0) px0 = px1 * p01;
    if (!px1 && px0 && p01 > 0) px1 = px0 / p01;
    var inv = rank(a.sym, x.t0, wn) > rank(b.sym, x.t1, wn); // la moneda de referencia (estable o nativa) va a la derecha
    var A_ = inv ? { t: x.t1, s: b.sym, d: b.dec, am: am1, fe: fe1, px: px1 } : { t: x.t0, s: a.sym, d: a.dec, am: am0, fe: fe0, px: px0 };
    var B_ = inv ? { t: x.t0, s: a.sym, d: a.dec, am: am0, fe: fe0, px: px0 } : { t: x.t1, s: b.sym, d: b.dec, am: am1, fe: fe1, px: px1 };
    var price = inv ? (p01 > 0 ? 1 / p01 : 0) : p01, lo = inv ? 1 / hi01 : lo01, hi = inv ? 1 / lo01 : hi01;
    var nat = function (t, s) { return t === wn ? CH[chain].native : s; };
    return {
      evm: true, chain: chain, chainName: CH[chain].name, dex: x.d.name, dexKey: x.d.k, npm: x.d.npm, tokenId: x.id.toString(), owner: owner,
      mint: "e" + CH[chain].id + "_" + x.d.k + "_" + x.id.toString(), pool: pool, wnative: wn,
      pair: nat(A_.t, A_.s) + "/" + nat(B_.t, B_.s), fee: x.fee / 10000, inv: inv,
      t0: x.t0, t1: x.t1, dec0: a.dec, dec1: b.dec, tl: x.tl, tu: x.tu, liq: x.liq.toString(),
      raw0: raw[0], raw1: raw[1], owed0: x.f0.toString(), owed1: x.f1.toString(),
      mA: A_.t, mB: B_.t, symA: nat(A_.t, A_.s), symB: nat(B_.t, B_.s), decA: A_.d, decB: B_.d, amtA: A_.am, amtB: B_.am,
      pxA: A_.px, pxB: B_.px, price: price, lo: lo, hi: hi,
      usd: A_.am * A_.px + B_.am * B_.px, pendA: A_.fe, pendB: B_.fe, pend: A_.fe * A_.px + B_.fe * B_.px,
      pnl: null, harv: null, est: null, est24: null, entry: null, dur: null,
    };
  }

  /* ---------- transacciones (las firma la wallet del usuario) ---------- */
  function deadline() { return BigInt(Math.floor(Date.now() / 1000) + 1200); }
  function collectTo(p, owner) { // cobra a la wallet; si un token es el nativo envuelto (WETH/WBNB) se entrega como ETH/BNB
    var hasN = p.t0 === p.wnative || p.t1 === p.wnative;
    if (!hasN) return [SEL.collect + w(BigInt(p.tokenId)) + w(owner) + w(MAX128) + w(MAX128)];
    var other = p.t0 === p.wnative ? p.t1 : p.t0;
    return [SEL.collect + w(BigInt(p.tokenId)) + w(0) + w(MAX128) + w(MAX128), SEL.unwrap + w(0) + w(owner), SEL.sweep + w(other) + w(0) + w(owner)];
  }
  function minOut(rawAmt, frac, slipBps) { var v = rawAmt * frac * (1 - slipBps / 10000); return v > 0 ? BigInt(Math.floor(v)) : 0n; }
  function txHarvest(p, owner) {
    var c = collectTo(p, owner);
    return { to: p.npm, data: c.length === 1 ? c[0] : multicall(c), value: "0x0" };
  }
  function txDecrease(p, owner, pct, slipBps) {
    var L = BigInt(p.liq), part = pct >= 100 ? L : (L * BigInt(Math.round(pct * 100))) / 10000n, frac = Number(part) / Number(L || 1n);
    var dec = SEL.decrease + w(BigInt(p.tokenId)) + w(part) + w(minOut(p.raw0, frac, slipBps)) + w(minOut(p.raw1, frac, slipBps)) + w(deadline());
    return { to: p.npm, data: multicall([dec].concat(collectTo(p, owner))), value: "0x0" };
  }
  function txClose(p, owner, slipBps) {
    var steps = [];
    if (BigInt(p.liq) > 0n) steps.push(SEL.decrease + w(BigInt(p.tokenId)) + w(BigInt(p.liq)) + w(minOut(p.raw0, 1, slipBps)) + w(minOut(p.raw1, 1, slipBps)) + w(deadline()));
    steps = steps.concat(collectTo(p, owner));
    steps.push(SEL.burn + w(BigInt(p.tokenId)));
    return { to: p.npm, data: multicall(steps), value: "0x0" };
  }
  /** Depositar: a y b en unidades del par mostrado (A/B). El lado nativo (ETH/BNB) se paga con saldo nativo. */
  function txIncrease(p, a, b, slipBps) {
    var rawA = BigInt(Math.floor(a * Math.pow(10, p.decA))), rawB = BigInt(Math.floor(b * Math.pow(10, p.decB)));
    var d0 = p.inv ? rawB : rawA, d1 = p.inv ? rawA : rawB, s = BigInt(10000 - slipBps);
    var data = SEL.increase + w(BigInt(p.tokenId)) + w(d0) + w(d1) + w((d0 * s) / 10000n) + w((d1 * s) / 10000n) + w(deadline());
    var val = p.t0 === p.wnative ? d0 : p.t1 === p.wnative ? d1 : 0n;
    return { to: p.npm, data: val > 0n ? multicall([data, SEL.refund]) : data, value: "0x" + val.toString(16), need: [{ t: p.t0, amt: d0 }, { t: p.t1, amt: d1 }].filter(function (x) { return x.t !== p.wnative && x.amt > 0n; }) };
  }
  async function allowance(chain, token, owner, spender) { var r = await calls(chain, [[token, SEL.allowance + w(owner) + w(spender)]]); return U(words(r[0])[0]); }
  async function balances(chain, owner, tokens) { // saldos brutos: nativo + ERC20
    var r = await calls(chain, tokens.map(function (t) { return [t, SEL.balanceOf + w(owner)]; }));
    var nb = await rpcBatch(chain, [["eth_getBalance", [owner, "latest"]]]);
    var o = { native: BigInt(nb[0] || "0x0") };
    tokens.forEach(function (t, i) { o[t] = U(words(r[i])[0]); });
    return o;
  }
  function approveData(spender, amt) { return SEL.approve + w(spender) + w(amt); }

  /* ---------- crear posiciones ---------- */
  var NETK = { eth: "ETH", bsc: "BSC", base: "BASE", arbitrum: "ARB", optimism: "OP" };
  /** Datos de una pool concentrada y el gestor de posiciones que le corresponde (por su fábrica). null si no es compatible. */
  async function poolInfo(chain, pool) {
    pool = String(pool).toLowerCase();
    var dexes = DEX.filter(function (d) { return d.chain === chain; });
    var need = dexes.filter(function (d) { return !FACT[chain + d.npm] || !WN[chain + d.npm]; });
    if (need.length) {
      var hr = await calls(chain, need.map(function (d) { return [d.npm, SEL.factory]; }).concat(need.map(function (d) { return [d.npm, SEL.weth]; })));
      need.forEach(function (d, i) { FACT[chain + d.npm] = A(words(hr[i])[0]); WN[chain + d.npm] = A(words(hr[need.length + i])[0]); });
    }
    var r = await calls(chain, [[pool, SEL.factory], [pool, SEL.token0], [pool, SEL.token1], [pool, SEL.fee], [pool, SEL.tickSpacing], [pool, SEL.slot0]]);
    if (!r[0] || !r[5]) return null;
    var fac = A(words(r[0])[0]), d = dexes.filter(function (x) { return FACT[chain + x.npm] === fac; })[0];
    if (!d) return null;
    var t0 = A(words(r[1])[0]), t1 = A(words(r[2])[0]), s0 = words(r[5]);
    var need2 = [t0, t1].filter(function (t) { return !TOK[chain + t]; });
    if (need2.length) {
      var tr = await calls(chain, need2.map(function (t) { return [t, SEL.decimals]; }).concat(need2.map(function (t) { return [t, SEL.symbol]; })));
      need2.forEach(function (t, i) { TOK[chain + t] = { dec: Number(U(words(tr[i])[0] || "12")), sym: str(tr[need2.length + i]) || t.slice(0, 6) }; });
    }
    var a = TOK[chain + t0], b = TOK[chain + t1], wn = WN[chain + d.npm], sp = Number(U(s0[0])) / Q96, k = Math.pow(10, a.dec - b.dec);
    var inv = rank(a.sym, t0, wn) > rank(b.sym, t1, wn), p01 = sp * sp * k;
    var PX = await prices([CH[chain].llama + ":" + t0, CH[chain].llama + ":" + t1]);
    var px0 = PX[(CH[chain].llama + ":" + t0).toLowerCase()] || 0, px1 = PX[(CH[chain].llama + ":" + t1).toLowerCase()] || 0;
    if (!px0 && px1) px0 = px1 * p01;
    if (!px1 && px0 && p01 > 0) px1 = px0 / p01;
    var nat = function (t, s) { return t === wn ? CH[chain].native : s; };
    return {
      chain: chain, pool: pool, dex: d.name, dexKey: d.k, npm: d.npm, slip: !!d.slip, wnative: wn, t0: t0, t1: t1, dec0: a.dec, dec1: b.dec,
      fee: Number(U(words(r[3])[0])) / 10000, ts: Number(I(words(r[4])[0], 24)), sp: sp, tick: Number(I(s0[1], 24)), inv: inv,
      mA: inv ? t1 : t0, mB: inv ? t0 : t1, symA: inv ? nat(t1, b.sym) : nat(t0, a.sym), symB: inv ? nat(t0, a.sym) : nat(t1, b.sym),
      decA: inv ? b.dec : a.dec, decB: inv ? a.dec : b.dec, pxA: inv ? px1 : px0, pxB: inv ? px0 : px1, price: inv ? (p01 > 0 ? 1 / p01 : 0) : p01,
    };
  }
  /** Ticks (redondeados al espaciado de la pool) para un rango de precios en la orientación mostrada A/B. lo<=0 o hi=Infinity: rango completo. */
  function ticks(info, lo, hi) {
    var k = Math.pow(10, info.dec0 - info.dec1), ts = info.ts, MIN = Math.ceil(-887272 / ts) * ts, MAX = Math.floor(887272 / ts) * ts;
    var full = !(lo > 0) || !isFinite(hi);
    if (full) return { tl: MIN, tu: MAX, full: true };
    var r0 = info.inv ? 1 / hi : lo, r1 = info.inv ? 1 / lo : hi; // precio de token1 por token0 (humano)
    var tl = Math.floor(Math.log(r0 / k) / Math.log(1.0001) / ts) * ts, tu = Math.ceil(Math.log(r1 / k) / Math.log(1.0001) / ts) * ts;
    if (tu <= tl) tu = tl + ts;
    return { tl: Math.max(MIN, tl), tu: Math.min(MAX, tu), full: false };
  }
  /** Proporción del rango: cuánto valen (en %) A y B dentro de la posición al precio actual. */
  function split(info, tl, tu) {
    var a = amounts(1e18, info.sp, tl, tu), v0 = a[0] / Math.pow(10, info.dec0) * (info.inv ? info.pxB : info.pxA), v1 = a[1] / Math.pow(10, info.dec1) * (info.inv ? info.pxA : info.pxB);
    var fA = info.inv ? v1 : v0, fB = info.inv ? v0 : v1, t = fA + fB;
    return t > 0 ? { a: fA / t, b: fB / t } : { a: 0.5, b: 0.5 };
  }
  /** Cantidades (en el par mostrado A/B) para una misma liquidez: sirve para enlazar los dos importes. */
  function ratio(info, tl, tu) {
    var a = amounts(1e18, info.sp, tl, tu), x0 = a[0] / Math.pow(10, info.dec0), x1 = a[1] / Math.pow(10, info.dec1);
    return info.inv ? { a: x1, b: x0 } : { a: x0, b: x1 };
  }
  /** Cantidades usadas de verdad (brutas, token0/token1) por mint con d0/d1 deseados. */
  function used(info, tl, tu, d0, d1) {
    var sa = sqrtAt(tl), sb = sqrtAt(tu), sp = info.sp, L;
    if (sp <= sa) L = Number(d0) * sa * sb / (sb - sa);
    else if (sp >= sb) L = Number(d1) / (sb - sa);
    else L = Math.min(Number(d0) * sp * sb / (sb - sp), Number(d1) / (sp - sa));
    return amounts(L, sp, tl, tu);
  }
  /** Transacción para crear la posición. a y b: cantidades en el par mostrado (A/B). */
  function txMint(info, owner, tl, tu, a, b, slipBps) {
    var rA = BigInt(Math.floor(a * Math.pow(10, info.decA))), rB = BigInt(Math.floor(b * Math.pow(10, info.decB)));
    var d0 = info.inv ? rB : rA, d1 = info.inv ? rA : rB, u = used(info, tl, tu, d0, d1), f = 1 - slipBps / 10000;
    var m0 = BigInt(Math.max(0, Math.floor(u[0] * f))), m1 = BigInt(Math.max(0, Math.floor(u[1] * f)));
    var data = info.slip
      ? SEL.mintSlip + w(info.t0) + w(info.t1) + w(info.ts) + w(tl) + w(tu) + w(d0) + w(d1) + w(m0) + w(m1) + w(owner) + w(deadline()) + w(0)
      : SEL.mint + w(info.t0) + w(info.t1) + w(Math.round(info.fee * 10000)) + w(tl) + w(tu) + w(d0) + w(d1) + w(m0) + w(m1) + w(owner) + w(deadline());
    var val = info.t0 === info.wnative ? d0 : info.t1 === info.wnative ? d1 : 0n;
    return { to: info.npm, data: val > 0n ? multicall([data, SEL.refund]) : data, value: "0x" + val.toString(16), need: [{ t: info.t0, amt: d0 }, { t: info.t1, amt: d1 }].filter(function (x) { return x.t !== info.wnative && x.amt > 0n; }) };
  }

  G.kzEvmPos = { ready: true, version: "2.1.0", CH: CH, DEX: DEX, NETK: NETK, positions: positions, poolInfo: poolInfo, ticks: ticks, split: split, ratio: ratio, txMint: txMint, txHarvest: txHarvest, txDecrease: txDecrease, txClose: txClose, txIncrease: txIncrease, allowance: allowance, balances: balances, approveData: approveData, _calls: calls, _multicall: multicall };
})(typeof window !== "undefined" ? window : globalThis);
