/* Ayuda de Kosmara: botón flotante con preguntas frecuentes. Respuestas escritas a mano, sin servidor ni IA. */
(function () {
  "use strict";
  var MAIL = "kosmara.soporte@gmail.com";
  var T = [
    ["start", "Empezar"], ["fees", "Comisiones"], ["vault", "Vaults"], ["pool", "Pools"], ["swap", "Swap"], ["safe", "Seguridad"]
  ];
  /* [tema, pregunta, respuesta, palabras extra para el buscador] */
  var Q = [
    ["start", "¿Qué es Kosmara?", "Kosmara es una app para usar DeFi desde un solo sitio: pools de liquidez, swaps y vaults en Solana, Ethereum, Base, Arbitrum, Optimism y BNB Chain. No guarda tus fondos: todo pasa entre tu wallet y el protocolo de destino (Orca, Raydium, Meteora, Aave, Morpho, Jupiter…).", "que es app"],
    ["start", "¿Qué wallet necesito?", "Para Solana: Phantom, Trust, OKX o Coinbase Wallet. Para Ethereum y las demás redes: MetaMask, Rabby, Trust, OKX o Coinbase Wallet. Phantom sirve para las dos. Pulsa «Conectar» arriba a la derecha.", "conectar metamask phantom rabby"],
    ["start", "¿Puedo ver una wallet sin conectarla?", "Sí. En Portafolio puedes pegar cualquier dirección pública para ver sus tokens, posiciones y vaults en modo lectura. No se puede firmar nada desde ahí.", "vigilar direccion publica ver"],
    ["start", "Mis datos no se actualizan", "Las posiciones se refrescan solas cada pocos segundos y las pools cada 5 minutos. Para actualizar todo al momento, arrastra la pantalla hacia abajo desde arriba del todo.", "actualizar recargar refrescar saldo"],

    ["fees", "¿Cuánto cobra Kosmara?", "Swap en la misma red: 0,2 %. Swap entre redes: 0,3 %. Ver, abrir y gestionar pools: gratis (si usas el autoswap al crear la posición, 0,2 % del cambio). Vaults: depositar y retirar es gratis; el autoswap cuesta 0,2 % en la misma red y 0,3 % entre redes. Las comisiones ya van incluidas en el precio que ves antes de firmar.", "precio coste cuanto fee"],
    ["fees", "¿Qué es la comisión de red?", "Es lo que cobra la propia blockchain por procesar tu transacción (el «gas»). No es de Kosmara. En Solana, Base o Arbitrum suele ser de céntimos; en Ethereum puede ser bastante más.", "gas red fee"],
    ["fees", "¿Cuánto cobrará la Vault Kosmara?", "El 10 % del rendimiento que generes; tú te quedas el 90 %. Nunca se cobra sobre tu capital: si no ganas, no pagas. Depositar y retirar sigue siendo gratis. Aún no está abierta.", "vault kosmara 10"],

    ["vault", "¿Qué es una vault?", "Depositas un solo token (por ejemplo USDC) y ganas intereses que pagan quienes piden prestado. No hay rango ni NFT, y lo retiras cuando quieras. El rendimiento es variable.", "que es vault deposito interes"],
    ["vault", "¿Qué diferencia hay entre Aave y Morpho?", "En Aave tu depósito va a un fondo común muy grande. En Morpho depositas en una vault gestionada por un curador profesional (Steakhouse, Gauntlet, Re7…), que reparte el dinero entre varios mercados de préstamo para buscar más rendimiento con un riesgo controlado.", "aave morpho curador diferencia"],
    ["vault", "¿Puedo depositar con otro token o desde otra red?", "Sí. En «Pagas con» eliges cualquier token que tengas y Kosmara hace el autoswap antes de depositar. Desde otra red EVM va por LI.FI; desde Solana va por THORChain (a vaults de Ethereum y BNB Chain). Si llega a otra red, necesitas un poco de ETH o BNB allí para el gas del depósito.", "autoswap otra red solana pagar con"],
    ["vault", "¿Cuántas firmas tengo que hacer?", "Kosmara te lo dice antes de empezar. Normalmente entre 1 y 3: el permiso del token (solo si hace falta), el cambio si usas autoswap y el depósito. Si tu wallet permite agrupar operaciones, todo va en una sola confirmación.", "firmas confirmaciones permiso"],
    ["vault", "¿Qué es el «permiso» de un token?", "En Ethereum y redes parecidas, antes de que un protocolo pueda mover un token tuyo, tienes que autorizarlo. Kosmara pide solo la cantidad exacta. Si marcas «Permiso permanente», los siguientes depósitos de ese token necesitan una firma menos; puedes quitarlo cuando quieras desde tu wallet.", "approve aprobar permiso permanente"],
    ["vault", "¿Por qué cambia el rendimiento?", "Depende de cuánto se pide prestado en cada momento: si hay mucha demanda sube, y si no, baja. Por eso el APY mostrado es orientativo y no está garantizado.", "apy apr rendimiento cambia baja"],
    ["vault", "¿Dónde veo mis depósitos?", "En Portafolio → Vaults. Ahí ves lo depositado, su valor y el rendimiento, y puedes depositar más o retirar (gratis).", "retirar ver depositos portafolio"],

    ["pool", "¿Qué es una pool de liquidez concentrada?", "Aportas dos tokens dentro de un rango de precios y ganas parte de las comisiones de cada cambio que pasa por ese rango. Cuanto más estrecho el rango, más comisiones ganas por dólar, pero más fácil es salirte de él.", "pool liquidez rango concentrada"],
    ["pool", "¿Qué pasa si el precio sale de mi rango?", "Tu posición deja de ganar comisiones y queda toda en uno de los dos tokens. Tus fondos siguen ahí: puedes esperar a que el precio vuelva, o cerrar y abrir otra posición con un rango nuevo.", "fuera de rango"],
    ["pool", "¿Qué es la pérdida impermanente?", "Si el precio de los dos tokens cambia mucho, al retirar puedes tener menos valor que si los hubieras guardado sin más. Las comisiones ganadas la compensan en parte o del todo. Se llama «impermanente» porque desaparece si el precio vuelve al punto de partida.", "perdida impermanente il"],
    ["pool", "¿Qué es la auto-composición?", "Reinvierte solas las comisiones que gana tu posición, sin que tengas que firmar cada vez. Eliges desde qué cantidad en dólares y cada cuántas horas. Ahora funciona con posiciones de Orca: actívala en el menú de la posición.", "autocompound auto compound reinvertir"],
    ["pool", "¿Qué es el autoswap al crear una posición?", "Si solo tienes uno de los dos tokens, Kosmara cambia la parte necesaria para que puedas abrir la posición con uno solo. Ese cambio tiene una comisión de Kosmara del 0,2 %.", "autoswap posicion un token"],

    ["swap", "¿Qué es el deslizamiento?", "Es cuánto aceptas que el precio empeore entre que ves la cotización y se ejecuta el cambio. Si se supera, la transacción no se hace y no pierdes nada (salvo la comisión de red en algunas redes).", "slippage deslizamiento"],
    ["swap", "¿Cuánto tarda un swap entre redes?", "Normalmente entre 1 y 20 minutos, según las redes. Se hace con THORChain, que te envía el resultado a tu dirección de destino. Para importes muy pequeños las comisiones fijas pesan mucho: fíjate en el mínimo recomendado.", "entre redes thorchain tarda tiempo bridge"],
    ["swap", "¿Puedo entrar con cualquier token?", "Sí. Si THORChain no admite tu token, Kosmara lo cambia primero al nativo de su red (SOL, ETH o BNB), sin comisión de Kosmara en ese paso, y después lo envía. Son dos firmas.", "cualquier token entrada"],
    ["swap", "Me dice que no hay ruta", "No hay liquidez suficiente para ese par o ese importe. Prueba con otra cantidad, otro token de salida o vuelve a intentarlo en un rato.", "no hay ruta error"],

    ["safe", "¿Me pedirá Kosmara la frase semilla?", "Nunca. Kosmara jamás te pedirá tu frase semilla ni tu clave privada, ni por la app ni por email ni por redes. Si alguien te la pide en nombre de Kosmara, es una estafa.", "frase semilla seed clave privada estafa"],
    ["safe", "¿Kosmara puede mover mis fondos?", "No. Cada operación la revisas y la firmas tú en tu wallet. Kosmara no guarda fondos ni tiene acceso a tus claves.", "custodia fondos seguro"],
    ["safe", "¿Es seguro? ¿Está auditado?", "Kosmara no tiene contratos propios: usa los de protocolos conocidos y auditados (Orca, Raydium, Meteora, Aave, Morpho, Jupiter, THORChain…). Aun así, DeFi tiene riesgos: fallos de contratos, cambios bruscos de precio o pérdida impermanente. Empieza con importes pequeños.", "auditoria riesgo seguro"],
    ["safe", "¿Kosmara me da consejos de inversión?", "No. Kosmara muestra datos y te deja operar, pero nada de lo que ves es una recomendación de inversión. Decide siempre con tu propio criterio.", "consejo asesoramiento recomendacion"],
  ];

  var css = "#kzh{position:fixed;right:14px;bottom:calc(78px + min(env(safe-area-inset-bottom,0px),4px));z-index:45;width:52px;height:52px;border-radius:50%;border:1px solid rgba(20,241,149,.55);background:radial-gradient(circle at 30% 25%,#1f6b5a,#0b2a26);color:#eafff6;display:grid;place-items:center;box-shadow:0 6px 22px rgba(0,0,0,.45);cursor:pointer;-webkit-tap-highlight-color:transparent}" +
    "#kzh svg{width:24px;height:24px}#kzh:focus-visible{outline:2px solid #14f195;outline-offset:3px}" +
    "#kzhp{position:fixed;right:10px;left:10px;bottom:calc(140px + min(env(safe-area-inset-bottom,0px),4px));z-index:46;max-width:420px;margin-left:auto;max-height:min(68vh,560px);display:flex;flex-direction:column;background:rgba(9,24,23,.97);border:1px solid rgba(255,255,255,.14);border-radius:18px;box-shadow:0 14px 40px rgba(0,0,0,.55);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);overflow:hidden}" +
    "#kzhp[hidden]{display:none}#kzhp .hd{display:flex;align-items:center;gap:10px;padding:14px 14px 10px}#kzhp .hd b{font-size:16px;flex:1}#kzhp .hd button{background:none;border:0;color:#cfe;font-size:22px;line-height:1;padding:2px 6px;cursor:pointer}" +
    "#kzhp .sr{padding:0 14px 10px}#kzhp input{width:100%;box-sizing:border-box;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:12px;color:#fff;padding:10px 12px;font:inherit;font-size:14px}#kzhp input:focus{outline:none;border-color:rgba(20,241,149,.6)}" +
    "#kzhp .bd{overflow-y:auto;padding:4px 14px 14px;display:flex;flex-direction:column;gap:8px;overscroll-behavior:contain}" +
    "#kzhp .bt{align-self:flex-start;max-width:88%;background:rgba(255,255,255,.08);border-radius:14px 14px 14px 4px;padding:10px 12px;font-size:14px;line-height:1.5;color:#e9f3f1}" +
    "#kzhp .us{align-self:flex-end;max-width:85%;background:rgba(20,241,149,.18);border:1px solid rgba(20,241,149,.35);border-radius:14px 14px 4px 14px;padding:8px 12px;font-size:14px;color:#fff}" +
    "#kzhp .ops{display:flex;flex-wrap:wrap;gap:6px}#kzhp .ops button{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);color:#fff;border-radius:999px;padding:7px 11px;font:inherit;font-size:13px;cursor:pointer;text-align:left}" +
    "#kzhp .ops button.q{border-radius:12px;width:100%}#kzhp .ops button:hover{border-color:rgba(20,241,149,.6)}#kzhp a{color:#14f195}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var btn = document.createElement("button");
  btn.id = "kzh"; btn.type = "button"; btn.setAttribute("aria-label", "Ayuda: preguntas frecuentes"); btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.1-2.4 3.5"/><circle cx="12" cy="16.6" r=".6" fill="currentColor"/></svg>';
  var pn = document.createElement("div");
  pn.id = "kzhp"; pn.hidden = true; pn.setAttribute("role", "dialog"); pn.setAttribute("aria-label", "Preguntas frecuentes");
  pn.innerHTML = '<div class="hd"><b>¿En qué te ayudo?</b><button type="button" data-h="x" aria-label="Cerrar">×</button></div><div class="sr"><input type="search" id="kzhq" placeholder="Busca: comisiones, vaults, firmas…" autocomplete="off"></div><div class="bd" id="kzhb" aria-live="polite"></div>';
  document.body.appendChild(btn); document.body.appendChild(pn);
  var bd = pn.querySelector("#kzhb"), inp = pn.querySelector("#kzhq");

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function bot(h) { var d = document.createElement("div"); d.className = "bt"; d.innerHTML = h; bd.appendChild(d); return d; }
  function user(t) { var d = document.createElement("div"); d.className = "us"; d.textContent = t; bd.appendChild(d); }
  function ops(list, cls) { var d = document.createElement("div"); d.className = "ops"; d.innerHTML = list.map(function (o) { return '<button type="button" class="' + (cls || "") + '" data-h="' + esc(o[0]) + '">' + esc(o[1]) + "</button>"; }).join(""); bd.appendChild(d); }
  function down() { bd.scrollTop = bd.scrollHeight; }
  function topics() { ops(T.map(function (t) { return ["t:" + t[0], t[1]]; })); }
  function start() { bd.innerHTML = ""; bot("Hola. Elige un tema o escribe tu duda arriba."); topics(); }
  function topic(k) { var t = T.filter(function (x) { return x[0] === k; })[0]; user(t[1]); ops(Q.map(function (q, i) { return q[0] === k ? ["q:" + i, q[1]] : null; }).filter(Boolean), "q"); down(); }
  function answer(i) { var q = Q[i]; user(q[1]); bot(esc(q[2])); var rel = Q.map(function (x, j) { return x[0] === q[0] && j !== i ? ["q:" + j, x[1]] : null; }).filter(Boolean).slice(0, 3);
    if (rel.length) ops(rel, "q"); ops([["m", "Ver todos los temas"]]); down(); }
  function search(v) {
    var w = norm(v).split(/\s+/).filter(function (x) { return x.length > 2; });
    if (!w.length) return start();
    var R = Q.map(function (q, i) { var h = norm(q[1] + " " + q[2] + " " + q[3]), s = 0; w.forEach(function (x) { if (h.indexOf(x) >= 0) s += norm(q[1] + " " + q[3]).indexOf(x) >= 0 ? 3 : 1; }); return [i, s]; })
      .filter(function (x) { return x[1] > 0; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5);
    bd.innerHTML = "";
    if (!R.length) { bot('No encuentro una respuesta para eso. Escríbenos a <a href="mailto:' + MAIL + '?subject=Duda%20Kosmara">' + MAIL + "</a> y te contestamos."); topics(); return; }
    bot("Esto es lo que he encontrado:"); ops(R.map(function (x) { return ["q:" + x[0], Q[x[0]][1]]; }), "q");
  }
  function open() { pn.hidden = false; btn.setAttribute("aria-expanded", "true"); if (!bd.childNodes.length) start(); }
  function close() { pn.hidden = true; btn.setAttribute("aria-expanded", "false"); }
  btn.addEventListener("click", function () { if (pn.hidden) open(); else close(); });
  pn.addEventListener("click", function (e) {
    var b = e.target.closest("[data-h]"); if (!b) return; var h = b.getAttribute("data-h");
    if (h === "x") return close(); if (h === "m") { inp.value = ""; return start(); }
    if (h.indexOf("t:") === 0) return topic(h.slice(2)); if (h.indexOf("q:") === 0) return answer(+h.slice(2));
  });
  var tm = null; inp.addEventListener("input", function () { clearTimeout(tm); tm = setTimeout(function () { search(inp.value); }, 250); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !pn.hidden) { close(); btn.focus(); } });
  /* Se oculta mientras hay una ventana abierta (formularios de depósito, wallets…), para no tapar botones */
  setInterval(function () { var m = document.querySelector(".m:not([hidden]),#sheet:not([hidden]),.kzc"); btn.style.display = m ? "none" : ""; if (m && !pn.hidden) close(); }, 600);
})();
