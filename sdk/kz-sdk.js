var fE = 323e4, RE = 32300001, kE = 3230002, ME = 3230004, KB = 8078012;
function JC(A) {
  return Array.isArray(A) ? "%5B" + A.map(JC).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function GE([A, I]) {
  return `${A}=${JC(I)}`;
}
function FE(A) {
  const I = Object.entries(A).map(GE).join("&");
  return btoa(I);
}
function UE(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${FE(I)}'`), `${g}\``;
  }
}
var aI = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = UE(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function mE(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function JE(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(mE(I, A));
      return A.write(I, g, 0), g;
    }
  });
}
var OB = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", pE = () => JE({
  getSizeFromValue: (A) => {
    try {
      return atob(A).length;
    } catch {
      throw new aI(KB, {
        alphabet: OB,
        base: 64,
        value: A
      });
    }
  },
  write(A, I, g) {
    try {
      const B = atob(A).split("").map((C) => C.charCodeAt(0));
      return I.set(B, g), B.length + g;
    } catch {
      throw new aI(KB, {
        alphabet: OB,
        base: 64,
        value: A
      });
    }
  }
}), YE = 128;
function OA(A, I) {
  try {
    return "exists" in A && !A.exists ? A : Object.freeze({ ...A, data: I.decode(A.data) });
  } catch {
    throw new aI(kE, {
      address: A.address
    });
  }
}
function LE(A) {
  return !("exists" in A) || "exists" in A && A.exists;
}
function bE(A) {
  const I = A.filter((g) => LE(g) && g.data instanceof Uint8Array);
  if (I.length > 0) {
    const g = I.map((B) => B.address);
    throw new aI(ME, {
      addresses: g
    });
  }
}
function BB(A, I) {
  if (!I) return Object.freeze({ address: A, exists: !1 });
  const g = pE().encode(I.data[0]);
  return Object.freeze({ ...pC(I), address: A, data: g, exists: !0 });
}
function KE(A, I) {
  if (!I) return Object.freeze({ address: A, exists: !1 });
  const g = I.data.parsed.info || {};
  return (I.data.program || I.data.parsed.type) && (g.parsedAccountMeta = {
    program: I.data.program,
    type: I.data.parsed.type
  }), Object.freeze({ ...pC(I), address: A, data: g, exists: !0 });
}
function pC(A) {
  return Object.freeze({
    executable: A.executable,
    lamports: A.lamports,
    programAddress: A.owner,
    space: A.space
  });
}
async function CB(A, I, g = {}) {
  const { abortSignal: B, ...C } = g, Q = await A.getAccountInfo(I, { ...C, encoding: "base64" }).send({ abortSignal: B });
  return BB(I, Q.value);
}
async function lI(A, I, g = {}) {
  const { abortSignal: B, ...C } = g;
  return (await A.getMultipleAccounts(I, { ...C, encoding: "base64" }).send({ abortSignal: B })).value.map((E, e) => BB(I[e], E));
}
async function OE(A, I, g = {}) {
  const { abortSignal: B, ...C } = g;
  return (await A.getMultipleAccounts(I, { ...C, encoding: "jsonParsed" }).send({ abortSignal: B })).value.map((E, e) => E && typeof E == "object" && "parsed" in E.data ? KE(I[e], E) : BB(I[e], E));
}
function og(A) {
  if (!A.exists)
    throw new aI(fE, { address: A.address });
}
function VI(A) {
  const I = A.filter((g) => !g.exists);
  if (I.length > 0) {
    const g = I.map((B) => B.address);
    throw new aI(RE, { addresses: g });
  }
}
var TE = 6, HE = 28e5, xE = 2800001, qE = 2800006, VE = 2800007, YC = 2800008, _E = 2800009, ZE = 361e4, WE = 3610001, jE = 5663016, zE = 8078001, PE = 8078004, vE = 8078005, XE = 8078006, $E = 8078011, Ae = 8078012;
function LC(A) {
  return Array.isArray(A) ? "%5B" + A.map(LC).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function Ie([A, I]) {
  return `${A}=${LC(I)}`;
}
function ge(A) {
  const I = Object.entries(A).map(Ie).join("&");
  return btoa(I);
}
function Be(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${ge(I)}'`), `${g}\``;
  }
}
function Ce(A, I) {
  return A instanceof Error && A.name === "SolanaError" ? A.context.__code === I : !1;
}
var IA = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = Be(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function Qe(A, I) {
  if (A.length >= I) return A;
  const g = new Uint8Array(I).fill(0);
  return g.set(A), g;
}
var Ee = (A, I) => Qe(A.length <= I ? A : A.slice(0, I), I);
function ee(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function rg(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(ee(I, A));
      return A.write(I, g, 0), g;
    }
  });
}
function bC(A) {
  return Object.freeze({
    ...A,
    decode: (I, g = 0) => A.read(I, g)[0]
  });
}
function WA(A) {
  return "fixedSize" in A && typeof A.fixedSize == "number";
}
function ie(A) {
  return !WA(A);
}
function te(A, I) {
  if (WA(A) !== WA(I))
    throw new IA(PE);
  if (WA(A) && WA(I) && A.fixedSize !== I.fixedSize)
    throw new IA(vE, {
      decoderFixedSize: I.fixedSize,
      encoderFixedSize: A.fixedSize
    });
  if (!WA(A) && !WA(I) && A.maxSize !== I.maxSize)
    throw new IA(XE, {
      decoderMaxSize: I.maxSize,
      encoderMaxSize: A.maxSize
    });
  return {
    ...I,
    ...A,
    decode: I.decode,
    encode: A.encode,
    read: I.read,
    write: A.write
  };
}
function ne(A, I, g, B = 0) {
  const C = g.length - B;
  if (C < I)
    throw new IA(zE, {
      bytesLength: C,
      codecDescription: A,
      expected: I
    });
}
function KC(A, I) {
  return rg({
    fixedSize: I,
    write: (g, B, C) => {
      const Q = A.encode(g), E = Q.length > I ? Q.slice(0, I) : Q;
      return B.set(E, C), C + I;
    }
  });
}
function oe(A, I) {
  return bC({
    fixedSize: I,
    read: (g, B) => {
      ne("fixCodecSize", I, g, B), (B > 0 || g.length > I) && (g = g.slice(B, B + I)), WA(A) && (g = Ee(g, A.fixedSize));
      const [C] = A.read(g, 0);
      return [C, B + I];
    }
  });
}
function OC(A, I) {
  return rg({
    ...ie(A) ? { ...A, getSizeFromValue: (g) => A.getSizeFromValue(I(g)) } : A,
    write: (g, B, C) => A.write(I(g), B, C)
  });
}
function re(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new IA(Ae, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var ae = (A) => rg({
  getSizeFromValue: (I) => {
    const [g, B] = TB(I, A[0]);
    if (!B) return I.length;
    const C = HB(B, A);
    return g.length + Math.ceil(C.toString(16).length / 2);
  },
  write(I, g, B) {
    if (re(A, I), I === "") return B;
    const [C, Q] = TB(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(C.length).fill(0), B), B + C.length;
    let E = HB(Q, A);
    const e = [];
    for (; E > 0n; )
      e.unshift(Number(E % 256n)), E /= 256n;
    const i = [...Array(C.length).fill(0), ...e];
    return g.set(i, B), B + i.length;
  }
}), se = (A) => bC({
  read(I, g) {
    const B = g === 0 ? I : I.slice(g);
    if (B.length === 0) return ["", 0];
    let C = B.findIndex((i) => i !== 0);
    C = C === -1 ? B.length : C;
    const Q = A[0].repeat(C);
    if (C === B.length) return [Q, I.length];
    const E = B.slice(C).reduce((i, t) => i * 256n + BigInt(t), 0n), e = ce(E, A);
    return [Q + e, I.length];
  }
});
function TB(A, I) {
  const [g, B] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, B];
}
function HB(A, I) {
  const g = BigInt(I.length);
  let B = 0n;
  for (const C of A)
    B *= g, B += BigInt(I.indexOf(C));
  return B;
}
function ce(A, I) {
  const g = BigInt(I.length), B = [];
  for (; A > 0n; )
    B.unshift(I[Number(A % g)]), A /= g;
  return B.join("");
}
var TC = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", De = () => ae(TC), we = () => se(TC);
function ue() {
  if (!globalThis.isSecureContext)
    throw new IA(ZE);
}
function le() {
  if (ue(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.digest != "function")
    throw new IA(WE);
}
var kg, Mg;
function HC() {
  return kg || (kg = De()), kg;
}
function de() {
  return Mg || (Mg = we()), Mg;
}
function he(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    throw new IA(xE, {
      actualLength: A.length
    });
  const B = HC().encode(A).byteLength;
  if (B !== 32)
    throw new IA(HE, {
      actualLength: B
    });
}
function u(A) {
  return he(A), A;
}
function CA() {
  return OC(
    KC(HC(), 32),
    (A) => u(A)
  );
}
function y() {
  return oe(de(), 32);
}
function ye() {
  return te(CA(), y());
}
var Ne = 37095705934669439343138083508754565189542113879843219016388785533085940283555n, BA = 57896044618658097711785492504343953926634992332820282019728792003956564819949n, xB = 19681161376707505956807079304988542015446066515923890162744021073123829784752n;
function rA(A) {
  const I = A % BA;
  return I >= 0n ? I : BA + I;
}
function kA(A, I) {
  let g = A;
  for (; I-- > 0n; )
    g *= g, g %= BA;
  return g;
}
function Se(A) {
  const g = A * A % BA * A % BA, B = kA(g, 2n) * g % BA, C = kA(B, 1n) * A % BA, Q = kA(C, 5n) * C % BA, E = kA(Q, 10n) * Q % BA, e = kA(E, 20n) * E % BA, i = kA(e, 40n) * e % BA, t = kA(i, 80n) * i % BA, n = kA(t, 80n) * i % BA, a = kA(n, 10n) * Q % BA;
  return kA(a, 2n) * A % BA;
}
function fe(A, I) {
  const g = rA(I * I * I), B = rA(g * g * I), C = Se(A * B);
  let Q = rA(A * g * C);
  const E = rA(I * Q * Q), e = Q, i = rA(Q * xB), t = E === A, n = E === rA(-A), a = E === rA(-A * xB);
  return t && (Q = e), (n || a) && (Q = i), (rA(Q) & 1n) === 1n && (Q = rA(-Q)), !t && !n ? null : Q;
}
function Re(A, I) {
  const g = rA(A * A), B = rA(g - 1n), C = rA(Ne * g + 1n), Q = fe(B, C);
  if (Q === null)
    return !1;
  const E = (I & 128) !== 0;
  return !(Q === 0n && E);
}
function ke(A) {
  const I = A.toString(16);
  return I.length === 1 ? `0${I}` : I;
}
function Me(A) {
  const g = `0x${A.reduce((B, C, Q) => `${ke(Q === 31 ? C & -129 : C)}${B}`, "")}`;
  return BigInt(g);
}
function Ge(A) {
  if (A.byteLength !== 32)
    return !1;
  const I = Me(A);
  return Re(I, A[31]);
}
var qB = 32, VB = 16, Fe = [
  // The string 'ProgramDerivedAddress'
  80,
  114,
  111,
  103,
  114,
  97,
  109,
  68,
  101,
  114,
  105,
  118,
  101,
  100,
  65,
  100,
  100,
  114,
  101,
  115,
  115
];
async function Ue({ programAddress: A, seeds: I }) {
  if (le(), I.length > VB)
    throw new IA(qE, {
      actual: I.length,
      maxSeeds: VB
    });
  let g;
  const B = I.reduce((i, t, n) => {
    const a = typeof t == "string" ? (g ||= new TextEncoder()).encode(t) : t;
    if (a.byteLength > qB)
      throw new IA(VE, {
        actual: a.byteLength,
        index: n,
        maxSeedLength: qB
      });
    return i.push(...a), i;
  }, []), C = ye(), Q = C.encode(A), E = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array([...B, ...Q, ...Fe])
  ), e = new Uint8Array(E);
  if (Ge(e))
    throw new IA(YC);
  return C.decode(e);
}
async function dI({
  programAddress: A,
  seeds: I
}) {
  let g = 255;
  for (; g > 0; )
    try {
      return [await Ue({
        programAddress: A,
        seeds: [...I, new Uint8Array([g])]
      }), g];
    } catch (B) {
      if (Ce(B, YC))
        g--;
      else
        throw B;
    }
  throw new IA(_E);
}
var me = 8078e3, Je = 8078001, pe = 8078011, _B = 8078012, ZB = 8078013, Ye = 8078014;
function xC(A) {
  return Array.isArray(A) ? "%5B" + A.map(xC).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function Le([A, I]) {
  return `${A}=${xC(I)}`;
}
function be(A) {
  const I = Object.entries(A).map(Le).join("&");
  return btoa(I);
}
function Ke(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${be(I)}'`), `${g}\``;
  }
}
var jA = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = Ke(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function Oe(A, I) {
  if (A.length >= I) return A;
  const g = new Uint8Array(I).fill(0);
  return g.set(A), g;
}
var Te = (A, I) => Oe(A.length <= I ? A : A.slice(0, I), I);
function qg(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function FA(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(qg(I, A));
      return A.write(I, g, 0), g;
    }
  });
}
function bI(A) {
  return Object.freeze({
    ...A,
    decode: (I, g = 0) => A.read(I, g)[0]
  });
}
function uA(A) {
  return "fixedSize" in A && typeof A.fixedSize == "number";
}
function He(A) {
  return !uA(A);
}
function xe(A, I, g = 0) {
  if (I.length - g <= 0)
    throw new jA(me, {
      codecDescription: A
    });
}
function QB(A, I, g, B = 0) {
  const C = g.length - B;
  if (C < I)
    throw new jA(Je, {
      bytesLength: C,
      codecDescription: A,
      expected: I
    });
}
function WB(A, I, g) {
  if (I < 0 || I > g)
    throw new jA(Ye, {
      bytesLength: g,
      codecDescription: A,
      offset: I
    });
}
function qe(A, I) {
  const g = (E, e, i) => {
    const t = A.encode(E);
    return i = I.write(t.length, e, i), e.set(t, i), i + t.length;
  };
  if (uA(I) && uA(A))
    return FA({ ...A, fixedSize: I.fixedSize + A.fixedSize, write: g });
  const B = uA(I) ? I.fixedSize : I.maxSize ?? null, C = uA(A) ? A.fixedSize : A.maxSize ?? null, Q = B !== null && C !== null ? B + C : null;
  return FA({
    ...A,
    ...Q !== null ? { maxSize: Q } : {},
    getSizeFromValue: (E) => {
      const e = qg(E, A);
      return qg(e, I) + e;
    },
    write: g
  });
}
function J(A, I) {
  const g = (E, e) => {
    const [i, t] = I.read(E, e), n = Number(i);
    return e = t, (e > 0 || E.length > n) && (E = E.slice(e, e + n)), QB("addDecoderSizePrefix", n, E), [A.decode(E), e + n];
  };
  if (uA(I) && uA(A))
    return bI({ ...A, fixedSize: I.fixedSize + A.fixedSize, read: g });
  const B = uA(I) ? I.fixedSize : I.maxSize ?? null, C = uA(A) ? A.fixedSize : A.maxSize ?? null, Q = B !== null && C !== null ? B + C : null;
  return bI({ ...A, ...Q !== null ? { maxSize: Q } : {}, read: g });
}
function Ve(A, I, g) {
  const B = A.byteOffset + (I ?? 0), C = g ?? A.byteLength;
  let Q;
  return typeof SharedArrayBuffer > "u" ? Q = A.buffer : A.buffer instanceof SharedArrayBuffer ? (Q = new ArrayBuffer(A.length), new Uint8Array(Q).set(new Uint8Array(A))) : Q = A.buffer, (B === 0 || B === -A.byteLength) && C === A.byteLength ? Q : Q.slice(B, B + C);
}
function TA(A, I) {
  return FA({
    fixedSize: I,
    write: (g, B, C) => {
      const Q = A.encode(g), E = Q.length > I ? Q.slice(0, I) : Q;
      return B.set(E, C), C + I;
    }
  });
}
function dA(A, I) {
  return bI({
    fixedSize: I,
    read: (g, B) => {
      QB("fixCodecSize", I, g, B), (B > 0 || g.length > I) && (g = g.slice(B, B + I)), uA(A) && (g = Te(g, A.fixedSize));
      const [C] = A.read(g, 0);
      return [C, B + I];
    }
  });
}
function _e(A, I) {
  return FA({
    ...A,
    write: (g, B, C) => {
      const Q = (t) => Ze(t, B.length), E = I.preOffset ? I.preOffset({ bytes: B, preOffset: C, wrapBytes: Q }) : C;
      WB("offsetEncoder", E, B.length);
      const e = A.write(g, B, E), i = I.postOffset ? I.postOffset({ bytes: B, newPreOffset: E, postOffset: e, preOffset: C, wrapBytes: Q }) : e;
      return WB("offsetEncoder", i, B.length), i;
    }
  });
}
function Ze(A, I) {
  return I === 0 ? 0 : (A % I + I) % I;
}
function We(A, I) {
  if (uA(A)) {
    const g = I(A.fixedSize);
    if (g < 0)
      throw new jA(ZB, {
        bytesLength: g,
        codecDescription: "resizeEncoder"
      });
    return FA({ ...A, fixedSize: g });
  }
  return FA({
    ...A,
    getSizeFromValue: (g) => {
      const B = I(A.getSizeFromValue(g));
      if (B < 0)
        throw new jA(ZB, {
          bytesLength: B,
          codecDescription: "resizeEncoder"
        });
      return B;
    }
  });
}
function je(A, I) {
  return _e(
    We(A, (g) => g + I),
    { preOffset: ({ preOffset: g }) => g + I }
  );
}
function v(A, I) {
  return FA({
    ...He(A) ? { ...A, getSizeFromValue: (g) => A.getSizeFromValue(I(g)) } : A,
    write: (g, B, C) => A.write(I(g), B, C)
  });
}
var ze = 8078e3, Pe = 8078001, ve = 8078007, Xe = 8078008, $e = 8078009, Ai = 8078010, Ii = 8078011, gi = 8078017, Bi = 8078018, qC = 8078022;
function VC(A) {
  return Array.isArray(A) ? "%5B" + A.map(VC).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function Ci([A, I]) {
  return `${A}=${VC(I)}`;
}
function Qi(A) {
  const I = Object.entries(A).map(Ci).join("&");
  return btoa(I);
}
function Ei(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${Qi(I)}'`), `${g}\``;
  }
}
var yA = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = Ei(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function ei(A, I, g) {
  const B = g === 0 && A.length === I.length ? A : A.slice(g, g + I.length);
  return ii(B, I);
}
function ii(A, I) {
  return A.length === I.length && A.every((g, B) => g === I[B]);
}
function sI(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function UA(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(sI(I, A));
      return A.write(I, g, 0), g;
    }
  });
}
function NA(A) {
  return Object.freeze({
    ...A,
    decode: (I, g = 0) => A.read(I, g)[0]
  });
}
function KI(A) {
  return "fixedSize" in A && typeof A.fixedSize == "number";
}
function ti(A) {
  return !KI(A);
}
function ni(A, I, g = 0) {
  if (I.length - g <= 0)
    throw new yA(ze, {
      codecDescription: A
    });
}
function oi(A, I, g, B = 0) {
  const C = g.length - B;
  if (C < I)
    throw new yA(Pe, {
      bytesLength: C,
      codecDescription: A,
      expected: I
    });
}
function ri(A, I, g) {
  const B = A.byteOffset + (I ?? 0), C = g ?? A.byteLength;
  let Q;
  return typeof SharedArrayBuffer > "u" ? Q = A.buffer : A.buffer instanceof SharedArrayBuffer ? (Q = new ArrayBuffer(A.length), new Uint8Array(Q).set(new Uint8Array(A))) : Q = A.buffer, (B === 0 || B === -A.byteLength) && C === A.byteLength ? Q : Q.slice(B, B + C);
}
function EB(A, I) {
  return UA({
    ...ti(A) ? { ...A, getSizeFromValue: (g) => A.getSizeFromValue(I(g)) } : A,
    write: (g, B, C) => A.write(I(g), B, C)
  });
}
function _I(A, I) {
  return NA({
    ...A,
    read: (g, B) => {
      const [C, Q] = A.read(g, B);
      return [I(C, g, B), Q];
    }
  });
}
function ai(A, I, g, B) {
  if (B < I || B > g)
    throw new yA(Ii, {
      codecDescription: A,
      max: g,
      min: I,
      value: B
    });
}
function _C(A) {
  return A?.endian !== 1;
}
function ZC(A) {
  return UA({
    fixedSize: A.size,
    write(I, g, B) {
      A.range && ai(A.name, A.range[0], A.range[1], I);
      const C = new ArrayBuffer(A.size);
      return A.set(new DataView(C), I, _C(A.config)), g.set(new Uint8Array(C), B), B + A.size;
    }
  });
}
function WC(A) {
  return NA({
    fixedSize: A.size,
    read(I, g = 0) {
      ni(A.name, I, g), oi(A.name, A.size, I, g);
      const B = new DataView(ri(I, g, A.size));
      return [A.get(B, _C(A.config)), g + A.size];
    }
  });
}
var si = (A = {}) => ZC({
  config: A,
  name: "u32",
  range: [0, +"0xffffffff"],
  set: (I, g, B) => I.setUint32(0, Number(g), B),
  size: 4
}), ci = (A = {}) => WC({
  config: A,
  get: (I, g) => I.getUint32(0, g),
  name: "u32",
  size: 4
}), eB = () => ZC({
  name: "u8",
  range: [0, +"0xff"],
  set: (A, I) => A.setUint8(0, Number(I)),
  size: 1
}), iB = () => WC({
  get: (A) => A.getUint8(0),
  name: "u8",
  size: 1
});
function jC(A, I, g) {
  if (I !== g)
    throw new yA(ve, {
      actual: g,
      codecDescription: A,
      expected: I
    });
}
function Di(A) {
  return A.reduce(
    (I, g) => I === null || g === null ? null : Math.max(I, g),
    0
  );
}
function zA(A) {
  return A.reduce((I, g) => I === null || g === null ? null : I + g, 0);
}
function hI(A) {
  return KI(A) ? A.fixedSize : null;
}
function eI(A) {
  return KI(A) ? A.fixedSize : A.maxSize ?? null;
}
function QI(A, I = {}) {
  const g = I.size ?? si(), B = Cg(g, hI(A)), C = Cg(g, eI(A)) ?? void 0;
  return UA({
    ...B !== null ? { fixedSize: B } : {
      getSizeFromValue: (Q) => (typeof g == "object" ? sI(Q.length, g) : 0) + [...Q].reduce((e, i) => e + sI(i, A), 0),
      maxSize: C
    },
    write: (Q, E, e) => (typeof g == "number" && jC("array", g, Q.length), typeof g == "object" && (e = g.write(Q.length, E, e)), Q.forEach((i) => {
      e = A.write(i, E, e);
    }), e)
  });
}
function vA(A, I = {}) {
  const g = I.size ?? ci(), B = hI(A), C = Cg(g, B), Q = Cg(g, eI(A)) ?? void 0;
  return NA({
    ...C !== null ? { fixedSize: C } : { maxSize: Q },
    read: (E, e) => {
      const i = [];
      if (typeof g == "object" && E.slice(e).length === 0)
        return [i, e];
      if (g === "remainder") {
        for (; e < E.length; ) {
          const [a, o] = A.read(E, e);
          e = o, i.push(a);
        }
        return [i, e];
      }
      const [t, n] = typeof g == "number" ? [g, e] : g.read(E, e);
      e = n;
      for (let a = 0; a < t; a += 1) {
        const [o, c] = A.read(E, e);
        e = c, i.push(o);
      }
      return [i, e];
    }
  });
}
function Cg(A, I) {
  return typeof A != "number" ? null : A === 0 ? 0 : I === null ? null : I * A;
}
function tB(A = {}) {
  return EB(A.size ?? eB(), (I) => I ? 1 : 0);
}
function iA(A = {}) {
  return _I(A.size ?? iB(), (I) => Number(I) === 1);
}
function cA() {
  return UA({
    getSizeFromValue: (A) => A.length,
    write: (A, I, g) => (I.set(A, g), g + A.length)
  });
}
function hA() {
  return NA({
    read: (A, I) => {
      const g = A.slice(I);
      return [g, I + g.length];
    }
  });
}
var wi = () => NA({
  read(A, I) {
    return [A.slice(I).reduce((B, C) => B + C.toString(16).padStart(2, "0"), ""), A.length];
  }
});
function zC(A) {
  return UA({
    fixedSize: A.length,
    write: (I, g, B) => (g.set(A, B), B + A.length)
  });
}
function PC(A) {
  return NA({
    fixedSize: A.length,
    read: (I, g) => {
      const B = wi();
      if (!ei(I, A, g))
        throw new yA(Bi, {
          constant: A,
          data: I,
          hexConstant: B.decode(A),
          hexData: B.decode(I),
          offset: g
        });
      return [void 0, g + A.length];
    }
  });
}
function Vg(A) {
  const I = zA(A.map(hI)), g = zA(A.map(eI)) ?? void 0;
  return UA({
    ...I === null ? {
      getSizeFromValue: (B) => A.map((C, Q) => sI(B[Q], C)).reduce((C, Q) => C + Q, 0),
      maxSize: g
    } : { fixedSize: I },
    write: (B, C, Q) => (jC("tuple", A.length, B.length), A.forEach((E, e) => {
      Q = E.write(B[e], C, Q);
    }), Q)
  });
}
function cI(A) {
  const I = zA(A.map(hI)), g = zA(A.map(eI)) ?? void 0;
  return NA({
    ...I === null ? { maxSize: g } : { fixedSize: I },
    read: (B, C) => {
      const Q = [];
      return A.forEach((E) => {
        const [e, i] = E.read(B, C);
        Q.push(e), C = i;
      }), [Q, C];
    }
  });
}
function nB(A, I) {
  const g = XC(A), B = (Q, E, e) => {
    const i = I(Q);
    return _g(A, i), A[i].write(Q, E, e);
  };
  if (g !== null)
    return UA({ fixedSize: g, write: B });
  const C = $C(A);
  return UA({
    ...C !== null ? { maxSize: C } : {},
    getSizeFromValue: (Q) => {
      const E = I(Q);
      return _g(A, E), sI(Q, A[E]);
    },
    write: B
  });
}
function vC(A, I) {
  const g = XC(A), B = (Q, E) => {
    const e = I(Q, E);
    return _g(A, e), A[e].read(Q, E);
  };
  if (g !== null)
    return NA({ fixedSize: g, read: B });
  const C = $C(A);
  return NA({ ...C !== null ? { maxSize: C } : {}, read: B });
}
function _g(A, I) {
  if (typeof A[I] > "u")
    throw new yA(gi, {
      maxRange: A.length - 1,
      minRange: 0,
      variant: I
    });
}
function XC(A) {
  if (A.length === 0) return 0;
  if (!KI(A[0])) return null;
  const I = A[0].fixedSize;
  return A.every((B) => KI(B) && B.fixedSize === I) ? I : null;
}
function $C(A) {
  return Di(A.map((I) => eI(I)));
}
function ui(A, I = {}) {
  const g = I.discriminator ?? "__kind", B = I.size ?? eB();
  return nB(
    A.map(
      ([, C], Q) => EB(Vg([B, C]), (E) => [Q, E])
    ),
    (C) => li(A, C[g])
  );
}
function AQ(A, I = {}) {
  const g = I.discriminator ?? "__kind", B = I.size ?? iB();
  return vC(
    A.map(
      ([C, Q]) => _I(cI([B, Q]), ([, E]) => ({
        [g]: C,
        ...E
      }))
    ),
    (C, Q) => Number(B.read(C, Q)[0])
  );
}
function li(A, I) {
  const g = A.findIndex(([B]) => I === B);
  if (g < 0)
    throw new yA($e, {
      value: I,
      variants: A.map(([B]) => B)
    });
  return g;
}
function IQ(A) {
  const I = [...new Set(Object.values(A).filter((E) => typeof E == "number"))].sort(), g = Object.fromEntries(Object.entries(A).slice(I.length)), B = Object.keys(g), C = Object.values(g), Q = [
    .../* @__PURE__ */ new Set([...B, ...C.filter((E) => typeof E == "string")])
  ];
  return { enumKeys: B, enumRecord: g, enumValues: C, numericalValues: I, stringValues: Q };
}
function di({
  enumKeys: A,
  enumValues: I,
  variant: g
}) {
  const B = gQ(I, (C) => C === g);
  return B >= 0 ? B : A.findIndex((C) => C === g);
}
function hi({
  discriminator: A,
  enumKeys: I,
  enumValues: g,
  useValuesAsDiscriminators: B
}) {
  return B ? gQ(g, (C) => C === A) : A >= 0 && A < I.length ? A : -1;
}
function gQ(A, I) {
  let g = A.length;
  for (; g--; )
    if (I(A[g], g, A)) return g;
  return -1;
}
function BQ(A) {
  if (A.length === 0) return "";
  let I = [A[0], A[0]];
  const g = [];
  for (let B = 1; B < A.length; B++) {
    const C = A[B];
    I[1] + 1 === C ? I[1] = C : (g.push(I[0] === I[1] ? `${I[0]}` : `${I[0]}-${I[1]}`), I = [C, C]);
  }
  return g.push(I[0] === I[1] ? `${I[0]}` : `${I[0]}-${I[1]}`), g.join(", ");
}
function yi(A, I = {}) {
  const g = I.size ?? eB(), B = I.useValuesAsDiscriminators ?? !1, { enumKeys: C, enumValues: Q, numericalValues: E, stringValues: e } = IQ(A);
  if (B && Q.some((i) => typeof i == "string"))
    throw new yA(qC, {
      stringValues: Q.filter((i) => typeof i == "string")
    });
  return EB(g, (i) => {
    const t = di({ enumKeys: C, enumValues: Q, variant: i });
    if (t < 0)
      throw new yA(Ai, {
        formattedNumericalValues: BQ(E),
        numericalValues: E,
        stringValues: e,
        variant: i
      });
    return B ? Q[t] : t;
  });
}
function CQ(A, I = {}) {
  const g = I.size ?? iB(), B = I.useValuesAsDiscriminators ?? !1, { enumKeys: C, enumValues: Q, numericalValues: E } = IQ(A);
  if (B && Q.some((e) => typeof e == "string"))
    throw new yA(qC, {
      stringValues: Q.filter((e) => typeof e == "string")
    });
  return _I(g, (e) => {
    const i = Number(e), t = hi({
      discriminator: i,
      enumKeys: C,
      enumValues: Q,
      useValuesAsDiscriminators: B
    });
    if (t < 0) {
      const n = B ? E : [...Array(C.length).keys()];
      throw new yA(Xe, {
        discriminator: i,
        formattedValidDiscriminators: BQ(n),
        validDiscriminators: n
      });
    }
    return Q[t];
  });
}
function Ni(A, I) {
  return _I(
    cI([...I, A]),
    (g) => g[g.length - 1]
  );
}
function Si(A, I, g = {}) {
  return _I(
    vA(cI([A, I]), g),
    (B) => new Map(B)
  );
}
function Gg() {
  return UA({
    fixedSize: 0,
    write: (A, I, g) => g
  });
}
function gI() {
  return NA({
    fixedSize: 0,
    read: (A, I) => [void 0, I]
  });
}
function O(A) {
  const I = A.map(([, C]) => C), g = zA(I.map(hI)), B = zA(I.map(eI)) ?? void 0;
  return UA({
    ...g === null ? {
      getSizeFromValue: (C) => A.map(([Q, E]) => sI(C[Q], E)).reduce((Q, E) => Q + E, 0),
      maxSize: B
    } : { fixedSize: g },
    write: (C, Q, E) => (A.forEach(([e, i]) => {
      E = i.write(C[e], Q, E);
    }), E)
  });
}
function k(A) {
  const I = A.map(([, C]) => C), g = zA(I.map(hI)), B = zA(I.map(eI)) ?? void 0;
  return NA({
    ...g === null ? { maxSize: B } : { fixedSize: g },
    read: (C, Q) => {
      const E = {};
      return A.forEach(([e, i]) => {
        const [t, n] = i.read(C, Q);
        Q = n, E[e] = t;
      }), [E, Q];
    }
  });
}
function fi(A, I, g, B) {
  if (B < I || B > g)
    throw new jA(pe, {
      codecDescription: A,
      max: g,
      min: I,
      value: B
    });
}
function QQ(A) {
  return A?.endian !== 1;
}
function ZI(A) {
  return FA({
    fixedSize: A.size,
    write(I, g, B) {
      A.range && fi(A.name, A.range[0], A.range[1], I);
      const C = new ArrayBuffer(A.size);
      return A.set(new DataView(C), I, QQ(A.config)), g.set(new Uint8Array(C), B), B + A.size;
    }
  });
}
function HA(A) {
  return bI({
    fixedSize: A.size,
    read(I, g = 0) {
      xe(A.name, I, g), QB(A.name, A.size, I, g);
      const B = new DataView(Ve(I, g, A.size));
      return [A.get(B, QQ(A.config)), g + A.size];
    }
  });
}
var Zg = (A = {}) => HA({
  config: A,
  get: (I, g) => I.getFloat64(0, g),
  name: "f64",
  size: 8
}), EQ = (A = {}) => HA({
  config: A,
  get: (I, g) => {
    const B = g ? 8 : 0, C = g ? 0 : 8, Q = I.getBigInt64(B, g), E = I.getBigUint64(C, g);
    return (Q << 64n) + E;
  },
  name: "i128",
  size: 16
}), jB = (A = {}) => HA({
  config: A,
  get: (I, g) => I.getInt16(0, g),
  name: "i16",
  size: 2
}), Wg = (A = {}) => ZI({
  config: A,
  name: "i32",
  range: [-+"0x7fffffff" - 1, +"0x7fffffff"],
  set: (I, g, B) => I.setInt32(0, Number(g), B),
  size: 4
}), OI = (A = {}) => HA({
  config: A,
  get: (I, g) => I.getInt32(0, g),
  name: "i32",
  size: 4
}), jg = (A = {}) => ZI({
  config: A,
  name: "u128",
  range: [0n, BigInt("0xffffffffffffffffffffffffffffffff")],
  set: (I, g, B) => {
    const C = B ? 8 : 0, Q = B ? 0 : 8, E = 0xffffffffffffffffn;
    I.setBigUint64(C, BigInt(g) >> 64n, B), I.setBigUint64(Q, BigInt(g) & E, B);
  },
  size: 16
}), Z = (A = {}) => HA({
  config: A,
  get: (I, g) => {
    const B = g ? 8 : 0, C = g ? 0 : 8, Q = I.getBigUint64(B, g), E = I.getBigUint64(C, g);
    return (Q << 64n) + E;
  },
  name: "u128",
  size: 16
}), p = (A = {}) => HA({
  config: A,
  get: (I, g) => I.getUint16(0, g),
  name: "u16",
  size: 2
}), oB = (A = {}) => ZI({
  config: A,
  name: "u32",
  range: [0, +"0xffffffff"],
  set: (I, g, B) => I.setUint32(0, Number(g), B),
  size: 4
}), aA = (A = {}) => HA({
  config: A,
  get: (I, g) => I.getUint32(0, g),
  name: "u32",
  size: 4
}), MA = (A = {}) => ZI({
  config: A,
  name: "u64",
  range: [0n, BigInt("0xffffffffffffffff")],
  set: (I, g, B) => I.setBigUint64(0, BigInt(g), B),
  size: 8
}), L = (A = {}) => HA({
  config: A,
  get: (I, g) => I.getBigUint64(0, g),
  name: "u64",
  size: 8
}), XA = () => ZI({
  name: "u8",
  range: [0, +"0xff"],
  set: (A, I) => A.setUint8(0, Number(I)),
  size: 1
}), rB = () => HA({
  get: (A) => A.getUint8(0),
  name: "u8",
  size: 1
}), zB = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ri = () => FA({
  getSizeFromValue: (A) => {
    try {
      return atob(A).length;
    } catch {
      throw new jA(_B, {
        alphabet: zB,
        base: 64,
        value: A
      });
    }
  },
  write(A, I, g) {
    try {
      const B = atob(A).split("").map((C) => C.charCodeAt(0));
      return I.set(B, g), B.length + g;
    } catch {
      throw new jA(_B, {
        alphabet: zB,
        base: 64,
        value: A
      });
    }
  }
}), ki = (A) => (
  // eslint-disable-next-line no-control-regex
  A.replace(/\u0000/g, "")
), Mi = globalThis.TextDecoder, PB = globalThis.TextEncoder, Gi = () => {
  let A;
  return FA({
    getSizeFromValue: (I) => (A ||= new PB()).encode(I).length,
    write: (I, g, B) => {
      const C = (A ||= new PB()).encode(I);
      return g.set(C, B), B + C.length;
    }
  });
}, FI = () => {
  let A;
  return bI({
    read(I, g) {
      const B = (A ||= new Mi()).decode(I.slice(g));
      return [ki(B), I.length];
    }
  });
}, Fi = 8078e3, Ui = 8078001, mi = 8078002, Ji = 8078011;
function eQ(A) {
  return Array.isArray(A) ? "%5B" + A.map(eQ).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function pi([A, I]) {
  return `${A}=${eQ(I)}`;
}
function Yi(A) {
  const I = Object.entries(A).map(pi).join("&");
  return btoa(I);
}
function Li(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${Yi(I)}'`), `${g}\``;
  }
}
var ag = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = Li(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function bi(A, I) {
  if (A.length >= I) return A;
  const g = new Uint8Array(I).fill(0);
  return g.set(A), g;
}
var Ki = (A, I) => bi(A.length <= I ? A : A.slice(0, I), I);
function Oi(A, I, g) {
  const B = g === 0 && A.length === I.length ? A : A.slice(g, g + I.length);
  return Ti(B, I);
}
function Ti(A, I) {
  return A.length === I.length && A.every((g, B) => g === I[B]);
}
function Hi(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function aB(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(Hi(I, A));
      return A.write(I, g, 0), g;
    }
  });
}
function sB(A) {
  return Object.freeze({
    ...A,
    decode: (I, g = 0) => A.read(I, g)[0]
  });
}
function cB(A) {
  return "fixedSize" in A && typeof A.fixedSize == "number";
}
function iQ(A) {
  if (!cB(A))
    throw new ag(mi);
}
function xi(A) {
  return !cB(A);
}
function qi(A, I, g = 0) {
  if (I.length - g <= 0)
    throw new ag(Fi, {
      codecDescription: A
    });
}
function tQ(A, I, g, B = 0) {
  const C = g.length - B;
  if (C < I)
    throw new ag(Ui, {
      bytesLength: C,
      codecDescription: A,
      expected: I
    });
}
function Vi(A, I, g) {
  const B = A.byteOffset + (I ?? 0), C = g ?? A.byteLength;
  let Q;
  return typeof SharedArrayBuffer > "u" ? Q = A.buffer : A.buffer instanceof SharedArrayBuffer ? (Q = new ArrayBuffer(A.length), new Uint8Array(Q).set(new Uint8Array(A))) : Q = A.buffer, (B === 0 || B === -A.byteLength) && C === A.byteLength ? Q : Q.slice(B, B + C);
}
function _i(A, I) {
  return aB({
    fixedSize: I,
    write: (g, B, C) => {
      const Q = A.encode(g), E = Q.length > I ? Q.slice(0, I) : Q;
      return B.set(E, C), C + I;
    }
  });
}
function Zi(A, I) {
  return sB({
    fixedSize: I,
    read: (g, B) => {
      tQ("fixCodecSize", I, g, B), (B > 0 || g.length > I) && (g = g.slice(B, B + I)), cB(A) && (g = Ki(g, A.fixedSize));
      const [C] = A.read(g, 0);
      return [C, B + I];
    }
  });
}
function Fg(A, I) {
  return aB({
    ...xi(A) ? { ...A, getSizeFromValue: (g) => A.getSizeFromValue(I(g)) } : A,
    write: (g, B, C) => A.write(I(g), B, C)
  });
}
function Ug(A, I) {
  return sB({
    ...A,
    read: (g, B) => {
      const [C, Q] = A.read(g, B);
      return [I(C, g, B), Q];
    }
  });
}
function Wi(A, I, g, B) {
  if (B < I || B > g)
    throw new ag(Ji, {
      codecDescription: A,
      max: g,
      min: I,
      value: B
    });
}
function nQ(A) {
  return A?.endian !== 1;
}
function ji(A) {
  return aB({
    fixedSize: A.size,
    write(I, g, B) {
      A.range && Wi(A.name, A.range[0], A.range[1], I);
      const C = new ArrayBuffer(A.size);
      return A.set(new DataView(C), I, nQ(A.config)), g.set(new Uint8Array(C), B), B + A.size;
    }
  });
}
function zi(A) {
  return sB({
    fixedSize: A.size,
    read(I, g = 0) {
      qi(A.name, I, g), tQ(A.name, A.size, I, g);
      const B = new DataView(Vi(I, g, A.size));
      return [A.get(B, nQ(A.config)), g + A.size];
    }
  });
}
var Pi = () => ji({
  name: "u8",
  range: [0, +"0xff"],
  set: (A, I) => A.setUint8(0, Number(I)),
  size: 1
}), vi = () => zi({
  get: (A) => A.getUint8(0),
  name: "u8",
  size: 1
}), oQ = (A) => ({ __option: "Some", value: A }), rQ = () => ({ __option: "None" }), vB = (A) => !!(A && typeof A == "object" && "__option" in A && (A.__option === "Some" && "value" in A || A.__option === "None")), XB = (A) => A.__option === "Some", Xi = (A) => A !== null ? oQ(A) : rQ();
function sg(A, I = {}) {
  const g = I.prefix === null ? Fg(Gg(), (C) => {
  }) : tB({ size: I.prefix ?? Pi() }), B = I.noneValue === "zeroes" ? (iQ(A), _i(Gg(), A.fixedSize)) : I.noneValue ? zC(I.noneValue) : Gg();
  return nB(
    [
      Fg(Vg([g, B]), (C) => [
        !1,
        void 0
      ]),
      Fg(Vg([g, A]), (C) => [
        !0,
        vB(C) && XB(C) ? C.value : C
      ])
    ],
    (C) => {
      const Q = vB(C) ? C : Xi(C);
      return Number(XB(Q));
    }
  );
}
function V(A, I = {}) {
  const g = I.prefix === null ? Ug(gI(), () => !1) : iA({ size: I.prefix ?? vi() }), B = I.noneValue === "zeroes" ? (iQ(A), Zi(gI(), A.fixedSize)) : I.noneValue ? PC(I.noneValue) : gI();
  return vC(
    [
      Ug(cI([g, B]), () => rQ()),
      Ug(cI([g, A]), ([, C]) => oQ(C))
    ],
    (C, Q) => {
      if (I.prefix === null && !I.noneValue)
        return +(Q < C.length);
      if (I.prefix === null && I.noneValue != null) {
        const E = I.noneValue === "zeroes" ? new Uint8Array(B.fixedSize).fill(0) : I.noneValue;
        return Oi(C, E, Q) ? 0 : 1;
      }
      return Number(g.read(C, Q)[0]);
    }
  );
}
function WI(A, ...I) {
  return I.reduce((g, B) => B(g), A);
}
var f = /* @__PURE__ */ ((A) => (A[A.WRITABLE_SIGNER = /* 3 */
3] = "WRITABLE_SIGNER", A[A.READONLY_SIGNER = /* 2 */
2] = "READONLY_SIGNER", A[A.WRITABLE = /* 1 */
1] = "WRITABLE", A[A.READONLY = /* 0 */
0] = "READONLY", A))(f || {}), $i = 2;
function At(A) {
  return A >= 2;
}
function cg(A) {
  return A | $i;
}
var It = 8100003;
function aQ(A) {
  return Array.isArray(A) ? "%5B" + A.map(aQ).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function gt([A, I]) {
  return `${A}=${aQ(I)}`;
}
function Bt(A) {
  const I = Object.entries(A).map(gt).join("&");
  return btoa(I);
}
function Ct(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${Bt(I)}'`), `${g}\``;
  }
}
var Qt = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = Ct(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function Et(A) {
  return JSON.parse(et(A), (I, g) => ot(g) ? nt(g) : g);
}
function et(A) {
  const I = [];
  let g = !1;
  for (let B = 0; B < A.length; B++) {
    let C = !1;
    if (A[B] === "\\" && (I.push(A[B++]), C = !C), A[B] === '"') {
      I.push(A[B]), C || (g = !g);
      continue;
    }
    if (!g) {
      const Q = it(A, B);
      if (Q?.length) {
        B += Q.length - 1, Q.match(/\.|[eE]-/) ? I.push(Q) : I.push(tt(Q));
        continue;
      }
    }
    I.push(A[B]);
  }
  return I.join("");
}
function it(A, I) {
  const g = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;
  if (!A[I]?.match(/[-\d]/))
    return null;
  const B = A.slice(I).match(g);
  return B ? B[0] : null;
}
function tt(A) {
  return `{"$n":"${A}"}`;
}
function nt({ $n: A }) {
  if (A.match(/[eE]/)) {
    const [I, g] = A.split(/[eE]/);
    return BigInt(I) * BigInt(10) ** BigInt(g);
  }
  return BigInt(A);
}
function ot(A) {
  return !!A && typeof A == "object" && "$n" in A && typeof A.$n == "string";
}
var $B = 0n;
function rt() {
  const A = $B;
  return $B++, A.toString();
}
function at(A) {
  return {
    id: rt(),
    jsonrpc: "2.0",
    method: A.methodName,
    params: A.params
  };
}
function st(A, I) {
  return Dt(
    JSON.stringify(A, (g, B) => typeof B == "bigint" ? ct(B) : B, I)
  );
}
function ct(A) {
  return { $n: `${A}` };
}
function Dt(A) {
  return A.replace(/\{\s*"\$n"\s*:\s*"(-?\d+)"\s*\}/g, "$1");
}
function wt(A) {
  return ut(A);
}
function ut(A) {
  return new Proxy(A.api, {
    defineProperty() {
      return !1;
    },
    deleteProperty() {
      return !1;
    },
    get(I, g, B) {
      if (g !== "then")
        return function(...C) {
          const Q = g.toString(), E = Reflect.get(I, Q, B);
          if (!E)
            throw new Qt(It, {
              method: Q,
              params: C
            });
          const e = E(...C);
          return lt(A, e);
        };
    }
  });
}
function lt({ transport: A }, I) {
  return {
    async send(g) {
      return await I.execute({ signal: g?.abortSignal, transport: A });
    }
  };
}
function dt(A) {
  return new Proxy({}, {
    defineProperty() {
      return !1;
    },
    deleteProperty() {
      return !1;
    },
    get(...I) {
      const [g, B] = I, C = B.toString();
      return function(...Q) {
        const E = Object.freeze({ methodName: C, params: Q }), e = A?.requestTransformer ? A?.requestTransformer(E) : E;
        return Object.freeze({
          execute: async ({ signal: i, transport: t }) => {
            const n = at(e), a = await t({ payload: n, signal: i });
            return A?.responseTransformer ? A.responseTransformer(a, e) : a;
          }
        });
      };
    }
  });
}
function sQ(A) {
  return A == null || typeof A != "object" || Array.isArray(A) ? !1 : "jsonrpc" in A && A.jsonrpc === "2.0" && "method" in A && typeof A.method == "string" && "params" in A;
}
var ht = 10, yt = -32700, Nt = -32603, St = -32602, ft = -32601, Rt = -32600, kt = -32015, Mt = -32014, Gt = -32012, Ft = -32010, Ut = -32009, mt = -32007, Jt = -32006, pt = -32004, AC = -32002, Yt = -32001, Lt = 4615e3, bt = 4615026, Kt = 705e4, Ot = 7050030, Tt = 7050031, Ht = 7050035;
function cQ(A) {
  return Array.isArray(A) ? "%5B" + A.map(cQ).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function xt([A, I]) {
  return `${A}=${cQ(I)}`;
}
function qt(A) {
  const I = Object.entries(A).map(xt).join("&");
  return btoa(I);
}
function Vt(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${qt(I)}'`), `${g}\``;
  }
}
var Ag = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = Vt(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function DQ(...A) {
  "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(...A);
}
function wQ({ errorCodeBaseOffset: A, getErrorContext: I, orderedErrorNames: g, rpcEnumError: B }, C) {
  let Q, E;
  typeof B == "string" ? Q = B : (Q = Object.keys(B)[0], E = B[Q]);
  const e = g.indexOf(Q), i = A + e, t = I(i, Q, E), n = new Ag(i, t);
  return DQ(n, C), n;
}
var _t = [
  // Keep synced with RPC source: https://github.com/anza-xyz/solana-sdk/blob/master/instruction-error/src/lib.rs
  // If this list ever gets too large, consider implementing a compression strategy like this:
  // https://gist.github.com/steveluscher/aaa7cbbb5433b1197983908a40860c47
  "GenericError",
  "InvalidArgument",
  "InvalidInstructionData",
  "InvalidAccountData",
  "AccountDataTooSmall",
  "InsufficientFunds",
  "IncorrectProgramId",
  "MissingRequiredSignature",
  "AccountAlreadyInitialized",
  "UninitializedAccount",
  "UnbalancedInstruction",
  "ModifiedProgramId",
  "ExternalAccountLamportSpend",
  "ExternalAccountDataModified",
  "ReadonlyLamportChange",
  "ReadonlyDataModified",
  "DuplicateAccountIndex",
  "ExecutableModified",
  "RentEpochModified",
  "NotEnoughAccountKeys",
  "AccountDataSizeChanged",
  "AccountNotExecutable",
  "AccountBorrowFailed",
  "AccountBorrowOutstanding",
  "DuplicateAccountOutOfSync",
  "Custom",
  "InvalidError",
  "ExecutableDataModified",
  "ExecutableLamportChange",
  "ExecutableAccountNotRentExempt",
  "UnsupportedProgramId",
  "CallDepth",
  "MissingAccount",
  "ReentrancyNotAllowed",
  "MaxSeedLengthExceeded",
  "InvalidSeeds",
  "InvalidRealloc",
  "ComputationalBudgetExceeded",
  "PrivilegeEscalation",
  "ProgramEnvironmentSetupFailure",
  "ProgramFailedToComplete",
  "ProgramFailedToCompile",
  "Immutable",
  "IncorrectAuthority",
  "BorshIoError",
  "AccountNotRentExempt",
  "InvalidAccountOwner",
  "ArithmeticOverflow",
  "UnsupportedSysvar",
  "IllegalOwner",
  "MaxAccountsDataAllocationsExceeded",
  "MaxAccountsExceeded",
  "MaxInstructionTraceLengthExceeded",
  "BuiltinProgramsMustConsumeComputeUnits"
];
function uQ(A, I) {
  const g = Number(A);
  return wQ(
    {
      errorCodeBaseOffset: 4615001,
      getErrorContext(B, C, Q) {
        return B === Lt ? {
          errorName: C,
          index: g,
          ...Q !== void 0 ? { instructionErrorContext: Q } : null
        } : B === bt ? {
          code: Number(Q),
          index: g
        } : { index: g };
      },
      orderedErrorNames: _t,
      rpcEnumError: I
    },
    uQ
  );
}
var Zt = [
  // Keep synced with RPC source: https://github.com/anza-xyz/agave/blob/master/sdk/src/transaction/error.rs
  // If this list ever gets too large, consider implementing a compression strategy like this:
  // https://gist.github.com/steveluscher/aaa7cbbb5433b1197983908a40860c47
  "AccountInUse",
  "AccountLoadedTwice",
  "AccountNotFound",
  "ProgramAccountNotFound",
  "InsufficientFundsForFee",
  "InvalidAccountForFee",
  "AlreadyProcessed",
  "BlockhashNotFound",
  // `InstructionError` intentionally omitted; delegated to `getSolanaErrorFromInstructionError`
  "CallChainTooDeep",
  "MissingSignatureForFee",
  "InvalidAccountIndex",
  "SignatureFailure",
  "InvalidProgramForExecution",
  "SanitizeFailure",
  "ClusterMaintenance",
  "AccountBorrowOutstanding",
  "WouldExceedMaxBlockCostLimit",
  "UnsupportedVersion",
  "InvalidWritableAccount",
  "WouldExceedMaxAccountCostLimit",
  "WouldExceedAccountDataBlockLimit",
  "TooManyAccountLocks",
  "AddressLookupTableNotFound",
  "InvalidAddressLookupTableOwner",
  "InvalidAddressLookupTableData",
  "InvalidAddressLookupTableIndex",
  "InvalidRentPayingAccount",
  "WouldExceedMaxVoteCostLimit",
  "WouldExceedAccountDataTotalLimit",
  "DuplicateInstruction",
  "InsufficientFundsForRent",
  "MaxLoadedAccountsDataSizeExceeded",
  "InvalidLoadedAccountsDataSizeLimit",
  "ResanitizationNeeded",
  "ProgramExecutionTemporarilyRestricted",
  "UnbalancedTransaction"
];
function lQ(A) {
  return typeof A == "object" && "InstructionError" in A ? uQ(
    ...A.InstructionError
  ) : wQ(
    {
      errorCodeBaseOffset: 7050001,
      getErrorContext(I, g, B) {
        if (I === Kt)
          return {
            errorName: g,
            ...B !== void 0 ? { transactionErrorContext: B } : null
          };
        if (I === Ot)
          return {
            index: Number(B)
          };
        if (I === Tt || I === Ht)
          return {
            accountIndex: Number(B.account_index)
          };
      },
      orderedErrorNames: Zt,
      rpcEnumError: A
    },
    lQ
  );
}
function zg(A) {
  let I;
  if (Wt(A)) {
    const { code: g, data: B, message: C } = A, Q = Number(g);
    if (Q === AC) {
      const { err: E, ...e } = B, i = E ? { cause: lQ(E) } : null;
      I = new Ag(AC, {
        ...e,
        ...i
      });
    } else {
      let E;
      switch (Q) {
        case Nt:
        case St:
        case Rt:
        case ft:
        case yt:
        case Gt:
        case Yt:
        case pt:
        case Mt:
        case Ft:
        case Ut:
        case mt:
        case Jt:
        case kt:
          E = { __serverMessage: C };
          break;
        default:
          typeof B == "object" && !Array.isArray(B) && (E = B);
      }
      I = new Ag(Q, E);
    }
  } else {
    const g = typeof A == "object" && A !== null && "message" in A && typeof A.message == "string" ? A.message : "Malformed JSON-RPC error with no message attribute";
    I = new Ag(ht, { error: A, message: g });
  }
  return DQ(I, zg), I;
}
function Wt(A) {
  return typeof A == "object" && A !== null && "code" in A && "message" in A && (typeof A.code == "number" || typeof A.code == "bigint") && typeof A.message == "string";
}
function jt(A) {
  return typeof A == "bigint" ? (
    // FIXME(solana-labs/solana/issues/30341) Create a data type to represent u64 in the Solana
    // JSON RPC implementation so that we can throw away this entire patcher instead of unsafely
    // downcasting `bigints` to `numbers`.
    Number(A)
  ) : A;
}
var l = {};
function dQ(A) {
  return function I(g, B) {
    if (Array.isArray(g))
      return g.map((C, Q) => {
        const E = {
          ...B,
          keyPath: [...B.keyPath, Q]
        };
        return I(C, E);
      });
    if (typeof g == "object" && g !== null) {
      const C = {};
      for (const Q in g) {
        if (!Object.prototype.hasOwnProperty.call(g, Q))
          continue;
        const E = {
          ...B,
          keyPath: [...B.keyPath, Q]
        };
        C[Q] = I(g[Q], E);
      }
      return C;
    } else
      return A.reduce((C, Q) => Q(C, B), g);
  };
}
function hQ(A, I) {
  return (g) => {
    const B = dQ(A);
    return Object.freeze({
      ...g,
      params: B(g.params, I)
    });
  };
}
function yQ(A, I) {
  return (g) => dQ(A)(g, I);
}
function zt() {
  return hQ([jt], { keyPath: [] });
}
function Pt({
  commitmentPropertyName: A,
  params: I,
  optionsObjectPositionInParams: g,
  overrideCommitment: B
}) {
  const C = I[g];
  if (
    // There's no config.
    C === void 0 || // There is a config object.
    C && typeof C == "object" && !Array.isArray(C)
  )
    if (
      // The config object already has a commitment set.
      C && A in C
    ) {
      if (!C[A] || C[A] === "finalized") {
        const Q = [...I], {
          [A]: E,
          // eslint-disable-line @typescript-eslint/no-unused-vars
          ...e
        } = C;
        return Object.keys(e).length > 0 ? Q[g] = e : g === Q.length - 1 ? Q.length-- : Q[g] = void 0, Q;
      }
    } else {
      const Q = [...I];
      return Q[g] = {
        ...C,
        [A]: B
      }, Q;
    }
  return I;
}
function vt({
  defaultCommitment: A,
  optionsObjectPositionByMethod: I
}) {
  return (g) => {
    const { params: B, methodName: C } = g;
    if (!Array.isArray(B))
      return g;
    const Q = I[C];
    return Q == null ? g : Object.freeze({
      methodName: C,
      params: Pt({
        commitmentPropertyName: C === "sendTransaction" ? "preflightCommitment" : "commitment",
        optionsObjectPositionInParams: Q,
        overrideCommitment: A,
        params: B
      })
    });
  };
}
function Xt(A) {
  return (I, { keyPath: g }) => (typeof I == "bigint" && A && (I > Number.MAX_SAFE_INTEGER || I < -Number.MAX_SAFE_INTEGER) && A(g, I), I);
}
function $t(A) {
  return (I) => hQ(
    [Xt((...B) => A(I, ...B))],
    { keyPath: [] }
  )(I);
}
var An = {
  accountNotifications: 1,
  blockNotifications: 1,
  getAccountInfo: 1,
  getBalance: 1,
  getBlock: 1,
  getBlockHeight: 0,
  getBlockProduction: 0,
  getBlocks: 2,
  getBlocksWithLimit: 2,
  getEpochInfo: 0,
  getFeeForMessage: 1,
  getInflationGovernor: 0,
  getInflationReward: 1,
  getLargestAccounts: 0,
  getLatestBlockhash: 0,
  getLeaderSchedule: 1,
  getMinimumBalanceForRentExemption: 1,
  getMultipleAccounts: 1,
  getProgramAccounts: 1,
  getSignaturesForAddress: 1,
  getSlot: 0,
  getSlotLeader: 0,
  getStakeMinimumDelegation: 0,
  getSupply: 0,
  getTokenAccountBalance: 1,
  getTokenAccountsByDelegate: 2,
  getTokenAccountsByOwner: 2,
  getTokenLargestAccounts: 1,
  getTokenSupply: 1,
  getTransaction: 1,
  getTransactionCount: 0,
  getVoteAccounts: 0,
  isBlockhashValid: 1,
  logsNotifications: 1,
  programNotifications: 1,
  requestAirdrop: 2,
  sendTransaction: 1,
  signatureNotifications: 1,
  simulateTransaction: 1
};
function In(A) {
  const I = A?.onIntegerOverflow;
  return (g) => WI(
    g,
    I ? $t(I) : (B) => B,
    zt(),
    vt({
      defaultCommitment: A?.defaultCommitment,
      optionsObjectPositionByMethod: An
    })
  );
}
function NQ(A) {
  return function(g, { keyPath: B }) {
    return typeof g == "number" && Number.isInteger(g) || typeof g == "bigint" ? gn(B, A) ? Number(g) : BigInt(g) : g;
  };
}
function gn(A, I) {
  return I.some((g) => {
    if (g.length !== A.length)
      return !1;
    for (let B = A.length - 1; B >= 0; B--) {
      const C = A[B], Q = g[B];
      if (Q !== C && (Q !== l || typeof C != "number"))
        return !1;
    }
    return !0;
  });
}
function Bn(A) {
  return yQ([NQ(A)], { keyPath: [] });
}
function Cn() {
  return (A) => A.result;
}
var Pg = [
  // parsed Token/Token22 token account
  ["data", "parsed", "info", "tokenAmount", "decimals"],
  ["data", "parsed", "info", "tokenAmount", "uiAmount"],
  ["data", "parsed", "info", "rentExemptReserve", "decimals"],
  ["data", "parsed", "info", "rentExemptReserve", "uiAmount"],
  ["data", "parsed", "info", "delegatedAmount", "decimals"],
  ["data", "parsed", "info", "delegatedAmount", "uiAmount"],
  ["data", "parsed", "info", "extensions", l, "state", "olderTransferFee", "transferFeeBasisPoints"],
  ["data", "parsed", "info", "extensions", l, "state", "newerTransferFee", "transferFeeBasisPoints"],
  ["data", "parsed", "info", "extensions", l, "state", "preUpdateAverageRate"],
  ["data", "parsed", "info", "extensions", l, "state", "currentRate"]
], pI = [
  ...Pg,
  // parsed AddressTableLookup account
  ["data", "parsed", "info", "lastExtendedSlotStartIndex"],
  // parsed Config account
  ["data", "parsed", "info", "slashPenalty"],
  ["data", "parsed", "info", "warmupCooldownRate"],
  // parsed Token/Token22 mint account
  ["data", "parsed", "info", "decimals"],
  // parsed Token/Token22 multisig account
  ["data", "parsed", "info", "numRequiredSigners"],
  ["data", "parsed", "info", "numValidSigners"],
  // parsed Stake account
  ["data", "parsed", "info", "stake", "delegation", "warmupCooldownRate"],
  // parsed Sysvar rent account
  ["data", "parsed", "info", "exemptionThreshold"],
  ["data", "parsed", "info", "burnPercent"],
  // parsed Vote account
  ["data", "parsed", "info", "commission"],
  ["data", "parsed", "info", "votes", l, "confirmationCount"]
], Ig = [
  ["index"],
  ["instructions", l, "accounts", l],
  ["instructions", l, "programIdIndex"],
  ["instructions", l, "stackHeight"]
], IC = [
  ["addressTableLookups", l, "writableIndexes", l],
  ["addressTableLookups", l, "readonlyIndexes", l],
  ["header", "numReadonlySignedAccounts"],
  ["header", "numReadonlyUnsignedAccounts"],
  ["header", "numRequiredSignatures"],
  ["instructions", l, "accounts", l],
  ["instructions", l, "programIdIndex"],
  ["instructions", l, "stackHeight"]
];
function Qn() {
  return [
    ["loadedAccountsDataSize"],
    ...pI.map((A) => ["accounts", l, ...A]),
    ...Ig.map((A) => ["innerInstructions", l, ...A])
  ];
}
function En() {
  return (A, I) => {
    const g = A;
    if ("error" in g) {
      const { error: B } = g;
      if (B && typeof B == "object" && "code" in B && (B.code === -32002 || B.code === -32002n) && "data" in B && B.data) {
        const E = yQ(
          [NQ(Qn())],
          { keyPath: [] }
        )(B.data), e = { ...B, data: E };
        throw zg(e);
      }
      throw zg(g.error);
    }
    return g;
  };
}
function en(A) {
  return (I, g) => {
    const B = g.methodName, C = A?.allowedNumericKeyPaths && B ? A.allowedNumericKeyPaths[B] : void 0;
    return WI(
      I,
      (Q) => En()(Q),
      (Q) => Cn()(Q),
      (Q) => Bn(C ?? [])(Q)
    );
  };
}
function tn(A) {
  return dt({
    requestTransformer: In(A),
    responseTransformer: en({
      allowedNumericKeyPaths: nn()
    })
  });
}
var mg;
function nn() {
  return mg || (mg = {
    getAccountInfo: pI.map((A) => ["value", ...A]),
    getBlock: [
      ["transactions", l, "meta", "preTokenBalances", l, "accountIndex"],
      [
        "transactions",
        l,
        "meta",
        "preTokenBalances",
        l,
        "uiTokenAmount",
        "decimals"
      ],
      ["transactions", l, "meta", "postTokenBalances", l, "accountIndex"],
      [
        "transactions",
        l,
        "meta",
        "postTokenBalances",
        l,
        "uiTokenAmount",
        "decimals"
      ],
      ["transactions", l, "meta", "rewards", l, "commission"],
      ...Ig.map((A) => [
        "transactions",
        l,
        "meta",
        "innerInstructions",
        l,
        ...A
      ]),
      ...IC.map((A) => ["transactions", l, "transaction", "message", ...A]),
      ["rewards", l, "commission"]
    ],
    getClusterNodes: [
      [l, "featureSet"],
      [l, "shredVersion"]
    ],
    getInflationGovernor: [["initial"], ["foundation"], ["foundationTerm"], ["taper"], ["terminal"]],
    getInflationRate: [["foundation"], ["total"], ["validator"]],
    getInflationReward: [[l, "commission"]],
    getMultipleAccounts: pI.map((A) => ["value", l, ...A]),
    getProgramAccounts: pI.flatMap((A) => [
      ["value", l, "account", ...A],
      [l, "account", ...A]
    ]),
    getRecentPerformanceSamples: [[l, "samplePeriodSecs"]],
    getTokenAccountBalance: [
      ["value", "decimals"],
      ["value", "uiAmount"]
    ],
    getTokenAccountsByDelegate: Pg.map((A) => [
      "value",
      l,
      "account",
      ...A
    ]),
    getTokenAccountsByOwner: Pg.map((A) => [
      "value",
      l,
      "account",
      ...A
    ]),
    getTokenLargestAccounts: [
      ["value", l, "decimals"],
      ["value", l, "uiAmount"]
    ],
    getTokenSupply: [
      ["value", "decimals"],
      ["value", "uiAmount"]
    ],
    getTransaction: [
      ["meta", "preTokenBalances", l, "accountIndex"],
      ["meta", "preTokenBalances", l, "uiTokenAmount", "decimals"],
      ["meta", "postTokenBalances", l, "accountIndex"],
      ["meta", "postTokenBalances", l, "uiTokenAmount", "decimals"],
      ["meta", "rewards", l, "commission"],
      ...Ig.map((A) => ["meta", "innerInstructions", l, ...A]),
      ...IC.map((A) => ["transaction", "message", ...A])
    ],
    getVersion: [["feature-set"]],
    getVoteAccounts: [
      ["current", l, "commission"],
      ["delinquent", l, "commission"]
    ],
    simulateTransaction: [
      ["value", "loadedAccountsDataSize"],
      ...pI.map((A) => ["value", "accounts", l, ...A]),
      ...Ig.map((A) => ["value", "innerInstructions", l, ...A])
    ]
  }), mg;
}
var on = 81e5;
function SQ(A) {
  return Array.isArray(A) ? "%5B" + A.map(SQ).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function rn([A, I]) {
  return `${A}=${SQ(I)}`;
}
function an(A) {
  const I = Object.entries(A).map(rn).join("&");
  return btoa(I);
}
function sn(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${an(I)}'`), `${g}\``;
  }
}
var cn = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = sn(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function Dn(...A) {
  "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(...A);
}
var wn = 8100002;
function fQ(A) {
  return Array.isArray(A) ? "%5B" + A.map(fQ).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function un([A, I]) {
  return `${A}=${fQ(I)}`;
}
function ln(A) {
  const I = Object.entries(A).map(un).join("&");
  return btoa(I);
}
function dn(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${ln(I)}'`), `${g}\``;
  }
}
var hn = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = dn(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
};
function yn(A) {
  const I = {};
  for (const g in A)
    I[g.toLowerCase()] = A[g];
  return I;
}
function Nn(A) {
  const { fromJson: I, headers: g, toJson: B, url: C } = A;
  let Q;
  const E = g && yn(g);
  return async function({
    payload: i,
    signal: t
  }) {
    const n = B ? B(i) : JSON.stringify(i), a = {
      ...Q,
      body: n,
      headers: {
        ...E,
        // Keep these headers lowercase so they will override any user-supplied headers above.
        accept: "application/json",
        "content-length": n.length.toString(),
        "content-type": "application/json; charset=utf-8"
      },
      method: "POST",
      signal: t
    }, o = await fetch(C, a);
    if (!o.ok)
      throw new hn(wn, {
        headers: o.headers,
        message: o.statusText,
        statusCode: o.status
      });
    return I ? I(await o.text(), i) : await o.json();
  };
}
var Sn = [
  "getAccountInfo",
  "getBalance",
  "getBlock",
  "getBlockCommitment",
  "getBlockHeight",
  "getBlockProduction",
  "getBlocks",
  "getBlocksWithLimit",
  "getBlockTime",
  "getClusterNodes",
  "getEpochInfo",
  "getEpochSchedule",
  "getFeeForMessage",
  "getFirstAvailableBlock",
  "getGenesisHash",
  "getHealth",
  "getHighestSnapshotSlot",
  "getIdentity",
  "getInflationGovernor",
  "getInflationRate",
  "getInflationReward",
  "getLargestAccounts",
  "getLatestBlockhash",
  "getLeaderSchedule",
  "getMaxRetransmitSlot",
  "getMaxShredInsertSlot",
  "getMinimumBalanceForRentExemption",
  "getMultipleAccounts",
  "getProgramAccounts",
  "getRecentPerformanceSamples",
  "getRecentPrioritizationFees",
  "getSignaturesForAddress",
  "getSignatureStatuses",
  "getSlot",
  "getSlotLeader",
  "getSlotLeaders",
  "getStakeMinimumDelegation",
  "getSupply",
  "getTokenAccountBalance",
  "getTokenAccountsByDelegate",
  "getTokenAccountsByOwner",
  "getTokenLargestAccounts",
  "getTokenSupply",
  "getTransaction",
  "getTransactionCount",
  "getVersion",
  "getVoteAccounts",
  "index",
  "isBlockhashValid",
  "minimumLedgerSlot",
  "requestAirdrop",
  "sendTransaction",
  "simulateTransaction"
];
function gC(A) {
  return sQ(A) && Sn.includes(A.method);
}
function fn(A) {
  return Nn({
    ...A,
    fromJson: (I, g) => gC(g) ? Et(I) : JSON.parse(I),
    toJson: (I) => gC(I) ? st(I) : JSON.stringify(I)
  });
}
var Rn = Object.prototype.toString, kn = Object.keys || function(A) {
  const I = [];
  for (const g in A)
    I.push(g);
  return I;
};
function YI(A, I) {
  let g, B, C, Q, E, e, i;
  if (A === !0)
    return "true";
  if (A === !1)
    return "false";
  switch (typeof A) {
    case "object":
      if (A === null)
        return null;
      if ("toJSON" in A && typeof A.toJSON == "function")
        return YI(A.toJSON(), I);
      if (i = Rn.call(A), i === "[object Array]") {
        for (C = "[", B = A.length - 1, g = 0; g < B; g++)
          C += YI(A[g], !0) + ",";
        return B > -1 && (C += YI(A[g], !0)), C + "]";
      } else if (i === "[object Object]") {
        for (Q = kn(A).sort(), B = Q.length, C = "", g = 0; g < B; )
          E = Q[g], e = YI(A[E], !1), e !== void 0 && (C && (C += ","), C += JSON.stringify(E) + ":" + e), g++;
        return "{" + C + "}";
      } else
        return JSON.stringify(A);
    case "function":
    case "undefined":
      return I ? null : void 0;
    case "bigint":
      return `${A.toString()}n`;
    case "string":
      return JSON.stringify(A);
    default:
      return isFinite(A) ? A : null;
  }
}
function Mn(A) {
  const I = YI(A, !1);
  if (I !== void 0)
    return "" + I;
}
function RQ(A, I, g) {
  let B = "";
  if (typeof I[0] == "number") {
    const E = I[0] + 1, e = E % 10, i = E % 100;
    e == 1 && i != 11 ? B = E + "st" : e == 2 && i != 12 ? B = E + "nd" : e == 3 && i != 13 ? B = E + "rd" : B = E + "th";
  } else
    B = `\`${I[0].toString()}\``;
  const C = I.length > 1 ? I.slice(1).map((E) => typeof E == "number" ? `[${E}]` : E).join(".") : void 0, Q = new cn(on, {
    argumentLabel: B,
    keyPath: I,
    methodName: A,
    optionalPathLabel: C ? ` at path \`${C}\`` : "",
    value: g,
    ...C !== void 0 ? { path: C } : void 0
  });
  return Dn(Q, RQ), Q;
}
var Gn = {
  defaultCommitment: "confirmed",
  onIntegerOverflow(A, I, g) {
    throw RQ(A.methodName, I, g);
  }
}, Fn = globalThis.AbortController, BC;
function CC() {
  return {};
}
function Un(A, I) {
  let g;
  return async function(C) {
    const { payload: Q, signal: E } = C, e = I(Q);
    if (e === void 0)
      return await A(C);
    if (g || (queueMicrotask(() => {
      g = void 0;
    }), g = {}), g[e] == null) {
      const t = new Fn(), n = (async () => {
        try {
          return await A({
            ...C,
            signal: t.signal
          });
        } catch (a) {
          if (a === (BC ||= CC()))
            return;
          throw a;
        }
      })();
      g[e] = {
        abortController: t,
        numConsumers: 0,
        responsePromise: n
      };
    }
    const i = g[e];
    if (i.numConsumers++, E) {
      const t = i.responsePromise;
      return await new Promise((n, a) => {
        const o = (c) => {
          E.removeEventListener("abort", o), i.numConsumers -= 1, queueMicrotask(() => {
            i.numConsumers === 0 && i.abortController.abort(BC ||= CC());
          }), a(c.target.reason);
        };
        E.addEventListener("abort", o), t.then(n).catch(a).finally(() => {
          E.removeEventListener("abort", o);
        });
      });
    } else
      return await i.responsePromise;
  };
}
function mn(A) {
  return sQ(A) ? Mn([A.method, A.params]) : void 0;
}
function Jn(A) {
  const I = {};
  for (const g in A)
    I[g.toLowerCase()] = A[g];
  return I;
}
function pn(A) {
  return WI(
    fn({
      ...A,
      headers: {
        ...A.headers ? Jn(A.headers) : void 0,
        // Keep these headers lowercase so they will override any user-supplied headers above.
        "solana-client": "js/5.5.1"
      }
    }),
    (I) => Un(I, mn)
  );
}
function Yn(A) {
  return wt({
    api: tn(Gn),
    transport: A
  });
}
function Ln(A, I, g, B) {
  if (B < I || B > g)
    throw new IA($E, {
      codecDescription: A,
      max: g,
      min: I,
      value: B
    });
}
var bn = () => rg({
  getSizeFromValue: (A) => A <= 127 ? 1 : A <= 16383 ? 2 : 3,
  maxSize: 3,
  write: (A, I, g) => {
    Ln("shortU16", 0, 65535, A);
    const B = [0];
    for (let C = 0; ; C += 1) {
      const Q = Number(A) >> C * 7;
      if (Q === 0)
        break;
      const E = 127 & Q;
      B[C] = E, C > 0 && (B[C - 1] |= 128);
    }
    return I.set(B, g), g + B.length;
  }
}), Kn = 18446744073709551615n;
function On(A) {
  if (A < 0 || A > Kn)
    throw new IA(TE);
}
function vg(A) {
  return On(A), A;
}
var Tn = 28e5, Hn = 2800001, xn = 2800003, qn = 361e4, Vn = 3610002, _n = 3610003, Zn = 3610004, Wn = 3610005, jn = 5508e3, zn = 5663e3, QC = 5663001, Pn = 5663004, vn = 5663015, Xn = 5663021, $n = 8078001, Ao = 8078011, kQ = 8078012;
function MQ(A) {
  return Array.isArray(A) ? "%5B" + A.map(MQ).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function Io([A, I]) {
  return `${A}=${MQ(I)}`;
}
function go(A) {
  const I = Object.entries(A).map(Io).join("&");
  return btoa(I);
}
function Bo(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${go(I)}'`), `${g}\``;
  }
}
var W = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[I, g]) {
    let B, C;
    g && Object.entries(Object.getOwnPropertyDescriptors(g)).forEach(([E, e]) => {
      E === "cause" ? C = { cause: e.value } : (B === void 0 && (B = {
        __code: I
      }), Object.defineProperty(B, E, e));
    });
    const Q = Bo(I, B);
    super(Q, C), this.context = Object.freeze(
      B === void 0 ? {
        __code: I
      } : B
    ), this.name = "SolanaError";
  }
}, EI = /* @__PURE__ */ ((A) => (A[A.WRITABLE_SIGNER = /* 3 */
3] = "WRITABLE_SIGNER", A[A.READONLY_SIGNER = /* 2 */
2] = "READONLY_SIGNER", A[A.WRITABLE = /* 1 */
1] = "WRITABLE", A[A.READONLY = /* 0 */
0] = "READONLY", A))(EI || {}), Co = 1;
function DI(A) {
  return A >= 2;
}
function TI(A) {
  return (A & Co) !== 0;
}
function EC(A, I) {
  return A | I;
}
function Qo(A, I) {
  if (A.length >= I) return A;
  const g = new Uint8Array(I).fill(0);
  return g.set(A), g;
}
var Eo = (A, I) => Qo(A.length <= I ? A : A.slice(0, I), I);
function eo(A, I) {
  return A.length === I.length && A.every((g, B) => g === I[B]);
}
function Xg(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function mA(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(Xg(I, A));
      return A.write(I, g, 0), g;
    }
  });
}
function GQ(A) {
  return Object.freeze({
    ...A,
    decode: (I, g = 0) => A.read(I, g)[0]
  });
}
function oI(A) {
  return "fixedSize" in A && typeof A.fixedSize == "number";
}
function io(A) {
  return !oI(A);
}
function to(A, I, g, B = 0) {
  const C = g.length - B;
  if (C < I)
    throw new W($n, {
      bytesLength: C,
      codecDescription: A,
      expected: I
    });
}
function no(A, I) {
  const g = (E, e, i) => {
    const t = A.encode(E);
    return i = I.write(t.length, e, i), e.set(t, i), i + t.length;
  };
  if (oI(I) && oI(A))
    return mA({ ...A, fixedSize: I.fixedSize + A.fixedSize, write: g });
  const B = oI(I) ? I.fixedSize : I.maxSize ?? null, C = oI(A) ? A.fixedSize : A.maxSize ?? null, Q = B !== null && C !== null ? B + C : null;
  return mA({
    ...A,
    ...Q !== null ? { maxSize: Q } : {},
    getSizeFromValue: (E) => {
      const e = Xg(E, A);
      return Xg(e, I) + e;
    },
    write: g
  });
}
function oo(A, I, g) {
  const B = A.byteOffset + 0, C = g ?? A.byteLength;
  let Q;
  return typeof SharedArrayBuffer > "u" ? Q = A.buffer : A.buffer instanceof SharedArrayBuffer ? (Q = new ArrayBuffer(A.length), new Uint8Array(Q).set(new Uint8Array(A))) : Q = A.buffer, (B === 0 || B === -A.byteLength) && C === A.byteLength ? Q : Q.slice(B, B + C);
}
function FQ(A, I) {
  return mA({
    fixedSize: I,
    write: (g, B, C) => {
      const Q = A.encode(g), E = Q.length > I ? Q.slice(0, I) : Q;
      return B.set(E, C), C + I;
    }
  });
}
function ro(A, I) {
  return GQ({
    fixedSize: I,
    read: (g, B) => {
      to("fixCodecSize", I, g, B), (B > 0 || g.length > I) && (g = g.slice(B, B + I)), oI(A) && (g = Eo(g, A.fixedSize));
      const [C] = A.read(g, 0);
      return [C, B + I];
    }
  });
}
function DB(A, I) {
  return mA({
    ...io(A) ? { ...A, getSizeFromValue: (g) => A.getSizeFromValue(I(g)) } : A,
    write: (g, B, C) => A.write(I(g), B, C)
  });
}
function ao(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new W(kQ, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var so = (A) => mA({
  getSizeFromValue: (I) => {
    const [g, B] = eC(I, A[0]);
    if (!B) return I.length;
    const C = iC(B, A);
    return g.length + Math.ceil(C.toString(16).length / 2);
  },
  write(I, g, B) {
    if (ao(A, I), I === "") return B;
    const [C, Q] = eC(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(C.length).fill(0), B), B + C.length;
    let E = iC(Q, A);
    const e = [];
    for (; E > 0n; )
      e.unshift(Number(E % 256n)), E /= 256n;
    const i = [...Array(C.length).fill(0), ...e];
    return g.set(i, B), B + i.length;
  }
}), co = (A) => GQ({
  read(I, g) {
    const B = g === 0 ? I : I.slice(g);
    if (B.length === 0) return ["", 0];
    let C = B.findIndex((i) => i !== 0);
    C = C === -1 ? B.length : C;
    const Q = A[0].repeat(C);
    if (C === B.length) return [Q, I.length];
    const E = B.slice(C).reduce((i, t) => i * 256n + BigInt(t), 0n), e = Do(E, A);
    return [Q + e, I.length];
  }
});
function eC(A, I) {
  const [g, B] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, B];
}
function iC(A, I) {
  const g = BigInt(I.length);
  let B = 0n;
  for (const C of A)
    B *= g, B += BigInt(I.indexOf(C));
  return B;
}
function Do(A, I) {
  const g = BigInt(I.length), B = [];
  for (; A > 0n; )
    B.unshift(I[Number(A % g)]), A /= g;
  return B.join("");
}
var UQ = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", wo = () => so(UQ), uo = () => co(UQ);
function wB() {
  if (!globalThis.isSecureContext)
    throw new W(qn);
}
var AI;
async function lo(A) {
  return AI === void 0 && (AI = new Promise((I) => {
    A.generateKey(
      "Ed25519",
      /* extractable */
      !1,
      ["sign", "verify"]
    ).then(() => {
      I(AI = !0);
    }).catch(() => {
      I(AI = !1);
    });
  })), typeof AI == "boolean" ? AI : await AI;
}
async function ho() {
  if (wB(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.generateKey != "function")
    throw new W(Zn);
  if (!await lo(globalThis.crypto.subtle))
    throw new W(Vn);
}
function yo() {
  if (wB(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.exportKey != "function")
    throw new W(_n);
}
function No() {
  if (wB(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.sign != "function")
    throw new W(Wn);
}
var Jg, pg;
function uB() {
  return Jg || (Jg = wo()), Jg;
}
function So() {
  return pg || (pg = uo()), pg;
}
function fo(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    return !1;
  const I = uB();
  try {
    return I.encode(A).byteLength === 32;
  } catch {
    return !1;
  }
}
function Ro(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    throw new W(Hn, {
      actualLength: A.length
    });
  const B = uB().encode(A).byteLength;
  if (B !== 32)
    throw new W(Tn, {
      actualLength: B
    });
}
function ko(A) {
  return Ro(A), A;
}
function mQ() {
  return DB(
    FQ(uB(), 32),
    (A) => ko(A)
  );
}
function Mo() {
  return ro(So(), 32);
}
function lB() {
  return new Intl.Collator("en", {
    caseFirst: "lower",
    ignorePunctuation: !1,
    localeMatcher: "best fit",
    numeric: !1,
    sensitivity: "variant",
    usage: "sort"
  }).compare;
}
async function JQ(A) {
  if (yo(), A.type !== "public" || A.algorithm.name !== "Ed25519")
    throw new W(xn);
  const I = await crypto.subtle.exportKey("raw", A);
  return Mo().decode(new Uint8Array(I));
}
var pQ = (
  // Resist the temptation to convert this to a simple string; As of version 133.0.3, Firefox
  // requires the object form of `AlgorithmIdentifier` and will throw a `DOMException` otherwise.
  Object.freeze({ name: "Ed25519" })
);
async function YQ(A, I) {
  No();
  const g = await crypto.subtle.sign(pQ, A, oo(I));
  return new Uint8Array(g);
}
async function Go() {
  return await ho(), await crypto.subtle.generateKey(
    /* algorithm */
    pQ,
    // Native implementation status: https://github.com/WICG/webcrypto-secure-curves/issues/20
    /* extractable */
    !1,
    // Prevents the bytes of the private key from being visible to JS.
    /* allowed uses */
    ["sign", "verify"]
  );
}
function LQ(A, I, g, B) {
  if (B < I || B > g)
    throw new W(Ao, {
      codecDescription: A,
      max: g,
      min: I,
      value: B
    });
}
function Fo(A) {
  return A?.endian !== 1;
}
function Uo(A) {
  return mA({
    fixedSize: A.size,
    write(I, g, B) {
      A.range && LQ(A.name, A.range[0], A.range[1], I);
      const C = new ArrayBuffer(A.size);
      return A.set(new DataView(C), I, Fo(A.config)), g.set(new Uint8Array(C), B), B + A.size;
    }
  });
}
var wI = () => mA({
  getSizeFromValue: (A) => A <= 127 ? 1 : A <= 16383 ? 2 : 3,
  maxSize: 3,
  write: (A, I, g) => {
    LQ("shortU16", 0, 65535, A);
    const B = [0];
    for (let C = 0; ; C += 1) {
      const Q = Number(A) >> C * 7;
      if (Q === 0)
        break;
      const E = 127 & Q;
      B[C] = E, C > 0 && (B[C - 1] |= 128);
    }
    return I.set(B, g), g + B.length;
  }
}), Qg = () => Uo({
  name: "u8",
  range: [0, +"0xff"],
  set: (A, I) => A.setUint8(0, Number(I)),
  size: 1
});
function mo(A) {
  return fo(A);
}
function Jo(A) {
  return "lifetimeConstraint" in A && typeof A.lifetimeConstraint.blockhash == "string" && typeof A.lifetimeConstraint.lastValidBlockHeight == "bigint" && mo(A.lifetimeConstraint.blockhash);
}
function po(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new W(kQ, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var Yo = (A) => mA({
  getSizeFromValue: (I) => {
    const [g, B] = tC(I, A[0]);
    if (!B) return I.length;
    const C = nC(B, A);
    return g.length + Math.ceil(C.toString(16).length / 2);
  },
  write(I, g, B) {
    if (po(A, I), I === "") return B;
    const [C, Q] = tC(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(C.length).fill(0), B), B + C.length;
    let E = nC(Q, A);
    const e = [];
    for (; E > 0n; )
      e.unshift(Number(E % 256n)), E /= 256n;
    const i = [...Array(C.length).fill(0), ...e];
    return g.set(i, B), B + i.length;
  }
});
function tC(A, I) {
  const [g, B] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, B];
}
function nC(A, I) {
  const g = BigInt(I.length);
  let B = 0n;
  for (const C of A)
    B *= g, B += BigInt(I.indexOf(C));
  return B;
}
var Lo = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", bo = () => Yo(Lo), Yg;
function Ko() {
  if (!Yg) {
    const A = QI(Qg(), { size: wI() });
    Yg = O([
      ["lookupTableAddress", mQ()],
      ["writableIndexes", A],
      ["readonlyIndexes", A]
    ]);
  }
  return Yg;
}
var Lg;
function bg() {
  return Lg || (Lg = Qg()), Lg;
}
function Oo() {
  return O([
    ["numSignerAccounts", bg()],
    ["numReadonlySignerAccounts", bg()],
    ["numReadonlyNonSignerAccounts", bg()]
  ]);
}
var Kg;
function To() {
  return Kg || (Kg = DB(
    O([
      ["programAddressIndex", Qg()],
      ["accountIndices", QI(Qg(), { size: wI() })],
      ["data", no(cA(), wI())]
    ]),
    // Convert an instruction to have all fields defined
    (A) => A.accountIndices !== void 0 && A.data !== void 0 ? A : {
      ...A,
      accountIndices: A.accountIndices ?? [],
      data: A.data ?? new Uint8Array(0)
    }
  )), Kg;
}
var Ho = 0, xo = 128;
function qo() {
  return mA({
    getSizeFromValue: (A) => A === "legacy" ? 0 : 1,
    maxSize: 1,
    write: (A, I, g) => {
      if (A === "legacy")
        return g;
      if (A < 0 || A > 127)
        throw new W(Pn, {
          actualVersion: A
        });
      if (A > Ho)
        throw new W(Xn, {
          unsupportedVersion: A
        });
      return I.set([A | xo], g), g + 1;
    }
  });
}
function oC() {
  return O(bQ());
}
function rC() {
  return DB(
    O([
      ...bQ(),
      ["addressTableLookups", Vo()]
    ]),
    (A) => A.version === "legacy" ? A : {
      ...A,
      addressTableLookups: A.addressTableLookups ?? []
    }
  );
}
function bQ() {
  const A = nB(
    [
      // Use a 32-byte constant encoder for a missing lifetime token (index 0).
      zC(new Uint8Array(32)),
      // Use a 32-byte base58 encoder for a valid lifetime token (index 1).
      FQ(bo(), 32)
    ],
    (I) => I === void 0 ? 0 : 1
  );
  return [
    ["version", qo()],
    ["header", Oo()],
    ["staticAccounts", QI(mQ(), { size: wI() })],
    ["lifetimeToken", A],
    ["instructions", QI(To(), { size: wI() })]
  ];
}
function Vo() {
  return QI(Ko(), { size: wI() });
}
function _o() {
  return mA({
    getSizeFromValue: (A) => A.version === "legacy" ? oC().getSizeFromValue(A) : rC().getSizeFromValue(A),
    write: (A, I, g) => A.version === "legacy" ? oC().write(A, I, g) : rC().write(A, I, g)
  });
}
function aC(A, I, g) {
  A[I] = g(A[I] ?? { role: EI.READONLY });
}
var _ = Symbol("AddressMapTypeProperty");
function Zo(A, I) {
  const g = {
    [A]: { [_]: 0, role: EI.WRITABLE_SIGNER }
  }, B = /* @__PURE__ */ new Set();
  for (const C of I) {
    aC(g, C.programAddress, (E) => {
      if (B.add(C.programAddress), _ in E) {
        if (TI(E.role))
          switch (E[_]) {
            case 0:
              throw new W(zn, {
                programAddress: C.programAddress
              });
            default:
              throw new W(QC, {
                programAddress: C.programAddress
              });
          }
        if (E[_] === 2)
          return E;
      }
      return { [_]: 2, role: EI.READONLY };
    });
    let Q;
    if (C.accounts)
      for (const E of C.accounts)
        aC(g, E.address, (e) => {
          const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            address: i,
            ...t
          } = E;
          if (_ in e)
            switch (e[_]) {
              case 0:
                return e;
              case 1: {
                const n = EC(e.role, t.role);
                if ("lookupTableAddress" in t) {
                  if (
                    // Consider using the new LOOKUP_TABLE if its address is different...
                    e.lookupTableAddress !== t.lookupTableAddress && // ...and sorts before the existing one.
                    (Q ||= lB())(
                      t.lookupTableAddress,
                      e.lookupTableAddress
                    ) < 0
                  )
                    return {
                      [_]: 1,
                      ...t,
                      role: n
                    };
                } else if (DI(t.role))
                  return {
                    [_]: 2,
                    role: n
                  };
                return e.role !== n ? {
                  ...e,
                  role: n
                } : e;
              }
              case 2: {
                const n = EC(e.role, t.role);
                if (
                  // Check to see if this address represents a program that is invoked
                  // in this transaction.
                  B.has(E.address)
                ) {
                  if (TI(t.role))
                    throw new W(
                      QC,
                      {
                        programAddress: E.address
                      }
                    );
                  return e.role !== n ? {
                    ...e,
                    role: n
                  } : e;
                } else return "lookupTableAddress" in t && // Static accounts can be 'upgraded' to lookup table accounts as
                // long as they are not require to sign the transaction.
                !DI(e.role) ? {
                  ...t,
                  [_]: 1,
                  role: n
                } : e.role !== n ? {
                  ...e,
                  role: n
                } : e;
              }
            }
          return "lookupTableAddress" in t ? {
            ...t,
            [_]: 1
            /* LOOKUP_TABLE */
          } : {
            ...t,
            [_]: 2
            /* STATIC */
          };
        });
  }
  return g;
}
function Wo(A) {
  let I;
  return Object.entries(A).sort(([B, C], [Q, E]) => {
    if (C[_] !== E[_]) {
      if (C[_] === 0)
        return -1;
      if (E[_] === 0)
        return 1;
      if (C[_] === 2)
        return -1;
      if (E[_] === 2)
        return 1;
    }
    const e = DI(C.role);
    if (e !== DI(E.role))
      return e ? -1 : 1;
    const i = TI(C.role);
    return i !== TI(E.role) ? i ? -1 : 1 : (I ||= lB(), C[_] === 1 && E[_] === 1 && C.lookupTableAddress !== E.lookupTableAddress ? I(C.lookupTableAddress, E.lookupTableAddress) : I(B, Q));
  }).map(([B, C]) => ({
    address: B,
    ...C
  }));
}
function jo(A) {
  const I = {};
  for (const g of A) {
    if (!("lookupTableAddress" in g))
      continue;
    const B = I[g.lookupTableAddress] ||= {
      readonlyIndexes: [],
      writableIndexes: []
    };
    g.role === EI.WRITABLE ? B.writableIndexes.push(g.addressIndex) : B.readonlyIndexes.push(g.addressIndex);
  }
  return Object.keys(I).sort(lB()).map((g) => ({
    lookupTableAddress: g,
    ...I[g]
  }));
}
function zo(A) {
  let I = 0, g = 0, B = 0;
  for (const C of A) {
    if ("lookupTableAddress" in C)
      break;
    const Q = TI(C.role);
    DI(C.role) ? (B++, Q || g++) : Q || I++;
  }
  return {
    numReadonlyNonSignerAccounts: I,
    numReadonlySignerAccounts: g,
    numSignerAccounts: B
  };
}
function Po(A) {
  const I = {};
  for (const [g, B] of A.entries())
    I[B.address] = g;
  return I;
}
function vo(A, I) {
  const g = Po(I);
  return A.map(({ accounts: B, data: C, programAddress: Q }) => ({
    programAddressIndex: g[Q],
    ...B ? { accountIndices: B.map(({ address: E }) => g[E]) } : null,
    ...C ? { data: C } : null
  }));
}
function Xo(A) {
  return "nonce" in A ? A.nonce : A.blockhash;
}
function $o(A) {
  const I = A.findIndex((B) => "lookupTableAddress" in B);
  return (I === -1 ? A : A.slice(0, I)).map(({ address: B }) => B);
}
function Ar(A) {
  const I = Zo(
    A.feePayer.address,
    A.instructions
  ), g = Wo(I), B = A.lifetimeConstraint;
  return {
    ...A.version !== "legacy" ? { addressTableLookups: jo(g) } : null,
    ...B ? { lifetimeToken: Xo(B) } : null,
    header: zo(g),
    instructions: vo(A.instructions, g),
    staticAccounts: $o(g),
    version: A.version
  };
}
var Ir = "SysvarRecentB1ockHashes11111111111111111111", gr = "11111111111111111111111111111111";
function Br(A) {
  return A.programAddress === gr && // Test for `AdvanceNonceAccount` instruction data
  A.data != null && Cr(A.data) && // Test for exactly 3 accounts
  A.accounts?.length === 3 && // First account is nonce account address
  A.accounts[0].address != null && A.accounts[0].role === EI.WRITABLE && // Second account is recent blockhashes sysvar
  A.accounts[1].address === Ir && A.accounts[1].role === EI.READONLY && // Third account is nonce authority account
  A.accounts[2].address != null && DI(A.accounts[2].role);
}
function Cr(A) {
  return A.byteLength === 4 && A[0] === 4 && A[1] === 0 && A[2] === 0 && A[3] === 0;
}
function Qr(A) {
  return "lifetimeConstraint" in A && typeof A.lifetimeConstraint.nonce == "string" && A.instructions[0] != null && Br(A.instructions[0]);
}
function Er(A) {
  const I = Ar(A), g = _o().encode(I), B = I.staticAccounts.slice(0, I.header.numSignerAccounts), C = {};
  for (const E of B)
    C[E] = null;
  let Q;
  return Jo(A) ? Q = {
    blockhash: A.lifetimeConstraint.blockhash,
    lastValidBlockHeight: A.lifetimeConstraint.lastValidBlockHeight
  } : Qr(A) && (Q = {
    nonce: A.lifetimeConstraint.nonce,
    nonceAccountAddress: A.instructions[0].accounts[0].address
  }), Object.freeze({
    ...Q ? { lifetimeConstraint: Q } : void 0,
    messageBytes: g,
    signatures: Object.freeze(C)
  });
}
async function er(A, I) {
  let g, B;
  if (await Promise.all(
    A.map(async (C) => {
      const Q = await JQ(C.publicKey), E = I.signatures[Q];
      if (E === void 0) {
        B ||= /* @__PURE__ */ new Set(), B.add(Q);
        return;
      }
      if (B)
        return;
      const e = await YQ(C.privateKey, I.messageBytes);
      E !== null && eo(e, E) || (g ||= {}, g[Q] = e);
    })
  ), B && B.size > 0) {
    const C = Object.keys(I.signatures);
    throw new W(vn, {
      expectedAddresses: C,
      unexpectedAddresses: [...B]
    });
  }
  return g ? Object.freeze({
    ...I,
    signatures: Object.freeze({
      ...I.signatures,
      ...g
    })
  }) : I;
}
function dB(A) {
  const I = {};
  return A.forEach((g) => {
    if (!I[g.address])
      I[g.address] = g;
    else if (I[g.address] !== g)
      throw new W(jn, {
        address: g.address
      });
  }), Object.values(I);
}
function Dg(A) {
  return "modifyAndSignTransactions" in A && typeof A.modifyAndSignTransactions == "function";
}
function HI(A) {
  return "signTransactions" in A && typeof A.signTransactions == "function";
}
function KQ(A) {
  return "signAndSendTransactions" in A && typeof A.signAndSendTransactions == "function";
}
function yI(A) {
  return HI(A) || Dg(A) || KQ(A);
}
function ir(A) {
  return dB(
    (A.accounts ?? []).flatMap((I) => "signer" in I ? I.signer : [])
  );
}
function tr(A) {
  return dB([
    ...A.feePayer && yI(A.feePayer) ? [A.feePayer] : [],
    ...A.instructions.flatMap(ir)
  ]);
}
function OQ(A, I) {
  Object.freeze(A);
  const g = { ...I, feePayer: A };
  return Object.freeze(g), g;
}
async function nr(A) {
  const I = await JQ(A.publicKey);
  return Object.freeze({
    address: I,
    keyPair: A,
    signMessages: (B) => Promise.all(
      B.map(
        async (C) => Object.freeze({ [I]: await YQ(A.privateKey, C.content) })
      )
    ),
    signTransactions: (B) => Promise.all(
      B.map(async (C) => {
        const Q = await er([A], C);
        return Object.freeze({ [I]: Q.signatures[I] });
      })
    )
  });
}
async function TQ() {
  return await nr(await Go());
}
function DA(A) {
  return Object.freeze({
    address: A,
    signMessages: (g) => Promise.resolve(g.map(() => Object.freeze({}))),
    signTransactions: (g) => Promise.resolve(g.map(() => Object.freeze({})))
  });
}
async function HQ(A, I) {
  const { partialSigners: g, modifyingSigners: B } = or(
    dB(tr(A).filter(yI)),
    { identifySendingSigner: !1 }
  );
  return await sr(
    A,
    B,
    g,
    I
  );
}
function or(A, I = {}) {
  const B = I.identifySendingSigner ?? !0 ? rr(A) : null, C = A.filter(
    (e) => e !== B && (Dg(e) || HI(e))
  ), Q = ar(C), E = C.filter(HI).filter((e) => !Q.includes(e));
  return Object.freeze({ modifyingSigners: Q, partialSigners: E, sendingSigner: B });
}
function rr(A) {
  const I = A.filter(KQ);
  if (I.length === 0) return null;
  const g = I.filter(
    (B) => !Dg(B) && !HI(B)
  );
  return g.length > 0 ? g[0] : I[0];
}
function ar(A) {
  const I = A.filter(Dg);
  if (I.length === 0) return [];
  const g = I.filter((B) => !HI(B));
  return g.length > 0 ? g : [I[0]];
}
async function sr(A, I = [], g = [], B) {
  const C = Er(A), Q = await I.reduce(
    async (e, i) => {
      const [t] = await i.modifyAndSignTransactions([await e], B);
      return Object.freeze(t);
    },
    Promise.resolve(C)
  ), E = await Promise.all(
    g.map(async (e) => {
      const [i] = await e.signTransactions([Q], B);
      return i;
    })
  );
  return Object.freeze({
    ...Q,
    signatures: Object.freeze(
      E.reduce((e, i) => ({ ...e, ...i }), Q.signatures ?? {})
    )
  });
}
function xQ(A, I) {
  return "lifetimeConstraint" in I && I.lifetimeConstraint && "blockhash" in I.lifetimeConstraint && I.lifetimeConstraint.blockhash === A.blockhash && I.lifetimeConstraint.lastValidBlockHeight === A.lastValidBlockHeight ? I : Object.freeze({
    ...I,
    lifetimeConstraint: Object.freeze(A)
  });
}
function cr(A, I, g) {
  for (const [B, C] of Object.entries(g))
    for (let Q = 0; Q < C.length; Q++)
      if (A === C[Q])
        return {
          address: A,
          addressIndex: Q,
          lookupTableAddress: B,
          role: I
        };
}
function Dr(A, I) {
  const g = new Set(A.instructions.map((E) => E.programAddress)), B = new Set(
    Object.values(I).flatMap((E) => E).filter((E) => !g.has(E))
  ), C = [];
  let Q = !1;
  for (const E of A.instructions) {
    if (!E.accounts) {
      C.push(E);
      continue;
    }
    const e = [];
    let i = !1;
    for (const t of E.accounts) {
      if ("lookupTableAddress" in t || !B.has(t.address) || At(t.role)) {
        e.push(t);
        continue;
      }
      const n = cr(
        t.address,
        t.role,
        I
      );
      e.push(Object.freeze(n)), i = !0, Q = !0;
    }
    C.push(
      Object.freeze(i ? { ...E, accounts: e } : E)
    );
  }
  return Object.freeze(
    Q ? { ...A, instructions: C } : A
  );
}
function qQ(A) {
  return Object.freeze({
    instructions: Object.freeze([]),
    version: A.version
  });
}
function VQ(A, I) {
  return Object.freeze({
    ...I,
    instructions: Object.freeze([
      ...I.instructions,
      ...A
    ])
  });
}
function wr(A) {
  const I = Object.values(A);
  if (I.length === 0)
    throw new IA(jE);
  return I.map((g) => g || new Uint8Array(64).fill(0));
}
function ur() {
  return OC(
    QI(KC(cA(), 64), { size: bn() }),
    wr
  );
}
function _Q() {
  return O([
    ["signatures", ur()],
    ["messageBytes", cA()]
  ]);
}
async function lr(A, I, g) {
  if (A.length === 0)
    return {};
  const B = await OE(
    I,
    A,
    g
  );
  return bE(B), VI(B), B.reduce((C, Q) => ({
    ...C,
    [Q.address]: Q.data.addresses
  }), {});
}
var hB = "11111111111111111111111111111111";
function dr(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function yB(A, I) {
  return (g) => {
    if (!g.value)
      return;
    const B = g.isWritable ? f.WRITABLE : f.READONLY;
    return Object.freeze({
      address: dr(g.value),
      role: sC(g.value) ? cg(B) : B,
      ...sC(g.value) ? { signer: g.value } : {}
    });
  };
}
function sC(A) {
  return !!A && typeof A == "object" && "address" in A && yI(A);
}
var hr = 0;
function yr() {
  return v(
    O([
      ["discriminator", oB()],
      ["lamports", MA()],
      ["space", MA()],
      ["programAddress", CA()]
    ]),
    (A) => ({ ...A, discriminator: hr })
  );
}
function Nr(A, I) {
  const g = hB, C = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    newAccount: { value: A.newAccount ?? null, isWritable: !0 }
  }, Q = { ...A }, E = [Number(Q.space) + YE].reduce(
    (i, t) => i + t,
    0
  ), e = yB();
  return Object.freeze({
    accounts: [
      e(C.payer),
      e(C.newAccount)
    ],
    byteDelta: E,
    data: yr().encode(
      Q
    ),
    programAddress: g
  });
}
var Sr = 3;
function fr() {
  return v(
    O([
      ["discriminator", oB()],
      ["base", CA()],
      ["seed", qe(Gi(), MA())],
      ["amount", MA()],
      ["space", MA()],
      ["programAddress", CA()]
    ]),
    (A) => ({
      ...A,
      discriminator: Sr
    })
  );
}
function Rr(A, I) {
  const g = hB, C = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    newAccount: { value: A.newAccount ?? null, isWritable: !0 },
    baseAccount: { value: A.baseAccount ?? null, isWritable: !1 }
  }, Q = { ...A }, E = yB();
  return Object.freeze({
    accounts: [
      E(C.payer),
      E(C.newAccount),
      E(C.baseAccount)
    ].filter((e) => e !== void 0),
    data: fr().encode(
      Q
    ),
    programAddress: g
  });
}
var kr = 2;
function Mr() {
  return v(
    O([
      ["discriminator", oB()],
      ["amount", MA()]
    ]),
    (A) => ({ ...A, discriminator: kr })
  );
}
function NB(A, I) {
  const g = hB, C = {
    source: { value: A.source ?? null, isWritable: !0 },
    destination: { value: A.destination ?? null, isWritable: !0 }
  }, Q = { ...A }, E = yB();
  return Object.freeze({
    accounts: [
      E(C.source),
      E(C.destination)
    ],
    data: Mr().encode(
      Q
    ),
    programAddress: g
  });
}
var Gr = u(
  "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
), Fr = u(
  "2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ"
);
u(
  "FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR"
);
u(
  "iwhrLHdsgrvmnwU8GF2FSmyabSMjfHwFGJAX2ufJ3ZN"
);
u(
  "8pm8erUsaMpmZ47LttHAPgnDx7xGZUvxY4q47vTCs5Nj"
);
var Ur = {
  /** The mutable whirlpool program on Solana Mainnet, paired with its mainnet config account. */
  mainnet: {
    programId: Gr,
    configAddress: Fr
  }
}, YA = Ur.mainnet, ZQ = /* @__PURE__ */ ((A) => (A[A.TransferHookA = 0] = "TransferHookA", A[A.TransferHookB = 1] = "TransferHookB", A[A.TransferHookReward = 2] = "TransferHookReward", A[A.TransferHookInput = 3] = "TransferHookInput", A[A.TransferHookIntermediate = 4] = "TransferHookIntermediate", A[A.TransferHookOutput = 5] = "TransferHookOutput", A[A.SupplementalTickArrays = 6] = "SupplementalTickArrays", A[A.SupplementalTickArraysOne = 7] = "SupplementalTickArraysOne", A[A.SupplementalTickArraysTwo = 8] = "SupplementalTickArraysTwo", A[A.TransferHookDepositA = 9] = "TransferHookDepositA", A[A.TransferHookDepositB = 10] = "TransferHookDepositB", A[A.TransferHookWithdrawalA = 11] = "TransferHookWithdrawalA", A[A.TransferHookWithdrawalB = 12] = "TransferHookWithdrawalB", A))(ZQ || {});
function mr() {
  return yi(ZQ);
}
function Jr() {
  return AQ([
    ["Uninitialized", gI()],
    [
      "Initialized",
      k([
        ["fields", cI([pr()])]
      ])
    ]
  ]);
}
function pr() {
  return k([
    ["liquidityNet", EQ()],
    ["liquidityGross", Z()],
    ["feeGrowthOutsideA", Z()],
    ["feeGrowthOutsideB", Z()],
    ["rewardGrowthsOutside", vA(Z(), { size: 3 })]
  ]);
}
function Yr() {
  return ui([
    [
      "ByTokenAmounts",
      O([
        ["tokenMaxA", MA()],
        ["tokenMaxB", MA()],
        ["minSqrtPrice", jg()],
        ["maxSqrtPrice", jg()]
      ])
    ]
  ]);
}
function Lr(A, I) {
  return Array.isArray(I) ? { __kind: A, fields: I } : { __kind: A, ...I ?? {} };
}
function br() {
  return k([
    ["growthInsideCheckpoint", Z()],
    ["amountOwed", L()]
  ]);
}
function wg() {
  return O([
    ["slices", QI(Kr())]
  ]);
}
function Kr() {
  return O([
    ["accountsType", mr()],
    ["length", XA()]
  ]);
}
function Or() {
  return k([
    ["initialized", iA()],
    ["liquidityNet", EQ()],
    ["liquidityGross", Z()],
    ["feeGrowthOutsideA", Z()],
    ["feeGrowthOutsideB", Z()],
    ["rewardGrowthsOutside", vA(Z(), { size: 3 })]
  ]);
}
function Tr() {
  return k([
    ["mint", y()],
    ["vault", y()],
    ["extension", dA(hA(), 32)],
    ["emissionsPerSecondX64", Z()],
    ["growthGlobalX64", Z()]
  ]);
}
var Hr = new Uint8Array([
  17,
  216,
  246,
  142,
  225,
  199,
  218,
  56
]);
function xr() {
  return k([
    ["discriminator", dA(hA(), 8)],
    ["startTickIndex", OI()],
    ["whirlpool", y()],
    ["tickBitmap", Z()],
    ["ticks", vA(Jr(), { size: 88 })]
  ]);
}
function qr(A) {
  return OA(
    A,
    xr()
  );
}
var Vr = new Uint8Array([
  69,
  97,
  189,
  190,
  110,
  7,
  66,
  187
]);
function _r() {
  return k([
    ["discriminator", dA(hA(), 8)],
    ["startTickIndex", OI()],
    ["ticks", vA(Or(), { size: 88 })],
    ["whirlpool", y()]
  ]);
}
function Zr(A) {
  return OA(
    A,
    _r()
  );
}
function Wr() {
  return k([
    ["discriminator", dA(hA(), 8)],
    ["whirlpool", y()],
    ["positionMint", y()],
    ["liquidity", Z()],
    ["tickLowerIndex", OI()],
    ["tickUpperIndex", OI()],
    ["feeGrowthCheckpointA", Z()],
    ["feeOwedA", L()],
    ["feeGrowthCheckpointB", Z()],
    ["feeOwedB", L()],
    [
      "rewardInfos",
      vA(br(), { size: 3 })
    ]
  ]);
}
function $g(A) {
  return OA(
    A,
    Wr()
  );
}
async function jI(A, I, g) {
  const B = await jr(A, I, g);
  return og(B), B;
}
async function jr(A, I, g) {
  const B = await CB(A, I, g);
  return $g(B);
}
function zr() {
  return k([
    ["discriminator", dA(hA(), 8)],
    ["positionBundleMint", y()],
    ["positionBitmap", dA(hA(), 32)]
  ]);
}
function Pr(A) {
  return OA(
    A,
    zr()
  );
}
function vr() {
  return k([
    ["discriminator", dA(hA(), 8)],
    ["whirlpoolsConfig", y()],
    ["whirlpoolBump", dA(hA(), 1)],
    ["tickSpacing", p()],
    ["feeTierIndexSeed", dA(hA(), 2)],
    ["feeRate", p()],
    ["protocolFeeRate", p()],
    ["liquidity", Z()],
    ["sqrtPrice", Z()],
    ["tickCurrentIndex", OI()],
    ["protocolFeeOwedA", L()],
    ["protocolFeeOwedB", L()],
    ["tokenMintA", y()],
    ["tokenVaultA", y()],
    ["feeGrowthGlobalA", Z()],
    ["tokenMintB", y()],
    ["tokenVaultB", y()],
    ["feeGrowthGlobalB", Z()],
    ["rewardLastUpdatedTimestamp", L()],
    [
      "rewardInfos",
      vA(Tr(), { size: 3 })
    ]
  ]);
}
function WQ(A) {
  return OA(
    A,
    vr()
  );
}
async function NI(A, I, g) {
  const B = await Xr(A, I, g);
  return og(B), B;
}
async function Xr(A, I, g) {
  const B = await CB(A, I, g);
  return WQ(B);
}
async function SB(A, I, g) {
  const B = await $r(A, I, g);
  return VI(B), B;
}
async function $r(A, I, g) {
  return (await lI(A, I, g)).map((C) => WQ(C));
}
var xA = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";
function Aa(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function qA(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: f.READONLY
      });
    const B = g.isWritable ? f.WRITABLE : f.READONLY;
    return Object.freeze({
      address: Aa(g.value),
      role: cC(g.value) ? cg(B) : B,
      ...cC(g.value) ? { signer: g.value } : {}
    });
  };
}
function cC(A) {
  return !!A && typeof A == "object" && "address" in A && yI(A);
}
var Ia = new Uint8Array([
  123,
  134,
  81,
  0,
  49,
  68,
  98,
  98
]);
function ga() {
  return v(
    O([["discriminator", TA(cA(), 8)]]),
    (A) => ({ ...A, discriminator: Ia })
  );
}
function Ba(A, I) {
  const g = I?.programAddress ?? xA, C = {
    positionAuthority: {
      value: A.positionAuthority ?? null,
      isWritable: !1
    },
    receiver: { value: A.receiver ?? null, isWritable: !0 },
    position: { value: A.position ?? null, isWritable: !0 },
    positionMint: { value: A.positionMint ?? null, isWritable: !0 },
    positionTokenAccount: {
      value: A.positionTokenAccount ?? null,
      isWritable: !0
    },
    tokenProgram: { value: A.tokenProgram ?? null, isWritable: !1 }
  };
  C.tokenProgram.value || (C.tokenProgram.value = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
  const Q = qA(g);
  return Object.freeze({
    accounts: [
      Q(C.positionAuthority),
      Q(C.receiver),
      Q(C.position),
      Q(C.positionMint),
      Q(C.positionTokenAccount),
      Q(C.tokenProgram)
    ],
    data: ga().encode({}),
    programAddress: g
  });
}
var Ca = new Uint8Array([1, 182, 135, 59, 155, 25, 99, 223]);
function Qa() {
  return v(
    O([["discriminator", TA(cA(), 8)]]),
    (A) => ({
      ...A,
      discriminator: Ca
    })
  );
}
function Ea(A, I) {
  const g = I?.programAddress ?? xA, C = {
    positionAuthority: {
      value: A.positionAuthority ?? null,
      isWritable: !1
    },
    receiver: { value: A.receiver ?? null, isWritable: !0 },
    position: { value: A.position ?? null, isWritable: !0 },
    positionMint: { value: A.positionMint ?? null, isWritable: !0 },
    positionTokenAccount: {
      value: A.positionTokenAccount ?? null,
      isWritable: !0
    },
    token2022Program: {
      value: A.token2022Program ?? null,
      isWritable: !1
    }
  };
  C.token2022Program.value || (C.token2022Program.value = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
  const Q = qA(g);
  return Object.freeze({
    accounts: [
      Q(C.positionAuthority),
      Q(C.receiver),
      Q(C.position),
      Q(C.positionMint),
      Q(C.positionTokenAccount),
      Q(C.token2022Program)
    ],
    data: Qa().encode(
      {}
    ),
    programAddress: g
  });
}
var ea = new Uint8Array([
  207,
  117,
  95,
  191,
  229,
  180,
  226,
  15
]);
function ia() {
  return v(
    O([
      ["discriminator", TA(cA(), 8)],
      [
        "remainingAccountsInfo",
        sg(wg())
      ]
    ]),
    (A) => ({ ...A, discriminator: ea })
  );
}
function jQ(A, I) {
  const g = I?.programAddress ?? xA, C = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !1 },
    positionAuthority: {
      value: A.positionAuthority ?? null,
      isWritable: !1
    },
    position: { value: A.position ?? null, isWritable: !0 },
    positionTokenAccount: {
      value: A.positionTokenAccount ?? null,
      isWritable: !1
    },
    tokenMintA: { value: A.tokenMintA ?? null, isWritable: !1 },
    tokenMintB: { value: A.tokenMintB ?? null, isWritable: !1 },
    tokenOwnerAccountA: {
      value: A.tokenOwnerAccountA ?? null,
      isWritable: !0
    },
    tokenVaultA: { value: A.tokenVaultA ?? null, isWritable: !0 },
    tokenOwnerAccountB: {
      value: A.tokenOwnerAccountB ?? null,
      isWritable: !0
    },
    tokenVaultB: { value: A.tokenVaultB ?? null, isWritable: !0 },
    tokenProgramA: { value: A.tokenProgramA ?? null, isWritable: !1 },
    tokenProgramB: { value: A.tokenProgramB ?? null, isWritable: !1 },
    memoProgram: { value: A.memoProgram ?? null, isWritable: !1 }
  }, Q = { ...A };
  C.memoProgram.value || (C.memoProgram.value = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  const E = qA(g);
  return Object.freeze({
    accounts: [
      E(C.whirlpool),
      E(C.positionAuthority),
      E(C.position),
      E(C.positionTokenAccount),
      E(C.tokenMintA),
      E(C.tokenMintB),
      E(C.tokenOwnerAccountA),
      E(C.tokenVaultA),
      E(C.tokenOwnerAccountB),
      E(C.tokenVaultB),
      E(C.tokenProgramA),
      E(C.tokenProgramB),
      E(C.memoProgram)
    ],
    data: ia().encode(
      Q
    ),
    programAddress: g
  });
}
var ta = new Uint8Array([
  177,
  107,
  37,
  180,
  160,
  19,
  49,
  209
]);
function na() {
  return v(
    O([
      ["discriminator", TA(cA(), 8)],
      ["rewardIndex", XA()],
      [
        "remainingAccountsInfo",
        sg(wg())
      ]
    ]),
    (A) => ({ ...A, discriminator: ta })
  );
}
function zQ(A, I) {
  const g = I?.programAddress ?? xA, C = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !1 },
    positionAuthority: {
      value: A.positionAuthority ?? null,
      isWritable: !1
    },
    position: { value: A.position ?? null, isWritable: !0 },
    positionTokenAccount: {
      value: A.positionTokenAccount ?? null,
      isWritable: !1
    },
    rewardOwnerAccount: {
      value: A.rewardOwnerAccount ?? null,
      isWritable: !0
    },
    rewardMint: { value: A.rewardMint ?? null, isWritable: !1 },
    rewardVault: { value: A.rewardVault ?? null, isWritable: !0 },
    rewardTokenProgram: {
      value: A.rewardTokenProgram ?? null,
      isWritable: !1
    },
    memoProgram: { value: A.memoProgram ?? null, isWritable: !1 }
  }, Q = { ...A };
  C.memoProgram.value || (C.memoProgram.value = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  const E = qA(g);
  return Object.freeze({
    accounts: [
      E(C.whirlpool),
      E(C.positionAuthority),
      E(C.position),
      E(C.positionTokenAccount),
      E(C.rewardOwnerAccount),
      E(C.rewardMint),
      E(C.rewardVault),
      E(C.rewardTokenProgram),
      E(C.memoProgram)
    ],
    data: na().encode(
      Q
    ),
    programAddress: g
  });
}
var oa = new Uint8Array([
  58,
  127,
  188,
  62,
  79,
  82,
  196,
  96
]);
function ra() {
  return v(
    O([
      ["discriminator", TA(cA(), 8)],
      ["liquidityAmount", jg()],
      ["tokenMinA", MA()],
      ["tokenMinB", MA()],
      [
        "remainingAccountsInfo",
        sg(wg())
      ]
    ]),
    (A) => ({
      ...A,
      discriminator: oa
    })
  );
}
function PQ(A, I) {
  const g = I?.programAddress ?? xA, C = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !0 },
    tokenProgramA: { value: A.tokenProgramA ?? null, isWritable: !1 },
    tokenProgramB: { value: A.tokenProgramB ?? null, isWritable: !1 },
    memoProgram: { value: A.memoProgram ?? null, isWritable: !1 },
    positionAuthority: {
      value: A.positionAuthority ?? null,
      isWritable: !1
    },
    position: { value: A.position ?? null, isWritable: !0 },
    positionTokenAccount: {
      value: A.positionTokenAccount ?? null,
      isWritable: !1
    },
    tokenMintA: { value: A.tokenMintA ?? null, isWritable: !1 },
    tokenMintB: { value: A.tokenMintB ?? null, isWritable: !1 },
    tokenOwnerAccountA: {
      value: A.tokenOwnerAccountA ?? null,
      isWritable: !0
    },
    tokenOwnerAccountB: {
      value: A.tokenOwnerAccountB ?? null,
      isWritable: !0
    },
    tokenVaultA: { value: A.tokenVaultA ?? null, isWritable: !0 },
    tokenVaultB: { value: A.tokenVaultB ?? null, isWritable: !0 },
    tickArrayLower: { value: A.tickArrayLower ?? null, isWritable: !0 },
    tickArrayUpper: { value: A.tickArrayUpper ?? null, isWritable: !0 }
  }, Q = { ...A };
  C.memoProgram.value || (C.memoProgram.value = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  const E = qA(g);
  return Object.freeze({
    accounts: [
      E(C.whirlpool),
      E(C.tokenProgramA),
      E(C.tokenProgramB),
      E(C.memoProgram),
      E(C.positionAuthority),
      E(C.position),
      E(C.positionTokenAccount),
      E(C.tokenMintA),
      E(C.tokenMintB),
      E(C.tokenOwnerAccountA),
      E(C.tokenOwnerAccountB),
      E(C.tokenVaultA),
      E(C.tokenVaultB),
      E(C.tickArrayLower),
      E(C.tickArrayUpper)
    ],
    data: ra().encode(
      Q
    ),
    programAddress: g
  });
}
var aa = new Uint8Array([239, 251, 9, 124, 210, 198, 53, 43]);
function sa() {
  return v(
    O([
      ["discriminator", TA(cA(), 8)],
      ["method", Yr()],
      [
        "remainingAccountsInfo",
        sg(wg())
      ]
    ]),
    (A) => ({
      ...A,
      discriminator: aa
    })
  );
}
function ca(A, I) {
  const g = I?.programAddress ?? xA, C = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !0 },
    tokenProgramA: { value: A.tokenProgramA ?? null, isWritable: !1 },
    tokenProgramB: { value: A.tokenProgramB ?? null, isWritable: !1 },
    memoProgram: { value: A.memoProgram ?? null, isWritable: !1 },
    positionAuthority: {
      value: A.positionAuthority ?? null,
      isWritable: !1
    },
    position: { value: A.position ?? null, isWritable: !0 },
    positionTokenAccount: {
      value: A.positionTokenAccount ?? null,
      isWritable: !1
    },
    tokenMintA: { value: A.tokenMintA ?? null, isWritable: !1 },
    tokenMintB: { value: A.tokenMintB ?? null, isWritable: !1 },
    tokenOwnerAccountA: {
      value: A.tokenOwnerAccountA ?? null,
      isWritable: !0
    },
    tokenOwnerAccountB: {
      value: A.tokenOwnerAccountB ?? null,
      isWritable: !0
    },
    tokenVaultA: { value: A.tokenVaultA ?? null, isWritable: !0 },
    tokenVaultB: { value: A.tokenVaultB ?? null, isWritable: !0 },
    tickArrayLower: { value: A.tickArrayLower ?? null, isWritable: !0 },
    tickArrayUpper: { value: A.tickArrayUpper ?? null, isWritable: !0 }
  }, Q = { ...A };
  C.memoProgram.value || (C.memoProgram.value = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  const E = qA(g);
  return Object.freeze({
    accounts: [
      E(C.whirlpool),
      E(C.tokenProgramA),
      E(C.tokenProgramB),
      E(C.memoProgram),
      E(C.positionAuthority),
      E(C.position),
      E(C.positionTokenAccount),
      E(C.tokenMintA),
      E(C.tokenMintB),
      E(C.tokenOwnerAccountA),
      E(C.tokenOwnerAccountB),
      E(C.tokenVaultA),
      E(C.tokenVaultB),
      E(C.tickArrayLower),
      E(C.tickArrayUpper)
    ],
    data: sa().encode(
      Q
    ),
    programAddress: g
  });
}
var Da = new Uint8Array([
  41,
  33,
  165,
  200,
  120,
  231,
  142,
  50
]);
function wa() {
  return v(
    O([
      ["discriminator", TA(cA(), 8)],
      ["startTickIndex", Wg()],
      ["idempotent", tB()]
    ]),
    (A) => ({
      ...A,
      discriminator: Da
    })
  );
}
function DC(A, I) {
  const g = I?.programAddress ?? xA, C = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !1 },
    funder: { value: A.funder ?? null, isWritable: !0 },
    tickArray: { value: A.tickArray ?? null, isWritable: !0 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 }
  }, Q = { ...A };
  C.systemProgram.value || (C.systemProgram.value = "11111111111111111111111111111111");
  const E = qA(g);
  return Object.freeze({
    accounts: [
      E(C.whirlpool),
      E(C.funder),
      E(C.tickArray),
      E(C.systemProgram)
    ],
    data: wa().encode(
      Q
    ),
    programAddress: g
  });
}
var ua = new Uint8Array(
  [212, 47, 95, 92, 114, 102, 131, 250]
);
function la() {
  return v(
    O([
      ["discriminator", TA(cA(), 8)],
      ["tickLowerIndex", Wg()],
      ["tickUpperIndex", Wg()],
      ["withTokenMetadataExtension", tB()]
    ]),
    (A) => ({
      ...A,
      discriminator: ua
    })
  );
}
function da(A, I) {
  const g = I?.programAddress ?? xA, C = {
    funder: { value: A.funder ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 },
    position: { value: A.position ?? null, isWritable: !0 },
    positionMint: { value: A.positionMint ?? null, isWritable: !0 },
    positionTokenAccount: {
      value: A.positionTokenAccount ?? null,
      isWritable: !0
    },
    whirlpool: { value: A.whirlpool ?? null, isWritable: !1 },
    token2022Program: {
      value: A.token2022Program ?? null,
      isWritable: !1
    },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 },
    associatedTokenProgram: {
      value: A.associatedTokenProgram ?? null,
      isWritable: !1
    },
    metadataUpdateAuth: {
      value: A.metadataUpdateAuth ?? null,
      isWritable: !1
    }
  }, Q = { ...A };
  C.token2022Program.value || (C.token2022Program.value = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"), C.systemProgram.value || (C.systemProgram.value = "11111111111111111111111111111111"), C.associatedTokenProgram.value || (C.associatedTokenProgram.value = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), C.metadataUpdateAuth.value || (C.metadataUpdateAuth.value = "3axbTs2z5GBy6usVbNVoqEgZMng3vZvMnAoX29BFfwhr");
  const E = qA(g);
  return Object.freeze({
    accounts: [
      E(C.funder),
      E(C.owner),
      E(C.position),
      E(C.positionMint),
      E(C.positionTokenAccount),
      E(C.whirlpool),
      E(C.token2022Program),
      E(C.systemProgram),
      E(C.associatedTokenProgram),
      E(C.metadataUpdateAuth)
    ],
    data: la().encode(
      Q
    ),
    programAddress: g
  });
}
var ha = new Uint8Array([
  154,
  230,
  250,
  13,
  236,
  209,
  75,
  223
]);
function ya() {
  return v(
    O([["discriminator", TA(cA(), 8)]]),
    (A) => ({
      ...A,
      discriminator: ha
    })
  );
}
function Na(A, I) {
  const g = I?.programAddress ?? xA, C = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !0 },
    position: { value: A.position ?? null, isWritable: !0 },
    tickArrayLower: { value: A.tickArrayLower ?? null, isWritable: !1 },
    tickArrayUpper: { value: A.tickArrayUpper ?? null, isWritable: !1 }
  }, Q = qA(g);
  return Object.freeze({
    accounts: [
      Q(C.whirlpool),
      Q(C.position),
      Q(C.tickArrayLower),
      Q(C.tickArrayUpper)
    ],
    data: ya().encode({}),
    programAddress: g
  });
}
var vQ = L().decode(
  Vr
), Sa = L().decode(
  Hr
);
function fa(A) {
  if ("initialized" in A)
    return A;
  switch (A.__kind) {
    case "Uninitialized":
      return {
        initialized: !1,
        liquidityGross: 0n,
        liquidityNet: 0n,
        feeGrowthOutsideA: 0n,
        feeGrowthOutsideB: 0n,
        rewardGrowthsOutside: [0n, 0n, 0n]
      };
    case "Initialized":
      return {
        initialized: !0,
        liquidityGross: A.fields[0].liquidityGross,
        liquidityNet: A.fields[0].liquidityNet,
        feeGrowthOutsideA: A.fields[0].feeGrowthOutsideA,
        feeGrowthOutsideB: A.fields[0].feeGrowthOutsideB,
        rewardGrowthsOutside: A.fields[0].rewardGrowthsOutside
      };
  }
}
function wC(A) {
  if ("exists" in A && !A.exists)
    return A;
  const g = L().decode(
    A.data.discriminator.subarray(0, 8)
  ) === vQ ? "Fixed" : "Dynamic";
  return {
    ...A,
    data: {
      __kind: g,
      ...A.data,
      ticks: A.data.ticks.map(fa)
    }
  };
}
function Ra(A) {
  if ("exists" in A && !A.exists)
    return A;
  const I = L().decode(
    A.data.subarray(0, 8)
  );
  switch (I) {
    case vQ:
      return wC(Zr(A));
    case Sa:
      return wC(qr(A));
    default:
      throw new Error(`Unknown discriminator: ${I}`);
  }
}
async function XQ(A, I, g) {
  const B = await $Q(A, I, g);
  return VI(B), B;
}
async function $Q(A, I, g) {
  return (await lI(A, I, g)).map((C) => Ra(C));
}
async function SI(A, I = YA.programId) {
  return await dI({
    programAddress: I,
    seeds: ["position", CA().encode(A)]
  });
}
async function ka(A, I = YA.programId) {
  return await dI({
    programAddress: I,
    seeds: ["position_bundle", CA().encode(A)]
  });
}
async function Ma(A, I, g = YA.programId) {
  return await dI({
    programAddress: g,
    seeds: [
      "bundled_position",
      CA().encode(A),
      Buffer.from(I.toString())
    ]
  });
}
async function JA(A, I, g = YA.programId) {
  return await dI({
    programAddress: g,
    seeds: [
      "tick_array",
      CA().encode(A),
      `${I}`
    ]
  });
}
function uC() {
  return 148;
}
var Ga = 6, Fa = 8078e3, Ua = 8078001;
function AE(A) {
  return Array.isArray(A) ? "%5B" + A.map(AE).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof A == "bigint" ? `${A}n` : encodeURIComponent(
    String(
      A != null && Object.getPrototypeOf(A) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...A }
      ) : A
    )
  );
}
function ma([A, I]) {
  return `${A}=${AE(I)}`;
}
function Ja(A) {
  const I = Object.entries(A).map(ma).join("&");
  return btoa(I);
}
function pa(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${Ja(I)}'`), `${g}\``;
  }
}
var fB = class extends Error {
  /**
   * Indicates the root cause of this {@link SolanaError}, if any.
   *
   * For example, a transaction error might have an instruction error as its root cause. In this
   * case, you will be able to access the instruction error on the transaction error as `cause`.
   */
  cause = this.cause;
  /**
   * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
   */
  context;
  constructor(...[A, I]) {
    let g, B;
    I && Object.entries(Object.getOwnPropertyDescriptors(I)).forEach(([Q, E]) => {
      Q === "cause" ? B = { cause: E.value } : (g === void 0 && (g = {
        __code: A
      }), Object.defineProperty(g, Q, E));
    });
    const C = pa(A, g);
    super(C, B), this.context = Object.freeze(
      g === void 0 ? {
        __code: A
      } : g
    ), this.name = "SolanaError";
  }
};
function IE(A) {
  return Object.freeze({
    ...A,
    decode: (I, g = 0) => A.read(I, g)[0]
  });
}
function Ya(A, I, g = 0) {
  if (I.length - g <= 0)
    throw new fB(Fa, {
      codecDescription: A
    });
}
function La(A, I, g, B = 0) {
  const C = g.length - B;
  if (C < I)
    throw new fB(Ua, {
      bytesLength: C,
      codecDescription: A,
      expected: I
    });
}
function ba(A, I, g) {
  const B = A.byteOffset + (I ?? 0), C = g ?? A.byteLength;
  let Q;
  return typeof SharedArrayBuffer > "u" ? Q = A.buffer : A.buffer instanceof SharedArrayBuffer ? (Q = new ArrayBuffer(A.length), new Uint8Array(Q).set(new Uint8Array(A))) : Q = A.buffer, (B === 0 || B === -A.byteLength) && C === A.byteLength ? Q : Q.slice(B, B + C);
}
function Ka(A, I) {
  return IE({
    ...A,
    read: (g, B) => {
      const [C, Q] = A.read(g, B);
      return [I(C, g, B), Q];
    }
  });
}
function Oa(A) {
  return A?.endian !== 1;
}
function Ta(A) {
  return IE({
    fixedSize: A.size,
    read(I, g = 0) {
      Ya(A.name, I, g), La(A.name, A.size, I, g);
      const B = new DataView(ba(I, g, A.size));
      return [A.get(B, Oa(A.config)), g + A.size];
    }
  });
}
var Ha = (A = {}) => Ta({
  config: A,
  get: (I, g) => I.getBigUint64(0, g),
  name: "u64",
  size: 8
}), xa = 18446744073709551615n, Og;
function qa() {
  return Og || (Og = Ha()), Og;
}
function Va(A) {
  if (A < 0 || A > xa)
    throw new fB(Ga);
}
function _a(A) {
  return Va(A), A;
}
function Za() {
  return Wa(qa());
}
function Wa(A) {
  return Ka(
    A,
    (I) => _a(typeof I == "bigint" ? I : BigInt(I))
  );
}
var ja = "SysvarRent111111111111111111111111111111111";
async function za(A, I, g) {
  return await CB(A, I, g);
}
function Pa() {
  return k([
    ["lamportsPerByteYear", Za()],
    ["exemptionThreshold", Zg()],
    ["burnPercent", rB()]
  ]);
}
async function va(A, I) {
  const g = await za(A, ja, I);
  return og(g), OA(g, Pa()).data;
}
const Xa = "data:application/wasm;base64,AGFzbQEAAAABjAM0YAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gAX8AYAN/f38AYAABf2AFf39/f38AYAR/f39/AGADf35/AGAFf39/fn8AYAh/f39/f39/fwBgCH9+f39/f39/AGAEf39/fwF/YAV/fn5+fgBgBH9+fn8AYAN8f38Bf2ADf39/AXxgBX9/f39/AX9gAX4Bf2AIf35+fn5+fn8AYAZ/f39/f38Bf2AKf35/f39/f35/fwBgBn9+fn5+fgBgBn9/f39/fwBgAXwBf2ABfwF8YAJ+fgF/YAJ8fAF8YAh/fn9/f39+fwBgCX9/f39/fn9/fwBgB39/f39/f38AYAF8AXxgCX9/f39/f35+fgBgCH9+fn5+f39/AGADfn9/AX9gB39/f39/f38Bf2ADf35+AGADf35/AX9gAn9/AXxgAABgCX9+fn5+fn5/fwBgA39/fABgBX9/fX9/AGAEf31/fwBgBX9/fn9/AGAEf35/fwBgBX9/fH9/AGAEf3x/fwBgBH9/fn4AYAN8f38BfGAAAX4C1BoxKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmluZGdlbl9vYmplY3RfZHJvcF9yZWYABCguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fc3RyaW5nX25ldwAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMcX193YmluZGdlbl9iaWdpbnRfZ2V0X2FzX2k2NAABKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzEF9fd2JpbmRnZW5fdGhyb3cAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzEV9fd2JpbmRnZW5fbWVtb3J5AAYoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxVfX3diaW5kZ2VuX3N0cmluZ19nZXQAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX2dldF82N2IyYmE2MmZjMzBkZTEyAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxpfX3diZ19nZXRfYjliOTMwNDdmZTNjZjQ1YgAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMdX193YmdfbGVuZ3RoX2UyZDJhNDkxMzJjMWIyNTYAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JpbmRnZW5fb2JqZWN0X2Nsb25lX3JlZgADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMWX193YmluZGdlbl9pc19mdW5jdGlvbgADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3Xzc4ZmViMTA4YjY0NzI3MTMABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX25ldwAZKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMUX193YmluZGdlbl9pc19vYmplY3QAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JnX25leHRfMjVmZWFkZmMwOTEzZmVhOQADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMbX193YmdfbmV4dF82NTc0ZTFhOGE2MmQxMDU1AAMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxtfX3diZ19kb25lXzc2OWU1ZWRlNGIzMWM2N2IAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzHF9fd2JnX3ZhbHVlX2NkMWZmYTdiMWFiNzk0ZjEAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzH19fd2JnX2l0ZXJhdG9yXzlhMjRjODhkZjg2MGRjNjUABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JnX2NhbGxfNjcyYTRkMjE2MzRkNGEyNAAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3XzQwNWUyMmYzOTA1NzZjZTIABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX2dldAABKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMXX193YmluZGdlbl9pc191bmRlZmluZWQAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX3NldF8zNzgzNzAyM2YzZDc0MGU4AAUoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx5fX3diZ19pc0FycmF5X2ExZWFiN2UwZDA2NzM5MWIAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzLV9fd2JnX2luc3RhbmNlb2ZfQXJyYXlCdWZmZXJfZTE0NTg1NDMyZTM3MzdmYwADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMkX193YmdfaXNTYWZlSW50ZWdlcl8zNDNlMmJlZWVlY2UxYmIwAAMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx1fX3diZ19idWZmZXJfNjA5Y2MzZWVlNTFlZDE1OAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3X2ExMjAwMmE3ZjkxYzc1YmUAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX3NldF82NTU5NWJkZDg2OGIzMDA5AAUoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx1fX3diZ19sZW5ndGhfYTQ0NjE5M2RjMjJjMTJmOAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMsX193YmdfaW5zdGFuY2VvZl9VaW50OEFycmF5XzE3MTU2YmNmMTE4MDg2YTkAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGV9fd2JpbmRnZW5fanN2YWxfbG9vc2VfZXEAACguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFF9fd2JpbmRnZW5fYXNfbnVtYmVyABooLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxRfX3diaW5kZ2VuX2Vycm9yX25ldwAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmluZGdlbl9iaWdpbnRfZnJvbV9pNjQAEyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JpbmRnZW5fYmlnaW50X2Zyb21fdTY0ABMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxtfX3diaW5kZ2VuX2JpZ2ludF9mcm9tX3UxMjgAGyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzJF9fd2JnX2dldHdpdGhyZWZrZXlfMWRjMzYxYmQxMDA1M2JmZQAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMdX193YmdfU3RyaW5nX2VlY2M0YTExOTg3MTI3ZDYAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzJF9fd2JnX2dldHdpdGhyZWZrZXlfNjU1MGIyYzA5M2QyZWIxOAAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193Ymdfc2V0XzM4MDdkNWYwYmZjMjRhYTcABSguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzDl9fd2JpbmRnZW5fc2hyAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxNfX3diaW5kZ2VuX2pzdmFsX2VxAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcw1fX3diaW5kZ2VuX2luAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxRfX3diaW5kZ2VuX2lzX2JpZ2ludAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMTX193YmluZGdlbl9pc19hcnJheQADA+8C7QIDCAMBHB0BAQEBDgcKCx4AFAofBRUCCwEFAiAEFhYXAAIAAAICAgIDAAEBDwcBAgELDAwLDAwhIgABBSMFBQkAFCQBARgAAAEIJQEBAQEBAQEBAQEBAAAAAAAAAQAJFwUmAQUFCQEBAQcFAwMFAQEAAQEBCQEBBwEBAwEJAgEBAQEFAQEFAgAAAAIBAQEBAQgAAwEDDgAHBAAQAAMAAgIKCgcHGAEFAgECAgkCDw8JAicAAAAAAAAHBwQICAgRAAQEAgUBASgCAAECAQEFKQUAAQEAEg4FAAQEBAQEBAQEBAQEBAQEBAQBAQQEAAANAAAEAAEECAAAFSoEBysSLS8NAAAIAgAEAQMDAgUFBA0AAgQxAgIABwABAQEAAAAABQAAAAUBAAMDAwEFBQAEAAMDBRAREAADAAEAAAEAAgEAETIAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAAMDAAAAAAAAAAAGBgYGAwYGBgYGMwQFAXABbW0FAwEAEQYJAX8BQYCAwAALB5AQUAZtZW1vcnkCABpnZXRUaWNrQXJyYXlTdGFydFRpY2tJbmRleACIAxR0aWNrSW5kZXhUb1NxcnRQcmljZQCJAxRzcXJ0UHJpY2VUb1RpY2tJbmRleACXAxlnZXRJbml0aWFsaXphYmxlVGlja0luZGV4ALoCHWdldFByZXZJbml0aWFsaXphYmxlVGlja0luZGV4AIcCHWdldE5leHRJbml0aWFsaXphYmxlVGlja0luZGV4AJwCE2lzVGlja0luZGV4SW5Cb3VuZHMA1gITaXNUaWNrSW5pdGlhbGl6YWJsZQCxAg9pbnZlcnRUaWNrSW5kZXgAigMPaW52ZXJ0U3FydFByaWNlANcCF2dldEZ1bGxSYW5nZVRpY2tJbmRleGVzAMIBEG9yZGVyVGlja0luZGV4ZXMAzQEPaXNGdWxsUmFuZ2VPbmx5ANgCE2dldFRpY2tJbmRleEluQXJyYXkAwAEQY29sbGVjdEZlZXNRdW90ZQBDHV9SRURVQ1RJT05fRkFDVE9SX0RFTk9NSU5BVE9SAJkDKF9BREFQVElWRV9GRUVfQ09OVFJPTF9GQUNUT1JfREVOT01JTkFUT1IAmgMSX01BWF9SRUZFUkVOQ0VfQUdFAJ0DHV9USUNLX0FSUkFZX05PVF9FVkVOTFlfU1BBQ0VEAIgCGV9USUNLX0lOREVYX09VVF9PRl9CT1VORFMAiQITX0lOVkFMSURfVElDS19JTkRFWACKAhRfQVJJVEhNRVRJQ19PVkVSRkxPVwCLAhdfQU1PVU5UX0VYQ0VFRFNfTUFYX1U2NACMAhlfU1FSVF9QUklDRV9PVVRfT0ZfQk9VTkRTAI0CFF9USUNLX1NFUVVFTkNFX0VNUFRZAI4CH19TUVJUX1BSSUNFX0xJTUlUX09VVF9PRl9CT1VORFMAjwIjX0lOVkFMSURfU1FSVF9QUklDRV9MSU1JVF9ESVJFQ1RJT04AkAIVX1pFUk9fVFJBREFCTEVfQU1PVU5UAJECEl9JTlZBTElEX1RJTUVTVEFNUACSAhVfSU5WQUxJRF9UUkFOU0ZFUl9GRUUAkwIbX0lOVkFMSURfU0xJUFBBR0VfVE9MRVJBTkNFAJQCGF9USUNLX0lOREVYX05PVF9JTl9BUlJBWQCVAhxfSU5WQUxJRF9USUNLX0FSUkFZX1NFUVVFTkNFAJYCGl9JTlZBTElEX0FEQVBUSVZFX0ZFRV9JTkZPAJcCJF9WT0xBVElMSVRZX0FDQ1VNVUxBVE9SX1NDQUxFX0ZBQ1RPUgCZAxRfRkVFX1JBVEVfSEFSRF9MSU1JVACaAxZkZWNyZWFzZUxpcXVpZGl0eVF1b3RlAGEXZGVjcmVhc2VMaXF1aWRpdHlRdW90ZUEAYhdkZWNyZWFzZUxpcXVpZGl0eVF1b3RlQgBjFmluY3JlYXNlTGlxdWlkaXR5UXVvdGUAZBdpbmNyZWFzZUxpcXVpZGl0eVF1b3RlQQBlF2luY3JlYXNlTGlxdWlkaXR5UXVvdGVCAGYMX05VTV9SRVdBUkRTAJgDHGlzSW5pdGlhbGl6ZWRXaXRoQWRhcHRpdmVGZWUAzAETY29sbGVjdFJld2FyZHNRdW90ZQA/EnRyeUdldEFtb3VudERlbHRhQQDSARJ0cnlHZXRBbW91bnREZWx0YUIA0wEYdHJ5R2V0TmV4dFNxcnRQcmljZUZyb21BANABGHRyeUdldE5leHRTcXJ0UHJpY2VGcm9tQgDRARN0cnlBcHBseVRyYW5zZmVyRmVlAG8adHJ5UmV2ZXJzZUFwcGx5VHJhbnNmZXJGZWUApAEkdHJ5R2V0TWF4QW1vdW50V2l0aFNsaXBwYWdlVG9sZXJhbmNlAI4BJHRyeUdldE1pbkFtb3VudFdpdGhTbGlwcGFnZVRvbGVyYW5jZQCsAQ90cnlBcHBseVN3YXBGZWUAlQEWdHJ5UmV2ZXJzZUFwcGx5U3dhcEZlZQDbARVzd2FwUXVvdGVCeUlucHV0VG9rZW4ATRZzd2FwUXVvdGVCeU91dHB1dFRva2VuAE4QX1RJQ0tfQVJSQVlfU0laRQCTAydfRlVMTF9SQU5HRV9PTkxZX1RJQ0tfU1BBQ0lOR19USFJFU0hPTEQAlAMPX01JTl9USUNLX0lOREVYAJsDD19NQVhfVElDS19JTkRFWACcAxBwcmljZVRvU3FydFByaWNlAOICEHNxcnRQcmljZVRvUHJpY2UA8AILaW52ZXJ0UHJpY2UA8QIQdGlja0luZGV4VG9QcmljZQDjAhBwcmljZVRvVGlja0luZGV4AOQCGmdldFNxcnRQcmljZVNsaXBwYWdlQm91bmRzALgBH2ZpcnN0VW5vY2N1cGllZFBvc2l0aW9uSW5CdW5kbGUA4QEUaXNQb3NpdGlvbkJ1bmRsZUZ1bGwA5gEVaXNQb3NpdGlvbkJ1bmRsZUVtcHR5AOcBFV9QT1NJVElPTl9CVU5ETEVfU0laRQCVAxVfRkVFX1JBVEVfREVOT01JTkFUT1IAlgMRaXNQb3NpdGlvbkluUmFuZ2UAwwIOcG9zaXRpb25TdGF0dXMA4AENcG9zaXRpb25SYXRpbwDXARNfX3diaW5kZ2VuX2V4cG9ydF8wAIACE19fd2JpbmRnZW5fZXhwb3J0XzEAngITX193YmluZGdlbl9leHBvcnRfMgDBAh9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyAOYCCdkBAQBBAQtsnQLcAtgBtgL3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KQPAA3wiASADVK18IAEgASAEQegDaikDACACIAQpA+ADfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgCBxBEAgBEGwA2ogAUIAQuX3xebz8438BEIAEMUBIARBkANqIAJCAELl98Xm8/ON/ARCABDFASAEQaADaiABQgBC2te40RNCABDFASAEQYADaiACQgBC2te40RNCABDFASAEQYgDaikDACAEQZgDaikDACAEQbgDaikDACIBIAQpA5ADfCICIAFUrXwiAyAEKQOAA3wiASADVK18IAEgASAEQagDaikDACACIAQpA6ADfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgMAAcQRAIARB8AJqIAFCAELC1sq/55/qhp5/QgAQxQEgBEHQAmogAkIAQsLWyr/nn+qGnn9CABDFASAEQeACaiABQgBC5pfVjBhCABDFASAEQcACaiACQgBC5pfVjBhCABDFASAEQcgCaikDACAEQdgCaikDACAEQfgCaikDACIBIAQpA9ACfCICIAFUrXwiAyAEKQPAAnwiASADVK18IAEgASAEQegCaikDACACIAQpA+ACfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgIABcQRAIARBsAJqIAFCAEL30JSBiNKArRhCABDFASAEQZACaiACQgBC99CUgYjSgK0YQgAQxQEgBEGgAmogAUIAQt3KiaYkQgAQxQEgBEGAAmogAkIAQt3KiaYkQgAQxQEgBEGIAmopAwAgBEGYAmopAwAgBEG4AmopAwAiASAEKQOQAnwiAiABVK18IgMgBCkDgAJ8IgEgA1StfCABIAEgBEGoAmopAwAgAiAEKQOgAnwiAyACVK18fCIBVq18QiCGIAFCIIiEIQIgAUIghiADQiCIhCEBCyAAQYCAAnEEQCAEQfABaiABQgBC6POdi8bj1smff0IAEMUBIARB0AFqIAJCAELo852LxuPWyZ9/QgAQxQEgBEHgAWogAUIAQuvdhazSAEIAEMUBIARBwAFqIAJCAELr3YWs0gBCABDFASAEQcgBaikDACAEQdgBaikDACAEQfgBaikDACIBIAQpA9ABfCICIAFUrXwiAyAEKQPAAXwiASADVK18IAEg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NwM4IAEgEzcDKCABIBQ3AxggASAEQZgBaikDADcDaCABIARBiAFqKQMANwNYDAELIAEgBCgCUDYCBCABQQE2AgALIAQoAggiAUGDAU0NACABEAALIAQoAgQiAUGDAUsEQCABEAALIARBsAFqJAAgAigCgAJFBEAgAkEwaiANIA5B4AAQSkHgABBKGkIBIRMMCwsgAigChAIhASAAQQE2AgAgACABNgIEDA0LDA4LIAIoAhwgAkEANgIcBEAgAkGAAmogAigCIBCfASACKAKAAkUEQCACKQOIAiEoQgEhHwwKCyACKAKEAiEBIABBATYCACAAIAE2AgQMDAsMDQsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhICACKQOQAiEhQgEhHgwJCyACKAKEAiEBIABBATYCACAAIAE2AgQMCwsMDAsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhIiACKQOQAiEjQgEhHQwICyACKAKEAiEBIABBATYCACAAIAE2AgQMCgsMCwsgAigCHCACQQA2AhwEQCACQQhqIAIoAiAQ9QFBASELIAIoAgwhDCACKAIIRQ0GIABBATYCACAAIAw2AgQMCQsMCgsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhJCACKQOQAiElQgEhHAwGCyACKAKEAiEBIABBATYCACAAIAE2AgQMCAsMCQsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhJiACKQOQAiEnQgEhGwwFCyACKAKEAiEBIABBATYCACAAIAE2AgQMBwsMCAsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEJkCIAIvAYACRQRAIAIvAYICIRBBASEKDAQLIAIoAoQCIQEgAEEBNgIAIAAgATYCBAwGCwwHCyACKAIcIAJBADYCHARAIAJBgAJqIAIoAiAQmQIgAi8BgAJFBEAgAi8BggIhEUEBIQkMAwsgAigChAIhASAAQQE2AgAgACABNgIEDAULDAYLIAIoAhwgAkEANgIcBEAgAkGAAmogAigCIBCZAiACLwGAAkUEQCACLwGCAiESQQEhCAwCCyACKAKEAiEBIABBATYCACAAIAE2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IAFBATYCACABIAQ2AgQMAQsgAyAFOgAMIAMgBDYCCCADQRBqIANBCGoQrwECQAJAIAMpAxgiCiADKQMQIgtCAoWEUEUEQCAKIAuEUEUNAUEAIANB/wBqQcDfwAAQzgEhBCABQQE2AgAgASAENgIEDAILIAEgAygCIDYCBCABQQE2AgAMAQsgA0EoaikDACEKIAMpAyAhCyADQTBqIANBCGoQrwEgAykDOCIMIAMpAzAiDUIChYRQRQRAIAwgDYRQBEBBASADQf8AakHA38AAEM4BIQQgAUEBNgIAIAEgBDYCBAwCCyADQcgAaikDACEMIAMpA0AhDSADQdAAaiADQQhqEK8BAkAgAygCUCIEQQNxQQNGDQACfwJAAkAgBEEBaw4CAwEAC0ECIANB/wBqQcDfwAAQzgEMAQsgAygCYAshBCABQQE2AgAgASAENgIEDAILIAEgAykDYDcDMCABIA03AyAgASALNwMQIAFBADYCACABIAw3AyggASAKNwMYIAEgA0HoAGopAwA3AzgMAQsgASADKAJANgIEIAFBATYCAAsgAygCCCIBQYMBTQ0AIAEQAAsgAygCBCIBQYMBSwRAIAEQAAsgA0GAAWokACACKAKQAUUEQCACQSBqIAggCUEwEEpBMBBKGkIBIQoMBwsgAigClAEhASAAQQI6AHAgACABNgIADAoLDAsLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRIgAikDoAEhE0IBIREMBgsgAigClAEhASAAQQI6AHAgACABNgIADAkLDAoLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRQgAikDoAEhFUIBIRAMBQsgAigClAEhASAAQQI6AHAgACABNgIADAgLDAkLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRYgAikDoAEhF0IBIQ8MBAsgAigClAEhASAAQQI6AHAgACABNgIADAcLDAgLIAIoAgwgAkEANgIMBEAgAkGQAWohAyACKAIQIQQjAEEwayIBJAAgASAENgIMAkAgBBAvQQFHBEAgAUEMaiABQRBqQaDgwAAQVCEFIANBATYCACADIAU2AgQgBEGEAUkNASAEEAAMAQsgAUEQaiAEEJYBIAEoAhAiBEUEQCADIAEpAyA3AxAgA0EANgIAIAMgAUEoaikDADcDGCAERQ0BIAEoAhQiA0GEAUkNASADEAAMAQtByOLAAEHLABDGASEEIANBATYCACADIAQ2AgQgASgCFCIDQYQBSQ0AIAMQAAsgAUEwaiQAIAIoApABRQRAIAcpAwAhGCACKQOgASEZQgEhDgwDCyACKAKUASEBIABBAjoAcCAAIAE2AgAMBgsMBwsgAigCDCACQQA2AgxFDQYgAkGQAWohBCACKAIQIQFBACEGIwBBEGsiAyQAIAMgATYCCAJAQQFBAiABECIiBUEBRhtBACAFGyIFQQJHBEAgBCAFOgABDAELIAQgA0EIaiADQQ9qQcDgwAAQVDYCBEEBIQYLIAQgBjoAACABQYQBTwRAIAEQAAsgA0EQaiQAIAItAJABDQMgAi0AkQEhBgsgAkGQAWogAkEMahB+IAItAJABRQ0ACwsgAigClAEhASAAQQI6AHAgACABNgIADAELIAIoApQBIQEgAEECOgBwIAAgATYCAAsgAkEMahChAgsgAkHQAWokAA8LQer7wABBMRDuAgALrxQCCH8QfiMAQdABayICJAAgAiABNgIIAkACQCABEA5BAUcEQCACQQhqIAJBkAFqQbDgwAAQVSEDIABBAjoAcCAAIAM2AgAgAUGEAUkNASABEAAMAQsgAkEMaiIDIAFB7PDAAEEGEKUCIAJBkAFqIAMQgQECQAJAIAItAJABRQRAIAJB4ABqIQggAkGgAWohCSACQagBaiEHQQIhBgNAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAItAJEBQQFrDgcCAwQFBgEHAAsgBkECRg0MQbXowABBCxDlASEBIABBAjoAcCAAIAE2AgAMEQsgAiACQQxqEIICDAwLIA5QDQlBwOjAAEEMEOUBIQEgAEECOgBwIAAgATYCAAwPCyAPUA0HQczowABBDhDlASEBIABBAjoAcCAAIAE2AgAMDgsgEFANBUHa6MAAQREQ5QEhASAAQQI6AHAgACABNgIADA0LIBFQDQNB6+jAAEEREOUBIQEgAEECOgBwIAAgATYCAAwMCyAKUA0BQfzowABBFBDlASEBIABBAjoAcCAAIAE2AgAMCwsgBkECRwRAIA5QBEBBwOjAAEEMEOMBIQEgAEECOgBwIAAgATYCAAwMCyAPUARAQczowABBDhDjASEBIABBAjoAcCAAIAE2AgAMDAsgEFAEQEHa6MAAQREQ4wEhASAAQQI6AHAgACABNgIADAwLIBFQBEBB6+jAAEEREOMBIQEgAEECOgBwIAAgATYCAAwMCyAKUARAQfzowABBFBDjASEBIABBAjoAcCAAIAE2AgAMDAsgAEFAayACQSBqQTAQShogACASNwM4IAAgEzcDMCAAIBQ3AyggACAVNwMgIAAgFjcDGCAAIBc3AxAgACAYNwMIIAAgGTcDACAAIAZBAXE6AHAMCwtBtejAAEELEOMBIQEgAEECOgBwIAAgATYCAAwKCyACKAIMIAJBADYCDARAIAJBkAFqIQEgAigCECEEIwBBgAFrIgMkACADIAQ2AgQCQCADQQRqIgUQ3wIEQCMAQYABayIEJAAgBCAFELcCIARBADYCDCAEQRBqIAQQsAECQAJAIAQpAxgiCiAEKQMQIgtCAoWEUEUEQCAKIAuEUARAQQAgBEH/AGpBwN/AABDPASEFIAFBATYCACABIAU2AgQMAwsgBEEoaikDACEKIAQpAyAhCyAEQTBqIAQQsAEgBCkDOCIMIAQpAzAiDUIChYRQDQEgDCANhFAEQEEBIARB/wBqQcDfwAAQzwEhBSABQQE2AgAgASAFNgIEDAMLIARByABqKQMAIQwgBCkDQCENIARB0ABqIAQQsAECfwJAAkAgBCgCUCIFQQNxQQNGDQACQCAFQQFrDgIBAgALQQIgBEH/AGpBwN/AABDPAQwCCyABIAQpA2A3AzAgASANNwMgIAEgCzcDECABQQA2AgAgASAMNwMoIAEgCjcDGCABIARB6ABqKQMANwM4DAQLIAQoAmALIQUgAUEBNgIAIAEgBTYCBAwCCyABIAQoAiA2AgQgAUEBNgIADAELIAEgBCgCQDYCBCABQQE2AgALIARBgAFqJAAMAQsgA0HQAGogA0EEahCSASADKAJQIQQCQAJAAkAgAy0AVCIFQQJrDgIBAAILIAFBATYCACABIAQ2AgQMAgsgA0EEaiADQf8AakHA38AAEFUhBCABQQE2AgAgASAENgIEDAELIAMgBToADCADIAQ2AgggA0EQaiADQQhqEK4BAkACQCADKQMYIgogAykDECILQgKFhFBFBEAgCiALhFBFDQFBACADQf8AakHA38AAEM8BIQQgAUEBNgIAIAEgBDYCBAwCCyABIAMoAiA2AgQgAUEBNgIADAELIANBKGopAwAhCiADKQMgIQsgA0EwaiADQQhqEK4BIAMpAzgiDCADKQMwIg1CAoWEUEUEQCAMIA2EUARAQQEgA0H/AGpBwN/AABDPASEEIAFBATYCACABIAQ2AgQMAgsgA0HIAGopAwAhDCADKQNAIQ0gA0HQAGogA0EIahCuAQJAIAMoAlAiBEEDcUEDRg0AAn8CQAJAIARBAWsOAgMBAAtBAiADQf8AakHA38AAEM8BDAELIAMoAmALIQQgAUEBNgIAIAEgBDYCBAwCCyABIAMpA2A3AzAgASANNwMgIAEgCzcDECABQQA2AgAgASAMNwMoIAEgCjcDGCABIANB6ABqKQMANwM4DAELIAEgAygCQDYCBCABQQE2AgALIAMoAggiAUGDAU0NACABEAALIAMoAgQiAUGDAUsEQCABEAALIANBgAFqJAAgAigCkAFFBEAgAkEgaiAIIAlBMBBKQTAQShpCASEKDAcLIAIoApQBIQEgAEECOgBwIAAgATYCAAwKCwwLCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACESIAIpA6ABIRNCASERDAYLIAIoApQBIQEgAEECOgBwIAAgATYCAAwJCwwKCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACEUIAIpA6ABIRVCASEQDAULIAIoApQBIQEgAEECOgBwIAAgATYCAAwICwwJCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACEWIAIpA6ABIRdCASEPDAQLIAIoApQBIQEgAEECOgBwIAAgATYCAAwHCwwICyACKAIMIAJBADYCDARAIAJBkAFqIQMgAigCECEEIwBBMGsiASQAIAEgBDYCDAJAIAQQL0EBRwRAIAFBDGogAUEQakGg4MAAEFUhBSADQQE2AgAgAyAFNgIEIARBhAFJDQEgBBAADAELIAFBEGogBBCWASABKAIQIgRFBEAgAyABKQMgNwMQIANBADYCACADIAFBKGopAwA3AxggBEUNASABKAIUIgNBhAFJDQEgAxAADAELQcjiwABBywAQxgEhBCADQQE2AgAgAyAENgIE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QQFrDhEBAgMEBQYHCAkKCwwNDg8QEQALIAIgAC0AAToACCACQQI2AhQgAkGwwcAANgIQIAJCATcCHCACQTA2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDBELIAIgACkDCDcDCCACQQI2AhQgAkHMwcAANgIQIAJCATcCHCACQTE2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDBALIAIgACkDCDcDCCACQQI2AhQgAkHMwcAANgIQIAJCATcCHCACQTI2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDA8LIAArAwghAyACQQI2AhQgAkHswcAANgIQIAJCATcCHCACQTM2AgwgAiADOQMoIAIgAkEIajYCGCACIAJBKGo2AgggASgCHCABKAIgIAJBEGoQUQwOCyACIAAoAgQ2AgggAkECNgIUIAJBiMLAADYCECACQgE3AhwgAkE0NgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCHCABKAIgIAJBEGoQUQwNCyACIAApAgQ3AgggAkEBNgIUIAJBoMLAADYCECACQgE3AhwgAkE1NgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCHCABKAIgIAJBEGoQUQwMCyABQZnBwABBChDAAgwLCyABQajCwABBChDAAgwKCyABQbLCwABBDBDAAgwJCyABQb7CwABBDhDAAgwICyABQczCwABBCBDAAgwHCyABQdTCwABBAxDAAgwGCyABQdfCwABBBBDAAgwFCyABQdvCwABBDBDAAgwECyABQefCwABBDxDAAgwDCyABQfbCwABBDRDAAgwCCyABQYPDwABBDhDAAgwBCyABIAAoAgQgACgCCBDAAgsgAkEwaiQAC+oEAQp/IwBBMGsiAyQAIAMgATYCLCADIAA2AiggA0EDOgAkIANCIDcCHCADQQA2AhQgA0EANgIMAn8CQAJAAkAgAigCECIKRQRAIAIoAgwiAEUNASACKAIIIgEgAEEDdGohBCAAQQFrQf////8BcUEBaiEHIAIoAgAhAANAIABBBGooAgAiBQRAIAMoAiggACgCACAFIAMoAiwoAgwRAgANBAsgASgCACADQQxqIAFBBGooAgARAAANAyAAQQhqIQAgAUEIaiIBIARHDQALDAELIAIoAhQiAEUNACAAQQV0IQsgAEEBa0H///8/cUEBaiEHIAIoAgghBSACKAIAIQADQCAAQQRqKAIAIgEEQCADKAIoIAAoAgAgASADKAIsKAIMEQIADQMLIAMgCCAKaiIBQRBqKAIANgIcIAMgAUEcai0AADoAJCADIAFBGGooAgA2AiAgAUEMaigCACEEQQAhCUEAIQYCQAJAAkAgAUEIaigCAEEBaw4CAAIBCyAEQQN0IAVqIgwoAgANASAMKAIEIQQLQQEhBgsgAyAENgIQIAMgBjYCDCABQQRqKAIAIQQCQAJAAkAgASgCAEEBaw4CAAIBCyAEQQN0IAVqIgYoAgANASAGKAIEIQQLQQEhCQsgAyAENgIYIAMgCTYCFCAFIAFBFGooAgBBA3RqIgEoAgAgA0EMaiABQQRqKAIAEQAADQIgAEEIaiEAIAsgCEEgaiIIRw0ACwsgByACKAIETw0BIAMoAiggAigCACAHQQN0aiIAKAIAIAAoAgQgAygCLCgCDBECAEUNAQtBAQwBC0EACyADQTBqJAALxgQBCX8jAEEQayIEJAACQAJAAn8CQCAAKAIAQQFGBEAgACgCBCEHIAQgASgCDCIDNgIMIAQgASgCCCICNgIIIAQgASgCBCIFNgIEIAQgASgCACIBNgIAIAAtABghCSAAKAIQIQogAC0AFEEIcQ0BIAohCCAJDAILIAAoAhwgACgCICABEFchAgwDCyAAKAIcIAEgBSAAKAIgKAIMEQIADQEgAEEBOgAYQTAhCCAAQTA2AhAgBEIBNwIAIAcgBWshAUEAIQUgAUEAIAEgB00bIQdBAQshBiADBEAgA0EMbCEDA0ACfwJAAkACQCACLwEAQQFrDgICAQALIAIoAgQMAgsgAigCCAwBCyACLwECIgFB6AdPBEBBBEEFIAFBkM4ASRsMAQtBASABQQpJDQAaQQJBAyABQeQASRsLIAJBDGohAiAFaiEFIANBDGsiAw0ACwsCfwJAIAUgB0kEQCAHIAVrIQMCQAJAAkBBASAGIAZB/wFxQQNGG0H/AXEiAkEBaw4CAAECCyADIQJBACEDDAELIANBAXYhAiADQQFqQQF2IQMLIAJBAWohAiAAKAIgIQYgACgCHCEBA0AgAkEBayICRQ0CIAEgCCAGKAIQEQAARQ0ACwwDCyAAKAIcIAAoAiAgBBBXDAELIAEgBiAEEFcNAUEAIQICfwNAIAMgAiADRg0BGiACQQFqIQIgASAIIAYoAhARAABFDQALIAJBAWsLIANJCyECIAAgCToAGCAAIAo2AhAMAQtBASECCyAEQRBqJAAgAguSBAEEfyMAQYABayIEJAACQAJAAkAgASgCFCICQRBxRQRAIAJBIHENAUEBIQIgACgCACABEHBFDQIMAwsgACgCACECA0AgAyAEakH/AGogAkEPcSIFQTByIAVB1wBqIAVBCkkbOgAAIANBAWshAyACQRBJIAJBBHYhAkUNAAtBASECIAFBAUGRocAAQQIgAyAEakGAAWpBACADaxBFRQ0BDAILIAAoAgAhAgNAIAMgBGpB/wBqIAJBD3EiBUEwciAFQTdqIAVBCkkbOgAAIANBAWshAyACQQ9LIAJBBHYhAg0AC0EBIQIgAUEBQZGhwABBAiADIARqQYABakEAIANrEEUNAQsgASgCHEGNnsAAQQIgASgCICgCDBECAA0AAkAgASgCFCICQRBxRQRAIAJBIHENASAAKAIEIAEQcCECDAILIAAoAgQhAkEAIQMDQCADIARqQf8AaiACQQ9xIgBBMHIgAEHXAGogAEEKSRs6AAAgA0EBayEDIAJBD0sgAkEEdiECDQALIAFBAUGRocAAQQIgAyAEakGAAWpBACADaxBFIQIMAQsgACgCBCECQQAhAwNAIAMgBGpB/wBqIAJBD3EiAEEwciAAQTdqIABBCkkbOgAAIANBAWshAyACQQ9LIAJBBHYhAg0ACyABQQFBkaHAAEECIAMgBGpBgAFqQQAgA2sQRSECCyAEQYABaiQAIAILnQQCB38BfiMAQZABayIDJAACQAJAAkAgACgCACIEQYEBECFFBEBBAUECIAQQIiIFQQFGG0EAIAUbIghBAkYNAUEAIQBBACEFDAILIANBBzoAcCADQfAAaiABIAIQ2QEhBAwCCyADQRhqIAQQFiADQcgAaiADKAIYIAMrAyAQqQIgAygCSEUEQCADQRBqIAQQBgJ/AkAgAygCECIERQ0AIANBCGogBCADKAIUEP0BIANB2ABqIAMoAgggAygCDBC8AiADKAJYQYCAgIB4Rg0AIANBMGogA0HgAGooAgAiBjYCACADIAMpAlg3AyhBBSEFQQEhByADKAIsIQRBAAwBCyADQeQAaiAAELQBAn8gAygCZCIJQYCAgIB4RiIHRQRAIANBQGsiACEGIAAgA0HsAGooAgA2AgAgAyADKQJkNwM4QQYhBSADQTxqDAELIANBMGohBiADQQE2AnQgA0HwxsAANgJwIANCATcCfCADQTw2AowBIAMgADYCiAEgAyADQYgBajYCeCADQShqIANB8ABqEGpBESEFIANBLGoLIAYoAgAhBigCACEEIAlBgICAgHhHCyEAIAatIQoMAQtBAyEFIAMpA1AhCkEAIQALIAMgCjcDeCADIAQ2AnQgAyAIOgBxIAMgBToAcCADQfAAaiABIAIQ2QEhBCAABEAgA0E4ahDIAQsgB0UNACADQShqEMgBCyADQZABaiQAIAQLnQQCB38BfiMAQZABayIDJAACQAJAAkAgACgCACIEQYEBECFFBEBBAUECIAQQIiIFQQFGG0EAIAUbIghBAkYNAUEAIQBBACEFDAILIANBBzoAcCADQfAAaiABIAIQ2gEhBAwCCyADQRhqIAQQFiADQcgAaiADKAIYIAMrAyAQqQIgAygCSEUEQCADQRBqIAQQBgJ/AkAgAygCECIERQ0AIANBCGogBCADKAIUEP0BIANB2ABqIAMoAgggAygCDBC8AiADKAJYQYCAgIB4Rg0AIANBMGogA0HgAGooAgAiBjYCACADIAMpAlg3AyhBBSEFQQEhByADKAIsIQRBAAwBCyADQeQAaiAAELQBAn8gAygCZCIJQYCAgIB4RiIHRQRAIANBQGsiACEGIAAgA0HsAGooAgA2AgAgAyADKQJkNwM4QQYhBSADQTxqDAELIANBMGohBiADQQE2AnQgA0H4ycAANgJwIANCATcCfCADQTw2AowBIAMgADYCiAEgAyADQYgBajYCeCADQShqIANB8ABqEGpBESEFIANBLGoLIAYoAgAhBigCACEEIAlBgICAgHhHCyEAIAatIQoMAQtBAyEFIAMpA1AhCkEAIQALIAMgCjcDeCADIAQ2AnQgAyAIOgBxIAMgBToAcCADQfAAaiABIAIQ2gEhBCAABEAgA0E4ahDIAQsgB0UNACADQShqEMgBCyADQZABaiQAIAQLjwQBDX8gAUEBayEPIAAoAgQhCiAAKAIAIQsgACgCCCEMAkADQCAODQECQAJAIAIgBEkNAANAIAEgBGohBQJAAkACQCACIARrIgZB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NCADIAQ2AjAgA0EoaiADQTBqQc3MwABBDiABEOgBAkAgAygCKARAIAMoAiwhAgwBCyADIAFBEGo2AjggA0EgaiADQTBqQdvMwABBCSADQThqEOkBIAMoAiAEQCADKAIkIQIMAQsgAyABQRhqNgI4IANBGGogA0EwakHkzMAAQQkgA0E4ahDpASADKAIYBEAgAygCHCECDAELIAMgAUEgajYCOCADQRBqIANBMGpB7czAAEEJIANBOGoQ6QEgAygCEARAIAMoAhQhAgwBCyADIAFBKGo2AjggA0EIaiADQTBqQfbMwABBCSADQThqEOkBIAMoAggEQCADKAIMIQIMAQsgAyADKAIwIAMoAjQQ0wIgAygCBCECIAMoAgAMAgsgAygCNCIBQYQBSQ0AIAEQAAtBAQshASAAIAI2AgQgACABNgIAIANBQGskAAv9AgECfyMAQUBqIgMkACADQThqIAIQ1AIgAygCPCECAn8CQCADKAI4IgRFDQAgAyACNgI0IAMgBDYCMCADQShqIANBMGpBzczAAEEOIAEQ6AECQCADKAIoBEAgAygCLCECDAELIAMgAUEQajYCOCADQSBqIANBMGpB28zAAEEJIANBOGoQ6QEgAygCIARAIAMoAiQhAgwBCyADIAFBGGo2AjggA0EYaiADQTBqQeTMwABBCSADQThqEOkBIAMoAhgEQCADKAIcIQIMAQsgAyABQSBqNgI4IANBEGogA0EwakGVzcAAQQkgA0E4ahDpASADKAIQBEAgAygCFCECDAELIAMgAUEoajYCOCADQQhqIANBMGpBns3AAEEJIANBOGoQ6QEgAygCCARAIAMoAgwhAgwBCyADIAMoAjAgAygCNBDTAiADKAIEIQIgAygCAAwCCyADKAI0IgFBhAFJDQAgARAAC0EBCyEBIAAgAjYCBCAAIAE2AgAgA0FAayQAC9sCAgN/Bn4jAEHgAGsiAyQAIANBOGogAhAKEGAgAkGEAU8EQCACEAALAkACQCADKAI4QQFHBEACfyADLwFIIgRBkM4ASwRAQRQhBUGm28AADAELQQAhAiAERSABUHINAyADKQNAIQcgA0EoaiAErUIAIAFCABDFASADQRhqIAMpAygiBiADQTBqKQMAIglCkM4AQgAQhQIgA0EIaiADKQMYIgggA0EgaikDACIKQpDOAEIAEMUBIAogCCAGIAMpAwgiC30gCSADQRBqKQMAfSAGIAtUrX2EQgBSrXwiBiAIVK18UA0CQRYhBUH42sAAC0EBIQIgBRABIQQMAgsgAyADKAI8NgJQIANB1ABqIANB0ABqELsBIAMoAlggAygCXBDuAgALIAEgByAGIAYgB1YbfSEBCyAAIAI2AgwgACAEQQAgAhs2AgggAEIAIAEgAhs3AwAgA0HgAGokAAvmAgEIfyMAQRBrIgUkAEEKIQIgACIDQegHTwRAIAMhBANAIAVBBmogAmoiBkEDayAEIARBkM4AbiIDQZDOAGxrIgdB//8DcUHkAG4iCEEBdCIJQZShwABqLQAAOgAAIAZBBGsgCUGTocAAai0AADoAACAGQQFrIAcgCEHkAGxrQf//A3FBAXQiB0GUocAAai0AADoAACAGQQJrIAdBk6HAAGotAAA6AAAgAkEEayECIARB/6ziBEsgAyEEDQALCwJAIANBCU0EQCADIQQMAQsgAiAFakEFaiADIANB//8DcUHkAG4iBEHkAGxrQf//A3FBAXQiA0GUocAAai0AADoAACACQQJrIgIgBUEGamogA0GTocAAai0AADoAAAtBACAAIAQbRQRAIAJBAWsiAiAFQQZqaiAEQQF0QR5xQZShwABqLQAAOgAACyABQQFBAUEAIAVBBmogAmpBCiACaxBFIAVBEGokAAurAgIBfwF+IwBBQGoiCCQAIAhBMGogBSADfSIJQgAgAUIAEMUBIAhBEGogCUIAIAJCABDFASAIIAYgBH0gAyAFVq19IgNCACACQgAQxQEgCEEgaiADQgAgAUIAEMUBIAhBCGopAwAgCEEYaikDACAIQThqKQMAIgIgCCkDEHwiASACVK18IgMgCCkDAHwiAiADVK18IAIgAiAIQShqKQMAIAEgASAIKQMgfCIBVq18fCICVq18IQMgAAJ/AkACQCAHBEAgCCkDMEIAUg0BCyACIAOEUARAIAAgATcDCEEADAMLDAELIAMgAUIBfCIBIAIgAVCtfCIChFCthCAChFAEQCAAIAE3AwhBAAwCCwsgAEEWNgIIIABBmYjBADYCBEEBCzYCACAIQUBrJAAL0gIBB39BASEJAkACQCACRQ0AIAEgAkEBdGohCiAAQYD+A3FBCHYhCyAAQf8BcSENA0AgAUECaiEMIAcgAS0AASICaiEIIAsgAS0AACIBRwRAIAEgC0sNAiAIIQcgDCIBIApGDQIMAQsCQAJAIAcgCE0EQCAEIAhJDQEgAyAHaiEBA0AgAkUNAyACQQFrIQIgAS0AACABQQFqIQEgDUcNAAtBACEJDAULIAcgCEGkpsAAENsCAAsgCCAEQaSmwAAQ2gIACyAIIQcgDCIBIApHDQALCyAGRQ0AIAUgBmohAyAAQf//A3EhAQNAIAVBAWohAAJAIAUsAAAiAkEATgRAIAAhBQwBCyAAIANHBEAgBS0AASACQf8AcUEIdHIhAiAFQQJqIQUMAQtBlKbAABDdAgALIAEgAmsiAUEASA0BIAlBAXMhCSADIAVHDQALCyAJQQFxC/ECAQR/IAAoAgwhAgJAAkAgAUGAAk8EQCAAKAIYIQMCQAJAIAAgAkYEQCAAQRRBECAAKAIUIgIbaigCACIBDQFBACECDAILIAAoAggiASACNgIMIAIgATYCCAwBCyAAQRRqIABBEGogAhshBANAIAQhBSABIgJBFGogAkEQaiACKAIUIgEbIQQgAkEUQRAgARtqKAIAIgENAAsgBUEANgIACyADRQ0CIAAgACgCHEECdEHoiMEAaiIBKAIARwRAIANBEEEUIAMoAhAgAEYbaiACNgIAIAJFDQMMAgsgASACNgIAIAINAUGEjMEAQYSMwQAoAgBBfiAAKAIcd3E2AgAMAgsgACgCCCIAIAJHBEAgACACNgIMIAIgADYCCA8LQYCMwQBBgIzBACgCAEF+IAFBA3Z3cTYCAA8LIAIgAzYCGCAAKAIQIgEEQCACIAE2AhAgASACNgIYCyAAKAIUIgBFDQAgAiAANgIUIAAgAjYCGAsLpBQDFn8BfAF+IwBBoOkEayIGJAACQCABEDBBAUcEQEHwACECA0AgACACakECOgAAIAJBkNgAaiICQdCRBEcNAAsgAUGEAUkNASABEAAMAQsgBiABNgIcQfAAIQIDQCAGQSBqIAJqQQI6AAAgAkGQ2ABqIgJB0JEERw0ACyAGQYCRBGoiASAGQRxqELcCIAZBADYCjJEEIAZBEGogARD7AQJAIAYoAhAiAkUNACAGKAIUIQEDQCAGIAYoAoyRBCIQQQFqNgKMkQQgAkEBcUUNASAGQZCRBGohC0EAIQhBACERQdDxwAAhFCMAQbCwAWsiBCQAIAQgATYCHAJAAkACQCABEA5BAUcEQCAEQRxqIARBsNgAakGQ4MAAEFQhAiALQQI6AHAgCyACNgIAIAFBhAFJDQEgARAADAELIARBIGoiAiABQdDxwABBAhClAiAEQbDYAGoiASACEIIBAkACfyAELQCwWEUEQCAEQaHZAGohFSABQQRyIRZBAiEBA0ACQAJAAkACQAJAAkACQCAELQCxWEEBaw4DAgEDAAsgEUUNBEGQ6cAAQQ4Q5AEMCAsgBEEQaiAEQSBqEIICDAQLIAFB/wFxQQJGDQFBnunAAEEFEOQBDAYLIBFFBEBBkOnAAEEOEOIBDAYLIAFB/wFxQQJGBEBBnunAAEEFEOIBDAYLIAsgCDYCACALQQRqIARBxNcAakHsABBKGiALQfEAaiAEQTVqQY/XABBKGiALIBQ2AoBYIAsgAToAcAwGCyAEKAIgIARBADYCIARAIARBsNgAaiEIIAQoAiQhASMAQSBrIgckACAHIAE2AgwCQCAHQQxqIgEQ3wIEQCAHQRBqIgMgARC3AiAHQQA2AhxBACEJQQAhCiMAQaDaAGsiASQAIAFCADcDCCABQgE3AwAgAUEANgKQWCABQaDYAGpBBHIhDCABQRBqIQ0gAUGR2QBqIhJBB2ohEwJAAkACfwJAA0AgAUGg2ABqIQUjAEGQAWsiAiQAAkACQCADKAIABEAgAkEIaiADEPsBIAIoAggNAQsgBUECOgBwDAELIAIoAgwhDiADIAMoAgxBAWo2AgwgAkEQaiIPIA4QOCACLQCAAUECRwRAIAUgD0GAARBKGgwBCyAFQQM6AHAgBSACKAIQNgIACyACQZABaiQAIAEoAqBYIg4gAS0AkFkiBUEDRg0CGiABQbDZAGoiDyAMQewAEEoaIAEgEykAADcAp1kgASASKQAANwOgWSAFQQJGDQEgASAJaiICQRBqIA42AgAgAkEUaiAPQewAEEoaIAJBgAFqIAU6AAAgAkGBAWogASkDoFk3AAAgAkGIAWogASkAp1k3AAAgASABKAKQWEEBajYCkFggCUGAAWohCSAKQQFqIgpB2ABHDQALIAEoAgBBAXFFDQIgCCANQYDYABBKGgwDCyAKIAFBn9oAakH03MAAEM4BCyECIAhBAjoAcCAIIAI2AgAMAQtB5NzAABDdAgALIAFBoNoAaiQADAELIAdBEGogB0EMahCSASAHKAIQIQECQAJAAkAgBy0AFCICQQJrDgIBAAILIAhBAjoAcCAIIAE2AgAMAgsgB0EMaiAHQRBqQdDgwAAQVCEBIAhBAjoAcCAIIAE2AgAMAQtBACEJIwBBsNoAayIDJAAgAyACQQFxOgAMIAMgATYCCCADQgA3AxggA0IBNwMQQQAhCiADQQA2AqBYIANBsNgAakEEciESIANBIGohEyADQaHZAGoiDkEHaiEPAkACQAJAAn8CQANAIANBsNgAaiEMIwBBkAFrIgUkACAFQQhqIANBCGoQgQJBAyEBQQIhAiAFKAIMIQ0CQAJAAkAgBSgCCEEBaw4CAQIACyAFQRBqIhcgDRA4IAUoAhAhDSAFLQCAASICQQJGDQAgDEEEaiAXQQRyQewAEEoaIAxB+ABqIAVBiAFqKQAANwAAIAwgBSkAgQE3AHEgAiEBCyAMIA02AgAgASECCyAMIAI6AHAgBUGQAWokACADKAKwWCIFIAMtAKBZIgJBA0YNAhogA0HA2QBqIgwgEkHsABBKGiADIA8pAAA3ALdZIAMgDikAADcDsFkgAkECRg0BIANBEGogCmoiAUEQaiAFNgIAIAFBFGogDEHsABBKGiABQYABaiACOgAAIAFBgQFqIAMpA7BZNwAAIAFBiAFqIAMpALdZNwAAIAMgAygCoFhBAWo2AqBYIApBgAFqIQogCUEBaiIJQdgARw0ACyADKAIQQQFxRQ0CIAggE0GA2AAQShogAygCCCIBQYMBTQ0EDAMLIAkgA0Gv2gBqQfTcwAAQzgELIQEgCEECOgBwIAggATYCACADKAIIIgFBgwFLDQEMAgtB5NzAABDdAgALIAEQAAsgA0Gw2gBqJAALIAcoAgwiAUGDAUsEQCABEAALIAdBIGokACAEKAKwWCEIIAQtAKBZIgFBAkcEQCAEQcTXAGogFkHsABBKGiAEQTVqIBVBj9cAEEoaDAMLIAgMBQtB6vvAAEExEO4CAAsgBCgCICAEQQA2AiBFDQYgBCgCJCEFIwBBEGsiByQAIAcgBTYCDCMAQTBrIgMkACADQQhqIgkgB0EMaiICEOACBH4gAigCABAjIhhEAAAAAAAA4MNmIQogCUL///////////8AAn4gGJlEAAAAAAAA4ENjBEAgGLAMAQtCgICAgICAgICAfwtCgICAgICAgICAfyAKGyAYRP///////99DZBtCACAYIBhhGzcDCEIBBUIACzcDAEEBIQkgBwJ/IAMoAghBAUYEQCADKQMQIhlCgICAgAh9Qv////9vVgRAQQAhCSAZpwwCCyADQQI6ABggAyAZNwMgIwBBMGsiAiQAIAJB4N/AADYCBCACIANBL2o2AgAgAkECNgIMIAJB9OnAADYCCCACQgI3AhQgAkE6NgIsIAJBOzYCJCACIANBGGo2AiAgAiACQSBqNgIQIAIgAjYCKCACQQhqEJsBIAJBMGokAAwBCyACIANBL2pB4N/AABBUCzYCBCAHIAk2AgAgA0EwaiQAIAcoAgQhAiAHKAIAIQMgBUGEAU8EQCAFEAALIARBCGoiBSADNgIAIAUgAjYCBCAHQRBqJABBASERIAQoAgwiFCAEKAIIDQMaCyAEQbDYAGogBEEgahCCASAELQCwWEUNAAsLIAQoArRYCyEBIAtBAjoAcCALIAE2AgALIARBIGoQoQILIARBsLABaiQADAELQer7wABBMRDuAgALAkACQCAGLQCAkgRBAkcEQCAQQQVLDQIgBkEgaiAQQZDYAGxqIAtBkNgAEEoaDAELIAYoApCRBCIBQYQBSQ0AIAEQAAsgBkEIaiAGQYCRBGoQ+wEgBigCDCEBIAYoAggiAg0BDAILCyAQQQZB3P7AABDWAQALIAAgBkEgakHgkAQQShogBigCHCIAQYQBSQ0AIAAQAAsgBkGg6QRqJAAL8gIBAX8CQCACBEAgAS0AAEEwTQ0BIAVBAjsBAAJAAkACQAJAAkAgA8EiBkEASgRAIAUgATYCBCADQf//A3EiAyACSQ0BIAVBADsBDCAFIAI2AgggBSADIAJrNgIQIAQNAkECIQEMBQsgBSACNgIgIAUgATYCHCAFQQI7ARggBUEAOwEMIAVBAjYCCCAFQcmdwAA2AgQgBUEAIAZrIgM2AhBBAyEBIAIgBE8NBCAEIAJrIgIgA00NBCACIAZqIQQMAwsgBUECOwEYIAVBATYCFCAFQcidwAA2AhAgBUECOwEMIAUgAzYCCCAFIAIgA2siAjYCICAFIAEgA2o2AhwgAiAESQ0BQQMhAQwDCyAFQQE2AiAgBUHIncAANgIcIAVBAjsBGAwBCyAEIAJrIQQLIAUgBDYCKCAFQQA7ASRBBCEBCyAAIAE2AgQgACAFNgIADwtBsJrAAEEhQdScwAAQ/wEAC0HknMAAQR9BhJ3AABD/AQALxgIBA38jAEEQayICJAACQCABQYABTwRAIAJBADYCDAJ/IAFBgBBPBEAgAUGAgARPBEAgAkEMakEDciEEIAIgAUESdkHwAXI6AAwgAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANQQQMAgsgAkEMakECciEEIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAELIAJBDGpBAXIhBCACIAFBBnZBwAFyOgAMQQILIQMgBCABQT9xQYABcjoAACADIAAoAgAgACgCCCIBa0sEQCAAIAEgAxCdASAAKAIIIQELIAAoAgQgAWogAkEMaiADEEoaIAAgASADajYCCAwBCyAAKAIIIgMgACgCAEYEQCAAQayHwAAQqQELIAAgA0EBajYCCCAAKAIEIANqIAE6AAALIAJBEGokAEEAC8QCAQJ/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQA2AgwCfyABQYAQTwRAIAFBgIAETwRAIAIgAUE/cUGAAXI6AA8gAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA1BBAwCCyACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAELIAIgAUE/cUGAAXI6AA0gAiABQQZ2QcABcjoADEECCyEBIAEgACgCACAAKAIIIgNrSwRAIAAgAyABEJABIAAoAgghAwsgACgCBCADaiACQQxqIAEQShogACABIANqNgIIDAELIAAoAggiAyAAKAIARgRAIABBzIDAABCpAQsgACgCBCADaiABOgAAIAAgA0EBajYCCAsgAkEQaiQAQQALxAIBBH8gAEIANwIQIAACf0EAIAFBgAJJDQAaQR8gAUH///8HSw0AGiABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qCyICNgIcIAJBAnRB6IjBAGohBEEBIAJ0IgNBhIzBACgCAHFFBEAgBCAANgIAIAAgBDYCGCAAIAA2AgwgACAANgIIQYSMwQBBhIzBACgCACADcjYCAA8LAkACQCABIAQoAgAiAygCBEF4cUYEQCADIQIMAQsgAUEZIAJBAXZrQQAgAkEfRxt0IQUDQCADIAVBHXZBBHFqQRBqIgQoAgAiAkUNAiAFQQF0IQUgAiEDIAIoAgRBeHEgAUcNAAsLIAIoAggiASAANgIMIAIgADYCCCAAQQA2AhggACACNgIMIAAgATYCCA8LIAQgADYCACAAIAM2AhggACAANgIMIAAgADYCCAumGAITfwR+IwBBEGsiFSQAIAEoAgQiCCACIAMgAhsiBHEhBSAErSIaQhmIQoGChIiQoMCAAX4hGCABKAIAIQsCQAJAA0ACQCAFIAtqKQAAIhkgGIUiF0J/hSAXQoGChIiQoMCAAX2DQoCBgoSIkKDAgH+DIhdQRQRAA0AgAiALIBd6p0EDdiAFaiAIcUF0bGoiBEEMaygCAEYEQCAEQQhrKAIAIANGDQMLIBdCAX0gF4MiF1BFDQALCyAZIBlCAYaDQoCBgoSIkKDAgH+DUEUNAiAFIAdBCGoiB2ogCHEhBQwBCwsgACABNgIEIAAgBDYCAEEAIQEMAQsgASgCCEUEQCAVQQhqIRYjAEFAaiINJAACQCABKAIMIhRBAWoiCCAUTwRAAkAgASgCBCISIBJBAWoiE0EDdiIHQQdsIBJBCEkbIhFBAXYgCEkEQCANQTBqIQkCfyARQQFqIgcgCCAHIAhLGyIHQQhPBEBBfyAHQQN0QQduQQFrZ3ZBAWogB0H/////AU0NARoQ9gEgDSgCDCEIIA0oAgghBAwFC0EEQQggB0EESRsLIQUjAEEQayIIJAACQAJAAkAgBa1CDH4iF0IgiKcNACAXpyIEQQdqIgcgBEkNACAHQXhxIgsgBUEIamoiBCALSQ0AIARB+P///wdNDQELEPYBIAkgCCkDADcCBCAJQQA2AgAMAQsgBAR/QdGIwQAtAAAaIARBCBDHAgVBCAsiBwRAIAlBADYCDCAJIAVBAWsiBDYCBCAJIAcgC2o2AgAgCSAEIAVBA3ZBB2wgBEEISRs2AggMAQtBCCAEEOsCAAsgCEEQaiQAIA0oAjQhBCANKAIwIgdFBEAgDSgCOCEIDAQLIA0pAjghFyAHQf8BIARBCWoQXyERIA0gF0IgiD4CLCANIBenIg82AiggDSAENgIkIA0gETYCICANQQg2AhwgFARAIBFBDGshCiARQQhqIQwgASgCACILQQxrIRMgCykDAEJ/hUKAgYKEiJCgwIB/gyEYIBQhByALIQgDQCAYUARAA0AgEEEIaiEQIAgpAwggCEEIaiEIQoCBgoSIkKDAgH+DIhdCgIGChIiQoMCAf1ENAAsgF0KAgYKEiJCgwIB/hSEYCyARIAsgGHqnQQN2IBBqIg5BdGxqIglBDGsoAgAiBSAJQQhrKAIAIAUbIgkgBHEiBWopAABCgIGChIiQoMCAf4MiF1AEQEEIIQYDQCAFIAZqIQUgBkEIaiEGIBEgBCAFcSIFaikAAEKAgYKEiJCgwIB/gyIXUA0ACwsgGEIBfSAYgyEYIBEgF3qnQQN2IAVqIARxIgVqLAAAQQBOBEAgESkDAEKAgYKEiJCgwIB/g3qnQQN2IQULIAUgEWogCUEZdiIJOgAAIAwgBUEIayAEcWogCToAACAKIAVBdGxqIglBCGogEyAOQXRsaiIFQQhqKAAANgAAIAkgBSkAADcAACAHQQFrIgcNAAsLIA0gFDYCLCANIA8gFGs2AihBACEIA0AgASAIaiIHKAIAIQQgByAIIA1qQSBqIgcoAgA2AgAgByAENgIAIAhBBGoiCEEQRw0ACyANKAIkIghFDQEgCCAIQQxsQRNqQXhxIgdqQQlqIghFDQEgDSgCICAHayAIENkCDAELIAEoAgAhCyAHIBNBB3FBAEdqIgQEQCALIQgDQCAIIAgpAwAiF0J/hUIHiEKBgoSIkKDAgAGDIBdC//79+/fv37//AIR8NwMAIAhBCGohCCAEQQFrIgQNAAsLAkACQCATQQhPBEAgCyATaiALKQAANwAADAELAkACQCATIgwgC0EIaiIGIAsiBGtLBEAgBCAMaiEHIAYgDGohBiAMQRBJDQFBACAGQQNxIg5rIRACQCAGQXxxIgogBk8NACAOQQFrAkAgDkUEQCAHIQUMAQsgDiEJIAchBQNAIAZBAWsiBiAFQQFrIgUtAAA6AAAgCUEBayIJDQALC0EDSQ0AIAVBBGshBQNAIAZBAWsgBUEDai0AADoAACAGQQJrIAVBAmotAAA6AAAgBkEDayAFQQFqLQAAOgAAIAZBBGsiBiAFLQAAOgAAIAVBBGshBSAGIApLDQALCyAKIAwgDmsiD0F8cSIFayEGQQAgBWsCQCAHIBBqIhBBA3FFBEAgBiAKTw0BIAQgD2pBBGshBANAIApBBGsiCiAEKAIANgIAIARBBGshBCAGIApJDQALDAELIAYgCk8NACAQQQN0IgdBGHEhCSAQQXxxIgVBBGshBEEAIAdrQRhxIQcgBSgCACEMA0AgCkEEayIKIAwgB3QgBCgCACIMIAl2cjYCACAEQQRrIQQgBiAKSQ0ACwsgD0EDcSEMIBBqIQcMAQsgDEEQTwRAAkAgBkEAIAZrQQNxIglqIgUgBk0NACAEIQogCQRAIAkhBwNAIAYgCi0AADoAACAKQQFqIQogBkEBaiEGIAdBAWsiBw0ACwsgCUEBa0EHSQ0AA0AgBiAKLQAAOgAAIAZBAWogCkEBai0AADoAACAGQQJqIApBAmotAAA6AAAgBkEDaiAKQQNqLQAAOgAAIAZBBGogCkEEai0AADoAACAGQQVqIApBBWotAAA6AAAgBkEGaiAKQQZqLQAAOgAAIAZBB2ogCkEHai0AADoAACAKQQhqIQogBkEIaiIGIAVHDQALCyAFIAwgCWsiEEF8cSIPaiEGAkAgBCAJaiIHQQNxRQRAIAUgBk8NASAHIQQDQCAFIAQoAgA2AgAgBEEEaiEEIAVBBGoiBSAGSQ0ACwwBCyAFIAZPDQAgB0EDdCIJQRhxIQogB0F8cSIOQQRqIQRBACAJa0EYcSEJIA4oAgAhDANAIAUgDCAKdiAEKAIAIgwgCXRyNgIAIARBBGohBCAFQQRqIgUgBkkNAAsLIBBBA3EhDCAHIA9qIQQLIAYgBiAMaiIHTw0BIAxBB3EiCgRAA0AgBiAELQAAOgAAIARBAWohBCAGQQFqIQYgCkEBayIKDQALCyAMQQFrQQdJDQEDQCAGIAQtAAA6AAAgBkEBaiAEQQFqLQAAOgAAIAZBAmogBEECai0AADoAACAGQQNqIARBA2otAAA6AAAgBkEEaiAEQQRqLQAAOgAAIAZBBWogBEEFai0AADoAACAGQQZqIARBBmotAAA6AAAgBkEHaiAEQQdqLQAAOgAAIARBCGohBCAGQQhqIgYgB0cNAAsMAQsgBiAMayIFIAZPDQAgDEEDcSIEBEADQCAGQQFrIgYgB0EBayIHLQAAOgAAIARBAWsiBA0ACwsgDEEBa0EDSQ0AIAdBBGshBANAIAZBAWsgBEEDai0AADoAACAGQQJrIARBAmotAAA6AAAgBkEDayAEQQFqLQAAOgAAIAZBBGsiBiAELQAAOgAAIARBBGshBCAFIAZJDQALCyATRQ0BCyALQQhqIQogC0EMayEMIAshBEEAIQUDQAJAIAsgBSIIaiITLQAAQYABRw0AIAwgBUF0bGohDwJAA0AgDygCACIHIA8oAgQgBxsiDiAScSIJIQUgCSALaikAAEKAgYKEiJCgwIB/gyIYUARAQQghBgNAIAUgBmohByAGQQhqIQYgCyAHIBJxIgVqKQAAQoCBgoSIkKDAgH+DIhhQDQALCyALIBh6p0EDdiAFaiAScSIFaiwAAEEATgRAIAspAwBCgIGChIiQoMCAf4N6p0EDdiEFCyAFIAlrIAggCWtzIBJxQQhJDQEgBSALaiIHLQAAIAcgDkEZdiIHOgAAIAogBUEIayAScWogBzoAACAFQXRsIQdB/wFHBEAgByALaiEOQXQhBQNAIAQgBWoiBy0AACEJIAcgBSAOaiIHLQAAOgAAIAcgCToAACAFQQFqIgUNAAsMAQsLIBNB/wE6AAAgCiAIQQhrIBJxakH/AToAACAHIAxqIgdBCGogD0EIaigAADYAACAHIA8pAAA3AAAMAQsgEyAOQRl2Igc6AAAgCiAIQQhrIBJxaiAHOgAACyAIQQFqIQUgBEEMayEEIAggEkcNAAsLIAEgESAUazYCCAtBgYCAgHghBAwBCxD2ASANKAIEIQggDSgCACEECyAWIAg2AgQgFiAENgIAIA1BQGskAAsgACADNgIMIAAgAjYCCCAAIBo3AwALIAAgATYCECAVQRBqJAALjQICBn4CfyMAQSBrIgkkAAJAAkAgAlAgAUICVHEEQCABIQQgAiEDDAELIAlBEGogASACIAJCP4YgAUIBiIQiBCACQgGIIgMQhQIgCSkDECIFIAR8IgZCAYggBSAGVq0gCUEYaikDACADfHwiB0I/hoQiCCAEWiAHQgGIIgUgA1ogAyAFURsNACAJQQhqIQoDQCAFIQMgCCEEIAdQIAZCAlRxDQIgCSABIAIgBCADEIUCIAkpAwAiBSAEfCIGQgGIIAUgBlatIAopAwAgA3x8IgdCP4aEIgggBFQgB0IBiCIFIANUIAMgBVEbDQALCyAAIAQ3AwAgACADNwMIIAlBIGokAA8LQfjLwAAQmgIAC4AFAQR/IwBBIGsiBCQAAkACQAJAIAEoAggiAiABKAIMRwRAIAFBEGohBQNAIAEgAkEIajYCCCAEIAIoAgAgAigCBBCgAjYCFAJAIAUgBEEUahDVAiIDEBdBAUYEQCAEKAIUIAUoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIFQYQBSQ0AIAUQAAsgASADNgIEQQEhBSABQQE2AgAgBEEIaiACKAIAIAIoAgQQzwIgBEEYaiEBAkACQAJAAkACQAJAAkACQAJAAkAgBCgCCCICIAQoAgwiA0H0+MAAQRAQsAJFBEAgAiADQYT5wABBCxCwAg0BIAIgA0GP+cAAQQcQsAINAiACIANBlvnAAEEPELACDQMgAiADQaX5wABBCRCwAg0EIAIgA0Gu+cAAQQkQsAINBSACIANBt/nAAEEQELACDQYgAiADQcf5wABBEBCwAg0HIAIgA0HX+cAAQRAQsAINCCACIANB5/nAAEEaELACDQkgAiADQYH6wABBCxCwAkUEQCABQQs6AAEMCwsgAUEKOgABDAoLIAFBADoAAQwJCyABQQE6AAEMCAsgAUECOgABDAcLIAFBAzoAAQwGCyABQQQ6AAEMBQsgAUEFOgABDAQLIAFBBjoAAQwDCyABQQc6AAEMAgsgAUEIOgABDAELIAFBCToAAQsgAUEAOgAAIAQtABgNAyAAIAQtABk6AAFBACEFDAQLIANBhAFPBEAgAxAACyAEKAIUIgJBhAFPBEAgAhAACyABKAIIIgIgASgCDEcNAAsLIABBgBg7AQAMAgsgACAEKAIcNgIECyAAIAU6AAAgBCgCFCIAQYQBSQ0AIAAQAAsgBEEgaiQAC6ADAQR/IwBBIGsiAiQAAkACQAJAIAEoAggiAyABKAIMRwRAIAFBEGohBANAIAEgA0EIajYCCCACIAMoAgAgAygCBBCgAjYCFAJAIAQgAkEUahDVAiIFEBdBAUYEQCACKAIUIAQoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIEQYQBSQ0AIAQQAAsgASAFNgIEQQEhBSABQQE2AgAgAkEIaiADKAIAIAMoAgQQzwIgAkEYaiEBAkACQCACKAIIIgMgAigCDCIEQez0wABBFBCwAkUEQCADIARBgPXAAEEUELACDQEgAyAEQZT1wABBFBCwAkUEQCABQQM6AAEMAwsgAUECOgABDAILIAFBADoAAQwBCyABQQE6AAELIAFBADoAACACLQAYDQMgACACLQAZOgABQQAhBQwECyAFQYQBTwRAIAUQAAsgAigCFCIDQYQBTwRAIAMQAAsgASgCCCIDIAEoAgxHDQALCyAAQYAIOwEADAILIAAgAigCHDYCBAsgACAFOgAAIAIoAhQiAEGEAUkNACAAEAALIAJBIGokAAuEAwEEfyMAQSBrIgIkAAJAAkACQCABKAIIIgMgASgCDEcEQCABQRBqIQQDQCABIANBCGo2AgggAiADKAIAIAMoAgQQoAI2AhQCQCAEIAJBFGoQ1QIiBRAXQQFGBEAgAigCFCAEKAIAEC5BAUcNAQsCQCABKAIARQ0AIAEoAgQiBEGEAUkNACAEEAALIAEgBTYCBEEBIQUgAUEBNgIAIAJBCGogAygCACADKAIEEM8CIAJBGGohAQJAIAIoAggiAyACKAIMIgRBk/vAAEEVELACRQRAIAMgBEGo+8AAQQ8QsAJFBEAgAUECOgABDAILIAFBAToAAQwBCyABQQA6AAELIAFBADoAACACLQAYDQMgACACLQAZOgABQQAhBQwECyAFQYQBTwRAIAUQAAsgAigCFCIDQYQBTwRAIAMQAAsgASgCCCIDIAEoAgxHDQALCyAAQYAGOwEADAILIAAgAigCHDYCBAsgACAFOgAAIAIoAhQiAEGEAUkNACAAEAALIAJBIGokAAu+AgEEfyMAQSBrIgIkAAJAAkACQCABKAIIIgMgASgCDEcEQCABQRBqIQUDQCABIANBCGo2AgggAiADKAIAIAMoAgQQnwI2AhQCQCAFIAJBFGoQ0gIiBBAXQQFGBEAgAigCFCAFKAIAEC5BAUcNAQsCQCABKAIARQ0AIAEoAgQiBUGEAUkNACAFEAALIAEgBDYCBEEBIQQgAUEBNgIAIAJBCGogAygCACADKAIEEM8CIAJBGGogAigCCCACKAIMELUBIAItABgNAyAAIAItABk6AAFBACEEDAQLIARBhAFPBEAgBBAACyACKAIUIgNBhAFPBEAgAxAACyABKAIIIgMgASgCDEcNAAsLIABBgA47AQAMAgsgACACKAIcNgIECyAAIAQ6AAAgAigCFCIAQYQBSQ0AIAAQAAsgAkEgaiQAC6wEAQR/IwBBIGsiAyQAAkACQAJAIAEoAggiAiABKAIMRwRAIAFBEGohBQNAIAEgAkEIajYCCCADIAIoAgAgAigCBBCgAjYCFAJAIAUgA0EUahDVAiIEEBdBAUYEQCADKAIUIAUoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIFQYQBSQ0AIAUQAAsgASAENgIEQQEhBSABQQE2AgAgA0EIaiACKAIAIAIoAgQQzwIgA0EYaiEBAkACQAJAAkACQAJAAkAgAygCCCICIAMoAgwiBEGG0sAAQQkQsAJFBEAgAiAEQY/SwABBDhCwAg0BIAIgBEGd0sAAQQ4QsAINAiACIARBq9LAAEEUELACDQMgAiAEQb/SwABBCBCwAg0EIAIgBEHH0sAAQRQQsAINBSACIARB29LAAEEIELACDQYgAiAEQePSwABBCxCwAkUEQCABQQg6AAEMCAsgAUEHOgABDAcLIAFBADoAAQwGCyABQQE6AAEMBQsgAUECOgABDAQLIAFBAzoAAQwDCyABQQQ6AAEMAgsgAUEFOgABDAELIAFBBjoAAQsgAUEAOgAAIAMtABgNAyAAIAMtABk6AAFBACEFDAQLIARBhAFPBEAgBBAACyADKAIUIgJBhAFPBEAgAhAACyABKAIIIgIgASgCDEcNAAsLIABBgBI7AQAMAgsgACADKAIcNgIECyAAIAU6AAAgAygCFCIAQYQBSQ0AIAAQAAsgA0EgaiQAC9gDAQR/IwBBIGsiAiQAAkACQAJAIAEoAggiAyABKAIMRwRAIAFBEGohBQNAIAEgA0EIajYCCCACIAMoAgAgAygCBBCgAjYCFAJAIAUgAkEUahDVAiIEEBdBAUYEQCACKAIUIAUoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIFQYQBSQ0AIAUQAAsgASAENgIEQQEhBSABQQE2AgAgAkEIaiADKAIAIAMoAgQQzwIgAkEYaiEBAkACQAJAAkAgAigCCCIDIAIoAgwiBEGp98AAQRwQsAJFBEAgAyAEQcX3wABBFhCwAg0BIAMgBEHb98AAQRMQsAINAiADIARB7vfAAEEXELACDQMgAyAEQYX4wABBFRCwAkUEQCABQQU6AAEMBQsgAUEEOgABDAQLIAFBADoAAQwDCyABQQE6AAEMAgsgAUECOgABDAELIAFBAzoAAQsgAUEAOgAAIAItABgNAyAAIAItABk6AAFBACEFDAQLIARBhAFPBEAgBBAACyACKAIUIgNBhAFPBEAgAxAACyABKAIIIgMgASgCDEcNAAsLIABBgAw7AQAMAgsgACACKAIcNgIECyAAIAU6AAAgAigCFCIAQYQBSQ0AIAAQAAsgAkEgaiQAC74CAQR/IwBBIGsiAiQAAkACQAJAIAEoAggiAyABKAIMRwRAIAFBEGohBQNAIAEgA0EIajYCCCACIAMoAgAgAygCBBCgAjYCFAJAIAUgAkEUahDVAiIEEBdBAUYEQCACKAIUIAUoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIFQYQBSQ0AIAUQAAsgASAENgIEQQEhBCABQQE2AgAgAkEIaiADKAIAIAMoAgQQzwIgAkEYaiACKAIIIAIoAgwQtQEgAi0AGA0DIAAgAi0AGToAAUEAIQQMBAsgBEGEAU8EQCAEEAALIAIoAhQiA0GEAU8EQCADEAALIAEoAggiAyABKAIMRw0ACwsgAEGADjsBAAwCCyAAIAIoAhw2AgQLIAAgBDoAACACKAIUIgBBhAFJDQAgABAACyACQSBqJAALhAMBBH8jAEEgayICJAACQAJAAkAgASgCCCIDIAEoAgxHBEAgAUEQaiEEA0AgASADQQhqNgIIIAIgAygCACADKAIEEJ8CNgIUAkAgBCACQRRqENICIgUQF0EBRgRAIAIoAhQgBCgCABAuQQFHDQELAkAgASgCAEUNACABKAIEIgRBhAFJDQAgBBAACyABIAU2AgRBASEFIAFBATYCACACQQhqIAMoAgAgAygCBBDPAiACQRhqIQECQCACKAIIIgMgAigCDCIEQbzxwABBDhCwAkUEQCADIARByvHAAEEFELACRQRAIAFBAjoAAQwCCyABQQE6AAEMAQsgAUEAOgABCyABQQA6AAAgAi0AGA0DIAAgAi0AGToAAUEAIQUMBAsgBUGEAU8EQCAFEAALIAIoAhQiA0GEAU8EQCADEAALIAEoAggiAyABKAIMRw0ACwsgAEGABjsBAAwCCyAAIAIoAhw2AgQLIAAgBToAACACKAIUIgBBhAFJDQAgABAACyACQSBqJAALkAQBBH8jAEEgayIDJAACQAJAAkAgASgCCCICIAEoAgxHBEAgAUEQaiEFA0AgASACQQhqNgIIIAMgAigCACACKAIEEKACNgIUAkAgBSADQRRqENUCIgQQF0EBRgRAIAMoAhQgBSgCABAuQQFHDQELAkAgASgCAEUNACABKAIEIgVBhAFJDQAgBRAACyABIAQ2AgRBASEFIAFBATYCACADQQhqIAIoAgAgAigCBBDPAiADQRhqIQECQAJAAkACQAJAAkAgAygCCCICIAMoAgwiBEHT9cAAQQwQsAJFBEAgAiAEQd/1wABBCxCwAg0BIAIgBEHq9cAAQQ8QsAINAiACIARB+fXAAEEYELACDQMgAiAEQZH2wABBGBCwAg0EIAIgBEGp9sAAQQ0QsAINBSACIARBtvbAAEEXELACRQRAIAFBBzoAAQwHCyABQQY6AAEMBgsgAUEAOgABDAULIAFBAToAAQwECyABQQI6AAEMAwsgAUEDOgABDAILIAFBBDoAAQwBCyABQQU6AAELIAFBADoAACADLQAYDQMgACADLQAZOgABQQAhBQwECyAEQYQBTwRAIAQQAAsgAygCFCICQYQBTwRAIAIQAAsgASgCCCICIAEoAgxHDQALCyAAQYAQOwEADAILIAAgAygCHDYCBAsgACAFOgAAIAMoAhQiAEGEAUkNACAAEAALIANBIGokAAuEAwEEfyMAQSBrIgIkAAJAAkACQCABKAIIIgMgASgCDEcEQCABQRBqIQQDQCABIANBCGo2AgggAiADKAIAIAMoAgQQoAI2AhQCQCAEIAJBFGoQ1QIiBRAXQQFGBEAgAigCFCAEKAIAEC5BAUcNAQsCQCABKAIARQ0AIAEoAgQiBEGEAUkNACAEEAALIAEgBTYCBEEBIQUgAUEBNgIAIAJBCGogAygCACADKAIEEM8CIAJBGGohAQJAIAIoAggiAyACKAIMIgRButTAAEEGELACRQRAIAMgBEHA1MAAQQYQsAJFBEAgAUECOgABDAILIAFBAToAAQwBCyABQQA6AAELIAFBADoAACACLQAYDQMgACACLQAZOgABQQAhBQwECyAFQYQBTwRAIAUQAAsgAigCFCIDQYQBTwRAIAMQAAsgASgCCCIDIAEoAgxHDQALCyAAQYAGOwEADAILIAAgAigCHDYCBAsgACAFOgAAIAIoAhQiAEGEAUkNACAAEAALIAJBIGokAAuEAwEEfyMAQSBrIgIkAAJAAkACQCABKAIIIgMgASgCDEcEQCABQRBqIQQDQCABIANBCGo2AgggAiADKAIAIAMoAgQQoAI2AhQCQCAEIAJBFGoQ1QIiBRAXQQFGBEAgAigCFCAEKAIAEC5BAUcNAQsCQCABKAIARQ0AIAEoAgQiBEGEAUkNACAEEAALIAEgBTYCBEEBIQUgAUEBNgIAIAJBCGogAygCACADKAIEEM8CIAJBGGohAQJAIAIoAggiAyACKAIMIgRB3dPAAEEWELACRQRAIAMgBEHz08AAQQoQsAJFBEAgAUECOgABDAILIAFBAToAAQwBCyABQQA6AAELIAFBADoAACACLQAYDQMgACACLQAZOgABQQAhBQwECyAFQYQBTwRAIAUQAAsgAigCFCIDQYQBTwRAIAMQAAsgASgCCCIDIAEoAgxHDQALCyAAQYAGOwEADAILIAAgAigCHDYCBAsgACAFOgAAIAIoAhQiAEGEAUkNACAAEAALIAJBIGokAAudAgEEfyMAQRBrIgIkAAJAIAFBgAFPBEAgAkEMaiIEQQJyIQMgAkEANgIMAkAgAUGAEE8EQCAEQQNyIQUgAUGAgARPBEAgAkEQaiEDIAIgAUESdkHwAXI6AAwgAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAUhBAwCCyACIAFBDHZB4AFyOgAMIAIgAUEGdkE/cUGAAXI6AA0gAyEEIAUhAwwBCyACQQxqQQFyIQQgAiABQQZ2QcABcjoADAsgBCABQT9xQYABcjoAACAAIAJBDGogAxDzAQwBCyAAKAIIIgMgACgCAEYEQCAAQYzYwAAQqQELIAAoAgQgA2ogAToAACAAIANBAWo2AggLIAJBEGokAEEAC50CAQR/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQxqIgRBAnIhAyACQQA2AgwCQCABQYAQTwRAIARBA3IhBSABQYCABE8EQCACQRBqIQMgAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA0gBSEEDAILIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADSADIQQgBSEDDAELIAJBDGpBAXIhBCACIAFBBnZBwAFyOgAMCyAEIAFBP3FBgAFyOgAAIAAgAkEMaiADEPMBDAELIAAoAggiAyAAKAIARgRAIABB2N7AABCpAQsgACgCBCADaiABOgAAIAAgA0EBajYCCAsgAkEQaiQAQQALnQIBBH8jAEEQayICJAACQCABQYABTwRAIAJBDGoiBEECciEDIAJBADYCDAJAIAFBgBBPBEAgBEEDciEFIAFBgIAETwRAIAJBEGohAyACIAFBEnZB8AFyOgAMIAIgAUEGdkE/cUGAAXI6AA4gAiABQQx2QT9xQYABcjoADSAFIQQMAgsgAiABQQx2QeABcjoADCACIAFBBnZBP3FBgAFyOgANIAMhBCAFIQMMAQsgAkEMakEBciEEIAIgAUEGdkHAAXI6AAwLIAQgAUE/cUGAAXI6AAAgACACQQxqIAMQ8wEMAQsgACgCCCIDIAAoAgBGBEAgAEGY7cAAEKkBCyAAKAIEIANqIAE6AAAgACADQQFqNgIICyACQRBqJABBAAudAgEEfyMAQRBrIgIkAAJAIAFBgAFPBEAgAkEMaiIEQQJyIQMgAkEANgIMAkAgAUGAEE8EQCAEQQNyIQUgAUGAgARPBEAgAkEQaiEDIAIgAUESdkHwAXI6AAwgAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAUhBAwCCyACIAFBDHZB4AFyOgAMIAIgAUEGdkE/cUGAAXI6AA0gAyEEIAUhAwwBCyACQQxqQQFyIQQgAiABQQZ2QcABcjoADAsgBCABQT9xQYABcjoAACAAIAJBDGogAxDzAQwBCyAAKAIIIgMgACgCAEYEQCAAQfCCwQAQqQELIAAoAgQgA2ogAToAACAAIANBAWo2AggLIAJBEGokAEEAC50CAQR/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQxqIgRBAnIhAyACQQA2AgwCQCABQYAQTwRAIARBA3IhBSABQYCABE8EQCACQRBqIQMgAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA0gBSEEDAILIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADSADIQQgBSEDDAELIAJBDGpBAXIhBCACIAFBBnZBwAFyOgAMCyAEIAFBP3FBgAFyOgAAIAAgAkEMaiADEPMBDAELIAAoAggiAyAAKAIARgRAIABBhIbBABCpAQsgACgCBCADaiABOgAAIAAgA0EBajYCCAsgAkEQaiQAQQALiwIBAX8jAEEQayICJAAgACgCACEAAn8gASgCACABKAIIcgRAIAJBADYCDCABIAJBDGoCfyAAQYABTwRAIABBgBBPBEAgAEGAgARPBEAgAiAAQT9xQYABcjoADyACIABBEnZB8AFyOgAMIAIgAEEGdkE/cUGAAXI6AA4gAiAAQQx2QT9xQYABcjoADUEEDAMLIAIgAEE/cUGAAXI6AA4gAiAAQQx2QeABcjoADCACIABBBnZBP3FBgAFyOgANQQMMAgsgAiAAQT9xQYABcjoADSACIABBBnZBwAFyOgAMQQIMAQsgAiAAOgAMQQELEEYMAQsgASgCHCAAIAEoAiAoAhARAAALIAJBEGokAAuqAgIDfwF+IwBBQGoiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBJGoiBEEANgIAIAJCgICAgBA3AhwgAkEwaiADKAIAIgNBCGopAgA3AwAgAkE4aiADQRBqKQIANwMAIAIgAykCADcDKCACQRxqQbiBwAAgAkEoahBRGiACQRhqIAQoAgAiAzYCACACIAIpAhwiBTcDECABQQhqIAM2AgAgASAFNwIACyABKQIAIQUgAUKAgICAEDcCACACQQhqIgMgAUEIaiIBKAIANgIAIAFBADYCAEHRiMEALQAAGiACIAU3AwBBDEEEEMcCIgFFBEBBBEEMEOsCAAsgASACKQMANwIAIAFBCGogAygCADYCACAAQbCEwAA2AgQgACABNgIAIAJBQGskAAv8AQIBfgJ/IwBBgAFrIgQkACAAKAIAKQMAIQICfwJAIAEoAhQiAEEQcUUEQCAAQSBxDQEgAkEBIAEQbAwCC0EAIQADQCAAIARqQf8AaiACp0EPcSIDQTByIANB1wBqIANBCkkbOgAAIABBAWshACACQg9WIAJCBIghAg0ACyABQQFBkaHAAEECIAAgBGpBgAFqQQAgAGsQRQwBC0EAIQADQCAAIARqQf8AaiACp0EPcSIDQTByIANBN2ogA0EKSRs6AAAgAEEBayEAIAJCD1YgAkIEiCECDQALIAFBAUGRocAAQQIgACAEakGAAWpBACAAaxBFCyAEQYABaiQAC/4BAgN/BH4jAEEwayIDJAACQAJ/IAJB//8DcUGQzgBLBEBButvAACEFQRoMAQsgAVAEQEIAIQEMAgsgA0EgaiACQZDOAGqtQv//A4NCACABQgAQxQEgA0EQaiADKQMgIgEgA0EoaikDACIHQpDOAEIAEIUCIAMgAykDECIGIANBGGopAwAiCEKQzgBCABDFASAIIAYgASADKQMAIgl9IAcgA0EIaikDAH0gASAJVK19hEIAUq18IgEgBlStfFANAUH42sAAIQVBFgshAkEBIQQgBSACEAEhAgsgACAENgIMIAAgAkEAIAQbNgIIIABCACABIAQbNwMAIANB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//8Ag0KAgICAgICA+P8AWgRAIAJBATYCFCACQZTDwAA2AhAgAkIBNwIcIAJBNjYCLCACIAA2AiggAiACQShqNgIYIAEoAhwgASgCICACQRBqEFEhAwwBCyACQQA6AAwgAiABNgIIQQEhAyACQQE2AhQgAkGUw8AANgIQIAJCATcCHCACQTY2AiwgAiAANgIoIAIgAkEoajYCGCACQQhqIAJBEGoQ7wINACACLQAMRQRAIAFBnMPAAEECEMACDQELQQAhAwsgAkEwaiQAIAMLzgEBAn8jAEEwayICJAAgAiABNgIMAkAgARAvQQFHBEAgAkEMaiACQRBqQaDhwAAQVSEDIABBATYCACAAIAM2AgQgAUGEAUkNASABEAAMAQsgAkEQaiABEJcBIAIoAhAiAUUEQCAAIAIpAyA3AxAgAEEANgIAIAAgAkEoaikDADcDGCABRQ0BIAIoAhQiAEGEAUkNASAAEAAMAQtBk+PAAEHLABDGASEBIABBATYCACAAIAE2AgQgAigCFCIAQYQBSQ0AIAAQAAsgAkEwaiQAC84BAQJ/IwBBMGsiAiQAIAIgATYCDAJAIAEQL0EBRwRAIAJBDGogAkEQakGg4cAAEFQhAyAAQQE2AgAgACADNgIEIAFBhAFJDQEgARAADAELIAJBEGogARCXASACKAIQIgFFBEAgACACKQMgNwMQIABBADYCACAAIAJBKGopAwA3AxggAUUNASACKAIUIgBBhAFJDQEgABAADAELQZPjwABBywAQxgEhASAAQQE2AgAgACABNgIEIAIoAhQiAEGEAUkNACAAEAALIAJBMGokAAvEAQICfwJ+IwBBQGoiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxBaAn4gAigCEEUEQCAAIAIpAzA3AyAgACACKQMgNwMQIAAgAkE4aikDADcDKCAAIAJBKGopAwA3AxhCASEEQgAMAQsgACACKAIUNgIQQgIhBEIACyEFIAAgBDcDACAAIAU3AwgLIAJBQGskAAu2AQECfyMAQUBqIgMkACADQRhqIAIQChBgIAJBhAFPBEAgAhAACyADKAIYQQFHBEAgA0EIaiABIAMpAyAgAy8BKBBcIAACfyADKAIIRQRAIAMpAxAhAUEADAELIAMoAgwgAygCEBABIQRBAQsiAjYCDCAAIARBACACGzYCCCAAQgAgASACGzcDACADQUBrJAAPCyADIAMoAhw2AjAgA0E0aiADQTBqELsBIAMoAjggAygCPBDuAgALzgECAX8CfiMAQUBqIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARBbIAIoAhBFBEAgAikDMCEDIAIpAyAhBCAAIAJBKGopAwA3AxggACAENwMQIABCADcDCCAAQgE3AwAgACADNwMgDAELIAIoAhQhASAAQgA3AwggAEICNwMAIAAgATYCEAsgAkFAayQAC8EBAgN/AX4jAEEwayICJAAgASgCAEGAgICAeEYEQCABKAIMIQMgAkEUaiIEQQA2AgAgAkKAgICAEDcCDCACQSBqIAMoAgAiA0EIaikCADcDACACQShqIANBEGopAgA3AwAgAiADKQIANwMYIAJBDGpBuIHAACACQRhqEFEaIAJBCGogBCgCACIDNgIAIAIgAikCDCIFNwMAIAFBCGogAzYCACABIAU3AgALIABBsITAADYCBCAAIAE2AgAgAkEwaiQAC5YCAQJ/IwBBIGsiBSQAQeSIwQBB5IjBACgCACIGQQFqNgIAAkACf0EAIAZBAEgNABpBAUGwjMEALQAADQAaQbCMwQBBAToAAEGsjMEAQayMwQAoAgBBAWo2AgBBAgtB/wFxIgZBAkcEQCAGQQFxRQ0BIAVBCGogACABKAIYEQEAAAtB2IjBACgCACIGQQBIDQBB2IjBACAGQQFqNgIAQdiIwQBB3IjBACgCAAR/IAUgACABKAIUEQEAIAUgBDoAHSAFIAM6ABwgBSACNgIYIAUgBSkDADcCEEHciMEAKAIAIAVBEGpB4IjBACgCACgCFBEBAEHYiMEAKAIAQQFrBSAGCzYCAEGwjMEAQQA6AAAgA0UNAAALAAu3AQICfwJ+IwBBQGoiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxBbAn4gAigCEEUEQCAAIAIpAyA3AxAgACACKQMwNwMgIAAgAkEoaikDADcDGEIBIQRCAAwBCyAAIAIoAhQ2AhBCAiEEQgALIQUgACAENwMAIAAgBTcDCAsgAkFAayQAC6wBAQR/IwBBIGsiAiQAQQggACgCACIEQQFqIgMgBEEBdCIFIAMgBUsbIgMgA0EITRsiA0EASARAQQBBACABELsCAAtBACEFIAIgBAR/IAIgBDYCHCACIAAoAgQ2AhRBAQUgBQs2AhggAkEIaiADIAJBFGoQsgEgAigCCEEBRgRAIAIoAgwgAigCECABELsCAAsgAigCDCEBIAAgAzYCACAAIAE2AgQgAkEgaiQAC70BAgR/An4jAEEgayIBJAACQEEAQYDKwAAoAgARAwAiAgRAIAIoAgANASACQX82AgAgAUEIaiACQQRqIAAoAgAiAyAAKAIEIgAQeQJ/IAEoAhgiBEUEQCABKAIIDAELIAEpAwghBSABKQMQIQYgASADIAAQhwM2AhAgASAGNwIIIAQgBSABQQhqEJEBC0EEaygCABAKIAIgAigCAEEBajYCACABQSBqJAAPC0HwyMAAEPABAAtB7MrAABDxAQALhAECAn8BfiAAAn8CQCABrSIEQiCIpw0AIASnIgJB/////wdLDQAgAkUEQCAAQQE2AgggAEEANgIEQQAMAgtB0YjBAC0AABogAkEBEMcCIgMEQCAAIAM2AgggACABNgIEQQAMAgsgACACNgIIIABBATYCBEEBDAELIABBADYCBEEBCzYCAAusAQIDfwF+IwBBIGsiAyQAAkAgAkH//wNxIgVBkM4ATQRAIAFQIAVBkM4ARnINASADQRBqQpDOACACQf//AHEiAq19QgAgAkGQzgBLrX0gAUIAEMUBIAMgAykDECADQRhqKQMAQpDOAEIAEIUCIAMpAwAhBgwBC0EBIQRButvAAEEaEAEhAgsgACAENgIMIAAgAkEAIAQbNgIIIABCACAGIAQbNwMAIANBIGokAAuYAQIBfwR+IwBBEGsiAyQAIAMgABCYASADKQMIIQQgAykDACEFIAMgASACIAEgAkgbEDEQmAEgAykDCCEGIAMpAwAhByADIAEgAiABIAJKGxAxEJgBAn9BAyABIAJGDQAaQQEgBSAHWCAEIAZYIAQgBlEbDQAaIAUgAykDAFogBCADKQMIIgVaIAQgBVEbQQF0CyADQRBqJAALwQECAX8BfiMAQTBrIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARChASACKAIQRQRAIAIpAyAhAyAAIAJBKGopAwA3AxggACADNwMQIABCADcDCCAAQgE3AwAMAQsgAigCFCEBIABCADcDCCAAQgI3AwAgACABNgIQCyACQTBqJAALwQECAX8BfiMAQTBrIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARCiASACKAIQRQRAIAIpAyAhAyAAIAJBKGopAwA3AxggACADNwMQIABCADcDCCAAQgE3AwAMAQsgAigCFCEBIABCADcDCCAAQgI3AwAgACABNgIQCyACQTBqJAALrgECAn8CfiMAQTBrIgIkAAJAAkAgASgCAARAIAJBCGogARD7ASACKAIIDQELIABCADcDCCAAQgA3AwAMAQsgAigCDCEDIAEgASgCDEEBajYCDCACQRBqIAMQoQECfiACKAIQRQRAIAAgAikDIDcDECAAIAJBKGopAwA3AxhCASEEQgAMAQsgACACKAIUNgIQQgIhBEIACyEFIAAgBDcDACAAIAU3AwgLIAJBMGokAAuuAQICfwJ+IwBBMGsiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxCiAQJ+IAIoAhBFBEAgACACKQMgNwMQIAAgAkEoaikDADcDGEIBIQRCAAwBCyAAIAIoAhQ2AhBCAiEEQgALIQUgACAENwMAIAAgBTcDCAsgAkEwaiQAC4UBAQF/AkAgAUEATgRAAn8gAigCBARAIAIoAggiAwRAIAIoAgAgA0EBIAEQvgIMAgsLQQEgAUUNABpB0YjBAC0AABogAUEBEMcCCyICBEAgACABNgIIIAAgAjYCBCAAQQA2AgAPCyAAIAE2AgggAEEBNgIEDAELIABBADYCBAsgAEEBNgIAC8QBAgF/AXwjAEEgayICJAAgAiABKAIAEBYgAkEQaiACKAIAIAIrAwgQqQICQAJAIAIoAhBBAUYEQCACKwMYIQMgARDgAg0BCyAAQgA3AwAMAQsgAEIBNwMAIANEAAAAAAAA4MNmIQEgAEL///////////8AAn4gA5lEAAAAAAAA4ENjBEAgA7AMAQtCgICAgICAgICAfwtCgICAgICAgICAfyABGyADRP///////99DZBtCACADIANhGzcDCAsgAkEgaiQAC50BAQF/IwBBEGsiAiQAAkAgASgCABAgBEAgAkEEaiABENUBIABBCGogAkEMaigCADYCACAAIAIpAgQ3AgAMAQsgASgCABAaRQRAIABBgICAgHg2AgAMAQsgAiABKAIAEB0iATYCACACQQRqIAIQ1QEgAEEIaiACQQxqKAIANgIAIAAgAikCBDcCACABQYQBSQ0AIAEQAAsgAkEQaiQAC7kBAAJAAkACQAJAAkAgASACQZDwwABBCxCwAkUEQCABIAJBm/DAAEEMELACDQEgASACQafwwABBDhCwAg0CIAEgAkG18MAAQREQsAINAyABIAJBxvDAAEERELACDQQgASACQdfwwABBFBCwAkUEQCAAQQY6AAEMBgsgAEEFOgABDAULIABBADoAAQwECyAAQQE6AAEMAwsgAEECOgABDAILIABBAzoAAQwBCyAAQQQ6AAELIABBADoAAAuNAwEHfyMAQRBrIgckAAJAAkAgAkEHTQRAIAINAQwCCyAHQQhqIQYCQAJAAkACQCABQQNqQXxxIgMgAUYNACADIAFrIgMgAiACIANLGyIDRQ0AQQEhBQNAIAEgBGotAABBLkYNBCADIARBAWoiBEcNAAsgAyACQQhrIgVLDQIMAQsgAkEIayEFQQAhAwtBrty48QIhBANAQYCChAggASADaiIIKAIAQa7cuPECcyIJayAJckGAgoQIIAhBBGooAgBBrty48QJzIghrIAhycUGAgYKEeHFBgIGChHhHDQEgA0EIaiIDIAVNDQALCyACIANHBEBBLiEEQQEhBQNAIAEgA2otAABBLkYEQCADIQQMAwsgAiADQQFqIgNHDQALC0EAIQULIAYgBDYCBCAGIAU2AgAgBygCCEEBRiEGDAELIAJBAWshBCABIQMDQCADLQAAQS5GIgYNASADQQFqIQMgBCIFQQFrIQQgBQ0ACwsgACAGIAAtAARyOgAEIAAoAgAgASACEMACIAdBEGokAAuPAQECfyMAQUBqIgIkACACQgA3AzggAkE4aiAAKAIAEAMgAiACKAI8IgA2AjQgAiACKAI4NgIwIAIgADYCLCACQSI2AiggAkECNgIQIAJBiLzAADYCDCACQgE3AhggAiACQSxqIgM2AiQgAiACQSRqNgIUIAEoAhwgASgCICACQQxqEFEgAxDIASACQUBrJAALzggCBH8LfiMAQUBqIgMkACMAQeABayICJAAgAkHAAWogABCYASACQbABakKQzgBBkM4AIAFB//8DcSIAIABBkM4ATxsiAK0iBn1CACAAQZDOAEutfULAhD1CABDFASACQaABaiAGQgBCwIQ9QgAQxQEgAkHQAWoiACACKQOwASACQbgBaikDABB6IAIpA9ABIQcgAikD2AEhCyAAIAIpA6ABIgZCgMivoCV8IgkgAkGoAWopAwAgBiAJVq18IgoQeiACQSBqIAIpA9gBIgxCACACKQPQASIGQgAQxQEgAkGQAWogBkIAIAZCABDFASACQRBqIAtCACACKQPAASIIQgAQxQEgAiACKQPIASINQgAgB0IAEMUBIAJB0ABqIAhCACAHQgAQxQEgAkHwAGogAikDUCACQdgAaikDACIOIAIpAwAgAikDEHx8Ig9CoI0GQgAQhQIgAkEwaiANQgAgBiAMIAIpAyiEQgBSIAJBmAFqKQMAIhAgAikDICIHIAd8fCIHIBBUckF/cyACKQOQASAJVCAHIApUIAcgClEbca18IgdCABDFASACQUBrIAwgBiAHVq18IglCACAIQgAQxQEgAkHgAGogCEIAIAdCABDFASACQYABaiACKQNgIAJB6ABqKQMAIgcgAikDMCACKQNAfHwiCkKgjQZCABCFAiADQRBqIgBCx7ac4tr4KSACQfgAaikDACIGIA1CAFIiASALQgBScSACKQMIQgBSciACKQMYQgBSciAOIA9WciIEGzcDCCAAQvLm8Ib4+cORhH9C0PaEgBAgAikDcCIIIAhC0PaEgBBYG0LQ9oSAECAIIAZQGyAGUBsgBBs3AwAgAEKxifv/DyACQYgBaikDACIGQrGJ+/8PIAIpA4ABIghCr+fswKrm3901VCAGQrGJ+/8PVCAGQrGJ+/8PURsiBBsgASAJQgBScSACKQM4QgBSciACKQNIQgBSciAHIApWciIBGzcDGCAAQq/n7MCq5t/dNSAIQq/n7MCq5t/dNSAEGyABGzcDECACQeABaiQAIAMpAxAhBiADKQMYIQggAykDICEHIAMgA0EoaikDADcDKCADIAc3AyAgAyAINwMYIAMgBjcDECADQQA2AjwgA0EIaiEEIwBBMGsiASQAIAFBKGogA0E8ahDUAiABKAIsIQICfwJAIAEoAigiBUUNACABIAI2AiQgASAFNgIgIAFBGGogAUEgakGfzMAAQQwgABDoAQJAIAEoAhgEQCABKAIcIQIMAQsgAUEQaiABQSBqQavMwABBDCAAQRBqEOgBIAEoAhAEQCABKAIUIQIMAQsgAUEIaiABKAIgIAEoAiQQ0wIgASgCDCECIAEoAggMAgsgASgCJCIAQYQBSQ0AIAAQAAtBAQshACAEIAI2AgQgBCAANgIAIAFBMGokACADKAIIQQFxBEBBuO3AAEExEO4CAAsgAygCDCADQUBrJAALkgEBBH8jAEEQayICJABBASEEAkAgASgCHCIDQScgASgCICIFKAIQIgERAAANACACQQRqIAAoAgBBgQIQSQJAIAItAARBgAFGBEAgAyACKAIIIAERAABFDQEMAgsgAyACLQAOIgAgAkEEamogAi0ADyAAayAFKAIMEQIADQELIANBJyABEQAAIQQLIAJBEGokACAEC3sBAn8gAUH//wNxIgEEQCAAIAAgAW0iACABbGsiA0EfdSIEIABqIAFsIQAgASAEcSADaiEDAkACQCACQf8BcUECRwRAIANBAEwNAiACQQFxDQEMAgsgAyABQQF2SCADQQBMcg0BCyAAIAFqIQALIAAPC0HA1cAAEJsCAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQbjWwAA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEHg1sAAQTcgAkE/akHQ1sAAQeTXwAAQxwEACyAAIAIpAgw3AgAgAEEIaiACQRRqKAIANgIAIAJBQGskAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQejqwAA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEGQ68AAQTcgAkE/akGA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AAAAAGENACAAvSIDQjSIp0H/D3EiAkGyCEsNAAJAAkAgA0IAWQRAIAEgAEQAAAAAAAAwQ6BEAAAAAAAAMMOgIAChIgY5AwggAkH/B08NASABKwMIGkQAAAAAAAAAAAwECyABIABEAAAAAAAAMMOgRAAAAAAAADBDoCAAoSIGOQMIIAJB/wdJDQELIAYgAKAiAEQAAAAAAADwv6AgACAGRAAAAAAAAAAAZBsMAgsgASsDCBpEAAAAAAAA8L8hAAsgAAshACMAQRBrIgEkAAJ+QgAgAL0iA0KAgICAgICA+D9UDQAaIANCgICAgICAgPjHAFoEQEJ/QgAgA0KBgICAgICA+P8AVBsiBAwBCyABQgAgA0ILhkKAgICAgICAgIB/hEH+ACADQjSIp2tB/wBxEN4BIAEpAwAhBCABQQhqKQMACyEDIAUgBDcDACAFIAM3AwggAUEQaiQAQn8gBUEIaikDAEIAIABEAAAAAAAAAABmIgEbIABE////////70dkIgIbQn8gBSkDAEIAIAEbIAIbECcgBUEQaiQAC2wBAX8jAEEwayICJAAgAkEYaiAAKAIAECkgAkEQaiACKAIYIAIoAhwQzwIgAkEIaiACKAIQIAIoAhQQ/QEgAkEkaiIAIAIoAgggAigCDBC8AiACKAIoIAIoAiwgARDtAiAAEMgBIAJBMGokAAttAQF/IwBB4AFrIgEkACABIAAQChA0IABBhAFPBEAgABAACyABKAIAQQFGBEAgASABKAIENgLQASABQdQBaiABQdABahC8ASABKALYASABKALcARDuAgALIAEvAbwBIAEvAb4BRyABQeABaiQAC2YBAX8jAEEgayICJAAgAiAAIAEgACABShs2AhggAiAAIAEgACABSBs2AhQgAkEANgIcIAJBCGogAkEUaiACQRxqEJoBIAIoAghBAXEEQEG47cAAQTEQ7gIACyACKAIMIAJBIGokAAt1AQF/IwBBQGoiAyQAIAMgAjYCFCADIAE2AhAgAyAANgIMIANBAjYCHCADQbTqwAA2AhggA0ICNwIkIANBOjYCPCADQQI2AjQgAyADQTBqNgIgIAMgA0EQajYCOCADIANBDGo2AjAgA0EYahCbASADQUBrJAALdQEBfyMAQUBqIgMkACADIAI2AhQgAyABNgIQIAMgADYCDCADQQI2AhwgA0G06sAANgIYIANCAjcCJCADQTo2AjwgA0ECNgI0IAMgA0EwajYCICADIANBEGo2AjggAyADQQxqNgIwIANBGGoQnAEgA0FAayQAC2MBAX8jAEEQayIFJAAgBUEIaiABIAIgAyAEQQBHED0gBSgCDCEEIAAgBSgCCCIBBH8gASAEEAEhBEEBBUEACyICNgIIIAAgBEEAIAIbNgIEIABBACAEIAIbNgIAIAVBEGokAAtjAQF/IwBBEGsiBSQAIAVBCGogASACIAMgBEEARxBCIAUoAgwhBCAAIAUoAggiAQR/IAEgBBABIQRBAQVBAAsiAjYCCCAAIARBACACGzYCBCAAQQAgBCACGzYCACAFQRBqJAALawICfwF+IwBBEGsiBSQAIAUgASACIAMgBEEARxA8AkAgBSgCAEUEQCAFKQMIIQcMAQtBASEGIAUoAgQgBSgCCBABIQQLIAAgBjYCDCAAIARBACAGGzYCCCAAQgAgByAGGzcDACAFQRBqJAALawICfwF+IwBBEGsiBSQAIAUgASACIAMgBEEARxBdAkAgBSgCAEUEQCAFKQMIIQcMAQtBASEGIAUoAgQgBSgCCBABIQQLIAAgBjYCDCAAIARBACAGGzYCCCAAQgAgByAGGzcDACAFQRBqJAAL1wEBAn8jAEEgayIGJAAgAUUEQEHcv8AAQTIQ7gIACyAGQRRqIgcgASADIAQgBSACKAIQEQcAIwBBEGsiAyQAAkACQCAGQQhqIgIgBygCCCIBIAcoAgBJBH8gA0EIaiAHIAFBBEEEEJkBIAMoAggiAUGBgICAeEcNASAHKAIIBSABCzYCBCACIAcoAgQ2AgAgA0EQaiQADAELIAEgAygCDEHMv8AAELsCAAsgBiAGKAIIIAYoAgwQzwIgBigCBCEBIAAgBigCADYCACAAIAE2AgQgBkEgaiQAC6MBAQd/IwBBEGsiAiQAIAJBBGogASgCACIIEB8QqwEgAigCCCEEIAIoAgRBAUYEQCAEIAIoAgxB6MDAABC7AgALIAIoAgwhBRAFIgYQHCIHEB0hAyAHQYQBTwRAIAcQAAsgAyABKAIAIAUQHiADQYQBTwRAIAMQAAsgBkGEAU8EQCAGEAALIAAgCBAfNgIIIAAgBTYCBCAAIAQ2AgAgAkEQaiQAC2kCAX8BfiMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQaifwAA2AgggA0ICNwIUIANCgICAgCAiBCADrYQ3AyggAyAEIANBBGqthDcDICADIANBIGo2AhAgA0EIaiACEKMCAAuRDAIFfxJ+IwBBIGsiBSQAIAVBEGohBiMAQfACayIDJAAgA0HQAmogABCYAUGQzgAhAAJAAkACQAJAAkACQCADKQPYAiINIAMpA9ACIgsQJyABIAIQrQFB/wFxQQFrDgMDAQIACyADQdACaiIEIAEgAiABIAJIGxAxEJgBIAMpA9gCIRQgAykD0AIhEiAEIAEgAiABIAJKGxAxEJgBIANBoAFqIAtCACALQgAQxQEgA0GQAWogC0IAIA1CABDFASADQYABaiANQgAgDUIAEMUBIAMpA9gCIQkgAykD0AIhDiADQgE3A6gCIANCADcDoAIgA0IANwOYAiADQgA3A5ACIANCADcDyAIgA0IANwPAAiADIA03A7gCIAMgCzcDsAIgA0HoAmoiB0IANwMAIANB4AJqIgFCADcDACADQgA3A9gCIANCADcD0AIgA0GoAWopAwAhCiADKQOQASEIIANBmAFqKQMAIQwgAykDgAEhFSADQYgBaikDACEWIAMpA6ABIQ8gA0GwAmoiACAEEOUCDQMgA0GwAWogA0GQAmoiAiAAQQAQMiADQgE3A6gCIANCADcDoAIgA0IANwOYAiADQgA3A5ACIANCADcDyAIgA0IANwPAAiADIAk3A7gCIAMgDjcDsAIgB0IANwMAIAFCADcDACADQgA3A9gCIANCADcD0AIgACAEEOUCDQMgA0HQAWogAiAAQQAQMiADQfAAaiADKQOwASIQIAMpA9ABIhF9IglCACAPQn2DIg5CABDFASADQeAAaiADKQO4ASIPIAMpA9gBIhN9IBAgEVQiBK19IhBCACAOQgAQxQEgA0HQAGogCUIAIAggCnwiESAIfCIIQgAQxQEgA0FAayAQQgAgCEIAEMUBIANBMGogAykDwAEiFyADKQPgASIYfSIZIAQgDyATVCAPIBNRG60iD30gA0HIAWopAwAgA0HoAWopAwB9IBcgGFStfSAPIBlWrX0gDiAIEMUBIANBIGogCSAQIAwgCiARVq18IgkgFXwiCiAMIAggEVStfHwiCCAIIApUrSAWIAkgClatfHwQxQEgA0EQaiADKQNAIg4gAykDIHwiCCADKQMwfCIKIANB6ABqKQMAIANB+ABqKQMAIgkgAykDYHwiDCAJVK18fCIJIANB2ABqKQMAIAwgAykDUHwgDFStfHwiDEIAQpDOAEIAEMUBIAMgCSAMVq0gCSAKVK0gCCAKVq0gA0E4aikDACAIIA5UrSADQcgAaikDACADQShqKQMAfHx8fHx8IghCAEKQzgBCABDFASADQgA3A6gCIAMgAykDEEJwgzcDkAIgAyADQRhqKQMAIgogAykDAHwiCTcDmAIgAyADQQhqKQMAIAkgClStfDcDoAIgAyAMNwOwAiADIAggCyASfXwiCjcDuAIgAyANIBR9IAsgElStfSILIAggClatfCINNwPAAiADIAsgDVatNwPIAiAHQgA3AwAgAUIANwMAIANCADcD2AIgA0IANwPQAiADQbACaiADQdACahDlAg0DIANB8AFqIAIgAEEAEDJBkM4AIAMvAfABIgBrIQQMAgtBACEAQZDOACEEDAELQQAhAAsgBiAEOwECIAYgADsBACADQfACaiQADAELIANBADYC4AIgA0EBNgLUAiADQZjRwAA2AtACIANCBDcC2AIgA0HQAmpB7NDAABCjAgALIAUgBSgCEDYBGCAFQQA2AhwgBUEIaiECIAVBGGohAyMAQTBrIgAkACAAQShqIAVBHGoQ1AIgACgCLCEBAn8CQCAAKAIoIgRFDQAgACABNgIkIAAgBDYCICAAQRhqIABBIGpBrdHAACADEOsBAkAgACgCGARAIAAoAhwhAQwBCyAAQRBqIABBIGpBs9HAACADQQJqEOsBIAAoAhAEQCAAKAIUIQEMAQsgAEEIaiAAKAIgIAAoAiQQ0wIgACgCDCEBIAAoAggMAgsgACgCJCIDQYQBSQ0AIAMQAAtBAQshAyACIAE2AgQgAiADNgIAIABBMGokACAFKAIIQQFxBEBBuO3AAEExEO4CAAsgBSgCDCAFQSBqJAALZgAjAEEwayIAJABB0IjBAC0AAARAIABBAjYCDCAAQfiDwAA2AgggAEIBNwIUIAAgATYCLCAAIABBLGqtQoCAgIAghDcDICAAIABBIGo2AhAgAEEIakGghMAAEKMCAAsgAEEwaiQAC2gBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQQI2AgwgA0GMxcAANgIIIANCAjcCFCADQTo2AiwgA0E7NgIkIAMgADYCICADIANBIGo2AhAgAyADNgIoIANBCGoQmwEgA0EwaiQAC2gBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQQI2AgwgA0GQyMAANgIIIANCAjcCFCADQT42AiwgA0E7NgIkIAMgADYCICADIANBIGo2AhAgAyADNgIoIANBCGoQnAEgA0EwaiQAC2MBAn8jAEEQayIDJAAgAyABIAIQ3wEgAAJ/IAMoAgBFBEAgAykDCCEBQQAMAQsgAygCBCADKAIIEAEhBEEBCyICNgIMIAAgBEEAIAIbNgIIIABCACABIAIbNwMAIANBEGokAAtoAQF/IwBBMGsiAyQAIAMgAjYCBCADIAE2AgAgA0ECNgIMIANB9OnAADYCCCADQgI3AhQgA0E6NgIsIANBOzYCJCADIAA2AiAgAyADQSBqNgIQIAMgAzYCKCADQQhqEJwBIANBMGokAAtWAQF+AkAgA0HAAHFFBEAgA0UNASACIANBP3GtIgSGIAFBACADa0E/ca2IhCECIAEgBIYhAQwBCyABIANBP3GthiECQgAhAQsgACABNwMAIAAgAjcDCAtWAQF+AkAgA0HAAHFFBEAgA0UNASACQQAgA2tBP3GthiABIANBP3GtIgSIhCEBIAIgBIghAgwBCyACIANBP3GtiCEBQgAhAgsgACABNwMAIAAgAjcDCAv0AgICfwZ+IwBBEGsiAyQAQQEhBELAhD0gAq19IQVCACACQcCEPUutfSEGIwBBQGoiAiQAIAMCfwJAIAFQBEAgA0IANwMIDAELIAJBIGpCAEIAIAFCABDFASACQTBqIAFCAELAhD1CABDFASACKQMoQgBSIAJBOGopAwAiASACKQMgfCIHIAFUckUEQCAFIAaEUEUEQCACQRBqIAIpAzAiCCAHIAUgBhCFAiACIAIpAxAiCSACQRhqKQMAIgogBSAGEMUBIAogCSAIIAIpAwAiAX0gByACQQhqKQMAfSABIAhWrX2EQgBSrXwiASAJVK18UARAIAMgATcDCAwDCyADQRY2AgggA0H42sAANgIEQQEMAwtB6NrAABCaAgALIANBHTYCCCADQcvawAA2AgRBAQwBC0EACzYCACACQUBrJAACQCADKAIARQRAIAAgAykDCDcDCEEAIQQMAQsgACADKQIENwIECyAAIAQ2AgAgA0EQaiQAC/MBAQF/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f2ENABpBAiAnQoCAgICAgID4/wCDIiVCgICAgICAgPj/AFENABogJ0L/////////B4MiKUKAgICAgICACIQgJ0IBhkL+////////D4MgJ0I0iKdB/w9xIgEbIiZCAYMhKCAlUARAQQQgKVANARogAUGzCGshAEIBISUgKFAMAQtCgICAgICAgCAgJkIBhiAmQoCAgICAgIAIUSIAGyEmQgJCASAAGyElQct3Qcx3IAAbIAFqIQAgKFALIQEgCSAAOwHoCCAJICU3A+AIIAlCATcD2AggCSAmNwPQCCAJIAE6AOoIAkACfwJAAkACQAJAIAFBAmsiAwRAQQEhAUHLncAAQcydwAAgJ0IAUyIGG0HLncAAQQEgBhsgAhshGyAnQj+IpyACciEcQQMgAyADQQNPG0ECaw4CAgMBCyAJQQM2ApgIIAlBzZ3AADYClAggCUECOwGQCEEBIRtBASEBIAlBkAhqDAQLIAlBAzYCmAggCUHQncAANgKUCCAJQQI7AZAIIAlBkAhqDAMLQQIhASAJQQI7AZAIIBNFDQEgCSATNgKgCCAJQQA7AZwIIAlBAjYCmAggCUHJncAANgKUCCAJQZAIagwCC0F0QQUgAMEiAEEASBsgAGwiAEHA/QBJBEAgCUGQCGohDCAJQRBqIQogAEEEdkEVaiEHQYCAfkEAIBNrIBNBgIACTxshAQJAAkACfwJAAkACQAJAIAlB0AhqIhEpAwAiJVBFBEAgJUKAgICAgICAgCBaDQEgB0UNAkGgfyARLwEYIgBBIGsgACAlQoCAgIAQVCIAGyICQRBrIAIgJUIghiAlIAAbIiVCgICAgICAwABUIgAbIgJBCGsgAiAlQhCGICUgABsiJUKAgICAgICAgAFUIgAbIgJBBGsgAiAlQgiGICUgABsiJUKAgICAgICAgBBUIgAbIgJBAmsgAiAlQgSGICUgABsiJUKAgICAgICAgMAAVCIAGyAlQgKGICUgABsiJUIAWWsiA2vBQdAAbEGwpwVqQc4QbSIAQdEATw0DIABBBHQiAkGQjsAAaikDACImQv////8PgyInICUgJUJ/hUI/iIYiJUIgiCIofiIpQiCIICZCIIgiJiAofnwgJiAlQv////8PgyIlfiImQiCIfCApQv////8PgyAlICd+QiCIfCAmQv////8Pg3xCgICAgAh8QiCIfCIm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IAkoAsAIIAkoAsQIIAAgEyAJQZAIahB1IAkoAgwhASAJKAIIDAMLQQIhASAJQQI7AZAIIBNFBEBBASEBIAlBATYCmAggCUHTncAANgKUCCAJQZAIagwDCyAJIBM2AqAIIAlBADsBnAggCUECNgKYCCAJQcmdwAA2ApQIIAlBkAhqDAILQdSdwABBJUH8ncAAEP8BAAtBASEBIAlBATYCmAggCUHTncAANgKUCCAJQZAIagshACAJIAE2AswIIAkgADYCyAggCSAcNgLECCAJIBs2AsAIIAggCUHACGoQUiAJQfAIaiQADAELIABBKEHIssAAENoCAAsPCyABQQAhACMAQYABayIEJAAgP70hJgJ/QQMgP5lEAAAAAAAA8H9hDQAaQQIgJkKAgICAgICA+P8AgyIlQoCAgICAgID4/wBRDQAaICZC/////////weDIilCgICAgICAgAiEICZCAYZC/v///////w+DICZCNIinQf8PcSIAGyInQgGDISggJVAEQEEEIClQDQEaIABBswhrIQBCASElIChQDAELQoCAgICAgIAgICdCAYYgJ0KAgICAgICACFEiARshJ0ICQgEgARshJUHLd0HMdyABGyAAaiEAIChQCyEBIAQgADsBeCAEICU3A3AgBEIBNwNoIAQgJzcDYCAEIAE6AHoCfwJAAkACQCABQQJrIgEEQEEBIQBBy53AAEHMncAAICZCAFMiAxtBy53AAEEBIAMbIAIbIRggJkI/iKcgAnIhG0EDIAEgAUEDTxtBAmsOAgMCAQsgBEEDNgIoIARBzZ3AADYCJCAEQQI7ASBBASEYQQEhACAEQSBqDAMLIARBAzYCKCAEQdCdwAA2AiQgBEECOwEgIARBIGoMAgsgBEEgaiEHIARBD2oiDiEIIwBBMGsiAyQAAkACQAJ/AkACQAJAAkACQAJAAkACQCAEQeAAaiIMIgApAwAiJVBFBEAgACkDCCInUA0BIAApAxAiJlANAiAlICZ8IiYgJVQNAyAlICdUDQQgJkKAgICAgICAgCBaDQUgAyAALwEYIgA7AQggAyAlICd9Iic3AwAgACAAQSBrIAAgJkKAgICAEFQiARsiAkEQayACICZCIIYgJiABGyImQoCAgICAgMAAVCIBGyICQQhrIAIgJkIQhiAmIAEbIiZCgICAgICAgIABVCIBGyICQQRr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NgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQdr9wABBGBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQcj9wABBEhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQez+wABBHRDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYn/wABBFhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQZ//wABBGBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYP9wABBExDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQbf/wABBHhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQdX/wABBIhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQff/wABBFBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYuAwQBBERDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQZyAwQBBFBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQbCAwQBBGhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQcqAwQBBFxDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQfL9wABBGxDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQeGAwQBBGRDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALyQECA38BfiMAQRBrIgMkACADIAE2AgwjAEEwayICJAAgAkEIaiADQQxqIgQQswECQAJAIAIoAghBAUYEQCACKQMQIgVCAFkNAQsgBCACQS9qQdDfwAAQVSEEIABBAToAACAAIAQ2AgQMAQsgAAJ/IAVC/wFYBEAgACAFPAABQQAMAQsgAkEBOgAYIAIgBTcDICAAIAJBGGogAkEvakHQ38AAENwBNgIEQQELOgAACyACQTBqJAAgAUGEAU8EQCABEAALIANBEGokAAvKAQIDfwF+IwBBEGsiAyQAIAMgATYCDCMAQTBrIgIkACACQQhqIANBDGoiBBCzAQJAAkAgAigCCEEBRgRAIAIpAxAiBUIAWQ0BCyAEIAJBL2pB8N/AABBVIQQgAEEBOwEAIAAgBDYCBAwBCyAAAn8gBUL//wNYBEAgACAFPQECQQAMAQsgAkEBOgAYIAIgBTcDICAAIAJBGGogAkEvakHw38AAENwBNgIEQQELOwEACyACQTBqJAAgAUGEAU8EQCABEAALIANBEGokAAs3AQF/IwBBIGsiASQAIAFBADYCGCABQQE2AgwgAUHEs8AANgIIIAFCBDcCECABQQhqIAAQowIACzcBAX8jAEEgayIBJAAgAUEANgIYIAFBATYCDCABQYi0wAA2AgggAUIENwIQIAFBCGogABCjAgALLgAgAUH//wNxIgFFBEBB4NXAABCbAgALIAAgAWogACABbyIAIABBH3UgAXFqawuyAQECfyMAQRBrIgAkACABKAIcQfiCwABBCyABKAIgKAIMEQIAIQMgAEEIaiICQQA6AAUgAiADOgAEIAIgATYCACACIgEtAAQhAiABLQAFBEAgAQJ/QQEgAkEBcQ0AGiABKAIAIgEtABRBBHFFBEAgASgCHEGLocAAQQIgASgCICgCDBECAAwBCyABKAIcQYqhwABBASABKAIgKAIMEQIACyICOgAECyACQQFxIABBEGokAAsnAAJAIANFIAEgAxCmAkVyRQRAIAAgASADIAIQvgIiAA0BCwALIAAL5gECBH8CfiMAQRBrIgMkACADIAE2AgwgAyAANgIIAn8gA0EIaiECIwBBIGsiACQAAkBBAEH4xsAAKAIAEQMAIgEEQCABKAIADQEgAUF/NgIAIABBCGogAUEEaiACKAIA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AEEPdkEBcQthAQJ/AkACQCAAQQRrKAIAIgJBeHEiA0EEQQggAkEDcSICGyABak8EQCACQQAgAyABQSdqSxsNASAAEEwMAgtB+YHAAEEuQaiCwAAQ/wEAC0G4gsAAQS5B6ILAABD/AQALC2kBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQQI2AgwgA0HEtMAANgIIIANCAjcCFCADIANBBGqtQoCAgIAghDcDKCADIAOtQoCAgIAghDcDICADIANBIGo2AhAgA0EIaiACEKMCAAtpAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0ECNgIMIANB+LTAADYCCCADQgI3AhQgAyADQQRqrUKAgICAIIQ3AyggAyADrUKAgICAIIQ3AyAgAyADQSBqNgIQIANBCGogAhCjAgALCwAgACgCACABEHALDwBByJ7AAEErIAAQ/wEACw0AIAApAwBBASABEGwLDAAgACgCABAZQQBHCwwAIAAoAgAQG0EARwsNACAAKAIAIAEgAhArCwsAIAAgASACEMoBCw0AIAAQMSABIAIQ7gELDQAgACABIAIQygEQWAsMACAAIAFBIBDyAUULCwAgACMAaiQAIwALDQAgAEG4gcAAIAEQUQsMACAAIAEpAgA3AwALDQAgAEGQhcAAIAEQUQsOACABQYiFwABBBRDAAgsZACAAIAFB1IjBACgCACIAQQMgABsRAQAACw0AIABB7KDAACABEFELCgAgAiAAIAEQRgsJACAAIAEQBAALDQAgAEH4wMAAIAEQUQsLACAAIAEgAhDuAQsZAEEAIAAgASACEMoBEFhrEDEgASACEO4BCw4AIAFBsNPAAEEVEMACCw4AIAFBkNTAAEEfEMACCw4AIAFB2NTAAEESEMACCwcAIAAQyAELDgAgAUH018AAQQUQwAILDgAgAUHA3sAAQQUQwAILDgAgAUGv6cAAQRQQwAILDgAgAUHD6cAAQRQQwAILDQAgAEHo6sAAIAEQUQsOACABQYDtwABBBRDAAgsOACABQZzxwABBERDAAgsOACABQeDxwABBFhDAAgsOACABQcD1wABBExDAAgsOACABQYj3wABBIRDAAgsOACABQcT4wABBIRDAAgsOACABQeT6wABBFhDAAgsOACABQcj7wABBIBDAAgsNACABQej7wABBAhBGCw4AIAFB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SvMe4U5ANKFSHmHhU/BqYVRPb+FUnbxhVQDPYVZl0aFWANohVwDgoViu4iFa7OThW9DoYVwgAO5c8AF/XQBwAAcALQEBAQIBAgEBSAswFRABZQcCBgICAQQjAR4bWws6CQkBGAQBCQEDAQUrAzsJKhgBIDcBAQEECAQBAwcKAh0BOgEBAQIECAEJAQoCGgECAjkBBAIEAgIDAwEeAgMBCwI5AQQFAQIEARQCFgYBAToBAQIBBAgBBwMKAh4BOwEBAQwBCQEoAQMBNwEBAwUDAQQHAgsCHQE6AQICAQEDAwEEBwILAhwCOQIBAQIECAEJAQoCHQFIAQQBAgMBAQgBUQECBwwIYgECCQsHSQIbAQEBAQE3DgEFAQIFCwEkCQFmBAEGAQICAhkCBAMQBA0BAgIGAQ8BAAMABBwDHQIeAkACAQcIAQILCQEtAwEBdQIiAXYDBAIJAQYD2wICAToBAQcBAQEBAggGCgIBMB8xBDAKBAMmCQwCIAQCBjgBAQIDAQEFOAgCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLAQEsAzABAgQCAgIBJAFDBgICAgIMAQgBLwEzAQEDAgIFAgEBKgIIAe4BAgEEAQABABAQEAACAAHiAZUFAAMBAgUEKAMEAaUCAARBBQACTwRGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQEBCAQCAV8DAgQGAQIBnQEDCBUCOQIBAQEBDAEJAQ4HAwVDAQIGAQECAQEDBAMBAQ4CVQgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIIZQEBAQIEAQUACQEC9QEKBAQBkAQCAgQBIAooBgIECAEJBgIDLg0BAgAHAQYBAVIWAgcBAgECegYDAQECAQcBAUgCAwEBAQACCwI0BQUDFwEAAQYPAAwDAwAFOwcAAT8EUQELAgACAC4CFwAFAwYICAIHHgSUAwA3BDIIAQ4BFgUBDwAHARECBwECAQVkAaAHAAE9BAAE/gIAB20HAGCA8ABKc1ZhbHVlKCn/HRAACAAAAAceEAABAAAATGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkAAAYHhAAKgAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL29uY2VfY2VsbC0xLjIwLjMvc3JjL2xpYi5ycwAAAEweEABdAAAACAMAABkAAAByZWVudHJhbnQgaW5pdAAAvB4QAA4AAABMHhAAXQAAAHoCAAANAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvd2FzbS1iaW5kZ2VuLTAuMi4xMDAvc3JjL2NvbnZlcnQvc2xpY2VzLnJz5B4QAGwAAADoAAAAAQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL3dhc20tYmluZGdlbi0wLjIuMTAwL3NyYy9jb252ZXJ0L3NsaWNlcy5yc2AfEABsAAAAJAEAAA4AAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2pzLXN5cy0wLjMuNzcvc3JjL2xpYi5ycw4gEABaAAAA+xgAAAEAAAAAAAAACAAAAAQAAAA3AAAAOAAAADkAAABhIGJvb2xlYW5ieXRlIGFycmF5Ym9vbGVhbiBgYAAAAKMgEAAJAAAArCAQAAEAAABpbnRlZ2VyIGAAAADAIBAACQAAAKwgEAABAAAAZmxvYXRpbmcgcG9pbnQgYNwgEAAQAAAArCAQAAEAAABjaGFyYWN0ZXIgYAD8IBAACwAAAKwgEAABAAAAc3RyaW5nIAAYIRAABwAAAHVuaXQgdmFsdWVPcHRpb24gdmFsdWVuZXd0eXBlIHN0cnVjdHNlcXVlbmNlbWFwZW51bXVuaXQgdmFyaWFudG5ld3R5cGUgdmFyaWFudHR1cGxlIHZhcmlhbnRzdHJ1Y3QgdmFyaWFudAAAAAEAAAAAAAAALjBpMzJ1OHUxNnUzMnU2NGkxMjh1MTI4SGFzaCB0YWJsZSBjYXBhY2l0eSBvdmVyZmxvd7QhEAAcAAAAL3J1c3QvZGVwcy9oYXNoYnJvd24tMC4xNS4yL3NyYy9yYXcvbW9kLnJzAADYIRAAKgAAACMAAAAoAAAAL3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5ycxQiEABMAAAAKgIAABEAAABpbnZhbGlkIHR5cGU6ICwgZXhwZWN0ZWQgAAAAcCIQAA4AAAB+IhAACwAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAnCIQAE8AAAAUAQAAGQAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAAD8IhAASgAAAKIAAAAZAAAA//////////9YIxAAQfDGwAAL+wIBAAAAAAAAAD0AAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9zZXJkZS13YXNtLWJpbmRnZW4tMC42LjUvc3JjL2xpYi5ycwAAAHwjEABlAAAANQAAAA4AAABpbnZhbGlkIHR5cGU6ICwgZXhwZWN0ZWQgAAAA9CMQAA4AAAACJBAACwAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAICQQAE8AAAAUAQAAGQAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAACAJBAASgAAAKIAAAAZAAAAAAAAAP//////////4CQQAEH4ycAAC4EBAQAAAAAAAAA/AAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvc2VyZGUtd2FzbS1iaW5kZ2VuLTAuNS4wL3NyYy9saWIucnMAAAAEJRAAZQAAADUAAAAOAEGGy8AACxrwPwAAAAAAAPg/AAAAAAAAAAAG0M9D6/1MPgBBq8vAAAuiC0ADuOI/L2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL21hdGgvcHJpY2UucnMAsCUQAEcAAAAjAAAAGAAAAFNxcnRQcmljZVNsaXBwYWdlQm91bmRzbWluU3FydFByaWNlbWF4U3FydFByaWNlRGVjcmVhc2VMaXF1aWRpdHlRdW90ZWxpcXVpZGl0eURlbHRhdG9rZW5Fc3RBdG9rZW5Fc3RCdG9rZW5NaW5BdG9rZW5NaW5CSW5jcmVhc2VMaXF1aWRpdHlRdW90ZXRva2VuTWF4QXRva2VuTWF4QkNvbGxlY3RSZXdhcmRzUXVvdGVyZXdhcmRzQ29sbGVjdFJld2FyZFF1b3RlcmV3YXJkc093ZWRFeGFjdEluU3dhcFF1b3RldG9rZW5JbnRva2VuRXN0T3V0dG9rZW5NaW5PdXR0cmFkZUZlZXRyYWRlRmVlUmF0ZU1pbnRyYWRlRmVlUmF0ZU1heEV4YWN0T3V0U3dhcFF1b3RldG9rZW5PdXR0b2tlbkVzdEludG9rZW5NYXhJbi9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2V0aG51bS0xLjUuMC9zcmMvaW50cmluc2ljcy9uYXRpdmUvZGl2bW9kLnJzXicQAG4AAAAtAAAACgAAAF4nEABuAAAAaQAAACsAAABeJxAAbgAAAGsAAAAnAAAAXicQAG4AAACNAAAAEQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2V0aG51bS0xLjUuMC9zcmMvdWludC9vcHMucnMAAAwoEABeAAAAEQAAAAEAAABhdHRlbXB0IHRvIGRpdmlkZSBieSB6ZXJvAAAAfCgQABkAAABQb3NpdGlvblJhdGlvcmF0aW9BcmF0aW9CUG9zaXRpb25TdGF0dXNwcmljZUluUmFuZ2VwcmljZUJlbG93UmFuZ2VwcmljZUFib3ZlUmFuZ2VpbnZhbGlkUG9zaXRpb25GYWNhZGVsaXF1aWRpdHl0aWNrTG93ZXJJbmRleHRpY2tVcHBlckluZGV4ZmVlR3Jvd3RoQ2hlY2twb2ludEFmZWVPd2VkQWZlZUdyb3d0aENoZWNrcG9pbnRCZmVlT3dlZEJyZXdhcmRJbmZvcwAABikQAAkAAAAPKRAADgAAAB0pEAAOAAAAKykQABQAAAA/KRAACAAAAEcpEAAUAAAAWykQAAgAAABjKRAACwAAAHN0cnVjdCBQb3NpdGlvbkZhY2FkZVBvc2l0aW9uUmV3YXJkSW5mb0ZhY2FkZWdyb3d0aEluc2lkZUNoZWNrcG9pbnRhbW91bnRPd2VkAAAA3SkQABYAAADzKRAACgAAAHN0cnVjdCBQb3NpdGlvblJld2FyZEluZm9GYWNhZGVUcmFuc2ZlckZlZWZlZUJwc21heEZlZQAAOioQAAYAAABAKhAABgAAAHN0cnVjdCBUcmFuc2ZlckZlZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL3RpY2sucnNqKhAARgAAAB0AAAAKAAAAaioQAEYAAACGAAAAIAAAAGoqEABGAAAAoQAAACAAAABqKhAARgAAALQAAAAgAAAAaioQAEYAAADRAAAABQAAAGoqEABGAAAA/AAAABoAAABqKhAARgAAAD4BAAASAAAAVGljayBpbmRleCBub3QgaW4gYXJyYXkAQAAAAAwAAAAEAAAAQQAAAEIAAABDAEHY1sAAC5kGAQAAAEQAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAACXKxAASwAAAN8KAAAOAAAARXJyb3IAAACXKxAASwAAAI4FAAAbAAAAlysQAEsAAACNBQAAGwAAAJcrEABLAAAAZwQAABIAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9ldGhudW0tMS41LjAvc3JjL3VpbnQvb3BzLnJzAAAsLBAAXgAAABEAAAABAAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAJwsEAAZAAAAYXR0ZW1wdCB0byBjYWxjdWxhdGUgdGhlIHJlbWFpbmRlciB3aXRoIGEgZGl2aXNvciBvZiB6ZXJvAAAAwCwQADkAAAAvaG9tZS9ydW5uZXIvd29yay93aGlybHBvb2xzL3doaXJscG9vbHMvcnVzdC1zZGsvY29yZS9zcmMvbWF0aC90b2tlbi5yc0FyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93BC0QAEcAAABmAQAAFAAAAEFtb3VudCBleGNlZWRzIG1heCB1NjRTcXJ0IHByaWNlIG91dCBvZiBib3VuZHNJbnZhbGlkIHRyYW5zZmVyIGZlZUludmFsaWQgc2xpcHBhZ2UgdG9sZXJhbmNlWAAAAGFuIGFycmF5IG9mIGxlbmd0aCAA2C0QABMAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9zZXJkZS1iaWctYXJyYXktMC41LjEvc3JjL2NvbnN0X2dlbmVyaWNzLnJzAAAA9C0QAG0AAABtAAAANABB/NzAAAsdAQAAAEUAAABGAAAADAAAAAQAAABHAAAASAAAAEMAQaTdwAAL6gEBAAAASQAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAOMuEABLAAAA3woAAA4AAABFcnJvcgAAAOMuEABLAAAAjgUAABsAAADjLhAASwAAAI0FAAAbAAAA4y4QAEsAAABnBAAAEgAAAEFtb3VudCBleGNlZWRzIG1heCB1NjQAQZjfwAALBQEAAABKAEGo38AACwUBAAAASwBBuN/AAAsFAQAAAEsAQcjfwAALBQEAAABLAEHY38AACwUBAAAATABB6N/AAAsFAQAAAE0AQfjfwAALBQEAAABOAEGI4MAACwUBAAAATwBBmODAAAsFAQAAAFAAQajgwAALBQEAAABRAEG44MAACwUBAAAAUgBByODAAAsFAQAAAFMAQdjgwAALBQEAAABFAEHo4MAACwUBAAAAVABB+ODAAAsFAQAAAFUAQYjhwAALBQEAAABWAEGY4cAACwUBAAAAVwBBqOHAAAsFAQAAAFgAQbjhwAALBQEAAABZAEHI4cAACwUBAAAAWgBB2OHAAAsFAQAAAFsAQejhwAALBQEAAABcAEH44cAAC4UJAQAAAF0AAABDb3VsZG4ndCBkZXNlcmlhbGl6ZSB1NjQgZnJvbSBhIEJpZ0ludCBvdXRzaWRlIHU2NDo6TUlOLi51NjQ6Ok1BWCBib3VuZHNDb3VsZG4ndCBkZXNlcmlhbGl6ZSBpMTI4IGZyb20gYSBCaWdJbnQgb3V0c2lkZSBpMTI4OjpNSU4uLmkxMjg6Ok1BWCBib3VuZHNDb3VsZG4ndCBkZXNlcmlhbGl6ZSB1MTI4IGZyb20gYSBCaWdJbnQgb3V0c2lkZSB1MTI4OjpNSU4uLnUxMjg6Ok1BWCBib3VuZHN0cmFkZUVuYWJsZVRpbWVzdGFtcGFkYXB0aXZlRmVlQ29uc3RhbnRzYWRhcHRpdmVGZWVWYXJpYWJsZXNmaWx0ZXJQZXJpb2RkZWNheVBlcmlvZHJlZHVjdGlvbkZhY3RvcmFkYXB0aXZlRmVlQ29udHJvbEZhY3Rvcm1heFZvbGF0aWxpdHlBY2N1bXVsYXRvcnRpY2tHcm91cFNpemVtYWpvclN3YXBUaHJlc2hvbGRUaWNrc2xhc3RSZWZlcmVuY2VVcGRhdGVUaW1lc3RhbXBsYXN0TWFqb3JTd2FwVGltZXN0YW1wdm9sYXRpbGl0eVJlZmVyZW5jZXRpY2tHcm91cEluZGV4UmVmZXJlbmNldm9sYXRpbGl0eUFjY3VtdWxhdG9yZmVlVGllckluZGV4U2VlZHRpY2tTcGFjaW5nZmVlUmF0ZXByb3RvY29sRmVlUmF0ZWxpcXVpZGl0eXNxcnRQcmljZXRpY2tDdXJyZW50SW5kZXhmZWVHcm93dGhHbG9iYWxBZmVlR3Jvd3RoR2xvYmFsQnJld2FyZExhc3RVcGRhdGVkVGltZXN0YW1wcmV3YXJkSW5mb3NlbWlzc2lvbnNQZXJTZWNvbmRYNjRncm93dGhHbG9iYWxYNjR0aWNrTG93ZXJJbmRleHRpY2tVcHBlckluZGV4ZmVlR3Jvd3RoQ2hlY2twb2ludEFmZWVPd2VkQWZlZUdyb3d0aENoZWNrcG9pbnRCZmVlT3dlZEJncm93dGhJbnNpZGVDaGVja3BvaW50YW1vdW50T3dlZGluaXRpYWxpemVkbGlxdWlkaXR5TmV0bGlxdWlkaXR5R3Jvc3NmZWVHcm93dGhPdXRzaWRlQWZlZUdyb3d0aE91dHNpZGVCcmV3YXJkR3Jvd3Roc091dHNpZGVzdGFydFRpY2tJbmRleHRpY2tzZmVlQnBzbWF4RmVlYW4gYXJyYXkgb2YgbGVuZ3RoIDJhbiBhcnJheSBvZiBsZW5ndGggM2ludmFsaWQgdmFsdWU6ICwgZXhwZWN0ZWQgAAAA1zQQAA8AAADmNBAACwAAAG1pc3NpbmcgZmllbGQgYGAENRAADwAAABM1EAABAAAAaW52YWxpZCBsZW5ndGggACQ1EAAPAAAA5jQQAAsAAABkdXBsaWNhdGUgZmllbGQgYAAAAEQ1EAARAAAAEzUQAAEAAABfAAAADAAAAAQAAABgAAAAYQAAAEMAQYjrwAAL7gYBAAAAYgAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAMc1EABLAAAA3woAAA4AAAAvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zbGljZS5ycwAAJDYQAEoAAACiAAAAGQAAAEVycm9yAAAAxzUQAEsAAACOBQAAGwAAAMc1EABLAAAAjQUAABsAAADHNRAASwAAAGcEAAASAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcF90aHJvdygpYCBvbiBhbiBgRXJyYCB2YWx1ZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL2FkYXB0aXZlX2ZlZS5ycwDpNhAATgAAANIAAAAZAAAA6TYQAE4AAADHAAAAGQAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGXpNhAATgAAALkAAAARAAAARGl2aXNvciBtdXN0IGJlIHBvc2l0aXZlLgAAAJA3EAAZAAAA6TYQAE4AAADnAQAABQAAAEFyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93VGlja1JhbmdldGlja0xvd2VySW5kZXh0aWNrVXBwZXJJbmRleFRpY2tGYWNhZGVpbml0aWFsaXplZGxpcXVpZGl0eU5ldGxpcXVpZGl0eUdyb3NzZmVlR3Jvd3RoT3V0c2lkZUFmZWVHcm93dGhPdXRzaWRlQnJld2FyZEdyb3d0aHNPdXRzaWRlABA4EAALAAAAGzgQAAwAAAAnOBAADgAAADU4EAARAAAARjgQABEAAABXOBAAFAAAAHN0cnVjdCBUaWNrRmFjYWRlVGlja0FycmF5RmFjYWRlc3RhcnRUaWNrSW5kZXh0aWNrcwC8OBAADgAAAMo4EAAFAAAAc3RydWN0IFRpY2tBcnJheUZhY2FkZQBBgPLAAAvAAgEAAABjAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQAAAAAABAAAAAQAAABkAAAAVHJ5RnJvbUludEVycm9yL2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL21hdGgvYWRhcHRpdmVfZmVlLnJzSW52YWxpZCB0aW1lc3RhbXAAAFM5EABOAAAA4AEAAA4AAAAvaG9tZS9ydW5uZXIvd29yay93aGlybHBvb2xzL3doaXJscG9vbHMvcnVzdC1zZGsvY29yZS9zcmMvbWF0aC9idW5kbGUucnPEORAASAAAAD0AAAAUAAAAAAAAAP//////////////////////////////////////////AEHg9MAAC9EMT3JhY2xlRmFjYWRldHJhZGVFbmFibGVUaW1lc3RhbXBhZGFwdGl2ZUZlZUNvbnN0YW50c2FkYXB0aXZlRmVlVmFyaWFibGVzbDoQABQAAACAOhAAFAAAAJQ6EAAUAAAAc3RydWN0IE9yYWNsZUZhY2FkZWZpbHRlclBlcmlvZGRlY2F5UGVyaW9kcmVkdWN0aW9uRmFjdG9yYWRhcHRpdmVGZWVDb250cm9sRmFjdG9ybWF4Vm9sYXRpbGl0eUFjY3VtdWxhdG9ydGlja0dyb3VwU2l6ZW1ham9yU3dhcFRocmVzaG9sZFRpY2tzAAAA0zoQAAwAAADfOhAACwAAAOo6EAAPAAAA+ToQABgAAAAROxAAGAAAACk7EAANAAAANjsQABcAAABzdHJ1Y3QgQWRhcHRpdmVGZWVDb25zdGFudHNGYWNhZGVsYXN0UmVmZXJlbmNlVXBkYXRlVGltZXN0YW1wbGFzdE1ham9yU3dhcFRpbWVzdGFtcHZvbGF0aWxpdHlSZWZlcmVuY2V0aWNrR3JvdXBJbmRleFJlZmVyZW5jZXZvbGF0aWxpdHlBY2N1bXVsYXRvcgAAqTsQABwAAADFOxAAFgAAANs7EAATAAAA7jsQABcAAAAFPBAAFQAAAHN0cnVjdCBBZGFwdGl2ZUZlZVZhcmlhYmxlc0ZhY2FkZVdoaXJscG9vbEZhY2FkZWZlZVRpZXJJbmRleFNlZWR0aWNrU3BhY2luZ2ZlZVJhdGVwcm90b2NvbEZlZVJhdGVsaXF1aWRpdHlzcXJ0UHJpY2V0aWNrQ3VycmVudEluZGV4ZmVlR3Jvd3RoR2xvYmFsQWZlZUdyb3d0aEdsb2JhbEJyZXdhcmRMYXN0VXBkYXRlZFRpbWVzdGFtcHJld2FyZEluZm9zdDwQABAAAACEPBAACwAAAI88EAAHAAAAljwQAA8AAAClPBAACQAAAK48EAAJAAAAtzwQABAAAADHPBAAEAAAANc8EAAQAAAA5zwQABoAAAABPRAACwAAAHN0cnVjdCBXaGlybHBvb2xGYWNhZGVXaGlybHBvb2xSZXdhcmRJbmZvRmFjYWRlZW1pc3Npb25zUGVyU2Vjb25kWDY0Z3Jvd3RoR2xvYmFsWDY0AJM9EAAVAAAAqD0QAA8AAABzdHJ1Y3QgV2hpcmxwb29sUmV3YXJkSW5mb0ZhY2FkZSgpY2FsbGVkIGBPcHRpb246OnVud3JhcF90aHJvdygpYCBvbiBhIGBOb25lYCB2YWx1ZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL3RpY2tfYXJyYXkucnNUaWNrIGFycmF5IG5vdCBldmVubHkgc3BhY2VkVGljayBzZXF1ZW5jZSBlbXB0eQAAGz4QAEwAAABFAAAADAAAABs+EABMAAAATAAAADgAAAAbPhAATAAAAE8AAAANAAAASW52YWxpZCB0aWNrIGluZGV4VGljayBpbmRleCBvdXQgb2YgYm91bmRzSW52YWxpZCB0aWNrIGFycmF5IHNlcXVlbmNlL2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL3R5cGVzL3RpY2tfYXJyYXkucnMAAA0/EABNAAAAQgAAABEAAABBcml0aG1ldGljIG92ZXItIG9yIHVuZGVyZmxvd0Ftb3VudCBleGNlZWRzIG1heCB1NjRTcXJ0IHByaWNlIG91dCBvZiBib3VuZHNTcXJ0IHByaWNlIGxpbWl0IG91dCBvZiBib3VuZHNJbnZhbGlkIHNxcnQgcHJpY2UgbGltaXQgZGlyZWN0aW9uWmVybyB0cmFkYWJsZSBhbW91bnRJbnZhbGlkIHRpbWVzdGFtcEludmFsaWQgdHJhbnNmZXIgZmVlSW52YWxpZCBzbGlwcGFnZSB0b2xlcmFuY2VUaWNrIGluZGV4IG5vdCBpbiBhcnJheUludmFsaWQgYWRhcHRpdmUgZmVlIGluZm9Db2xsZWN0RmVlc1F1b3RlZmVlT3dlZEFmZWVPd2VkQgAAZQAAAAwAAAAEAAAAZgAAAGcAAABDAEG8gcEAC4kDAQAAAGgAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAAD7QBAASwAAAN8KAAAOAAAARXJyb3IAAAD7QBAASwAAAI4FAAAbAAAA+0AQAEsAAACNBQAAGwAAAPtAEABLAAAAZwQAABIAAABTcXJ0IHByaWNlIGxpbWl0IG91dCBvZiBib3VuZHNaZXJvIHRyYWRhYmxlIGFtb3VudEFyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93SW52YWxpZCBhZGFwdGl2ZSBmZWUgaW5mb0ludmFsaWQgc3FydCBwcmljZSBsaW1pdCBkaXJlY3Rpb25BbW91bnQgZXhjZWVkcyBtYXggdTY0aQAAAAwAAAAEAAAAagAAAGsAAABDAEHQhMEAC98DAQAAAGwAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAACPQhAASwAAAN8KAAAOAAAARXJyb3IAAACPQhAASwAAAI4FAAAbAAAAj0IQAEsAAACNBQAAGwAAAI9CEABLAAAAZwQAABIAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9ldGhudW0tMS41LjAvc3JjL3VpbnQvb3BzLnJzAAAkQxAAXgAAABEAAAABAAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAJRDEAAZAAAAYXR0ZW1wdCB0byBjYWxjdWxhdGUgdGhlIHJlbWFpbmRlciB3aXRoIGEgZGl2aXNvciBvZiB6ZXJvAAAAuEMQADkAAABBcml0aG1ldGljIG92ZXItIG9yIHVuZGVyZmxvd0Ftb3VudCBleGNlZWRzIG1heCB1NjQAQciIwQALASMASAlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQIGd2FscnVzBjAuMjMuMwx3YXNtLWJpbmRnZW4TMC4yLjEwMCAoMjQwNWVjMmI0KQ==", $a = async (A = {}, I) => {
  let g;
  if (I.startsWith("data:")) {
    const B = I.replace(/^data:.*?base64,/, "");
    let C;
    if (typeof Buffer == "function" && typeof Buffer.from == "function")
      C = Buffer.from(B, "base64");
    else if (typeof atob == "function") {
      const Q = atob(B);
      C = new Uint8Array(Q.length);
      for (let E = 0; E < Q.length; E++)
        C[E] = Q.charCodeAt(E);
    } else
      throw new Error("Cannot decode base64-encoded data URL");
    g = await WebAssembly.instantiate(C, A);
  } else {
    const B = await fetch(I), C = B.headers.get("Content-Type") || "";
    if ("instantiateStreaming" in WebAssembly && C.startsWith("application/wasm"))
      g = await WebAssembly.instantiateStreaming(B, A);
    else {
      const Q = await B.arrayBuffer();
      g = await WebAssembly.instantiate(Q, A);
    }
  }
  return g.instance.exports;
};
let M;
function As(A) {
  M = A;
}
const KA = new Array(128).fill(void 0);
KA.push(void 0, null, !0, !1);
function S(A) {
  return KA[A];
}
let xI = 0, $I = null;
function gg() {
  return ($I === null || $I.byteLength === 0) && ($I = new Uint8Array(M.memory.buffer)), $I;
}
const Is = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let Bg = new Is("utf-8");
const gs = typeof Bg.encodeInto == "function" ? function(A, I) {
  return Bg.encodeInto(A, I);
} : function(A, I) {
  const g = Bg.encode(A);
  return I.set(g), {
    read: A.length,
    written: g.length
  };
};
function RB(A, I, g) {
  if (g === void 0) {
    const e = Bg.encode(A), i = I(e.length, 1) >>> 0;
    return gg().subarray(i, i + e.length).set(e), xI = e.length, i;
  }
  let B = A.length, C = I(B, 1) >>> 0;
  const Q = gg();
  let E = 0;
  for (; E < B; E++) {
    const e = A.charCodeAt(E);
    if (e > 127) break;
    Q[C + E] = e;
  }
  if (E !== B) {
    E !== 0 && (A = A.slice(E)), C = g(C, B, B = E + A.length * 3, 1) >>> 0;
    const e = gg().subarray(C + E, C + B), i = gs(A, e);
    E += i.written, C = g(C, B, E, 1) >>> 0;
  }
  return xI = E, C;
}
let nI = null;
function b() {
  return (nI === null || nI.buffer.detached === !0 || nI.buffer.detached === void 0 && nI.buffer !== M.memory.buffer) && (nI = new DataView(M.memory.buffer)), nI;
}
let LI = KA.length;
function N(A) {
  LI === KA.length && KA.push(KA.length + 1);
  const I = LI;
  return LI = KA[I], KA[I] = A, I;
}
function kB(A, I) {
  try {
    return A.apply(this, I);
  } catch (g) {
    M.__wbindgen_export_2(N(g));
  }
}
function Bs(A) {
  A < 132 || (KA[A] = LI, LI = A);
}
function P(A) {
  const I = S(A);
  return Bs(A), I;
}
function z(A) {
  return A == null;
}
function AB(A) {
  const I = typeof A;
  if (I == "number" || I == "boolean" || A == null)
    return `${A}`;
  if (I == "string")
    return `"${A}"`;
  if (I == "symbol") {
    const C = A.description;
    return C == null ? "Symbol" : `Symbol(${C})`;
  }
  if (I == "function") {
    const C = A.name;
    return typeof C == "string" && C.length > 0 ? `Function(${C})` : "Function";
  }
  if (Array.isArray(A)) {
    const C = A.length;
    let Q = "[";
    C > 0 && (Q += AB(A[0]));
    for (let E = 1; E < C; E++)
      Q += ", " + AB(A[E]);
    return Q += "]", Q;
  }
  const g = /\[object ([^\]]+)\]/.exec(toString.call(A));
  let B;
  if (g && g.length > 1)
    B = g[1];
  else
    return toString.call(A);
  if (B == "Object")
    try {
      return "Object(" + JSON.stringify(A) + ")";
    } catch {
      return "Object";
    }
  return A instanceof Error ? `${A.name}: ${A.message}
${A.stack}` : B;
}
const Cs = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let gE = new Cs("utf-8", { ignoreBOM: !0, fatal: !0 });
gE.decode();
function MB(A, I) {
  return A = A >>> 0, gE.decode(gg().subarray(A, A + I));
}
function lC(A, I, g) {
  return M.priceToTickIndex(A, I, g);
}
function Qs(A, I) {
  const g = M.getSqrtPriceSlippageBounds(N(A), I);
  return P(g);
}
function Es() {
  return M._POSITION_BUNDLE_SIZE() >>> 0;
}
function pA(A, I) {
  return M.getTickArrayStartTickIndex(A, I);
}
function dC(A, I, g) {
  return M.getInitializableTickIndex(A, I, z(g) ? 16777215 : g ? 1 : 0);
}
function es(A, I) {
  const g = M.orderTickIndexes(A, I);
  return P(g);
}
function Eg(A, I, g) {
  try {
    const E = M.__wbindgen_add_to_stack_pointer(-16);
    M.getTickIndexInArray(E, A, I, g);
    var B = b().getInt32(E + 4 * 0, !0), C = b().getInt32(E + 4 * 1, !0), Q = b().getInt32(E + 4 * 2, !0);
    if (Q)
      throw P(C);
    return B >>> 0;
  } finally {
    M.__wbindgen_add_to_stack_pointer(16);
  }
}
function BE(A, I, g, B, C, Q) {
  try {
    const t = M.__wbindgen_add_to_stack_pointer(-16);
    M.collectFeesQuote(t, N(A), N(I), N(g), N(B), z(C) ? 0 : N(C), z(Q) ? 0 : N(Q));
    var E = b().getInt32(t + 4 * 0, !0), e = b().getInt32(t + 4 * 1, !0), i = b().getInt32(t + 4 * 2, !0);
    if (i)
      throw P(e);
    return P(E);
  } finally {
    M.__wbindgen_add_to_stack_pointer(16);
  }
}
function CE(A, I, g, B, C, Q, E, e) {
  try {
    const a = M.__wbindgen_add_to_stack_pointer(-16);
    M.collectRewardsQuote(a, N(A), N(I), N(g), N(B), C, z(Q) ? 0 : N(Q), z(E) ? 0 : N(E), z(e) ? 0 : N(e));
    var i = b().getInt32(a + 4 * 0, !0), t = b().getInt32(a + 4 * 1, !0), n = b().getInt32(a + 4 * 2, !0);
    if (n)
      throw P(t);
    return P(i);
  } finally {
    M.__wbindgen_add_to_stack_pointer(16);
  }
}
function is(A, I, g, B, C, Q, E) {
  try {
    const n = M.__wbindgen_add_to_stack_pointer(-16);
    M.decreaseLiquidityQuote(n, N(A), I, N(g), B, C, z(Q) ? 0 : N(Q), z(E) ? 0 : N(E));
    var e = b().getInt32(n + 4 * 0, !0), i = b().getInt32(n + 4 * 1, !0), t = b().getInt32(n + 4 * 2, !0);
    if (t)
      throw P(i);
    return P(e);
  } finally {
    M.__wbindgen_add_to_stack_pointer(16);
  }
}
function ts(A, I, g, B, C, Q, E) {
  try {
    const n = M.__wbindgen_add_to_stack_pointer(-16);
    M.decreaseLiquidityQuoteA(n, A, I, N(g), B, C, z(Q) ? 0 : N(Q), z(E) ? 0 : N(E));
    var e = b().getInt32(n + 4 * 0, !0), i = b().getInt32(n + 4 * 1, !0), t = b().getInt32(n + 4 * 2, !0);
    if (t)
      throw P(i);
    return P(e);
  } finally {
    M.__wbindgen_add_to_stack_pointer(16);
  }
}
function ns(A, I, g, B, C, Q, E) {
  try {
    const n = M.__wbindgen_add_to_stack_pointer(-16);
    M.decreaseLiquidityQuoteB(n, A, I, N(g), B, C, z(Q) ? 0 : N(Q), z(E) ? 0 : N(E));
    var e = b().getInt32(n + 4 * 0, !0), i = b().getInt32(n + 4 * 1, !0), t = b().getInt32(n + 4 * 2, !0);
    if (t)
      throw P(i);
    return P(e);
  } finally {
    M.__wbindgen_add_to_stack_pointer(16);
  }
}
function os(A, I) {
  const g = String(S(I)), B = RB(g, M.__wbindgen_export_0, M.__wbindgen_export_1), C = xI;
  b().setInt32(A + 4 * 1, C, !0), b().setInt32(A + 4 * 0, B, !0);
}
function rs(A) {
  const I = S(A).buffer;
  return N(I);
}
function as() {
  return kB(function(A, I) {
    const g = S(A).call(S(I));
    return N(g);
  }, arguments);
}
function ss(A) {
  return S(A).done;
}
function cs() {
  return kB(function(A, I) {
    const g = Reflect.get(S(A), S(I));
    return N(g);
  }, arguments);
}
function Ds(A, I) {
  const g = S(A)[I >>> 0];
  return N(g);
}
function ws(A, I) {
  const g = S(A)[S(I)];
  return N(g);
}
function us(A, I) {
  const g = S(A)[S(I)];
  return N(g);
}
function ls(A) {
  let I;
  try {
    I = S(A) instanceof ArrayBuffer;
  } catch {
    I = !1;
  }
  return I;
}
function ds(A) {
  let I;
  try {
    I = S(A) instanceof Uint8Array;
  } catch {
    I = !1;
  }
  return I;
}
function hs(A) {
  return Array.isArray(S(A));
}
function ys(A) {
  return Number.isSafeInteger(S(A));
}
function Ns() {
  return N(Symbol.iterator);
}
function Ss(A) {
  return S(A).length;
}
function fs(A) {
  return S(A).length;
}
function Rs() {
  const A = new Object();
  return N(A);
}
function ks() {
  const A = new Array();
  return N(A);
}
function Ms(A) {
  const I = new Uint8Array(S(A));
  return N(I);
}
function Gs(A) {
  const I = S(A).next;
  return N(I);
}
function Fs() {
  return kB(function(A) {
    const I = S(A).next();
    return N(I);
  }, arguments);
}
function Us(A, I, g) {
  S(A)[I >>> 0] = P(g);
}
function ms(A, I, g) {
  S(A)[P(I)] = P(g);
}
function Js(A, I, g) {
  S(A).set(S(I), g >>> 0);
}
function ps(A) {
  const I = S(A).value;
  return N(I);
}
function Ys(A) {
  return +S(A);
}
function Ls(A) {
  return N(A);
}
function bs(A, I) {
  const g = BigInt.asUintN(64, A) << BigInt(64) | BigInt.asUintN(64, I);
  return N(g);
}
function Ks(A) {
  const I = BigInt.asUintN(64, A);
  return N(I);
}
function Os(A, I) {
  const g = S(I), B = typeof g == "bigint" ? g : void 0;
  b().setBigInt64(A + 8 * 1, z(B) ? BigInt(0) : B, !0), b().setInt32(A + 4 * 0, !z(B), !0);
}
function Ts(A) {
  const I = S(A);
  return typeof I == "boolean" ? I ? 1 : 0 : 2;
}
function Hs(A, I) {
  const g = AB(S(I)), B = RB(g, M.__wbindgen_export_0, M.__wbindgen_export_1), C = xI;
  b().setInt32(A + 4 * 1, C, !0), b().setInt32(A + 4 * 0, B, !0);
}
function xs(A, I) {
  const g = new Error(MB(A, I));
  return N(g);
}
function qs(A, I) {
  return S(A) in S(I);
}
function Vs(A) {
  return Array.isArray(S(A));
}
function _s(A) {
  return typeof S(A) == "bigint";
}
function Zs(A) {
  return typeof S(A) == "function";
}
function Ws(A) {
  const I = S(A);
  return typeof I == "object" && I !== null;
}
function js(A) {
  return S(A) === void 0;
}
function zs(A, I) {
  return S(A) === S(I);
}
function Ps(A, I) {
  return S(A) == S(I);
}
function vs() {
  const A = M.memory;
  return N(A);
}
function Xs(A, I) {
  const g = S(I), B = typeof g == "number" ? g : void 0;
  b().setFloat64(A + 8 * 1, z(B) ? 0 : B, !0), b().setInt32(A + 4 * 0, !z(B), !0);
}
function $s(A) {
  return N(A);
}
function Ac(A) {
  const I = S(A);
  return N(I);
}
function Ic(A) {
  P(A);
}
function gc(A, I) {
  const g = S(A) >> S(I);
  return N(g);
}
function Bc(A, I) {
  const g = S(I), B = typeof g == "string" ? g : void 0;
  var C = z(B) ? 0 : RB(B, M.__wbindgen_export_0, M.__wbindgen_export_1), Q = xI;
  b().setInt32(A + 4 * 1, Q, !0), b().setInt32(A + 4 * 0, C, !0);
}
function Cc(A, I) {
  const g = MB(A, I);
  return N(g);
}
function Qc(A, I) {
  throw new Error(MB(A, I));
}
URL = globalThis.URL;
const Ec = await $a({ "./orca_whirlpools_core_js_bindings_bg.js": {
  __wbindgen_object_drop_ref: Ic,
  __wbindgen_string_new: Cc,
  __wbindgen_bigint_get_as_i64: Os,
  __wbindgen_debug_string: Hs,
  __wbindgen_throw: Qc,
  __wbindgen_memory: vs,
  __wbindgen_string_get: Bc,
  __wbg_get_67b2ba62fc30de12: cs,
  __wbg_get_b9b93047fe3cf45b: Ds,
  __wbg_length_e2d2a49132c1b256: fs,
  __wbindgen_object_clone_ref: Ac,
  __wbindgen_is_function: Zs,
  __wbg_new_78feb108b6472713: ks,
  __wbindgen_number_new: $s,
  __wbindgen_is_object: Ws,
  __wbg_next_25feadfc0913fea9: Gs,
  __wbg_next_6574e1a8a62d1055: Fs,
  __wbg_done_769e5ede4b31c67b: ss,
  __wbg_value_cd1ffa7b1ab794f1: ps,
  __wbg_iterator_9a24c88df860dc65: Ns,
  __wbg_call_672a4d21634d4a24: as,
  __wbg_new_405e22f390576ce2: Rs,
  __wbindgen_number_get: Xs,
  __wbindgen_is_undefined: js,
  __wbg_set_37837023f3d740e8: Us,
  __wbg_isArray_a1eab7e0d067391b: hs,
  __wbg_instanceof_ArrayBuffer_e14585432e3737fc: ls,
  __wbg_isSafeInteger_343e2beeeece1bb0: ys,
  __wbg_buffer_609cc3eee51ed158: rs,
  __wbg_new_a12002a7f91c75be: Ms,
  __wbg_set_65595bdd868b3009: Js,
  __wbg_length_a446193dc22c12f8: Ss,
  __wbg_instanceof_Uint8Array_17156bcf118086a9: ds,
  __wbindgen_jsval_loose_eq: Ps,
  __wbindgen_boolean_get: Ts,
  __wbindgen_as_number: Ys,
  __wbindgen_error_new: xs,
  __wbindgen_bigint_from_i64: Ls,
  __wbindgen_bigint_from_u64: Ks,
  __wbindgen_bigint_from_u128: bs,
  __wbg_getwithrefkey_1dc361bd10053bfe: ws,
  __wbg_String_eecc4a11987127d6: os,
  __wbg_getwithrefkey_6550b2c093d2eb18: us,
  __wbg_set_3807d5f0bfc24aa7: ms,
  __wbindgen_shr: gc,
  __wbindgen_jsval_eq: zs,
  __wbindgen_in: qs,
  __wbindgen_is_bigint: _s,
  __wbindgen_is_array: Vs
} }, Xa), {
  memory: ec,
  getTickArrayStartTickIndex: ic,
  tickIndexToSqrtPrice: tc,
  sqrtPriceToTickIndex: nc,
  getInitializableTickIndex: oc,
  getPrevInitializableTickIndex: rc,
  getNextInitializableTickIndex: ac,
  isTickIndexInBounds: sc,
  isTickInitializable: cc,
  invertTickIndex: Dc,
  invertSqrtPrice: wc,
  getFullRangeTickIndexes: uc,
  orderTickIndexes: lc,
  isFullRangeOnly: dc,
  getTickIndexInArray: hc,
  collectFeesQuote: yc,
  _REDUCTION_FACTOR_DENOMINATOR: Nc,
  _ADAPTIVE_FEE_CONTROL_FACTOR_DENOMINATOR: Sc,
  _MAX_REFERENCE_AGE: fc,
  _TICK_ARRAY_NOT_EVENLY_SPACED: Rc,
  _TICK_INDEX_OUT_OF_BOUNDS: kc,
  _INVALID_TICK_INDEX: Mc,
  _ARITHMETIC_OVERFLOW: Gc,
  _AMOUNT_EXCEEDS_MAX_U64: Fc,
  _SQRT_PRICE_OUT_OF_BOUNDS: Uc,
  _TICK_SEQUENCE_EMPTY: mc,
  _SQRT_PRICE_LIMIT_OUT_OF_BOUNDS: Jc,
  _INVALID_SQRT_PRICE_LIMIT_DIRECTION: pc,
  _ZERO_TRADABLE_AMOUNT: Yc,
  _INVALID_TIMESTAMP: Lc,
  _INVALID_TRANSFER_FEE: bc,
  _INVALID_SLIPPAGE_TOLERANCE: Kc,
  _TICK_INDEX_NOT_IN_ARRAY: Oc,
  _INVALID_TICK_ARRAY_SEQUENCE: Tc,
  _INVALID_ADAPTIVE_FEE_INFO: Hc,
  _VOLATILITY_ACCUMULATOR_SCALE_FACTOR: xc,
  _FEE_RATE_HARD_LIMIT: qc,
  decreaseLiquidityQuote: Vc,
  decreaseLiquidityQuoteA: _c,
  decreaseLiquidityQuoteB: Zc,
  increaseLiquidityQuote: Wc,
  increaseLiquidityQuoteA: jc,
  increaseLiquidityQuoteB: zc,
  _NUM_REWARDS: Pc,
  isInitializedWithAdaptiveFee: vc,
  collectRewardsQuote: Xc,
  tryGetAmountDeltaA: $c,
  tryGetAmountDeltaB: AD,
  tryGetNextSqrtPriceFromA: ID,
  tryGetNextSqrtPriceFromB: gD,
  tryApplyTransferFee: BD,
  tryReverseApplyTransferFee: CD,
  tryGetMaxAmountWithSlippageTolerance: QD,
  tryGetMinAmountWithSlippageTolerance: ED,
  tryApplySwapFee: eD,
  tryReverseApplySwapFee: iD,
  swapQuoteByInputToken: tD,
  swapQuoteByOutputToken: nD,
  _TICK_ARRAY_SIZE: oD,
  _FULL_RANGE_ONLY_TICK_SPACING_THRESHOLD: rD,
  _MIN_TICK_INDEX: aD,
  _MAX_TICK_INDEX: sD,
  priceToSqrtPrice: cD,
  sqrtPriceToPrice: DD,
  invertPrice: wD,
  tickIndexToPrice: uD,
  priceToTickIndex: lD,
  getSqrtPriceSlippageBounds: dD,
  firstUnoccupiedPositionInBundle: hD,
  isPositionBundleFull: yD,
  isPositionBundleEmpty: ND,
  _POSITION_BUNDLE_SIZE: SD,
  _FEE_RATE_DENOMINATOR: fD,
  isPositionInRange: RD,
  positionStatus: kD,
  positionRatio: MD,
  __wbindgen_export_0: GD,
  __wbindgen_export_1: FD,
  __wbindgen_export_2: UD,
  __wbindgen_add_to_stack_pointer: mD
} = Ec, JD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _ADAPTIVE_FEE_CONTROL_FACTOR_DENOMINATOR: Sc,
  _AMOUNT_EXCEEDS_MAX_U64: Fc,
  _ARITHMETIC_OVERFLOW: Gc,
  _FEE_RATE_DENOMINATOR: fD,
  _FEE_RATE_HARD_LIMIT: qc,
  _FULL_RANGE_ONLY_TICK_SPACING_THRESHOLD: rD,
  _INVALID_ADAPTIVE_FEE_INFO: Hc,
  _INVALID_SLIPPAGE_TOLERANCE: Kc,
  _INVALID_SQRT_PRICE_LIMIT_DIRECTION: pc,
  _INVALID_TICK_ARRAY_SEQUENCE: Tc,
  _INVALID_TICK_INDEX: Mc,
  _INVALID_TIMESTAMP: Lc,
  _INVALID_TRANSFER_FEE: bc,
  _MAX_REFERENCE_AGE: fc,
  _MAX_TICK_INDEX: sD,
  _MIN_TICK_INDEX: aD,
  _NUM_REWARDS: Pc,
  _POSITION_BUNDLE_SIZE: SD,
  _REDUCTION_FACTOR_DENOMINATOR: Nc,
  _SQRT_PRICE_LIMIT_OUT_OF_BOUNDS: Jc,
  _SQRT_PRICE_OUT_OF_BOUNDS: Uc,
  _TICK_ARRAY_NOT_EVENLY_SPACED: Rc,
  _TICK_ARRAY_SIZE: oD,
  _TICK_INDEX_NOT_IN_ARRAY: Oc,
  _TICK_INDEX_OUT_OF_BOUNDS: kc,
  _TICK_SEQUENCE_EMPTY: mc,
  _VOLATILITY_ACCUMULATOR_SCALE_FACTOR: xc,
  _ZERO_TRADABLE_AMOUNT: Yc,
  __wbindgen_add_to_stack_pointer: mD,
  __wbindgen_export_0: GD,
  __wbindgen_export_1: FD,
  __wbindgen_export_2: UD,
  collectFeesQuote: yc,
  collectRewardsQuote: Xc,
  decreaseLiquidityQuote: Vc,
  decreaseLiquidityQuoteA: _c,
  decreaseLiquidityQuoteB: Zc,
  firstUnoccupiedPositionInBundle: hD,
  getFullRangeTickIndexes: uc,
  getInitializableTickIndex: oc,
  getNextInitializableTickIndex: ac,
  getPrevInitializableTickIndex: rc,
  getSqrtPriceSlippageBounds: dD,
  getTickArrayStartTickIndex: ic,
  getTickIndexInArray: hc,
  increaseLiquidityQuote: Wc,
  increaseLiquidityQuoteA: jc,
  increaseLiquidityQuoteB: zc,
  invertPrice: wD,
  invertSqrtPrice: wc,
  invertTickIndex: Dc,
  isFullRangeOnly: dc,
  isInitializedWithAdaptiveFee: vc,
  isPositionBundleEmpty: ND,
  isPositionBundleFull: yD,
  isPositionInRange: RD,
  isTickIndexInBounds: sc,
  isTickInitializable: cc,
  memory: ec,
  orderTickIndexes: lc,
  positionRatio: MD,
  positionStatus: kD,
  priceToSqrtPrice: cD,
  priceToTickIndex: lD,
  sqrtPriceToPrice: DD,
  sqrtPriceToTickIndex: nc,
  swapQuoteByInputToken: tD,
  swapQuoteByOutputToken: nD,
  tickIndexToPrice: uD,
  tickIndexToSqrtPrice: tc,
  tryApplySwapFee: eD,
  tryApplyTransferFee: BD,
  tryGetAmountDeltaA: $c,
  tryGetAmountDeltaB: AD,
  tryGetMaxAmountWithSlippageTolerance: QD,
  tryGetMinAmountWithSlippageTolerance: ED,
  tryGetNextSqrtPriceFromA: ID,
  tryGetNextSqrtPriceFromB: gD,
  tryReverseApplySwapFee: iD,
  tryReverseApplyTransferFee: CD
}, Symbol.toStringTag, { value: "Module" }));
As(JD);
var QE = /* @__PURE__ */ ((A) => (A[A.Uninitialized = 0] = "Uninitialized", A[A.Initialized = 1] = "Initialized", A[A.Frozen = 2] = "Frozen", A))(QE || {});
function pD() {
  return CQ(QE);
}
function YD() {
  return dA(hA(), 36);
}
function UI() {
  return dA(hA(), 64);
}
function LD() {
  return AQ(
    [
      ["Uninitialized", gI()],
      [
        "TransferFeeConfig",
        J(
          k([
            ["transferFeeConfigAuthority", y()],
            ["withdrawWithheldAuthority", y()],
            ["withheldAmount", L()],
            ["olderTransferFee", hC()],
            ["newerTransferFee", hC()]
          ]),
          p()
        )
      ],
      [
        "TransferFeeAmount",
        J(
          k([["withheldAmount", L()]]),
          p()
        )
      ],
      [
        "MintCloseAuthority",
        J(
          k([["closeAuthority", y()]]),
          p()
        )
      ],
      [
        "ConfidentialTransferMint",
        J(
          k([
            [
              "authority",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["autoApproveNewAccounts", iA()],
            [
              "auditorElgamalPubkey",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          p()
        )
      ],
      [
        "ConfidentialTransferAccount",
        J(
          k([
            ["approved", iA()],
            ["elgamalPubkey", y()],
            ["pendingBalanceLow", UI()],
            ["pendingBalanceHigh", UI()],
            ["availableBalance", UI()],
            ["decryptableAvailableBalance", YD()],
            ["allowConfidentialCredits", iA()],
            ["allowNonConfidentialCredits", iA()],
            ["pendingBalanceCreditCounter", L()],
            ["maximumPendingBalanceCreditCounter", L()],
            ["expectedPendingBalanceCreditCounter", L()],
            ["actualPendingBalanceCreditCounter", L()]
          ]),
          p()
        )
      ],
      [
        "DefaultAccountState",
        J(
          k([["state", pD()]]),
          p()
        )
      ],
      [
        "ImmutableOwner",
        J(k([]), p())
      ],
      [
        "MemoTransfer",
        J(
          k([
            ["requireIncomingTransferMemos", iA()]
          ]),
          p()
        )
      ],
      [
        "NonTransferable",
        J(k([]), p())
      ],
      [
        "InterestBearingConfig",
        J(
          k([
            ["rateAuthority", y()],
            ["initializationTimestamp", L()],
            ["preUpdateAverageRate", jB()],
            ["lastUpdateTimestamp", L()],
            ["currentRate", jB()]
          ]),
          p()
        )
      ],
      [
        "CpiGuard",
        J(
          k([["lockCpi", iA()]]),
          p()
        )
      ],
      [
        "PermanentDelegate",
        J(
          k([["delegate", y()]]),
          p()
        )
      ],
      [
        "NonTransferableAccount",
        J(k([]), p())
      ],
      [
        "TransferHook",
        J(
          k([
            ["authority", y()],
            ["programId", y()]
          ]),
          p()
        )
      ],
      [
        "TransferHookAccount",
        J(
          k([["transferring", iA()]]),
          p()
        )
      ],
      [
        "ConfidentialTransferFee",
        J(
          k([
            [
              "authority",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["elgamalPubkey", y()],
            ["harvestToMintEnabled", iA()],
            ["withheldAmount", UI()]
          ]),
          p()
        )
      ],
      [
        "ConfidentialTransferFeeAmount",
        J(
          k([["withheldAmount", UI()]]),
          p()
        )
      ],
      [
        "MetadataPointer",
        J(
          k([
            [
              "authority",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            [
              "metadataAddress",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          p()
        )
      ],
      [
        "TokenMetadata",
        J(
          k([
            [
              "updateAuthority",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["mint", y()],
            ["name", J(FI(), aA())],
            ["symbol", J(FI(), aA())],
            ["uri", J(FI(), aA())],
            [
              "additionalMetadata",
              Si(
                J(FI(), aA()),
                J(FI(), aA())
              )
            ]
          ]),
          p()
        )
      ],
      [
        "GroupPointer",
        J(
          k([
            [
              "authority",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            [
              "groupAddress",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          p()
        )
      ],
      [
        "TokenGroup",
        J(
          k([
            [
              "updateAuthority",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["mint", y()],
            ["size", L()],
            ["maxSize", L()]
          ]),
          p()
        )
      ],
      [
        "GroupMemberPointer",
        J(
          k([
            [
              "authority",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            [
              "memberAddress",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          p()
        )
      ],
      [
        "TokenGroupMember",
        J(
          k([
            ["mint", y()],
            ["group", y()],
            ["memberNumber", L()]
          ]),
          p()
        )
      ],
      ["ConfidentialMintBurn", gI()],
      [
        "ScaledUiAmountConfig",
        J(
          k([
            ["authority", y()],
            ["multiplier", Zg()],
            ["newMultiplierEffectiveTimestamp", L()],
            ["newMultiplier", Zg()]
          ]),
          p()
        )
      ],
      [
        "PausableConfig",
        J(
          k([
            [
              "authority",
              V(y(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["paused", iA()]
          ]),
          p()
        )
      ],
      ["PausableAccount", gI()]
    ],
    { size: p() }
  );
}
function hC() {
  return k([
    ["epoch", L()],
    ["maximumFee", L()],
    ["transferFeeBasisPoints", p()]
  ]);
}
function bD() {
  return k([
    [
      "mintAuthority",
      V(y(), {
        prefix: aA(),
        noneValue: "zeroes"
      })
    ],
    ["supply", L()],
    ["decimals", rB()],
    ["isInitialized", iA()],
    [
      "freezeAuthority",
      V(y(), {
        prefix: aA(),
        noneValue: "zeroes"
      })
    ],
    [
      "extensions",
      V(
        Ni(
          vA(LD(), { size: "remainder" }),
          [PC(je(XA(), 83).encode(1))]
        ),
        { prefix: null }
      )
    ]
  ]);
}
function KD(A) {
  return OA(
    A,
    bD()
  );
}
async function GB(A, I, g) {
  const B = await FB(A, I, g);
  return VI(B), B;
}
async function FB(A, I, g) {
  return (await lI(A, I, g)).map((C) => KD(C));
}
var OD = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", qI = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
function TD(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function HD(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: f.READONLY
      });
    const B = g.isWritable ? f.WRITABLE : f.READONLY;
    return Object.freeze({
      address: TD(g.value),
      role: yC(g.value) ? cg(B) : B,
      ...yC(g.value) ? { signer: g.value } : {}
    });
  };
}
function yC(A) {
  return !!A && typeof A == "object" && "address" in A && yI(A);
}
var xD = 1;
function qD() {
  return v(
    O([["discriminator", XA()]]),
    (A) => ({
      ...A,
      discriminator: xD
    })
  );
}
function VD(A, I) {
  const g = OD, C = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    ata: { value: A.ata ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 },
    mint: { value: A.mint ?? null, isWritable: !1 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 },
    tokenProgram: { value: A.tokenProgram ?? null, isWritable: !1 }
  };
  C.tokenProgram.value || (C.tokenProgram.value = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"), C.systemProgram.value || (C.systemProgram.value = "11111111111111111111111111111111");
  const Q = HD(g);
  return Object.freeze({
    accounts: [
      Q(C.payer),
      Q(C.ata),
      Q(C.owner),
      Q(C.mint),
      Q(C.systemProgram),
      Q(C.tokenProgram)
    ],
    data: qD().encode({}),
    programAddress: g
  });
}
function AA(A, I) {
  if (!A) throw new Error(I || "Assertion failed");
}
AA.ok = AA;
function _D() {
  return k([
    [
      "mintAuthority",
      V(y(), {
        prefix: aA(),
        noneValue: "zeroes"
      })
    ],
    ["supply", L()],
    ["decimals", rB()],
    ["isInitialized", iA()],
    [
      "freezeAuthority",
      V(y(), {
        prefix: aA(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function ZD(A) {
  return OA(
    A,
    _D()
  );
}
async function WD(A, I, g) {
  const B = await jD(A, I, g);
  return VI(B), B;
}
async function jD(A, I, g) {
  return (await lI(A, I, g)).map((C) => ZD(C));
}
var EE = /* @__PURE__ */ ((A) => (A[A.Uninitialized = 0] = "Uninitialized", A[A.Initialized = 1] = "Initialized", A[A.Frozen = 2] = "Frozen", A))(EE || {});
function zD() {
  return CQ(EE);
}
function eE() {
  return k([
    ["mint", y()],
    ["owner", y()],
    ["amount", L()],
    [
      "delegate",
      V(y(), {
        prefix: aA(),
        noneValue: "zeroes"
      })
    ],
    ["state", zD()],
    [
      "isNative",
      V(L(), {
        prefix: aA(),
        noneValue: "zeroes"
      })
    ],
    ["delegatedAmount", L()],
    [
      "closeAuthority",
      V(y(), {
        prefix: aA(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function PD(A) {
  return OA(
    A,
    eE()
  );
}
async function vD(A, I, g) {
  return (await lI(A, I, g)).map((C) => PD(C));
}
function NC() {
  return 165;
}
var iE = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", GA = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
function XD(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function ug(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: f.READONLY
      });
    const B = g.isWritable ? f.WRITABLE : f.READONLY;
    return Object.freeze({
      address: XD(g.value),
      role: SC(g.value) ? cg(B) : B,
      ...SC(g.value) ? { signer: g.value } : {}
    });
  };
}
function SC(A) {
  return !!A && typeof A == "object" && "address" in A && yI(A);
}
var $D = 9;
function Aw() {
  return v(
    O([["discriminator", XA()]]),
    (A) => ({ ...A, discriminator: $D })
  );
}
function BI(A, I) {
  const g = I?.programAddress ?? GA, C = {
    account: { value: A.account ?? null, isWritable: !0 },
    destination: { value: A.destination ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 }
  }, E = ({ ...A }.multiSigners ?? []).map(
    (i) => ({
      address: i.address,
      role: f.READONLY_SIGNER,
      signer: i
    })
  ), e = ug(g);
  return Object.freeze({
    accounts: [
      e(C.account),
      e(C.destination),
      e(C.owner),
      ...E
    ],
    data: Aw().encode({}),
    programAddress: g
  });
}
async function tA(A, I = {}) {
  const {
    programAddress: g = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
  } = I;
  return await dI({
    programAddress: g,
    seeds: [
      CA().encode(A.owner),
      CA().encode(A.tokenProgram),
      CA().encode(A.mint)
    ]
  });
}
var Iw = 1;
function gw() {
  return v(
    O([["discriminator", XA()]]),
    (A) => ({
      ...A,
      discriminator: Iw
    })
  );
}
function eg(A, I) {
  const g = iE, C = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    ata: { value: A.ata ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 },
    mint: { value: A.mint ?? null, isWritable: !1 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 },
    tokenProgram: { value: A.tokenProgram ?? null, isWritable: !1 }
  };
  C.tokenProgram.value || (C.tokenProgram.value = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), C.systemProgram.value || (C.systemProgram.value = "11111111111111111111111111111111");
  const Q = ug(g);
  return Object.freeze({
    accounts: [
      Q(C.payer),
      Q(C.ata),
      Q(C.owner),
      Q(C.mint),
      Q(C.systemProgram),
      Q(C.tokenProgram)
    ],
    data: gw().encode({}),
    programAddress: g
  });
}
var Bw = 18;
function Cw() {
  return v(
    O([
      ["discriminator", XA()],
      ["owner", CA()]
    ]),
    (A) => ({ ...A, discriminator: Bw })
  );
}
function fC(A, I) {
  const g = GA, C = {
    account: { value: A.account ?? null, isWritable: !0 },
    mint: { value: A.mint ?? null, isWritable: !1 }
  }, Q = { ...A }, E = ug(g);
  return Object.freeze({
    accounts: [E(C.account), E(C.mint)],
    data: Cw().encode(
      Q
    ),
    programAddress: g
  });
}
var Qw = 17;
function Ew() {
  return v(
    O([["discriminator", XA()]]),
    (A) => ({ ...A, discriminator: Qw })
  );
}
function UB(A, I) {
  const g = GA, C = {
    account: { value: A.account ?? null, isWritable: !0 }
  }, Q = ug(g);
  return Object.freeze({
    accounts: [Q(C.account)],
    data: Ew().encode({}),
    programAddress: g
  });
}
var CI = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr", PA = u(
  "11111111111111111111111111111111"
), ew = 32896, iw = DA(PA), zI = iw, tw = 100, lg = tw, nw = "keypair", II = nw;
function RC(A) {
  II = A;
}
var $ = u(
  "So11111111111111111111111111111111111111112"
);
function ow(A) {
  return II === "none" || II === "ata" ? !0 : A != $;
}
async function dg(A, I, g) {
  const B = Array.isArray(g) ? g : Object.keys(g), C = B.indexOf($), Q = C !== -1, E = await WD(A, B.filter(ow)), e = await Promise.all(
    E.map(
      (o) => tA({
        owner: I.address,
        mint: o.address,
        tokenProgram: o.programAddress
      }).then((c) => c[0])
    )
  ), i = await vD(A, e), t = {}, n = [], a = [];
  for (let o = 0; o < E.length; o++) {
    const c = E[o], s = i[o];
    t[c.address] = s.address, !s.exists && n.push(
      VD({
        payer: I,
        owner: I.address,
        ata: s.address,
        mint: c.address,
        tokenProgram: c.programAddress
      })
    );
  }
  if (!Array.isArray(g))
    for (let o = 0; o < E.length; o++) {
      if (E[o].address === $ && II !== "none")
        continue;
      const s = i[o];
      s.exists && s.data.amount;
    }
  if (Q && II === "keypair") {
    const o = await TQ(), c = NC();
    let s = await A.getMinimumBalanceForRentExemption(BigInt(c)).send();
    Array.isArray(g) || (s = vg(s + BigInt(g[$]))), n.push(
      Nr({
        payer: I,
        newAccount: o,
        lamports: s,
        space: c,
        programAddress: GA
      }),
      fC({
        account: o.address,
        mint: $,
        owner: I.address
      })
    ), a.push(
      BI({
        account: o.address,
        owner: I,
        destination: I.address
      })
    ), t[$] = o.address;
  }
  if (Q && II === "seed") {
    const o = NC();
    let c = await A.getMinimumBalanceForRentExemption(BigInt(o)).send();
    Array.isArray(g) || (c = vg(c + BigInt(g[$])));
    const s = Date.now().toString(), w = await crypto.subtle.digest(
      "SHA-256",
      Buffer.concat([
        Buffer.from(CA().encode(I.address)),
        Buffer.from(s),
        Buffer.from(CA().encode(GA))
      ])
    );
    t[$] = y().decode(
      new Uint8Array(w)
    ), n.push(
      Rr({
        payer: I,
        newAccount: t[$],
        base: I.address,
        baseAccount: I,
        seed: s,
        space: o,
        amount: c,
        programAddress: GA
      }),
      fC({
        account: t[$],
        mint: $,
        owner: I.address
      })
    ), a.push(
      BI({
        account: t[$],
        owner: I,
        destination: I.address
      })
    );
  }
  if (Q && II === "ata") {
    const o = i[C], c = o.exists ? o.data.amount : 0n;
    !Array.isArray(g) && c < BigInt(g[$]) && n.push(
      NB({
        source: I,
        destination: t[$],
        amount: BigInt(g[$]) - c
      }),
      UB({
        account: t[$]
      })
    ), o.exists || a.push(
      BI({
        account: o.address,
        owner: I,
        destination: I.address
      })
    );
  }
  return {
    createInstructions: n,
    cleanupInstructions: a,
    tokenAccountAddresses: t
  };
}
function sA(A, I) {
  if (A == null || "exists" in A && !A.exists || A.data.extensions.__option === "None")
    return;
  const g = A.data.extensions.value.find(
    (C) => C.__kind === "TransferFeeConfig"
  );
  if (g == null)
    return;
  const B = I >= g.newerTransferFee.epoch ? g.newerTransferFee : g.olderTransferFee;
  return {
    feeBps: B.transferFeeBasisPoints,
    maxFee: B.maximumFee
  };
}
var rw = 128;
function kC(A, I) {
  const g = BigInt(I + rw);
  return A.lamportsPerByteYear * g * BigInt(A.exemptionThreshold);
}
function tE(A, I, g, B, C, Q) {
  return "liquidity" in A ? is(
    A.liquidity,
    B,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    C,
    Q
  ) : "tokenA" in A ? ts(
    A.tokenA,
    B,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    C,
    Q
  ) : ns(
    A.tokenB,
    B,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    C,
    Q
  );
}
async function aw(A, I, g, B = {}) {
  const C = B.slippageToleranceBps ?? lg, Q = B.authority ?? zI, E = B.whirlpoolDeployment ?? YA;
  AA(
    Q.address !== PA,
    "Either supply the authority or set the default funder"
  );
  const e = await SI(
    I,
    E.programId
  ), i = await jI(A, e[0]), t = await NI(A, i.data.whirlpool), n = await A.getEpochInfo().send(), [a, o, c] = await GB(A, [
    t.data.tokenMintA,
    t.data.tokenMintB,
    I
  ]), s = sA(a, n.epoch), w = sA(o, n.epoch), d = tE(
    g,
    t.data,
    i.data,
    C,
    s,
    w
  ), r = [], D = pA(
    i.data.tickLowerIndex,
    t.data.tickSpacing
  ), h = pA(
    i.data.tickUpperIndex,
    t.data.tickSpacing
  ), [R, G, m] = await Promise.all([
    tA({
      owner: Q.address,
      mint: I,
      tokenProgram: c.programAddress
    }).then((j) => j[0]),
    JA(
      t.address,
      D,
      E.programId
    ).then((j) => j[0]),
    JA(
      t.address,
      h,
      E.programId
    ).then((j) => j[0])
  ]), { createInstructions: Y, cleanupInstructions: T, tokenAccountAddresses: x } = await dg(A, Q, [
    t.data.tokenMintA,
    t.data.tokenMintB
  ]);
  return r.push(...Y), r.push(
    PQ(
      {
        whirlpool: t.address,
        positionAuthority: Q,
        position: i.address,
        positionTokenAccount: R,
        tokenOwnerAccountA: x[t.data.tokenMintA],
        tokenOwnerAccountB: x[t.data.tokenMintB],
        tokenVaultA: t.data.tokenVaultA,
        tokenVaultB: t.data.tokenVaultB,
        tokenMintA: t.data.tokenMintA,
        tokenMintB: t.data.tokenMintB,
        tokenProgramA: a.programAddress,
        tokenProgramB: o.programAddress,
        memoProgram: CI,
        tickArrayLower: G,
        tickArrayUpper: m,
        liquidityAmount: d.liquidityDelta,
        tokenMinA: d.tokenMinA,
        tokenMinB: d.tokenMinB,
        remainingAccountsInfo: null
      },
      { programAddress: E.programId }
    )
  ), r.push(...T), { quote: d, instructions: r };
}
async function MC(A, I, g = {}) {
  const B = g.slippageToleranceBps ?? lg, C = g.authority ?? zI, Q = g.whirlpoolDeployment ?? YA;
  AA(
    C.address !== PA,
    "Either supply an authority or set the default funder"
  );
  const E = await SI(
    I,
    Q.programId
  ), e = await jI(A, E[0]), i = await NI(A, e.data.whirlpool), t = await A.getEpochInfo().send(), [n, a, o, ...c] = await FB(
    A,
    [
      i.data.tokenMintA,
      i.data.tokenMintB,
      I,
      ...i.data.rewardInfos.map((K) => K.mint).filter((K) => K !== PA)
    ]
  );
  AA(n.exists, "Token A not found"), AA(a.exists, "Token B not found"), AA(o.exists, "Position mint not found");
  const s = sA(n, t.epoch), w = sA(a, t.epoch), d = tE(
    { liquidity: e.data.liquidity },
    i.data,
    e.data,
    B,
    s,
    w
  ), r = pA(
    e.data.tickLowerIndex,
    i.data.tickSpacing
  ), D = pA(
    e.data.tickUpperIndex,
    i.data.tickSpacing
  ), [h, R, G] = await Promise.all([
    tA({
      owner: C.address,
      mint: I,
      tokenProgram: o.programAddress
    }).then((K) => K[0]),
    JA(
      i.address,
      r,
      Q.programId
    ).then((K) => K[0]),
    JA(
      i.address,
      D,
      Q.programId
    ).then((K) => K[0])
  ]), [m, Y] = await XQ(A, [
    R,
    G
  ]), T = m.data.ticks[Eg(
    e.data.tickLowerIndex,
    r,
    i.data.tickSpacing
  )], x = Y.data.ticks[Eg(
    e.data.tickUpperIndex,
    D,
    i.data.tickSpacing
  )], j = BE(
    i.data,
    e.data,
    T,
    x,
    s,
    w
  ), VA = BigInt(Math.floor(Date.now() / 1e3)), QA = CE(
    i.data,
    e.data,
    T,
    x,
    VA,
    sA(c[0], t.epoch),
    sA(c[1], t.epoch),
    sA(c[2], t.epoch)
  ), H = /* @__PURE__ */ new Set();
  (d.liquidityDelta > 0n || j.feeOwedA > 0n || j.feeOwedB > 0n) && (H.add(i.data.tokenMintA), H.add(i.data.tokenMintB));
  for (let K = 0; K < QA.rewards.length; K++)
    QA.rewards[K].rewardsOwed > 0n && H.add(i.data.rewardInfos[K].mint);
  const { createInstructions: F, cleanupInstructions: gA, tokenAccountAddresses: EA } = await dg(
    A,
    C,
    Array.from(H)
  ), eA = [];
  eA.push(...F), d.liquidityDelta > 0n && eA.push(
    PQ(
      {
        whirlpool: i.address,
        positionAuthority: C,
        position: E[0],
        positionTokenAccount: h,
        tokenOwnerAccountA: EA[i.data.tokenMintA],
        tokenOwnerAccountB: EA[i.data.tokenMintB],
        tokenVaultA: i.data.tokenVaultA,
        tokenVaultB: i.data.tokenVaultB,
        tickArrayLower: R,
        tickArrayUpper: G,
        liquidityAmount: d.liquidityDelta,
        tokenMinA: d.tokenMinA,
        tokenMinB: d.tokenMinB,
        tokenMintA: i.data.tokenMintA,
        tokenMintB: i.data.tokenMintB,
        tokenProgramA: n.programAddress,
        tokenProgramB: a.programAddress,
        memoProgram: CI,
        remainingAccountsInfo: null
      },
      { programAddress: Q.programId }
    )
  ), (j.feeOwedA > 0n || j.feeOwedB > 0n) && eA.push(
    jQ(
      {
        whirlpool: i.address,
        positionAuthority: C,
        position: E[0],
        positionTokenAccount: h,
        tokenOwnerAccountA: EA[i.data.tokenMintA],
        tokenOwnerAccountB: EA[i.data.tokenMintB],
        tokenVaultA: i.data.tokenVaultA,
        tokenVaultB: i.data.tokenVaultB,
        tokenMintA: i.data.tokenMintA,
        tokenMintB: i.data.tokenMintB,
        tokenProgramA: n.programAddress,
        tokenProgramB: a.programAddress,
        memoProgram: CI,
        remainingAccountsInfo: null
      },
      { programAddress: Q.programId }
    )
  );
  for (let K = 0; K < QA.rewards.length; K++) {
    if (QA.rewards[K].rewardsOwed === 0n)
      continue;
    const LA = c[K];
    AA(LA.exists, `Reward mint ${K} not found`), eA.push(
      zQ(
        {
          whirlpool: i.address,
          positionAuthority: C,
          position: E[0],
          positionTokenAccount: h,
          rewardOwnerAccount: EA[LA.address],
          rewardVault: i.data.rewardInfos[K].vault,
          rewardIndex: K,
          rewardMint: LA.address,
          rewardTokenProgram: LA.programAddress,
          memoProgram: CI,
          remainingAccountsInfo: null
        },
        { programAddress: Q.programId }
      )
    );
  }
  switch (o.programAddress) {
    case GA:
      eA.push(
        Ba(
          {
            positionAuthority: C,
            position: E[0],
            positionTokenAccount: h,
            positionMint: I,
            receiver: C.address
          },
          { programAddress: Q.programId }
        )
      );
      break;
    case qI:
      eA.push(
        Ea(
          {
            positionAuthority: C,
            position: E[0],
            positionTokenAccount: h,
            positionMint: I,
            receiver: C.address,
            token2022Program: qI
          },
          { programAddress: Q.programId }
        )
      );
      break;
    default:
      throw new Error("Invalid token program");
  }
  return eA.push(...gA), {
    instructions: eA,
    quote: d,
    feesQuote: j,
    rewardsQuote: QA
  };
}
var Tg = 100;
async function Hg(A, I, g) {
  const B = Math.ceil(I.length / Tg), C = [...Array(B).keys()].map(
    (E) => I.slice(E * Tg, (E + 1) * Tg)
  ), Q = [];
  for (const E of C)
    (await lI(A, E)).forEach((i, t) => {
      const n = g(i);
      Q.push(n);
    });
  return Q;
}
function sw(A, I) {
  const g = Buffer.from(A.positionBitmap), B = [];
  for (let C = 0; C < Es(); C++) {
    const Q = Math.floor(C / 8), E = C % 8;
    g[Q] & 1 << E && B.push(
      Ma(
        A.positionBundleMint,
        C,
        I
      ).then((e) => e[0])
    );
  }
  return B;
}
async function cw(A, I, g = YA) {
  const B = g.programId, [C, Q] = await Promise.all([
    A.getTokenAccountsByOwner(
      I,
      { programId: GA },
      { encoding: "base64" }
    ).send(),
    A.getTokenAccountsByOwner(
      I,
      { programId: qI },
      { encoding: "base64" }
    ).send()
  ]), E = Ri(), e = eE(), i = [...C.value, ...Q.value].map((r) => ({
    ...e.decode(E.encode(r.account.data[0])),
    tokenProgram: r.account.owner
  })).filter((r) => r.amount === 1n), t = await Promise.all(
    i.map(
      (r) => SI(r.mint, B).then((D) => D[0])
    )
  ), n = await Promise.all(
    i.map(
      (r) => ka(r.mint, B).then((D) => D[0])
    )
  ), a = await Hg(
    A,
    t,
    $g
  ), o = await Hg(
    A,
    n,
    Pr
  ), c = await Promise.all(
    o.filter((r) => r.exists).flatMap((r) => sw(r.data, B))
  ), w = (await Hg(
    A,
    c,
    $g
  )).filter((r) => r.exists).map((r) => (og(r), r)).reduce((r, D) => {
    const h = r.get(D.data.positionMint) ?? [];
    return r.set(D.data.positionMint, [...h, D]);
  }, /* @__PURE__ */ new Map()), d = [];
  for (let r = 0; r < i.length; r++) {
    const D = a[r], h = o[r], R = i[r];
    if (D.exists && d.push({
      ...D,
      tokenProgram: R.tokenProgram,
      isPositionBundle: !1
    }), h.exists) {
      const G = w.get(h.data.positionBundleMint) ?? [];
      d.push({
        ...h,
        positions: G,
        tokenProgram: R.tokenProgram,
        isPositionBundle: !0
      });
    }
  }
  return d;
}
async function nE(A, I, g = {}) {
  const B = g.authority ?? zI, C = g.whirlpoolDeployment ?? YA;
  AA(
    B.address !== PA,
    "Either supply an authority or set the default funder"
  );
  const Q = await A.getEpochInfo().send(), E = await SI(
    I,
    C.programId
  ), e = await jI(A, E[0]), i = await NI(A, e.data.whirlpool), [t, n, a, ...o] = await FB(
    A,
    [
      i.data.tokenMintA,
      i.data.tokenMintB,
      I,
      ...i.data.rewardInfos.map((F) => F.mint).filter((F) => F !== PA)
    ]
  );
  AA(t.exists, "Token A not found"), AA(n.exists, "Token B not found"), AA(a.exists, "Position mint not found");
  const c = pA(
    e.data.tickLowerIndex,
    i.data.tickSpacing
  ), s = pA(
    e.data.tickUpperIndex,
    i.data.tickSpacing
  ), [w, d, r] = await Promise.all([
    tA({
      owner: B.address,
      mint: I,
      tokenProgram: a.programAddress
    }).then((F) => F[0]),
    JA(
      i.address,
      c,
      C.programId
    ).then((F) => F[0]),
    JA(
      i.address,
      s,
      C.programId
    ).then((F) => F[0])
  ]), [D, h] = await XQ(A, [
    d,
    r
  ]), R = D.data.ticks[Eg(
    e.data.tickLowerIndex,
    c,
    i.data.tickSpacing
  )], G = h.data.ticks[Eg(
    e.data.tickUpperIndex,
    s,
    i.data.tickSpacing
  )], m = BE(
    i.data,
    e.data,
    R,
    G,
    sA(t, Q.epoch),
    sA(n, Q.epoch)
  ), Y = BigInt(Math.floor(Date.now() / 1e3)), T = CE(
    i.data,
    e.data,
    R,
    G,
    Y,
    sA(o[0], Q.epoch),
    sA(o[1], Q.epoch),
    sA(o[2], Q.epoch)
  ), x = /* @__PURE__ */ new Set();
  (m.feeOwedA > 0n || m.feeOwedB > 0n) && (x.add(i.data.tokenMintA), x.add(i.data.tokenMintB));
  for (let F = 0; F < T.rewards.length; F++)
    T.rewards[F].rewardsOwed > 0n && x.add(i.data.rewardInfos[F].mint);
  const { createInstructions: j, cleanupInstructions: VA, tokenAccountAddresses: QA } = await dg(
    A,
    B,
    Array.from(x)
  ), H = [];
  H.push(...j), e.data.liquidity > 0n && H.push(
    Na(
      {
        whirlpool: i.address,
        position: E[0],
        tickArrayLower: d,
        tickArrayUpper: r
      },
      { programAddress: C.programId }
    )
  ), (m.feeOwedA > 0n || m.feeOwedB > 0n) && H.push(
    jQ(
      {
        whirlpool: i.address,
        positionAuthority: B,
        position: E[0],
        positionTokenAccount: w,
        tokenOwnerAccountA: QA[i.data.tokenMintA],
        tokenOwnerAccountB: QA[i.data.tokenMintB],
        tokenVaultA: i.data.tokenVaultA,
        tokenVaultB: i.data.tokenVaultB,
        tokenMintA: i.data.tokenMintA,
        tokenMintB: i.data.tokenMintB,
        tokenProgramA: t.programAddress,
        tokenProgramB: n.programAddress,
        memoProgram: CI,
        remainingAccountsInfo: null
      },
      { programAddress: C.programId }
    )
  );
  for (let F = 0; F < T.rewards.length; F++) {
    if (T.rewards[F].rewardsOwed === 0n)
      continue;
    const gA = o[F];
    AA(gA.exists, `Reward mint ${F} not found`), H.push(
      zQ(
        {
          whirlpool: i.address,
          positionAuthority: B,
          position: E[0],
          positionTokenAccount: w,
          rewardOwnerAccount: QA[gA.address],
          rewardVault: i.data.rewardInfos[F].vault,
          rewardIndex: F,
          rewardMint: gA.address,
          rewardTokenProgram: gA.programAddress,
          memoProgram: CI,
          remainingAccountsInfo: null
        },
        { programAddress: C.programId }
      )
    );
  }
  return H.push(...VA), {
    feesQuote: m,
    rewardsQuote: T,
    instructions: H
  };
}
async function oE(A, {
  whirlpool: {
    address: I,
    data: { sqrtPrice: g, tokenMintA: B, tokenMintB: C, ...Q }
  },
  param: { tokenMaxA: E, tokenMaxB: e },
  mintA: i,
  mintB: t,
  slippageToleranceBps: n,
  authority: a,
  programAddress: o,
  ...c
}) {
  const {
    createInstructions: s,
    cleanupInstructions: w,
    tokenAccountAddresses: d
  } = await dg(A, a, {
    [B]: E,
    [C]: e
  }), r = {
    whirlpool: I,
    positionAuthority: a,
    tokenOwnerAccountA: d[B],
    tokenOwnerAccountB: d[C],
    tokenMintA: B,
    tokenMintB: C,
    tokenProgramA: i.programAddress,
    tokenProgramB: t.programAddress,
    memoProgram: CI,
    remainingAccountsInfo: null,
    ...Q,
    ...c
  }, { minSqrtPrice: D, maxSqrtPrice: h } = Qs(
    g,
    n
  ), R = ca(
    {
      method: Lr("ByTokenAmounts", {
        minSqrtPrice: D,
        maxSqrtPrice: h,
        tokenMaxA: E,
        tokenMaxB: e
      }),
      ...r
    },
    { programAddress: o }
  );
  return {
    createTokenAccountInstructions: s,
    increaseLiquidityInstruction: R,
    cleanupInstructions: w
  };
}
async function Dw(A, I, g, B = {}) {
  const C = B.slippageToleranceBps ?? lg, Q = B.authority ?? zI, E = B.whirlpoolDeployment ?? YA;
  AA(
    Q.address !== PA,
    "Either supply the authority or set the default funder"
  );
  const e = await SI(
    I,
    E.programId
  ), i = await jI(A, e[0]), t = await NI(A, i.data.whirlpool), [n, a, o] = await GB(A, [
    t.data.tokenMintA,
    t.data.tokenMintB,
    I
  ]), c = pA(
    i.data.tickLowerIndex,
    t.data.tickSpacing
  ), s = pA(
    i.data.tickUpperIndex,
    t.data.tickSpacing
  ), [w, d, r] = await Promise.all([
    tA({
      owner: Q.address,
      mint: I,
      tokenProgram: o.programAddress
    }).then((m) => m[0]),
    JA(
      t.address,
      c,
      E.programId
    ).then((m) => m[0]),
    JA(
      t.address,
      s,
      E.programId
    ).then((m) => m[0])
  ]), {
    createTokenAccountInstructions: D,
    increaseLiquidityInstruction: h,
    cleanupInstructions: R
  } = await oE(A, {
    whirlpool: t,
    position: i.address,
    positionTokenAccount: w,
    param: g,
    mintA: n,
    mintB: a,
    slippageToleranceBps: C,
    authority: Q,
    programAddress: E.programId,
    tickArrayLower: d,
    tickArrayUpper: r,
    tickLowerIndex: i.data.tickLowerIndex,
    tickUpperIndex: i.data.tickUpperIndex
  });
  return {
    instructions: [
      ...D,
      h,
      ...R
    ]
  };
}
async function ww(A, I, g, B, C, Q, E, e, i, t, n) {
  AA(
    t.address !== PA,
    "Either supply a funder or set the default funder"
  );
  const a = [], o = await va(A);
  let c = 0n;
  const s = es(B, C), w = dC(
    s.tickLowerIndex,
    I.data.tickSpacing,
    !1
  ), d = dC(
    s.tickUpperIndex,
    I.data.tickSpacing,
    !0
  ), r = await TQ(), D = pA(
    w,
    I.data.tickSpacing
  ), h = pA(
    d,
    I.data.tickSpacing
  ), [
    R,
    G,
    m,
    Y
  ] = await Promise.all([
    SI(r.address, n.programId),
    tA({
      owner: t.address,
      mint: r.address,
      tokenProgram: qI
    }).then((H) => H[0]),
    JA(
      I.address,
      D,
      n.programId
    ).then((H) => H[0]),
    JA(
      I.address,
      h,
      n.programId
    ).then((H) => H[0])
  ]), {
    createTokenAccountInstructions: T,
    increaseLiquidityInstruction: x,
    cleanupInstructions: j
  } = await oE(A, {
    whirlpool: I,
    position: R[0],
    positionTokenAccount: G,
    param: g,
    mintA: Q,
    mintB: E,
    slippageToleranceBps: e,
    authority: t,
    programAddress: n.programId,
    tickArrayLower: m,
    tickArrayUpper: Y,
    tickLowerIndex: w,
    tickUpperIndex: d
  });
  a.push(...T);
  const [VA, QA] = await $Q(A, [
    m,
    Y
  ]);
  return VA.exists || (a.push(
    DC(
      {
        whirlpool: I.address,
        funder: t,
        tickArray: m,
        startTickIndex: D,
        idempotent: !1
      },
      { programAddress: n.programId }
    )
  ), c += kC(
    o,
    uC()
  )), !QA.exists && D !== h && (a.push(
    DC(
      {
        whirlpool: I.address,
        funder: t,
        tickArray: Y,
        startTickIndex: h,
        idempotent: !1
      },
      { programAddress: n.programId }
    )
  ), c += kC(
    o,
    uC()
  )), a.push(
    da(
      {
        funder: t,
        owner: t.address,
        position: R[0],
        positionMint: r,
        positionTokenAccount: G,
        whirlpool: I.address,
        associatedTokenProgram: iE,
        tickLowerIndex: w,
        tickUpperIndex: d,
        token2022Program: qI,
        metadataUpdateAuth: u(
          "3axbTs2z5GBy6usVbNVoqEgZMng3vZvMnAoX29BFfwhr"
        ),
        withTokenMetadataExtension: i
      },
      { programAddress: n.programId }
    )
  ), a.push(x), a.push(...j), {
    instructions: a,
    positionMint: r.address,
    initializationCost: vg(c)
  };
}
async function rE(A, I, g, B, C, Q = {}) {
  const E = Q.slippageToleranceBps ?? lg, e = Q.withTokenMetadataExtension ?? !0, i = Q.funder ?? zI, t = Q.whirlpoolDeployment ?? YA, n = await NI(A, I);
  uw(n.data);
  const [a, o] = await GB(A, [
    n.data.tokenMintA,
    n.data.tokenMintB
  ]), c = a.data.decimals, s = o.data.decimals, w = lC(B, c, s), d = lC(C, c, s);
  return ww(
    A,
    n,
    g,
    w,
    d,
    a,
    o,
    E,
    e,
    i,
    t
  );
}
function uw(A) {
  AA(
    A.tickSpacing !== ew,
    "Splash pools only support full range positions"
  );
}
const fI = u("wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8"), lw = u("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"), dw = u("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), hw = u("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"), aE = u("11111111111111111111111111111111"), sE = u("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), GC = "So11111111111111111111111111111111111111112", yw = 43200, Nw = 5, ig = CA(), hg = (A) => new TextEncoder().encode(A), yg = async (A, I) => (await dI({ programAddress: A, seeds: I }))[0], Sw = () => yg(fI, [hg("global_config")]), cE = (A, I, g = 0) => yg(fI, [hg("automation"), ig.encode(A), ig.encode(I), new Uint8Array([g])]), fw = (A) => yg(fI, [hg("automation-authority"), ig.encode(A)]), Rw = (A) => yg(lw, [hg("position"), ig.encode(A)]), mI = (A, I) => {
  const g = new Uint8Array(I);
  let B = BigInt(A);
  for (let C = 0; C < I; C++)
    g[C] = Number(B & 0xffn), B >>= 8n;
  return g;
}, FC = (...A) => {
  const I = new Uint8Array(A.reduce((B, C) => B + C.length, 0));
  let g = 0;
  return A.forEach((B) => {
    I.set(B, g), g += B.length;
  }), I;
}, U = (A, I, g) => g ? { address: A, role: I, signer: g } : { address: A, role: I };
async function mB(A, I, g) {
  I = u(I), g = u(g);
  const C = (await A.getTokenAccountsByOwner(I, { mint: g }, { encoding: "jsonParsed" }).send()).value.find((T) => T.account.data.parsed.info.tokenAmount.amount === "1");
  if (!C) throw new Error("No encuentro el NFT de esta posición en tu wallet");
  const Q = u(String(C.pubkey)), E = u(String(C.account.owner)), e = await Rw(g), i = await jI(A, e), t = await NI(A, i.data.whirlpool), n = t.data.tokenMintA, a = t.data.tokenMintB, o = (await A.getMultipleAccounts([n, a], { encoding: "jsonParsed" }).send()).value, c = u(String(o[0].owner)), s = u(String(o[1].owner)), w = Number(o[0].data.parsed.info.decimals), d = Number(o[1].data.parsed.info.decimals), r = await cE(Q, e, 0), D = await fw(Q), [h] = await tA({ owner: r, mint: n, tokenProgram: c }), [R] = await tA({ owner: r, mint: a, tokenProgram: s }), G = (await A.getAccountInfo(r, { encoding: "base64" }).send()).value, m = C.account.data.parsed.info.delegate || null, Y = Number(t.data.sqrtPrice) / 18446744073709552e3;
  return {
    owner: I,
    mint: g,
    ta: Q,
    taProg: E,
    pos: e,
    pool: i.data.whirlpool,
    mA: n,
    mB: a,
    progA: c,
    progB: s,
    decA: w,
    decB: d,
    auto: r,
    authority: D,
    bA: h,
    bB: R,
    active: !!G,
    delegate: m,
    poolPrice: Y * Y * Math.pow(10, w - d)
  };
}
async function kw(A, I, g = {}, B = {}) {
  const C = B.minUsd || Nw, Q = B.interval || yw;
  let E = g[String(A.mA)], e = g[String(A.mB)];
  if (!E && e && (E = e * A.poolPrice), !e && E && A.poolPrice > 0 && (e = E / A.poolPrice), !E || !e) throw new Error("No tengo el precio de los tokens para fijar el mínimo de reinversión");
  const i = (w, d, r) => BigInt(Math.max(1, Math.ceil(w / d * Math.pow(10, r)))), t = i(C, E, A.decA), n = i(C, e, A.decB), a = Math.floor(Date.now() / 1e3) + Q, o = await Sw(), c = {
    programAddress: A.taProg,
    accounts: [U(A.ta, f.WRITABLE), U(A.mint, f.READONLY), U(A.authority, f.READONLY), U(I.address, f.READONLY_SIGNER, I)],
    data: FC(new Uint8Array([13]), mI(1, 8), new Uint8Array([0]))
  }, s = {
    programAddress: fI,
    accounts: [
      U(I.address, f.WRITABLE_SIGNER, I),
      U(A.auto, f.WRITABLE),
      U(A.bA, f.WRITABLE),
      U(A.bB, f.WRITABLE),
      U(A.pos, f.READONLY),
      U(A.ta, f.READONLY),
      U(A.pool, f.READONLY),
      U(o, f.READONLY),
      U(A.mA, f.READONLY),
      U(A.mB, f.READONLY),
      U(A.progA, f.READONLY),
      U(A.progB, f.READONLY),
      U(aE, f.READONLY),
      U(sE, f.READONLY)
    ],
    data: FC(new Uint8Array([2, 1, 0, 1]), mI(a, 8), new Uint8Array([1]), mI(Q, 4), new Uint8Array([2]), mI(t, 8), new Uint8Array([3]), mI(n, 8))
  };
  return { ixs: [c, s], thrA: t, thrB: n, next: a };
}
async function DE(A, I) {
  const [g] = await tA({ owner: A.owner, mint: A.mA, tokenProgram: A.progA }), [B] = await tA({ owner: A.owner, mint: A.mB, tokenProgram: A.progB }), C = [];
  return C.push({ programAddress: A.taProg, accounts: [U(A.ta, f.WRITABLE), U(I.address, f.READONLY_SIGNER, I)], data: new Uint8Array([5]) }), C.push(eg({ payer: I, ata: g, owner: A.owner, mint: A.mA, tokenProgram: A.progA })), C.push(eg({ payer: I, ata: B, owner: A.owner, mint: A.mB, tokenProgram: A.progB })), C.push({
    programAddress: fI,
    accounts: [
      U(I.address, f.WRITABLE_SIGNER, I),
      U(g, f.WRITABLE),
      U(B, f.WRITABLE),
      U(A.ta, f.READONLY),
      U(A.mA, f.WRITABLE),
      U(A.mB, f.WRITABLE),
      U(A.progA, f.READONLY),
      U(A.progB, f.READONLY),
      U(aE, f.READONLY),
      U(sE, f.READONLY),
      U(A.auto, f.WRITABLE),
      U(A.bA, f.WRITABLE),
      U(A.bB, f.WRITABLE)
    ],
    data: new Uint8Array([3])
  }), String(A.mA) === GC && C.push(BI({ account: g, destination: A.owner, owner: I }, { programAddress: A.progA })), String(A.mB) === GC && C.push(BI({ account: B, destination: A.owner, owner: I }, { programAddress: A.progB })), C;
}
async function Mw(A, I, g) {
  I = u(I);
  const B = [];
  for (const Q of g)
    for (const E of [dw, hw]) {
      const [e] = await tA({ owner: I, mint: u(Q.mint), tokenProgram: E });
      B.push({ mint: Q.mint, auto: await cE(e, u(Q.pos), 0) });
    }
  const C = {};
  for (let Q = 0; Q < B.length; Q += 100) {
    const E = B.slice(Q, Q + 100), e = (await A.getMultipleAccounts(E.map((i) => i.auto), { encoding: "base64" }).send()).value;
    E.forEach((i, t) => {
      if (!e[t] || String(e[t].owner) !== String(fI)) return;
      const n = Uint8Array.from(atob(e[t].data[0]), (o) => o.charCodeAt(0));
      let a = null;
      if (n[98] === 1) {
        let o = 0n;
        for (let c = 7; c >= 0; c--) o = o << 8n | BigInt(n[99 + c]);
        a = Number(o);
      }
      C[i.mint] = { next: a };
    });
  }
  return C;
}
typeof globalThis.Buffer > "u" && (globalThis.Buffer = { from: (A) => typeof A == "string" ? new TextEncoder().encode(A) : Uint8Array.from(A) });
const Gw = u("ComputeBudget111111111111111111111111111111"), rI = {
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: "USDT"
}, tg = 1232, wE = 2e4, JB = (A) => new Promise((I) => setTimeout(I, A));
function SA(A) {
  const I = pn({ url: A });
  return Yn(async (B) => {
    for (let C = 0; ; C++)
      try {
        return await I(B);
      } catch (Q) {
        const E = Q && Q.context && Q.context.statusCode;
        if (!(E === 429 || E >= 500 && E < 600 || /8100002/.test(String(Q && Q.message))) || C >= 5) throw Q;
        await JB(400 * Math.pow(2, C) + Math.random() * 200);
      }
  });
}
function IB(A, I, g) {
  const B = new Uint8Array(1 + g);
  B[0] = A;
  let C = BigInt(I);
  for (let Q = 0; Q < g; Q++)
    B[1 + Q] = Number(C & 0xffn), C >>= 8n;
  return { programAddress: Gw, accounts: [], data: B };
}
function uI(A, I) {
  const g = Math.floor((+A || 0) * Math.pow(10, I));
  return BigInt(g > 0 ? g : 0);
}
async function uE(A, I) {
  for (let g = 0; g < 30; g++) {
    await JB(2e3);
    let B = null;
    try {
      B = (await A.getSignatureStatuses([I]).send()).value[0];
    } catch {
      continue;
    }
    if (B) {
      if (B.err) throw new Error("La red rechazó la transacción: " + JSON.stringify(B.err, (C, Q) => typeof Q == "bigint" ? String(Q) : Q));
      if (B.confirmationStatus === "confirmed" || B.confirmationStatus === "finalized") return !0;
    }
  }
  return !1;
}
async function Fw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!I) throw new Error("No se cargó la librería de Solana");
  const g = uI(A.amountA, A.decA), B = uI(A.amountB, A.decB);
  if (g <= 0n && B <= 0n) throw new Error("Introduce una cantidad");
  if (!(A.lower > 0) || !(A.upper > A.lower)) throw new Error("Rango de precios no válido");
  const C = SA(A.rpc), Q = DA(u(A.owner)), E = await rE(C, u(A.pool), { tokenMaxA: g, tokenMaxB: B }, A.lower, A.upper, {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    funder: Q
  }), e = (await C.getLatestBlockhash().send()).value, i = async (c) => {
    const s = WI(
      qQ({ version: 0 }),
      (d) => OQ(Q, d),
      (d) => xQ(e, d),
      (d) => VQ(c, d)
    ), w = await HQ(s);
    return new Uint8Array(_Q().encode(w));
  };
  let t = await i([IB(3, wE, 8)].concat(E.instructions));
  if (t.length > tg && (t = await i(E.instructions)), t.length > tg) throw new Error("La transacción es demasiado grande para enviarla de una vez (" + t.length + " bytes)");
  const n = await A.provider.signAndSendTransaction(I.deserialize(t)), a = n && n.signature || String(n), o = await uE(C, a);
  return {
    signature: a,
    confirmed: o,
    positionMint: String(E.positionMint),
    initializationCost: Number(E.initializationCost) / 1e9,
    bytes: t.length
  };
}
const UC = (A) => {
  let I = "";
  for (let g = 0; g < A.length; g += 32768) I += String.fromCharCode.apply(null, A.subarray(g, g + 32768));
  return btoa(I);
};
async function ng(A, I, g) {
  for (let B = 0; ; B++) {
    const C = await fetch(A, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: I, params: g }) });
    if ((C.status === 429 || C.status >= 500) && B < 5) {
      await JB(400 * Math.pow(2, B) + Math.random() * 200);
      continue;
    }
    const Q = await C.text();
    let E;
    try {
      E = JSON.parse(Q);
    } catch {
      throw new Error("El RPC respondió: " + Q.slice(0, 60));
    }
    if (E.error) throw new Error(E.error.message || "Error del RPC");
    return E.result;
  }
}
async function lA(A, I) {
  const g = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!g) throw new Error("No se cargó la librería de Solana");
  const B = SA(A.rpc), C = A.signer || DA(u(A.owner)), Q = (await B.getLatestBlockhash().send()).value, E = A.alts && A.alts.length ? await lr(A.alts.map((w) => u(w)), B) : null, e = async (w) => {
    let d = WI(
      qQ({ version: 0 }),
      (D) => OQ(C, D),
      (D) => xQ(Q, D),
      (D) => VQ(w, D)
    );
    E && (d = Dr(d, E));
    const r = await HQ(d);
    return new Uint8Array(_Q().encode(r));
  }, i = A.cuLimit ? [IB(2, A.cuLimit, 4)] : [];
  let t = await e(i.concat([IB(3, wE, 8)], I));
  if (t.length > tg && (t = await e(i.concat(I))), t.length > tg) {
    const w = new Error("La transacción es demasiado grande (" + t.length + " bytes)");
    throw w.kzBig = !0, w;
  }
  const n = await ng(A.rpc, "simulateTransaction", [UC(t), { encoding: "base64", sigVerify: !1, replaceRecentBlockhash: !0, commitment: "confirmed" }]), a = n && (n.value || n);
  if (a && a.err) {
    const w = (a.logs || []).filter((d) => /Error|error|failed/.test(d)).slice(-2).join(" · ");
    throw new Error("La simulación falló, no se ha enviado nada. " + (w || JSON.stringify(a.err)));
  }
  const o = g.deserialize(t);
  let c;
  if (A.provider.signTransaction) {
    const w = await A.provider.signTransaction(o);
    c = await ng(A.rpc, "sendTransaction", [UC(w.serialize()), { encoding: "base64", skipPreflight: !1, preflightCommitment: "confirmed", maxRetries: 3 }]);
  } else {
    const w = await A.provider.signAndSendTransaction(o);
    c = w && w.signature || String(w);
  }
  const s = await uE(B, c);
  return { signature: c, confirmed: s };
}
function lE(A, I) {
  const g = atob(A.data), B = new Uint8Array(g.length);
  for (let C = 0; C < g.length; C++) B[C] = g.charCodeAt(C);
  return {
    programAddress: u(A.programId),
    accounts: A.accounts.map((C) => {
      const Q = (C.isSigner ? 2 : 0) + (C.isWritable ? 1 : 0), E = { address: u(C.pubkey), role: Q };
      return C.isSigner && C.pubkey === String(I.address) && (E.signer = I), E;
    }),
    data: B
  };
}
async function Uw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = uI(A.amountA, A.decA), g = uI(A.amountB, A.decB);
  if (I <= 0n && g <= 0n) throw new Error("Introduce una cantidad");
  if (!(A.lower > 0) || !(A.upper > A.lower)) throw new Error("Rango de precios no válido");
  const B = SA(A.rpc), C = DA(u(A.owner)), Q = "So11111111111111111111111111111111111111112", E = (await SB(B, [u(A.pool)]))[0].data, e = String(E.tokenMintA) === Q ? "A" : String(E.tokenMintB) === Q ? "B" : null;
  let i = [], t = [];
  if (e) {
    const [c] = await tA({ owner: C.address, tokenProgram: GA, mint: u(Q) }), s = e === "A" ? I : g;
    let w = BigInt(Math.floor(A.solIn || 0)) + (s > BigInt(Math.floor(A.solOut || 0)) ? s - BigInt(Math.floor(A.solOut || 0)) : 0n);
    i.push(eg({ payer: C, ata: c, owner: C.address, mint: u(Q) })), w > 0n && i.push(NB({ source: C, destination: c, amount: w })), i.push(UB({ account: c })), t.push(BI({ account: c, destination: C.address, owner: C }));
  }
  let n;
  RC(e ? "none" : "keypair");
  try {
    n = await rE(B, u(A.pool), { tokenMaxA: I, tokenMaxB: g }, A.lower, A.upper, {
      slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
      funder: C
    });
  } finally {
    RC("keypair");
  }
  const a = (A.pre || []).map((c) => lE(c, C)), o = await lA(Object.assign({}, A, { signer: C, cuLimit: A.cuLimit || 1e6 }), i.concat(a, n.instructions, t));
  return Object.assign(o, { positionMint: String(n.positionMint) });
}
async function mw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = DA(u(A.owner)), g = "So11111111111111111111111111111111111111112", B = [], C = [];
  if (A.sol) {
    const [E] = await tA({ owner: I.address, tokenProgram: GA, mint: u(g) });
    (A.sol.ata || A.sol.wrap > 0) && B.push(eg({ payer: I, ata: E, owner: I.address, mint: u(g) })), A.sol.wrap > 0 && (B.push(NB({ source: I, destination: E, amount: BigInt(Math.floor(A.sol.wrap)) })), B.push(UB({ account: E }))), A.sol.close && C.push(BI({ account: E, destination: I.address, owner: I }));
  }
  const Q = (A.ixs || []).map((E) => lE(E, I));
  return lA(Object.assign({}, A, { signer: I, cuLimit: A.cuLimit || 8e5 }), B.concat(Q, C));
}
async function Jw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = SA(A.rpc), g = DA(u(A.owner)), B = await Dw(I, u(A.mint), { tokenMaxA: uI(A.amountA, A.decA), tokenMaxB: uI(A.amountB, A.decB) }, {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    authority: g
  });
  return lA(Object.assign({}, A, { signer: g }), B.instructions);
}
async function pw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = SA(A.rpc), g = DA(u(A.owner)), B = BigInt(A.liquidity) * BigInt(Math.round(Math.min(100, Math.max(0, A.pct)) * 100)) / 10000n;
  if (B <= 0n) throw new Error("Elige cuánto quieres retirar");
  const C = await aw(I, u(A.mint), { liquidity: B }, {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    authority: g
  });
  return lA(Object.assign({}, A, { signer: g }), C.instructions);
}
async function Yw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = SA(A.rpc), g = DA(u(A.owner)), B = await MC(I, u(A.mint), {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    authority: g
  });
  let C = null;
  try {
    C = await mB(I, A.owner, A.mint);
  } catch {
  }
  if (C && C.active) {
    const Q = await DE(C, g);
    try {
      return await lA(Object.assign({}, A, { signer: g }), Q.concat(B.instructions));
    } catch (E) {
      if (!E.kzBig) throw E;
      await lA(Object.assign({}, A, { signer: g }), Q);
      const e = await MC(I, u(A.mint), { slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)), authority: g });
      return lA(Object.assign({}, A, { signer: g }), e.instructions);
    }
  }
  return lA(Object.assign({}, A, { signer: g }), B.instructions);
}
async function Lw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = SA(A.rpc), g = DA(u(A.owner)), B = await mB(I, A.owner, A.mint);
  if (B.active) throw new Error("La auto-composición ya está activa en esta posición");
  const C = await yE([String(B.mA), String(B.mB)]);
  rI[String(B.mA)] && !C[String(B.mA)] && (C[String(B.mA)] = 1), rI[String(B.mB)] && !C[String(B.mB)] && (C[String(B.mB)] = 1);
  const Q = await kw(B, g, C, { minUsd: A.minUsd, interval: A.interval });
  return lA(Object.assign({}, A, { signer: g }), Q.ixs);
}
async function bw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = SA(A.rpc), g = DA(u(A.owner)), B = await mB(I, A.owner, A.mint);
  if (!B.active) throw new Error("Esta posición no tiene la auto-composición activa");
  return lA(Object.assign({}, A, { signer: g }), await DE(B, g));
}
async function Kw(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = SA(A.rpc), g = DA(u(A.owner)), B = await nE(I, u(A.mint), { authority: g });
  return lA(Object.assign({}, A, { signer: g }), B.instructions);
}
const dE = ["5m", "15m", "30m", "1h", "4h", "8h", "24h", "7d", "30d", "365d"];
async function Ow(A) {
  try {
    let I = await fetch("https://api.orca.so/v2/solana/pools/" + A + "?stats=" + dE.filter((C) => C !== "365d").join(","));
    if (I.ok || (I = await fetch("https://api.orca.so/v2/solana/pools/" + A)), !I.ok) return null;
    const g = await I.json(), B = g && g.data ? g.data : g;
    return Array.isArray(B) ? B[0] : B;
  } catch {
    return null;
  }
}
const Tw = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", Hw = { TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: 1, TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb: 1 }, xw = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function qw(A) {
  const I = [0];
  for (const g of A) {
    let B = xw.indexOf(g);
    if (B < 0) return new Uint8Array(0);
    for (let C = 0; C < I.length; C++)
      B += I[C] * 58, I[C] = B & 255, B >>= 8;
    for (; B; )
      I.push(B & 255), B >>= 8;
  }
  for (const g of A) {
    if (g !== "1") break;
    I.push(0);
  }
  return new Uint8Array(I.reverse());
}
let JI = null;
async function Vw() {
  if (JI) return JI;
  const A = {
    increase_liquidity: "inc",
    increase_liquidity_v2: "inc",
    decrease_liquidity: "dec",
    decrease_liquidity_v2: "dec",
    collect_fees: "fee",
    collect_fees_v2: "fee",
    collect_reward: "rew",
    collect_reward_v2: "rew"
  };
  JI = {};
  for (const I of Object.keys(A)) {
    const g = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode("global:" + I)));
    JI[Array.from(g.slice(0, 8)).join(",")] = A[I];
  }
  return JI;
}
function _w(A, I, g, B) {
  if (A > 0 && I > 0) {
    const C = I / A;
    let Q = g, E = B;
    for (let i = 0; i < 80; i++) {
      const t = (Q + E) / 2;
      (t - g) / (1 / t - 1 / B) < C ? Q = t : E = t;
    }
    const e = (Q + E) / 2;
    return e * e;
  }
  return A > 0 ? g * g : I > 0 ? B * B : null;
}
async function hE(A, I, g) {
  const B = new Array(A.length);
  let C = 0;
  return await Promise.all(
    Array.from({ length: Math.min(I, A.length) }, async () => {
      for (; C < A.length; ) {
        const Q = C++;
        try {
          B[Q] = await g(A[Q]);
        } catch {
          B[Q] = null;
        }
      }
    })
  ), B;
}
const xg = /* @__PURE__ */ new Map();
async function Zw(A, I, g, B, C) {
  const Q = await Vw();
  let E = [], e;
  for (let s = 0; s < 3; s++) {
    const w = await ng(A, "getSignaturesForAddress", [I, Object.assign({ limit: 1e3 }, e ? { before: e } : {})]);
    if (E = E.concat(w || []), !w || w.length < 1e3) break;
    e = w[w.length - 1].signature;
  }
  const i = E.length ? E[E.length - 1].blockTime : null;
  let t = E.filter((s) => !s.err);
  t.length > 100 && (t = t.slice(0, 70).concat(t.slice(-30)));
  const n = await hE(t, 3, async (s) => {
    if (xg.has(s.signature)) return xg.get(s.signature);
    const w = await ng(A, "getTransaction", [s.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" }]);
    return w && xg.set(s.signature, w), w;
  }), a = [], o = {};
  n.forEach((s) => {
    if (!s || !s.transaction) return;
    const w = s.transaction.message.instructions || [], d = {};
    (s.meta && s.meta.innerInstructions || []).forEach((r) => d[r.index] = r.instructions || []), w.forEach((r, D) => {
      const h = [r].concat(d[D] || []);
      let R = null;
      h.forEach((G) => {
        if (G.programId === Tw && G.data && Array.isArray(G.accounts)) {
          const x = Q[Array.from(qw(G.data).slice(0, 8)).join(",")];
          R = G.accounts.indexOf(I) >= 0 ? { kind: x || "unk", ai: 0, bi: 0, ao: 0, bo: 0 } : null, R && R.kind !== "rew" && a.push(R);
          return;
        }
        if (!R || !Hw[G.programId] || !G.parsed) return;
        const m = G.parsed.type;
        if (m !== "transfer" && m !== "transferChecked") return;
        const Y = G.parsed.info || {}, T = Number(Y.amount || Y.tokenAmount && Y.tokenAmount.amount || 0);
        if (R.kind === "rew") {
          const x = C[Y.source];
          x && (o[x] = (o[x] || 0) + T);
          return;
        }
        Y.destination === g ? R.ai += T : Y.source === g ? R.ao += T : Y.destination === B ? R.bi += T : Y.source === B && (R.bo += T);
      });
    });
  });
  const c = [];
  return a.forEach((s) => {
    let w = s.kind;
    w === "unk" && (w = s.ai + s.bi > 0 ? "inc" : s.ao + s.bo > 0 ? "dec" : null), w && (w === "inc" ? c.push({ kind: w, a: s.ai, b: s.bi }) : c.push({ kind: w, a: s.ao, b: s.bo }));
  }), { opened: i, events: c, rewards: o, txCount: E.length };
}
async function yE(A) {
  const I = {};
  try {
    const B = await (await fetch("https://lite-api.jup.ag/price/v3?ids=" + A.join(","))).json();
    A.forEach((C) => {
      const Q = B && B[C] && B[C].usdPrice;
      Q > 0 && (I[C] = +Q);
    });
  } catch {
  }
  return I;
}
function Ww(A) {
  if (!(A > 0)) return "—";
  const I = Math.floor(A / 86400), g = Math.floor(A % 86400 / 3600), B = Math.floor(A % 3600 / 60);
  return I ? I + "d " + g + "h" : g ? g + "h " + B + "m" : Math.max(1, B) + "m";
}
const gB = {};
async function jw(A) {
  const I = (A.pools || []).filter((Q) => gB[Q] != null);
  if (!I.length) return {};
  const g = SA(A.rpc), B = await SB(g, I.map((Q) => u(Q))), C = {};
  return B.forEach((Q) => {
    const E = Number(Q.data.sqrtPrice) / 18446744073709552e3;
    C[String(Q.address)] = E * E * gB[String(Q.address)];
  }), C;
}
function mC(A) {
  return A = String(A), A.slice(0, 4) + "…" + A.slice(-4);
}
async function zw(A) {
  const I = SA(A.rpc), g = await cw(I, u(A.owner)), B = [];
  if (g.forEach((r) => {
    r.isPositionBundle ? (r.positions || []).forEach((D) => B.push(D)) : B.push(r);
  }), !B.length) return [];
  const C = Array.from(new Set(B.map((r) => String(r.data.whirlpool)))), Q = await SB(I, C.map((r) => u(r))), E = {};
  Q.forEach((r) => E[String(r.address)] = r.data);
  const e = Array.from(new Set(Q.flatMap((r) => [String(r.data.tokenMintA), String(r.data.tokenMintB)]))), i = {}, t = (await I.getMultipleAccounts(e.map((r) => u(r)), { encoding: "jsonParsed" }).send()).value;
  e.forEach((r, D) => {
    const h = t[D] && t[D].data && t[D].data.parsed && t[D].data.parsed.info;
    i[r] = h ? Number(h.decimals) : 6;
  });
  const n = {};
  await Promise.all(C.map(async (r) => n[r] = await Ow(r)));
  const a = /* @__PURE__ */ new Set();
  Q.forEach((r) => (r.data.rewardInfos || []).forEach((D) => {
    const h = String(D.mint);
    h !== "11111111111111111111111111111111" && a.add(h);
  }));
  const o = await yE(Array.from(new Set(e.concat(Array.from(a)))));
  if (Array.from(a).some((r) => i[r] == null)) {
    const r = Array.from(a).filter((h) => i[h] == null), D = (await I.getMultipleAccounts(r.map((h) => u(h)), { encoding: "jsonParsed" }).send()).value;
    r.forEach((h, R) => {
      const G = D[R] && D[R].data && D[R].data.parsed && D[R].data.parsed.info;
      i[h] = G ? Number(G.decimals) : 6;
    });
  }
  const c = DA(u(A.owner)), s = Date.now() / 1e3, d = (await hE(B, 2, async (r) => {
    const D = r.data, h = E[String(D.whirlpool)];
    if (!h) return null;
    const R = String(h.tokenMintA), G = String(h.tokenMintB), m = i[R], Y = i[G], T = n[String(D.whirlpool)] || {}, x = T.tokenA || {}, j = T.tokenB || {}, VA = x.symbol || rI[R] || mC(R), QA = j.symbol || rI[G] || mC(G), H = Math.pow(10, m - Y);
    gB[String(D.whirlpool)] = H;
    const F = Number(h.sqrtPrice) / 18446744073709552e3, gA = Math.pow(1.0001, D.tickLowerIndex / 2), EA = Math.pow(1.0001, D.tickUpperIndex / 2), eA = Number(D.liquidity);
    let K = 0, LA = 0;
    F <= gA ? K = eA * (1 / gA - 1 / EA) : F >= EA ? LA = eA * (EA - gA) : (K = eA * (1 / F - 1 / EA), LA = eA * (F - gA));
    const NE = K / Math.pow(10, m), SE = LA / Math.pow(10, Y), PI = F * F * H;
    let _A = o[R], wA = o[G];
    rI[G] && !wA && (wA = 1), rI[R] && !_A && (_A = 1), !_A && wA && (_A = wA * PI), !wA && _A && PI > 0 && (wA = _A / PI);
    const Ng = (q, nA) => _A && wA ? q / Math.pow(10, m) * _A + nA / Math.pow(10, Y) * wA : null, RI = Ng(K, LA);
    let kI = null, Sg = 0, fg = 0, pB = [];
    try {
      const q = await nE(I, u(String(D.positionMint)), { authority: c });
      Sg = Number(q.feesQuote.feeOwedA), fg = Number(q.feesQuote.feeOwedB), kI = Ng(Sg, fg), (h.rewardInfos || []).forEach((nA, tI) => {
        const ZA = q.rewardsQuote.rewards[tI], fA = String(nA.mint);
        if (!ZA || !(Number(ZA.rewardsOwed) > 0) || fA === "11111111111111111111111111111111") return;
        const bA = Number(ZA.rewardsOwed) / Math.pow(10, i[fA] || 6);
        pB.push({ mint: fA, amt: bA }), kI != null && o[fA] && (kI += bA * o[fA]);
      });
    } catch {
    }
    let $A = null;
    try {
      const q = {};
      (h.rewardInfos || []).forEach((nA) => q[String(nA.vault)] = String(nA.mint)), $A = await Zw(A.rpc, String(r.address), String(h.tokenVaultA), String(h.tokenVaultB), q);
    } catch {
    }
    let iI = null, YB = null, MI = null, LB = null, vI = null, bB = "—";
    if ($A) {
      $A.opened && (bB = Ww(s - $A.opened));
      let q = 0, nA = 0, tI = 0, ZA = 0, fA = 0, bA = 0;
      $A.events.forEach((X) => {
        if (X.kind === "fee") {
          fA += X.a, bA += X.b;
          return;
        }
        const oA = _w(X.a, X.b, gA, EA), RA = oA == null ? 0 : X.a * oA + X.b;
        X.kind === "inc" ? (q += RA, oA != null && RA > 0 && (ZA += oA * H * RA, tI += RA)) : nA += RA;
      }), tI > 0 && (LB = ZA / tI), wA && (iI = q / Math.pow(10, Y) * wA, YB = nA / Math.pow(10, Y) * wA), MI = Ng(fA, bA), MI != null && Object.keys($A.rewards).forEach((X) => {
        o[X] && (MI += $A.rewards[X] / Math.pow(10, i[X] || 6) * o[X]);
      }), iI > 0 && RI != null && (vI = RI + (YB || 0) + (MI || 0) + (kI || 0) - iI);
    }
    let GI = null, Rg = null;
    try {
      const q = T.stats || {}, nA = Number(h.liquidity);
      if (!(F > gA && F < EA))
        GI = { out: !0 }, Rg = 0;
      else if (RI > 0 && nA > 0) {
        const ZA = Number(h.feeRate) / 1e6, fA = eA / nA, bA = (oA) => oA ? ((+oA.volume || 0) * ZA + (+oA.rewards || 0)) * fA : null, X = { "5m": 1 / 12, "15m": 0.25, "30m": 0.5, "1h": 1, "4h": 4, "8h": 8, "24h": 24, "7d": 168, "30d": 720, "365d": 8760 };
        GI = {}, dE.forEach((oA) => {
          let RA = bA(q[oA]);
          if (RA == null) {
            const XI = q["30d"] ? ["30d", bA(q["30d"])] : q["24h"] ? ["24h", bA(q["24h"])] : null;
            XI && XI[1] != null && (RA = XI[1] * X[oA] / X[XI[0]]);
          }
          GI[oA] = RA == null ? null : RA / RI * 100;
        }), Rg = GI["24h"];
      }
    } catch {
    }
    return {
      pair: VA + "/" + QA,
      fee: h.feeRate != null ? String(Number(h.feeRate) / 1e4) : "",
      price: PI,
      lo: gA * gA * H,
      hi: EA * EA * H,
      usd: RI,
      amtA: NE,
      amtB: SE,
      symA: VA,
      symB: QA,
      dep: iI,
      pnl: vI,
      pnlPct: vI != null && iI > 0 ? vI / iI * 100 : null,
      harv: MI,
      pend: kI,
      pendA: Sg / Math.pow(10, m),
      pendB: fg / Math.pow(10, Y),
      pendRew: pB,
      est: GI,
      est24: Rg,
      entry: LB,
      dur: bB,
      mint: String(D.positionMint),
      pool: String(D.whirlpool),
      liq: String(D.liquidity),
      decA: m,
      decB: Y,
      mA: R,
      mB: G
    };
  })).filter(Boolean);
  try {
    const r = await Mw(I, A.owner, B.map((D) => ({ mint: String(D.data.positionMint), pos: String(D.address) })));
    d.forEach((D) => {
      D.auto = !!r[D.mint], D.autoNext = r[D.mint] ? r[D.mint].next : null;
    });
  } catch {
  }
  return d;
}
window.kzSdk = { ready: !0, version: "0.9.0", sendJson: mw, openPosition: Fw, swapAndOpen: Uw, positions: zw, closePosition: Yw, harvest: Kw, increase: Jw, decrease: pw, livePrices: jw, autoOn: Lw, autoOff: bw };
window.dispatchEvent(new Event("kzsdk"));
