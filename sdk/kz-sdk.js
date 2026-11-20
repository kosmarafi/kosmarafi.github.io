var TC = 6, qC = 10, OC = -32700, xC = -32603, VC = -32602, _C = -32601, ZC = -32600, WC = -32015, jC = -32014, XC = -32012, zC = -32010, vC = -32009, PC = -32007, $C = -32006, AQ = -32004, bg = -32002, IQ = -32001, gQ = 28e5, BQ = 2800001, CQ = 2800003, QQ = 2800006, EQ = 2800007, kB = 2800008, iQ = 2800009, eQ = 323e4, oQ = 32300001, tQ = 3230002, nQ = 361e4, rQ = 3610001, aQ = 3610002, sQ = 3610003, cQ = 3610004, DQ = 3610005, wQ = 4615e3, lQ = 4615026, NQ = 5508e3, hQ = 5663e3, Hg = 5663001, dQ = 5663004, RQ = 5663015, kQ = 5663016, yQ = 5663021, MQ = 705e4, uQ = 7050030, GQ = 7050031, SQ = 7050035, FQ = 8078e3, fQ = 8078001, UQ = 8078002, JQ = 8078004, YQ = 8078005, LQ = 8078006, mQ = 8078007, pQ = 8078008, KQ = 8078009, bQ = 8078010, HQ = 8078011, YI = 8078012, Tg = 8078013, TQ = 8078014, qQ = 8078017, OQ = 8078018, yB = 8078022, xQ = 81e5, VQ = 8100002, _Q = 8100003;
function MB(A) {
  return Array.isArray(A) ? "%5B" + A.map(MB).join(
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
function ZQ([A, I]) {
  return `${A}=${MB(I)}`;
}
function WQ(A) {
  const I = Object.entries(A).map(ZQ).join("&");
  return btoa(I);
}
function jQ(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${WQ(I)}'`), `${g}\``;
  }
}
function XQ(A, I) {
  return A instanceof Error && A.name === "SolanaError" ? A.context.__code === I : !1;
}
var w = class extends Error {
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
    const C = jQ(A, g);
    super(C, B), this.context = Object.freeze(
      g === void 0 ? {
        __code: A
      } : g
    ), this.name = "SolanaError";
  }
};
function wg(...A) {
  "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(...A);
}
function uB({ errorCodeBaseOffset: A, getErrorContext: I, orderedErrorNames: g, rpcEnumError: B }, C) {
  let Q, E;
  typeof B == "string" ? Q = B : (Q = Object.keys(B)[0], E = B[Q]);
  const i = g.indexOf(Q), e = A + i, o = I(e, Q, E), t = new w(e, o);
  return wg(t, C), t;
}
var zQ = [
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
function GB(A, I) {
  const g = Number(A);
  return uB(
    {
      errorCodeBaseOffset: 4615001,
      getErrorContext(B, C, Q) {
        return B === wQ ? {
          errorName: C,
          index: g,
          ...Q !== void 0 ? { instructionErrorContext: Q } : null
        } : B === lQ ? {
          code: Number(Q),
          index: g
        } : { index: g };
      },
      orderedErrorNames: zQ,
      rpcEnumError: I
    },
    GB
  );
}
var vQ = [
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
function SB(A) {
  return typeof A == "object" && "InstructionError" in A ? GB(
    ...A.InstructionError
  ) : uB(
    {
      errorCodeBaseOffset: 7050001,
      getErrorContext(I, g, B) {
        if (I === MQ)
          return {
            errorName: g,
            ...B !== void 0 ? { transactionErrorContext: B } : null
          };
        if (I === uQ)
          return {
            index: Number(B)
          };
        if (I === GQ || I === SQ)
          return {
            accountIndex: Number(B.account_index)
          };
      },
      orderedErrorNames: vQ,
      rpcEnumError: A
    },
    SB
  );
}
function eg(A) {
  let I;
  if (PQ(A)) {
    const { code: g, data: B, message: C } = A, Q = Number(g);
    if (Q === bg) {
      const { err: E, ...i } = B, e = E ? { cause: SB(E) } : null;
      I = new w(bg, {
        ...i,
        ...e
      });
    } else {
      let E;
      switch (Q) {
        case xC:
        case VC:
        case ZC:
        case _C:
        case OC:
        case XC:
        case IQ:
        case AQ:
        case jC:
        case zC:
        case vC:
        case PC:
        case $C:
        case WC:
          E = { __serverMessage: C };
          break;
        default:
          typeof B == "object" && !Array.isArray(B) && (E = B);
      }
      I = new w(Q, E);
    }
  } else {
    const g = typeof A == "object" && A !== null && "message" in A && typeof A.message == "string" ? A.message : "Malformed JSON-RPC error with no message attribute";
    I = new w(qC, { error: A, message: g });
  }
  return wg(I, eg), I;
}
function PQ(A) {
  return typeof A == "object" && A !== null && "code" in A && "message" in A && (typeof A.code == "number" || typeof A.code == "bigint") && typeof A.message == "string";
}
function $Q(A, I) {
  if (A.length >= I) return A;
  const g = new Uint8Array(I).fill(0);
  return g.set(A), g;
}
var AE = (A, I) => $Q(A.length <= I ? A : A.slice(0, I), I);
function FB(A, I, g) {
  const B = g === 0 && A.length === I.length ? A : A.slice(g, g + I.length);
  return fB(B, I);
}
function fB(A, I) {
  return A.length === I.length && A.every((g, B) => g === I[B]);
}
function fA(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function H(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(fA(I, A));
      return A.write(I, g, 0), g;
    }
  });
}
function AA(A) {
  return Object.freeze({
    ...A,
    decode: (I, g = 0) => A.read(I, g)[0]
  });
}
function b(A) {
  return "fixedSize" in A && typeof A.fixedSize == "number";
}
function UB(A) {
  if (!b(A))
    throw new w(UQ);
}
function IE(A) {
  return !b(A);
}
function gE(A, I) {
  if (b(A) !== b(I))
    throw new w(JQ);
  if (b(A) && b(I) && A.fixedSize !== I.fixedSize)
    throw new w(YQ, {
      decoderFixedSize: I.fixedSize,
      encoderFixedSize: A.fixedSize
    });
  if (!b(A) && !b(I) && A.maxSize !== I.maxSize)
    throw new w(LQ, {
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
function BE(A, I, g = 0) {
  if (I.length - g <= 0)
    throw new w(FQ, {
      codecDescription: A
    });
}
function lg(A, I, g, B = 0) {
  const C = g.length - B;
  if (C < I)
    throw new w(fQ, {
      bytesLength: C,
      codecDescription: A,
      expected: I
    });
}
function qg(A, I, g) {
  if (I < 0 || I > g)
    throw new w(TQ, {
      bytesLength: g,
      codecDescription: A,
      offset: I
    });
}
function CE(A, I) {
  const g = (E, i, e) => {
    const o = A.encode(E);
    return e = I.write(o.length, i, e), i.set(o, e), e + o.length;
  };
  if (b(I) && b(A))
    return H({ ...A, fixedSize: I.fixedSize + A.fixedSize, write: g });
  const B = b(I) ? I.fixedSize : I.maxSize ?? null, C = b(A) ? A.fixedSize : A.maxSize ?? null, Q = B !== null && C !== null ? B + C : null;
  return H({
    ...A,
    ...Q !== null ? { maxSize: Q } : {},
    getSizeFromValue: (E) => {
      const i = fA(E, A);
      return fA(i, I) + i;
    },
    write: g
  });
}
function F(A, I) {
  const g = (E, i) => {
    const [e, o] = I.read(E, i), t = Number(e);
    return i = o, (i > 0 || E.length > t) && (E = E.slice(i, i + t)), lg("addDecoderSizePrefix", t, E), [A.decode(E), i + t];
  };
  if (b(I) && b(A))
    return AA({ ...A, fixedSize: I.fixedSize + A.fixedSize, read: g });
  const B = b(I) ? I.fixedSize : I.maxSize ?? null, C = b(A) ? A.fixedSize : A.maxSize ?? null, Q = B !== null && C !== null ? B + C : null;
  return AA({ ...A, ...Q !== null ? { maxSize: Q } : {}, read: g });
}
function JB(A, I, g) {
  const B = A.byteOffset + (I ?? 0), C = g ?? A.byteLength;
  let Q;
  return typeof SharedArrayBuffer > "u" ? Q = A.buffer : A.buffer instanceof SharedArrayBuffer ? (Q = new ArrayBuffer(A.length), new Uint8Array(Q).set(new Uint8Array(A))) : Q = A.buffer, (B === 0 || B === -A.byteLength) && C === A.byteLength ? Q : Q.slice(B, B + C);
}
function oA(A, I) {
  return H({
    fixedSize: I,
    write: (g, B, C) => {
      const Q = A.encode(g), E = Q.length > I ? Q.slice(0, I) : Q;
      return B.set(E, C), C + I;
    }
  });
}
function eA(A, I) {
  return AA({
    fixedSize: I,
    read: (g, B) => {
      lg("fixCodecSize", I, g, B), (B > 0 || g.length > I) && (g = g.slice(B, B + I)), b(A) && (g = AE(g, A.fixedSize));
      const [C] = A.read(g, 0);
      return [C, B + I];
    }
  });
}
function QE(A, I) {
  return H({
    ...A,
    write: (g, B, C) => {
      const Q = (o) => EE(o, B.length), E = I.preOffset ? I.preOffset({ bytes: B, preOffset: C, wrapBytes: Q }) : C;
      qg("offsetEncoder", E, B.length);
      const i = A.write(g, B, E), e = I.postOffset ? I.postOffset({ bytes: B, newPreOffset: E, postOffset: i, preOffset: C, wrapBytes: Q }) : i;
      return qg("offsetEncoder", e, B.length), e;
    }
  });
}
function EE(A, I) {
  return I === 0 ? 0 : (A % I + I) % I;
}
function iE(A, I) {
  if (b(A)) {
    const g = I(A.fixedSize);
    if (g < 0)
      throw new w(Tg, {
        bytesLength: g,
        codecDescription: "resizeEncoder"
      });
    return H({ ...A, fixedSize: g });
  }
  return H({
    ...A,
    getSizeFromValue: (g) => {
      const B = I(A.getSizeFromValue(g));
      if (B < 0)
        throw new w(Tg, {
          bytesLength: B,
          codecDescription: "resizeEncoder"
        });
      return B;
    }
  });
}
function eE(A, I) {
  return QE(
    iE(A, (g) => g + I),
    { preOffset: ({ preOffset: g }) => g + I }
  );
}
function K(A, I) {
  return H({
    ...IE(A) ? { ...A, getSizeFromValue: (g) => A.getSizeFromValue(I(g)) } : A,
    write: (g, B, C) => A.write(I(g), B, C)
  });
}
function kA(A, I) {
  return AA({
    ...A,
    read: (g, B) => {
      const [C, Q] = A.read(g, B);
      return [I(C, g, B), Q];
    }
  });
}
function oE(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new w(YI, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var tE = (A) => H({
  getSizeFromValue: (I) => {
    const [g, B] = Og(I, A[0]);
    if (!B) return I.length;
    const C = xg(B, A);
    return g.length + Math.ceil(C.toString(16).length / 2);
  },
  write(I, g, B) {
    if (oE(A, I), I === "") return B;
    const [C, Q] = Og(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(C.length).fill(0), B), B + C.length;
    let E = xg(Q, A);
    const i = [];
    for (; E > 0n; )
      i.unshift(Number(E % 256n)), E /= 256n;
    const e = [...Array(C.length).fill(0), ...i];
    return g.set(e, B), B + e.length;
  }
}), nE = (A) => AA({
  read(I, g) {
    const B = g === 0 ? I : I.slice(g);
    if (B.length === 0) return ["", 0];
    let C = B.findIndex((e) => e !== 0);
    C = C === -1 ? B.length : C;
    const Q = A[0].repeat(C);
    if (C === B.length) return [Q, I.length];
    const E = B.slice(C).reduce((e, o) => e * 256n + BigInt(o), 0n), i = rE(E, A);
    return [Q + i, I.length];
  }
});
function Og(A, I) {
  const [g, B] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, B];
}
function xg(A, I) {
  const g = BigInt(I.length);
  let B = 0n;
  for (const C of A)
    B *= g, B += BigInt(I.indexOf(C));
  return B;
}
function rE(A, I) {
  const g = BigInt(I.length), B = [];
  for (; A > 0n; )
    B.unshift(I[Number(A % g)]), A /= g;
  return B.join("");
}
var YB = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", aE = () => tE(YB), sE = () => nE(YB), Vg = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", LB = () => H({
  getSizeFromValue: (A) => {
    try {
      return atob(A).length;
    } catch {
      throw new w(YI, {
        alphabet: Vg,
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
      throw new w(YI, {
        alphabet: Vg,
        base: 64,
        value: A
      });
    }
  }
}), cE = (A) => (
  // eslint-disable-next-line no-control-regex
  A.replace(/\u0000/g, "")
), DE = globalThis.TextDecoder, oI = () => {
  let A;
  return AA({
    read(I, g) {
      const B = (A ||= new DE()).decode(I.slice(g));
      return [cE(B), I.length];
    }
  });
}, wE = 128;
function yA(A, I) {
  try {
    return "exists" in A && !A.exists ? A : Object.freeze({ ...A, data: I.decode(A.data) });
  } catch {
    throw new w(tQ, {
      address: A.address
    });
  }
}
function mB(A, I) {
  if (!I) return Object.freeze({ address: A, exists: !1 });
  const g = LB().encode(I.data[0]);
  return Object.freeze({ ...lE(I), address: A, data: g, exists: !0 });
}
function lE(A) {
  return Object.freeze({
    executable: A.executable,
    lamports: A.lamports,
    programAddress: A.owner,
    space: A.space
  });
}
async function Ng(A, I, g = {}) {
  const { abortSignal: B, ...C } = g, Q = await A.getAccountInfo(I, { ...C, encoding: "base64" }).send({ abortSignal: B });
  return mB(I, Q.value);
}
async function II(A, I, g = {}) {
  const { abortSignal: B, ...C } = g;
  return (await A.getMultipleAccounts(I, { ...C, encoding: "base64" }).send({ abortSignal: B })).value.map((E, i) => mB(I[i], E));
}
function bI(A) {
  if (!A.exists)
    throw new w(eQ, { address: A.address });
}
function HI(A) {
  const I = A.filter((g) => !g.exists);
  if (I.length > 0) {
    const g = I.map((B) => B.address);
    throw new w(oQ, { addresses: g });
  }
}
function TI() {
  if (!globalThis.isSecureContext)
    throw new w(nQ);
}
var bA;
async function NE(A) {
  return bA === void 0 && (bA = new Promise((I) => {
    A.generateKey(
      "Ed25519",
      /* extractable */
      !1,
      ["sign", "verify"]
    ).then(() => {
      I(bA = !0);
    }).catch(() => {
      I(bA = !1);
    });
  })), typeof bA == "boolean" ? bA : await bA;
}
function hE() {
  if (TI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.digest != "function")
    throw new w(rQ);
}
async function dE() {
  if (TI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.generateKey != "function")
    throw new w(cQ);
  if (!await NE(globalThis.crypto.subtle))
    throw new w(aQ);
}
function RE() {
  if (TI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.exportKey != "function")
    throw new w(sQ);
}
function kE() {
  if (TI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.sign != "function")
    throw new w(DQ);
}
var vI, PI;
function hg() {
  return vI || (vI = aE()), vI;
}
function yE() {
  return PI || (PI = sE()), PI;
}
function ME(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    return !1;
  const I = hg();
  try {
    return I.encode(A).byteLength === 32;
  } catch {
    return !1;
  }
}
function uE(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    throw new w(BQ, {
      actualLength: A.length
    });
  const B = hg().encode(A).byteLength;
  if (B !== 32)
    throw new w(gQ, {
      actualLength: B
    });
}
function p(A) {
  return uE(A), A;
}
function sA() {
  return K(
    oA(hg(), 32),
    (A) => p(A)
  );
}
function h() {
  return eA(yE(), 32);
}
function GE() {
  return gE(sA(), h());
}
function dg() {
  return new Intl.Collator("en", {
    caseFirst: "lower",
    ignorePunctuation: !1,
    localeMatcher: "best fit",
    numeric: !1,
    sensitivity: "variant",
    usage: "sort"
  }).compare;
}
var SE = 37095705934669439343138083508754565189542113879843219016388785533085940283555n, gA = 57896044618658097711785492504343953926634992332820282019728792003956564819949n, _g = 19681161376707505956807079304988542015446066515923890162744021073123829784752n;
function aA(A) {
  const I = A % gA;
  return I >= 0n ? I : gA + I;
}
function hA(A, I) {
  let g = A;
  for (; I-- > 0n; )
    g *= g, g %= gA;
  return g;
}
function FE(A) {
  const g = A * A % gA * A % gA, B = hA(g, 2n) * g % gA, C = hA(B, 1n) * A % gA, Q = hA(C, 5n) * C % gA, E = hA(Q, 10n) * Q % gA, i = hA(E, 20n) * E % gA, e = hA(i, 40n) * i % gA, o = hA(e, 80n) * e % gA, t = hA(o, 80n) * e % gA, n = hA(t, 10n) * Q % gA;
  return hA(n, 2n) * A % gA;
}
function fE(A, I) {
  const g = aA(I * I * I), B = aA(g * g * I), C = FE(A * B);
  let Q = aA(A * g * C);
  const E = aA(I * Q * Q), i = Q, e = aA(Q * _g), o = E === A, t = E === aA(-A), n = E === aA(-A * _g);
  return o && (Q = i), (t || n) && (Q = e), (aA(Q) & 1n) === 1n && (Q = aA(-Q)), !o && !t ? null : Q;
}
function UE(A, I) {
  const g = aA(A * A), B = aA(g - 1n), C = aA(SE * g + 1n), Q = fE(B, C);
  if (Q === null)
    return !1;
  const E = (I & 128) !== 0;
  return !(Q === 0n && E);
}
function JE(A) {
  const I = A.toString(16);
  return I.length === 1 ? `0${I}` : I;
}
function YE(A) {
  const g = `0x${A.reduce((B, C, Q) => `${JE(Q === 31 ? C & -129 : C)}${B}`, "")}`;
  return BigInt(g);
}
function LE(A) {
  if (A.byteLength !== 32)
    return !1;
  const I = YE(A);
  return UE(I, A[31]);
}
var Zg = 32, Wg = 16, mE = [
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
async function pE({ programAddress: A, seeds: I }) {
  if (hE(), I.length > Wg)
    throw new w(QQ, {
      actual: I.length,
      maxSeeds: Wg
    });
  let g;
  const B = I.reduce((e, o, t) => {
    const n = typeof o == "string" ? (g ||= new TextEncoder()).encode(o) : o;
    if (n.byteLength > Zg)
      throw new w(EQ, {
        actual: n.byteLength,
        index: t,
        maxSeedLength: Zg
      });
    return e.push(...n), e;
  }, []), C = GE(), Q = C.encode(A), E = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array([...B, ...Q, ...mE])
  ), i = new Uint8Array(E);
  if (LE(i))
    throw new w(kB);
  return C.decode(i);
}
async function hI({
  programAddress: A,
  seeds: I
}) {
  let g = 255;
  for (; g > 0; )
    try {
      return [await pE({
        programAddress: A,
        seeds: [...I, new Uint8Array([g])]
      }), g];
    } catch (B) {
      if (XQ(B, kB))
        g--;
      else
        throw B;
    }
  throw new w(iQ);
}
async function pB(A) {
  if (RE(), A.type !== "public" || A.algorithm.name !== "Ed25519")
    throw new w(CQ);
  const I = await crypto.subtle.exportKey("raw", A);
  return h().decode(new Uint8Array(I));
}
function KB(A, I, g, B) {
  if (B < I || B > g)
    throw new w(HQ, {
      codecDescription: A,
      max: g,
      min: I,
      value: B
    });
}
function bB(A) {
  return A?.endian !== 1;
}
function dI(A) {
  return H({
    fixedSize: A.size,
    write(I, g, B) {
      A.range && KB(A.name, A.range[0], A.range[1], I);
      const C = new ArrayBuffer(A.size);
      return A.set(new DataView(C), I, bB(A.config)), g.set(new Uint8Array(C), B), B + A.size;
    }
  });
}
function MA(A) {
  return AA({
    fixedSize: A.size,
    read(I, g = 0) {
      BE(A.name, I, g), lg(A.name, A.size, I, g);
      const B = new DataView(JB(I, g, A.size));
      return [A.get(B, bB(A.config)), g + A.size];
    }
  });
}
var og = (A = {}) => MA({
  config: A,
  get: (I, g) => I.getFloat64(0, g),
  name: "f64",
  size: 8
}), HB = (A = {}) => MA({
  config: A,
  get: (I, g) => {
    const B = g ? 8 : 0, C = g ? 0 : 8, Q = I.getBigInt64(B, g), E = I.getBigUint64(C, g);
    return (Q << 64n) + E;
  },
  name: "i128",
  size: 16
}), jg = (A = {}) => MA({
  config: A,
  get: (I, g) => I.getInt16(0, g),
  name: "i16",
  size: 2
}), tg = (A = {}) => dI({
  config: A,
  name: "i32",
  range: [-+"0x7fffffff" - 1, +"0x7fffffff"],
  set: (I, g, B) => I.setInt32(0, Number(g), B),
  size: 4
}), cI = (A = {}) => MA({
  config: A,
  get: (I, g) => I.getInt32(0, g),
  name: "i32",
  size: 4
}), TA = () => H({
  getSizeFromValue: (A) => A <= 127 ? 1 : A <= 16383 ? 2 : 3,
  maxSize: 3,
  write: (A, I, g) => {
    KB("shortU16", 0, 65535, A);
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
}), ng = (A = {}) => dI({
  config: A,
  name: "u128",
  range: [0n, BigInt("0xffffffffffffffffffffffffffffffff")],
  set: (I, g, B) => {
    const C = B ? 8 : 0, Q = B ? 0 : 8, E = 0xffffffffffffffffn;
    I.setBigUint64(C, BigInt(g) >> 64n, B), I.setBigUint64(Q, BigInt(g) & E, B);
  },
  size: 16
}), Z = (A = {}) => MA({
  config: A,
  get: (I, g) => {
    const B = g ? 8 : 0, C = g ? 0 : 8, Q = I.getBigUint64(B, g), E = I.getBigUint64(C, g);
    return (Q << 64n) + E;
  },
  name: "u128",
  size: 16
}), f = (A = {}) => MA({
  config: A,
  get: (I, g) => I.getUint16(0, g),
  name: "u16",
  size: 2
}), TB = (A = {}) => dI({
  config: A,
  name: "u32",
  range: [0, +"0xffffffff"],
  set: (I, g, B) => I.setUint32(0, Number(g), B),
  size: 4
}), iA = (A = {}) => MA({
  config: A,
  get: (I, g) => I.getUint32(0, g),
  name: "u32",
  size: 4
}), XA = (A = {}) => dI({
  config: A,
  name: "u64",
  range: [0n, BigInt("0xffffffffffffffff")],
  set: (I, g, B) => I.setBigUint64(0, BigInt(g), B),
  size: 8
}), U = (A = {}) => MA({
  config: A,
  get: (I, g) => I.getBigUint64(0, g),
  name: "u64",
  size: 8
}), CA = () => dI({
  name: "u8",
  range: [0, +"0xff"],
  set: (A, I) => A.setUint8(0, Number(I)),
  size: 1
}), OA = () => MA({
  get: (A) => A.getUint8(0),
  name: "u8",
  size: 1
});
function qB(A, I, g) {
  if (I !== g)
    throw new w(mQ, {
      actual: g,
      codecDescription: A,
      expected: I
    });
}
function KE(A) {
  return A.reduce(
    (I, g) => I === null || g === null ? null : Math.max(I, g),
    0
  );
}
function UA(A) {
  return A.reduce((I, g) => I === null || g === null ? null : I + g, 0);
}
function gI(A) {
  return b(A) ? A.fixedSize : null;
}
function xA(A) {
  return b(A) ? A.fixedSize : A.maxSize ?? null;
}
function qA(A, I = {}) {
  const g = I.size ?? TB(), B = LI(g, gI(A)), C = LI(g, xA(A)) ?? void 0;
  return H({
    ...B !== null ? { fixedSize: B } : {
      getSizeFromValue: (Q) => (typeof g == "object" ? fA(Q.length, g) : 0) + [...Q].reduce((i, e) => i + fA(e, A), 0),
      maxSize: C
    },
    write: (Q, E, i) => (typeof g == "number" && qB("array", g, Q.length), typeof g == "object" && (i = g.write(Q.length, E, i)), Q.forEach((e) => {
      i = A.write(e, E, i);
    }), i)
  });
}
function JA(A, I = {}) {
  const g = I.size ?? iA(), B = gI(A), C = LI(g, B), Q = LI(g, xA(A)) ?? void 0;
  return AA({
    ...C !== null ? { fixedSize: C } : { maxSize: Q },
    read: (E, i) => {
      const e = [];
      if (typeof g == "object" && E.slice(i).length === 0)
        return [e, i];
      if (g === "remainder") {
        for (; i < E.length; ) {
          const [n, r] = A.read(E, i);
          i = r, e.push(n);
        }
        return [e, i];
      }
      const [o, t] = typeof g == "number" ? [g, i] : g.read(E, i);
      i = t;
      for (let n = 0; n < o; n += 1) {
        const [r, l] = A.read(E, i);
        i = l, e.push(r);
      }
      return [e, i];
    }
  });
}
function LI(A, I) {
  return typeof A != "number" ? null : A === 0 ? 0 : I === null ? null : I * A;
}
function Rg(A = {}) {
  return K(A.size ?? CA(), (I) => I ? 1 : 0);
}
function EA(A = {}) {
  return kA(A.size ?? OA(), (I) => Number(I) === 1);
}
function cA() {
  return H({
    getSizeFromValue: (A) => A.length,
    write: (A, I, g) => (I.set(A, g), g + A.length)
  });
}
function NA() {
  return AA({
    read: (A, I) => {
      const g = A.slice(I);
      return [g, I + g.length];
    }
  });
}
var bE = () => AA({
  read(A, I) {
    return [A.slice(I).reduce((B, C) => B + C.toString(16).padStart(2, "0"), ""), A.length];
  }
});
function OB(A) {
  return H({
    fixedSize: A.length,
    write: (I, g, B) => (g.set(A, B), B + A.length)
  });
}
function xB(A) {
  return AA({
    fixedSize: A.length,
    read: (I, g) => {
      const B = bE();
      if (!FB(I, A, g))
        throw new w(OQ, {
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
function rg(A) {
  const I = UA(A.map(gI)), g = UA(A.map(xA)) ?? void 0;
  return H({
    ...I === null ? {
      getSizeFromValue: (B) => A.map((C, Q) => fA(B[Q], C)).reduce((C, Q) => C + Q, 0),
      maxSize: g
    } : { fixedSize: I },
    write: (B, C, Q) => (qB("tuple", A.length, B.length), A.forEach((E, i) => {
      Q = E.write(B[i], C, Q);
    }), Q)
  });
}
function zA(A) {
  const I = UA(A.map(gI)), g = UA(A.map(xA)) ?? void 0;
  return AA({
    ...I === null ? { maxSize: g } : { fixedSize: I },
    read: (B, C) => {
      const Q = [];
      return A.forEach((E) => {
        const [i, e] = E.read(B, C);
        Q.push(i), C = e;
      }), [Q, C];
    }
  });
}
function kg(A, I) {
  const g = _B(A), B = (Q, E, i) => {
    const e = I(Q);
    return ag(A, e), A[e].write(Q, E, i);
  };
  if (g !== null)
    return H({ fixedSize: g, write: B });
  const C = ZB(A);
  return H({
    ...C !== null ? { maxSize: C } : {},
    getSizeFromValue: (Q) => {
      const E = I(Q);
      return ag(A, E), fA(Q, A[E]);
    },
    write: B
  });
}
function VB(A, I) {
  const g = _B(A), B = (Q, E) => {
    const i = I(Q, E);
    return ag(A, i), A[i].read(Q, E);
  };
  if (g !== null)
    return AA({ fixedSize: g, read: B });
  const C = ZB(A);
  return AA({ ...C !== null ? { maxSize: C } : {}, read: B });
}
function ag(A, I) {
  if (typeof A[I] > "u")
    throw new w(qQ, {
      maxRange: A.length - 1,
      minRange: 0,
      variant: I
    });
}
function _B(A) {
  if (A.length === 0) return 0;
  if (!b(A[0])) return null;
  const I = A[0].fixedSize;
  return A.every((B) => b(B) && B.fixedSize === I) ? I : null;
}
function ZB(A) {
  return KE(A.map((I) => xA(I)));
}
function HE(A, I = {}) {
  const g = I.discriminator ?? "__kind", B = I.size ?? CA();
  return kg(
    A.map(
      ([, C], Q) => K(rg([B, C]), (E) => [Q, E])
    ),
    (C) => TE(A, C[g])
  );
}
function WB(A, I = {}) {
  const g = I.discriminator ?? "__kind", B = I.size ?? OA();
  return VB(
    A.map(
      ([C, Q]) => kA(zA([B, Q]), ([, E]) => ({
        [g]: C,
        ...E
      }))
    ),
    (C, Q) => Number(B.read(C, Q)[0])
  );
}
function TE(A, I) {
  const g = A.findIndex(([B]) => I === B);
  if (g < 0)
    throw new w(KQ, {
      value: I,
      variants: A.map(([B]) => B)
    });
  return g;
}
function jB(A) {
  const I = [...new Set(Object.values(A).filter((E) => typeof E == "number"))].sort(), g = Object.fromEntries(Object.entries(A).slice(I.length)), B = Object.keys(g), C = Object.values(g), Q = [
    .../* @__PURE__ */ new Set([...B, ...C.filter((E) => typeof E == "string")])
  ];
  return { enumKeys: B, enumRecord: g, enumValues: C, numericalValues: I, stringValues: Q };
}
function qE({
  enumKeys: A,
  enumValues: I,
  variant: g
}) {
  const B = XB(I, (C) => C === g);
  return B >= 0 ? B : A.findIndex((C) => C === g);
}
function OE({
  discriminator: A,
  enumKeys: I,
  enumValues: g,
  useValuesAsDiscriminators: B
}) {
  return B ? XB(g, (C) => C === A) : A >= 0 && A < I.length ? A : -1;
}
function XB(A, I) {
  let g = A.length;
  for (; g--; )
    if (I(A[g], g, A)) return g;
  return -1;
}
function zB(A) {
  if (A.length === 0) return "";
  let I = [A[0], A[0]];
  const g = [];
  for (let B = 1; B < A.length; B++) {
    const C = A[B];
    I[1] + 1 === C ? I[1] = C : (g.push(I[0] === I[1] ? `${I[0]}` : `${I[0]}-${I[1]}`), I = [C, C]);
  }
  return g.push(I[0] === I[1] ? `${I[0]}` : `${I[0]}-${I[1]}`), g.join(", ");
}
function xE(A, I = {}) {
  const g = I.size ?? CA(), B = I.useValuesAsDiscriminators ?? !1, { enumKeys: C, enumValues: Q, numericalValues: E, stringValues: i } = jB(A);
  if (B && Q.some((e) => typeof e == "string"))
    throw new w(yB, {
      stringValues: Q.filter((e) => typeof e == "string")
    });
  return K(g, (e) => {
    const o = qE({ enumKeys: C, enumValues: Q, variant: e });
    if (o < 0)
      throw new w(bQ, {
        formattedNumericalValues: zB(E),
        numericalValues: E,
        stringValues: i,
        variant: e
      });
    return B ? Q[o] : o;
  });
}
function vB(A, I = {}) {
  const g = I.size ?? OA(), B = I.useValuesAsDiscriminators ?? !1, { enumKeys: C, enumValues: Q, numericalValues: E } = jB(A);
  if (B && Q.some((i) => typeof i == "string"))
    throw new w(yB, {
      stringValues: Q.filter((i) => typeof i == "string")
    });
  return kA(g, (i) => {
    const e = Number(i), o = OE({
      discriminator: e,
      enumKeys: C,
      enumValues: Q,
      useValuesAsDiscriminators: B
    });
    if (o < 0) {
      const t = B ? E : [...Array(C.length).keys()];
      throw new w(pQ, {
        discriminator: e,
        formattedValidDiscriminators: zB(t),
        validDiscriminators: t
      });
    }
    return Q[o];
  });
}
function VE(A, I) {
  return kA(
    zA([...I, A]),
    (g) => g[g.length - 1]
  );
}
function _E(A, I, g = {}) {
  return kA(
    JA(zA([A, I]), g),
    (B) => new Map(B)
  );
}
function $I() {
  return H({
    fixedSize: 0,
    write: (A, I, g) => g
  });
}
function HA() {
  return AA({
    fixedSize: 0,
    read: (A, I) => [void 0, I]
  });
}
function T(A) {
  const I = A.map(([, C]) => C), g = UA(I.map(gI)), B = UA(I.map(xA)) ?? void 0;
  return H({
    ...g === null ? {
      getSizeFromValue: (C) => A.map(([Q, E]) => fA(C[Q], E)).reduce((Q, E) => Q + E, 0),
      maxSize: B
    } : { fixedSize: g },
    write: (C, Q, E) => (A.forEach(([i, e]) => {
      E = e.write(C[i], Q, E);
    }), E)
  });
}
function k(A) {
  const I = A.map(([, C]) => C), g = UA(I.map(gI)), B = UA(I.map(xA)) ?? void 0;
  return AA({
    ...g === null ? { maxSize: B } : { fixedSize: g },
    read: (C, Q) => {
      const E = {};
      return A.forEach(([i, e]) => {
        const [o, t] = e.read(C, Q);
        Q = t, E[i] = o;
      }), [E, Q];
    }
  });
}
var PB = (A) => ({ __option: "Some", value: A }), $B = () => ({ __option: "None" }), Xg = (A) => !!(A && typeof A == "object" && "__option" in A && (A.__option === "Some" && "value" in A || A.__option === "None")), zg = (A) => A.__option === "Some", ZE = (A) => A !== null ? PB(A) : $B();
function qI(A, I = {}) {
  const g = I.prefix === null ? K($I(), (C) => {
  }) : Rg({ size: I.prefix ?? CA() }), B = I.noneValue === "zeroes" ? (UB(A), oA($I(), A.fixedSize)) : I.noneValue ? OB(I.noneValue) : $I();
  return kg(
    [
      K(rg([g, B]), (C) => [
        !1,
        void 0
      ]),
      K(rg([g, A]), (C) => [
        !0,
        Xg(C) && zg(C) ? C.value : C
      ])
    ],
    (C) => {
      const Q = Xg(C) ? C : ZE(C);
      return Number(zg(Q));
    }
  );
}
function V(A, I = {}) {
  const g = I.prefix === null ? kA(HA(), () => !1) : EA({ size: I.prefix ?? OA() }), B = I.noneValue === "zeroes" ? (UB(A), eA(HA(), A.fixedSize)) : I.noneValue ? xB(I.noneValue) : HA();
  return VB(
    [
      kA(zA([g, B]), () => $B()),
      kA(zA([g, A]), ([, C]) => PB(C))
    ],
    (C, Q) => {
      if (I.prefix === null && !I.noneValue)
        return +(Q < C.length);
      if (I.prefix === null && I.noneValue != null) {
        const E = I.noneValue === "zeroes" ? new Uint8Array(B.fixedSize).fill(0) : I.noneValue;
        return FB(C, E, Q) ? 0 : 1;
      }
      return Number(g.read(C, Q)[0]);
    }
  );
}
function RI(A, ...I) {
  return I.reduce((g, B) => B(g), A);
}
var W = /* @__PURE__ */ ((A) => (A[A.WRITABLE_SIGNER = /* 3 */
3] = "WRITABLE_SIGNER", A[A.READONLY_SIGNER = /* 2 */
2] = "READONLY_SIGNER", A[A.WRITABLE = /* 1 */
1] = "WRITABLE", A[A.READONLY = /* 0 */
0] = "READONLY", A))(W || {}), WE = 2, jE = 1;
function vA(A) {
  return A >= 2;
}
function DI(A) {
  return (A & jE) !== 0;
}
function vg(A, I) {
  return A | I;
}
function OI(A) {
  return A | WE;
}
function XE(A) {
  return ME(A);
}
var zE = 18446744073709551615n, Ag;
function vE() {
  return Ag || (Ag = U()), Ag;
}
function PE(A) {
  if (A < 0 || A > zE)
    throw new w(TC);
}
function yg(A) {
  return PE(A), A;
}
function $E() {
  return Ai(vE());
}
function Ai(A) {
  return kA(
    A,
    (I) => yg(typeof I == "bigint" ? I : BigInt(I))
  );
}
function Ii(A) {
  return "lifetimeConstraint" in A && typeof A.lifetimeConstraint.blockhash == "string" && typeof A.lifetimeConstraint.lastValidBlockHeight == "bigint" && XE(A.lifetimeConstraint.blockhash);
}
function AC(A, I) {
  return "lifetimeConstraint" in I && I.lifetimeConstraint && "blockhash" in I.lifetimeConstraint && I.lifetimeConstraint.blockhash === A.blockhash && I.lifetimeConstraint.lastValidBlockHeight === A.lastValidBlockHeight ? I : Object.freeze({
    ...I,
    lifetimeConstraint: Object.freeze(A)
  });
}
function gi(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new w(YI, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var Bi = (A) => H({
  getSizeFromValue: (I) => {
    const [g, B] = Pg(I, A[0]);
    if (!B) return I.length;
    const C = $g(B, A);
    return g.length + Math.ceil(C.toString(16).length / 2);
  },
  write(I, g, B) {
    if (gi(A, I), I === "") return B;
    const [C, Q] = Pg(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(C.length).fill(0), B), B + C.length;
    let E = $g(Q, A);
    const i = [];
    for (; E > 0n; )
      i.unshift(Number(E % 256n)), E /= 256n;
    const e = [...Array(C.length).fill(0), ...i];
    return g.set(e, B), B + e.length;
  }
});
function Pg(A, I) {
  const [g, B] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, B];
}
function $g(A, I) {
  const g = BigInt(I.length);
  let B = 0n;
  for (const C of A)
    B *= g, B += BigInt(I.indexOf(C));
  return B;
}
var Ci = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Qi = () => Bi(Ci), Ig;
function Ei() {
  if (!Ig) {
    const A = qA(CA(), { size: TA() });
    Ig = T([
      ["lookupTableAddress", sA()],
      ["writableIndexes", A],
      ["readonlyIndexes", A]
    ]);
  }
  return Ig;
}
var gg;
function Bg() {
  return gg || (gg = CA()), gg;
}
function ii() {
  return T([
    ["numSignerAccounts", Bg()],
    ["numReadonlySignerAccounts", Bg()],
    ["numReadonlyNonSignerAccounts", Bg()]
  ]);
}
var Cg;
function ei() {
  return Cg || (Cg = K(
    T([
      ["programAddressIndex", CA()],
      ["accountIndices", qA(CA(), { size: TA() })],
      ["data", CE(cA(), TA())]
    ]),
    // Convert an instruction to have all fields defined
    (A) => A.accountIndices !== void 0 && A.data !== void 0 ? A : {
      ...A,
      accountIndices: A.accountIndices ?? [],
      data: A.data ?? new Uint8Array(0)
    }
  )), Cg;
}
var oi = 0, ti = 128;
function ni() {
  return H({
    getSizeFromValue: (A) => A === "legacy" ? 0 : 1,
    maxSize: 1,
    write: (A, I, g) => {
      if (A === "legacy")
        return g;
      if (A < 0 || A > 127)
        throw new w(dQ, {
          actualVersion: A
        });
      if (A > oi)
        throw new w(yQ, {
          unsupportedVersion: A
        });
      return I.set([A | ti], g), g + 1;
    }
  });
}
function AB() {
  return T(IC());
}
function IB() {
  return K(
    T([
      ...IC(),
      ["addressTableLookups", ri()]
    ]),
    (A) => A.version === "legacy" ? A : {
      ...A,
      addressTableLookups: A.addressTableLookups ?? []
    }
  );
}
function IC() {
  const A = kg(
    [
      // Use a 32-byte constant encoder for a missing lifetime token (index 0).
      OB(new Uint8Array(32)),
      // Use a 32-byte base58 encoder for a valid lifetime token (index 1).
      oA(Qi(), 32)
    ],
    (I) => I === void 0 ? 0 : 1
  );
  return [
    ["version", ni()],
    ["header", ii()],
    ["staticAccounts", qA(sA(), { size: TA() })],
    ["lifetimeToken", A],
    ["instructions", qA(ei(), { size: TA() })]
  ];
}
function ri() {
  return qA(Ei(), { size: TA() });
}
function ai() {
  return H({
    getSizeFromValue: (A) => A.version === "legacy" ? AB().getSizeFromValue(A) : IB().getSizeFromValue(A),
    write: (A, I, g) => A.version === "legacy" ? AB().write(A, I, g) : IB().write(A, I, g)
  });
}
function gB(A, I, g) {
  A[I] = g(A[I] ?? { role: W.READONLY });
}
var _ = Symbol("AddressMapTypeProperty");
function si(A, I) {
  const g = {
    [A]: { [_]: 0, role: W.WRITABLE_SIGNER }
  }, B = /* @__PURE__ */ new Set();
  for (const C of I) {
    gB(g, C.programAddress, (E) => {
      if (B.add(C.programAddress), _ in E) {
        if (DI(E.role))
          switch (E[_]) {
            case 0:
              throw new w(hQ, {
                programAddress: C.programAddress
              });
            default:
              throw new w(Hg, {
                programAddress: C.programAddress
              });
          }
        if (E[_] === 2)
          return E;
      }
      return { [_]: 2, role: W.READONLY };
    });
    let Q;
    if (C.accounts)
      for (const E of C.accounts)
        gB(g, E.address, (i) => {
          const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            address: e,
            ...o
          } = E;
          if (_ in i)
            switch (i[_]) {
              case 0:
                return i;
              case 1: {
                const t = vg(i.role, o.role);
                if ("lookupTableAddress" in o) {
                  if (
                    // Consider using the new LOOKUP_TABLE if its address is different...
                    i.lookupTableAddress !== o.lookupTableAddress && // ...and sorts before the existing one.
                    (Q ||= dg())(
                      o.lookupTableAddress,
                      i.lookupTableAddress
                    ) < 0
                  )
                    return {
                      [_]: 1,
                      ...o,
                      role: t
                    };
                } else if (vA(o.role))
                  return {
                    [_]: 2,
                    role: t
                  };
                return i.role !== t ? {
                  ...i,
                  role: t
                } : i;
              }
              case 2: {
                const t = vg(i.role, o.role);
                if (
                  // Check to see if this address represents a program that is invoked
                  // in this transaction.
                  B.has(E.address)
                ) {
                  if (DI(o.role))
                    throw new w(
                      Hg,
                      {
                        programAddress: E.address
                      }
                    );
                  return i.role !== t ? {
                    ...i,
                    role: t
                  } : i;
                } else return "lookupTableAddress" in o && // Static accounts can be 'upgraded' to lookup table accounts as
                // long as they are not require to sign the transaction.
                !vA(i.role) ? {
                  ...o,
                  [_]: 1,
                  role: t
                } : i.role !== t ? {
                  ...i,
                  role: t
                } : i;
              }
            }
          return "lookupTableAddress" in o ? {
            ...o,
            [_]: 1
            /* LOOKUP_TABLE */
          } : {
            ...o,
            [_]: 2
            /* STATIC */
          };
        });
  }
  return g;
}
function ci(A) {
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
    const i = vA(C.role);
    if (i !== vA(E.role))
      return i ? -1 : 1;
    const e = DI(C.role);
    return e !== DI(E.role) ? e ? -1 : 1 : (I ||= dg(), C[_] === 1 && E[_] === 1 && C.lookupTableAddress !== E.lookupTableAddress ? I(C.lookupTableAddress, E.lookupTableAddress) : I(B, Q));
  }).map(([B, C]) => ({
    address: B,
    ...C
  }));
}
function Di(A) {
  const I = {};
  for (const g of A) {
    if (!("lookupTableAddress" in g))
      continue;
    const B = I[g.lookupTableAddress] ||= {
      readonlyIndexes: [],
      writableIndexes: []
    };
    g.role === W.WRITABLE ? B.writableIndexes.push(g.addressIndex) : B.readonlyIndexes.push(g.addressIndex);
  }
  return Object.keys(I).sort(dg()).map((g) => ({
    lookupTableAddress: g,
    ...I[g]
  }));
}
function wi(A) {
  let I = 0, g = 0, B = 0;
  for (const C of A) {
    if ("lookupTableAddress" in C)
      break;
    const Q = DI(C.role);
    vA(C.role) ? (B++, Q || g++) : Q || I++;
  }
  return {
    numReadonlyNonSignerAccounts: I,
    numReadonlySignerAccounts: g,
    numSignerAccounts: B
  };
}
function li(A) {
  const I = {};
  for (const [g, B] of A.entries())
    I[B.address] = g;
  return I;
}
function Ni(A, I) {
  const g = li(I);
  return A.map(({ accounts: B, data: C, programAddress: Q }) => ({
    programAddressIndex: g[Q],
    ...B ? { accountIndices: B.map(({ address: E }) => g[E]) } : null,
    ...C ? { data: C } : null
  }));
}
function hi(A) {
  return "nonce" in A ? A.nonce : A.blockhash;
}
function di(A) {
  const I = A.findIndex((B) => "lookupTableAddress" in B);
  return (I === -1 ? A : A.slice(0, I)).map(({ address: B }) => B);
}
function Ri(A) {
  const I = si(
    A.feePayer.address,
    A.instructions
  ), g = ci(I), B = A.lifetimeConstraint;
  return {
    ...A.version !== "legacy" ? { addressTableLookups: Di(g) } : null,
    ...B ? { lifetimeToken: hi(B) } : null,
    header: wi(g),
    instructions: Ni(A.instructions, g),
    staticAccounts: di(g),
    version: A.version
  };
}
function gC(A) {
  return Object.freeze({
    instructions: Object.freeze([]),
    version: A.version
  });
}
var ki = "SysvarRecentB1ockHashes11111111111111111111", yi = "11111111111111111111111111111111";
function Mi(A) {
  return A.programAddress === yi && // Test for `AdvanceNonceAccount` instruction data
  A.data != null && ui(A.data) && // Test for exactly 3 accounts
  A.accounts?.length === 3 && // First account is nonce account address
  A.accounts[0].address != null && A.accounts[0].role === W.WRITABLE && // Second account is recent blockhashes sysvar
  A.accounts[1].address === ki && A.accounts[1].role === W.READONLY && // Third account is nonce authority account
  A.accounts[2].address != null && vA(A.accounts[2].role);
}
function ui(A) {
  return A.byteLength === 4 && A[0] === 4 && A[1] === 0 && A[2] === 0 && A[3] === 0;
}
function Gi(A) {
  return "lifetimeConstraint" in A && typeof A.lifetimeConstraint.nonce == "string" && A.instructions[0] != null && Mi(A.instructions[0]);
}
function BC(A, I) {
  return Object.freeze({
    ...I,
    instructions: Object.freeze([
      ...I.instructions,
      ...A
    ])
  });
}
var CC = (
  // Resist the temptation to convert this to a simple string; As of version 133.0.3, Firefox
  // requires the object form of `AlgorithmIdentifier` and will throw a `DOMException` otherwise.
  Object.freeze({ name: "Ed25519" })
);
async function QC(A, I) {
  kE();
  const g = await crypto.subtle.sign(CC, A, JB(I));
  return new Uint8Array(g);
}
async function Si() {
  return await dE(), await crypto.subtle.generateKey(
    /* algorithm */
    CC,
    // Native implementation status: https://github.com/WICG/webcrypto-secure-curves/issues/20
    /* extractable */
    !1,
    // Prevents the bytes of the private key from being visible to JS.
    /* allowed uses */
    ["sign", "verify"]
  );
}
function Fi(A) {
  const I = Object.values(A);
  if (I.length === 0)
    throw new w(kQ);
  return I.map((g) => g || new Uint8Array(64).fill(0));
}
function fi() {
  return K(
    qA(oA(cA(), 64), { size: TA() }),
    Fi
  );
}
function EC() {
  return T([
    ["signatures", fi()],
    ["messageBytes", cA()]
  ]);
}
function Ui(A) {
  const I = Ri(A), g = ai().encode(I), B = I.staticAccounts.slice(0, I.header.numSignerAccounts), C = {};
  for (const E of B)
    C[E] = null;
  let Q;
  return Ii(A) ? Q = {
    blockhash: A.lifetimeConstraint.blockhash,
    lastValidBlockHeight: A.lifetimeConstraint.lastValidBlockHeight
  } : Gi(A) && (Q = {
    nonce: A.lifetimeConstraint.nonce,
    nonceAccountAddress: A.instructions[0].accounts[0].address
  }), Object.freeze({
    ...Q ? { lifetimeConstraint: Q } : void 0,
    messageBytes: g,
    signatures: Object.freeze(C)
  });
}
async function Ji(A, I) {
  let g, B;
  if (await Promise.all(
    A.map(async (C) => {
      const Q = await pB(C.publicKey), E = I.signatures[Q];
      if (E === void 0) {
        B ||= /* @__PURE__ */ new Set(), B.add(Q);
        return;
      }
      if (B)
        return;
      const i = await QC(C.privateKey, I.messageBytes);
      E !== null && fB(i, E) || (g ||= {}, g[Q] = i);
    })
  ), B && B.size > 0) {
    const C = Object.keys(I.signatures);
    throw new w(RQ, {
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
function Yi(A) {
  return JSON.parse(Li(A), (I, g) => bi(g) ? Ki(g) : g);
}
function Li(A) {
  const I = [];
  let g = !1;
  for (let B = 0; B < A.length; B++) {
    let C = !1;
    if (A[B] === "\\" && (I.push(A[B++]), C = !C), A[B] === '"') {
      I.push(A[B]), C || (g = !g);
      continue;
    }
    if (!g) {
      const Q = mi(A, B);
      if (Q?.length) {
        B += Q.length - 1, Q.match(/\.|[eE]-/) ? I.push(Q) : I.push(pi(Q));
        continue;
      }
    }
    I.push(A[B]);
  }
  return I.join("");
}
function mi(A, I) {
  const g = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;
  if (!A[I]?.match(/[-\d]/))
    return null;
  const B = A.slice(I).match(g);
  return B ? B[0] : null;
}
function pi(A) {
  return `{"$n":"${A}"}`;
}
function Ki({ $n: A }) {
  if (A.match(/[eE]/)) {
    const [I, g] = A.split(/[eE]/);
    return BigInt(I) * BigInt(10) ** BigInt(g);
  }
  return BigInt(A);
}
function bi(A) {
  return !!A && typeof A == "object" && "$n" in A && typeof A.$n == "string";
}
var BB = 0n;
function Hi() {
  const A = BB;
  return BB++, A.toString();
}
function Ti(A) {
  return {
    id: Hi(),
    jsonrpc: "2.0",
    method: A.methodName,
    params: A.params
  };
}
function qi(A, I) {
  return xi(
    JSON.stringify(A, (g, B) => typeof B == "bigint" ? Oi(B) : B, I)
  );
}
function Oi(A) {
  return { $n: `${A}` };
}
function xi(A) {
  return A.replace(/\{\s*"\$n"\s*:\s*"(-?\d+)"\s*\}/g, "$1");
}
function Vi(A) {
  return _i(A);
}
function _i(A) {
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
            throw new w(_Q, {
              method: Q,
              params: C
            });
          const i = E(...C);
          return Zi(A, i);
        };
    }
  });
}
function Zi({ transport: A }, I) {
  return {
    async send(g) {
      return await I.execute({ signal: g?.abortSignal, transport: A });
    }
  };
}
function Wi(A) {
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
        const E = Object.freeze({ methodName: C, params: Q }), i = A?.requestTransformer ? A?.requestTransformer(E) : E;
        return Object.freeze({
          execute: async ({ signal: e, transport: o }) => {
            const t = Ti(i), n = await o({ payload: t, signal: e });
            return A?.responseTransformer ? A.responseTransformer(n, i) : n;
          }
        });
      };
    }
  });
}
function iC(A) {
  return A == null || typeof A != "object" || Array.isArray(A) ? !1 : "jsonrpc" in A && A.jsonrpc === "2.0" && "method" in A && typeof A.method == "string" && "params" in A;
}
function ji(A) {
  return typeof A == "bigint" ? (
    // FIXME(solana-labs/solana/issues/30341) Create a data type to represent u64 in the Solana
    // JSON RPC implementation so that we can throw away this entire patcher instead of unsafely
    // downcasting `bigints` to `numbers`.
    Number(A)
  ) : A;
}
var D = {};
function eC(A) {
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
function oC(A, I) {
  return (g) => {
    const B = eC(A);
    return Object.freeze({
      ...g,
      params: B(g.params, I)
    });
  };
}
function tC(A, I) {
  return (g) => eC(A)(g, I);
}
function Xi() {
  return oC([ji], { keyPath: [] });
}
function zi({
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
          ...i
        } = C;
        return Object.keys(i).length > 0 ? Q[g] = i : g === Q.length - 1 ? Q.length-- : Q[g] = void 0, Q;
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
function vi({
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
      params: zi({
        commitmentPropertyName: C === "sendTransaction" ? "preflightCommitment" : "commitment",
        optionsObjectPositionInParams: Q,
        overrideCommitment: A,
        params: B
      })
    });
  };
}
function Pi(A) {
  return (I, { keyPath: g }) => (typeof I == "bigint" && A && (I > Number.MAX_SAFE_INTEGER || I < -Number.MAX_SAFE_INTEGER) && A(g, I), I);
}
function $i(A) {
  return (I) => oC(
    [Pi((...B) => A(I, ...B))],
    { keyPath: [] }
  )(I);
}
var Ae = {
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
function Ie(A) {
  const I = A?.onIntegerOverflow;
  return (g) => RI(
    g,
    I ? $i(I) : (B) => B,
    Xi(),
    vi({
      defaultCommitment: A?.defaultCommitment,
      optionsObjectPositionByMethod: Ae
    })
  );
}
function nC(A) {
  return function(g, { keyPath: B }) {
    return typeof g == "number" && Number.isInteger(g) || typeof g == "bigint" ? ge(B, A) ? Number(g) : BigInt(g) : g;
  };
}
function ge(A, I) {
  return I.some((g) => {
    if (g.length !== A.length)
      return !1;
    for (let B = A.length - 1; B >= 0; B--) {
      const C = A[B], Q = g[B];
      if (Q !== C && (Q !== D || typeof C != "number"))
        return !1;
    }
    return !0;
  });
}
function Be(A) {
  return tC([nC(A)], { keyPath: [] });
}
function Ce() {
  return (A) => A.result;
}
var sg = [
  // parsed Token/Token22 token account
  ["data", "parsed", "info", "tokenAmount", "decimals"],
  ["data", "parsed", "info", "tokenAmount", "uiAmount"],
  ["data", "parsed", "info", "rentExemptReserve", "decimals"],
  ["data", "parsed", "info", "rentExemptReserve", "uiAmount"],
  ["data", "parsed", "info", "delegatedAmount", "decimals"],
  ["data", "parsed", "info", "delegatedAmount", "uiAmount"],
  ["data", "parsed", "info", "extensions", D, "state", "olderTransferFee", "transferFeeBasisPoints"],
  ["data", "parsed", "info", "extensions", D, "state", "newerTransferFee", "transferFeeBasisPoints"],
  ["data", "parsed", "info", "extensions", D, "state", "preUpdateAverageRate"],
  ["data", "parsed", "info", "extensions", D, "state", "currentRate"]
], rI = [
  ...sg,
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
  ["data", "parsed", "info", "votes", D, "confirmationCount"]
], fI = [
  ["index"],
  ["instructions", D, "accounts", D],
  ["instructions", D, "programIdIndex"],
  ["instructions", D, "stackHeight"]
], CB = [
  ["addressTableLookups", D, "writableIndexes", D],
  ["addressTableLookups", D, "readonlyIndexes", D],
  ["header", "numReadonlySignedAccounts"],
  ["header", "numReadonlyUnsignedAccounts"],
  ["header", "numRequiredSignatures"],
  ["instructions", D, "accounts", D],
  ["instructions", D, "programIdIndex"],
  ["instructions", D, "stackHeight"]
];
function Qe() {
  return [
    ["loadedAccountsDataSize"],
    ...rI.map((A) => ["accounts", D, ...A]),
    ...fI.map((A) => ["innerInstructions", D, ...A])
  ];
}
function Ee() {
  return (A, I) => {
    const g = A;
    if ("error" in g) {
      const { error: B } = g;
      if (B && typeof B == "object" && "code" in B && (B.code === -32002 || B.code === -32002n) && "data" in B && B.data) {
        const E = tC(
          [nC(Qe())],
          { keyPath: [] }
        )(B.data), i = { ...B, data: E };
        throw eg(i);
      }
      throw eg(g.error);
    }
    return g;
  };
}
function ie(A) {
  return (I, g) => {
    const B = g.methodName, C = A?.allowedNumericKeyPaths && B ? A.allowedNumericKeyPaths[B] : void 0;
    return RI(
      I,
      (Q) => Ee()(Q),
      (Q) => Ce()(Q),
      (Q) => Be(C ?? [])(Q)
    );
  };
}
function ee(A) {
  return Wi({
    requestTransformer: Ie(A),
    responseTransformer: ie({
      allowedNumericKeyPaths: oe()
    })
  });
}
var Qg;
function oe() {
  return Qg || (Qg = {
    getAccountInfo: rI.map((A) => ["value", ...A]),
    getBlock: [
      ["transactions", D, "meta", "preTokenBalances", D, "accountIndex"],
      [
        "transactions",
        D,
        "meta",
        "preTokenBalances",
        D,
        "uiTokenAmount",
        "decimals"
      ],
      ["transactions", D, "meta", "postTokenBalances", D, "accountIndex"],
      [
        "transactions",
        D,
        "meta",
        "postTokenBalances",
        D,
        "uiTokenAmount",
        "decimals"
      ],
      ["transactions", D, "meta", "rewards", D, "commission"],
      ...fI.map((A) => [
        "transactions",
        D,
        "meta",
        "innerInstructions",
        D,
        ...A
      ]),
      ...CB.map((A) => ["transactions", D, "transaction", "message", ...A]),
      ["rewards", D, "commission"]
    ],
    getClusterNodes: [
      [D, "featureSet"],
      [D, "shredVersion"]
    ],
    getInflationGovernor: [["initial"], ["foundation"], ["foundationTerm"], ["taper"], ["terminal"]],
    getInflationRate: [["foundation"], ["total"], ["validator"]],
    getInflationReward: [[D, "commission"]],
    getMultipleAccounts: rI.map((A) => ["value", D, ...A]),
    getProgramAccounts: rI.flatMap((A) => [
      ["value", D, "account", ...A],
      [D, "account", ...A]
    ]),
    getRecentPerformanceSamples: [[D, "samplePeriodSecs"]],
    getTokenAccountBalance: [
      ["value", "decimals"],
      ["value", "uiAmount"]
    ],
    getTokenAccountsByDelegate: sg.map((A) => [
      "value",
      D,
      "account",
      ...A
    ]),
    getTokenAccountsByOwner: sg.map((A) => [
      "value",
      D,
      "account",
      ...A
    ]),
    getTokenLargestAccounts: [
      ["value", D, "decimals"],
      ["value", D, "uiAmount"]
    ],
    getTokenSupply: [
      ["value", "decimals"],
      ["value", "uiAmount"]
    ],
    getTransaction: [
      ["meta", "preTokenBalances", D, "accountIndex"],
      ["meta", "preTokenBalances", D, "uiTokenAmount", "decimals"],
      ["meta", "postTokenBalances", D, "accountIndex"],
      ["meta", "postTokenBalances", D, "uiTokenAmount", "decimals"],
      ["meta", "rewards", D, "commission"],
      ...fI.map((A) => ["meta", "innerInstructions", D, ...A]),
      ...CB.map((A) => ["transaction", "message", ...A])
    ],
    getVersion: [["feature-set"]],
    getVoteAccounts: [
      ["current", D, "commission"],
      ["delinquent", D, "commission"]
    ],
    simulateTransaction: [
      ["value", "loadedAccountsDataSize"],
      ...rI.map((A) => ["value", "accounts", D, ...A]),
      ...fI.map((A) => ["value", "innerInstructions", D, ...A])
    ]
  }), Qg;
}
function te(A) {
  const I = {};
  for (const g in A)
    I[g.toLowerCase()] = A[g];
  return I;
}
function ne(A) {
  const { fromJson: I, headers: g, toJson: B, url: C } = A;
  let Q;
  const E = g && te(g);
  return async function({
    payload: e,
    signal: o
  }) {
    const t = B ? B(e) : JSON.stringify(e), n = {
      ...Q,
      body: t,
      headers: {
        ...E,
        // Keep these headers lowercase so they will override any user-supplied headers above.
        accept: "application/json",
        "content-length": t.length.toString(),
        "content-type": "application/json; charset=utf-8"
      },
      method: "POST",
      signal: o
    }, r = await fetch(C, n);
    if (!r.ok)
      throw new w(VQ, {
        headers: r.headers,
        message: r.statusText,
        statusCode: r.status
      });
    return I ? I(await r.text(), e) : await r.json();
  };
}
var re = [
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
function QB(A) {
  return iC(A) && re.includes(A.method);
}
function ae(A) {
  return ne({
    ...A,
    fromJson: (I, g) => QB(g) ? Yi(I) : JSON.parse(I),
    toJson: (I) => QB(I) ? qi(I) : JSON.stringify(I)
  });
}
var se = Object.prototype.toString, ce = Object.keys || function(A) {
  const I = [];
  for (const g in A)
    I.push(g);
  return I;
};
function aI(A, I) {
  let g, B, C, Q, E, i, e;
  if (A === !0)
    return "true";
  if (A === !1)
    return "false";
  switch (typeof A) {
    case "object":
      if (A === null)
        return null;
      if ("toJSON" in A && typeof A.toJSON == "function")
        return aI(A.toJSON(), I);
      if (e = se.call(A), e === "[object Array]") {
        for (C = "[", B = A.length - 1, g = 0; g < B; g++)
          C += aI(A[g], !0) + ",";
        return B > -1 && (C += aI(A[g], !0)), C + "]";
      } else if (e === "[object Object]") {
        for (Q = ce(A).sort(), B = Q.length, C = "", g = 0; g < B; )
          E = Q[g], i = aI(A[E], !1), i !== void 0 && (C && (C += ","), C += JSON.stringify(E) + ":" + i), g++;
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
function De(A) {
  const I = aI(A, !1);
  if (I !== void 0)
    return "" + I;
}
function rC(A, I, g) {
  let B = "";
  if (typeof I[0] == "number") {
    const E = I[0] + 1, i = E % 10, e = E % 100;
    i == 1 && e != 11 ? B = E + "st" : i == 2 && e != 12 ? B = E + "nd" : i == 3 && e != 13 ? B = E + "rd" : B = E + "th";
  } else
    B = `\`${I[0].toString()}\``;
  const C = I.length > 1 ? I.slice(1).map((E) => typeof E == "number" ? `[${E}]` : E).join(".") : void 0, Q = new w(xQ, {
    argumentLabel: B,
    keyPath: I,
    methodName: A,
    optionalPathLabel: C ? ` at path \`${C}\`` : "",
    value: g,
    ...C !== void 0 ? { path: C } : void 0
  });
  return wg(Q, rC), Q;
}
var we = {
  defaultCommitment: "confirmed",
  onIntegerOverflow(A, I, g) {
    throw rC(A.methodName, I, g);
  }
}, le = globalThis.AbortController, EB;
function iB() {
  return {};
}
function Ne(A, I) {
  let g;
  return async function(C) {
    const { payload: Q, signal: E } = C, i = I(Q);
    if (i === void 0)
      return await A(C);
    if (g || (queueMicrotask(() => {
      g = void 0;
    }), g = {}), g[i] == null) {
      const o = new le(), t = (async () => {
        try {
          return await A({
            ...C,
            signal: o.signal
          });
        } catch (n) {
          if (n === (EB ||= iB()))
            return;
          throw n;
        }
      })();
      g[i] = {
        abortController: o,
        numConsumers: 0,
        responsePromise: t
      };
    }
    const e = g[i];
    if (e.numConsumers++, E) {
      const o = e.responsePromise;
      return await new Promise((t, n) => {
        const r = (l) => {
          E.removeEventListener("abort", r), e.numConsumers -= 1, queueMicrotask(() => {
            e.numConsumers === 0 && e.abortController.abort(EB ||= iB());
          }), n(l.target.reason);
        };
        E.addEventListener("abort", r), o.then(t).catch(n).finally(() => {
          E.removeEventListener("abort", r);
        });
      });
    } else
      return await e.responsePromise;
  };
}
function he(A) {
  return iC(A) ? De([A.method, A.params]) : void 0;
}
function de(A) {
  const I = {};
  for (const g in A)
    I[g.toLowerCase()] = A[g];
  return I;
}
function Re(A) {
  return RI(
    ae({
      ...A,
      headers: {
        ...A.headers ? de(A.headers) : void 0,
        // Keep these headers lowercase so they will override any user-supplied headers above.
        "solana-client": "js/5.5.1"
      }
    }),
    (I) => Ne(I, he)
  );
}
function ke(A) {
  return Vi({
    api: ee(we),
    transport: A
  });
}
function Mg(A) {
  const I = {};
  return A.forEach((g) => {
    if (!I[g.address])
      I[g.address] = g;
    else if (I[g.address] !== g)
      throw new w(NQ, {
        address: g.address
      });
  }), Object.values(I);
}
function xI(A) {
  return "modifyAndSignTransactions" in A && typeof A.modifyAndSignTransactions == "function";
}
function wI(A) {
  return "signTransactions" in A && typeof A.signTransactions == "function";
}
function aC(A) {
  return "signAndSendTransactions" in A && typeof A.signAndSendTransactions == "function";
}
function BI(A) {
  return wI(A) || xI(A) || aC(A);
}
function ye(A) {
  return Mg(
    (A.accounts ?? []).flatMap((I) => "signer" in I ? I.signer : [])
  );
}
function Me(A) {
  return Mg([
    ...A.feePayer && BI(A.feePayer) ? [A.feePayer] : [],
    ...A.instructions.flatMap(ye)
  ]);
}
function sC(A, I) {
  Object.freeze(A);
  const g = { ...I, feePayer: A };
  return Object.freeze(g), g;
}
async function ue(A) {
  const I = await pB(A.publicKey);
  return Object.freeze({
    address: I,
    keyPair: A,
    signMessages: (B) => Promise.all(
      B.map(
        async (C) => Object.freeze({ [I]: await QC(A.privateKey, C.content) })
      )
    ),
    signTransactions: (B) => Promise.all(
      B.map(async (C) => {
        const Q = await Ji([A], C);
        return Object.freeze({ [I]: Q.signatures[I] });
      })
    )
  });
}
async function cC() {
  return await ue(await Si());
}
function CI(A) {
  return Object.freeze({
    address: A,
    signMessages: (g) => Promise.resolve(g.map(() => Object.freeze({}))),
    signTransactions: (g) => Promise.resolve(g.map(() => Object.freeze({})))
  });
}
async function DC(A, I) {
  const { partialSigners: g, modifyingSigners: B } = Ge(
    Mg(Me(A).filter(BI)),
    { identifySendingSigner: !1 }
  );
  return await fe(
    A,
    B,
    g,
    I
  );
}
function Ge(A, I = {}) {
  const B = I.identifySendingSigner ?? !0 ? Se(A) : null, C = A.filter(
    (i) => i !== B && (xI(i) || wI(i))
  ), Q = Fe(C), E = C.filter(wI).filter((i) => !Q.includes(i));
  return Object.freeze({ modifyingSigners: Q, partialSigners: E, sendingSigner: B });
}
function Se(A) {
  const I = A.filter(aC);
  if (I.length === 0) return null;
  const g = I.filter(
    (B) => !xI(B) && !wI(B)
  );
  return g.length > 0 ? g[0] : I[0];
}
function Fe(A) {
  const I = A.filter(xI);
  if (I.length === 0) return [];
  const g = I.filter((B) => !wI(B));
  return g.length > 0 ? g : [I[0]];
}
async function fe(A, I = [], g = [], B) {
  const C = Ui(A), Q = await I.reduce(
    async (i, e) => {
      const [o] = await e.modifyAndSignTransactions([await i], B);
      return Object.freeze(o);
    },
    Promise.resolve(C)
  ), E = await Promise.all(
    g.map(async (i) => {
      const [e] = await i.signTransactions([Q], B);
      return e;
    })
  );
  return Object.freeze({
    ...Q,
    signatures: Object.freeze(
      E.reduce((i, e) => ({ ...i, ...e }), Q.signatures ?? {})
    )
  });
}
var Ue = "11111111111111111111111111111111";
function Je(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function Ye(A, I) {
  return (g) => {
    if (!g.value)
      return;
    const B = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: Je(g.value),
      role: eB(g.value) ? OI(B) : B,
      ...eB(g.value) ? { signer: g.value } : {}
    });
  };
}
function eB(A) {
  return !!A && typeof A == "object" && "address" in A && BI(A);
}
var Le = 0;
function me() {
  return K(
    T([
      ["discriminator", TB()],
      ["lamports", XA()],
      ["space", XA()],
      ["programAddress", sA()]
    ]),
    (A) => ({ ...A, discriminator: Le })
  );
}
function pe(A, I) {
  const g = Ue, C = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    newAccount: { value: A.newAccount ?? null, isWritable: !0 }
  }, Q = { ...A }, E = [Number(Q.space) + wE].reduce(
    (e, o) => e + o,
    0
  ), i = Ye();
  return Object.freeze({
    accounts: [
      i(C.payer),
      i(C.newAccount)
    ],
    byteDelta: E,
    data: me().encode(
      Q
    ),
    programAddress: g
  });
}
var Ke = p(
  "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
), be = p(
  "2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ"
);
p(
  "FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR"
);
p(
  "iwhrLHdsgrvmnwU8GF2FSmyabSMjfHwFGJAX2ufJ3ZN"
);
p(
  "8pm8erUsaMpmZ47LttHAPgnDx7xGZUvxY4q47vTCs5Nj"
);
var He = {
  /** The mutable whirlpool program on Solana Mainnet, paired with its mainnet config account. */
  mainnet: {
    programId: Ke,
    configAddress: be
  }
}, YA = He.mainnet, wC = /* @__PURE__ */ ((A) => (A[A.TransferHookA = 0] = "TransferHookA", A[A.TransferHookB = 1] = "TransferHookB", A[A.TransferHookReward = 2] = "TransferHookReward", A[A.TransferHookInput = 3] = "TransferHookInput", A[A.TransferHookIntermediate = 4] = "TransferHookIntermediate", A[A.TransferHookOutput = 5] = "TransferHookOutput", A[A.SupplementalTickArrays = 6] = "SupplementalTickArrays", A[A.SupplementalTickArraysOne = 7] = "SupplementalTickArraysOne", A[A.SupplementalTickArraysTwo = 8] = "SupplementalTickArraysTwo", A[A.TransferHookDepositA = 9] = "TransferHookDepositA", A[A.TransferHookDepositB = 10] = "TransferHookDepositB", A[A.TransferHookWithdrawalA = 11] = "TransferHookWithdrawalA", A[A.TransferHookWithdrawalB = 12] = "TransferHookWithdrawalB", A))(wC || {});
function Te() {
  return xE(wC);
}
function qe() {
  return WB([
    ["Uninitialized", HA()],
    [
      "Initialized",
      k([
        ["fields", zA([Oe()])]
      ])
    ]
  ]);
}
function Oe() {
  return k([
    ["liquidityNet", HB()],
    ["liquidityGross", Z()],
    ["feeGrowthOutsideA", Z()],
    ["feeGrowthOutsideB", Z()],
    ["rewardGrowthsOutside", JA(Z(), { size: 3 })]
  ]);
}
function xe() {
  return HE([
    [
      "ByTokenAmounts",
      T([
        ["tokenMaxA", XA()],
        ["tokenMaxB", XA()],
        ["minSqrtPrice", ng()],
        ["maxSqrtPrice", ng()]
      ])
    ]
  ]);
}
function Ve(A, I) {
  return Array.isArray(I) ? { __kind: A, fields: I } : { __kind: A, ...I ?? {} };
}
function _e() {
  return k([
    ["growthInsideCheckpoint", Z()],
    ["amountOwed", U()]
  ]);
}
function VI() {
  return T([
    ["slices", qA(Ze())]
  ]);
}
function Ze() {
  return T([
    ["accountsType", Te()],
    ["length", CA()]
  ]);
}
function We() {
  return k([
    ["initialized", EA()],
    ["liquidityNet", HB()],
    ["liquidityGross", Z()],
    ["feeGrowthOutsideA", Z()],
    ["feeGrowthOutsideB", Z()],
    ["rewardGrowthsOutside", JA(Z(), { size: 3 })]
  ]);
}
function je() {
  return k([
    ["mint", h()],
    ["vault", h()],
    ["extension", eA(NA(), 32)],
    ["emissionsPerSecondX64", Z()],
    ["growthGlobalX64", Z()]
  ]);
}
var Xe = new Uint8Array([
  17,
  216,
  246,
  142,
  225,
  199,
  218,
  56
]);
function ze() {
  return k([
    ["discriminator", eA(NA(), 8)],
    ["startTickIndex", cI()],
    ["whirlpool", h()],
    ["tickBitmap", Z()],
    ["ticks", JA(qe(), { size: 88 })]
  ]);
}
function ve(A) {
  return yA(
    A,
    ze()
  );
}
var Pe = new Uint8Array([
  69,
  97,
  189,
  190,
  110,
  7,
  66,
  187
]);
function $e() {
  return k([
    ["discriminator", eA(NA(), 8)],
    ["startTickIndex", cI()],
    ["ticks", JA(We(), { size: 88 })],
    ["whirlpool", h()]
  ]);
}
function Ao(A) {
  return yA(
    A,
    $e()
  );
}
function Io() {
  return k([
    ["discriminator", eA(NA(), 8)],
    ["whirlpool", h()],
    ["positionMint", h()],
    ["liquidity", Z()],
    ["tickLowerIndex", cI()],
    ["tickUpperIndex", cI()],
    ["feeGrowthCheckpointA", Z()],
    ["feeOwedA", U()],
    ["feeGrowthCheckpointB", Z()],
    ["feeOwedB", U()],
    [
      "rewardInfos",
      JA(_e(), { size: 3 })
    ]
  ]);
}
function cg(A) {
  return yA(
    A,
    Io()
  );
}
async function lC(A, I, g) {
  const B = await go(A, I, g);
  return bI(B), B;
}
async function go(A, I, g) {
  const B = await Ng(A, I, g);
  return cg(B);
}
function Bo() {
  return k([
    ["discriminator", eA(NA(), 8)],
    ["positionBundleMint", h()],
    ["positionBitmap", eA(NA(), 32)]
  ]);
}
function Co(A) {
  return yA(
    A,
    Bo()
  );
}
function Qo() {
  return k([
    ["discriminator", eA(NA(), 8)],
    ["whirlpoolsConfig", h()],
    ["whirlpoolBump", eA(NA(), 1)],
    ["tickSpacing", f()],
    ["feeTierIndexSeed", eA(NA(), 2)],
    ["feeRate", f()],
    ["protocolFeeRate", f()],
    ["liquidity", Z()],
    ["sqrtPrice", Z()],
    ["tickCurrentIndex", cI()],
    ["protocolFeeOwedA", U()],
    ["protocolFeeOwedB", U()],
    ["tokenMintA", h()],
    ["tokenVaultA", h()],
    ["feeGrowthGlobalA", Z()],
    ["tokenMintB", h()],
    ["tokenVaultB", h()],
    ["feeGrowthGlobalB", Z()],
    ["rewardLastUpdatedTimestamp", U()],
    [
      "rewardInfos",
      JA(je(), { size: 3 })
    ]
  ]);
}
function NC(A) {
  return yA(
    A,
    Qo()
  );
}
async function ug(A, I, g) {
  const B = await Eo(A, I, g);
  return bI(B), B;
}
async function Eo(A, I, g) {
  const B = await Ng(A, I, g);
  return NC(B);
}
async function io(A, I, g) {
  const B = await eo(A, I, g);
  return HI(B), B;
}
async function eo(A, I, g) {
  return (await II(A, I, g)).map((C) => NC(C));
}
var uA = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";
function oo(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function GA(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const B = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: oo(g.value),
      role: oB(g.value) ? OI(B) : B,
      ...oB(g.value) ? { signer: g.value } : {}
    });
  };
}
function oB(A) {
  return !!A && typeof A == "object" && "address" in A && BI(A);
}
var to = new Uint8Array([
  123,
  134,
  81,
  0,
  49,
  68,
  98,
  98
]);
function no() {
  return K(
    T([["discriminator", oA(cA(), 8)]]),
    (A) => ({ ...A, discriminator: to })
  );
}
function ro(A, I) {
  const g = I?.programAddress ?? uA, C = {
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
  const Q = GA(g);
  return Object.freeze({
    accounts: [
      Q(C.positionAuthority),
      Q(C.receiver),
      Q(C.position),
      Q(C.positionMint),
      Q(C.positionTokenAccount),
      Q(C.tokenProgram)
    ],
    data: no().encode({}),
    programAddress: g
  });
}
var ao = new Uint8Array([1, 182, 135, 59, 155, 25, 99, 223]);
function so() {
  return K(
    T([["discriminator", oA(cA(), 8)]]),
    (A) => ({
      ...A,
      discriminator: ao
    })
  );
}
function co(A, I) {
  const g = I?.programAddress ?? uA, C = {
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
  const Q = GA(g);
  return Object.freeze({
    accounts: [
      Q(C.positionAuthority),
      Q(C.receiver),
      Q(C.position),
      Q(C.positionMint),
      Q(C.positionTokenAccount),
      Q(C.token2022Program)
    ],
    data: so().encode(
      {}
    ),
    programAddress: g
  });
}
var Do = new Uint8Array([
  207,
  117,
  95,
  191,
  229,
  180,
  226,
  15
]);
function wo() {
  return K(
    T([
      ["discriminator", oA(cA(), 8)],
      [
        "remainingAccountsInfo",
        qI(VI())
      ]
    ]),
    (A) => ({ ...A, discriminator: Do })
  );
}
function hC(A, I) {
  const g = I?.programAddress ?? uA, C = {
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
  const E = GA(g);
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
    data: wo().encode(
      Q
    ),
    programAddress: g
  });
}
var lo = new Uint8Array([
  177,
  107,
  37,
  180,
  160,
  19,
  49,
  209
]);
function No() {
  return K(
    T([
      ["discriminator", oA(cA(), 8)],
      ["rewardIndex", CA()],
      [
        "remainingAccountsInfo",
        qI(VI())
      ]
    ]),
    (A) => ({ ...A, discriminator: lo })
  );
}
function dC(A, I) {
  const g = I?.programAddress ?? uA, C = {
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
  const E = GA(g);
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
    data: No().encode(
      Q
    ),
    programAddress: g
  });
}
var ho = new Uint8Array([
  58,
  127,
  188,
  62,
  79,
  82,
  196,
  96
]);
function Ro() {
  return K(
    T([
      ["discriminator", oA(cA(), 8)],
      ["liquidityAmount", ng()],
      ["tokenMinA", XA()],
      ["tokenMinB", XA()],
      [
        "remainingAccountsInfo",
        qI(VI())
      ]
    ]),
    (A) => ({
      ...A,
      discriminator: ho
    })
  );
}
function ko(A, I) {
  const g = I?.programAddress ?? uA, C = {
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
  const E = GA(g);
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
    data: Ro().encode(
      Q
    ),
    programAddress: g
  });
}
var yo = new Uint8Array([239, 251, 9, 124, 210, 198, 53, 43]);
function Mo() {
  return K(
    T([
      ["discriminator", oA(cA(), 8)],
      ["method", xe()],
      [
        "remainingAccountsInfo",
        qI(VI())
      ]
    ]),
    (A) => ({
      ...A,
      discriminator: yo
    })
  );
}
function uo(A, I) {
  const g = I?.programAddress ?? uA, C = {
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
  const E = GA(g);
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
    data: Mo().encode(
      Q
    ),
    programAddress: g
  });
}
var Go = new Uint8Array([
  41,
  33,
  165,
  200,
  120,
  231,
  142,
  50
]);
function So() {
  return K(
    T([
      ["discriminator", oA(cA(), 8)],
      ["startTickIndex", tg()],
      ["idempotent", Rg()]
    ]),
    (A) => ({
      ...A,
      discriminator: Go
    })
  );
}
function tB(A, I) {
  const g = I?.programAddress ?? uA, C = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !1 },
    funder: { value: A.funder ?? null, isWritable: !0 },
    tickArray: { value: A.tickArray ?? null, isWritable: !0 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 }
  }, Q = { ...A };
  C.systemProgram.value || (C.systemProgram.value = "11111111111111111111111111111111");
  const E = GA(g);
  return Object.freeze({
    accounts: [
      E(C.whirlpool),
      E(C.funder),
      E(C.tickArray),
      E(C.systemProgram)
    ],
    data: So().encode(
      Q
    ),
    programAddress: g
  });
}
var Fo = new Uint8Array(
  [212, 47, 95, 92, 114, 102, 131, 250]
);
function fo() {
  return K(
    T([
      ["discriminator", oA(cA(), 8)],
      ["tickLowerIndex", tg()],
      ["tickUpperIndex", tg()],
      ["withTokenMetadataExtension", Rg()]
    ]),
    (A) => ({
      ...A,
      discriminator: Fo
    })
  );
}
function Uo(A, I) {
  const g = I?.programAddress ?? uA, C = {
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
  const E = GA(g);
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
    data: fo().encode(
      Q
    ),
    programAddress: g
  });
}
var Jo = new Uint8Array([
  154,
  230,
  250,
  13,
  236,
  209,
  75,
  223
]);
function Yo() {
  return K(
    T([["discriminator", oA(cA(), 8)]]),
    (A) => ({
      ...A,
      discriminator: Jo
    })
  );
}
function Lo(A, I) {
  const g = I?.programAddress ?? uA, C = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !0 },
    position: { value: A.position ?? null, isWritable: !0 },
    tickArrayLower: { value: A.tickArrayLower ?? null, isWritable: !1 },
    tickArrayUpper: { value: A.tickArrayUpper ?? null, isWritable: !1 }
  }, Q = GA(g);
  return Object.freeze({
    accounts: [
      Q(C.whirlpool),
      Q(C.position),
      Q(C.tickArrayLower),
      Q(C.tickArrayUpper)
    ],
    data: Yo().encode({}),
    programAddress: g
  });
}
var RC = U().decode(
  Pe
), mo = U().decode(
  Xe
);
function po(A) {
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
function nB(A) {
  if ("exists" in A && !A.exists)
    return A;
  const g = U().decode(
    A.data.discriminator.subarray(0, 8)
  ) === RC ? "Fixed" : "Dynamic";
  return {
    ...A,
    data: {
      __kind: g,
      ...A.data,
      ticks: A.data.ticks.map(po)
    }
  };
}
function Ko(A) {
  if ("exists" in A && !A.exists)
    return A;
  const I = U().decode(
    A.data.subarray(0, 8)
  );
  switch (I) {
    case RC:
      return nB(Ao(A));
    case mo:
      return nB(ve(A));
    default:
      throw new Error(`Unknown discriminator: ${I}`);
  }
}
async function kC(A, I, g) {
  const B = await yC(A, I, g);
  return HI(B), B;
}
async function yC(A, I, g) {
  return (await II(A, I, g)).map((C) => Ko(C));
}
async function _I(A, I = YA.programId) {
  return await hI({
    programAddress: I,
    seeds: ["position", sA().encode(A)]
  });
}
async function bo(A, I = YA.programId) {
  return await hI({
    programAddress: I,
    seeds: ["position_bundle", sA().encode(A)]
  });
}
async function Ho(A, I, g = YA.programId) {
  return await hI({
    programAddress: g,
    seeds: [
      "bundled_position",
      sA().encode(A),
      Buffer.from(I.toString())
    ]
  });
}
async function PA(A, I, g = YA.programId) {
  return await hI({
    programAddress: g,
    seeds: [
      "tick_array",
      sA().encode(A),
      `${I}`
    ]
  });
}
function rB() {
  return 148;
}
var To = "SysvarRent111111111111111111111111111111111";
async function qo(A, I, g) {
  return await Ng(A, I, g);
}
function Oo() {
  return k([
    ["lamportsPerByteYear", $E()],
    ["exemptionThreshold", og()],
    ["burnPercent", OA()]
  ]);
}
async function xo(A, I) {
  const g = await qo(A, To, I);
  return bI(g), yA(g, Oo()).data;
}
const Vo = "data:application/wasm;base64,AGFzbQEAAAABjAM0YAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gAX8AYAN/f38AYAABf2AFf39/f38AYAR/f39/AGADf35/AGAFf39/fn8AYAh/f39/f39/fwBgCH9+f39/f39/AGAEf39/fwF/YAV/fn5+fgBgBH9+fn8AYAN8f38Bf2ADf39/AXxgBX9/f39/AX9gAX4Bf2AIf35+fn5+fn8AYAZ/f39/f38Bf2AKf35/f39/f35/fwBgBn9+fn5+fgBgBn9/f39/fwBgAXwBf2ABfwF8YAJ+fgF/YAJ8fAF8YAh/fn9/f39+fwBgCX9/f39/fn9/fwBgB39/f39/f38AYAF8AXxgCX9/f39/f35+fgBgCH9+fn5+f39/AGADfn9/AX9gB39/f39/f38Bf2ADf35+AGADf35/AX9gAn9/AXxgAABgCX9+fn5+fn5/fwBgA39/fABgBX9/fX9/AGAEf31/fwBgBX9/fn9/AGAEf35/fwBgBX9/fH9/AGAEf3x/fwBgBH9/fn4AYAN8f38BfGAAAX4C1BoxKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmluZGdlbl9vYmplY3RfZHJvcF9yZWYABCguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fc3RyaW5nX25ldwAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMcX193YmluZGdlbl9iaWdpbnRfZ2V0X2FzX2k2NAABKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzEF9fd2JpbmRnZW5fdGhyb3cAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzEV9fd2JpbmRnZW5fbWVtb3J5AAYoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxVfX3diaW5kZ2VuX3N0cmluZ19nZXQAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX2dldF82N2IyYmE2MmZjMzBkZTEyAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxpfX3diZ19nZXRfYjliOTMwNDdmZTNjZjQ1YgAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMdX193YmdfbGVuZ3RoX2UyZDJhNDkxMzJjMWIyNTYAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JpbmRnZW5fb2JqZWN0X2Nsb25lX3JlZgADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMWX193YmluZGdlbl9pc19mdW5jdGlvbgADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3Xzc4ZmViMTA4YjY0NzI3MTMABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX25ldwAZKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMUX193YmluZGdlbl9pc19vYmplY3QAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JnX25leHRfMjVmZWFkZmMwOTEzZmVhOQADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMbX193YmdfbmV4dF82NTc0ZTFhOGE2MmQxMDU1AAMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxtfX3diZ19kb25lXzc2OWU1ZWRlNGIzMWM2N2IAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzHF9fd2JnX3ZhbHVlX2NkMWZmYTdiMWFiNzk0ZjEAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzH19fd2JnX2l0ZXJhdG9yXzlhMjRjODhkZjg2MGRjNjUABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JnX2NhbGxfNjcyYTRkMjE2MzRkNGEyNAAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3XzQwNWUyMmYzOTA1NzZjZTIABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX2dldAABKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMXX193YmluZGdlbl9pc191bmRlZmluZWQAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX3NldF8zNzgzNzAyM2YzZDc0MGU4AAUoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx5fX3diZ19pc0FycmF5X2ExZWFiN2UwZDA2NzM5MWIAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzLV9fd2JnX2luc3RhbmNlb2ZfQXJyYXlCdWZmZXJfZTE0NTg1NDMyZTM3MzdmYwADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMkX193YmdfaXNTYWZlSW50ZWdlcl8zNDNlMmJlZWVlY2UxYmIwAAMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx1fX3diZ19idWZmZXJfNjA5Y2MzZWVlNTFlZDE1OAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3X2ExMjAwMmE3ZjkxYzc1YmUAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX3NldF82NTU5NWJkZDg2OGIzMDA5AAUoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx1fX3diZ19sZW5ndGhfYTQ0NjE5M2RjMjJjMTJmOAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMsX193YmdfaW5zdGFuY2VvZl9VaW50OEFycmF5XzE3MTU2YmNmMTE4MDg2YTkAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGV9fd2JpbmRnZW5fanN2YWxfbG9vc2VfZXEAACguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFF9fd2JpbmRnZW5fYXNfbnVtYmVyABooLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxRfX3diaW5kZ2VuX2Vycm9yX25ldwAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmluZGdlbl9iaWdpbnRfZnJvbV9pNjQAEyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JpbmRnZW5fYmlnaW50X2Zyb21fdTY0ABMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxtfX3diaW5kZ2VuX2JpZ2ludF9mcm9tX3UxMjgAGyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzJF9fd2JnX2dldHdpdGhyZWZrZXlfMWRjMzYxYmQxMDA1M2JmZQAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMdX193YmdfU3RyaW5nX2VlY2M0YTExOTg3MTI3ZDYAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzJF9fd2JnX2dldHdpdGhyZWZrZXlfNjU1MGIyYzA5M2QyZWIxOAAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193Ymdfc2V0XzM4MDdkNWYwYmZjMjRhYTcABSguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzDl9fd2JpbmRnZW5fc2hyAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxNfX3diaW5kZ2VuX2pzdmFsX2VxAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcw1fX3diaW5kZ2VuX2luAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxRfX3diaW5kZ2VuX2lzX2JpZ2ludAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMTX193YmluZGdlbl9pc19hcnJheQADA+8C7QIDCAMBHB0BAQEBDgcKCx4AFAofBRUCCwEFAiAEFhYXAAIAAAICAgIDAAEBDwcBAgELDAwLDAwhIgABBSMFBQkAFCQBARgAAAEIJQEBAQEBAQEBAQEBAAAAAAAAAQAJFwUmAQUFCQEBAQcFAwMFAQEAAQEBCQEBBwEBAwEJAgEBAQEFAQEFAgAAAAIBAQEBAQgAAwEDDgAHBAAQAAMAAgIKCgcHGAEFAgECAgkCDw8JAicAAAAAAAAHBwQICAgRAAQEAgUBASgCAAECAQEFKQUAAQEAEg4FAAQEBAQEBAQEBAQEBAQEBAQBAQQEAAANAAAEAAEECAAAFSoEBysSLS8NAAAIAgAEAQMDAgUFBA0AAgQxAgIABwABAQEAAAAABQAAAAUBAAMDAwEFBQAEAAMDBRAREAADAAEAAAEAAgEAETIAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAAMDAAAAAAAAAAAGBgYGAwYGBgYGMwQFAXABbW0FAwEAEQYJAX8BQYCAwAALB5AQUAZtZW1vcnkCABpnZXRUaWNrQXJyYXlTdGFydFRpY2tJbmRleACIAxR0aWNrSW5kZXhUb1NxcnRQcmljZQCJAxRzcXJ0UHJpY2VUb1RpY2tJbmRleACXAxlnZXRJbml0aWFsaXphYmxlVGlja0luZGV4ALoCHWdldFByZXZJbml0aWFsaXphYmxlVGlja0luZGV4AIcCHWdldE5leHRJbml0aWFsaXphYmxlVGlja0luZGV4AJwCE2lzVGlja0luZGV4SW5Cb3VuZHMA1gITaXNUaWNrSW5pdGlhbGl6YWJsZQCxAg9pbnZlcnRUaWNrSW5kZXgAigMPaW52ZXJ0U3FydFByaWNlANcCF2dldEZ1bGxSYW5nZVRpY2tJbmRleGVzAMIBEG9yZGVyVGlja0luZGV4ZXMAzQEPaXNGdWxsUmFuZ2VPbmx5ANgCE2dldFRpY2tJbmRleEluQXJyYXkAwAEQY29sbGVjdEZlZXNRdW90ZQBDHV9SRURVQ1RJT05fRkFDVE9SX0RFTk9NSU5BVE9SAJkDKF9BREFQVElWRV9GRUVfQ09OVFJPTF9GQUNUT1JfREVOT01JTkFUT1IAmgMSX01BWF9SRUZFUkVOQ0VfQUdFAJ0DHV9USUNLX0FSUkFZX05PVF9FVkVOTFlfU1BBQ0VEAIgCGV9USUNLX0lOREVYX09VVF9PRl9CT1VORFMAiQITX0lOVkFMSURfVElDS19JTkRFWACKAhRfQVJJVEhNRVRJQ19PVkVSRkxPVwCLAhdfQU1PVU5UX0VYQ0VFRFNfTUFYX1U2NACMAhlfU1FSVF9QUklDRV9PVVRfT0ZfQk9VTkRTAI0CFF9USUNLX1NFUVVFTkNFX0VNUFRZAI4CH19TUVJUX1BSSUNFX0xJTUlUX09VVF9PRl9CT1VORFMAjwIjX0lOVkFMSURfU1FSVF9QUklDRV9MSU1JVF9ESVJFQ1RJT04AkAIVX1pFUk9fVFJBREFCTEVfQU1PVU5UAJECEl9JTlZBTElEX1RJTUVTVEFNUACSAhVfSU5WQUxJRF9UUkFOU0ZFUl9GRUUAkwIbX0lOVkFMSURfU0xJUFBBR0VfVE9MRVJBTkNFAJQCGF9USUNLX0lOREVYX05PVF9JTl9BUlJBWQCVAhxfSU5WQUxJRF9USUNLX0FSUkFZX1NFUVVFTkNFAJYCGl9JTlZBTElEX0FEQVBUSVZFX0ZFRV9JTkZPAJcCJF9WT0xBVElMSVRZX0FDQ1VNVUxBVE9SX1NDQUxFX0ZBQ1RPUgCZAxRfRkVFX1JBVEVfSEFSRF9MSU1JVACaAxZkZWNyZWFzZUxpcXVpZGl0eVF1b3RlAGEXZGVjcmVhc2VMaXF1aWRpdHlRdW90ZUEAYhdkZWNyZWFzZUxpcXVpZGl0eVF1b3RlQgBjFmluY3JlYXNlTGlxdWlkaXR5UXVvdGUAZBdpbmNyZWFzZUxpcXVpZGl0eVF1b3RlQQBlF2luY3JlYXNlTGlxdWlkaXR5UXVvdGVCAGYMX05VTV9SRVdBUkRTAJgDHGlzSW5pdGlhbGl6ZWRXaXRoQWRhcHRpdmVGZWUAzAETY29sbGVjdFJld2FyZHNRdW90ZQA/EnRyeUdldEFtb3VudERlbHRhQQDSARJ0cnlHZXRBbW91bnREZWx0YUIA0wEYdHJ5R2V0TmV4dFNxcnRQcmljZUZyb21BANABGHRyeUdldE5leHRTcXJ0UHJpY2VGcm9tQgDRARN0cnlBcHBseVRyYW5zZmVyRmVlAG8adHJ5UmV2ZXJzZUFwcGx5VHJhbnNmZXJGZWUApAEkdHJ5R2V0TWF4QW1vdW50V2l0aFNsaXBwYWdlVG9sZXJhbmNlAI4BJHRyeUdldE1pbkFtb3VudFdpdGhTbGlwcGFnZVRvbGVyYW5jZQCsAQ90cnlBcHBseVN3YXBGZWUAlQEWdHJ5UmV2ZXJzZUFwcGx5U3dhcEZlZQDbARVzd2FwUXVvdGVCeUlucHV0VG9rZW4ATRZzd2FwUXVvdGVCeU91dHB1dFRva2VuAE4QX1RJQ0tfQVJSQVlfU0laRQCTAydfRlVMTF9SQU5HRV9PTkxZX1RJQ0tfU1BBQ0lOR19USFJFU0hPTEQAlAMPX01JTl9USUNLX0lOREVYAJsDD19NQVhfVElDS19JTkRFWACcAxBwcmljZVRvU3FydFByaWNlAOICEHNxcnRQcmljZVRvUHJpY2UA8AILaW52ZXJ0UHJpY2UA8QIQdGlja0luZGV4VG9QcmljZQDjAhBwcmljZVRvVGlja0luZGV4AOQCGmdldFNxcnRQcmljZVNsaXBwYWdlQm91bmRzALgBH2ZpcnN0VW5vY2N1cGllZFBvc2l0aW9uSW5CdW5kbGUA4QEUaXNQb3NpdGlvbkJ1bmRsZUZ1bGwA5gEVaXNQb3NpdGlvbkJ1bmRsZUVtcHR5AOcBFV9QT1NJVElPTl9CVU5ETEVfU0laRQCVAxVfRkVFX1JBVEVfREVOT01JTkFUT1IAlgMRaXNQb3NpdGlvbkluUmFuZ2UAwwIOcG9zaXRpb25TdGF0dXMA4AENcG9zaXRpb25SYXRpbwDXARNfX3diaW5kZ2VuX2V4cG9ydF8wAIACE19fd2JpbmRnZW5fZXhwb3J0XzEAngITX193YmluZGdlbl9leHBvcnRfMgDBAh9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyAOYCCdkBAQBBAQtsnQLcAtgBtgL3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KQPAA3wiASADVK18IAEgASAEQegDaikDACACIAQpA+ADfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgCBxBEAgBEGwA2ogAUIAQuX3xebz8438BEIAEMUBIARBkANqIAJCAELl98Xm8/ON/ARCABDFASAEQaADaiABQgBC2te40RNCABDFASAEQYADaiACQgBC2te40RNCABDFASAEQYgDaikDACAEQZgDaikDACAEQbgDaikDACIBIAQpA5ADfCICIAFUrXwiAyAEKQOAA3wiASADVK18IAEgASAEQagDaikDACACIAQpA6ADfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgMAAcQRAIARB8AJqIAFCAELC1sq/55/qhp5/QgAQxQEgBEHQAmogAkIAQsLWyr/nn+qGnn9CABDFASAEQeACaiABQgBC5pfVjBhCABDFASAEQcACaiACQgBC5pfVjBhCABDFASAEQcgCaikDACAEQdgCaikDACAEQfgCaikDACIBIAQpA9ACfCICIAFUrXwiAyAEKQPAAnwiASADVK18IAEgASAEQegCaikDACACIAQpA+ACfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgIABcQRAIARBsAJqIAFCAEL30JSBiNKArRhCABDFASAEQZACaiACQgBC99CUgYjSgK0YQgAQxQEgBEGgAmogAUIAQt3KiaYkQgAQxQEgBEGAAmogAkIAQt3KiaYkQgAQxQEgBEGIAmopAwAgBEGYAmopAwAgBEG4AmopAwAiASAEKQOQAnwiAiABVK18IgMgBCkDgAJ8IgEgA1StfCABIAEgBEGoAmopAwAgAiAEKQOgAnwiAyACVK18fCIBVq18QiCGIAFCIIiEIQIgAUIghiADQiCIhCEBCyAAQYCAAnEEQCAEQfABaiABQgBC6POdi8bj1smff0IAEMUBIARB0AFqIAJCAELo852LxuPWyZ9/QgAQxQEgBEHgAWogAUIAQuvdhazSAEIAEMUBIARBwAFqIAJCAELr3YWs0gBCABDFASAEQcgBaikDACAEQdgBaikDACAEQfgBaikDACIBIAQpA9ABfCICIAFUrXwiAyAEKQPAAXwiASADVK18IAEg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NwM4IAEgEzcDKCABIBQ3AxggASAEQZgBaikDADcDaCABIARBiAFqKQMANwNYDAELIAEgBCgCUDYCBCABQQE2AgALIAQoAggiAUGDAU0NACABEAALIAQoAgQiAUGDAUsEQCABEAALIARBsAFqJAAgAigCgAJFBEAgAkEwaiANIA5B4AAQSkHgABBKGkIBIRMMCwsgAigChAIhASAAQQE2AgAgACABNgIEDA0LDA4LIAIoAhwgAkEANgIcBEAgAkGAAmogAigCIBCfASACKAKAAkUEQCACKQOIAiEoQgEhHwwKCyACKAKEAiEBIABBATYCACAAIAE2AgQMDAsMDQsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhICACKQOQAiEhQgEhHgwJCyACKAKEAiEBIABBATYCACAAIAE2AgQMCwsMDAsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhIiACKQOQAiEjQgEhHQwICyACKAKEAiEBIABBATYCACAAIAE2AgQMCgsMCwsgAigCHCACQQA2AhwEQCACQQhqIAIoAiAQ9QFBASELIAIoAgwhDCACKAIIRQ0GIABBATYCACAAIAw2AgQMCQsMCgsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhJCACKQOQAiElQgEhHAwGCyACKAKEAiEBIABBATYCACAAIAE2AgQMCAsMCQsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhJiACKQOQAiEnQgEhGwwFCyACKAKEAiEBIABBATYCACAAIAE2AgQMBwsMCAsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEJkCIAIvAYACRQRAIAIvAYICIRBBASEKDAQLIAIoAoQCIQEgAEEBNgIAIAAgATYCBAwGCwwHCyACKAIcIAJBADYCHARAIAJBgAJqIAIoAiAQmQIgAi8BgAJFBEAgAi8BggIhEUEBIQkMAwsgAigChAIhASAAQQE2AgAgACABNgIEDAULDAYLIAIoAhwgAkEANgIcBEAgAkGAAmogAigCIBCZAiACLwGAAkUEQCACLwGCAiESQQEhCAwCCyACKAKEAiEBIABBATYCACAAIAE2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IAFBATYCACABIAQ2AgQMAQsgAyAFOgAMIAMgBDYCCCADQRBqIANBCGoQrwECQAJAIAMpAxgiCiADKQMQIgtCAoWEUEUEQCAKIAuEUEUNAUEAIANB/wBqQcDfwAAQzgEhBCABQQE2AgAgASAENgIEDAILIAEgAygCIDYCBCABQQE2AgAMAQsgA0EoaikDACEKIAMpAyAhCyADQTBqIANBCGoQrwEgAykDOCIMIAMpAzAiDUIChYRQRQRAIAwgDYRQBEBBASADQf8AakHA38AAEM4BIQQgAUEBNgIAIAEgBDYCBAwCCyADQcgAaikDACEMIAMpA0AhDSADQdAAaiADQQhqEK8BAkAgAygCUCIEQQNxQQNGDQACfwJAAkAgBEEBaw4CAwEAC0ECIANB/wBqQcDfwAAQzgEMAQsgAygCYAshBCABQQE2AgAgASAENgIEDAILIAEgAykDYDcDMCABIA03AyAgASALNwMQIAFBADYCACABIAw3AyggASAKNwMYIAEgA0HoAGopAwA3AzgMAQsgASADKAJANgIEIAFBATYCAAsgAygCCCIBQYMBTQ0AIAEQAAsgAygCBCIBQYMBSwRAIAEQAAsgA0GAAWokACACKAKQAUUEQCACQSBqIAggCUEwEEpBMBBKGkIBIQoMBwsgAigClAEhASAAQQI6AHAgACABNgIADAoLDAsLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRIgAikDoAEhE0IBIREMBgsgAigClAEhASAAQQI6AHAgACABNgIADAkLDAoLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRQgAikDoAEhFUIBIRAMBQsgAigClAEhASAAQQI6AHAgACABNgIADAgLDAkLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRYgAikDoAEhF0IBIQ8MBAsgAigClAEhASAAQQI6AHAgACABNgIADAcLDAgLIAIoAgwgAkEANgIMBEAgAkGQAWohAyACKAIQIQQjAEEwayIBJAAgASAENgIMAkAgBBAvQQFHBEAgAUEMaiABQRBqQaDgwAAQVCEFIANBATYCACADIAU2AgQgBEGEAUkNASAEEAAMAQsgAUEQaiAEEJYBIAEoAhAiBEUEQCADIAEpAyA3AxAgA0EANgIAIAMgAUEoaikDADcDGCAERQ0BIAEoAhQiA0GEAUkNASADEAAMAQtByOLAAEHLABDGASEEIANBATYCACADIAQ2AgQgASgCFCIDQYQBSQ0AIAMQAAsgAUEwaiQAIAIoApABRQRAIAcpAwAhGCACKQOgASEZQgEhDgwDCyACKAKUASEBIABBAjoAcCAAIAE2AgAMBgsMBwsgAigCDCACQQA2AgxFDQYgAkGQAWohBCACKAIQIQFBACEGIwBBEGsiAyQAIAMgATYCCAJAQQFBAiABECIiBUEBRhtBACAFGyIFQQJHBEAgBCAFOgABDAELIAQgA0EIaiADQQ9qQcDgwAAQVDYCBEEBIQYLIAQgBjoAACABQYQBTwRAIAEQAAsgA0EQaiQAIAItAJABDQMgAi0AkQEhBgsgAkGQAWogAkEMahB+IAItAJABRQ0ACwsgAigClAEhASAAQQI6AHAgACABNgIADAELIAIoApQBIQEgAEECOgBwIAAgATYCAAsgAkEMahChAgsgAkHQAWokAA8LQer7wABBMRDuAgALrxQCCH8QfiMAQdABayICJAAgAiABNgIIAkACQCABEA5BAUcEQCACQQhqIAJBkAFqQbDgwAAQVSEDIABBAjoAcCAAIAM2AgAgAUGEAUkNASABEAAMAQsgAkEMaiIDIAFB7PDAAEEGEKUCIAJBkAFqIAMQgQECQAJAIAItAJABRQRAIAJB4ABqIQggAkGgAWohCSACQagBaiEHQQIhBgNAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAItAJEBQQFrDgcCAwQFBgEHAAsgBkECRg0MQbXowABBCxDlASEBIABBAjoAcCAAIAE2AgAMEQsgAiACQQxqEIICDAwLIA5QDQlBwOjAAEEMEOUBIQEgAEECOgBwIAAgATYCAAwPCyAPUA0HQczowABBDhDlASEBIABBAjoAcCAAIAE2AgAMDgsgEFANBUHa6MAAQREQ5QEhASAAQQI6AHAgACABNgIADA0LIBFQDQNB6+jAAEEREOUBIQEgAEECOgBwIAAgATYCAAwMCyAKUA0BQfzowABBFBDlASEBIABBAjoAcCAAIAE2AgAMCwsgBkECRwRAIA5QBEBBwOjAAEEMEOMBIQEgAEECOgBwIAAgATYCAAwMCyAPUARAQczowABBDhDjASEBIABBAjoAcCAAIAE2AgAMDAsgEFAEQEHa6MAAQREQ4wEhASAAQQI6AHAgACABNgIADAwLIBFQBEBB6+jAAEEREOMBIQEgAEECOgBwIAAgATYCAAwMCyAKUARAQfzowABBFBDjASEBIABBAjoAcCAAIAE2AgAMDAsgAEFAayACQSBqQTAQShogACASNwM4IAAgEzcDMCAAIBQ3AyggACAVNwMgIAAgFjcDGCAAIBc3AxAgACAYNwMIIAAgGTcDACAAIAZBAXE6AHAMCwtBtejAAEELEOMBIQEgAEECOgBwIAAgATYCAAwKCyACKAIMIAJBADYCDARAIAJBkAFqIQEgAigCECEEIwBBgAFrIgMkACADIAQ2AgQCQCADQQRqIgUQ3wIEQCMAQYABayIEJAAgBCAFELcCIARBADYCDCAEQRBqIAQQsAECQAJAIAQpAxgiCiAEKQMQIgtCAoWEUEUEQCAKIAuEUARAQQAgBEH/AGpBwN/AABDPASEFIAFBATYCACABIAU2AgQMAwsgBEEoaikDACEKIAQpAyAhCyAEQTBqIAQQsAEgBCkDOCIMIAQpAzAiDUIChYRQDQEgDCANhFAEQEEBIARB/wBqQcDfwAAQzwEhBSABQQE2AgAgASAFNgIEDAMLIARByABqKQMAIQwgBCkDQCENIARB0ABqIAQQsAECfwJAAkAgBCgCUCIFQQNxQQNGDQACQCAFQQFrDgIBAgALQQIgBEH/AGpBwN/AABDPAQwCCyABIAQpA2A3AzAgASANNwMgIAEgCzcDECABQQA2AgAgASAMNwMoIAEgCjcDGCABIARB6ABqKQMANwM4DAQLIAQoAmALIQUgAUEBNgIAIAEgBTYCBAwCCyABIAQoAiA2AgQgAUEBNgIADAELIAEgBCgCQDYCBCABQQE2AgALIARBgAFqJAAMAQsgA0HQAGogA0EEahCSASADKAJQIQQCQAJAAkAgAy0AVCIFQQJrDgIBAAILIAFBATYCACABIAQ2AgQMAgsgA0EEaiADQf8AakHA38AAEFUhBCABQQE2AgAgASAENgIEDAELIAMgBToADCADIAQ2AgggA0EQaiADQQhqEK4BAkACQCADKQMYIgogAykDECILQgKFhFBFBEAgCiALhFBFDQFBACADQf8AakHA38AAEM8BIQQgAUEBNgIAIAEgBDYCBAwCCyABIAMoAiA2AgQgAUEBNgIADAELIANBKGopAwAhCiADKQMgIQsgA0EwaiADQQhqEK4BIAMpAzgiDCADKQMwIg1CAoWEUEUEQCAMIA2EUARAQQEgA0H/AGpBwN/AABDPASEEIAFBATYCACABIAQ2AgQMAgsgA0HIAGopAwAhDCADKQNAIQ0gA0HQAGogA0EIahCuAQJAIAMoAlAiBEEDcUEDRg0AAn8CQAJAIARBAWsOAgMBAAtBAiADQf8AakHA38AAEM8BDAELIAMoAmALIQQgAUEBNgIAIAEgBDYCBAwCCyABIAMpA2A3AzAgASANNwMgIAEgCzcDECABQQA2AgAgASAMNwMoIAEgCjcDGCABIANB6ABqKQMANwM4DAELIAEgAygCQDYCBCABQQE2AgALIAMoAggiAUGDAU0NACABEAALIAMoAgQiAUGDAUsEQCABEAALIANBgAFqJAAgAigCkAFFBEAgAkEgaiAIIAlBMBBKQTAQShpCASEKDAcLIAIoApQBIQEgAEECOgBwIAAgATYCAAwKCwwLCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACESIAIpA6ABIRNCASERDAYLIAIoApQBIQEgAEECOgBwIAAgATYCAAwJCwwKCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACEUIAIpA6ABIRVCASEQDAULIAIoApQBIQEgAEECOgBwIAAgATYCAAwICwwJCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACEWIAIpA6ABIRdCASEPDAQLIAIoApQBIQEgAEECOgBwIAAgATYCAAwHCwwICyACKAIMIAJBADYCDARAIAJBkAFqIQMgAigCECEEIwBBMGsiASQAIAEgBDYCDAJAIAQQL0EBRwRAIAFBDGogAUEQakGg4MAAEFUhBSADQQE2AgAgAyAFNgIEIARBhAFJDQEgBBAADAELIAFBEGogBBCWASABKAIQIgRFBEAgAyABKQMgNwMQIANBADYCACADIAFBKGopAwA3AxggBEUNASABKAIUIgNBhAFJDQEgAxAADAELQcjiwABBywAQxgEhBCADQQE2AgAgAyAENgIE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QQFrDhEBAgMEBQYHCAkKCwwNDg8QEQALIAIgAC0AAToACCACQQI2AhQgAkGwwcAANgIQIAJCATcCHCACQTA2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDBELIAIgACkDCDcDCCACQQI2AhQgAkHMwcAANgIQIAJCATcCHCACQTE2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDBALIAIgACkDCDcDCCACQQI2AhQgAkHMwcAANgIQIAJCATcCHCACQTI2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDA8LIAArAwghAyACQQI2AhQgAkHswcAANgIQIAJCATcCHCACQTM2AgwgAiADOQMoIAIgAkEIajYCGCACIAJBKGo2AgggASgCHCABKAIgIAJBEGoQUQwOCyACIAAoAgQ2AgggAkECNgIUIAJBiMLAADYCECACQgE3AhwgAkE0NgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCHCABKAIgIAJBEGoQUQwNCyACIAApAgQ3AgggAkEBNgIUIAJBoMLAADYCECACQgE3AhwgAkE1NgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCHCABKAIgIAJBEGoQUQwMCyABQZnBwABBChDAAgwLCyABQajCwABBChDAAgwKCyABQbLCwABBDBDAAgwJCyABQb7CwABBDhDAAgwICyABQczCwABBCBDAAgwHCyABQdTCwABBAxDAAgwGCyABQdfCwABBBBDAAgwFCyABQdvCwABBDBDAAgwECyABQefCwABBDxDAAgwDCyABQfbCwABBDRDAAgwCCyABQYPDwABBDhDAAgwBCyABIAAoAgQgACgCCBDAAgsgAkEwaiQAC+oEAQp/IwBBMGsiAyQAIAMgATYCLCADIAA2AiggA0EDOgAkIANCIDcCHCADQQA2AhQgA0EANgIMAn8CQAJAAkAgAigCECIKRQRAIAIoAgwiAEUNASACKAIIIgEgAEEDdGohBCAAQQFrQf////8BcUEBaiEHIAIoAgAhAANAIABBBGooAgAiBQRAIAMoAiggACgCACAFIAMoAiwoAgwRAgANBAsgASgCACADQQxqIAFBBGooAgARAAANAyAAQQhqIQAgAUEIaiIBIARHDQALDAELIAIoAhQiAEUNACAAQQV0IQsgAEEBa0H///8/cUEBaiEHIAIoAgghBSACKAIAIQADQCAAQQRqKAIAIgEEQCADKAIoIAAoAgAgASADKAIsKAIMEQIADQMLIAMgCCAKaiIBQRBqKAIANgIcIAMgAUEcai0AADoAJCADIAFBGGooAgA2AiAgAUEMaigCACEEQQAhCUEAIQYCQAJAAkAgAUEIaigCAEEBaw4CAAIBCyAEQQN0IAVqIgwoAgANASAMKAIEIQQLQQEhBgsgAyAENgIQIAMgBjYCDCABQQRqKAIAIQQCQAJAAkAgASgCAEEBaw4CAAIBCyAEQQN0IAVqIgYoAgANASAGKAIEIQQLQQEhCQsgAyAENgIYIAMgCTYCFCAFIAFBFGooAgBBA3RqIgEoAgAgA0EMaiABQQRqKAIAEQAADQIgAEEIaiEAIAsgCEEgaiIIRw0ACwsgByACKAIETw0BIAMoAiggAigCACAHQQN0aiIAKAIAIAAoAgQgAygCLCgCDBECAEUNAQtBAQwBC0EACyADQTBqJAALxgQBCX8jAEEQayIEJAACQAJAAn8CQCAAKAIAQQFGBEAgACgCBCEHIAQgASgCDCIDNgIMIAQgASgCCCICNgIIIAQgASgCBCIFNgIEIAQgASgCACIBNgIAIAAtABghCSAAKAIQIQogAC0AFEEIcQ0BIAohCCAJDAILIAAoAhwgACgCICABEFchAgwDCyAAKAIcIAEgBSAAKAIgKAIMEQIADQEgAEEBOgAYQTAhCCAAQTA2AhAgBEIBNwIAIAcgBWshAUEAIQUgAUEAIAEgB00bIQdBAQshBiADBEAgA0EMbCEDA0ACfwJAAkACQCACLwEAQQFrDgICAQALIAIoAgQMAgsgAigCCAwBCyACLwECIgFB6AdPBEBBBEEFIAFBkM4ASRsMAQtBASABQQpJDQAaQQJBAyABQeQASRsLIAJBDGohAiAFaiEFIANBDGsiAw0ACwsCfwJAIAUgB0kEQCAHIAVrIQMCQAJAAkBBASAGIAZB/wFxQQNGG0H/AXEiAkEBaw4CAAECCyADIQJBACEDDAELIANBAXYhAiADQQFqQQF2IQMLIAJBAWohAiAAKAIgIQYgACgCHCEBA0AgAkEBayICRQ0CIAEgCCAGKAIQEQAARQ0ACwwDCyAAKAIcIAAoAiAgBBBXDAELIAEgBiAEEFcNAUEAIQICfwNAIAMgAiADRg0BGiACQQFqIQIgASAIIAYoAhARAABFDQALIAJBAWsLIANJCyECIAAgCToAGCAAIAo2AhAMAQtBASECCyAEQRBqJAAgAguSBAEEfyMAQYABayIEJAACQAJAAkAgASgCFCICQRBxRQRAIAJBIHENAUEBIQIgACgCACABEHBFDQIMAwsgACgCACECA0AgAyAEakH/AGogAkEPcSIFQTByIAVB1wBqIAVBCkkbOgAAIANBAWshAyACQRBJIAJBBHYhAkUNAAtBASECIAFBAUGRocAAQQIgAyAEakGAAWpBACADaxBFRQ0BDAILIAAoAgAhAgNAIAMgBGpB/wBqIAJBD3EiBUEwciAFQTdqIAVBCkkbOgAAIANBAWshAyACQQ9LIAJBBHYhAg0AC0EBIQIgAUEBQZGhwABBAiADIARqQYABakEAIANrEEUNAQsgASgCHEGNnsAAQQIgASgCICgCDBECAA0AAkAgASgCFCICQRBxRQRAIAJBIHENASAAKAIEIAEQcCECDAILIAAoAgQhAkEAIQMDQCADIARqQf8AaiACQQ9xIgBBMHIgAEHXAGogAEEKSRs6AAAgA0EBayEDIAJBD0sgAkEEdiECDQALIAFBAUGRocAAQQIgAyAEakGAAWpBACADaxBFIQIMAQsgACgCBCECQQAhAwNAIAMgBGpB/wBqIAJBD3EiAEEwciAAQTdqIABBCkkbOgAAIANBAWshAyACQQ9LIAJBBHYhAg0ACyABQQFBkaHAAEECIAMgBGpBgAFqQQAgA2sQRSECCyAEQYABaiQAIAILnQQCB38BfiMAQZABayIDJAACQAJAAkAgACgCACIEQYEBECFFBEBBAUECIAQQIiIFQQFGG0EAIAUbIghBAkYNAUEAIQBBACEFDAILIANBBzoAcCADQfAAaiABIAIQ2QEhBAwCCyADQRhqIAQQFiADQcgAaiADKAIYIAMrAyAQqQIgAygCSEUEQCADQRBqIAQQBgJ/AkAgAygCECIERQ0AIANBCGogBCADKAIUEP0BIANB2ABqIAMoAgggAygCDBC8AiADKAJYQYCAgIB4Rg0AIANBMGogA0HgAGooAgAiBjYCACADIAMpAlg3AyhBBSEFQQEhByADKAIsIQRBAAwBCyADQeQAaiAAELQBAn8gAygCZCIJQYCAgIB4RiIHRQRAIANBQGsiACEGIAAgA0HsAGooAgA2AgAgAyADKQJkNwM4QQYhBSADQTxqDAELIANBMGohBiADQQE2AnQgA0HwxsAANgJwIANCATcCfCADQTw2AowBIAMgADYCiAEgAyADQYgBajYCeCADQShqIANB8ABqEGpBESEFIANBLGoLIAYoAgAhBigCACEEIAlBgICAgHhHCyEAIAatIQoMAQtBAyEFIAMpA1AhCkEAIQALIAMgCjcDeCADIAQ2AnQgAyAIOgBxIAMgBToAcCADQfAAaiABIAIQ2QEhBCAABEAgA0E4ahDIAQsgB0UNACADQShqEMgBCyADQZABaiQAIAQLnQQCB38BfiMAQZABayIDJAACQAJAAkAgACgCACIEQYEBECFFBEBBAUECIAQQIiIFQQFGG0EAIAUbIghBAkYNAUEAIQBBACEFDAILIANBBzoAcCADQfAAaiABIAIQ2gEhBAwCCyADQRhqIAQQFiADQcgAaiADKAIYIAMrAyAQqQIgAygCSEUEQCADQRBqIAQQBgJ/AkAgAygCECIERQ0AIANBCGogBCADKAIUEP0BIANB2ABqIAMoAgggAygCDBC8AiADKAJYQYCAgIB4Rg0AIANBMGogA0HgAGooAgAiBjYCACADIAMpAlg3AyhBBSEFQQEhByADKAIsIQRBAAwBCyADQeQAaiAAELQBAn8gAygCZCIJQYCAgIB4RiIHRQRAIANBQGsiACEGIAAgA0HsAGooAgA2AgAgAyADKQJkNwM4QQYhBSADQTxqDAELIANBMGohBiADQQE2AnQgA0H4ycAANgJwIANCATcCfCADQTw2AowBIAMgADYCiAEgAyADQYgBajYCeCADQShqIANB8ABqEGpBESEFIANBLGoLIAYoAgAhBigCACEEIAlBgICAgHhHCyEAIAatIQoMAQtBAyEFIAMpA1AhCkEAIQALIAMgCjcDeCADIAQ2AnQgAyAIOgBxIAMgBToAcCADQfAAaiABIAIQ2gEhBCAABEAgA0E4ahDIAQsgB0UNACADQShqEMgBCyADQZABaiQAIAQLjwQBDX8gAUEBayEPIAAoAgQhCiAAKAIAIQsgACgCCCEMAkADQCAODQECQAJAIAIgBEkNAANAIAEgBGohBQJAAkACQCACIARrIgZB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NCADIAQ2AjAgA0EoaiADQTBqQc3MwABBDiABEOgBAkAgAygCKARAIAMoAiwhAgwBCyADIAFBEGo2AjggA0EgaiADQTBqQdvMwABBCSADQThqEOkBIAMoAiAEQCADKAIkIQIMAQsgAyABQRhqNgI4IANBGGogA0EwakHkzMAAQQkgA0E4ahDpASADKAIYBEAgAygCHCECDAELIAMgAUEgajYCOCADQRBqIANBMGpB7czAAEEJIANBOGoQ6QEgAygCEARAIAMoAhQhAgwBCyADIAFBKGo2AjggA0EIaiADQTBqQfbMwABBCSADQThqEOkBIAMoAggEQCADKAIMIQIMAQsgAyADKAIwIAMoAjQQ0wIgAygCBCECIAMoAgAMAgsgAygCNCIBQYQBSQ0AIAEQAAtBAQshASAAIAI2AgQgACABNgIAIANBQGskAAv9AgECfyMAQUBqIgMkACADQThqIAIQ1AIgAygCPCECAn8CQCADKAI4IgRFDQAgAyACNgI0IAMgBDYCMCADQShqIANBMGpBzczAAEEOIAEQ6AECQCADKAIoBEAgAygCLCECDAELIAMgAUEQajYCOCADQSBqIANBMGpB28zAAEEJIANBOGoQ6QEgAygCIARAIAMoAiQhAgwBCyADIAFBGGo2AjggA0EYaiADQTBqQeTMwABBCSADQThqEOkBIAMoAhgEQCADKAIcIQIMAQsgAyABQSBqNgI4IANBEGogA0EwakGVzcAAQQkgA0E4ahDpASADKAIQBEAgAygCFCECDAELIAMgAUEoajYCOCADQQhqIANBMGpBns3AAEEJIANBOGoQ6QEgAygCCARAIAMoAgwhAgwBCyADIAMoAjAgAygCNBDTAiADKAIEIQIgAygCAAwCCyADKAI0IgFBhAFJDQAgARAAC0EBCyEBIAAgAjYCBCAAIAE2AgAgA0FAayQAC9sCAgN/Bn4jAEHgAGsiAyQAIANBOGogAhAKEGAgAkGEAU8EQCACEAALAkACQCADKAI4QQFHBEACfyADLwFIIgRBkM4ASwRAQRQhBUGm28AADAELQQAhAiAERSABUHINAyADKQNAIQcgA0EoaiAErUIAIAFCABDFASADQRhqIAMpAygiBiADQTBqKQMAIglCkM4AQgAQhQIgA0EIaiADKQMYIgggA0EgaikDACIKQpDOAEIAEMUBIAogCCAGIAMpAwgiC30gCSADQRBqKQMAfSAGIAtUrX2EQgBSrXwiBiAIVK18UA0CQRYhBUH42sAAC0EBIQIgBRABIQQMAgsgAyADKAI8NgJQIANB1ABqIANB0ABqELsBIAMoAlggAygCXBDuAgALIAEgByAGIAYgB1YbfSEBCyAAIAI2AgwgACAEQQAgAhs2AgggAEIAIAEgAhs3AwAgA0HgAGokAAvmAgEIfyMAQRBrIgUkAEEKIQIgACIDQegHTwRAIAMhBANAIAVBBmogAmoiBkEDayAEIARBkM4AbiIDQZDOAGxrIgdB//8DcUHkAG4iCEEBdCIJQZShwABqLQAAOgAAIAZBBGsgCUGTocAAai0AADoAACAGQQFrIAcgCEHkAGxrQf//A3FBAXQiB0GUocAAai0AADoAACAGQQJrIAdBk6HAAGotAAA6AAAgAkEEayECIARB/6ziBEsgAyEEDQALCwJAIANBCU0EQCADIQQMAQsgAiAFakEFaiADIANB//8DcUHkAG4iBEHkAGxrQf//A3FBAXQiA0GUocAAai0AADoAACACQQJrIgIgBUEGamogA0GTocAAai0AADoAAAtBACAAIAQbRQRAIAJBAWsiAiAFQQZqaiAEQQF0QR5xQZShwABqLQAAOgAACyABQQFBAUEAIAVBBmogAmpBCiACaxBFIAVBEGokAAurAgIBfwF+IwBBQGoiCCQAIAhBMGogBSADfSIJQgAgAUIAEMUBIAhBEGogCUIAIAJCABDFASAIIAYgBH0gAyAFVq19IgNCACACQgAQxQEgCEEgaiADQgAgAUIAEMUBIAhBCGopAwAgCEEYaikDACAIQThqKQMAIgIgCCkDEHwiASACVK18IgMgCCkDAHwiAiADVK18IAIgAiAIQShqKQMAIAEgASAIKQMgfCIBVq18fCICVq18IQMgAAJ/AkACQCAHBEAgCCkDMEIAUg0BCyACIAOEUARAIAAgATcDCEEADAMLDAELIAMgAUIBfCIBIAIgAVCtfCIChFCthCAChFAEQCAAIAE3AwhBAAwCCwsgAEEWNgIIIABBmYjBADYCBEEBCzYCACAIQUBrJAAL0gIBB39BASEJAkACQCACRQ0AIAEgAkEBdGohCiAAQYD+A3FBCHYhCyAAQf8BcSENA0AgAUECaiEMIAcgAS0AASICaiEIIAsgAS0AACIBRwRAIAEgC0sNAiAIIQcgDCIBIApGDQIMAQsCQAJAIAcgCE0EQCAEIAhJDQEgAyAHaiEBA0AgAkUNAyACQQFrIQIgAS0AACABQQFqIQEgDUcNAAtBACEJDAULIAcgCEGkpsAAENsCAAsgCCAEQaSmwAAQ2gIACyAIIQcgDCIBIApHDQALCyAGRQ0AIAUgBmohAyAAQf//A3EhAQNAIAVBAWohAAJAIAUsAAAiAkEATgRAIAAhBQwBCyAAIANHBEAgBS0AASACQf8AcUEIdHIhAiAFQQJqIQUMAQtBlKbAABDdAgALIAEgAmsiAUEASA0BIAlBAXMhCSADIAVHDQALCyAJQQFxC/ECAQR/IAAoAgwhAgJAAkAgAUGAAk8EQCAAKAIYIQMCQAJAIAAgAkYEQCAAQRRBECAAKAIUIgIbaigCACIBDQFBACECDAILIAAoAggiASACNgIMIAIgATYCCAwBCyAAQRRqIABBEGogAhshBANAIAQhBSABIgJBFGogAkEQaiACKAIUIgEbIQQgAkEUQRAgARtqKAIAIgENAAsgBUEANgIACyADRQ0CIAAgACgCHEECdEHoiMEAaiIBKAIARwRAIANBEEEUIAMoAhAgAEYbaiACNgIAIAJFDQMMAgsgASACNgIAIAINAUGEjMEAQYSMwQAoAgBBfiAAKAIcd3E2AgAMAgsgACgCCCIAIAJHBEAgACACNgIMIAIgADYCCA8LQYCMwQBBgIzBACgCAEF+IAFBA3Z3cTYCAA8LIAIgAzYCGCAAKAIQIgEEQCACIAE2AhAgASACNgIYCyAAKAIUIgBFDQAgAiAANgIUIAAgAjYCGAsLpBQDFn8BfAF+IwBBoOkEayIGJAACQCABEDBBAUcEQEHwACECA0AgACACakECOgAAIAJBkNgAaiICQdCRBEcNAAsgAUGEAUkNASABEAAMAQsgBiABNgIcQfAAIQIDQCAGQSBqIAJqQQI6AAAgAkGQ2ABqIgJB0JEERw0ACyAGQYCRBGoiASAGQRxqELcCIAZBADYCjJEEIAZBEGogARD7AQJAIAYoAhAiAkUNACAGKAIUIQEDQCAGIAYoAoyRBCIQQQFqNgKMkQQgAkEBcUUNASAGQZCRBGohC0EAIQhBACERQdDxwAAhFCMAQbCwAWsiBCQAIAQgATYCHAJAAkACQCABEA5BAUcEQCAEQRxqIARBsNgAakGQ4MAAEFQhAiALQQI6AHAgCyACNgIAIAFBhAFJDQEgARAADAELIARBIGoiAiABQdDxwABBAhClAiAEQbDYAGoiASACEIIBAkACfyAELQCwWEUEQCAEQaHZAGohFSABQQRyIRZBAiEBA0ACQAJAAkACQAJAAkACQCAELQCxWEEBaw4DAgEDAAsgEUUNBEGQ6cAAQQ4Q5AEMCAsgBEEQaiAEQSBqEIICDAQLIAFB/wFxQQJGDQFBnunAAEEFEOQBDAYLIBFFBEBBkOnAAEEOEOIBDAYLIAFB/wFxQQJGBEBBnunAAEEFEOIBDAYLIAsgCDYCACALQQRqIARBxNcAakHsABBKGiALQfEAaiAEQTVqQY/XABBKGiALIBQ2AoBYIAsgAToAcAwGCyAEKAIgIARBADYCIARAIARBsNgAaiEIIAQoAiQhASMAQSBrIgckACAHIAE2AgwCQCAHQQxqIgEQ3wIEQCAHQRBqIgMgARC3AiAHQQA2AhxBACEJQQAhCiMAQaDaAGsiASQAIAFCADcDCCABQgE3AwAgAUEANgKQWCABQaDYAGpBBHIhDCABQRBqIQ0gAUGR2QBqIhJBB2ohEwJAAkACfwJAA0AgAUGg2ABqIQUjAEGQAWsiAiQAAkACQCADKAIABEAgAkEIaiADEPsBIAIoAggNAQsgBUECOgBwDAELIAIoAgwhDiADIAMoAgxBAWo2AgwgAkEQaiIPIA4QOCACLQCAAUECRwRAIAUgD0GAARBKGgwBCyAFQQM6AHAgBSACKAIQNgIACyACQZABaiQAIAEoAqBYIg4gAS0AkFkiBUEDRg0CGiABQbDZAGoiDyAMQewAEEoaIAEgEykAADcAp1kgASASKQAANwOgWSAFQQJGDQEgASAJaiICQRBqIA42AgAgAkEUaiAPQewAEEoaIAJBgAFqIAU6AAAgAkGBAWogASkDoFk3AAAgAkGIAWogASkAp1k3AAAgASABKAKQWEEBajYCkFggCUGAAWohCSAKQQFqIgpB2ABHDQALIAEoAgBBAXFFDQIgCCANQYDYABBKGgwDCyAKIAFBn9oAakH03MAAEM4BCyECIAhBAjoAcCAIIAI2AgAMAQtB5NzAABDdAgALIAFBoNoAaiQADAELIAdBEGogB0EMahCSASAHKAIQIQECQAJAAkAgBy0AFCICQQJrDgIBAAILIAhBAjoAcCAIIAE2AgAMAgsgB0EMaiAHQRBqQdDgwAAQVCEBIAhBAjoAcCAIIAE2AgAMAQtBACEJIwBBsNoAayIDJAAgAyACQQFxOgAMIAMgATYCCCADQgA3AxggA0IBNwMQQQAhCiADQQA2AqBYIANBsNgAakEEciESIANBIGohEyADQaHZAGoiDkEHaiEPAkACQAJAAn8CQANAIANBsNgAaiEMIwBBkAFrIgUkACAFQQhqIANBCGoQgQJBAyEBQQIhAiAFKAIMIQ0CQAJAAkAgBSgCCEEBaw4CAQIACyAFQRBqIhcgDRA4IAUoAhAhDSAFLQCAASICQQJGDQAgDEEEaiAXQQRyQewAEEoaIAxB+ABqIAVBiAFqKQAANwAAIAwgBSkAgQE3AHEgAiEBCyAMIA02AgAgASECCyAMIAI6AHAgBUGQAWokACADKAKwWCIFIAMtAKBZIgJBA0YNAhogA0HA2QBqIgwgEkHsABBKGiADIA8pAAA3ALdZIAMgDikAADcDsFkgAkECRg0BIANBEGogCmoiAUEQaiAFNgIAIAFBFGogDEHsABBKGiABQYABaiACOgAAIAFBgQFqIAMpA7BZNwAAIAFBiAFqIAMpALdZNwAAIAMgAygCoFhBAWo2AqBYIApBgAFqIQogCUEBaiIJQdgARw0ACyADKAIQQQFxRQ0CIAggE0GA2AAQShogAygCCCIBQYMBTQ0EDAMLIAkgA0Gv2gBqQfTcwAAQzgELIQEgCEECOgBwIAggATYCACADKAIIIgFBgwFLDQEMAgtB5NzAABDdAgALIAEQAAsgA0Gw2gBqJAALIAcoAgwiAUGDAUsEQCABEAALIAdBIGokACAEKAKwWCEIIAQtAKBZIgFBAkcEQCAEQcTXAGogFkHsABBKGiAEQTVqIBVBj9cAEEoaDAMLIAgMBQtB6vvAAEExEO4CAAsgBCgCICAEQQA2AiBFDQYgBCgCJCEFIwBBEGsiByQAIAcgBTYCDCMAQTBrIgMkACADQQhqIgkgB0EMaiICEOACBH4gAigCABAjIhhEAAAAAAAA4MNmIQogCUL///////////8AAn4gGJlEAAAAAAAA4ENjBEAgGLAMAQtCgICAgICAgICAfwtCgICAgICAgICAfyAKGyAYRP///////99DZBtCACAYIBhhGzcDCEIBBUIACzcDAEEBIQkgBwJ/IAMoAghBAUYEQCADKQMQIhlCgICAgAh9Qv////9vVgRAQQAhCSAZpwwCCyADQQI6ABggAyAZNwMgIwBBMGsiAiQAIAJB4N/AADYCBCACIANBL2o2AgAgAkECNgIMIAJB9OnAADYCCCACQgI3AhQgAkE6NgIsIAJBOzYCJCACIANBGGo2AiAgAiACQSBqNgIQIAIgAjYCKCACQQhqEJsBIAJBMGokAAwBCyACIANBL2pB4N/AABBUCzYCBCAHIAk2AgAgA0EwaiQAIAcoAgQhAiAHKAIAIQMgBUGEAU8EQCAFEAALIARBCGoiBSADNgIAIAUgAjYCBCAHQRBqJABBASERIAQoAgwiFCAEKAIIDQMaCyAEQbDYAGogBEEgahCCASAELQCwWEUNAAsLIAQoArRYCyEBIAtBAjoAcCALIAE2AgALIARBIGoQoQILIARBsLABaiQADAELQer7wABBMRDuAgALAkACQCAGLQCAkgRBAkcEQCAQQQVLDQIgBkEgaiAQQZDYAGxqIAtBkNgAEEoaDAELIAYoApCRBCIBQYQBSQ0AIAEQAAsgBkEIaiAGQYCRBGoQ+wEgBigCDCEBIAYoAggiAg0BDAILCyAQQQZB3P7AABDWAQALIAAgBkEgakHgkAQQShogBigCHCIAQYQBSQ0AIAAQAAsgBkGg6QRqJAAL8gIBAX8CQCACBEAgAS0AAEEwTQ0BIAVBAjsBAAJAAkACQAJAAkAgA8EiBkEASgRAIAUgATYCBCADQf//A3EiAyACSQ0BIAVBADsBDCAFIAI2AgggBSADIAJrNgIQIAQNAkECIQEMBQsgBSACNgIgIAUgATYCHCAFQQI7ARggBUEAOwEMIAVBAjYCCCAFQcmdwAA2AgQgBUEAIAZrIgM2AhBBAyEBIAIgBE8NBCAEIAJrIgIgA00NBCACIAZqIQQMAwsgBUECOwEYIAVBATYCFCAFQcidwAA2AhAgBUECOwEMIAUgAzYCCCAFIAIgA2siAjYCICAFIAEgA2o2AhwgAiAESQ0BQQMhAQwDCyAFQQE2AiAgBUHIncAANgIcIAVBAjsBGAwBCyAEIAJrIQQLIAUgBDYCKCAFQQA7ASRBBCEBCyAAIAE2AgQgACAFNgIADwtBsJrAAEEhQdScwAAQ/wEAC0HknMAAQR9BhJ3AABD/AQALxgIBA38jAEEQayICJAACQCABQYABTwRAIAJBADYCDAJ/IAFBgBBPBEAgAUGAgARPBEAgAkEMakEDciEEIAIgAUESdkHwAXI6AAwgAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANQQQMAgsgAkEMakECciEEIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAELIAJBDGpBAXIhBCACIAFBBnZBwAFyOgAMQQILIQMgBCABQT9xQYABcjoAACADIAAoAgAgACgCCCIBa0sEQCAAIAEgAxCdASAAKAIIIQELIAAoAgQgAWogAkEMaiADEEoaIAAgASADajYCCAwBCyAAKAIIIgMgACgCAEYEQCAAQayHwAAQqQELIAAgA0EBajYCCCAAKAIEIANqIAE6AAALIAJBEGokAEEAC8QCAQJ/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQA2AgwCfyABQYAQTwRAIAFBgIAETwRAIAIgAUE/cUGAAXI6AA8gAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA1BBAwCCyACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAELIAIgAUE/cUGAAXI6AA0gAiABQQZ2QcABcjoADEECCyEBIAEgACgCACAAKAIIIgNrSwRAIAAgAyABEJABIAAoAgghAwsgACgCBCADaiACQQxqIAEQShogACABIANqNgIIDAELIAAoAggiAyAAKAIARgRAIABBzIDAABCpAQsgACgCBCADaiABOgAAIAAgA0EBajYCCAsgAkEQaiQAQQALxAIBBH8gAEIANwIQIAACf0EAIAFBgAJJDQAaQR8gAUH///8HSw0AGiABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qCyICNgIcIAJBAnRB6IjBAGohBEEBIAJ0IgNBhIzBACgCAHFFBEAgBCAANgIAIAAgBDYCGCAAIAA2AgwgACAANgIIQYSMwQBBhIzBACgCACADcjYCAA8LAkACQCABIAQoAgAiAygCBEF4cUYEQCADIQIMAQsgAUEZIAJBAXZrQQAgAkEfRxt0IQUDQCADIAVBHXZBBHFqQRBqIgQoAgAiAkUNAiAFQQF0IQUgAiEDIAIoAgRBeHEgAUcNAAsLIAIoAggiASAANgIMIAIgADYCCCAAQQA2AhggACACNgIMIAAgATYCCA8LIAQgADYCACAAIAM2AhggACAANgIMIAAgADYCCAumGAITfwR+IwBBEGsiFSQAIAEoAgQiCCACIAMgAhsiBHEhBSAErSIaQhmIQoGChIiQoMCAAX4hGCABKAIAIQsCQAJAA0ACQCAFIAtqKQAAIhkgGIUiF0J/hSAXQoGChIiQoMCAAX2DQoCBgoSIkKDAgH+DIhdQRQRAA0AgAiALIBd6p0EDdiAFaiAIcUF0bGoiBEEMaygCAEYEQCAEQQhrKAIAIANGDQMLIBdCAX0gF4MiF1BFDQALCyAZIBlCAYaDQoCBgoSIkKDAgH+DUEUNAiAFIAdBCGoiB2ogCHEhBQwBCwsgACABNgIEIAAgBDYCAEEAIQEMAQsgASgCCEUEQCAVQQhqIRYjAEFAaiINJAACQCABKAIMIhRBAWoiCCAUTwRAAkAgASgCBCISIBJBAWoiE0EDdiIHQQdsIBJBCEkbIhFBAXYgCEkEQCANQTBqIQkCfyARQQFqIgcgCCAHIAhLGyIHQQhPBEBBfyAHQQN0QQduQQFrZ3ZBAWogB0H/////AU0NARoQ9gEgDSgCDCEIIA0oAgghBAwFC0EEQQggB0EESRsLIQUjAEEQayIIJAACQAJAAkAgBa1CDH4iF0IgiKcNACAXpyIEQQdqIgcgBEkNACAHQXhxIgsgBUEIamoiBCALSQ0AIARB+P///wdNDQELEPYBIAkgCCkDADcCBCAJQQA2AgAMAQsgBAR/QdGIwQAtAAAaIARBCBDHAgVBCAsiBwRAIAlBADYCDCAJIAVBAWsiBDYCBCAJIAcgC2o2AgAgCSAEIAVBA3ZBB2wgBEEISRs2AggMAQtBCCAEEOsCAAsgCEEQaiQAIA0oAjQhBCANKAIwIgdFBEAgDSgCOCEIDAQLIA0pAjghFyAHQf8BIARBCWoQXyERIA0gF0IgiD4CLCANIBenIg82AiggDSAENgIkIA0gETYCICANQQg2AhwgFARAIBFBDGshCiARQQhqIQwgASgCACILQQxrIRMgCykDAEJ/hUKAgYKEiJCgwIB/gyEYIBQhByALIQgDQCAYUARAA0AgEEEIaiEQIAgpAwggCEEIaiEIQoCBgoSIkKDAgH+DIhdCgIGChIiQoMCAf1ENAAsgF0KAgYKEiJCgwIB/hSEYCyARIAsgGHqnQQN2IBBqIg5BdGxqIglBDGsoAgAiBSAJQQhrKAIAIAUbIgkgBHEiBWopAABCgIGChIiQoMCAf4MiF1AEQEEIIQYDQCAFIAZqIQUgBkEIaiEGIBEgBCAFcSIFaikAAEKAgYKEiJCgwIB/gyIXUA0ACwsgGEIBfSAYgyEYIBEgF3qnQQN2IAVqIARxIgVqLAAAQQBOBEAgESkDAEKAgYKEiJCgwIB/g3qnQQN2IQULIAUgEWogCUEZdiIJOgAAIAwgBUEIayAEcWogCToAACAKIAVBdGxqIglBCGogEyAOQXRsaiIFQQhqKAAANgAAIAkgBSkAADcAACAHQQFrIgcNAAsLIA0gFDYCLCANIA8gFGs2AihBACEIA0AgASAIaiIHKAIAIQQgByAIIA1qQSBqIgcoAgA2AgAgByAENgIAIAhBBGoiCEEQRw0ACyANKAIkIghFDQEgCCAIQQxsQRNqQXhxIgdqQQlqIghFDQEgDSgCICAHayAIENkCDAELIAEoAgAhCyAHIBNBB3FBAEdqIgQEQCALIQgDQCAIIAgpAwAiF0J/hUIHiEKBgoSIkKDAgAGDIBdC//79+/fv37//AIR8NwMAIAhBCGohCCAEQQFrIgQNAAsLAkACQCATQQhPBEAgCyATaiALKQAANwAADAELAkACQCATIgwgC0EIaiIGIAsiBGtLBEAgBCAMaiEHIAYgDGohBiAMQRBJDQFBACAGQQNxIg5rIRACQCAGQXxxIgogBk8NACAOQQFrAkAgDkUEQCAHIQUMAQsgDiEJIAchBQNAIAZBAWsiBiAFQQFrIgUtAAA6AAAgCUEBayIJDQALC0EDSQ0AIAVBBGshBQNAIAZBAWsgBUEDai0AADoAACAGQQJrIAVBAmotAAA6AAAgBkEDayAFQQFqLQAAOgAAIAZBBGsiBiAFLQAAOgAAIAVBBGshBSAGIApLDQALCyAKIAwgDmsiD0F8cSIFayEGQQAgBWsCQCAHIBBqIhBBA3FFBEAgBiAKTw0BIAQgD2pBBGshBANAIApBBGsiCiAEKAIANgIAIARBBGshBCAGIApJDQALDAELIAYgCk8NACAQQQN0IgdBGHEhCSAQQXxxIgVBBGshBEEAIAdrQRhxIQcgBSgCACEMA0AgCkEEayIKIAwgB3QgBCgCACIMIAl2cjYCACAEQQRrIQQgBiAKSQ0ACwsgD0EDcSEMIBBqIQcMAQsgDEEQTwRAAkAgBkEAIAZrQQNxIglqIgUgBk0NACAEIQogCQRAIAkhBwNAIAYgCi0AADoAACAKQQFqIQogBkEBaiEGIAdBAWsiBw0ACwsgCUEBa0EHSQ0AA0AgBiAKLQAAOgAAIAZBAWogCkEBai0AADoAACAGQQJqIApBAmotAAA6AAAgBkEDaiAKQQNqLQAAOgAAIAZBBGogCkEEai0AADoAACAGQQVqIApBBWotAAA6AAAgBkEGaiAKQQZqLQAAOgAAIAZBB2ogCkEHai0AADoAACAKQQhqIQogBkEIaiIGIAVHDQALCyAFIAwgCWsiEEF8cSIPaiEGAkAgBCAJaiIHQQNxRQRAIAUgBk8NASAHIQQDQCAFIAQoAgA2AgAgBEEEaiEEIAVBBGoiBSAGSQ0ACwwBCyAFIAZPDQAgB0EDdCIJQRhxIQogB0F8cSIOQQRqIQRBACAJa0EYcSEJIA4oAgAhDANAIAUgDCAKdiAEKAIAIgwgCXRyNgIAIARBBGohBCAFQQRqIgUgBkkNAAsLIBBBA3EhDCAHIA9qIQQLIAYgBiAMaiIHTw0BIAxBB3EiCgRAA0AgBiAELQAAOgAAIARBAWohBCAGQQFqIQYgCkEBayIKDQALCyAMQQFrQQdJDQEDQCAGIAQtAAA6AAAgBkEBaiAEQQFqLQAAOgAAIAZBAmogBEECai0AADoAACAGQQNqIARBA2otAAA6AAAgBkEEaiAEQQRqLQAAOgAAIAZBBWogBEEFai0AADoAACAGQQZqIARBBmotAAA6AAAgBkEHaiAEQQdqLQAAOgAAIARBCGohBCAGQQhqIgYgB0cNAAsMAQsgBiAMayIFIAZPDQAgDEEDcSIEBEADQCAGQQFrIgYgB0EBayIHLQAAOgAAIARBAWsiBA0ACwsgDEEBa0EDSQ0AIAdBBGshBANAIAZBAWsgBEEDai0AADoAACAGQQJrIARBAmotAAA6AAAgBkEDayAEQQFqLQAAOgAAIAZBBGsiBiAELQAAOgAAIARBBGshBCAFIAZJDQALCyATRQ0BCyALQQhqIQogC0EMayEMIAshBEEAIQUDQAJAIAsgBSIIaiITLQAAQYABRw0AIAwgBUF0bGohDwJAA0AgDygCACIHIA8oAgQgBxsiDiAScSIJIQUgCSALaikAAEKAgYKEiJCgwIB/gyIYUARAQQghBgNAIAUgBmohByAGQQhqIQYgCyAHIBJxIgVqKQAAQoCBgoSIkKDAgH+DIhhQDQALCyALIBh6p0EDdiAFaiAScSIFaiwAAEEATgRAIAspAwBCgIGChIiQoMCAf4N6p0EDdiEFCyAFIAlrIAggCWtzIBJxQQhJDQEgBSALaiIHLQAAIAcgDkEZdiIHOgAAIAogBUEIayAScWogBzoAACAFQXRsIQdB/wFHBEAgByALaiEOQXQhBQNAIAQgBWoiBy0AACEJIAcgBSAOaiIHLQAAOgAAIAcgCToAACAFQQFqIgUNAAsMAQsLIBNB/wE6AAAgCiAIQQhrIBJxakH/AToAACAHIAxqIgdBCGogD0EIaigAADYAACAHIA8pAAA3AAAMAQsgEyAOQRl2Igc6AAAgCiAIQQhrIBJxaiAHOgAACyAIQQFqIQUgBEEMayEEIAggEkcNAAsLIAEgESAUazYCCAtBgYCAgHghBAwBCxD2ASANKAIEIQggDSgCACEECyAWIAg2AgQgFiAENgIAIA1BQGskAAsgACADNgIMIAAgAjYCCCAAIBo3AwALIAAgATYCECAVQRBqJAALjQICBn4CfyMAQSBrIgkkAAJAAkAgAlAgAUICVHEEQCABIQQgAiEDDAELIAlBEGogASACIAJCP4YgAUIBiIQiBCACQgGIIgMQhQIgCSkDECIFIAR8IgZCAYggBSAGVq0gCUEYaikDACADfHwiB0I/hoQiCCAEWiAHQgGIIgUgA1ogAyAFURsNACAJQQhqIQoDQCAFIQMgCCEEIAdQIAZCAlRxDQIgCSABIAIgBCADEIUCIAkpAwAiBSAEfCIGQgGIIAUgBlatIAopAwAgA3x8IgdCP4aEIgggBFQgB0IBiCIFIANUIAMgBVEbDQALCyAAIAQ3AwAgACADNwMIIAlBIGokAA8LQfjLwAAQmgIAC4AFAQR/IwBBIGsiBCQAAkACQAJAIAEoAggiAiABKAIMRwRAIAFBEGohBQNAIAEgAkEIajYCCCAEIAIoAgAgAigCBBCgAjYCFAJAIAUgBEEUahDVAiIDEBdBAUYEQCAEKAIUIAUoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIFQYQBSQ0AIAUQAAsgASADNgIEQQEhBSABQQE2AgAgBEEIaiACKAIAIAIoAgQQzwIgBEEYaiEBAkACQAJAAkACQAJAAkACQAJAAkAgBCgCCCICIAQoAgwiA0H0+MAAQRAQsAJFBEAgAiADQYT5wABBCxCwAg0BIAIgA0GP+cAAQQcQsAINAiACIANBlvnAAEEPELACDQMgAiADQaX5wABBCRCwAg0EIAIgA0Gu+cAAQQkQsAINBSACIANBt/nAAEEQELACDQYgAiADQcf5wABBEBCwAg0HIAIgA0HX+cAAQRAQsAINCCACIANB5/nAAEEaELACDQkgAiADQYH6wABBCxCwAkUEQCABQQs6AAEMCwsgAUEKOgABDAoLIAFBADoAAQwJCyABQQE6AAEMCAsgAUECOgABDAcLIAFBAzoAAQwGCyABQQQ6AAEMBQsgAUEFOgABDAQLIAFBBjoAAQwDCyABQQc6AAEMAgsgAUEIOgABDAELIAFBCToAAQsgAUEAOgAAIAQtABgNAyAAIAQtABk6AAFBACEFDAQLIANBhAFPBEAgAxAACyAEKAIUIgJBhAFPBEAgAhAACyABKAIIIgIgASgCDEcNAAsLIABBgBg7AQAMAgsgACAEKAIcNgIECyAAIAU6AAAgBCgCFCIAQYQBSQ0AIAAQAAsgBEEgaiQAC6ADAQR/IwBBIGsiAiQAAkACQAJAIAEoAggiAyABKAIMRwRAIAFBEGohBANAIAEgA0EIajYCCCACIAMoAgAgAygCBBCgAjYCFAJAIAQgAkEUahDVAiIFEBdBAUYEQCACKAIUIAQoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIEQYQBSQ0AIAQQAAsgASAFNgIEQQEhBSABQQE2AgAgAkEIaiADKAIAIAMoAgQQzwIgAkEYaiEBAkACQCACKAIIIgMgAigCDCIEQez0wABBFBCwAkUEQCADIARBgPXAAEEUELACDQEgAyAEQZT1wABBFBCwAkUEQCABQQM6AAEMAwsgAUECOgABDAILIAFBADoAAQwBCyABQQE6AAELIAFBADoAACACLQAYDQMgACACLQAZOgABQQAhBQwECyAFQYQBTwRAIAUQAAsgAigCFCIDQYQBTwRAIAMQAAsgASgCCCIDIAEoAgxHDQALCyAAQYAIOwEADAILIAAgAigCHDYCBAsgACAFOgAAIAIoAhQiAEGEAUkNACAAEAALIAJBIGokAAuEAwEEfyMAQSBrIgIkAAJAAkACQCABKAIIIgMgASgCDEcEQCABQRBqIQQDQCABIANBCGo2AgggAiADKAIAIAMoAgQQoAI2AhQCQCAEIAJBFGoQ1QIiBRAXQQFGBEAgAigCFCAEKAIAEC5BAUcNAQsCQCABKAIARQ0AIAEoAgQiBEGEAUkNACAEEAALIAEgBTYCBEEBIQUgAUEBNgIAIAJBCGogAygCACADKAIEEM8CIAJBGGohAQJAIAIoAggiAyACKAIMIgRBk/vAAEEVELACRQRAIAMgBEGo+8AAQQ8QsAJFBEAgAUECOgABDAILIAFBAToAAQwBCyABQQA6AAELIAFBADoAACACLQAYDQMgACACLQAZOgABQQAhBQwECyAFQYQBTwRAIAUQAAsgAigCFCIDQYQBTwRAIAMQAAsgASgCCCIDIAEoAgxHDQALCyAAQYAGOwEADAILIAAgAigCHDYCBAsgACAFOgAAIAIoAhQiAEGEAUkNACAAEAALIAJBIGokAAu+AgEEfyMAQSBrIgIkAAJAAkACQCABKAIIIgMgASgCDEcEQCABQRBqIQUDQCABIANBCGo2AgggAiADKAIAIAMoAgQQnwI2AhQCQCAFIAJBFGoQ0gIiBBAXQQFGBEAgAigCFCAFKAIAEC5BAUcNAQsCQCABKAIARQ0AIAEoAgQiBUGEAUkNACAFEAALIAEgBDYCBEEBIQQgAUEBNgIAIAJBCGogAygCACADKAIEEM8CIAJBGGogAigCCCACKAIMELUBIAItABgNAyAAIAItABk6AAFBACEEDAQLIARBhAFPBEAgBBAACyACKAIUIgNBhAFPBEAgAxAACyABKAIIIgMgASgCDEcNAAsLIABBgA47AQAMAgsgACACKAIcNgIECyAAIAQ6AAAgAigCFCIAQYQBSQ0AIAAQAAsgAkEgaiQAC6wEAQR/IwBBIGsiAyQAAkACQAJAIAEoAggiAiABKAIMRwRAIAFBEGohBQNAIAEgAkEIajYCCCADIAIoAgAgAigCBBCgAjYCFAJAIAUgA0EUahDVAiIEEBdBAUYEQCADKAIUIAUoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIFQYQBSQ0AIAUQAAsgASAENgIEQQEhBSABQQE2AgAgA0EIaiACKAIAIAIoAgQQzwIgA0EYaiEBAkACQAJAAkACQAJAAkAgAygCCCICIAMoAgwiBEGG0sAAQQkQsAJFBEAgAiAEQY/SwABBDhCwAg0BIAIgBEGd0sAAQQ4QsAINAiACIARBq9LAAEEUELACDQMgAiAEQb/SwABBCBCwAg0EIAIgBEHH0sAAQRQQsAINBSACIARB29LAAEEIELACDQYgAiAEQePSwABBCxCwAkUEQCABQQg6AAEMCAsgAUEHOgABDAcLIAFBADoAAQwGCyABQQE6AAEMBQsgAUECOgABDAQLIAFBAzoAAQwDCyABQQQ6AAEMAgsgAUEFOgABDAELIAFBBjoAAQsgAUEAOgAAIAMtABgNAyAAIAMtABk6AAFBACEFDAQLIARBhAFPBEAgBBAACyADKAIUIgJBhAFPBEAgAhAACyABKAIIIgIgASgCDEcNAAsLIABBgBI7AQAMAgsgACADKAIcNgIECyAAIAU6AAAgAygCFCIAQYQBSQ0AIAAQAAsgA0EgaiQAC9gDAQR/IwBBIGsiAiQAAkACQAJAIAEoAggiAyABKAIMRwRAIAFBEGohBQNAIAEgA0EIajYCCCACIAMoAgAgAygCBBCgAjYCFAJAIAUgAkEUahDVAiIEEBdBAUYEQCACKAIUIAUoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIFQYQBSQ0AIAUQAAsgASAENgIEQQEhBSABQQE2AgAgAkEIaiADKAIAIAMoAgQQzwIgAkEYaiEBAkACQAJAAkAgAigCCCIDIAIoAgwiBEGp98AAQRwQsAJFBEAgAyAEQcX3wABBFhCwAg0BIAMgBEHb98AAQRMQsAINAiADIARB7vfAAEEXELACDQMgAyAEQYX4wABBFRCwAkUEQCABQQU6AAEMBQsgAUEEOgABDAQLIAFBADoAAQwDCyABQQE6AAEMAgsgAUECOgABDAELIAFBAzoAAQsgAUEAOgAAIAItABgNAyAAIAItABk6AAFBACEFDAQLIARBhAFPBEAgBBAACyACKAIUIgNBhAFPBEAgAxAACyABKAIIIgMgASgCDEcNAAsLIABBgAw7AQAMAgsgACACKAIcNgIECyAAIAU6AAAgAigCFCIAQYQBSQ0AIAAQAAsgAkEgaiQAC74CAQR/IwBBIGsiAiQAAkACQAJAIAEoAggiAyABKAIMRwRAIAFBEGohBQNAIAEgA0EIajYCCCACIAMoAgAgAygCBBCgAjYCFAJAIAUgAkEUahDVAiIEEBdBAUYEQCACKAIUIAUoAgAQLkEBRw0BCwJAIAEoAgBFDQAgASgCBCIFQYQBSQ0AIAUQAAsgASAENgIEQQEhBCABQQE2AgAgAkEIaiADKAIAIAMoAgQQzwIgAkEYaiACKAIIIAIoAgwQtQEgAi0AGA0DIAAgAi0AGToAAUEAIQQMBAsgBEGEAU8EQCAEEAALIAIoAhQiA0GEAU8EQCADEAALIAEoAggiAyABKAIMRw0ACwsgAEGADjsBAAwCCyAAIAIoAhw2AgQLIAAgBDoAACACKAIUIgBBhAFJDQAgABAACyACQSBqJAALhAMBBH8jAEEgayICJAACQAJAAkAgASgCCCIDIAEoAgxHBEAgAUEQaiEEA0AgASADQQhqNgIIIAIgAygCACADKAIEEJ8CNgIUAkAgBCACQRRqENICIgUQF0EBRgRAIAIoAhQgBCgCABAuQQFHDQELAkAgASgCAEUNACABKAIEIgRBhAFJDQAgBBAACyABIAU2AgRBASEFIAFBATYCACACQQhqIAMoAgAgAygCBBDPAiACQRhqIQECQCACKAIIIgMgAigCDCIEQbzxwABBDhCwAkUEQCADIARByvHAAEEFELACRQRAIAFBAjoAAQwCCyABQQE6AAEMAQsgAUEAOgABCyABQQA6AAAgAi0AGA0DIAAgAi0AGToAAUEAIQUMBAsgBUGEAU8EQCAFEAALIAIoAhQiA0GEAU8EQCADEAALIAEoAggiAyABKAIMRw0ACwsgAEGABjsBAAwCCyAAIAIoAhw2AgQLIAAgBToAACACKAIUIgBBhAFJDQAgABAACyACQSBqJAALkAQBBH8jAEEgayIDJAACQAJAAkAgASgCCCICIAEoAgxHBEAgAUEQaiEFA0AgASACQQhqNgIIIAMgAigCACACKAIEEKACNgIUAkAgBSADQRRqENUCIgQQF0EBRgRAIAMoAhQgBSgCABAuQQFHDQELAkAgASgCAEUNACABKAIEIgVBhAFJDQAgBRAACyABIAQ2AgRBASEFIAFBATYCACADQQhqIAIoAgAgAigCBBDPAiADQRhqIQECQAJAAkACQAJAAkAgAygCCCICIAMoAgwiBEHT9cAAQQwQsAJFBEAgAiAEQd/1wABBCxCwAg0BIAIgBEHq9cAAQQ8QsAINAiACIARB+fXAAEEYELACDQMgAiAEQZH2wABBGBCwAg0EIAIgBEGp9sAAQQ0QsAINBSACIARBtvbAAEEXELACRQRAIAFBBzoAAQwHCyABQQY6AAEMBgsgAUEAOgABDAULIAFBAToAAQwECyABQQI6AAEMAwsgAUEDOgABDAILIAFBBDoAAQwBCyABQQU6AAELIAFBADoAACADLQAYDQMgACADLQAZOgABQQAhBQwECyAEQYQBTwRAIAQQAAsgAygCFCICQYQBTwRAIAIQAAsgASgCCCICIAEoAgxHDQALCyAAQYAQOwEADAILIAAgAygCHDYCBAsgACAFOgAAIAMoAhQiAEGEAUkNACAAEAALIANBIGokAAuEAwEEfyMAQSBrIgIkAAJAAkACQCABKAIIIgMgASgCDEcEQCABQRBqIQQDQCABIANBCGo2AgggAiADKAIAIAMoAgQQoAI2AhQCQCAEIAJBFGoQ1QIiBRAXQQFGBEAgAigCFCAEKAIAEC5BAUcNAQsCQCABKAIARQ0AIAEoAgQiBEGEAUkNACAEEAALIAEgBTYCBEEBIQUgAUEBNgIAIAJBCGogAygCACADKAIEEM8CIAJBGGohAQJAIAIoAggiAyACKAIMIgRButTAAEEGELACRQRAIAMgBEHA1MAAQQYQsAJFBEAgAUECOgABDAILIAFBAToAAQwBCyABQQA6AAELIAFBADoAACACLQAYDQMgACACLQAZOgABQQAhBQwECyAFQYQBTwRAIAUQAAsgAigCFCIDQYQBTwRAIAMQAAsgASgCCCIDIAEoAgxHDQALCyAAQYAGOwEADAILIAAgAigCHDYCBAsgACAFOgAAIAIoAhQiAEGEAUkNACAAEAALIAJBIGokAAuEAwEEfyMAQSBrIgIkAAJAAkACQCABKAIIIgMgASgCDEcEQCABQRBqIQQDQCABIANBCGo2AgggAiADKAIAIAMoAgQQoAI2AhQCQCAEIAJBFGoQ1QIiBRAXQQFGBEAgAigCFCAEKAIAEC5BAUcNAQsCQCABKAIARQ0AIAEoAgQiBEGEAUkNACAEEAALIAEgBTYCBEEBIQUgAUEBNgIAIAJBCGogAygCACADKAIEEM8CIAJBGGohAQJAIAIoAggiAyACKAIMIgRB3dPAAEEWELACRQRAIAMgBEHz08AAQQoQsAJFBEAgAUECOgABDAILIAFBAToAAQwBCyABQQA6AAELIAFBADoAACACLQAYDQMgACACLQAZOgABQQAhBQwECyAFQYQBTwRAIAUQAAsgAigCFCIDQYQBTwRAIAMQAAsgASgCCCIDIAEoAgxHDQALCyAAQYAGOwEADAILIAAgAigCHDYCBAsgACAFOgAAIAIoAhQiAEGEAUkNACAAEAALIAJBIGokAAudAgEEfyMAQRBrIgIkAAJAIAFBgAFPBEAgAkEMaiIEQQJyIQMgAkEANgIMAkAgAUGAEE8EQCAEQQNyIQUgAUGAgARPBEAgAkEQaiEDIAIgAUESdkHwAXI6AAwgAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAUhBAwCCyACIAFBDHZB4AFyOgAMIAIgAUEGdkE/cUGAAXI6AA0gAyEEIAUhAwwBCyACQQxqQQFyIQQgAiABQQZ2QcABcjoADAsgBCABQT9xQYABcjoAACAAIAJBDGogAxDzAQwBCyAAKAIIIgMgACgCAEYEQCAAQYzYwAAQqQELIAAoAgQgA2ogAToAACAAIANBAWo2AggLIAJBEGokAEEAC50CAQR/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQxqIgRBAnIhAyACQQA2AgwCQCABQYAQTwRAIARBA3IhBSABQYCABE8EQCACQRBqIQMgAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA0gBSEEDAILIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADSADIQQgBSEDDAELIAJBDGpBAXIhBCACIAFBBnZBwAFyOgAMCyAEIAFBP3FBgAFyOgAAIAAgAkEMaiADEPMBDAELIAAoAggiAyAAKAIARgRAIABB2N7AABCpAQsgACgCBCADaiABOgAAIAAgA0EBajYCCAsgAkEQaiQAQQALnQIBBH8jAEEQayICJAACQCABQYABTwRAIAJBDGoiBEECciEDIAJBADYCDAJAIAFBgBBPBEAgBEEDciEFIAFBgIAETwRAIAJBEGohAyACIAFBEnZB8AFyOgAMIAIgAUEGdkE/cUGAAXI6AA4gAiABQQx2QT9xQYABcjoADSAFIQQMAgsgAiABQQx2QeABcjoADCACIAFBBnZBP3FBgAFyOgANIAMhBCAFIQMMAQsgAkEMakEBciEEIAIgAUEGdkHAAXI6AAwLIAQgAUE/cUGAAXI6AAAgACACQQxqIAMQ8wEMAQsgACgCCCIDIAAoAgBGBEAgAEGY7cAAEKkBCyAAKAIEIANqIAE6AAAgACADQQFqNgIICyACQRBqJABBAAudAgEEfyMAQRBrIgIkAAJAIAFBgAFPBEAgAkEMaiIEQQJyIQMgAkEANgIMAkAgAUGAEE8EQCAEQQNyIQUgAUGAgARPBEAgAkEQaiEDIAIgAUESdkHwAXI6AAwgAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAUhBAwCCyACIAFBDHZB4AFyOgAMIAIgAUEGdkE/cUGAAXI6AA0gAyEEIAUhAwwBCyACQQxqQQFyIQQgAiABQQZ2QcABcjoADAsgBCABQT9xQYABcjoAACAAIAJBDGogAxDzAQwBCyAAKAIIIgMgACgCAEYEQCAAQfCCwQAQqQELIAAoAgQgA2ogAToAACAAIANBAWo2AggLIAJBEGokAEEAC50CAQR/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQxqIgRBAnIhAyACQQA2AgwCQCABQYAQTwRAIARBA3IhBSABQYCABE8EQCACQRBqIQMgAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA0gBSEEDAILIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADSADIQQgBSEDDAELIAJBDGpBAXIhBCACIAFBBnZBwAFyOgAMCyAEIAFBP3FBgAFyOgAAIAAgAkEMaiADEPMBDAELIAAoAggiAyAAKAIARgRAIABBhIbBABCpAQsgACgCBCADaiABOgAAIAAgA0EBajYCCAsgAkEQaiQAQQALiwIBAX8jAEEQayICJAAgACgCACEAAn8gASgCACABKAIIcgRAIAJBADYCDCABIAJBDGoCfyAAQYABTwRAIABBgBBPBEAgAEGAgARPBEAgAiAAQT9xQYABcjoADyACIABBEnZB8AFyOgAMIAIgAEEGdkE/cUGAAXI6AA4gAiAAQQx2QT9xQYABcjoADUEEDAMLIAIgAEE/cUGAAXI6AA4gAiAAQQx2QeABcjoADCACIABBBnZBP3FBgAFyOgANQQMMAgsgAiAAQT9xQYABcjoADSACIABBBnZBwAFyOgAMQQIMAQsgAiAAOgAMQQELEEYMAQsgASgCHCAAIAEoAiAoAhARAAALIAJBEGokAAuqAgIDfwF+IwBBQGoiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBJGoiBEEANgIAIAJCgICAgBA3AhwgAkEwaiADKAIAIgNBCGopAgA3AwAgAkE4aiADQRBqKQIANwMAIAIgAykCADcDKCACQRxqQbiBwAAgAkEoahBRGiACQRhqIAQoAgAiAzYCACACIAIpAhwiBTcDECABQQhqIAM2AgAgASAFNwIACyABKQIAIQUgAUKAgICAEDcCACACQQhqIgMgAUEIaiIBKAIANgIAIAFBADYCAEHRiMEALQAAGiACIAU3AwBBDEEEEMcCIgFFBEBBBEEMEOsCAAsgASACKQMANwIAIAFBCGogAygCADYCACAAQbCEwAA2AgQgACABNgIAIAJBQGskAAv8AQIBfgJ/IwBBgAFrIgQkACAAKAIAKQMAIQICfwJAIAEoAhQiAEEQcUUEQCAAQSBxDQEgAkEBIAEQbAwCC0EAIQADQCAAIARqQf8AaiACp0EPcSIDQTByIANB1wBqIANBCkkbOgAAIABBAWshACACQg9WIAJCBIghAg0ACyABQQFBkaHAAEECIAAgBGpBgAFqQQAgAGsQRQwBC0EAIQADQCAAIARqQf8AaiACp0EPcSIDQTByIANBN2ogA0EKSRs6AAAgAEEBayEAIAJCD1YgAkIEiCECDQALIAFBAUGRocAAQQIgACAEakGAAWpBACAAaxBFCyAEQYABaiQAC/4BAgN/BH4jAEEwayIDJAACQAJ/IAJB//8DcUGQzgBLBEBButvAACEFQRoMAQsgAVAEQEIAIQEMAgsgA0EgaiACQZDOAGqtQv//A4NCACABQgAQxQEgA0EQaiADKQMgIgEgA0EoaikDACIHQpDOAEIAEIUCIAMgAykDECIGIANBGGopAwAiCEKQzgBCABDFASAIIAYgASADKQMAIgl9IAcgA0EIaikDAH0gASAJVK19hEIAUq18IgEgBlStfFANAUH42sAAIQVBFgshAkEBIQQgBSACEAEhAgsgACAENgIMIAAgAkEAIAQbNgIIIABCACABIAQbNwMAIANB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//8Ag0KAgICAgICA+P8AWgRAIAJBATYCFCACQZTDwAA2AhAgAkIBNwIcIAJBNjYCLCACIAA2AiggAiACQShqNgIYIAEoAhwgASgCICACQRBqEFEhAwwBCyACQQA6AAwgAiABNgIIQQEhAyACQQE2AhQgAkGUw8AANgIQIAJCATcCHCACQTY2AiwgAiAANgIoIAIgAkEoajYCGCACQQhqIAJBEGoQ7wINACACLQAMRQRAIAFBnMPAAEECEMACDQELQQAhAwsgAkEwaiQAIAMLzgEBAn8jAEEwayICJAAgAiABNgIMAkAgARAvQQFHBEAgAkEMaiACQRBqQaDhwAAQVSEDIABBATYCACAAIAM2AgQgAUGEAUkNASABEAAMAQsgAkEQaiABEJcBIAIoAhAiAUUEQCAAIAIpAyA3AxAgAEEANgIAIAAgAkEoaikDADcDGCABRQ0BIAIoAhQiAEGEAUkNASAAEAAMAQtBk+PAAEHLABDGASEBIABBATYCACAAIAE2AgQgAigCFCIAQYQBSQ0AIAAQAAsgAkEwaiQAC84BAQJ/IwBBMGsiAiQAIAIgATYCDAJAIAEQL0EBRwRAIAJBDGogAkEQakGg4cAAEFQhAyAAQQE2AgAgACADNgIEIAFBhAFJDQEgARAADAELIAJBEGogARCXASACKAIQIgFFBEAgACACKQMgNwMQIABBADYCACAAIAJBKGopAwA3AxggAUUNASACKAIUIgBBhAFJDQEgABAADAELQZPjwABBywAQxgEhASAAQQE2AgAgACABNgIEIAIoAhQiAEGEAUkNACAAEAALIAJBMGokAAvEAQICfwJ+IwBBQGoiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxBaAn4gAigCEEUEQCAAIAIpAzA3AyAgACACKQMgNwMQIAAgAkE4aikDADcDKCAAIAJBKGopAwA3AxhCASEEQgAMAQsgACACKAIUNgIQQgIhBEIACyEFIAAgBDcDACAAIAU3AwgLIAJBQGskAAu2AQECfyMAQUBqIgMkACADQRhqIAIQChBgIAJBhAFPBEAgAhAACyADKAIYQQFHBEAgA0EIaiABIAMpAyAgAy8BKBBcIAACfyADKAIIRQRAIAMpAxAhAUEADAELIAMoAgwgAygCEBABIQRBAQsiAjYCDCAAIARBACACGzYCCCAAQgAgASACGzcDACADQUBrJAAPCyADIAMoAhw2AjAgA0E0aiADQTBqELsBIAMoAjggAygCPBDuAgALzgECAX8CfiMAQUBqIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARBbIAIoAhBFBEAgAikDMCEDIAIpAyAhBCAAIAJBKGopAwA3AxggACAENwMQIABCADcDCCAAQgE3AwAgACADNwMgDAELIAIoAhQhASAAQgA3AwggAEICNwMAIAAgATYCEAsgAkFAayQAC8EBAgN/AX4jAEEwayICJAAgASgCAEGAgICAeEYEQCABKAIMIQMgAkEUaiIEQQA2AgAgAkKAgICAEDcCDCACQSBqIAMoAgAiA0EIaikCADcDACACQShqIANBEGopAgA3AwAgAiADKQIANwMYIAJBDGpBuIHAACACQRhqEFEaIAJBCGogBCgCACIDNgIAIAIgAikCDCIFNwMAIAFBCGogAzYCACABIAU3AgALIABBsITAADYCBCAAIAE2AgAgAkEwaiQAC5YCAQJ/IwBBIGsiBSQAQeSIwQBB5IjBACgCACIGQQFqNgIAAkACf0EAIAZBAEgNABpBAUGwjMEALQAADQAaQbCMwQBBAToAAEGsjMEAQayMwQAoAgBBAWo2AgBBAgtB/wFxIgZBAkcEQCAGQQFxRQ0BIAVBCGogACABKAIYEQEAAAtB2IjBACgCACIGQQBIDQBB2IjBACAGQQFqNgIAQdiIwQBB3IjBACgCAAR/IAUgACABKAIUEQEAIAUgBDoAHSAFIAM6ABwgBSACNgIYIAUgBSkDADcCEEHciMEAKAIAIAVBEGpB4IjBACgCACgCFBEBAEHYiMEAKAIAQQFrBSAGCzYCAEGwjMEAQQA6AAAgA0UNAAALAAu3AQICfwJ+IwBBQGoiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxBbAn4gAigCEEUEQCAAIAIpAyA3AxAgACACKQMwNwMgIAAgAkEoaikDADcDGEIBIQRCAAwBCyAAIAIoAhQ2AhBCAiEEQgALIQUgACAENwMAIAAgBTcDCAsgAkFAayQAC6wBAQR/IwBBIGsiAiQAQQggACgCACIEQQFqIgMgBEEBdCIFIAMgBUsbIgMgA0EITRsiA0EASARAQQBBACABELsCAAtBACEFIAIgBAR/IAIgBDYCHCACIAAoAgQ2AhRBAQUgBQs2AhggAkEIaiADIAJBFGoQsgEgAigCCEEBRgRAIAIoAgwgAigCECABELsCAAsgAigCDCEBIAAgAzYCACAAIAE2AgQgAkEgaiQAC70BAgR/An4jAEEgayIBJAACQEEAQYDKwAAoAgARAwAiAgRAIAIoAgANASACQX82AgAgAUEIaiACQQRqIAAoAgAiAyAAKAIEIgAQeQJ/IAEoAhgiBEUEQCABKAIIDAELIAEpAwghBSABKQMQIQYgASADIAAQhwM2AhAgASAGNwIIIAQgBSABQQhqEJEBC0EEaygCABAKIAIgAigCAEEBajYCACABQSBqJAAPC0HwyMAAEPABAAtB7MrAABDxAQALhAECAn8BfiAAAn8CQCABrSIEQiCIpw0AIASnIgJB/////wdLDQAgAkUEQCAAQQE2AgggAEEANgIEQQAMAgtB0YjBAC0AABogAkEBEMcCIgMEQCAAIAM2AgggACABNgIEQQAMAgsgACACNgIIIABBATYCBEEBDAELIABBADYCBEEBCzYCAAusAQIDfwF+IwBBIGsiAyQAAkAgAkH//wNxIgVBkM4ATQRAIAFQIAVBkM4ARnINASADQRBqQpDOACACQf//AHEiAq19QgAgAkGQzgBLrX0gAUIAEMUBIAMgAykDECADQRhqKQMAQpDOAEIAEIUCIAMpAwAhBgwBC0EBIQRButvAAEEaEAEhAgsgACAENgIMIAAgAkEAIAQbNgIIIABCACAGIAQbNwMAIANBIGokAAuYAQIBfwR+IwBBEGsiAyQAIAMgABCYASADKQMIIQQgAykDACEFIAMgASACIAEgAkgbEDEQmAEgAykDCCEGIAMpAwAhByADIAEgAiABIAJKGxAxEJgBAn9BAyABIAJGDQAaQQEgBSAHWCAEIAZYIAQgBlEbDQAaIAUgAykDAFogBCADKQMIIgVaIAQgBVEbQQF0CyADQRBqJAALwQECAX8BfiMAQTBrIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARChASACKAIQRQRAIAIpAyAhAyAAIAJBKGopAwA3AxggACADNwMQIABCADcDCCAAQgE3AwAMAQsgAigCFCEBIABCADcDCCAAQgI3AwAgACABNgIQCyACQTBqJAALwQECAX8BfiMAQTBrIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARCiASACKAIQRQRAIAIpAyAhAyAAIAJBKGopAwA3AxggACADNwMQIABCADcDCCAAQgE3AwAMAQsgAigCFCEBIABCADcDCCAAQgI3AwAgACABNgIQCyACQTBqJAALrgECAn8CfiMAQTBrIgIkAAJAAkAgASgCAARAIAJBCGogARD7ASACKAIIDQELIABCADcDCCAAQgA3AwAMAQsgAigCDCEDIAEgASgCDEEBajYCDCACQRBqIAMQoQECfiACKAIQRQRAIAAgAikDIDcDECAAIAJBKGopAwA3AxhCASEEQgAMAQsgACACKAIUNgIQQgIhBEIACyEFIAAgBDcDACAAIAU3AwgLIAJBMGokAAuuAQICfwJ+IwBBMGsiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxCiAQJ+IAIoAhBFBEAgACACKQMgNwMQIAAgAkEoaikDADcDGEIBIQRCAAwBCyAAIAIoAhQ2AhBCAiEEQgALIQUgACAENwMAIAAgBTcDCAsgAkEwaiQAC4UBAQF/AkAgAUEATgRAAn8gAigCBARAIAIoAggiAwRAIAIoAgAgA0EBIAEQvgIMAgsLQQEgAUUNABpB0YjBAC0AABogAUEBEMcCCyICBEAgACABNgIIIAAgAjYCBCAAQQA2AgAPCyAAIAE2AgggAEEBNgIEDAELIABBADYCBAsgAEEBNgIAC8QBAgF/AXwjAEEgayICJAAgAiABKAIAEBYgAkEQaiACKAIAIAIrAwgQqQICQAJAIAIoAhBBAUYEQCACKwMYIQMgARDgAg0BCyAAQgA3AwAMAQsgAEIBNwMAIANEAAAAAAAA4MNmIQEgAEL///////////8AAn4gA5lEAAAAAAAA4ENjBEAgA7AMAQtCgICAgICAgICAfwtCgICAgICAgICAfyABGyADRP///////99DZBtCACADIANhGzcDCAsgAkEgaiQAC50BAQF/IwBBEGsiAiQAAkAgASgCABAgBEAgAkEEaiABENUBIABBCGogAkEMaigCADYCACAAIAIpAgQ3AgAMAQsgASgCABAaRQRAIABBgICAgHg2AgAMAQsgAiABKAIAEB0iATYCACACQQRqIAIQ1QEgAEEIaiACQQxqKAIANgIAIAAgAikCBDcCACABQYQBSQ0AIAEQAAsgAkEQaiQAC7kBAAJAAkACQAJAAkAgASACQZDwwABBCxCwAkUEQCABIAJBm/DAAEEMELACDQEgASACQafwwABBDhCwAg0CIAEgAkG18MAAQREQsAINAyABIAJBxvDAAEERELACDQQgASACQdfwwABBFBCwAkUEQCAAQQY6AAEMBgsgAEEFOgABDAULIABBADoAAQwECyAAQQE6AAEMAwsgAEECOgABDAILIABBAzoAAQwBCyAAQQQ6AAELIABBADoAAAuNAwEHfyMAQRBrIgckAAJAAkAgAkEHTQRAIAINAQwCCyAHQQhqIQYCQAJAAkACQCABQQNqQXxxIgMgAUYNACADIAFrIgMgAiACIANLGyIDRQ0AQQEhBQNAIAEgBGotAABBLkYNBCADIARBAWoiBEcNAAsgAyACQQhrIgVLDQIMAQsgAkEIayEFQQAhAwtBrty48QIhBANAQYCChAggASADaiIIKAIAQa7cuPECcyIJayAJckGAgoQIIAhBBGooAgBBrty48QJzIghrIAhycUGAgYKEeHFBgIGChHhHDQEgA0EIaiIDIAVNDQALCyACIANHBEBBLiEEQQEhBQNAIAEgA2otAABBLkYEQCADIQQMAwsgAiADQQFqIgNHDQALC0EAIQULIAYgBDYCBCAGIAU2AgAgBygCCEEBRiEGDAELIAJBAWshBCABIQMDQCADLQAAQS5GIgYNASADQQFqIQMgBCIFQQFrIQQgBQ0ACwsgACAGIAAtAARyOgAEIAAoAgAgASACEMACIAdBEGokAAuPAQECfyMAQUBqIgIkACACQgA3AzggAkE4aiAAKAIAEAMgAiACKAI8IgA2AjQgAiACKAI4NgIwIAIgADYCLCACQSI2AiggAkECNgIQIAJBiLzAADYCDCACQgE3AhggAiACQSxqIgM2AiQgAiACQSRqNgIUIAEoAhwgASgCICACQQxqEFEgAxDIASACQUBrJAALzggCBH8LfiMAQUBqIgMkACMAQeABayICJAAgAkHAAWogABCYASACQbABakKQzgBBkM4AIAFB//8DcSIAIABBkM4ATxsiAK0iBn1CACAAQZDOAEutfULAhD1CABDFASACQaABaiAGQgBCwIQ9QgAQxQEgAkHQAWoiACACKQOwASACQbgBaikDABB6IAIpA9ABIQcgAikD2AEhCyAAIAIpA6ABIgZCgMivoCV8IgkgAkGoAWopAwAgBiAJVq18IgoQeiACQSBqIAIpA9gBIgxCACACKQPQASIGQgAQxQEgAkGQAWogBkIAIAZCABDFASACQRBqIAtCACACKQPAASIIQgAQxQEgAiACKQPIASINQgAgB0IAEMUBIAJB0ABqIAhCACAHQgAQxQEgAkHwAGogAikDUCACQdgAaikDACIOIAIpAwAgAikDEHx8Ig9CoI0GQgAQhQIgAkEwaiANQgAgBiAMIAIpAyiEQgBSIAJBmAFqKQMAIhAgAikDICIHIAd8fCIHIBBUckF/cyACKQOQASAJVCAHIApUIAcgClEbca18IgdCABDFASACQUBrIAwgBiAHVq18IglCACAIQgAQxQEgAkHgAGogCEIAIAdCABDFASACQYABaiACKQNgIAJB6ABqKQMAIgcgAikDMCACKQNAfHwiCkKgjQZCABCFAiADQRBqIgBCx7ac4tr4KSACQfgAaikDACIGIA1CAFIiASALQgBScSACKQMIQgBSciACKQMYQgBSciAOIA9WciIEGzcDCCAAQvLm8Ib4+cORhH9C0PaEgBAgAikDcCIIIAhC0PaEgBBYG0LQ9oSAECAIIAZQGyAGUBsgBBs3AwAgAEKxifv/DyACQYgBaikDACIGQrGJ+/8PIAIpA4ABIghCr+fswKrm3901VCAGQrGJ+/8PVCAGQrGJ+/8PURsiBBsgASAJQgBScSACKQM4QgBSciACKQNIQgBSciAHIApWciIBGzcDGCAAQq/n7MCq5t/dNSAIQq/n7MCq5t/dNSAEGyABGzcDECACQeABaiQAIAMpAxAhBiADKQMYIQggAykDICEHIAMgA0EoaikDADcDKCADIAc3AyAgAyAINwMYIAMgBjcDECADQQA2AjwgA0EIaiEEIwBBMGsiASQAIAFBKGogA0E8ahDUAiABKAIsIQICfwJAIAEoAigiBUUNACABIAI2AiQgASAFNgIgIAFBGGogAUEgakGfzMAAQQwgABDoAQJAIAEoAhgEQCABKAIcIQIMAQsgAUEQaiABQSBqQavMwABBDCAAQRBqEOgBIAEoAhAEQCABKAIUIQIMAQsgAUEIaiABKAIgIAEoAiQQ0wIgASgCDCECIAEoAggMAgsgASgCJCIAQYQBSQ0AIAAQAAtBAQshACAEIAI2AgQgBCAANgIAIAFBMGokACADKAIIQQFxBEBBuO3AAEExEO4CAAsgAygCDCADQUBrJAALkgEBBH8jAEEQayICJABBASEEAkAgASgCHCIDQScgASgCICIFKAIQIgERAAANACACQQRqIAAoAgBBgQIQSQJAIAItAARBgAFGBEAgAyACKAIIIAERAABFDQEMAgsgAyACLQAOIgAgAkEEamogAi0ADyAAayAFKAIMEQIADQELIANBJyABEQAAIQQLIAJBEGokACAEC3sBAn8gAUH//wNxIgEEQCAAIAAgAW0iACABbGsiA0EfdSIEIABqIAFsIQAgASAEcSADaiEDAkACQCACQf8BcUECRwRAIANBAEwNAiACQQFxDQEMAgsgAyABQQF2SCADQQBMcg0BCyAAIAFqIQALIAAPC0HA1cAAEJsCAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQbjWwAA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEHg1sAAQTcgAkE/akHQ1sAAQeTXwAAQxwEACyAAIAIpAgw3AgAgAEEIaiACQRRqKAIANgIAIAJBQGskAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQejqwAA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEGQ68AAQTcgAkE/akGA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AAAAAGENACAAvSIDQjSIp0H/D3EiAkGyCEsNAAJAAkAgA0IAWQRAIAEgAEQAAAAAAAAwQ6BEAAAAAAAAMMOgIAChIgY5AwggAkH/B08NASABKwMIGkQAAAAAAAAAAAwECyABIABEAAAAAAAAMMOgRAAAAAAAADBDoCAAoSIGOQMIIAJB/wdJDQELIAYgAKAiAEQAAAAAAADwv6AgACAGRAAAAAAAAAAAZBsMAgsgASsDCBpEAAAAAAAA8L8hAAsgAAshACMAQRBrIgEkAAJ+QgAgAL0iA0KAgICAgICA+D9UDQAaIANCgICAgICAgPjHAFoEQEJ/QgAgA0KBgICAgICA+P8AVBsiBAwBCyABQgAgA0ILhkKAgICAgICAgIB/hEH+ACADQjSIp2tB/wBxEN4BIAEpAwAhBCABQQhqKQMACyEDIAUgBDcDACAFIAM3AwggAUEQaiQAQn8gBUEIaikDAEIAIABEAAAAAAAAAABmIgEbIABE////////70dkIgIbQn8gBSkDAEIAIAEbIAIbECcgBUEQaiQAC2wBAX8jAEEwayICJAAgAkEYaiAAKAIAECkgAkEQaiACKAIYIAIoAhwQzwIgAkEIaiACKAIQIAIoAhQQ/QEgAkEkaiIAIAIoAgggAigCDBC8AiACKAIoIAIoAiwgARDtAiAAEMgBIAJBMGokAAttAQF/IwBB4AFrIgEkACABIAAQChA0IABBhAFPBEAgABAACyABKAIAQQFGBEAgASABKAIENgLQASABQdQBaiABQdABahC8ASABKALYASABKALcARDuAgALIAEvAbwBIAEvAb4BRyABQeABaiQAC2YBAX8jAEEgayICJAAgAiAAIAEgACABShs2AhggAiAAIAEgACABSBs2AhQgAkEANgIcIAJBCGogAkEUaiACQRxqEJoBIAIoAghBAXEEQEG47cAAQTEQ7gIACyACKAIMIAJBIGokAAt1AQF/IwBBQGoiAyQAIAMgAjYCFCADIAE2AhAgAyAANgIMIANBAjYCHCADQbTqwAA2AhggA0ICNwIkIANBOjYCPCADQQI2AjQgAyADQTBqNgIgIAMgA0EQajYCOCADIANBDGo2AjAgA0EYahCbASADQUBrJAALdQEBfyMAQUBqIgMkACADIAI2AhQgAyABNgIQIAMgADYCDCADQQI2AhwgA0G06sAANgIYIANCAjcCJCADQTo2AjwgA0ECNgI0IAMgA0EwajYCICADIANBEGo2AjggAyADQQxqNgIwIANBGGoQnAEgA0FAayQAC2MBAX8jAEEQayIFJAAgBUEIaiABIAIgAyAEQQBHED0gBSgCDCEEIAAgBSgCCCIBBH8gASAEEAEhBEEBBUEACyICNgIIIAAgBEEAIAIbNgIEIABBACAEIAIbNgIAIAVBEGokAAtjAQF/IwBBEGsiBSQAIAVBCGogASACIAMgBEEARxBCIAUoAgwhBCAAIAUoAggiAQR/IAEgBBABIQRBAQVBAAsiAjYCCCAAIARBACACGzYCBCAAQQAgBCACGzYCACAFQRBqJAALawICfwF+IwBBEGsiBSQAIAUgASACIAMgBEEARxA8AkAgBSgCAEUEQCAFKQMIIQcMAQtBASEGIAUoAgQgBSgCCBABIQQLIAAgBjYCDCAAIARBACAGGzYCCCAAQgAgByAGGzcDACAFQRBqJAALawICfwF+IwBBEGsiBSQAIAUgASACIAMgBEEARxBdAkAgBSgCAEUEQCAFKQMIIQcMAQtBASEGIAUoAgQgBSgCCBABIQQLIAAgBjYCDCAAIARBACAGGzYCCCAAQgAgByAGGzcDACAFQRBqJAAL1wEBAn8jAEEgayIGJAAgAUUEQEHcv8AAQTIQ7gIACyAGQRRqIgcgASADIAQgBSACKAIQEQcAIwBBEGsiAyQAAkACQCAGQQhqIgIgBygCCCIBIAcoAgBJBH8gA0EIaiAHIAFBBEEEEJkBIAMoAggiAUGBgICAeEcNASAHKAIIBSABCzYCBCACIAcoAgQ2AgAgA0EQaiQADAELIAEgAygCDEHMv8AAELsCAAsgBiAGKAIIIAYoAgwQzwIgBigCBCEBIAAgBigCADYCACAAIAE2AgQgBkEgaiQAC6MBAQd/IwBBEGsiAiQAIAJBBGogASgCACIIEB8QqwEgAigCCCEEIAIoAgRBAUYEQCAEIAIoAgxB6MDAABC7AgALIAIoAgwhBRAFIgYQHCIHEB0hAyAHQYQBTwRAIAcQAAsgAyABKAIAIAUQHiADQYQBTwRAIAMQAAsgBkGEAU8EQCAGEAALIAAgCBAfNgIIIAAgBTYCBCAAIAQ2AgAgAkEQaiQAC2kCAX8BfiMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQaifwAA2AgggA0ICNwIUIANCgICAgCAiBCADrYQ3AyggAyAEIANBBGqthDcDICADIANBIGo2AhAgA0EIaiACEKMCAAuRDAIFfxJ+IwBBIGsiBSQAIAVBEGohBiMAQfACayIDJAAgA0HQAmogABCYAUGQzgAhAAJAAkACQAJAAkACQCADKQPYAiINIAMpA9ACIgsQJyABIAIQrQFB/wFxQQFrDgMDAQIACyADQdACaiIEIAEgAiABIAJIGxAxEJgBIAMpA9gCIRQgAykD0AIhEiAEIAEgAiABIAJKGxAxEJgBIANBoAFqIAtCACALQgAQxQEgA0GQAWogC0IAIA1CABDFASADQYABaiANQgAgDUIAEMUBIAMpA9gCIQkgAykD0AIhDiADQgE3A6gCIANCADcDoAIgA0IANwOYAiADQgA3A5ACIANCADcDyAIgA0IANwPAAiADIA03A7gCIAMgCzcDsAIgA0HoAmoiB0IANwMAIANB4AJqIgFCADcDACADQgA3A9gCIANCADcD0AIgA0GoAWopAwAhCiADKQOQASEIIANBmAFqKQMAIQwgAykDgAEhFSADQYgBaikDACEWIAMpA6ABIQ8gA0GwAmoiACAEEOUCDQMgA0GwAWogA0GQAmoiAiAAQQAQMiADQgE3A6gCIANCADcDoAIgA0IANwOYAiADQgA3A5ACIANCADcDyAIgA0IANwPAAiADIAk3A7gCIAMgDjcDsAIgB0IANwMAIAFCADcDACADQgA3A9gCIANCADcD0AIgACAEEOUCDQMgA0HQAWogAiAAQQAQMiADQfAAaiADKQOwASIQIAMpA9ABIhF9IglCACAPQn2DIg5CABDFASADQeAAaiADKQO4ASIPIAMpA9gBIhN9IBAgEVQiBK19IhBCACAOQgAQxQEgA0HQAGogCUIAIAggCnwiESAIfCIIQgAQxQEgA0FAayAQQgAgCEIAEMUBIANBMGogAykDwAEiFyADKQPgASIYfSIZIAQgDyATVCAPIBNRG60iD30gA0HIAWopAwAgA0HoAWopAwB9IBcgGFStfSAPIBlWrX0gDiAIEMUBIANBIGogCSAQIAwgCiARVq18IgkgFXwiCiAMIAggEVStfHwiCCAIIApUrSAWIAkgClatfHwQxQEgA0EQaiADKQNAIg4gAykDIHwiCCADKQMwfCIKIANB6ABqKQMAIANB+ABqKQMAIgkgAykDYHwiDCAJVK18fCIJIANB2ABqKQMAIAwgAykDUHwgDFStfHwiDEIAQpDOAEIAEMUBIAMgCSAMVq0gCSAKVK0gCCAKVq0gA0E4aikDACAIIA5UrSADQcgAaikDACADQShqKQMAfHx8fHx8IghCAEKQzgBCABDFASADQgA3A6gCIAMgAykDEEJwgzcDkAIgAyADQRhqKQMAIgogAykDAHwiCTcDmAIgAyADQQhqKQMAIAkgClStfDcDoAIgAyAMNwOwAiADIAggCyASfXwiCjcDuAIgAyANIBR9IAsgElStfSILIAggClatfCINNwPAAiADIAsgDVatNwPIAiAHQgA3AwAgAUIANwMAIANCADcD2AIgA0IANwPQAiADQbACaiADQdACahDlAg0DIANB8AFqIAIgAEEAEDJBkM4AIAMvAfABIgBrIQQMAgtBACEAQZDOACEEDAELQQAhAAsgBiAEOwECIAYgADsBACADQfACaiQADAELIANBADYC4AIgA0EBNgLUAiADQZjRwAA2AtACIANCBDcC2AIgA0HQAmpB7NDAABCjAgALIAUgBSgCEDYBGCAFQQA2AhwgBUEIaiECIAVBGGohAyMAQTBrIgAkACAAQShqIAVBHGoQ1AIgACgCLCEBAn8CQCAAKAIoIgRFDQAgACABNgIkIAAgBDYCICAAQRhqIABBIGpBrdHAACADEOsBAkAgACgCGARAIAAoAhwhAQwBCyAAQRBqIABBIGpBs9HAACADQQJqEOsBIAAoAhAEQCAAKAIUIQEMAQsgAEEIaiAAKAIgIAAoAiQQ0wIgACgCDCEBIAAoAggMAgsgACgCJCIDQYQBSQ0AIAMQAAtBAQshAyACIAE2AgQgAiADNgIAIABBMGokACAFKAIIQQFxBEBBuO3AAEExEO4CAAsgBSgCDCAFQSBqJAALZgAjAEEwayIAJABB0IjBAC0AAARAIABBAjYCDCAAQfiDwAA2AgggAEIBNwIUIAAgATYCLCAAIABBLGqtQoCAgIAghDcDICAAIABBIGo2AhAgAEEIakGghMAAEKMCAAsgAEEwaiQAC2gBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQQI2AgwgA0GMxcAANgIIIANCAjcCFCADQTo2AiwgA0E7NgIkIAMgADYCICADIANBIGo2AhAgAyADNgIoIANBCGoQmwEgA0EwaiQAC2gBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQQI2AgwgA0GQyMAANgIIIANCAjcCFCADQT42AiwgA0E7NgIkIAMgADYCICADIANBIGo2AhAgAyADNgIoIANBCGoQnAEgA0EwaiQAC2MBAn8jAEEQayIDJAAgAyABIAIQ3wEgAAJ/IAMoAgBFBEAgAykDCCEBQQAMAQsgAygCBCADKAIIEAEhBEEBCyICNgIMIAAgBEEAIAIbNgIIIABCACABIAIbNwMAIANBEGokAAtoAQF/IwBBMGsiAyQAIAMgAjYCBCADIAE2AgAgA0ECNgIMIANB9OnAADYCCCADQgI3AhQgA0E6NgIsIANBOzYCJCADIAA2AiAgAyADQSBqNgIQIAMgAzYCKCADQQhqEJwBIANBMGokAAtWAQF+AkAgA0HAAHFFBEAgA0UNASACIANBP3GtIgSGIAFBACADa0E/ca2IhCECIAEgBIYhAQwBCyABIANBP3GthiECQgAhAQsgACABNwMAIAAgAjcDCAtWAQF+AkAgA0HAAHFFBEAgA0UNASACQQAgA2tBP3GthiABIANBP3GtIgSIhCEBIAIgBIghAgwBCyACIANBP3GtiCEBQgAhAgsgACABNwMAIAAgAjcDCAv0AgICfwZ+IwBBEGsiAyQAQQEhBELAhD0gAq19IQVCACACQcCEPUutfSEGIwBBQGoiAiQAIAMCfwJAIAFQBEAgA0IANwMIDAELIAJBIGpCAEIAIAFCABDFASACQTBqIAFCAELAhD1CABDFASACKQMoQgBSIAJBOGopAwAiASACKQMgfCIHIAFUckUEQCAFIAaEUEUEQCACQRBqIAIpAzAiCCAHIAUgBhCFAiACIAIpAxAiCSACQRhqKQMAIgogBSAGEMUBIAogCSAIIAIpAwAiAX0gByACQQhqKQMAfSABIAhWrX2EQgBSrXwiASAJVK18UARAIAMgATcDCAwDCyADQRY2AgggA0H42sAANgIEQQEMAwtB6NrAABCaAgALIANBHTYCCCADQcvawAA2AgRBAQwBC0EACzYCACACQUBrJAACQCADKAIARQRAIAAgAykDCDcDCEEAIQQMAQsgACADKQIENwIECyAAIAQ2AgAgA0EQaiQAC/MBAQF/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f2ENABpBAiAnQoCAgICAgID4/wCDIiVCgICAgICAgPj/AFENABogJ0L/////////B4MiKUKAgICAgICACIQgJ0IBhkL+////////D4MgJ0I0iKdB/w9xIgEbIiZCAYMhKCAlUARAQQQgKVANARogAUGzCGshAEIBISUgKFAMAQtCgICAgICAgCAgJkIBhiAmQoCAgICAgIAIUSIAGyEmQgJCASAAGyElQct3Qcx3IAAbIAFqIQAgKFALIQEgCSAAOwHoCCAJICU3A+AIIAlCATcD2AggCSAmNwPQCCAJIAE6AOoIAkACfwJAAkACQAJAIAFBAmsiAwRAQQEhAUHLncAAQcydwAAgJ0IAUyIGG0HLncAAQQEgBhsgAhshGyAnQj+IpyACciEcQQMgAyADQQNPG0ECaw4CAgMBCyAJQQM2ApgIIAlBzZ3AADYClAggCUECOwGQCEEBIRtBASEBIAlBkAhqDAQLIAlBAzYCmAggCUHQncAANgKUCCAJQQI7AZAIIAlBkAhqDAMLQQIhASAJQQI7AZAIIBNFDQEgCSATNgKgCCAJQQA7AZwIIAlBAjYCmAggCUHJncAANgKUCCAJQZAIagwCC0F0QQUgAMEiAEEASBsgAGwiAEHA/QBJBEAgCUGQCGohDCAJQRBqIQogAEEEdkEVaiEHQYCAfkEAIBNrIBNBgIACTxshAQJAAkACfwJAAkACQAJAIAlB0AhqIhEpAwAiJVBFBEAgJUKAgICAgICAgCBaDQEgB0UNAkGgfyARLwEYIgBBIGsgACAlQoCAgIAQVCIAGyICQRBrIAIgJUIghiAlIAAbIiVCgICAgICAwABUIgAbIgJBCGsgAiAlQhCGICUgABsiJUKAgICAgICAgAFUIgAbIgJBBGsgAiAlQgiGICUgABsiJUKAgICAgICAgBBUIgAbIgJBAmsgAiAlQgSGICUgABsiJUKAgICAgICAgMAAVCIAGyAlQgKGICUgABsiJUIAWWsiA2vBQdAAbEGwpwVqQc4QbSIAQdEATw0DIABBBHQiAkGQjsAAaikDACImQv////8PgyInICUgJUJ/hUI/iIYiJUIgiCIofiIpQiCIICZCIIgiJiAofnwgJiAlQv////8PgyIlfiImQiCIfCApQv////8PgyAlICd+QiCIfCAmQv////8Pg3xCgICAgAh8QiCIfCIm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IAkoAsAIIAkoAsQIIAAgEyAJQZAIahB1IAkoAgwhASAJKAIIDAMLQQIhASAJQQI7AZAIIBNFBEBBASEBIAlBATYCmAggCUHTncAANgKUCCAJQZAIagwDCyAJIBM2AqAIIAlBADsBnAggCUECNgKYCCAJQcmdwAA2ApQIIAlBkAhqDAILQdSdwABBJUH8ncAAEP8BAAtBASEBIAlBATYCmAggCUHTncAANgKUCCAJQZAIagshACAJIAE2AswIIAkgADYCyAggCSAcNgLECCAJIBs2AsAIIAggCUHACGoQUiAJQfAIaiQADAELIABBKEHIssAAENoCAAsPCyABQQAhACMAQYABayIEJAAgP70hJgJ/QQMgP5lEAAAAAAAA8H9hDQAaQQIgJkKAgICAgICA+P8AgyIlQoCAgICAgID4/wBRDQAaICZC/////////weDIilCgICAgICAgAiEICZCAYZC/v///////w+DICZCNIinQf8PcSIAGyInQgGDISggJVAEQEEEIClQDQEaIABBswhrIQBCASElIChQDAELQoCAgICAgIAgICdCAYYgJ0KAgICAgICACFEiARshJ0ICQgEgARshJUHLd0HMdyABGyAAaiEAIChQCyEBIAQgADsBeCAEICU3A3AgBEIBNwNoIAQgJzcDYCAEIAE6AHoCfwJAAkACQCABQQJrIgEEQEEBIQBBy53AAEHMncAAICZCAFMiAxtBy53AAEEBIAMbIAIbIRggJkI/iKcgAnIhG0EDIAEgAUEDTxtBAmsOAgMCAQsgBEEDNgIoIARBzZ3AADYCJCAEQQI7ASBBASEYQQEhACAEQSBqDAMLIARBAzYCKCAEQdCdwAA2AiQgBEECOwEgIARBIGoMAgsgBEEgaiEHIARBD2oiDiEIIwBBMGsiAyQAAkACQAJ/AkACQAJAAkACQAJAAkACQCAEQeAAaiIMIgApAwAiJVBFBEAgACkDCCInUA0BIAApAxAiJlANAiAlICZ8IiYgJVQNAyAlICdUDQQgJkKAgICAgICAgCBaDQUgAyAALwEYIgA7AQggAyAlICd9Iic3AwAgACAAQSBrIAAgJkKAgICAEFQiARsiAkEQayACICZCIIYgJiABGyImQoCAgICAgMAAVCIBGyICQQhrIAIgJkIQhiAmIAEbIiZCgICAgICAgIABVCIBGyICQQRr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NgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQdr9wABBGBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQcj9wABBEhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQez+wABBHRDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYn/wABBFhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQZ//wABBGBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYP9wABBExDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQbf/wABBHhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQdX/wABBIhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQff/wABBFBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYuAwQBBERDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQZyAwQBBFBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQbCAwQBBGhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQcqAwQBBFxDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQfL9wABBGxDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQeGAwQBBGRDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALyQECA38BfiMAQRBrIgMkACADIAE2AgwjAEEwayICJAAgAkEIaiADQQxqIgQQswECQAJAIAIoAghBAUYEQCACKQMQIgVCAFkNAQsgBCACQS9qQdDfwAAQVSEEIABBAToAACAAIAQ2AgQMAQsgAAJ/IAVC/wFYBEAgACAFPAABQQAMAQsgAkEBOgAYIAIgBTcDICAAIAJBGGogAkEvakHQ38AAENwBNgIEQQELOgAACyACQTBqJAAgAUGEAU8EQCABEAALIANBEGokAAvKAQIDfwF+IwBBEGsiAyQAIAMgATYCDCMAQTBrIgIkACACQQhqIANBDGoiBBCzAQJAAkAgAigCCEEBRgRAIAIpAxAiBUIAWQ0BCyAEIAJBL2pB8N/AABBVIQQgAEEBOwEAIAAgBDYCBAwBCyAAAn8gBUL//wNYBEAgACAFPQECQQAMAQsgAkEBOgAYIAIgBTcDICAAIAJBGGogAkEvakHw38AAENwBNgIEQQELOwEACyACQTBqJAAgAUGEAU8EQCABEAALIANBEGokAAs3AQF/IwBBIGsiASQAIAFBADYCGCABQQE2AgwgAUHEs8AANgIIIAFCBDcCECABQQhqIAAQowIACzcBAX8jAEEgayIBJAAgAUEANgIYIAFBATYCDCABQYi0wAA2AgggAUIENwIQIAFBCGogABCjAgALLgAgAUH//wNxIgFFBEBB4NXAABCbAgALIAAgAWogACABbyIAIABBH3UgAXFqawuyAQECfyMAQRBrIgAkACABKAIcQfiCwABBCyABKAIgKAIMEQIAIQMgAEEIaiICQQA6AAUgAiADOgAEIAIgATYCACACIgEtAAQhAiABLQAFBEAgAQJ/QQEgAkEBcQ0AGiABKAIAIgEtABRBBHFFBEAgASgCHEGLocAAQQIgASgCICgCDBECAAwBCyABKAIcQYqhwABBASABKAIgKAIMEQIACyICOgAECyACQQFxIABBEGokAAsnAAJAIANFIAEgAxCmAkVyRQRAIAAgASADIAIQvgIiAA0BCwALIAAL5gECBH8CfiMAQRBrIgMkACADIAE2AgwgAyAANgIIAn8gA0EIaiECIwBBIGsiACQAAkBBAEH4xsAAKAIAEQMAIgEEQCABKAIADQEgAUF/NgIAIABBCGogAUEEaiACKAIA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AEEPdkEBcQthAQJ/AkACQCAAQQRrKAIAIgJBeHEiA0EEQQggAkEDcSICGyABak8EQCACQQAgAyABQSdqSxsNASAAEEwMAgtB+YHAAEEuQaiCwAAQ/wEAC0G4gsAAQS5B6ILAABD/AQALC2kBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQQI2AgwgA0HEtMAANgIIIANCAjcCFCADIANBBGqtQoCAgIAghDcDKCADIAOtQoCAgIAghDcDICADIANBIGo2AhAgA0EIaiACEKMCAAtpAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0ECNgIMIANB+LTAADYCCCADQgI3AhQgAyADQQRqrUKAgICAIIQ3AyggAyADrUKAgICAIIQ3AyAgAyADQSBqNgIQIANBCGogAhCjAgALCwAgACgCACABEHALDwBByJ7AAEErIAAQ/wEACw0AIAApAwBBASABEGwLDAAgACgCABAZQQBHCwwAIAAoAgAQG0EARwsNACAAKAIAIAEgAhArCwsAIAAgASACEMoBCw0AIAAQMSABIAIQ7gELDQAgACABIAIQygEQWAsMACAAIAFBIBDyAUULCwAgACMAaiQAIwALDQAgAEG4gcAAIAEQUQsMACAAIAEpAgA3AwALDQAgAEGQhcAAIAEQUQsOACABQYiFwABBBRDAAgsZACAAIAFB1IjBACgCACIAQQMgABsRAQAACw0AIABB7KDAACABEFELCgAgAiAAIAEQRgsJACAAIAEQBAALDQAgAEH4wMAAIAEQUQsLACAAIAEgAhDuAQsZAEEAIAAgASACEMoBEFhrEDEgASACEO4BCw4AIAFBsNPAAEEVEMACCw4AIAFBkNTAAEEfEMACCw4AIAFB2NTAAEESEMACCwcAIAAQyAELDgAgAUH018AAQQUQwAILDgAgAUHA3sAAQQUQwAILDgAgAUGv6cAAQRQQwAILDgAgAUHD6cAAQRQQwAILDQAgAEHo6sAAIAEQUQsOACABQYDtwABBBRDAAgsOACABQZzxwABBERDAAgsOACABQeDxwABBFhDAAgsOACABQcD1wABBExDAAgsOACABQYj3wABBIRDAAgsOACABQcT4wABBIRDAAgsOACABQeT6wABBFhDAAgsOACABQcj7wABBIBDAAgsNACABQej7wABBAhBGCw4AIAFB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SvMe4U5ANKFSHmHhU/BqYVRPb+FUnbxhVQDPYVZl0aFWANohVwDgoViu4iFa7OThW9DoYVwgAO5c8AF/XQBwAAcALQEBAQIBAgEBSAswFRABZQcCBgICAQQjAR4bWws6CQkBGAQBCQEDAQUrAzsJKhgBIDcBAQEECAQBAwcKAh0BOgEBAQIECAEJAQoCGgECAjkBBAIEAgIDAwEeAgMBCwI5AQQFAQIEARQCFgYBAToBAQIBBAgBBwMKAh4BOwEBAQwBCQEoAQMBNwEBAwUDAQQHAgsCHQE6AQICAQEDAwEEBwILAhwCOQIBAQIECAEJAQoCHQFIAQQBAgMBAQgBUQECBwwIYgECCQsHSQIbAQEBAQE3DgEFAQIFCwEkCQFmBAEGAQICAhkCBAMQBA0BAgIGAQ8BAAMABBwDHQIeAkACAQcIAQILCQEtAwEBdQIiAXYDBAIJAQYD2wICAToBAQcBAQEBAggGCgIBMB8xBDAKBAMmCQwCIAQCBjgBAQIDAQEFOAgCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLAQEsAzABAgQCAgIBJAFDBgICAgIMAQgBLwEzAQEDAgIFAgEBKgIIAe4BAgEEAQABABAQEAACAAHiAZUFAAMBAgUEKAMEAaUCAARBBQACTwRGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQEBCAQCAV8DAgQGAQIBnQEDCBUCOQIBAQEBDAEJAQ4HAwVDAQIGAQECAQEDBAMBAQ4CVQgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIIZQEBAQIEAQUACQEC9QEKBAQBkAQCAgQBIAooBgIECAEJBgIDLg0BAgAHAQYBAVIWAgcBAgECegYDAQECAQcBAUgCAwEBAQACCwI0BQUDFwEAAQYPAAwDAwAFOwcAAT8EUQELAgACAC4CFwAFAwYICAIHHgSUAwA3BDIIAQ4BFgUBDwAHARECBwECAQVkAaAHAAE9BAAE/gIAB20HAGCA8ABKc1ZhbHVlKCn/HRAACAAAAAceEAABAAAATGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkAAAYHhAAKgAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL29uY2VfY2VsbC0xLjIwLjMvc3JjL2xpYi5ycwAAAEweEABdAAAACAMAABkAAAByZWVudHJhbnQgaW5pdAAAvB4QAA4AAABMHhAAXQAAAHoCAAANAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvd2FzbS1iaW5kZ2VuLTAuMi4xMDAvc3JjL2NvbnZlcnQvc2xpY2VzLnJz5B4QAGwAAADoAAAAAQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL3dhc20tYmluZGdlbi0wLjIuMTAwL3NyYy9jb252ZXJ0L3NsaWNlcy5yc2AfEABsAAAAJAEAAA4AAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2pzLXN5cy0wLjMuNzcvc3JjL2xpYi5ycw4gEABaAAAA+xgAAAEAAAAAAAAACAAAAAQAAAA3AAAAOAAAADkAAABhIGJvb2xlYW5ieXRlIGFycmF5Ym9vbGVhbiBgYAAAAKMgEAAJAAAArCAQAAEAAABpbnRlZ2VyIGAAAADAIBAACQAAAKwgEAABAAAAZmxvYXRpbmcgcG9pbnQgYNwgEAAQAAAArCAQAAEAAABjaGFyYWN0ZXIgYAD8IBAACwAAAKwgEAABAAAAc3RyaW5nIAAYIRAABwAAAHVuaXQgdmFsdWVPcHRpb24gdmFsdWVuZXd0eXBlIHN0cnVjdHNlcXVlbmNlbWFwZW51bXVuaXQgdmFyaWFudG5ld3R5cGUgdmFyaWFudHR1cGxlIHZhcmlhbnRzdHJ1Y3QgdmFyaWFudAAAAAEAAAAAAAAALjBpMzJ1OHUxNnUzMnU2NGkxMjh1MTI4SGFzaCB0YWJsZSBjYXBhY2l0eSBvdmVyZmxvd7QhEAAcAAAAL3J1c3QvZGVwcy9oYXNoYnJvd24tMC4xNS4yL3NyYy9yYXcvbW9kLnJzAADYIRAAKgAAACMAAAAoAAAAL3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5ycxQiEABMAAAAKgIAABEAAABpbnZhbGlkIHR5cGU6ICwgZXhwZWN0ZWQgAAAAcCIQAA4AAAB+IhAACwAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAnCIQAE8AAAAUAQAAGQAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAAD8IhAASgAAAKIAAAAZAAAA//////////9YIxAAQfDGwAAL+wIBAAAAAAAAAD0AAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9zZXJkZS13YXNtLWJpbmRnZW4tMC42LjUvc3JjL2xpYi5ycwAAAHwjEABlAAAANQAAAA4AAABpbnZhbGlkIHR5cGU6ICwgZXhwZWN0ZWQgAAAA9CMQAA4AAAACJBAACwAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAICQQAE8AAAAUAQAAGQAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAACAJBAASgAAAKIAAAAZAAAAAAAAAP//////////4CQQAEH4ycAAC4EBAQAAAAAAAAA/AAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvc2VyZGUtd2FzbS1iaW5kZ2VuLTAuNS4wL3NyYy9saWIucnMAAAAEJRAAZQAAADUAAAAOAEGGy8AACxrwPwAAAAAAAPg/AAAAAAAAAAAG0M9D6/1MPgBBq8vAAAuiC0ADuOI/L2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL21hdGgvcHJpY2UucnMAsCUQAEcAAAAjAAAAGAAAAFNxcnRQcmljZVNsaXBwYWdlQm91bmRzbWluU3FydFByaWNlbWF4U3FydFByaWNlRGVjcmVhc2VMaXF1aWRpdHlRdW90ZWxpcXVpZGl0eURlbHRhdG9rZW5Fc3RBdG9rZW5Fc3RCdG9rZW5NaW5BdG9rZW5NaW5CSW5jcmVhc2VMaXF1aWRpdHlRdW90ZXRva2VuTWF4QXRva2VuTWF4QkNvbGxlY3RSZXdhcmRzUXVvdGVyZXdhcmRzQ29sbGVjdFJld2FyZFF1b3RlcmV3YXJkc093ZWRFeGFjdEluU3dhcFF1b3RldG9rZW5JbnRva2VuRXN0T3V0dG9rZW5NaW5PdXR0cmFkZUZlZXRyYWRlRmVlUmF0ZU1pbnRyYWRlRmVlUmF0ZU1heEV4YWN0T3V0U3dhcFF1b3RldG9rZW5PdXR0b2tlbkVzdEludG9rZW5NYXhJbi9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2V0aG51bS0xLjUuMC9zcmMvaW50cmluc2ljcy9uYXRpdmUvZGl2bW9kLnJzXicQAG4AAAAtAAAACgAAAF4nEABuAAAAaQAAACsAAABeJxAAbgAAAGsAAAAnAAAAXicQAG4AAACNAAAAEQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2V0aG51bS0xLjUuMC9zcmMvdWludC9vcHMucnMAAAwoEABeAAAAEQAAAAEAAABhdHRlbXB0IHRvIGRpdmlkZSBieSB6ZXJvAAAAfCgQABkAAABQb3NpdGlvblJhdGlvcmF0aW9BcmF0aW9CUG9zaXRpb25TdGF0dXNwcmljZUluUmFuZ2VwcmljZUJlbG93UmFuZ2VwcmljZUFib3ZlUmFuZ2VpbnZhbGlkUG9zaXRpb25GYWNhZGVsaXF1aWRpdHl0aWNrTG93ZXJJbmRleHRpY2tVcHBlckluZGV4ZmVlR3Jvd3RoQ2hlY2twb2ludEFmZWVPd2VkQWZlZUdyb3d0aENoZWNrcG9pbnRCZmVlT3dlZEJyZXdhcmRJbmZvcwAABikQAAkAAAAPKRAADgAAAB0pEAAOAAAAKykQABQAAAA/KRAACAAAAEcpEAAUAAAAWykQAAgAAABjKRAACwAAAHN0cnVjdCBQb3NpdGlvbkZhY2FkZVBvc2l0aW9uUmV3YXJkSW5mb0ZhY2FkZWdyb3d0aEluc2lkZUNoZWNrcG9pbnRhbW91bnRPd2VkAAAA3SkQABYAAADzKRAACgAAAHN0cnVjdCBQb3NpdGlvblJld2FyZEluZm9GYWNhZGVUcmFuc2ZlckZlZWZlZUJwc21heEZlZQAAOioQAAYAAABAKhAABgAAAHN0cnVjdCBUcmFuc2ZlckZlZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL3RpY2sucnNqKhAARgAAAB0AAAAKAAAAaioQAEYAAACGAAAAIAAAAGoqEABGAAAAoQAAACAAAABqKhAARgAAALQAAAAgAAAAaioQAEYAAADRAAAABQAAAGoqEABGAAAA/AAAABoAAABqKhAARgAAAD4BAAASAAAAVGljayBpbmRleCBub3QgaW4gYXJyYXkAQAAAAAwAAAAEAAAAQQAAAEIAAABDAEHY1sAAC5kGAQAAAEQAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAACXKxAASwAAAN8KAAAOAAAARXJyb3IAAACXKxAASwAAAI4FAAAbAAAAlysQAEsAAACNBQAAGwAAAJcrEABLAAAAZwQAABIAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9ldGhudW0tMS41LjAvc3JjL3VpbnQvb3BzLnJzAAAsLBAAXgAAABEAAAABAAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAJwsEAAZAAAAYXR0ZW1wdCB0byBjYWxjdWxhdGUgdGhlIHJlbWFpbmRlciB3aXRoIGEgZGl2aXNvciBvZiB6ZXJvAAAAwCwQADkAAAAvaG9tZS9ydW5uZXIvd29yay93aGlybHBvb2xzL3doaXJscG9vbHMvcnVzdC1zZGsvY29yZS9zcmMvbWF0aC90b2tlbi5yc0FyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93BC0QAEcAAABmAQAAFAAAAEFtb3VudCBleGNlZWRzIG1heCB1NjRTcXJ0IHByaWNlIG91dCBvZiBib3VuZHNJbnZhbGlkIHRyYW5zZmVyIGZlZUludmFsaWQgc2xpcHBhZ2UgdG9sZXJhbmNlWAAAAGFuIGFycmF5IG9mIGxlbmd0aCAA2C0QABMAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9zZXJkZS1iaWctYXJyYXktMC41LjEvc3JjL2NvbnN0X2dlbmVyaWNzLnJzAAAA9C0QAG0AAABtAAAANABB/NzAAAsdAQAAAEUAAABGAAAADAAAAAQAAABHAAAASAAAAEMAQaTdwAAL6gEBAAAASQAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAOMuEABLAAAA3woAAA4AAABFcnJvcgAAAOMuEABLAAAAjgUAABsAAADjLhAASwAAAI0FAAAbAAAA4y4QAEsAAABnBAAAEgAAAEFtb3VudCBleGNlZWRzIG1heCB1NjQAQZjfwAALBQEAAABKAEGo38AACwUBAAAASwBBuN/AAAsFAQAAAEsAQcjfwAALBQEAAABLAEHY38AACwUBAAAATABB6N/AAAsFAQAAAE0AQfjfwAALBQEAAABOAEGI4MAACwUBAAAATwBBmODAAAsFAQAAAFAAQajgwAALBQEAAABRAEG44MAACwUBAAAAUgBByODAAAsFAQAAAFMAQdjgwAALBQEAAABFAEHo4MAACwUBAAAAVABB+ODAAAsFAQAAAFUAQYjhwAALBQEAAABWAEGY4cAACwUBAAAAVwBBqOHAAAsFAQAAAFgAQbjhwAALBQEAAABZAEHI4cAACwUBAAAAWgBB2OHAAAsFAQAAAFsAQejhwAALBQEAAABcAEH44cAAC4UJAQAAAF0AAABDb3VsZG4ndCBkZXNlcmlhbGl6ZSB1NjQgZnJvbSBhIEJpZ0ludCBvdXRzaWRlIHU2NDo6TUlOLi51NjQ6Ok1BWCBib3VuZHNDb3VsZG4ndCBkZXNlcmlhbGl6ZSBpMTI4IGZyb20gYSBCaWdJbnQgb3V0c2lkZSBpMTI4OjpNSU4uLmkxMjg6Ok1BWCBib3VuZHNDb3VsZG4ndCBkZXNlcmlhbGl6ZSB1MTI4IGZyb20gYSBCaWdJbnQgb3V0c2lkZSB1MTI4OjpNSU4uLnUxMjg6Ok1BWCBib3VuZHN0cmFkZUVuYWJsZVRpbWVzdGFtcGFkYXB0aXZlRmVlQ29uc3RhbnRzYWRhcHRpdmVGZWVWYXJpYWJsZXNmaWx0ZXJQZXJpb2RkZWNheVBlcmlvZHJlZHVjdGlvbkZhY3RvcmFkYXB0aXZlRmVlQ29udHJvbEZhY3Rvcm1heFZvbGF0aWxpdHlBY2N1bXVsYXRvcnRpY2tHcm91cFNpemVtYWpvclN3YXBUaHJlc2hvbGRUaWNrc2xhc3RSZWZlcmVuY2VVcGRhdGVUaW1lc3RhbXBsYXN0TWFqb3JTd2FwVGltZXN0YW1wdm9sYXRpbGl0eVJlZmVyZW5jZXRpY2tHcm91cEluZGV4UmVmZXJlbmNldm9sYXRpbGl0eUFjY3VtdWxhdG9yZmVlVGllckluZGV4U2VlZHRpY2tTcGFjaW5nZmVlUmF0ZXByb3RvY29sRmVlUmF0ZWxpcXVpZGl0eXNxcnRQcmljZXRpY2tDdXJyZW50SW5kZXhmZWVHcm93dGhHbG9iYWxBZmVlR3Jvd3RoR2xvYmFsQnJld2FyZExhc3RVcGRhdGVkVGltZXN0YW1wcmV3YXJkSW5mb3NlbWlzc2lvbnNQZXJTZWNvbmRYNjRncm93dGhHbG9iYWxYNjR0aWNrTG93ZXJJbmRleHRpY2tVcHBlckluZGV4ZmVlR3Jvd3RoQ2hlY2twb2ludEFmZWVPd2VkQWZlZUdyb3d0aENoZWNrcG9pbnRCZmVlT3dlZEJncm93dGhJbnNpZGVDaGVja3BvaW50YW1vdW50T3dlZGluaXRpYWxpemVkbGlxdWlkaXR5TmV0bGlxdWlkaXR5R3Jvc3NmZWVHcm93dGhPdXRzaWRlQWZlZUdyb3d0aE91dHNpZGVCcmV3YXJkR3Jvd3Roc091dHNpZGVzdGFydFRpY2tJbmRleHRpY2tzZmVlQnBzbWF4RmVlYW4gYXJyYXkgb2YgbGVuZ3RoIDJhbiBhcnJheSBvZiBsZW5ndGggM2ludmFsaWQgdmFsdWU6ICwgZXhwZWN0ZWQgAAAA1zQQAA8AAADmNBAACwAAAG1pc3NpbmcgZmllbGQgYGAENRAADwAAABM1EAABAAAAaW52YWxpZCBsZW5ndGggACQ1EAAPAAAA5jQQAAsAAABkdXBsaWNhdGUgZmllbGQgYAAAAEQ1EAARAAAAEzUQAAEAAABfAAAADAAAAAQAAABgAAAAYQAAAEMAQYjrwAAL7gYBAAAAYgAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAMc1EABLAAAA3woAAA4AAAAvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zbGljZS5ycwAAJDYQAEoAAACiAAAAGQAAAEVycm9yAAAAxzUQAEsAAACOBQAAGwAAAMc1EABLAAAAjQUAABsAAADHNRAASwAAAGcEAAASAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcF90aHJvdygpYCBvbiBhbiBgRXJyYCB2YWx1ZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL2FkYXB0aXZlX2ZlZS5ycwDpNhAATgAAANIAAAAZAAAA6TYQAE4AAADHAAAAGQAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGXpNhAATgAAALkAAAARAAAARGl2aXNvciBtdXN0IGJlIHBvc2l0aXZlLgAAAJA3EAAZAAAA6TYQAE4AAADnAQAABQAAAEFyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93VGlja1JhbmdldGlja0xvd2VySW5kZXh0aWNrVXBwZXJJbmRleFRpY2tGYWNhZGVpbml0aWFsaXplZGxpcXVpZGl0eU5ldGxpcXVpZGl0eUdyb3NzZmVlR3Jvd3RoT3V0c2lkZUFmZWVHcm93dGhPdXRzaWRlQnJld2FyZEdyb3d0aHNPdXRzaWRlABA4EAALAAAAGzgQAAwAAAAnOBAADgAAADU4EAARAAAARjgQABEAAABXOBAAFAAAAHN0cnVjdCBUaWNrRmFjYWRlVGlja0FycmF5RmFjYWRlc3RhcnRUaWNrSW5kZXh0aWNrcwC8OBAADgAAAMo4EAAFAAAAc3RydWN0IFRpY2tBcnJheUZhY2FkZQBBgPLAAAvAAgEAAABjAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQAAAAAABAAAAAQAAABkAAAAVHJ5RnJvbUludEVycm9yL2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL21hdGgvYWRhcHRpdmVfZmVlLnJzSW52YWxpZCB0aW1lc3RhbXAAAFM5EABOAAAA4AEAAA4AAAAvaG9tZS9ydW5uZXIvd29yay93aGlybHBvb2xzL3doaXJscG9vbHMvcnVzdC1zZGsvY29yZS9zcmMvbWF0aC9idW5kbGUucnPEORAASAAAAD0AAAAUAAAAAAAAAP//////////////////////////////////////////AEHg9MAAC9EMT3JhY2xlRmFjYWRldHJhZGVFbmFibGVUaW1lc3RhbXBhZGFwdGl2ZUZlZUNvbnN0YW50c2FkYXB0aXZlRmVlVmFyaWFibGVzbDoQABQAAACAOhAAFAAAAJQ6EAAUAAAAc3RydWN0IE9yYWNsZUZhY2FkZWZpbHRlclBlcmlvZGRlY2F5UGVyaW9kcmVkdWN0aW9uRmFjdG9yYWRhcHRpdmVGZWVDb250cm9sRmFjdG9ybWF4Vm9sYXRpbGl0eUFjY3VtdWxhdG9ydGlja0dyb3VwU2l6ZW1ham9yU3dhcFRocmVzaG9sZFRpY2tzAAAA0zoQAAwAAADfOhAACwAAAOo6EAAPAAAA+ToQABgAAAAROxAAGAAAACk7EAANAAAANjsQABcAAABzdHJ1Y3QgQWRhcHRpdmVGZWVDb25zdGFudHNGYWNhZGVsYXN0UmVmZXJlbmNlVXBkYXRlVGltZXN0YW1wbGFzdE1ham9yU3dhcFRpbWVzdGFtcHZvbGF0aWxpdHlSZWZlcmVuY2V0aWNrR3JvdXBJbmRleFJlZmVyZW5jZXZvbGF0aWxpdHlBY2N1bXVsYXRvcgAAqTsQABwAAADFOxAAFgAAANs7EAATAAAA7jsQABcAAAAFPBAAFQAAAHN0cnVjdCBBZGFwdGl2ZUZlZVZhcmlhYmxlc0ZhY2FkZVdoaXJscG9vbEZhY2FkZWZlZVRpZXJJbmRleFNlZWR0aWNrU3BhY2luZ2ZlZVJhdGVwcm90b2NvbEZlZVJhdGVsaXF1aWRpdHlzcXJ0UHJpY2V0aWNrQ3VycmVudEluZGV4ZmVlR3Jvd3RoR2xvYmFsQWZlZUdyb3d0aEdsb2JhbEJyZXdhcmRMYXN0VXBkYXRlZFRpbWVzdGFtcHJld2FyZEluZm9zdDwQABAAAACEPBAACwAAAI88EAAHAAAAljwQAA8AAAClPBAACQAAAK48EAAJAAAAtzwQABAAAADHPBAAEAAAANc8EAAQAAAA5zwQABoAAAABPRAACwAAAHN0cnVjdCBXaGlybHBvb2xGYWNhZGVXaGlybHBvb2xSZXdhcmRJbmZvRmFjYWRlZW1pc3Npb25zUGVyU2Vjb25kWDY0Z3Jvd3RoR2xvYmFsWDY0AJM9EAAVAAAAqD0QAA8AAABzdHJ1Y3QgV2hpcmxwb29sUmV3YXJkSW5mb0ZhY2FkZSgpY2FsbGVkIGBPcHRpb246OnVud3JhcF90aHJvdygpYCBvbiBhIGBOb25lYCB2YWx1ZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL3RpY2tfYXJyYXkucnNUaWNrIGFycmF5IG5vdCBldmVubHkgc3BhY2VkVGljayBzZXF1ZW5jZSBlbXB0eQAAGz4QAEwAAABFAAAADAAAABs+EABMAAAATAAAADgAAAAbPhAATAAAAE8AAAANAAAASW52YWxpZCB0aWNrIGluZGV4VGljayBpbmRleCBvdXQgb2YgYm91bmRzSW52YWxpZCB0aWNrIGFycmF5IHNlcXVlbmNlL2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL3R5cGVzL3RpY2tfYXJyYXkucnMAAA0/EABNAAAAQgAAABEAAABBcml0aG1ldGljIG92ZXItIG9yIHVuZGVyZmxvd0Ftb3VudCBleGNlZWRzIG1heCB1NjRTcXJ0IHByaWNlIG91dCBvZiBib3VuZHNTcXJ0IHByaWNlIGxpbWl0IG91dCBvZiBib3VuZHNJbnZhbGlkIHNxcnQgcHJpY2UgbGltaXQgZGlyZWN0aW9uWmVybyB0cmFkYWJsZSBhbW91bnRJbnZhbGlkIHRpbWVzdGFtcEludmFsaWQgdHJhbnNmZXIgZmVlSW52YWxpZCBzbGlwcGFnZSB0b2xlcmFuY2VUaWNrIGluZGV4IG5vdCBpbiBhcnJheUludmFsaWQgYWRhcHRpdmUgZmVlIGluZm9Db2xsZWN0RmVlc1F1b3RlZmVlT3dlZEFmZWVPd2VkQgAAZQAAAAwAAAAEAAAAZgAAAGcAAABDAEG8gcEAC4kDAQAAAGgAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAAD7QBAASwAAAN8KAAAOAAAARXJyb3IAAAD7QBAASwAAAI4FAAAbAAAA+0AQAEsAAACNBQAAGwAAAPtAEABLAAAAZwQAABIAAABTcXJ0IHByaWNlIGxpbWl0IG91dCBvZiBib3VuZHNaZXJvIHRyYWRhYmxlIGFtb3VudEFyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93SW52YWxpZCBhZGFwdGl2ZSBmZWUgaW5mb0ludmFsaWQgc3FydCBwcmljZSBsaW1pdCBkaXJlY3Rpb25BbW91bnQgZXhjZWVkcyBtYXggdTY0aQAAAAwAAAAEAAAAagAAAGsAAABDAEHQhMEAC98DAQAAAGwAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAACPQhAASwAAAN8KAAAOAAAARXJyb3IAAACPQhAASwAAAI4FAAAbAAAAj0IQAEsAAACNBQAAGwAAAI9CEABLAAAAZwQAABIAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9ldGhudW0tMS41LjAvc3JjL3VpbnQvb3BzLnJzAAAkQxAAXgAAABEAAAABAAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAJRDEAAZAAAAYXR0ZW1wdCB0byBjYWxjdWxhdGUgdGhlIHJlbWFpbmRlciB3aXRoIGEgZGl2aXNvciBvZiB6ZXJvAAAAuEMQADkAAABBcml0aG1ldGljIG92ZXItIG9yIHVuZGVyZmxvd0Ftb3VudCBleGNlZWRzIG1heCB1NjQAQciIwQALASMASAlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQIGd2FscnVzBjAuMjMuMwx3YXNtLWJpbmRnZW4TMC4yLjEwMCAoMjQwNWVjMmI0KQ==", _o = async (A = {}, I) => {
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
let y;
function Zo(A) {
  y = A;
}
const RA = new Array(128).fill(void 0);
RA.push(void 0, null, !0, !1);
function R(A) {
  return RA[A];
}
let lI = 0, SI = null;
function UI() {
  return (SI === null || SI.byteLength === 0) && (SI = new Uint8Array(y.memory.buffer)), SI;
}
const Wo = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let JI = new Wo("utf-8");
const jo = typeof JI.encodeInto == "function" ? function(A, I) {
  return JI.encodeInto(A, I);
} : function(A, I) {
  const g = JI.encode(A);
  return I.set(g), {
    read: A.length,
    written: g.length
  };
};
function Gg(A, I, g) {
  if (g === void 0) {
    const i = JI.encode(A), e = I(i.length, 1) >>> 0;
    return UI().subarray(e, e + i.length).set(i), lI = i.length, e;
  }
  let B = A.length, C = I(B, 1) >>> 0;
  const Q = UI();
  let E = 0;
  for (; E < B; E++) {
    const i = A.charCodeAt(E);
    if (i > 127) break;
    Q[C + E] = i;
  }
  if (E !== B) {
    E !== 0 && (A = A.slice(E)), C = g(C, B, B = E + A.length * 3, 1) >>> 0;
    const i = UI().subarray(C + E, C + B), e = jo(A, i);
    E += e.written, C = g(C, B, E, 1) >>> 0;
  }
  return lI = E, C;
}
let ZA = null;
function J() {
  return (ZA === null || ZA.buffer.detached === !0 || ZA.buffer.detached === void 0 && ZA.buffer !== y.memory.buffer) && (ZA = new DataView(y.memory.buffer)), ZA;
}
let sI = RA.length;
function d(A) {
  sI === RA.length && RA.push(RA.length + 1);
  const I = sI;
  return sI = RA[I], RA[I] = A, I;
}
function Sg(A, I) {
  try {
    return A.apply(this, I);
  } catch (g) {
    y.__wbindgen_export_2(d(g));
  }
}
function Xo(A) {
  A < 132 || (RA[A] = sI, sI = A);
}
function v(A) {
  const I = R(A);
  return Xo(A), I;
}
function z(A) {
  return A == null;
}
function Dg(A) {
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
    C > 0 && (Q += Dg(A[0]));
    for (let E = 1; E < C; E++)
      Q += ", " + Dg(A[E]);
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
const zo = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let MC = new zo("utf-8", { ignoreBOM: !0, fatal: !0 });
MC.decode();
function Fg(A, I) {
  return A = A >>> 0, MC.decode(UI().subarray(A, A + I));
}
function aB(A, I, g) {
  return y.priceToTickIndex(A, I, g);
}
function vo(A, I) {
  const g = y.getSqrtPriceSlippageBounds(d(A), I);
  return v(g);
}
function Po() {
  return y._POSITION_BUNDLE_SIZE() >>> 0;
}
function $A(A, I) {
  return y.getTickArrayStartTickIndex(A, I);
}
function sB(A, I, g) {
  return y.getInitializableTickIndex(A, I, z(g) ? 16777215 : g ? 1 : 0);
}
function $o(A, I) {
  const g = y.orderTickIndexes(A, I);
  return v(g);
}
function mI(A, I, g) {
  try {
    const E = y.__wbindgen_add_to_stack_pointer(-16);
    y.getTickIndexInArray(E, A, I, g);
    var B = J().getInt32(E + 4 * 0, !0), C = J().getInt32(E + 4 * 1, !0), Q = J().getInt32(E + 4 * 2, !0);
    if (Q)
      throw v(C);
    return B >>> 0;
  } finally {
    y.__wbindgen_add_to_stack_pointer(16);
  }
}
function uC(A, I, g, B, C, Q) {
  try {
    const o = y.__wbindgen_add_to_stack_pointer(-16);
    y.collectFeesQuote(o, d(A), d(I), d(g), d(B), z(C) ? 0 : d(C), z(Q) ? 0 : d(Q));
    var E = J().getInt32(o + 4 * 0, !0), i = J().getInt32(o + 4 * 1, !0), e = J().getInt32(o + 4 * 2, !0);
    if (e)
      throw v(i);
    return v(E);
  } finally {
    y.__wbindgen_add_to_stack_pointer(16);
  }
}
function GC(A, I, g, B, C, Q, E, i) {
  try {
    const n = y.__wbindgen_add_to_stack_pointer(-16);
    y.collectRewardsQuote(n, d(A), d(I), d(g), d(B), C, z(Q) ? 0 : d(Q), z(E) ? 0 : d(E), z(i) ? 0 : d(i));
    var e = J().getInt32(n + 4 * 0, !0), o = J().getInt32(n + 4 * 1, !0), t = J().getInt32(n + 4 * 2, !0);
    if (t)
      throw v(o);
    return v(e);
  } finally {
    y.__wbindgen_add_to_stack_pointer(16);
  }
}
function At(A, I, g, B, C, Q, E) {
  try {
    const t = y.__wbindgen_add_to_stack_pointer(-16);
    y.decreaseLiquidityQuote(t, d(A), I, d(g), B, C, z(Q) ? 0 : d(Q), z(E) ? 0 : d(E));
    var i = J().getInt32(t + 4 * 0, !0), e = J().getInt32(t + 4 * 1, !0), o = J().getInt32(t + 4 * 2, !0);
    if (o)
      throw v(e);
    return v(i);
  } finally {
    y.__wbindgen_add_to_stack_pointer(16);
  }
}
function It(A, I, g, B, C, Q, E) {
  try {
    const t = y.__wbindgen_add_to_stack_pointer(-16);
    y.decreaseLiquidityQuoteA(t, A, I, d(g), B, C, z(Q) ? 0 : d(Q), z(E) ? 0 : d(E));
    var i = J().getInt32(t + 4 * 0, !0), e = J().getInt32(t + 4 * 1, !0), o = J().getInt32(t + 4 * 2, !0);
    if (o)
      throw v(e);
    return v(i);
  } finally {
    y.__wbindgen_add_to_stack_pointer(16);
  }
}
function gt(A, I, g, B, C, Q, E) {
  try {
    const t = y.__wbindgen_add_to_stack_pointer(-16);
    y.decreaseLiquidityQuoteB(t, A, I, d(g), B, C, z(Q) ? 0 : d(Q), z(E) ? 0 : d(E));
    var i = J().getInt32(t + 4 * 0, !0), e = J().getInt32(t + 4 * 1, !0), o = J().getInt32(t + 4 * 2, !0);
    if (o)
      throw v(e);
    return v(i);
  } finally {
    y.__wbindgen_add_to_stack_pointer(16);
  }
}
function Bt(A, I) {
  const g = String(R(I)), B = Gg(g, y.__wbindgen_export_0, y.__wbindgen_export_1), C = lI;
  J().setInt32(A + 4 * 1, C, !0), J().setInt32(A + 4 * 0, B, !0);
}
function Ct(A) {
  const I = R(A).buffer;
  return d(I);
}
function Qt() {
  return Sg(function(A, I) {
    const g = R(A).call(R(I));
    return d(g);
  }, arguments);
}
function Et(A) {
  return R(A).done;
}
function it() {
  return Sg(function(A, I) {
    const g = Reflect.get(R(A), R(I));
    return d(g);
  }, arguments);
}
function et(A, I) {
  const g = R(A)[I >>> 0];
  return d(g);
}
function ot(A, I) {
  const g = R(A)[R(I)];
  return d(g);
}
function tt(A, I) {
  const g = R(A)[R(I)];
  return d(g);
}
function nt(A) {
  let I;
  try {
    I = R(A) instanceof ArrayBuffer;
  } catch {
    I = !1;
  }
  return I;
}
function rt(A) {
  let I;
  try {
    I = R(A) instanceof Uint8Array;
  } catch {
    I = !1;
  }
  return I;
}
function at(A) {
  return Array.isArray(R(A));
}
function st(A) {
  return Number.isSafeInteger(R(A));
}
function ct() {
  return d(Symbol.iterator);
}
function Dt(A) {
  return R(A).length;
}
function wt(A) {
  return R(A).length;
}
function lt() {
  const A = new Object();
  return d(A);
}
function Nt() {
  const A = new Array();
  return d(A);
}
function ht(A) {
  const I = new Uint8Array(R(A));
  return d(I);
}
function dt(A) {
  const I = R(A).next;
  return d(I);
}
function Rt() {
  return Sg(function(A) {
    const I = R(A).next();
    return d(I);
  }, arguments);
}
function kt(A, I, g) {
  R(A)[I >>> 0] = v(g);
}
function yt(A, I, g) {
  R(A)[v(I)] = v(g);
}
function Mt(A, I, g) {
  R(A).set(R(I), g >>> 0);
}
function ut(A) {
  const I = R(A).value;
  return d(I);
}
function Gt(A) {
  return +R(A);
}
function St(A) {
  return d(A);
}
function Ft(A, I) {
  const g = BigInt.asUintN(64, A) << BigInt(64) | BigInt.asUintN(64, I);
  return d(g);
}
function ft(A) {
  const I = BigInt.asUintN(64, A);
  return d(I);
}
function Ut(A, I) {
  const g = R(I), B = typeof g == "bigint" ? g : void 0;
  J().setBigInt64(A + 8 * 1, z(B) ? BigInt(0) : B, !0), J().setInt32(A + 4 * 0, !z(B), !0);
}
function Jt(A) {
  const I = R(A);
  return typeof I == "boolean" ? I ? 1 : 0 : 2;
}
function Yt(A, I) {
  const g = Dg(R(I)), B = Gg(g, y.__wbindgen_export_0, y.__wbindgen_export_1), C = lI;
  J().setInt32(A + 4 * 1, C, !0), J().setInt32(A + 4 * 0, B, !0);
}
function Lt(A, I) {
  const g = new Error(Fg(A, I));
  return d(g);
}
function mt(A, I) {
  return R(A) in R(I);
}
function pt(A) {
  return Array.isArray(R(A));
}
function Kt(A) {
  return typeof R(A) == "bigint";
}
function bt(A) {
  return typeof R(A) == "function";
}
function Ht(A) {
  const I = R(A);
  return typeof I == "object" && I !== null;
}
function Tt(A) {
  return R(A) === void 0;
}
function qt(A, I) {
  return R(A) === R(I);
}
function Ot(A, I) {
  return R(A) == R(I);
}
function xt() {
  const A = y.memory;
  return d(A);
}
function Vt(A, I) {
  const g = R(I), B = typeof g == "number" ? g : void 0;
  J().setFloat64(A + 8 * 1, z(B) ? 0 : B, !0), J().setInt32(A + 4 * 0, !z(B), !0);
}
function _t(A) {
  return d(A);
}
function Zt(A) {
  const I = R(A);
  return d(I);
}
function Wt(A) {
  v(A);
}
function jt(A, I) {
  const g = R(A) >> R(I);
  return d(g);
}
function Xt(A, I) {
  const g = R(I), B = typeof g == "string" ? g : void 0;
  var C = z(B) ? 0 : Gg(B, y.__wbindgen_export_0, y.__wbindgen_export_1), Q = lI;
  J().setInt32(A + 4 * 1, Q, !0), J().setInt32(A + 4 * 0, C, !0);
}
function zt(A, I) {
  const g = Fg(A, I);
  return d(g);
}
function vt(A, I) {
  throw new Error(Fg(A, I));
}
URL = globalThis.URL;
const Pt = await _o({ "./orca_whirlpools_core_js_bindings_bg.js": {
  __wbindgen_object_drop_ref: Wt,
  __wbindgen_string_new: zt,
  __wbindgen_bigint_get_as_i64: Ut,
  __wbindgen_debug_string: Yt,
  __wbindgen_throw: vt,
  __wbindgen_memory: xt,
  __wbindgen_string_get: Xt,
  __wbg_get_67b2ba62fc30de12: it,
  __wbg_get_b9b93047fe3cf45b: et,
  __wbg_length_e2d2a49132c1b256: wt,
  __wbindgen_object_clone_ref: Zt,
  __wbindgen_is_function: bt,
  __wbg_new_78feb108b6472713: Nt,
  __wbindgen_number_new: _t,
  __wbindgen_is_object: Ht,
  __wbg_next_25feadfc0913fea9: dt,
  __wbg_next_6574e1a8a62d1055: Rt,
  __wbg_done_769e5ede4b31c67b: Et,
  __wbg_value_cd1ffa7b1ab794f1: ut,
  __wbg_iterator_9a24c88df860dc65: ct,
  __wbg_call_672a4d21634d4a24: Qt,
  __wbg_new_405e22f390576ce2: lt,
  __wbindgen_number_get: Vt,
  __wbindgen_is_undefined: Tt,
  __wbg_set_37837023f3d740e8: kt,
  __wbg_isArray_a1eab7e0d067391b: at,
  __wbg_instanceof_ArrayBuffer_e14585432e3737fc: nt,
  __wbg_isSafeInteger_343e2beeeece1bb0: st,
  __wbg_buffer_609cc3eee51ed158: Ct,
  __wbg_new_a12002a7f91c75be: ht,
  __wbg_set_65595bdd868b3009: Mt,
  __wbg_length_a446193dc22c12f8: Dt,
  __wbg_instanceof_Uint8Array_17156bcf118086a9: rt,
  __wbindgen_jsval_loose_eq: Ot,
  __wbindgen_boolean_get: Jt,
  __wbindgen_as_number: Gt,
  __wbindgen_error_new: Lt,
  __wbindgen_bigint_from_i64: St,
  __wbindgen_bigint_from_u64: ft,
  __wbindgen_bigint_from_u128: Ft,
  __wbg_getwithrefkey_1dc361bd10053bfe: ot,
  __wbg_String_eecc4a11987127d6: Bt,
  __wbg_getwithrefkey_6550b2c093d2eb18: tt,
  __wbg_set_3807d5f0bfc24aa7: yt,
  __wbindgen_shr: jt,
  __wbindgen_jsval_eq: qt,
  __wbindgen_in: mt,
  __wbindgen_is_bigint: Kt,
  __wbindgen_is_array: pt
} }, Vo), {
  memory: $t,
  getTickArrayStartTickIndex: An,
  tickIndexToSqrtPrice: In,
  sqrtPriceToTickIndex: gn,
  getInitializableTickIndex: Bn,
  getPrevInitializableTickIndex: Cn,
  getNextInitializableTickIndex: Qn,
  isTickIndexInBounds: En,
  isTickInitializable: en,
  invertTickIndex: on,
  invertSqrtPrice: tn,
  getFullRangeTickIndexes: nn,
  orderTickIndexes: rn,
  isFullRangeOnly: an,
  getTickIndexInArray: sn,
  collectFeesQuote: cn,
  _REDUCTION_FACTOR_DENOMINATOR: Dn,
  _ADAPTIVE_FEE_CONTROL_FACTOR_DENOMINATOR: wn,
  _MAX_REFERENCE_AGE: ln,
  _TICK_ARRAY_NOT_EVENLY_SPACED: Nn,
  _TICK_INDEX_OUT_OF_BOUNDS: hn,
  _INVALID_TICK_INDEX: dn,
  _ARITHMETIC_OVERFLOW: Rn,
  _AMOUNT_EXCEEDS_MAX_U64: kn,
  _SQRT_PRICE_OUT_OF_BOUNDS: yn,
  _TICK_SEQUENCE_EMPTY: Mn,
  _SQRT_PRICE_LIMIT_OUT_OF_BOUNDS: un,
  _INVALID_SQRT_PRICE_LIMIT_DIRECTION: Gn,
  _ZERO_TRADABLE_AMOUNT: Sn,
  _INVALID_TIMESTAMP: Fn,
  _INVALID_TRANSFER_FEE: fn,
  _INVALID_SLIPPAGE_TOLERANCE: Un,
  _TICK_INDEX_NOT_IN_ARRAY: Jn,
  _INVALID_TICK_ARRAY_SEQUENCE: Yn,
  _INVALID_ADAPTIVE_FEE_INFO: Ln,
  _VOLATILITY_ACCUMULATOR_SCALE_FACTOR: mn,
  _FEE_RATE_HARD_LIMIT: pn,
  decreaseLiquidityQuote: Kn,
  decreaseLiquidityQuoteA: bn,
  decreaseLiquidityQuoteB: Hn,
  increaseLiquidityQuote: Tn,
  increaseLiquidityQuoteA: qn,
  increaseLiquidityQuoteB: On,
  _NUM_REWARDS: xn,
  isInitializedWithAdaptiveFee: Vn,
  collectRewardsQuote: _n,
  tryGetAmountDeltaA: Zn,
  tryGetAmountDeltaB: Wn,
  tryGetNextSqrtPriceFromA: jn,
  tryGetNextSqrtPriceFromB: Xn,
  tryApplyTransferFee: zn,
  tryReverseApplyTransferFee: vn,
  tryGetMaxAmountWithSlippageTolerance: Pn,
  tryGetMinAmountWithSlippageTolerance: $n,
  tryApplySwapFee: Ar,
  tryReverseApplySwapFee: Ir,
  swapQuoteByInputToken: gr,
  swapQuoteByOutputToken: Br,
  _TICK_ARRAY_SIZE: Cr,
  _FULL_RANGE_ONLY_TICK_SPACING_THRESHOLD: Qr,
  _MIN_TICK_INDEX: Er,
  _MAX_TICK_INDEX: ir,
  priceToSqrtPrice: er,
  sqrtPriceToPrice: or,
  invertPrice: tr,
  tickIndexToPrice: nr,
  priceToTickIndex: rr,
  getSqrtPriceSlippageBounds: ar,
  firstUnoccupiedPositionInBundle: sr,
  isPositionBundleFull: cr,
  isPositionBundleEmpty: Dr,
  _POSITION_BUNDLE_SIZE: wr,
  _FEE_RATE_DENOMINATOR: lr,
  isPositionInRange: Nr,
  positionStatus: hr,
  positionRatio: dr,
  __wbindgen_export_0: Rr,
  __wbindgen_export_1: kr,
  __wbindgen_export_2: yr,
  __wbindgen_add_to_stack_pointer: Mr
} = Pt, ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _ADAPTIVE_FEE_CONTROL_FACTOR_DENOMINATOR: wn,
  _AMOUNT_EXCEEDS_MAX_U64: kn,
  _ARITHMETIC_OVERFLOW: Rn,
  _FEE_RATE_DENOMINATOR: lr,
  _FEE_RATE_HARD_LIMIT: pn,
  _FULL_RANGE_ONLY_TICK_SPACING_THRESHOLD: Qr,
  _INVALID_ADAPTIVE_FEE_INFO: Ln,
  _INVALID_SLIPPAGE_TOLERANCE: Un,
  _INVALID_SQRT_PRICE_LIMIT_DIRECTION: Gn,
  _INVALID_TICK_ARRAY_SEQUENCE: Yn,
  _INVALID_TICK_INDEX: dn,
  _INVALID_TIMESTAMP: Fn,
  _INVALID_TRANSFER_FEE: fn,
  _MAX_REFERENCE_AGE: ln,
  _MAX_TICK_INDEX: ir,
  _MIN_TICK_INDEX: Er,
  _NUM_REWARDS: xn,
  _POSITION_BUNDLE_SIZE: wr,
  _REDUCTION_FACTOR_DENOMINATOR: Dn,
  _SQRT_PRICE_LIMIT_OUT_OF_BOUNDS: un,
  _SQRT_PRICE_OUT_OF_BOUNDS: yn,
  _TICK_ARRAY_NOT_EVENLY_SPACED: Nn,
  _TICK_ARRAY_SIZE: Cr,
  _TICK_INDEX_NOT_IN_ARRAY: Jn,
  _TICK_INDEX_OUT_OF_BOUNDS: hn,
  _TICK_SEQUENCE_EMPTY: Mn,
  _VOLATILITY_ACCUMULATOR_SCALE_FACTOR: mn,
  _ZERO_TRADABLE_AMOUNT: Sn,
  __wbindgen_add_to_stack_pointer: Mr,
  __wbindgen_export_0: Rr,
  __wbindgen_export_1: kr,
  __wbindgen_export_2: yr,
  collectFeesQuote: cn,
  collectRewardsQuote: _n,
  decreaseLiquidityQuote: Kn,
  decreaseLiquidityQuoteA: bn,
  decreaseLiquidityQuoteB: Hn,
  firstUnoccupiedPositionInBundle: sr,
  getFullRangeTickIndexes: nn,
  getInitializableTickIndex: Bn,
  getNextInitializableTickIndex: Qn,
  getPrevInitializableTickIndex: Cn,
  getSqrtPriceSlippageBounds: ar,
  getTickArrayStartTickIndex: An,
  getTickIndexInArray: sn,
  increaseLiquidityQuote: Tn,
  increaseLiquidityQuoteA: qn,
  increaseLiquidityQuoteB: On,
  invertPrice: tr,
  invertSqrtPrice: tn,
  invertTickIndex: on,
  isFullRangeOnly: an,
  isInitializedWithAdaptiveFee: Vn,
  isPositionBundleEmpty: Dr,
  isPositionBundleFull: cr,
  isPositionInRange: Nr,
  isTickIndexInBounds: En,
  isTickInitializable: en,
  memory: $t,
  orderTickIndexes: rn,
  positionRatio: dr,
  positionStatus: hr,
  priceToSqrtPrice: er,
  priceToTickIndex: rr,
  sqrtPriceToPrice: or,
  sqrtPriceToTickIndex: gn,
  swapQuoteByInputToken: gr,
  swapQuoteByOutputToken: Br,
  tickIndexToPrice: nr,
  tickIndexToSqrtPrice: In,
  tryApplySwapFee: Ar,
  tryApplyTransferFee: zn,
  tryGetAmountDeltaA: Zn,
  tryGetAmountDeltaB: Wn,
  tryGetMaxAmountWithSlippageTolerance: Pn,
  tryGetMinAmountWithSlippageTolerance: $n,
  tryGetNextSqrtPriceFromA: jn,
  tryGetNextSqrtPriceFromB: Xn,
  tryReverseApplySwapFee: Ir,
  tryReverseApplyTransferFee: vn
}, Symbol.toStringTag, { value: "Module" }));
Zo(ur);
var SC = /* @__PURE__ */ ((A) => (A[A.Uninitialized = 0] = "Uninitialized", A[A.Initialized = 1] = "Initialized", A[A.Frozen = 2] = "Frozen", A))(SC || {});
function Gr() {
  return vB(SC);
}
function Sr() {
  return eA(NA(), 36);
}
function tI() {
  return eA(NA(), 64);
}
function Fr() {
  return WB(
    [
      ["Uninitialized", HA()],
      [
        "TransferFeeConfig",
        F(
          k([
            ["transferFeeConfigAuthority", h()],
            ["withdrawWithheldAuthority", h()],
            ["withheldAmount", U()],
            ["olderTransferFee", cB()],
            ["newerTransferFee", cB()]
          ]),
          f()
        )
      ],
      [
        "TransferFeeAmount",
        F(
          k([["withheldAmount", U()]]),
          f()
        )
      ],
      [
        "MintCloseAuthority",
        F(
          k([["closeAuthority", h()]]),
          f()
        )
      ],
      [
        "ConfidentialTransferMint",
        F(
          k([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["autoApproveNewAccounts", EA()],
            [
              "auditorElgamalPubkey",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          f()
        )
      ],
      [
        "ConfidentialTransferAccount",
        F(
          k([
            ["approved", EA()],
            ["elgamalPubkey", h()],
            ["pendingBalanceLow", tI()],
            ["pendingBalanceHigh", tI()],
            ["availableBalance", tI()],
            ["decryptableAvailableBalance", Sr()],
            ["allowConfidentialCredits", EA()],
            ["allowNonConfidentialCredits", EA()],
            ["pendingBalanceCreditCounter", U()],
            ["maximumPendingBalanceCreditCounter", U()],
            ["expectedPendingBalanceCreditCounter", U()],
            ["actualPendingBalanceCreditCounter", U()]
          ]),
          f()
        )
      ],
      [
        "DefaultAccountState",
        F(
          k([["state", Gr()]]),
          f()
        )
      ],
      [
        "ImmutableOwner",
        F(k([]), f())
      ],
      [
        "MemoTransfer",
        F(
          k([
            ["requireIncomingTransferMemos", EA()]
          ]),
          f()
        )
      ],
      [
        "NonTransferable",
        F(k([]), f())
      ],
      [
        "InterestBearingConfig",
        F(
          k([
            ["rateAuthority", h()],
            ["initializationTimestamp", U()],
            ["preUpdateAverageRate", jg()],
            ["lastUpdateTimestamp", U()],
            ["currentRate", jg()]
          ]),
          f()
        )
      ],
      [
        "CpiGuard",
        F(
          k([["lockCpi", EA()]]),
          f()
        )
      ],
      [
        "PermanentDelegate",
        F(
          k([["delegate", h()]]),
          f()
        )
      ],
      [
        "NonTransferableAccount",
        F(k([]), f())
      ],
      [
        "TransferHook",
        F(
          k([
            ["authority", h()],
            ["programId", h()]
          ]),
          f()
        )
      ],
      [
        "TransferHookAccount",
        F(
          k([["transferring", EA()]]),
          f()
        )
      ],
      [
        "ConfidentialTransferFee",
        F(
          k([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["elgamalPubkey", h()],
            ["harvestToMintEnabled", EA()],
            ["withheldAmount", tI()]
          ]),
          f()
        )
      ],
      [
        "ConfidentialTransferFeeAmount",
        F(
          k([["withheldAmount", tI()]]),
          f()
        )
      ],
      [
        "MetadataPointer",
        F(
          k([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            [
              "metadataAddress",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          f()
        )
      ],
      [
        "TokenMetadata",
        F(
          k([
            [
              "updateAuthority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["mint", h()],
            ["name", F(oI(), iA())],
            ["symbol", F(oI(), iA())],
            ["uri", F(oI(), iA())],
            [
              "additionalMetadata",
              _E(
                F(oI(), iA()),
                F(oI(), iA())
              )
            ]
          ]),
          f()
        )
      ],
      [
        "GroupPointer",
        F(
          k([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            [
              "groupAddress",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          f()
        )
      ],
      [
        "TokenGroup",
        F(
          k([
            [
              "updateAuthority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["mint", h()],
            ["size", U()],
            ["maxSize", U()]
          ]),
          f()
        )
      ],
      [
        "GroupMemberPointer",
        F(
          k([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            [
              "memberAddress",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          f()
        )
      ],
      [
        "TokenGroupMember",
        F(
          k([
            ["mint", h()],
            ["group", h()],
            ["memberNumber", U()]
          ]),
          f()
        )
      ],
      ["ConfidentialMintBurn", HA()],
      [
        "ScaledUiAmountConfig",
        F(
          k([
            ["authority", h()],
            ["multiplier", og()],
            ["newMultiplierEffectiveTimestamp", U()],
            ["newMultiplier", og()]
          ]),
          f()
        )
      ],
      [
        "PausableConfig",
        F(
          k([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["paused", EA()]
          ]),
          f()
        )
      ],
      ["PausableAccount", HA()]
    ],
    { size: f() }
  );
}
function cB() {
  return k([
    ["epoch", U()],
    ["maximumFee", U()],
    ["transferFeeBasisPoints", f()]
  ]);
}
function fr() {
  return k([
    [
      "mintAuthority",
      V(h(), {
        prefix: iA(),
        noneValue: "zeroes"
      })
    ],
    ["supply", U()],
    ["decimals", OA()],
    ["isInitialized", EA()],
    [
      "freezeAuthority",
      V(h(), {
        prefix: iA(),
        noneValue: "zeroes"
      })
    ],
    [
      "extensions",
      V(
        VE(
          JA(Fr(), { size: "remainder" }),
          [xB(eE(CA(), 83).encode(1))]
        ),
        { prefix: null }
      )
    ]
  ]);
}
function Ur(A) {
  return yA(
    A,
    fr()
  );
}
async function Jr(A, I, g) {
  const B = await fg(A, I, g);
  return HI(B), B;
}
async function fg(A, I, g) {
  return (await II(A, I, g)).map((C) => Ur(C));
}
var Yr = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", NI = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
function Lr(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function mr(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const B = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: Lr(g.value),
      role: DB(g.value) ? OI(B) : B,
      ...DB(g.value) ? { signer: g.value } : {}
    });
  };
}
function DB(A) {
  return !!A && typeof A == "object" && "address" in A && BI(A);
}
var pr = 1;
function Kr() {
  return K(
    T([["discriminator", CA()]]),
    (A) => ({
      ...A,
      discriminator: pr
    })
  );
}
function br(A, I) {
  const g = Yr, C = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    ata: { value: A.ata ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 },
    mint: { value: A.mint ?? null, isWritable: !1 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 },
    tokenProgram: { value: A.tokenProgram ?? null, isWritable: !1 }
  };
  C.tokenProgram.value || (C.tokenProgram.value = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"), C.systemProgram.value || (C.systemProgram.value = "11111111111111111111111111111111");
  const Q = mr(g);
  return Object.freeze({
    accounts: [
      Q(C.payer),
      Q(C.ata),
      Q(C.owner),
      Q(C.mint),
      Q(C.systemProgram),
      Q(C.tokenProgram)
    ],
    data: Kr().encode({}),
    programAddress: g
  });
}
function BA(A, I) {
  if (!A) throw new Error(I || "Assertion failed");
}
BA.ok = BA;
function Hr() {
  return k([
    [
      "mintAuthority",
      V(h(), {
        prefix: iA(),
        noneValue: "zeroes"
      })
    ],
    ["supply", U()],
    ["decimals", OA()],
    ["isInitialized", EA()],
    [
      "freezeAuthority",
      V(h(), {
        prefix: iA(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function Tr(A) {
  return yA(
    A,
    Hr()
  );
}
async function qr(A, I, g) {
  const B = await Or(A, I, g);
  return HI(B), B;
}
async function Or(A, I, g) {
  return (await II(A, I, g)).map((C) => Tr(C));
}
var FC = /* @__PURE__ */ ((A) => (A[A.Uninitialized = 0] = "Uninitialized", A[A.Initialized = 1] = "Initialized", A[A.Frozen = 2] = "Frozen", A))(FC || {});
function xr() {
  return vB(FC);
}
function fC() {
  return k([
    ["mint", h()],
    ["owner", h()],
    ["amount", U()],
    [
      "delegate",
      V(h(), {
        prefix: iA(),
        noneValue: "zeroes"
      })
    ],
    ["state", xr()],
    [
      "isNative",
      V(U(), {
        prefix: iA(),
        noneValue: "zeroes"
      })
    ],
    ["delegatedAmount", U()],
    [
      "closeAuthority",
      V(h(), {
        prefix: iA(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function Vr(A) {
  return yA(
    A,
    fC()
  );
}
async function _r(A, I, g) {
  return (await II(A, I, g)).map((C) => Vr(C));
}
function Zr() {
  return 165;
}
var Wr = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", kI = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
function jr(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function UC(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const B = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: jr(g.value),
      role: wB(g.value) ? OI(B) : B,
      ...wB(g.value) ? { signer: g.value } : {}
    });
  };
}
function wB(A) {
  return !!A && typeof A == "object" && "address" in A && BI(A);
}
var Xr = 9;
function zr() {
  return K(
    T([["discriminator", CA()]]),
    (A) => ({ ...A, discriminator: Xr })
  );
}
function vr(A, I) {
  const g = kI, C = {
    account: { value: A.account ?? null, isWritable: !0 },
    destination: { value: A.destination ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 }
  }, E = ({ ...A }.multiSigners ?? []).map(
    (e) => ({
      address: e.address,
      role: W.READONLY_SIGNER,
      signer: e
    })
  ), i = UC(g);
  return Object.freeze({
    accounts: [
      i(C.account),
      i(C.destination),
      i(C.owner),
      ...E
    ],
    data: zr().encode({}),
    programAddress: g
  });
}
async function ZI(A, I = {}) {
  const {
    programAddress: g = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
  } = I;
  return await hI({
    programAddress: g,
    seeds: [
      sA().encode(A.owner),
      sA().encode(A.tokenProgram),
      sA().encode(A.mint)
    ]
  });
}
var Pr = 18;
function $r() {
  return K(
    T([
      ["discriminator", CA()],
      ["owner", sA()]
    ]),
    (A) => ({ ...A, discriminator: Pr })
  );
}
function Aa(A, I) {
  const g = kI, C = {
    account: { value: A.account ?? null, isWritable: !0 },
    mint: { value: A.mint ?? null, isWritable: !1 }
  }, Q = { ...A }, E = UC(g);
  return Object.freeze({
    accounts: [E(C.account), E(C.mint)],
    data: $r().encode(
      Q
    ),
    programAddress: g
  });
}
var jA = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr", AI = p(
  "11111111111111111111111111111111"
), Ia = 32896, ga = CI(AI), Ug = ga, Ba = 100, JC = Ba, Ca = "keypair", lB = Ca, WA = p(
  "So11111111111111111111111111111111111111112"
);
function Qa(A) {
  return A != WA;
}
async function Jg(A, I, g) {
  const B = Array.isArray(g) ? g : Object.keys(g), Q = B.indexOf(WA) !== -1, E = await qr(A, B.filter(Qa)), i = await Promise.all(
    E.map(
      (r) => ZI({
        owner: I.address,
        mint: r.address,
        tokenProgram: r.programAddress
      }).then((l) => l[0])
    )
  ), e = await _r(A, i), o = {}, t = [], n = [];
  for (let r = 0; r < E.length; r++) {
    const l = E[r], c = e[r];
    o[l.address] = c.address, !c.exists && t.push(
      br({
        payer: I,
        owner: I.address,
        ata: c.address,
        mint: l.address,
        tokenProgram: l.programAddress
      })
    );
  }
  if (!Array.isArray(g))
    for (let r = 0; r < E.length; r++) {
      if (E[r].address === WA && lB !== "none")
        continue;
      const c = e[r];
      c.exists && c.data.amount;
    }
  if (Q && lB === "keypair") {
    const r = await cC(), l = Zr();
    let c = await A.getMinimumBalanceForRentExemption(BigInt(l)).send();
    Array.isArray(g) || (c = yg(c + BigInt(g[WA]))), t.push(
      pe({
        payer: I,
        newAccount: r,
        lamports: c,
        space: l,
        programAddress: kI
      }),
      Aa({
        account: r.address,
        mint: WA,
        owner: I.address
      })
    ), n.push(
      vr({
        account: r.address,
        owner: I,
        destination: I.address
      })
    ), o[WA] = r.address;
  }
  return {
    createInstructions: t,
    cleanupInstructions: n,
    tokenAccountAddresses: o
  };
}
function dA(A, I) {
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
var Ea = 128;
function NB(A, I) {
  const g = BigInt(I + Ea);
  return A.lamportsPerByteYear * g * BigInt(A.exemptionThreshold);
}
function ia(A, I, g, B, C, Q) {
  return "liquidity" in A ? At(
    A.liquidity,
    B,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    C,
    Q
  ) : "tokenA" in A ? It(
    A.tokenA,
    B,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    C,
    Q
  ) : gt(
    A.tokenB,
    B,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    C,
    Q
  );
}
async function ea(A, I, g = {}) {
  const B = g.slippageToleranceBps ?? JC, C = g.authority ?? Ug, Q = g.whirlpoolDeployment ?? YA;
  BA(
    C.address !== AI,
    "Either supply an authority or set the default funder"
  );
  const E = await _I(
    I,
    Q.programId
  ), i = await lC(A, E[0]), e = await ug(A, i.data.whirlpool), o = await A.getEpochInfo().send(), [t, n, r, ...l] = await fg(
    A,
    [
      e.data.tokenMintA,
      e.data.tokenMintB,
      I,
      ...e.data.rewardInfos.map((Y) => Y.mint).filter((Y) => Y !== AI)
    ]
  );
  BA(t.exists, "Token A not found"), BA(n.exists, "Token B not found"), BA(r.exists, "Position mint not found");
  const c = dA(t, o.epoch), M = dA(n, o.epoch), a = ia(
    { liquidity: i.data.liquidity },
    e.data,
    i.data,
    B,
    c,
    M
  ), s = $A(
    i.data.tickLowerIndex,
    e.data.tickSpacing
  ), N = $A(
    i.data.tickUpperIndex,
    e.data.tickSpacing
  ), [S, u, m] = await Promise.all([
    ZI({
      owner: C.address,
      mint: I,
      tokenProgram: r.programAddress
    }).then((Y) => Y[0]),
    PA(
      e.address,
      s,
      Q.programId
    ).then((Y) => Y[0]),
    PA(
      e.address,
      N,
      Q.programId
    ).then((Y) => Y[0])
  ]), [q, x] = await kC(A, [
    u,
    m
  ]), j = q.data.ticks[mI(
    i.data.tickLowerIndex,
    s,
    e.data.tickSpacing
  )], X = x.data.ticks[mI(
    i.data.tickUpperIndex,
    N,
    e.data.tickSpacing
  )], tA = uC(
    e.data,
    i.data,
    j,
    X,
    c,
    M
  ), SA = BigInt(Math.floor(Date.now() / 1e3)), P = GC(
    e.data,
    i.data,
    j,
    X,
    SA,
    dA(l[0], o.epoch),
    dA(l[1], o.epoch),
    dA(l[2], o.epoch)
  ), L = /* @__PURE__ */ new Set();
  (a.liquidityDelta > 0n || tA.feeOwedA > 0n || tA.feeOwedB > 0n) && (L.add(e.data.tokenMintA), L.add(e.data.tokenMintB));
  for (let Y = 0; Y < P.rewards.length; Y++)
    P.rewards[Y].rewardsOwed > 0n && L.add(e.data.rewardInfos[Y].mint);
  const { createInstructions: G, cleanupInstructions: IA, tokenAccountAddresses: DA } = await Jg(
    A,
    C,
    Array.from(L)
  ), QA = [];
  QA.push(...G), a.liquidityDelta > 0n && QA.push(
    ko(
      {
        whirlpool: e.address,
        positionAuthority: C,
        position: E[0],
        positionTokenAccount: S,
        tokenOwnerAccountA: DA[e.data.tokenMintA],
        tokenOwnerAccountB: DA[e.data.tokenMintB],
        tokenVaultA: e.data.tokenVaultA,
        tokenVaultB: e.data.tokenVaultB,
        tickArrayLower: u,
        tickArrayUpper: m,
        liquidityAmount: a.liquidityDelta,
        tokenMinA: a.tokenMinA,
        tokenMinB: a.tokenMinB,
        tokenMintA: e.data.tokenMintA,
        tokenMintB: e.data.tokenMintB,
        tokenProgramA: t.programAddress,
        tokenProgramB: n.programAddress,
        memoProgram: jA,
        remainingAccountsInfo: null
      },
      { programAddress: Q.programId }
    )
  ), (tA.feeOwedA > 0n || tA.feeOwedB > 0n) && QA.push(
    hC(
      {
        whirlpool: e.address,
        positionAuthority: C,
        position: E[0],
        positionTokenAccount: S,
        tokenOwnerAccountA: DA[e.data.tokenMintA],
        tokenOwnerAccountB: DA[e.data.tokenMintB],
        tokenVaultA: e.data.tokenVaultA,
        tokenVaultB: e.data.tokenVaultB,
        tokenMintA: e.data.tokenMintA,
        tokenMintB: e.data.tokenMintB,
        tokenProgramA: t.programAddress,
        tokenProgramB: n.programAddress,
        memoProgram: jA,
        remainingAccountsInfo: null
      },
      { programAddress: Q.programId }
    )
  );
  for (let Y = 0; Y < P.rewards.length; Y++) {
    if (P.rewards[Y].rewardsOwed === 0n)
      continue;
    const VA = l[Y];
    BA(VA.exists, `Reward mint ${Y} not found`), QA.push(
      dC(
        {
          whirlpool: e.address,
          positionAuthority: C,
          position: E[0],
          positionTokenAccount: S,
          rewardOwnerAccount: DA[VA.address],
          rewardVault: e.data.rewardInfos[Y].vault,
          rewardIndex: Y,
          rewardMint: VA.address,
          rewardTokenProgram: VA.programAddress,
          memoProgram: jA,
          remainingAccountsInfo: null
        },
        { programAddress: Q.programId }
      )
    );
  }
  switch (r.programAddress) {
    case kI:
      QA.push(
        ro(
          {
            positionAuthority: C,
            position: E[0],
            positionTokenAccount: S,
            positionMint: I,
            receiver: C.address
          },
          { programAddress: Q.programId }
        )
      );
      break;
    case NI:
      QA.push(
        co(
          {
            positionAuthority: C,
            position: E[0],
            positionTokenAccount: S,
            positionMint: I,
            receiver: C.address,
            token2022Program: NI
          },
          { programAddress: Q.programId }
        )
      );
      break;
    default:
      throw new Error("Invalid token program");
  }
  return QA.push(...IA), {
    instructions: QA,
    quote: a,
    feesQuote: tA,
    rewardsQuote: P
  };
}
var Eg = 100;
async function ig(A, I, g) {
  const B = Math.ceil(I.length / Eg), C = [...Array(B).keys()].map(
    (E) => I.slice(E * Eg, (E + 1) * Eg)
  ), Q = [];
  for (const E of C)
    (await II(A, E)).forEach((e, o) => {
      const t = g(e);
      Q.push(t);
    });
  return Q;
}
function oa(A, I) {
  const g = Buffer.from(A.positionBitmap), B = [];
  for (let C = 0; C < Po(); C++) {
    const Q = Math.floor(C / 8), E = C % 8;
    g[Q] & 1 << E && B.push(
      Ho(
        A.positionBundleMint,
        C,
        I
      ).then((i) => i[0])
    );
  }
  return B;
}
async function ta(A, I, g = YA) {
  const B = g.programId, [C, Q] = await Promise.all([
    A.getTokenAccountsByOwner(
      I,
      { programId: kI },
      { encoding: "base64" }
    ).send(),
    A.getTokenAccountsByOwner(
      I,
      { programId: NI },
      { encoding: "base64" }
    ).send()
  ]), E = LB(), i = fC(), e = [...C.value, ...Q.value].map((s) => ({
    ...i.decode(E.encode(s.account.data[0])),
    tokenProgram: s.account.owner
  })).filter((s) => s.amount === 1n), o = await Promise.all(
    e.map(
      (s) => _I(s.mint, B).then((N) => N[0])
    )
  ), t = await Promise.all(
    e.map(
      (s) => bo(s.mint, B).then((N) => N[0])
    )
  ), n = await ig(
    A,
    o,
    cg
  ), r = await ig(
    A,
    t,
    Co
  ), l = await Promise.all(
    r.filter((s) => s.exists).flatMap((s) => oa(s.data, B))
  ), M = (await ig(
    A,
    l,
    cg
  )).filter((s) => s.exists).map((s) => (bI(s), s)).reduce((s, N) => {
    const S = s.get(N.data.positionMint) ?? [];
    return s.set(N.data.positionMint, [...S, N]);
  }, /* @__PURE__ */ new Map()), a = [];
  for (let s = 0; s < e.length; s++) {
    const N = n[s], S = r[s], u = e[s];
    if (N.exists && a.push({
      ...N,
      tokenProgram: u.tokenProgram,
      isPositionBundle: !1
    }), S.exists) {
      const m = M.get(S.data.positionBundleMint) ?? [];
      a.push({
        ...S,
        positions: m,
        tokenProgram: u.tokenProgram,
        isPositionBundle: !0
      });
    }
  }
  return a;
}
async function YC(A, I, g = {}) {
  const B = g.authority ?? Ug, C = g.whirlpoolDeployment ?? YA;
  BA(
    B.address !== AI,
    "Either supply an authority or set the default funder"
  );
  const Q = await A.getEpochInfo().send(), E = await _I(
    I,
    C.programId
  ), i = await lC(A, E[0]), e = await ug(A, i.data.whirlpool), [o, t, n, ...r] = await fg(
    A,
    [
      e.data.tokenMintA,
      e.data.tokenMintB,
      I,
      ...e.data.rewardInfos.map((G) => G.mint).filter((G) => G !== AI)
    ]
  );
  BA(o.exists, "Token A not found"), BA(t.exists, "Token B not found"), BA(n.exists, "Position mint not found");
  const l = $A(
    i.data.tickLowerIndex,
    e.data.tickSpacing
  ), c = $A(
    i.data.tickUpperIndex,
    e.data.tickSpacing
  ), [M, a, s] = await Promise.all([
    ZI({
      owner: B.address,
      mint: I,
      tokenProgram: n.programAddress
    }).then((G) => G[0]),
    PA(
      e.address,
      l,
      C.programId
    ).then((G) => G[0]),
    PA(
      e.address,
      c,
      C.programId
    ).then((G) => G[0])
  ]), [N, S] = await kC(A, [
    a,
    s
  ]), u = N.data.ticks[mI(
    i.data.tickLowerIndex,
    l,
    e.data.tickSpacing
  )], m = S.data.ticks[mI(
    i.data.tickUpperIndex,
    c,
    e.data.tickSpacing
  )], q = uC(
    e.data,
    i.data,
    u,
    m,
    dA(o, Q.epoch),
    dA(t, Q.epoch)
  ), x = BigInt(Math.floor(Date.now() / 1e3)), j = GC(
    e.data,
    i.data,
    u,
    m,
    x,
    dA(r[0], Q.epoch),
    dA(r[1], Q.epoch),
    dA(r[2], Q.epoch)
  ), X = /* @__PURE__ */ new Set();
  (q.feeOwedA > 0n || q.feeOwedB > 0n) && (X.add(e.data.tokenMintA), X.add(e.data.tokenMintB));
  for (let G = 0; G < j.rewards.length; G++)
    j.rewards[G].rewardsOwed > 0n && X.add(e.data.rewardInfos[G].mint);
  const { createInstructions: tA, cleanupInstructions: SA, tokenAccountAddresses: P } = await Jg(
    A,
    B,
    Array.from(X)
  ), L = [];
  L.push(...tA), i.data.liquidity > 0n && L.push(
    Lo(
      {
        whirlpool: e.address,
        position: E[0],
        tickArrayLower: a,
        tickArrayUpper: s
      },
      { programAddress: C.programId }
    )
  ), (q.feeOwedA > 0n || q.feeOwedB > 0n) && L.push(
    hC(
      {
        whirlpool: e.address,
        positionAuthority: B,
        position: E[0],
        positionTokenAccount: M,
        tokenOwnerAccountA: P[e.data.tokenMintA],
        tokenOwnerAccountB: P[e.data.tokenMintB],
        tokenVaultA: e.data.tokenVaultA,
        tokenVaultB: e.data.tokenVaultB,
        tokenMintA: e.data.tokenMintA,
        tokenMintB: e.data.tokenMintB,
        tokenProgramA: o.programAddress,
        tokenProgramB: t.programAddress,
        memoProgram: jA,
        remainingAccountsInfo: null
      },
      { programAddress: C.programId }
    )
  );
  for (let G = 0; G < j.rewards.length; G++) {
    if (j.rewards[G].rewardsOwed === 0n)
      continue;
    const IA = r[G];
    BA(IA.exists, `Reward mint ${G} not found`), L.push(
      dC(
        {
          whirlpool: e.address,
          positionAuthority: B,
          position: E[0],
          positionTokenAccount: M,
          rewardOwnerAccount: P[IA.address],
          rewardVault: e.data.rewardInfos[G].vault,
          rewardIndex: G,
          rewardMint: IA.address,
          rewardTokenProgram: IA.programAddress,
          memoProgram: jA,
          remainingAccountsInfo: null
        },
        { programAddress: C.programId }
      )
    );
  }
  return L.push(...SA), {
    feesQuote: q,
    rewardsQuote: j,
    instructions: L
  };
}
async function na(A, {
  whirlpool: {
    address: I,
    data: { sqrtPrice: g, tokenMintA: B, tokenMintB: C, ...Q }
  },
  param: { tokenMaxA: E, tokenMaxB: i },
  mintA: e,
  mintB: o,
  slippageToleranceBps: t,
  authority: n,
  programAddress: r,
  ...l
}) {
  const {
    createInstructions: c,
    cleanupInstructions: M,
    tokenAccountAddresses: a
  } = await Jg(A, n, {
    [B]: E,
    [C]: i
  }), s = {
    whirlpool: I,
    positionAuthority: n,
    tokenOwnerAccountA: a[B],
    tokenOwnerAccountB: a[C],
    tokenMintA: B,
    tokenMintB: C,
    tokenProgramA: e.programAddress,
    tokenProgramB: o.programAddress,
    memoProgram: jA,
    remainingAccountsInfo: null,
    ...Q,
    ...l
  }, { minSqrtPrice: N, maxSqrtPrice: S } = vo(
    g,
    t
  ), u = uo(
    {
      method: Ve("ByTokenAmounts", {
        minSqrtPrice: N,
        maxSqrtPrice: S,
        tokenMaxA: E,
        tokenMaxB: i
      }),
      ...s
    },
    { programAddress: r }
  );
  return {
    createTokenAccountInstructions: c,
    increaseLiquidityInstruction: u,
    cleanupInstructions: M
  };
}
async function ra(A, I, g, B, C, Q, E, i, e, o, t) {
  BA(
    o.address !== AI,
    "Either supply a funder or set the default funder"
  );
  const n = [], r = await xo(A);
  let l = 0n;
  const c = $o(B, C), M = sB(
    c.tickLowerIndex,
    I.data.tickSpacing,
    !1
  ), a = sB(
    c.tickUpperIndex,
    I.data.tickSpacing,
    !0
  ), s = await cC(), N = $A(
    M,
    I.data.tickSpacing
  ), S = $A(
    a,
    I.data.tickSpacing
  ), [
    u,
    m,
    q,
    x
  ] = await Promise.all([
    _I(s.address, t.programId),
    ZI({
      owner: o.address,
      mint: s.address,
      tokenProgram: NI
    }).then((L) => L[0]),
    PA(
      I.address,
      N,
      t.programId
    ).then((L) => L[0]),
    PA(
      I.address,
      S,
      t.programId
    ).then((L) => L[0])
  ]), {
    createTokenAccountInstructions: j,
    increaseLiquidityInstruction: X,
    cleanupInstructions: tA
  } = await na(A, {
    whirlpool: I,
    position: u[0],
    positionTokenAccount: m,
    param: g,
    mintA: Q,
    mintB: E,
    slippageToleranceBps: i,
    authority: o,
    programAddress: t.programId,
    tickArrayLower: q,
    tickArrayUpper: x,
    tickLowerIndex: M,
    tickUpperIndex: a
  });
  n.push(...j);
  const [SA, P] = await yC(A, [
    q,
    x
  ]);
  return SA.exists || (n.push(
    tB(
      {
        whirlpool: I.address,
        funder: o,
        tickArray: q,
        startTickIndex: N,
        idempotent: !1
      },
      { programAddress: t.programId }
    )
  ), l += NB(
    r,
    rB()
  )), !P.exists && N !== S && (n.push(
    tB(
      {
        whirlpool: I.address,
        funder: o,
        tickArray: x,
        startTickIndex: S,
        idempotent: !1
      },
      { programAddress: t.programId }
    )
  ), l += NB(
    r,
    rB()
  )), n.push(
    Uo(
      {
        funder: o,
        owner: o.address,
        position: u[0],
        positionMint: s,
        positionTokenAccount: m,
        whirlpool: I.address,
        associatedTokenProgram: Wr,
        tickLowerIndex: M,
        tickUpperIndex: a,
        token2022Program: NI,
        metadataUpdateAuth: p(
          "3axbTs2z5GBy6usVbNVoqEgZMng3vZvMnAoX29BFfwhr"
        ),
        withTokenMetadataExtension: e
      },
      { programAddress: t.programId }
    )
  ), n.push(X), n.push(...tA), {
    instructions: n,
    positionMint: s.address,
    initializationCost: yg(l)
  };
}
async function aa(A, I, g, B, C, Q = {}) {
  const E = Q.slippageToleranceBps ?? JC, i = Q.withTokenMetadataExtension ?? !0, e = Q.funder ?? Ug, o = Q.whirlpoolDeployment ?? YA, t = await ug(A, I);
  sa(t.data);
  const [n, r] = await Jr(A, [
    t.data.tokenMintA,
    t.data.tokenMintB
  ]), l = n.data.decimals, c = r.data.decimals, M = aB(B, l, c), a = aB(C, l, c);
  return ra(
    A,
    t,
    g,
    M,
    a,
    n,
    r,
    E,
    i,
    e,
    o
  );
}
function sa(A) {
  BA(
    A.tickSpacing !== Ia,
    "Splash pools only support full range positions"
  );
}
typeof globalThis.Buffer > "u" && (globalThis.Buffer = { from: (A) => typeof A == "string" ? new TextEncoder().encode(A) : Uint8Array.from(A) });
const ca = p("ComputeBudget111111111111111111111111111111"), FI = {
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: "USDT"
}, pI = 1232, LC = 2e4, Yg = (A) => new Promise((I) => setTimeout(I, A));
function yI(A) {
  const I = Re({ url: A });
  return ke(async (B) => {
    for (let C = 0; ; C++)
      try {
        return await I(B);
      } catch (Q) {
        const E = Q && Q.context && Q.context.statusCode;
        if (!(E === 429 || E >= 500 && E < 600 || /8100002/.test(String(Q && Q.message))) || C >= 5) throw Q;
        await Yg(400 * Math.pow(2, C) + Math.random() * 200);
      }
  });
}
function mC(A, I, g) {
  const B = new Uint8Array(1 + g);
  B[0] = A;
  let C = BigInt(I);
  for (let Q = 0; Q < g; Q++)
    B[1 + Q] = Number(C & 0xffn), C >>= 8n;
  return { programAddress: ca, accounts: [], data: B };
}
function hB(A, I) {
  const g = Math.floor((+A || 0) * Math.pow(10, I));
  return BigInt(g > 0 ? g : 0);
}
async function pC(A, I) {
  for (let g = 0; g < 30; g++) {
    await Yg(2e3);
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
async function Da(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!I) throw new Error("No se cargó la librería de Solana");
  const g = hB(A.amountA, A.decA), B = hB(A.amountB, A.decB);
  if (g <= 0n && B <= 0n) throw new Error("Introduce una cantidad");
  if (!(A.lower > 0) || !(A.upper > A.lower)) throw new Error("Rango de precios no válido");
  const C = yI(A.rpc), Q = CI(p(A.owner)), E = await aa(C, p(A.pool), { tokenMaxA: g, tokenMaxB: B }, A.lower, A.upper, {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    funder: Q
  }), i = (await C.getLatestBlockhash().send()).value, e = async (l) => {
    const c = RI(
      gC({ version: 0 }),
      (a) => sC(Q, a),
      (a) => AC(i, a),
      (a) => BC(l, a)
    ), M = await DC(c);
    return new Uint8Array(EC().encode(M));
  };
  let o = await e([mC(3, LC, 8)].concat(E.instructions));
  if (o.length > pI && (o = await e(E.instructions)), o.length > pI) throw new Error("La transacción es demasiado grande para enviarla de una vez (" + o.length + " bytes)");
  const t = await A.provider.signAndSendTransaction(I.deserialize(o)), n = t && t.signature || String(t), r = await pC(C, n);
  return {
    signature: n,
    confirmed: r,
    positionMint: String(E.positionMint),
    initializationCost: Number(E.initializationCost) / 1e9,
    bytes: o.length
  };
}
const dB = (A) => {
  let I = "";
  for (let g = 0; g < A.length; g += 32768) I += String.fromCharCode.apply(null, A.subarray(g, g + 32768));
  return btoa(I);
};
async function KI(A, I, g) {
  for (let B = 0; ; B++) {
    const C = await fetch(A, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: I, params: g }) });
    if ((C.status === 429 || C.status >= 500) && B < 5) {
      await Yg(400 * Math.pow(2, B) + Math.random() * 200);
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
async function KC(A, I) {
  const g = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!g) throw new Error("No se cargó la librería de Solana");
  const B = yI(A.rpc), C = A.signer || CI(p(A.owner)), Q = (await B.getLatestBlockhash().send()).value, E = async (l) => {
    const c = RI(
      gC({ version: 0 }),
      (a) => sC(C, a),
      (a) => AC(Q, a),
      (a) => BC(l, a)
    ), M = await DC(c);
    return new Uint8Array(EC().encode(M));
  };
  let i = await E([mC(3, LC, 8)].concat(I));
  if (i.length > pI && (i = await E(I)), i.length > pI) throw new Error("La transacción es demasiado grande (" + i.length + " bytes)");
  const e = await KI(A.rpc, "simulateTransaction", [dB(i), { encoding: "base64", sigVerify: !1, replaceRecentBlockhash: !0, commitment: "confirmed" }]), o = e && (e.value || e);
  if (o && o.err) {
    const l = (o.logs || []).filter((c) => /Error|error|failed/.test(c)).slice(-2).join(" · ");
    throw new Error("La simulación falló, no se ha enviado nada. " + (l || JSON.stringify(o.err)));
  }
  const t = g.deserialize(i);
  let n;
  if (A.provider.signTransaction) {
    const l = await A.provider.signTransaction(t);
    n = await KI(A.rpc, "sendTransaction", [dB(l.serialize()), { encoding: "base64", skipPreflight: !1, preflightCommitment: "confirmed", maxRetries: 3 }]);
  } else {
    const l = await A.provider.signAndSendTransaction(t);
    n = l && l.signature || String(l);
  }
  const r = await pC(B, n);
  return { signature: n, confirmed: r };
}
async function wa(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = yI(A.rpc), g = CI(p(A.owner)), B = await ea(I, p(A.mint), {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    authority: g
  });
  return KC(Object.assign({}, A, { signer: g }), B.instructions);
}
async function la(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = yI(A.rpc), g = CI(p(A.owner)), B = await YC(I, p(A.mint), { authority: g });
  return KC(Object.assign({}, A, { signer: g }), B.instructions);
}
async function Na(A) {
  try {
    const I = await fetch("https://api.orca.so/v2/solana/pools/" + A);
    if (!I.ok) return null;
    const g = await I.json(), B = g && g.data ? g.data : g;
    return Array.isArray(B) ? B[0] : B;
  } catch {
    return null;
  }
}
const ha = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", da = { TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: 1, TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb: 1 }, Ra = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function ka(A) {
  const I = [0];
  for (const g of A) {
    let B = Ra.indexOf(g);
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
let nI = null;
async function ya() {
  if (nI) return nI;
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
  nI = {};
  for (const I of Object.keys(A)) {
    const g = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode("global:" + I)));
    nI[Array.from(g.slice(0, 8)).join(",")] = A[I];
  }
  return nI;
}
function Ma(A, I, g, B) {
  if (A > 0 && I > 0) {
    const C = I / A;
    let Q = g, E = B;
    for (let e = 0; e < 80; e++) {
      const o = (Q + E) / 2;
      (o - g) / (1 / o - 1 / B) < C ? Q = o : E = o;
    }
    const i = (Q + E) / 2;
    return i * i;
  }
  return A > 0 ? g * g : I > 0 ? B * B : null;
}
async function bC(A, I, g) {
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
async function ua(A, I, g, B, C) {
  const Q = await ya();
  let E = [], i;
  for (let c = 0; c < 3; c++) {
    const M = await KI(A, "getSignaturesForAddress", [I, Object.assign({ limit: 1e3 }, i ? { before: i } : {})]);
    if (E = E.concat(M || []), !M || M.length < 1e3) break;
    i = M[M.length - 1].signature;
  }
  const e = E.length ? E[E.length - 1].blockTime : null;
  let o = E.filter((c) => !c.err);
  o.length > 100 && (o = o.slice(0, 70).concat(o.slice(-30)));
  const t = await bC(o, 3, (c) => KI(A, "getTransaction", [c.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" }])), n = [], r = {};
  t.forEach((c) => {
    if (!c || !c.transaction) return;
    const M = c.transaction.message.instructions || [], a = {};
    (c.meta && c.meta.innerInstructions || []).forEach((s) => a[s.index] = s.instructions || []), M.forEach((s, N) => {
      const S = [s].concat(a[N] || []);
      let u = null;
      S.forEach((m) => {
        if (m.programId === ha && m.data && Array.isArray(m.accounts)) {
          const X = Q[Array.from(ka(m.data).slice(0, 8)).join(",")];
          u = m.accounts.indexOf(I) >= 0 ? { kind: X || "unk", ai: 0, bi: 0, ao: 0, bo: 0 } : null, u && u.kind !== "rew" && n.push(u);
          return;
        }
        if (!u || !da[m.programId] || !m.parsed) return;
        const q = m.parsed.type;
        if (q !== "transfer" && q !== "transferChecked") return;
        const x = m.parsed.info || {}, j = Number(x.amount || x.tokenAmount && x.tokenAmount.amount || 0);
        if (u.kind === "rew") {
          const X = C[x.source];
          X && (r[X] = (r[X] || 0) + j);
          return;
        }
        x.destination === g ? u.ai += j : x.source === g ? u.ao += j : x.destination === B ? u.bi += j : x.source === B && (u.bo += j);
      });
    });
  });
  const l = [];
  return n.forEach((c) => {
    let M = c.kind;
    M === "unk" && (M = c.ai + c.bi > 0 ? "inc" : c.ao + c.bo > 0 ? "dec" : null), M && (M === "inc" ? l.push({ kind: M, a: c.ai, b: c.bi }) : l.push({ kind: M, a: c.ao, b: c.bo }));
  }), { opened: e, events: l, rewards: r, txCount: E.length };
}
async function Ga(A) {
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
function Sa(A) {
  if (!(A > 0)) return "—";
  const I = Math.floor(A / 86400), g = Math.floor(A % 86400 / 3600), B = Math.floor(A % 3600 / 60);
  return I ? I + "d " + g + "h" : g ? g + "h " + B + "m" : Math.max(1, B) + "m";
}
function RB(A) {
  return A = String(A), A.slice(0, 4) + "…" + A.slice(-4);
}
async function Fa(A) {
  const I = yI(A.rpc), g = await ta(I, p(A.owner)), B = [];
  if (g.forEach((a) => {
    a.isPositionBundle ? (a.positions || []).forEach((s) => B.push(s)) : B.push(a);
  }), !B.length) return [];
  const C = Array.from(new Set(B.map((a) => String(a.data.whirlpool)))), Q = await io(I, C.map((a) => p(a))), E = {};
  Q.forEach((a) => E[String(a.address)] = a.data);
  const i = Array.from(new Set(Q.flatMap((a) => [String(a.data.tokenMintA), String(a.data.tokenMintB)]))), e = {}, o = (await I.getMultipleAccounts(i.map((a) => p(a)), { encoding: "jsonParsed" }).send()).value;
  i.forEach((a, s) => {
    const N = o[s] && o[s].data && o[s].data.parsed && o[s].data.parsed.info;
    e[a] = N ? Number(N.decimals) : 6;
  });
  const t = {};
  await Promise.all(C.map(async (a) => t[a] = await Na(a)));
  const n = /* @__PURE__ */ new Set();
  Q.forEach((a) => (a.data.rewardInfos || []).forEach((s) => {
    const N = String(s.mint);
    N !== "11111111111111111111111111111111" && n.add(N);
  }));
  const r = await Ga(Array.from(new Set(i.concat(Array.from(n)))));
  if (Array.from(n).some((a) => e[a] == null)) {
    const a = Array.from(n).filter((N) => e[N] == null), s = (await I.getMultipleAccounts(a.map((N) => p(N)), { encoding: "jsonParsed" }).send()).value;
    a.forEach((N, S) => {
      const u = s[S] && s[S].data && s[S].data.parsed && s[S].data.parsed.info;
      e[N] = u ? Number(u.decimals) : 6;
    });
  }
  const l = CI(p(A.owner)), c = Date.now() / 1e3;
  return (await bC(B, 2, async (a) => {
    const s = a.data, N = E[String(s.whirlpool)];
    if (!N) return null;
    const S = String(N.tokenMintA), u = String(N.tokenMintB), m = e[S], q = e[u], x = t[String(s.whirlpool)] || {}, j = x.tokenA || {}, X = x.tokenB || {}, tA = j.symbol || FI[S] || RB(S), SA = X.symbol || FI[u] || RB(u), P = Math.pow(10, m - q), L = Number(N.sqrtPrice) / 18446744073709552e3, G = Math.pow(1.0001, s.tickLowerIndex / 2), IA = Math.pow(1.0001, s.tickUpperIndex / 2), DA = Number(s.liquidity);
    let QA = 0, Y = 0;
    L <= G ? QA = DA * (1 / G - 1 / IA) : L >= IA ? Y = DA * (IA - G) : (QA = DA * (1 / L - 1 / IA), Y = DA * (L - G));
    const VA = QA / Math.pow(10, m), HC = Y / Math.pow(10, q), MI = L * L * P;
    let FA = r[S], wA = r[u];
    FI[u] && !wA && (wA = 1), FI[S] && !FA && (FA = 1), !FA && wA && (FA = wA * MI), !wA && FA && MI > 0 && (wA = FA / MI);
    const WI = (O, nA) => FA && wA ? O / Math.pow(10, m) * FA + nA / Math.pow(10, q) * wA : null, QI = WI(QA, Y);
    let EI = null, jI = 0, XI = 0, Lg = [];
    try {
      const O = await YC(I, p(String(s.positionMint)), { authority: l });
      jI = Number(O.feesQuote.feeOwedA), XI = Number(O.feesQuote.feeOwedB), EI = WI(jI, XI), (N.rewardInfos || []).forEach((nA, mA) => {
        const rA = O.rewardsQuote.rewards[mA], lA = String(nA.mint);
        if (!rA || !(Number(rA.rewardsOwed) > 0) || lA === "11111111111111111111111111111111") return;
        const pA = Number(rA.rewardsOwed) / Math.pow(10, e[lA] || 6);
        Lg.push({ mint: lA, amt: pA }), EI != null && r[lA] && (EI += pA * r[lA]);
      });
    } catch {
    }
    let LA = null;
    try {
      const O = {};
      (N.rewardInfos || []).forEach((nA) => O[String(nA.vault)] = String(nA.mint)), LA = await ua(A.rpc, String(a.address), String(N.tokenVaultA), String(N.tokenVaultB), O);
    } catch {
    }
    let _A = null, mg = null, iI = null, pg = null, uI = null, Kg = "—";
    if (LA) {
      LA.opened && (Kg = Sa(c - LA.opened));
      let O = 0, nA = 0, mA = 0, rA = 0, lA = 0, pA = 0;
      LA.events.forEach(($) => {
        if ($.kind === "fee") {
          lA += $.a, pA += $.b;
          return;
        }
        const KA = Ma($.a, $.b, G, IA), eI = KA == null ? 0 : $.a * KA + $.b;
        $.kind === "inc" ? (O += eI, KA != null && eI > 0 && (rA += KA * P * eI, mA += eI)) : nA += eI;
      }), mA > 0 && (pg = rA / mA), wA && (_A = O / Math.pow(10, q) * wA, mg = nA / Math.pow(10, q) * wA), iI = WI(lA, pA), iI != null && Object.keys(LA.rewards).forEach(($) => {
        r[$] && (iI += LA.rewards[$] / Math.pow(10, e[$] || 6) * r[$]);
      }), _A > 0 && QI != null && (uI = QI + (mg || 0) + (iI || 0) + (EI || 0) - _A);
    }
    let GI = null, zI = null;
    try {
      const O = x.stats || {}, nA = Number(N.liquidity), mA = L > G && L < IA, rA = (KA) => QI > 0 && KA > 0 && nA > 0 ? KA * (1 - Number(N.protocolFeeRate) / 1e4) * (DA / nA) / QI * 100 : null, lA = O["24h"] && +O["24h"].fees, pA = O["7d"] && +O["7d"].fees, $ = O["30d"] && +O["30d"].fees;
      mA ? (GI = {
        "1h": rA(lA / 24),
        "24h": rA(lA),
        "7d": rA(pA),
        "30d": rA($),
        "365d": rA($ * 365 / 30)
      }, zI = GI["24h"]) : (GI = { out: !0 }, zI = 0);
    } catch {
    }
    return {
      pair: tA + "/" + SA,
      fee: N.feeRate != null ? String(Number(N.feeRate) / 1e4) : "",
      price: MI,
      lo: G * G * P,
      hi: IA * IA * P,
      usd: QI,
      amtA: VA,
      amtB: HC,
      symA: tA,
      symB: SA,
      dep: _A,
      pnl: uI,
      pnlPct: uI != null && _A > 0 ? uI / _A * 100 : null,
      harv: iI,
      pend: EI,
      pendA: jI / Math.pow(10, m),
      pendB: XI / Math.pow(10, q),
      pendRew: Lg,
      est: GI,
      est24: zI,
      entry: pg,
      dur: Kg,
      mint: String(s.positionMint),
      pool: String(s.whirlpool)
    };
  })).filter(Boolean);
}
window.kzSdk = { ready: !0, version: "0.3.0", openPosition: Da, positions: Fa, closePosition: wa, harvest: la };
window.dispatchEvent(new Event("kzsdk"));
