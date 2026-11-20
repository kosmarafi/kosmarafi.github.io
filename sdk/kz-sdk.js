var BQ = 6, CQ = 10, QQ = -32700, EQ = -32603, iQ = -32602, eQ = -32601, oQ = -32600, tQ = -32015, nQ = -32014, rQ = -32012, aQ = -32010, sQ = -32009, cQ = -32007, DQ = -32006, wQ = -32004, zg = -32002, lQ = -32001, dQ = 28e5, uQ = 2800001, hQ = 2800003, NQ = 2800006, RQ = 2800007, bB = 2800008, yQ = 2800009, kQ = 323e4, MQ = 32300001, SQ = 3230002, GQ = 3230004, FQ = 361e4, fQ = 3610001, UQ = 3610002, JQ = 3610003, YQ = 3610004, LQ = 3610005, mQ = 4615e3, pQ = 4615026, KQ = 5508e3, bQ = 5663e3, Pg = 5663001, HQ = 5663004, TQ = 5663015, qQ = 5663016, OQ = 5663021, xQ = 705e4, VQ = 7050030, _Q = 7050031, ZQ = 7050035, WQ = 8078e3, jQ = 8078001, vQ = 8078002, XQ = 8078004, zQ = 8078005, PQ = 8078006, $Q = 8078007, AE = 8078008, IE = 8078009, gE = 8078010, BE = 8078011, bI = 8078012, $g = 8078013, CE = 8078014, QE = 8078017, EE = 8078018, HB = 8078022, iE = 81e5, eE = 8100002, oE = 8100003;
function TB(A) {
  return Array.isArray(A) ? "%5B" + A.map(TB).join(
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
function tE([A, I]) {
  return `${A}=${TB(I)}`;
}
function nE(A) {
  const I = Object.entries(A).map(tE).join("&");
  return btoa(I);
}
function rE(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${nE(I)}'`), `${g}\``;
  }
}
function aE(A, I) {
  return A instanceof Error && A.name === "SolanaError" ? A.context.__code === I : !1;
}
var l = class extends Error {
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
    let g, C;
    I && Object.entries(Object.getOwnPropertyDescriptors(I)).forEach(([Q, E]) => {
      Q === "cause" ? C = { cause: E.value } : (g === void 0 && (g = {
        __code: A
      }), Object.defineProperty(g, Q, E));
    });
    const B = rE(A, g);
    super(B, C), this.context = Object.freeze(
      g === void 0 ? {
        __code: A
      } : g
    ), this.name = "SolanaError";
  }
};
function Mg(...A) {
  "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(...A);
}
function qB({ errorCodeBaseOffset: A, getErrorContext: I, orderedErrorNames: g, rpcEnumError: C }, B) {
  let Q, E;
  typeof C == "string" ? Q = C : (Q = Object.keys(C)[0], E = C[Q]);
  const i = g.indexOf(Q), e = A + i, o = I(e, Q, E), t = new l(e, o);
  return Mg(t, B), t;
}
var sE = [
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
function OB(A, I) {
  const g = Number(A);
  return qB(
    {
      errorCodeBaseOffset: 4615001,
      getErrorContext(C, B, Q) {
        return C === mQ ? {
          errorName: B,
          index: g,
          ...Q !== void 0 ? { instructionErrorContext: Q } : null
        } : C === pQ ? {
          code: Number(Q),
          index: g
        } : { index: g };
      },
      orderedErrorNames: sE,
      rpcEnumError: I
    },
    OB
  );
}
var cE = [
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
function xB(A) {
  return typeof A == "object" && "InstructionError" in A ? OB(
    ...A.InstructionError
  ) : qB(
    {
      errorCodeBaseOffset: 7050001,
      getErrorContext(I, g, C) {
        if (I === xQ)
          return {
            errorName: g,
            ...C !== void 0 ? { transactionErrorContext: C } : null
          };
        if (I === VQ)
          return {
            index: Number(C)
          };
        if (I === _Q || I === ZQ)
          return {
            accountIndex: Number(C.account_index)
          };
      },
      orderedErrorNames: cE,
      rpcEnumError: A
    },
    xB
  );
}
function cg(A) {
  let I;
  if (DE(A)) {
    const { code: g, data: C, message: B } = A, Q = Number(g);
    if (Q === zg) {
      const { err: E, ...i } = C, e = E ? { cause: xB(E) } : null;
      I = new l(zg, {
        ...i,
        ...e
      });
    } else {
      let E;
      switch (Q) {
        case EQ:
        case iQ:
        case oQ:
        case eQ:
        case QQ:
        case rQ:
        case lQ:
        case wQ:
        case nQ:
        case aQ:
        case sQ:
        case cQ:
        case DQ:
        case tQ:
          E = { __serverMessage: B };
          break;
        default:
          typeof C == "object" && !Array.isArray(C) && (E = C);
      }
      I = new l(Q, E);
    }
  } else {
    const g = typeof A == "object" && A !== null && "message" in A && typeof A.message == "string" ? A.message : "Malformed JSON-RPC error with no message attribute";
    I = new l(CQ, { error: A, message: g });
  }
  return Mg(I, cg), I;
}
function DE(A) {
  return typeof A == "object" && A !== null && "code" in A && "message" in A && (typeof A.code == "number" || typeof A.code == "bigint") && typeof A.message == "string";
}
function wE(A, I) {
  if (A.length >= I) return A;
  const g = new Uint8Array(I).fill(0);
  return g.set(A), g;
}
var lE = (A, I) => wE(A.length <= I ? A : A.slice(0, I), I);
function VB(A, I, g) {
  const C = g === 0 && A.length === I.length ? A : A.slice(g, g + I.length);
  return _B(C, I);
}
function _B(A, I) {
  return A.length === I.length && A.every((g, C) => g === I[C]);
}
function pA(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function H(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(pA(I, A));
      return A.write(I, g, 0), g;
    }
  });
}
function gA(A) {
  return Object.freeze({
    ...A,
    decode: (I, g = 0) => A.read(I, g)[0]
  });
}
function T(A) {
  return "fixedSize" in A && typeof A.fixedSize == "number";
}
function ZB(A) {
  if (!T(A))
    throw new l(vQ);
}
function dE(A) {
  return !T(A);
}
function uE(A, I) {
  if (T(A) !== T(I))
    throw new l(XQ);
  if (T(A) && T(I) && A.fixedSize !== I.fixedSize)
    throw new l(zQ, {
      decoderFixedSize: I.fixedSize,
      encoderFixedSize: A.fixedSize
    });
  if (!T(A) && !T(I) && A.maxSize !== I.maxSize)
    throw new l(PQ, {
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
function hE(A, I, g = 0) {
  if (I.length - g <= 0)
    throw new l(WQ, {
      codecDescription: A
    });
}
function Sg(A, I, g, C = 0) {
  const B = g.length - C;
  if (B < I)
    throw new l(jQ, {
      bytesLength: B,
      codecDescription: A,
      expected: I
    });
}
function AB(A, I, g) {
  if (I < 0 || I > g)
    throw new l(CE, {
      bytesLength: g,
      codecDescription: A,
      offset: I
    });
}
function WB(A, I) {
  const g = (E, i, e) => {
    const o = A.encode(E);
    return e = I.write(o.length, i, e), i.set(o, e), e + o.length;
  };
  if (T(I) && T(A))
    return H({ ...A, fixedSize: I.fixedSize + A.fixedSize, write: g });
  const C = T(I) ? I.fixedSize : I.maxSize ?? null, B = T(A) ? A.fixedSize : A.maxSize ?? null, Q = C !== null && B !== null ? C + B : null;
  return H({
    ...A,
    ...Q !== null ? { maxSize: Q } : {},
    getSizeFromValue: (E) => {
      const i = pA(E, A);
      return pA(i, I) + i;
    },
    write: g
  });
}
function f(A, I) {
  const g = (E, i) => {
    const [e, o] = I.read(E, i), t = Number(e);
    return i = o, (i > 0 || E.length > t) && (E = E.slice(i, i + t)), Sg("addDecoderSizePrefix", t, E), [A.decode(E), i + t];
  };
  if (T(I) && T(A))
    return gA({ ...A, fixedSize: I.fixedSize + A.fixedSize, read: g });
  const C = T(I) ? I.fixedSize : I.maxSize ?? null, B = T(A) ? A.fixedSize : A.maxSize ?? null, Q = C !== null && B !== null ? C + B : null;
  return gA({ ...A, ...Q !== null ? { maxSize: Q } : {}, read: g });
}
function jB(A, I, g) {
  const C = A.byteOffset + (I ?? 0), B = g ?? A.byteLength;
  let Q;
  return typeof SharedArrayBuffer > "u" ? Q = A.buffer : A.buffer instanceof SharedArrayBuffer ? (Q = new ArrayBuffer(A.length), new Uint8Array(Q).set(new Uint8Array(A))) : Q = A.buffer, (C === 0 || C === -A.byteLength) && B === A.byteLength ? Q : Q.slice(C, C + B);
}
function nA(A, I) {
  return H({
    fixedSize: I,
    write: (g, C, B) => {
      const Q = A.encode(g), E = Q.length > I ? Q.slice(0, I) : Q;
      return C.set(E, B), B + I;
    }
  });
}
function tA(A, I) {
  return gA({
    fixedSize: I,
    read: (g, C) => {
      Sg("fixCodecSize", I, g, C), (C > 0 || g.length > I) && (g = g.slice(C, C + I)), T(A) && (g = lE(g, A.fixedSize));
      const [B] = A.read(g, 0);
      return [B, C + I];
    }
  });
}
function NE(A, I) {
  return H({
    ...A,
    write: (g, C, B) => {
      const Q = (o) => RE(o, C.length), E = I.preOffset ? I.preOffset({ bytes: C, preOffset: B, wrapBytes: Q }) : B;
      AB("offsetEncoder", E, C.length);
      const i = A.write(g, C, E), e = I.postOffset ? I.postOffset({ bytes: C, newPreOffset: E, postOffset: i, preOffset: B, wrapBytes: Q }) : i;
      return AB("offsetEncoder", e, C.length), e;
    }
  });
}
function RE(A, I) {
  return I === 0 ? 0 : (A % I + I) % I;
}
function yE(A, I) {
  if (T(A)) {
    const g = I(A.fixedSize);
    if (g < 0)
      throw new l($g, {
        bytesLength: g,
        codecDescription: "resizeEncoder"
      });
    return H({ ...A, fixedSize: g });
  }
  return H({
    ...A,
    getSizeFromValue: (g) => {
      const C = I(A.getSizeFromValue(g));
      if (C < 0)
        throw new l($g, {
          bytesLength: C,
          codecDescription: "resizeEncoder"
        });
      return C;
    }
  });
}
function kE(A, I) {
  return NE(
    yE(A, (g) => g + I),
    { preOffset: ({ preOffset: g }) => g + I }
  );
}
function m(A, I) {
  return H({
    ...dE(A) ? { ...A, getSizeFromValue: (g) => A.getSizeFromValue(I(g)) } : A,
    write: (g, C, B) => A.write(I(g), C, B)
  });
}
function SA(A, I) {
  return gA({
    ...A,
    read: (g, C) => {
      const [B, Q] = A.read(g, C);
      return [I(B, g, C), Q];
    }
  });
}
function ME(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new l(bI, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var SE = (A) => H({
  getSizeFromValue: (I) => {
    const [g, C] = IB(I, A[0]);
    if (!C) return I.length;
    const B = gB(C, A);
    return g.length + Math.ceil(B.toString(16).length / 2);
  },
  write(I, g, C) {
    if (ME(A, I), I === "") return C;
    const [B, Q] = IB(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(B.length).fill(0), C), C + B.length;
    let E = gB(Q, A);
    const i = [];
    for (; E > 0n; )
      i.unshift(Number(E % 256n)), E /= 256n;
    const e = [...Array(B.length).fill(0), ...i];
    return g.set(e, C), C + e.length;
  }
}), GE = (A) => gA({
  read(I, g) {
    const C = g === 0 ? I : I.slice(g);
    if (C.length === 0) return ["", 0];
    let B = C.findIndex((e) => e !== 0);
    B = B === -1 ? C.length : B;
    const Q = A[0].repeat(B);
    if (B === C.length) return [Q, I.length];
    const E = C.slice(B).reduce((e, o) => e * 256n + BigInt(o), 0n), i = FE(E, A);
    return [Q + i, I.length];
  }
});
function IB(A, I) {
  const [g, C] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, C];
}
function gB(A, I) {
  const g = BigInt(I.length);
  let C = 0n;
  for (const B of A)
    C *= g, C += BigInt(I.indexOf(B));
  return C;
}
function FE(A, I) {
  const g = BigInt(I.length), C = [];
  for (; A > 0n; )
    C.unshift(I[Number(A % g)]), A /= g;
  return C.join("");
}
var vB = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", fE = () => SE(vB), UE = () => GE(vB), BB = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", XB = () => H({
  getSizeFromValue: (A) => {
    try {
      return atob(A).length;
    } catch {
      throw new l(bI, {
        alphabet: BB,
        base: 64,
        value: A
      });
    }
  },
  write(A, I, g) {
    try {
      const C = atob(A).split("").map((B) => B.charCodeAt(0));
      return I.set(C, g), C.length + g;
    } catch {
      throw new l(bI, {
        alphabet: BB,
        base: 64,
        value: A
      });
    }
  }
}), JE = (A) => (
  // eslint-disable-next-line no-control-regex
  A.replace(/\u0000/g, "")
), YE = globalThis.TextDecoder, CB = globalThis.TextEncoder, LE = () => {
  let A;
  return H({
    getSizeFromValue: (I) => (A ||= new CB()).encode(I).length,
    write: (I, g, C) => {
      const B = (A ||= new CB()).encode(I);
      return g.set(B, C), C + B.length;
    }
  });
}, aI = () => {
  let A;
  return gA({
    read(I, g) {
      const C = (A ||= new YE()).decode(I.slice(g));
      return [JE(C), I.length];
    }
  });
}, mE = 128;
function FA(A, I) {
  try {
    return "exists" in A && !A.exists ? A : Object.freeze({ ...A, data: I.decode(A.data) });
  } catch {
    throw new l(SQ, {
      address: A.address
    });
  }
}
function pE(A) {
  return !("exists" in A) || "exists" in A && A.exists;
}
function KE(A) {
  const I = A.filter((g) => pE(g) && g.data instanceof Uint8Array);
  if (I.length > 0) {
    const g = I.map((C) => C.address);
    throw new l(GQ, {
      addresses: g
    });
  }
}
function Gg(A, I) {
  if (!I) return Object.freeze({ address: A, exists: !1 });
  const g = XB().encode(I.data[0]);
  return Object.freeze({ ...zB(I), address: A, data: g, exists: !0 });
}
function bE(A, I) {
  if (!I) return Object.freeze({ address: A, exists: !1 });
  const g = I.data.parsed.info || {};
  return (I.data.program || I.data.parsed.type) && (g.parsedAccountMeta = {
    program: I.data.program,
    type: I.data.parsed.type
  }), Object.freeze({ ...zB(I), address: A, data: g, exists: !0 });
}
function zB(A) {
  return Object.freeze({
    executable: A.executable,
    lamports: A.lamports,
    programAddress: A.owner,
    space: A.space
  });
}
async function Fg(A, I, g = {}) {
  const { abortSignal: C, ...B } = g, Q = await A.getAccountInfo(I, { ...B, encoding: "base64" }).send({ abortSignal: C });
  return Gg(I, Q.value);
}
async function EI(A, I, g = {}) {
  const { abortSignal: C, ...B } = g;
  return (await A.getMultipleAccounts(I, { ...B, encoding: "base64" }).send({ abortSignal: C })).value.map((E, i) => Gg(I[i], E));
}
async function HE(A, I, g = {}) {
  const { abortSignal: C, ...B } = g;
  return (await A.getMultipleAccounts(I, { ...B, encoding: "jsonParsed" }).send({ abortSignal: C })).value.map((E, i) => E && typeof E == "object" && "parsed" in E.data ? bE(I[i], E) : Gg(I[i], E));
}
function _I(A) {
  if (!A.exists)
    throw new l(kQ, { address: A.address });
}
function yI(A) {
  const I = A.filter((g) => !g.exists);
  if (I.length > 0) {
    const g = I.map((C) => C.address);
    throw new l(MQ, { addresses: g });
  }
}
function ZI() {
  if (!globalThis.isSecureContext)
    throw new l(FQ);
}
var qA;
async function TE(A) {
  return qA === void 0 && (qA = new Promise((I) => {
    A.generateKey(
      "Ed25519",
      /* extractable */
      !1,
      ["sign", "verify"]
    ).then(() => {
      I(qA = !0);
    }).catch(() => {
      I(qA = !1);
    });
  })), typeof qA == "boolean" ? qA : await qA;
}
function qE() {
  if (ZI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.digest != "function")
    throw new l(fQ);
}
async function OE() {
  if (ZI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.generateKey != "function")
    throw new l(YQ);
  if (!await TE(globalThis.crypto.subtle))
    throw new l(UQ);
}
function xE() {
  if (ZI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.exportKey != "function")
    throw new l(JQ);
}
function VE() {
  if (ZI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.sign != "function")
    throw new l(LQ);
}
var Cg, Qg;
function fg() {
  return Cg || (Cg = fE()), Cg;
}
function _E() {
  return Qg || (Qg = UE()), Qg;
}
function ZE(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    return !1;
  const I = fg();
  try {
    return I.encode(A).byteLength === 32;
  } catch {
    return !1;
  }
}
function WE(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    throw new l(uQ, {
      actualLength: A.length
    });
  const C = fg().encode(A).byteLength;
  if (C !== 32)
    throw new l(dQ, {
      actualLength: C
    });
}
function F(A) {
  return WE(A), A;
}
function IA() {
  return m(
    nA(fg(), 32),
    (A) => F(A)
  );
}
function h() {
  return tA(_E(), 32);
}
function jE() {
  return uE(IA(), h());
}
function Ug() {
  return new Intl.Collator("en", {
    caseFirst: "lower",
    ignorePunctuation: !1,
    localeMatcher: "best fit",
    numeric: !1,
    sensitivity: "variant",
    usage: "sort"
  }).compare;
}
var vE = 37095705934669439343138083508754565189542113879843219016388785533085940283555n, QA = 57896044618658097711785492504343953926634992332820282019728792003956564819949n, QB = 19681161376707505956807079304988542015446066515923890162744021073123829784752n;
function cA(A) {
  const I = A % QA;
  return I >= 0n ? I : QA + I;
}
function NA(A, I) {
  let g = A;
  for (; I-- > 0n; )
    g *= g, g %= QA;
  return g;
}
function XE(A) {
  const g = A * A % QA * A % QA, C = NA(g, 2n) * g % QA, B = NA(C, 1n) * A % QA, Q = NA(B, 5n) * B % QA, E = NA(Q, 10n) * Q % QA, i = NA(E, 20n) * E % QA, e = NA(i, 40n) * i % QA, o = NA(e, 80n) * e % QA, t = NA(o, 80n) * e % QA, r = NA(t, 10n) * Q % QA;
  return NA(r, 2n) * A % QA;
}
function zE(A, I) {
  const g = cA(I * I * I), C = cA(g * g * I), B = XE(A * C);
  let Q = cA(A * g * B);
  const E = cA(I * Q * Q), i = Q, e = cA(Q * QB), o = E === A, t = E === cA(-A), r = E === cA(-A * QB);
  return o && (Q = i), (t || r) && (Q = e), (cA(Q) & 1n) === 1n && (Q = cA(-Q)), !o && !t ? null : Q;
}
function PE(A, I) {
  const g = cA(A * A), C = cA(g - 1n), B = cA(vE * g + 1n), Q = zE(C, B);
  if (Q === null)
    return !1;
  const E = (I & 128) !== 0;
  return !(Q === 0n && E);
}
function $E(A) {
  const I = A.toString(16);
  return I.length === 1 ? `0${I}` : I;
}
function Ai(A) {
  const g = `0x${A.reduce((C, B, Q) => `${$E(Q === 31 ? B & -129 : B)}${C}`, "")}`;
  return BigInt(g);
}
function Ii(A) {
  if (A.byteLength !== 32)
    return !1;
  const I = Ai(A);
  return PE(I, A[31]);
}
var EB = 32, iB = 16, gi = [
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
async function Bi({ programAddress: A, seeds: I }) {
  if (qE(), I.length > iB)
    throw new l(NQ, {
      actual: I.length,
      maxSeeds: iB
    });
  let g;
  const C = I.reduce((e, o, t) => {
    const r = typeof o == "string" ? (g ||= new TextEncoder()).encode(o) : o;
    if (r.byteLength > EB)
      throw new l(RQ, {
        actual: r.byteLength,
        index: t,
        maxSeedLength: EB
      });
    return e.push(...r), e;
  }, []), B = jE(), Q = B.encode(A), E = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array([...C, ...Q, ...gi])
  ), i = new Uint8Array(E);
  if (Ii(i))
    throw new l(bB);
  return B.decode(i);
}
async function kI({
  programAddress: A,
  seeds: I
}) {
  let g = 255;
  for (; g > 0; )
    try {
      return [await Bi({
        programAddress: A,
        seeds: [...I, new Uint8Array([g])]
      }), g];
    } catch (C) {
      if (aE(C, bB))
        g--;
      else
        throw C;
    }
  throw new l(yQ);
}
async function PB(A) {
  if (xE(), A.type !== "public" || A.algorithm.name !== "Ed25519")
    throw new l(hQ);
  const I = await crypto.subtle.exportKey("raw", A);
  return h().decode(new Uint8Array(I));
}
function $B(A, I, g, C) {
  if (C < I || C > g)
    throw new l(BE, {
      codecDescription: A,
      max: g,
      min: I,
      value: C
    });
}
function AC(A) {
  return A?.endian !== 1;
}
function MI(A) {
  return H({
    fixedSize: A.size,
    write(I, g, C) {
      A.range && $B(A.name, A.range[0], A.range[1], I);
      const B = new ArrayBuffer(A.size);
      return A.set(new DataView(B), I, AC(A.config)), g.set(new Uint8Array(B), C), C + A.size;
    }
  });
}
function fA(A) {
  return gA({
    fixedSize: A.size,
    read(I, g = 0) {
      hE(A.name, I, g), Sg(A.name, A.size, I, g);
      const C = new DataView(jB(I, g, A.size));
      return [A.get(C, AC(A.config)), g + A.size];
    }
  });
}
var Dg = (A = {}) => fA({
  config: A,
  get: (I, g) => I.getFloat64(0, g),
  name: "f64",
  size: 8
}), IC = (A = {}) => fA({
  config: A,
  get: (I, g) => {
    const C = g ? 8 : 0, B = g ? 0 : 8, Q = I.getBigInt64(C, g), E = I.getBigUint64(B, g);
    return (Q << 64n) + E;
  },
  name: "i128",
  size: 16
}), eB = (A = {}) => fA({
  config: A,
  get: (I, g) => I.getInt16(0, g),
  name: "i16",
  size: 2
}), wg = (A = {}) => MI({
  config: A,
  name: "i32",
  range: [-+"0x7fffffff" - 1, +"0x7fffffff"],
  set: (I, g, C) => I.setInt32(0, Number(g), C),
  size: 4
}), dI = (A = {}) => fA({
  config: A,
  get: (I, g) => I.getInt32(0, g),
  name: "i32",
  size: 4
}), VA = () => H({
  getSizeFromValue: (A) => A <= 127 ? 1 : A <= 16383 ? 2 : 3,
  maxSize: 3,
  write: (A, I, g) => {
    $B("shortU16", 0, 65535, A);
    const C = [0];
    for (let B = 0; ; B += 1) {
      const Q = Number(A) >> B * 7;
      if (Q === 0)
        break;
      const E = 127 & Q;
      C[B] = E, B > 0 && (C[B - 1] |= 128);
    }
    return I.set(C, g), g + C.length;
  }
}), lg = (A = {}) => MI({
  config: A,
  name: "u128",
  range: [0n, BigInt("0xffffffffffffffffffffffffffffffff")],
  set: (I, g, C) => {
    const B = C ? 8 : 0, Q = C ? 0 : 8, E = 0xffffffffffffffffn;
    I.setBigUint64(B, BigInt(g) >> 64n, C), I.setBigUint64(Q, BigInt(g) & E, C);
  },
  size: 16
}), Z = (A = {}) => fA({
  config: A,
  get: (I, g) => {
    const C = g ? 8 : 0, B = g ? 0 : 8, Q = I.getBigUint64(C, g), E = I.getBigUint64(B, g);
    return (Q << 64n) + E;
  },
  name: "u128",
  size: 16
}), U = (A = {}) => fA({
  config: A,
  get: (I, g) => I.getUint16(0, g),
  name: "u16",
  size: 2
}), WI = (A = {}) => MI({
  config: A,
  name: "u32",
  range: [0, +"0xffffffff"],
  set: (I, g, C) => I.setUint32(0, Number(g), C),
  size: 4
}), oA = (A = {}) => fA({
  config: A,
  get: (I, g) => I.getUint32(0, g),
  name: "u32",
  size: 4
}), yA = (A = {}) => MI({
  config: A,
  name: "u64",
  range: [0n, BigInt("0xffffffffffffffff")],
  set: (I, g, C) => I.setBigUint64(0, BigInt(g), C),
  size: 8
}), J = (A = {}) => fA({
  config: A,
  get: (I, g) => I.getBigUint64(0, g),
  name: "u64",
  size: 8
}), BA = () => MI({
  name: "u8",
  range: [0, +"0xff"],
  set: (A, I) => A.setUint8(0, Number(I)),
  size: 1
}), WA = () => fA({
  get: (A) => A.getUint8(0),
  name: "u8",
  size: 1
});
function gC(A, I, g) {
  if (I !== g)
    throw new l($Q, {
      actual: g,
      codecDescription: A,
      expected: I
    });
}
function Ci(A) {
  return A.reduce(
    (I, g) => I === null || g === null ? null : Math.max(I, g),
    0
  );
}
function KA(A) {
  return A.reduce((I, g) => I === null || g === null ? null : I + g, 0);
}
function iI(A) {
  return T(A) ? A.fixedSize : null;
}
function jA(A) {
  return T(A) ? A.fixedSize : A.maxSize ?? null;
}
function _A(A, I = {}) {
  const g = I.size ?? WI(), C = HI(g, iI(A)), B = HI(g, jA(A)) ?? void 0;
  return H({
    ...C !== null ? { fixedSize: C } : {
      getSizeFromValue: (Q) => (typeof g == "object" ? pA(Q.length, g) : 0) + [...Q].reduce((i, e) => i + pA(e, A), 0),
      maxSize: B
    },
    write: (Q, E, i) => (typeof g == "number" && gC("array", g, Q.length), typeof g == "object" && (i = g.write(Q.length, E, i)), Q.forEach((e) => {
      i = A.write(e, E, i);
    }), i)
  });
}
function bA(A, I = {}) {
  const g = I.size ?? oA(), C = iI(A), B = HI(g, C), Q = HI(g, jA(A)) ?? void 0;
  return gA({
    ...B !== null ? { fixedSize: B } : { maxSize: Q },
    read: (E, i) => {
      const e = [];
      if (typeof g == "object" && E.slice(i).length === 0)
        return [e, i];
      if (g === "remainder") {
        for (; i < E.length; ) {
          const [r, n] = A.read(E, i);
          i = n, e.push(r);
        }
        return [e, i];
      }
      const [o, t] = typeof g == "number" ? [g, i] : g.read(E, i);
      i = t;
      for (let r = 0; r < o; r += 1) {
        const [n, D] = A.read(E, i);
        i = D, e.push(n);
      }
      return [e, i];
    }
  });
}
function HI(A, I) {
  return typeof A != "number" ? null : A === 0 ? 0 : I === null ? null : I * A;
}
function Jg(A = {}) {
  return m(A.size ?? BA(), (I) => I ? 1 : 0);
}
function eA(A = {}) {
  return SA(A.size ?? WA(), (I) => Number(I) === 1);
}
function DA() {
  return H({
    getSizeFromValue: (A) => A.length,
    write: (A, I, g) => (I.set(A, g), g + A.length)
  });
}
function dA() {
  return gA({
    read: (A, I) => {
      const g = A.slice(I);
      return [g, I + g.length];
    }
  });
}
var Qi = () => gA({
  read(A, I) {
    return [A.slice(I).reduce((C, B) => C + B.toString(16).padStart(2, "0"), ""), A.length];
  }
});
function BC(A) {
  return H({
    fixedSize: A.length,
    write: (I, g, C) => (g.set(A, C), C + A.length)
  });
}
function CC(A) {
  return gA({
    fixedSize: A.length,
    read: (I, g) => {
      const C = Qi();
      if (!VB(I, A, g))
        throw new l(EE, {
          constant: A,
          data: I,
          hexConstant: C.decode(A),
          hexData: C.decode(I),
          offset: g
        });
      return [void 0, g + A.length];
    }
  });
}
function dg(A) {
  const I = KA(A.map(iI)), g = KA(A.map(jA)) ?? void 0;
  return H({
    ...I === null ? {
      getSizeFromValue: (C) => A.map((B, Q) => pA(C[Q], B)).reduce((B, Q) => B + Q, 0),
      maxSize: g
    } : { fixedSize: I },
    write: (C, B, Q) => (gC("tuple", A.length, C.length), A.forEach((E, i) => {
      Q = E.write(C[i], B, Q);
    }), Q)
  });
}
function gI(A) {
  const I = KA(A.map(iI)), g = KA(A.map(jA)) ?? void 0;
  return gA({
    ...I === null ? { maxSize: g } : { fixedSize: I },
    read: (C, B) => {
      const Q = [];
      return A.forEach((E) => {
        const [i, e] = E.read(C, B);
        Q.push(i), B = e;
      }), [Q, B];
    }
  });
}
function Yg(A, I) {
  const g = EC(A), C = (Q, E, i) => {
    const e = I(Q);
    return ug(A, e), A[e].write(Q, E, i);
  };
  if (g !== null)
    return H({ fixedSize: g, write: C });
  const B = iC(A);
  return H({
    ...B !== null ? { maxSize: B } : {},
    getSizeFromValue: (Q) => {
      const E = I(Q);
      return ug(A, E), pA(Q, A[E]);
    },
    write: C
  });
}
function QC(A, I) {
  const g = EC(A), C = (Q, E) => {
    const i = I(Q, E);
    return ug(A, i), A[i].read(Q, E);
  };
  if (g !== null)
    return gA({ fixedSize: g, read: C });
  const B = iC(A);
  return gA({ ...B !== null ? { maxSize: B } : {}, read: C });
}
function ug(A, I) {
  if (typeof A[I] > "u")
    throw new l(QE, {
      maxRange: A.length - 1,
      minRange: 0,
      variant: I
    });
}
function EC(A) {
  if (A.length === 0) return 0;
  if (!T(A[0])) return null;
  const I = A[0].fixedSize;
  return A.every((C) => T(C) && C.fixedSize === I) ? I : null;
}
function iC(A) {
  return Ci(A.map((I) => jA(I)));
}
function Ei(A, I = {}) {
  const g = I.discriminator ?? "__kind", C = I.size ?? BA();
  return Yg(
    A.map(
      ([, B], Q) => m(dg([C, B]), (E) => [Q, E])
    ),
    (B) => ii(A, B[g])
  );
}
function eC(A, I = {}) {
  const g = I.discriminator ?? "__kind", C = I.size ?? WA();
  return QC(
    A.map(
      ([B, Q]) => SA(gI([C, Q]), ([, E]) => ({
        [g]: B,
        ...E
      }))
    ),
    (B, Q) => Number(C.read(B, Q)[0])
  );
}
function ii(A, I) {
  const g = A.findIndex(([C]) => I === C);
  if (g < 0)
    throw new l(IE, {
      value: I,
      variants: A.map(([C]) => C)
    });
  return g;
}
function oC(A) {
  const I = [...new Set(Object.values(A).filter((E) => typeof E == "number"))].sort(), g = Object.fromEntries(Object.entries(A).slice(I.length)), C = Object.keys(g), B = Object.values(g), Q = [
    .../* @__PURE__ */ new Set([...C, ...B.filter((E) => typeof E == "string")])
  ];
  return { enumKeys: C, enumRecord: g, enumValues: B, numericalValues: I, stringValues: Q };
}
function ei({
  enumKeys: A,
  enumValues: I,
  variant: g
}) {
  const C = tC(I, (B) => B === g);
  return C >= 0 ? C : A.findIndex((B) => B === g);
}
function oi({
  discriminator: A,
  enumKeys: I,
  enumValues: g,
  useValuesAsDiscriminators: C
}) {
  return C ? tC(g, (B) => B === A) : A >= 0 && A < I.length ? A : -1;
}
function tC(A, I) {
  let g = A.length;
  for (; g--; )
    if (I(A[g], g, A)) return g;
  return -1;
}
function nC(A) {
  if (A.length === 0) return "";
  let I = [A[0], A[0]];
  const g = [];
  for (let C = 1; C < A.length; C++) {
    const B = A[C];
    I[1] + 1 === B ? I[1] = B : (g.push(I[0] === I[1] ? `${I[0]}` : `${I[0]}-${I[1]}`), I = [B, B]);
  }
  return g.push(I[0] === I[1] ? `${I[0]}` : `${I[0]}-${I[1]}`), g.join(", ");
}
function ti(A, I = {}) {
  const g = I.size ?? BA(), C = I.useValuesAsDiscriminators ?? !1, { enumKeys: B, enumValues: Q, numericalValues: E, stringValues: i } = oC(A);
  if (C && Q.some((e) => typeof e == "string"))
    throw new l(HB, {
      stringValues: Q.filter((e) => typeof e == "string")
    });
  return m(g, (e) => {
    const o = ei({ enumKeys: B, enumValues: Q, variant: e });
    if (o < 0)
      throw new l(gE, {
        formattedNumericalValues: nC(E),
        numericalValues: E,
        stringValues: i,
        variant: e
      });
    return C ? Q[o] : o;
  });
}
function rC(A, I = {}) {
  const g = I.size ?? WA(), C = I.useValuesAsDiscriminators ?? !1, { enumKeys: B, enumValues: Q, numericalValues: E } = oC(A);
  if (C && Q.some((i) => typeof i == "string"))
    throw new l(HB, {
      stringValues: Q.filter((i) => typeof i == "string")
    });
  return SA(g, (i) => {
    const e = Number(i), o = oi({
      discriminator: e,
      enumKeys: B,
      enumValues: Q,
      useValuesAsDiscriminators: C
    });
    if (o < 0) {
      const t = C ? E : [...Array(B.length).keys()];
      throw new l(AE, {
        discriminator: e,
        formattedValidDiscriminators: nC(t),
        validDiscriminators: t
      });
    }
    return Q[o];
  });
}
function ni(A, I) {
  return SA(
    gI([...I, A]),
    (g) => g[g.length - 1]
  );
}
function ri(A, I, g = {}) {
  return SA(
    bA(gI([A, I]), g),
    (C) => new Map(C)
  );
}
function Eg() {
  return H({
    fixedSize: 0,
    write: (A, I, g) => g
  });
}
function xA() {
  return gA({
    fixedSize: 0,
    read: (A, I) => [void 0, I]
  });
}
function K(A) {
  const I = A.map(([, B]) => B), g = KA(I.map(iI)), C = KA(I.map(jA)) ?? void 0;
  return H({
    ...g === null ? {
      getSizeFromValue: (B) => A.map(([Q, E]) => pA(B[Q], E)).reduce((Q, E) => Q + E, 0),
      maxSize: C
    } : { fixedSize: g },
    write: (B, Q, E) => (A.forEach(([i, e]) => {
      E = e.write(B[i], Q, E);
    }), E)
  });
}
function y(A) {
  const I = A.map(([, B]) => B), g = KA(I.map(iI)), C = KA(I.map(jA)) ?? void 0;
  return gA({
    ...g === null ? { maxSize: C } : { fixedSize: g },
    read: (B, Q) => {
      const E = {};
      return A.forEach(([i, e]) => {
        const [o, t] = e.read(B, Q);
        Q = t, E[i] = o;
      }), [E, Q];
    }
  });
}
var aC = (A) => ({ __option: "Some", value: A }), sC = () => ({ __option: "None" }), oB = (A) => !!(A && typeof A == "object" && "__option" in A && (A.__option === "Some" && "value" in A || A.__option === "None")), tB = (A) => A.__option === "Some", ai = (A) => A !== null ? aC(A) : sC();
function jI(A, I = {}) {
  const g = I.prefix === null ? m(Eg(), (B) => {
  }) : Jg({ size: I.prefix ?? BA() }), C = I.noneValue === "zeroes" ? (ZB(A), nA(Eg(), A.fixedSize)) : I.noneValue ? BC(I.noneValue) : Eg();
  return Yg(
    [
      m(dg([g, C]), (B) => [
        !1,
        void 0
      ]),
      m(dg([g, A]), (B) => [
        !0,
        oB(B) && tB(B) ? B.value : B
      ])
    ],
    (B) => {
      const Q = oB(B) ? B : ai(B);
      return Number(tB(Q));
    }
  );
}
function V(A, I = {}) {
  const g = I.prefix === null ? SA(xA(), () => !1) : eA({ size: I.prefix ?? WA() }), C = I.noneValue === "zeroes" ? (ZB(A), tA(xA(), A.fixedSize)) : I.noneValue ? CC(I.noneValue) : xA();
  return QC(
    [
      SA(gI([g, C]), () => sC()),
      SA(gI([g, A]), ([, B]) => aC(B))
    ],
    (B, Q) => {
      if (I.prefix === null && !I.noneValue)
        return +(Q < B.length);
      if (I.prefix === null && I.noneValue != null) {
        const E = I.noneValue === "zeroes" ? new Uint8Array(C.fixedSize).fill(0) : I.noneValue;
        return VB(B, E, Q) ? 0 : 1;
      }
      return Number(g.read(B, Q)[0]);
    }
  );
}
function SI(A, ...I) {
  return I.reduce((g, C) => C(g), A);
}
var W = /* @__PURE__ */ ((A) => (A[A.WRITABLE_SIGNER = /* 3 */
3] = "WRITABLE_SIGNER", A[A.READONLY_SIGNER = /* 2 */
2] = "READONLY_SIGNER", A[A.WRITABLE = /* 1 */
1] = "WRITABLE", A[A.READONLY = /* 0 */
0] = "READONLY", A))(W || {}), si = 2, ci = 1;
function ZA(A) {
  return A >= 2;
}
function uI(A) {
  return (A & ci) !== 0;
}
function nB(A, I) {
  return A | I;
}
function vI(A) {
  return A | si;
}
function Di(A) {
  return ZE(A);
}
var wi = 18446744073709551615n, ig;
function li() {
  return ig || (ig = J()), ig;
}
function di(A) {
  if (A < 0 || A > wi)
    throw new l(BQ);
}
function TI(A) {
  return di(A), A;
}
function ui() {
  return hi(li());
}
function hi(A) {
  return SA(
    A,
    (I) => TI(typeof I == "bigint" ? I : BigInt(I))
  );
}
function Ni(A) {
  return "lifetimeConstraint" in A && typeof A.lifetimeConstraint.blockhash == "string" && typeof A.lifetimeConstraint.lastValidBlockHeight == "bigint" && Di(A.lifetimeConstraint.blockhash);
}
function cC(A, I) {
  return "lifetimeConstraint" in I && I.lifetimeConstraint && "blockhash" in I.lifetimeConstraint && I.lifetimeConstraint.blockhash === A.blockhash && I.lifetimeConstraint.lastValidBlockHeight === A.lastValidBlockHeight ? I : Object.freeze({
    ...I,
    lifetimeConstraint: Object.freeze(A)
  });
}
function Ri(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new l(bI, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var yi = (A) => H({
  getSizeFromValue: (I) => {
    const [g, C] = rB(I, A[0]);
    if (!C) return I.length;
    const B = aB(C, A);
    return g.length + Math.ceil(B.toString(16).length / 2);
  },
  write(I, g, C) {
    if (Ri(A, I), I === "") return C;
    const [B, Q] = rB(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(B.length).fill(0), C), C + B.length;
    let E = aB(Q, A);
    const i = [];
    for (; E > 0n; )
      i.unshift(Number(E % 256n)), E /= 256n;
    const e = [...Array(B.length).fill(0), ...i];
    return g.set(e, C), C + e.length;
  }
});
function rB(A, I) {
  const [g, C] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, C];
}
function aB(A, I) {
  const g = BigInt(I.length);
  let C = 0n;
  for (const B of A)
    C *= g, C += BigInt(I.indexOf(B));
  return C;
}
var ki = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Mi = () => yi(ki), eg;
function Si() {
  if (!eg) {
    const A = _A(BA(), { size: VA() });
    eg = K([
      ["lookupTableAddress", IA()],
      ["writableIndexes", A],
      ["readonlyIndexes", A]
    ]);
  }
  return eg;
}
var og;
function tg() {
  return og || (og = BA()), og;
}
function Gi() {
  return K([
    ["numSignerAccounts", tg()],
    ["numReadonlySignerAccounts", tg()],
    ["numReadonlyNonSignerAccounts", tg()]
  ]);
}
var ng;
function Fi() {
  return ng || (ng = m(
    K([
      ["programAddressIndex", BA()],
      ["accountIndices", _A(BA(), { size: VA() })],
      ["data", WB(DA(), VA())]
    ]),
    // Convert an instruction to have all fields defined
    (A) => A.accountIndices !== void 0 && A.data !== void 0 ? A : {
      ...A,
      accountIndices: A.accountIndices ?? [],
      data: A.data ?? new Uint8Array(0)
    }
  )), ng;
}
var fi = 0, Ui = 128;
function Ji() {
  return H({
    getSizeFromValue: (A) => A === "legacy" ? 0 : 1,
    maxSize: 1,
    write: (A, I, g) => {
      if (A === "legacy")
        return g;
      if (A < 0 || A > 127)
        throw new l(HQ, {
          actualVersion: A
        });
      if (A > fi)
        throw new l(OQ, {
          unsupportedVersion: A
        });
      return I.set([A | Ui], g), g + 1;
    }
  });
}
function sB() {
  return K(DC());
}
function cB() {
  return m(
    K([
      ...DC(),
      ["addressTableLookups", Yi()]
    ]),
    (A) => A.version === "legacy" ? A : {
      ...A,
      addressTableLookups: A.addressTableLookups ?? []
    }
  );
}
function DC() {
  const A = Yg(
    [
      // Use a 32-byte constant encoder for a missing lifetime token (index 0).
      BC(new Uint8Array(32)),
      // Use a 32-byte base58 encoder for a valid lifetime token (index 1).
      nA(Mi(), 32)
    ],
    (I) => I === void 0 ? 0 : 1
  );
  return [
    ["version", Ji()],
    ["header", Gi()],
    ["staticAccounts", _A(IA(), { size: VA() })],
    ["lifetimeToken", A],
    ["instructions", _A(Fi(), { size: VA() })]
  ];
}
function Yi() {
  return _A(Si(), { size: VA() });
}
function Li() {
  return H({
    getSizeFromValue: (A) => A.version === "legacy" ? sB().getSizeFromValue(A) : cB().getSizeFromValue(A),
    write: (A, I, g) => A.version === "legacy" ? sB().write(A, I, g) : cB().write(A, I, g)
  });
}
function DB(A, I, g) {
  A[I] = g(A[I] ?? { role: W.READONLY });
}
var _ = Symbol("AddressMapTypeProperty");
function mi(A, I) {
  const g = {
    [A]: { [_]: 0, role: W.WRITABLE_SIGNER }
  }, C = /* @__PURE__ */ new Set();
  for (const B of I) {
    DB(g, B.programAddress, (E) => {
      if (C.add(B.programAddress), _ in E) {
        if (uI(E.role))
          switch (E[_]) {
            case 0:
              throw new l(bQ, {
                programAddress: B.programAddress
              });
            default:
              throw new l(Pg, {
                programAddress: B.programAddress
              });
          }
        if (E[_] === 2)
          return E;
      }
      return { [_]: 2, role: W.READONLY };
    });
    let Q;
    if (B.accounts)
      for (const E of B.accounts)
        DB(g, E.address, (i) => {
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
                const t = nB(i.role, o.role);
                if ("lookupTableAddress" in o) {
                  if (
                    // Consider using the new LOOKUP_TABLE if its address is different...
                    i.lookupTableAddress !== o.lookupTableAddress && // ...and sorts before the existing one.
                    (Q ||= Ug())(
                      o.lookupTableAddress,
                      i.lookupTableAddress
                    ) < 0
                  )
                    return {
                      [_]: 1,
                      ...o,
                      role: t
                    };
                } else if (ZA(o.role))
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
                const t = nB(i.role, o.role);
                if (
                  // Check to see if this address represents a program that is invoked
                  // in this transaction.
                  C.has(E.address)
                ) {
                  if (uI(o.role))
                    throw new l(
                      Pg,
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
                !ZA(i.role) ? {
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
function pi(A) {
  let I;
  return Object.entries(A).sort(([C, B], [Q, E]) => {
    if (B[_] !== E[_]) {
      if (B[_] === 0)
        return -1;
      if (E[_] === 0)
        return 1;
      if (B[_] === 2)
        return -1;
      if (E[_] === 2)
        return 1;
    }
    const i = ZA(B.role);
    if (i !== ZA(E.role))
      return i ? -1 : 1;
    const e = uI(B.role);
    return e !== uI(E.role) ? e ? -1 : 1 : (I ||= Ug(), B[_] === 1 && E[_] === 1 && B.lookupTableAddress !== E.lookupTableAddress ? I(B.lookupTableAddress, E.lookupTableAddress) : I(C, Q));
  }).map(([C, B]) => ({
    address: C,
    ...B
  }));
}
function Ki(A) {
  const I = {};
  for (const g of A) {
    if (!("lookupTableAddress" in g))
      continue;
    const C = I[g.lookupTableAddress] ||= {
      readonlyIndexes: [],
      writableIndexes: []
    };
    g.role === W.WRITABLE ? C.writableIndexes.push(g.addressIndex) : C.readonlyIndexes.push(g.addressIndex);
  }
  return Object.keys(I).sort(Ug()).map((g) => ({
    lookupTableAddress: g,
    ...I[g]
  }));
}
function bi(A) {
  let I = 0, g = 0, C = 0;
  for (const B of A) {
    if ("lookupTableAddress" in B)
      break;
    const Q = uI(B.role);
    ZA(B.role) ? (C++, Q || g++) : Q || I++;
  }
  return {
    numReadonlyNonSignerAccounts: I,
    numReadonlySignerAccounts: g,
    numSignerAccounts: C
  };
}
function Hi(A) {
  const I = {};
  for (const [g, C] of A.entries())
    I[C.address] = g;
  return I;
}
function Ti(A, I) {
  const g = Hi(I);
  return A.map(({ accounts: C, data: B, programAddress: Q }) => ({
    programAddressIndex: g[Q],
    ...C ? { accountIndices: C.map(({ address: E }) => g[E]) } : null,
    ...B ? { data: B } : null
  }));
}
function qi(A) {
  return "nonce" in A ? A.nonce : A.blockhash;
}
function Oi(A) {
  const I = A.findIndex((C) => "lookupTableAddress" in C);
  return (I === -1 ? A : A.slice(0, I)).map(({ address: C }) => C);
}
function xi(A) {
  const I = mi(
    A.feePayer.address,
    A.instructions
  ), g = pi(I), C = A.lifetimeConstraint;
  return {
    ...A.version !== "legacy" ? { addressTableLookups: Ki(g) } : null,
    ...C ? { lifetimeToken: qi(C) } : null,
    header: bi(g),
    instructions: Ti(A.instructions, g),
    staticAccounts: Oi(g),
    version: A.version
  };
}
function Vi(A, I, g) {
  for (const [C, B] of Object.entries(g))
    for (let Q = 0; Q < B.length; Q++)
      if (A === B[Q])
        return {
          address: A,
          addressIndex: Q,
          lookupTableAddress: C,
          role: I
        };
}
function _i(A, I) {
  const g = new Set(A.instructions.map((E) => E.programAddress)), C = new Set(
    Object.values(I).flatMap((E) => E).filter((E) => !g.has(E))
  ), B = [];
  let Q = !1;
  for (const E of A.instructions) {
    if (!E.accounts) {
      B.push(E);
      continue;
    }
    const i = [];
    let e = !1;
    for (const o of E.accounts) {
      if ("lookupTableAddress" in o || !C.has(o.address) || ZA(o.role)) {
        i.push(o);
        continue;
      }
      const t = Vi(
        o.address,
        o.role,
        I
      );
      i.push(Object.freeze(t)), e = !0, Q = !0;
    }
    B.push(
      Object.freeze(e ? { ...E, accounts: i } : E)
    );
  }
  return Object.freeze(
    Q ? { ...A, instructions: B } : A
  );
}
function wC(A) {
  return Object.freeze({
    instructions: Object.freeze([]),
    version: A.version
  });
}
var Zi = "SysvarRecentB1ockHashes11111111111111111111", Wi = "11111111111111111111111111111111";
function ji(A) {
  return A.programAddress === Wi && // Test for `AdvanceNonceAccount` instruction data
  A.data != null && vi(A.data) && // Test for exactly 3 accounts
  A.accounts?.length === 3 && // First account is nonce account address
  A.accounts[0].address != null && A.accounts[0].role === W.WRITABLE && // Second account is recent blockhashes sysvar
  A.accounts[1].address === Zi && A.accounts[1].role === W.READONLY && // Third account is nonce authority account
  A.accounts[2].address != null && ZA(A.accounts[2].role);
}
function vi(A) {
  return A.byteLength === 4 && A[0] === 4 && A[1] === 0 && A[2] === 0 && A[3] === 0;
}
function Xi(A) {
  return "lifetimeConstraint" in A && typeof A.lifetimeConstraint.nonce == "string" && A.instructions[0] != null && ji(A.instructions[0]);
}
function lC(A, I) {
  return Object.freeze({
    ...I,
    instructions: Object.freeze([
      ...I.instructions,
      ...A
    ])
  });
}
var dC = (
  // Resist the temptation to convert this to a simple string; As of version 133.0.3, Firefox
  // requires the object form of `AlgorithmIdentifier` and will throw a `DOMException` otherwise.
  Object.freeze({ name: "Ed25519" })
);
async function uC(A, I) {
  VE();
  const g = await crypto.subtle.sign(dC, A, jB(I));
  return new Uint8Array(g);
}
async function zi() {
  return await OE(), await crypto.subtle.generateKey(
    /* algorithm */
    dC,
    // Native implementation status: https://github.com/WICG/webcrypto-secure-curves/issues/20
    /* extractable */
    !1,
    // Prevents the bytes of the private key from being visible to JS.
    /* allowed uses */
    ["sign", "verify"]
  );
}
function Pi(A) {
  const I = Object.values(A);
  if (I.length === 0)
    throw new l(qQ);
  return I.map((g) => g || new Uint8Array(64).fill(0));
}
function $i() {
  return m(
    _A(nA(DA(), 64), { size: VA() }),
    Pi
  );
}
function hC() {
  return K([
    ["signatures", $i()],
    ["messageBytes", DA()]
  ]);
}
function Ae(A) {
  const I = xi(A), g = Li().encode(I), C = I.staticAccounts.slice(0, I.header.numSignerAccounts), B = {};
  for (const E of C)
    B[E] = null;
  let Q;
  return Ni(A) ? Q = {
    blockhash: A.lifetimeConstraint.blockhash,
    lastValidBlockHeight: A.lifetimeConstraint.lastValidBlockHeight
  } : Xi(A) && (Q = {
    nonce: A.lifetimeConstraint.nonce,
    nonceAccountAddress: A.instructions[0].accounts[0].address
  }), Object.freeze({
    ...Q ? { lifetimeConstraint: Q } : void 0,
    messageBytes: g,
    signatures: Object.freeze(B)
  });
}
async function Ie(A, I) {
  let g, C;
  if (await Promise.all(
    A.map(async (B) => {
      const Q = await PB(B.publicKey), E = I.signatures[Q];
      if (E === void 0) {
        C ||= /* @__PURE__ */ new Set(), C.add(Q);
        return;
      }
      if (C)
        return;
      const i = await uC(B.privateKey, I.messageBytes);
      E !== null && _B(i, E) || (g ||= {}, g[Q] = i);
    })
  ), C && C.size > 0) {
    const B = Object.keys(I.signatures);
    throw new l(TQ, {
      expectedAddresses: B,
      unexpectedAddresses: [...C]
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
function ge(A) {
  return JSON.parse(Be(A), (I, g) => ie(g) ? Ee(g) : g);
}
function Be(A) {
  const I = [];
  let g = !1;
  for (let C = 0; C < A.length; C++) {
    let B = !1;
    if (A[C] === "\\" && (I.push(A[C++]), B = !B), A[C] === '"') {
      I.push(A[C]), B || (g = !g);
      continue;
    }
    if (!g) {
      const Q = Ce(A, C);
      if (Q?.length) {
        C += Q.length - 1, Q.match(/\.|[eE]-/) ? I.push(Q) : I.push(Qe(Q));
        continue;
      }
    }
    I.push(A[C]);
  }
  return I.join("");
}
function Ce(A, I) {
  const g = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;
  if (!A[I]?.match(/[-\d]/))
    return null;
  const C = A.slice(I).match(g);
  return C ? C[0] : null;
}
function Qe(A) {
  return `{"$n":"${A}"}`;
}
function Ee({ $n: A }) {
  if (A.match(/[eE]/)) {
    const [I, g] = A.split(/[eE]/);
    return BigInt(I) * BigInt(10) ** BigInt(g);
  }
  return BigInt(A);
}
function ie(A) {
  return !!A && typeof A == "object" && "$n" in A && typeof A.$n == "string";
}
var wB = 0n;
function ee() {
  const A = wB;
  return wB++, A.toString();
}
function oe(A) {
  return {
    id: ee(),
    jsonrpc: "2.0",
    method: A.methodName,
    params: A.params
  };
}
function te(A, I) {
  return re(
    JSON.stringify(A, (g, C) => typeof C == "bigint" ? ne(C) : C, I)
  );
}
function ne(A) {
  return { $n: `${A}` };
}
function re(A) {
  return A.replace(/\{\s*"\$n"\s*:\s*"(-?\d+)"\s*\}/g, "$1");
}
function ae(A) {
  return se(A);
}
function se(A) {
  return new Proxy(A.api, {
    defineProperty() {
      return !1;
    },
    deleteProperty() {
      return !1;
    },
    get(I, g, C) {
      if (g !== "then")
        return function(...B) {
          const Q = g.toString(), E = Reflect.get(I, Q, C);
          if (!E)
            throw new l(oE, {
              method: Q,
              params: B
            });
          const i = E(...B);
          return ce(A, i);
        };
    }
  });
}
function ce({ transport: A }, I) {
  return {
    async send(g) {
      return await I.execute({ signal: g?.abortSignal, transport: A });
    }
  };
}
function De(A) {
  return new Proxy({}, {
    defineProperty() {
      return !1;
    },
    deleteProperty() {
      return !1;
    },
    get(...I) {
      const [g, C] = I, B = C.toString();
      return function(...Q) {
        const E = Object.freeze({ methodName: B, params: Q }), i = A?.requestTransformer ? A?.requestTransformer(E) : E;
        return Object.freeze({
          execute: async ({ signal: e, transport: o }) => {
            const t = oe(i), r = await o({ payload: t, signal: e });
            return A?.responseTransformer ? A.responseTransformer(r, i) : r;
          }
        });
      };
    }
  });
}
function NC(A) {
  return A == null || typeof A != "object" || Array.isArray(A) ? !1 : "jsonrpc" in A && A.jsonrpc === "2.0" && "method" in A && typeof A.method == "string" && "params" in A;
}
function we(A) {
  return typeof A == "bigint" ? (
    // FIXME(solana-labs/solana/issues/30341) Create a data type to represent u64 in the Solana
    // JSON RPC implementation so that we can throw away this entire patcher instead of unsafely
    // downcasting `bigints` to `numbers`.
    Number(A)
  ) : A;
}
var w = {};
function RC(A) {
  return function I(g, C) {
    if (Array.isArray(g))
      return g.map((B, Q) => {
        const E = {
          ...C,
          keyPath: [...C.keyPath, Q]
        };
        return I(B, E);
      });
    if (typeof g == "object" && g !== null) {
      const B = {};
      for (const Q in g) {
        if (!Object.prototype.hasOwnProperty.call(g, Q))
          continue;
        const E = {
          ...C,
          keyPath: [...C.keyPath, Q]
        };
        B[Q] = I(g[Q], E);
      }
      return B;
    } else
      return A.reduce((B, Q) => Q(B, C), g);
  };
}
function yC(A, I) {
  return (g) => {
    const C = RC(A);
    return Object.freeze({
      ...g,
      params: C(g.params, I)
    });
  };
}
function kC(A, I) {
  return (g) => RC(A)(g, I);
}
function le() {
  return yC([we], { keyPath: [] });
}
function de({
  commitmentPropertyName: A,
  params: I,
  optionsObjectPositionInParams: g,
  overrideCommitment: C
}) {
  const B = I[g];
  if (
    // There's no config.
    B === void 0 || // There is a config object.
    B && typeof B == "object" && !Array.isArray(B)
  )
    if (
      // The config object already has a commitment set.
      B && A in B
    ) {
      if (!B[A] || B[A] === "finalized") {
        const Q = [...I], {
          [A]: E,
          // eslint-disable-line @typescript-eslint/no-unused-vars
          ...i
        } = B;
        return Object.keys(i).length > 0 ? Q[g] = i : g === Q.length - 1 ? Q.length-- : Q[g] = void 0, Q;
      }
    } else {
      const Q = [...I];
      return Q[g] = {
        ...B,
        [A]: C
      }, Q;
    }
  return I;
}
function ue({
  defaultCommitment: A,
  optionsObjectPositionByMethod: I
}) {
  return (g) => {
    const { params: C, methodName: B } = g;
    if (!Array.isArray(C))
      return g;
    const Q = I[B];
    return Q == null ? g : Object.freeze({
      methodName: B,
      params: de({
        commitmentPropertyName: B === "sendTransaction" ? "preflightCommitment" : "commitment",
        optionsObjectPositionInParams: Q,
        overrideCommitment: A,
        params: C
      })
    });
  };
}
function he(A) {
  return (I, { keyPath: g }) => (typeof I == "bigint" && A && (I > Number.MAX_SAFE_INTEGER || I < -Number.MAX_SAFE_INTEGER) && A(g, I), I);
}
function Ne(A) {
  return (I) => yC(
    [he((...C) => A(I, ...C))],
    { keyPath: [] }
  )(I);
}
var Re = {
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
function ye(A) {
  const I = A?.onIntegerOverflow;
  return (g) => SI(
    g,
    I ? Ne(I) : (C) => C,
    le(),
    ue({
      defaultCommitment: A?.defaultCommitment,
      optionsObjectPositionByMethod: Re
    })
  );
}
function MC(A) {
  return function(g, { keyPath: C }) {
    return typeof g == "number" && Number.isInteger(g) || typeof g == "bigint" ? ke(C, A) ? Number(g) : BigInt(g) : g;
  };
}
function ke(A, I) {
  return I.some((g) => {
    if (g.length !== A.length)
      return !1;
    for (let C = A.length - 1; C >= 0; C--) {
      const B = A[C], Q = g[C];
      if (Q !== B && (Q !== w || typeof B != "number"))
        return !1;
    }
    return !0;
  });
}
function Me(A) {
  return kC([MC(A)], { keyPath: [] });
}
function Se() {
  return (A) => A.result;
}
var hg = [
  // parsed Token/Token22 token account
  ["data", "parsed", "info", "tokenAmount", "decimals"],
  ["data", "parsed", "info", "tokenAmount", "uiAmount"],
  ["data", "parsed", "info", "rentExemptReserve", "decimals"],
  ["data", "parsed", "info", "rentExemptReserve", "uiAmount"],
  ["data", "parsed", "info", "delegatedAmount", "decimals"],
  ["data", "parsed", "info", "delegatedAmount", "uiAmount"],
  ["data", "parsed", "info", "extensions", w, "state", "olderTransferFee", "transferFeeBasisPoints"],
  ["data", "parsed", "info", "extensions", w, "state", "newerTransferFee", "transferFeeBasisPoints"],
  ["data", "parsed", "info", "extensions", w, "state", "preUpdateAverageRate"],
  ["data", "parsed", "info", "extensions", w, "state", "currentRate"]
], DI = [
  ...hg,
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
  ["data", "parsed", "info", "votes", w, "confirmationCount"]
], LI = [
  ["index"],
  ["instructions", w, "accounts", w],
  ["instructions", w, "programIdIndex"],
  ["instructions", w, "stackHeight"]
], lB = [
  ["addressTableLookups", w, "writableIndexes", w],
  ["addressTableLookups", w, "readonlyIndexes", w],
  ["header", "numReadonlySignedAccounts"],
  ["header", "numReadonlyUnsignedAccounts"],
  ["header", "numRequiredSignatures"],
  ["instructions", w, "accounts", w],
  ["instructions", w, "programIdIndex"],
  ["instructions", w, "stackHeight"]
];
function Ge() {
  return [
    ["loadedAccountsDataSize"],
    ...DI.map((A) => ["accounts", w, ...A]),
    ...LI.map((A) => ["innerInstructions", w, ...A])
  ];
}
function Fe() {
  return (A, I) => {
    const g = A;
    if ("error" in g) {
      const { error: C } = g;
      if (C && typeof C == "object" && "code" in C && (C.code === -32002 || C.code === -32002n) && "data" in C && C.data) {
        const E = kC(
          [MC(Ge())],
          { keyPath: [] }
        )(C.data), i = { ...C, data: E };
        throw cg(i);
      }
      throw cg(g.error);
    }
    return g;
  };
}
function fe(A) {
  return (I, g) => {
    const C = g.methodName, B = A?.allowedNumericKeyPaths && C ? A.allowedNumericKeyPaths[C] : void 0;
    return SI(
      I,
      (Q) => Fe()(Q),
      (Q) => Se()(Q),
      (Q) => Me(B ?? [])(Q)
    );
  };
}
function Ue(A) {
  return De({
    requestTransformer: ye(A),
    responseTransformer: fe({
      allowedNumericKeyPaths: Je()
    })
  });
}
var rg;
function Je() {
  return rg || (rg = {
    getAccountInfo: DI.map((A) => ["value", ...A]),
    getBlock: [
      ["transactions", w, "meta", "preTokenBalances", w, "accountIndex"],
      [
        "transactions",
        w,
        "meta",
        "preTokenBalances",
        w,
        "uiTokenAmount",
        "decimals"
      ],
      ["transactions", w, "meta", "postTokenBalances", w, "accountIndex"],
      [
        "transactions",
        w,
        "meta",
        "postTokenBalances",
        w,
        "uiTokenAmount",
        "decimals"
      ],
      ["transactions", w, "meta", "rewards", w, "commission"],
      ...LI.map((A) => [
        "transactions",
        w,
        "meta",
        "innerInstructions",
        w,
        ...A
      ]),
      ...lB.map((A) => ["transactions", w, "transaction", "message", ...A]),
      ["rewards", w, "commission"]
    ],
    getClusterNodes: [
      [w, "featureSet"],
      [w, "shredVersion"]
    ],
    getInflationGovernor: [["initial"], ["foundation"], ["foundationTerm"], ["taper"], ["terminal"]],
    getInflationRate: [["foundation"], ["total"], ["validator"]],
    getInflationReward: [[w, "commission"]],
    getMultipleAccounts: DI.map((A) => ["value", w, ...A]),
    getProgramAccounts: DI.flatMap((A) => [
      ["value", w, "account", ...A],
      [w, "account", ...A]
    ]),
    getRecentPerformanceSamples: [[w, "samplePeriodSecs"]],
    getTokenAccountBalance: [
      ["value", "decimals"],
      ["value", "uiAmount"]
    ],
    getTokenAccountsByDelegate: hg.map((A) => [
      "value",
      w,
      "account",
      ...A
    ]),
    getTokenAccountsByOwner: hg.map((A) => [
      "value",
      w,
      "account",
      ...A
    ]),
    getTokenLargestAccounts: [
      ["value", w, "decimals"],
      ["value", w, "uiAmount"]
    ],
    getTokenSupply: [
      ["value", "decimals"],
      ["value", "uiAmount"]
    ],
    getTransaction: [
      ["meta", "preTokenBalances", w, "accountIndex"],
      ["meta", "preTokenBalances", w, "uiTokenAmount", "decimals"],
      ["meta", "postTokenBalances", w, "accountIndex"],
      ["meta", "postTokenBalances", w, "uiTokenAmount", "decimals"],
      ["meta", "rewards", w, "commission"],
      ...LI.map((A) => ["meta", "innerInstructions", w, ...A]),
      ...lB.map((A) => ["transaction", "message", ...A])
    ],
    getVersion: [["feature-set"]],
    getVoteAccounts: [
      ["current", w, "commission"],
      ["delinquent", w, "commission"]
    ],
    simulateTransaction: [
      ["value", "loadedAccountsDataSize"],
      ...DI.map((A) => ["value", "accounts", w, ...A]),
      ...LI.map((A) => ["value", "innerInstructions", w, ...A])
    ]
  }), rg;
}
function Ye(A) {
  const I = {};
  for (const g in A)
    I[g.toLowerCase()] = A[g];
  return I;
}
function Le(A) {
  const { fromJson: I, headers: g, toJson: C, url: B } = A;
  let Q;
  const E = g && Ye(g);
  return async function({
    payload: e,
    signal: o
  }) {
    const t = C ? C(e) : JSON.stringify(e), r = {
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
    }, n = await fetch(B, r);
    if (!n.ok)
      throw new l(eE, {
        headers: n.headers,
        message: n.statusText,
        statusCode: n.status
      });
    return I ? I(await n.text(), e) : await n.json();
  };
}
var me = [
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
function dB(A) {
  return NC(A) && me.includes(A.method);
}
function pe(A) {
  return Le({
    ...A,
    fromJson: (I, g) => dB(g) ? ge(I) : JSON.parse(I),
    toJson: (I) => dB(I) ? te(I) : JSON.stringify(I)
  });
}
var Ke = Object.prototype.toString, be = Object.keys || function(A) {
  const I = [];
  for (const g in A)
    I.push(g);
  return I;
};
function wI(A, I) {
  let g, C, B, Q, E, i, e;
  if (A === !0)
    return "true";
  if (A === !1)
    return "false";
  switch (typeof A) {
    case "object":
      if (A === null)
        return null;
      if ("toJSON" in A && typeof A.toJSON == "function")
        return wI(A.toJSON(), I);
      if (e = Ke.call(A), e === "[object Array]") {
        for (B = "[", C = A.length - 1, g = 0; g < C; g++)
          B += wI(A[g], !0) + ",";
        return C > -1 && (B += wI(A[g], !0)), B + "]";
      } else if (e === "[object Object]") {
        for (Q = be(A).sort(), C = Q.length, B = "", g = 0; g < C; )
          E = Q[g], i = wI(A[E], !1), i !== void 0 && (B && (B += ","), B += JSON.stringify(E) + ":" + i), g++;
        return "{" + B + "}";
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
function He(A) {
  const I = wI(A, !1);
  if (I !== void 0)
    return "" + I;
}
function SC(A, I, g) {
  let C = "";
  if (typeof I[0] == "number") {
    const E = I[0] + 1, i = E % 10, e = E % 100;
    i == 1 && e != 11 ? C = E + "st" : i == 2 && e != 12 ? C = E + "nd" : i == 3 && e != 13 ? C = E + "rd" : C = E + "th";
  } else
    C = `\`${I[0].toString()}\``;
  const B = I.length > 1 ? I.slice(1).map((E) => typeof E == "number" ? `[${E}]` : E).join(".") : void 0, Q = new l(iE, {
    argumentLabel: C,
    keyPath: I,
    methodName: A,
    optionalPathLabel: B ? ` at path \`${B}\`` : "",
    value: g,
    ...B !== void 0 ? { path: B } : void 0
  });
  return Mg(Q, SC), Q;
}
var Te = {
  defaultCommitment: "confirmed",
  onIntegerOverflow(A, I, g) {
    throw SC(A.methodName, I, g);
  }
}, qe = globalThis.AbortController, uB;
function hB() {
  return {};
}
function Oe(A, I) {
  let g;
  return async function(B) {
    const { payload: Q, signal: E } = B, i = I(Q);
    if (i === void 0)
      return await A(B);
    if (g || (queueMicrotask(() => {
      g = void 0;
    }), g = {}), g[i] == null) {
      const o = new qe(), t = (async () => {
        try {
          return await A({
            ...B,
            signal: o.signal
          });
        } catch (r) {
          if (r === (uB ||= hB()))
            return;
          throw r;
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
      return await new Promise((t, r) => {
        const n = (D) => {
          E.removeEventListener("abort", n), e.numConsumers -= 1, queueMicrotask(() => {
            e.numConsumers === 0 && e.abortController.abort(uB ||= hB());
          }), r(D.target.reason);
        };
        E.addEventListener("abort", n), o.then(t).catch(r).finally(() => {
          E.removeEventListener("abort", n);
        });
      });
    } else
      return await e.responsePromise;
  };
}
function xe(A) {
  return NC(A) ? He([A.method, A.params]) : void 0;
}
function Ve(A) {
  const I = {};
  for (const g in A)
    I[g.toLowerCase()] = A[g];
  return I;
}
function _e(A) {
  return SI(
    pe({
      ...A,
      headers: {
        ...A.headers ? Ve(A.headers) : void 0,
        // Keep these headers lowercase so they will override any user-supplied headers above.
        "solana-client": "js/5.5.1"
      }
    }),
    (I) => Oe(I, xe)
  );
}
function Ze(A) {
  return ae({
    api: Ue(Te),
    transport: A
  });
}
function Lg(A) {
  const I = {};
  return A.forEach((g) => {
    if (!I[g.address])
      I[g.address] = g;
    else if (I[g.address] !== g)
      throw new l(KQ, {
        address: g.address
      });
  }), Object.values(I);
}
function XI(A) {
  return "modifyAndSignTransactions" in A && typeof A.modifyAndSignTransactions == "function";
}
function hI(A) {
  return "signTransactions" in A && typeof A.signTransactions == "function";
}
function GC(A) {
  return "signAndSendTransactions" in A && typeof A.signAndSendTransactions == "function";
}
function eI(A) {
  return hI(A) || XI(A) || GC(A);
}
function We(A) {
  return Lg(
    (A.accounts ?? []).flatMap((I) => "signer" in I ? I.signer : [])
  );
}
function je(A) {
  return Lg([
    ...A.feePayer && eI(A.feePayer) ? [A.feePayer] : [],
    ...A.instructions.flatMap(We)
  ]);
}
function FC(A, I) {
  Object.freeze(A);
  const g = { ...I, feePayer: A };
  return Object.freeze(g), g;
}
async function ve(A) {
  const I = await PB(A.publicKey);
  return Object.freeze({
    address: I,
    keyPair: A,
    signMessages: (C) => Promise.all(
      C.map(
        async (B) => Object.freeze({ [I]: await uC(A.privateKey, B.content) })
      )
    ),
    signTransactions: (C) => Promise.all(
      C.map(async (B) => {
        const Q = await Ie([A], B);
        return Object.freeze({ [I]: Q.signatures[I] });
      })
    )
  });
}
async function fC() {
  return await ve(await zi());
}
function vA(A) {
  return Object.freeze({
    address: A,
    signMessages: (g) => Promise.resolve(g.map(() => Object.freeze({}))),
    signTransactions: (g) => Promise.resolve(g.map(() => Object.freeze({})))
  });
}
async function UC(A, I) {
  const { partialSigners: g, modifyingSigners: C } = Xe(
    Lg(je(A).filter(eI)),
    { identifySendingSigner: !1 }
  );
  return await $e(
    A,
    C,
    g,
    I
  );
}
function Xe(A, I = {}) {
  const C = I.identifySendingSigner ?? !0 ? ze(A) : null, B = A.filter(
    (i) => i !== C && (XI(i) || hI(i))
  ), Q = Pe(B), E = B.filter(hI).filter((i) => !Q.includes(i));
  return Object.freeze({ modifyingSigners: Q, partialSigners: E, sendingSigner: C });
}
function ze(A) {
  const I = A.filter(GC);
  if (I.length === 0) return null;
  const g = I.filter(
    (C) => !XI(C) && !hI(C)
  );
  return g.length > 0 ? g[0] : I[0];
}
function Pe(A) {
  const I = A.filter(XI);
  if (I.length === 0) return [];
  const g = I.filter((C) => !hI(C));
  return g.length > 0 ? g : [I[0]];
}
async function $e(A, I = [], g = [], C) {
  const B = Ae(A), Q = await I.reduce(
    async (i, e) => {
      const [o] = await e.modifyAndSignTransactions([await i], C);
      return Object.freeze(o);
    },
    Promise.resolve(B)
  ), E = await Promise.all(
    g.map(async (i) => {
      const [e] = await i.signTransactions([Q], C);
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
async function Ao(A, I, g) {
  if (A.length === 0)
    return {};
  const C = await HE(
    I,
    A,
    g
  );
  return KE(C), yI(C), C.reduce((B, Q) => ({
    ...B,
    [Q.address]: Q.data.addresses
  }), {});
}
var mg = "11111111111111111111111111111111";
function Io(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function pg(A, I) {
  return (g) => {
    if (!g.value)
      return;
    const C = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: Io(g.value),
      role: NB(g.value) ? vI(C) : C,
      ...NB(g.value) ? { signer: g.value } : {}
    });
  };
}
function NB(A) {
  return !!A && typeof A == "object" && "address" in A && eI(A);
}
var go = 0;
function Bo() {
  return m(
    K([
      ["discriminator", WI()],
      ["lamports", yA()],
      ["space", yA()],
      ["programAddress", IA()]
    ]),
    (A) => ({ ...A, discriminator: go })
  );
}
function Co(A, I) {
  const g = mg, B = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    newAccount: { value: A.newAccount ?? null, isWritable: !0 }
  }, Q = { ...A }, E = [Number(Q.space) + mE].reduce(
    (e, o) => e + o,
    0
  ), i = pg();
  return Object.freeze({
    accounts: [
      i(B.payer),
      i(B.newAccount)
    ],
    byteDelta: E,
    data: Bo().encode(
      Q
    ),
    programAddress: g
  });
}
var Qo = 3;
function Eo() {
  return m(
    K([
      ["discriminator", WI()],
      ["base", IA()],
      ["seed", WB(LE(), yA())],
      ["amount", yA()],
      ["space", yA()],
      ["programAddress", IA()]
    ]),
    (A) => ({
      ...A,
      discriminator: Qo
    })
  );
}
function io(A, I) {
  const g = mg, B = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    newAccount: { value: A.newAccount ?? null, isWritable: !0 },
    baseAccount: { value: A.baseAccount ?? null, isWritable: !1 }
  }, Q = { ...A }, E = pg();
  return Object.freeze({
    accounts: [
      E(B.payer),
      E(B.newAccount),
      E(B.baseAccount)
    ].filter((i) => i !== void 0),
    data: Eo().encode(
      Q
    ),
    programAddress: g
  });
}
var eo = 2;
function oo() {
  return m(
    K([
      ["discriminator", WI()],
      ["amount", yA()]
    ]),
    (A) => ({ ...A, discriminator: eo })
  );
}
function JC(A, I) {
  const g = mg, B = {
    source: { value: A.source ?? null, isWritable: !0 },
    destination: { value: A.destination ?? null, isWritable: !0 }
  }, Q = { ...A }, E = pg();
  return Object.freeze({
    accounts: [
      E(B.source),
      E(B.destination)
    ],
    data: oo().encode(
      Q
    ),
    programAddress: g
  });
}
var to = F(
  "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
), no = F(
  "2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ"
);
F(
  "FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR"
);
F(
  "iwhrLHdsgrvmnwU8GF2FSmyabSMjfHwFGJAX2ufJ3ZN"
);
F(
  "8pm8erUsaMpmZ47LttHAPgnDx7xGZUvxY4q47vTCs5Nj"
);
var ro = {
  /** The mutable whirlpool program on Solana Mainnet, paired with its mainnet config account. */
  mainnet: {
    programId: to,
    configAddress: no
  }
}, HA = ro.mainnet, YC = /* @__PURE__ */ ((A) => (A[A.TransferHookA = 0] = "TransferHookA", A[A.TransferHookB = 1] = "TransferHookB", A[A.TransferHookReward = 2] = "TransferHookReward", A[A.TransferHookInput = 3] = "TransferHookInput", A[A.TransferHookIntermediate = 4] = "TransferHookIntermediate", A[A.TransferHookOutput = 5] = "TransferHookOutput", A[A.SupplementalTickArrays = 6] = "SupplementalTickArrays", A[A.SupplementalTickArraysOne = 7] = "SupplementalTickArraysOne", A[A.SupplementalTickArraysTwo = 8] = "SupplementalTickArraysTwo", A[A.TransferHookDepositA = 9] = "TransferHookDepositA", A[A.TransferHookDepositB = 10] = "TransferHookDepositB", A[A.TransferHookWithdrawalA = 11] = "TransferHookWithdrawalA", A[A.TransferHookWithdrawalB = 12] = "TransferHookWithdrawalB", A))(YC || {});
function ao() {
  return ti(YC);
}
function so() {
  return eC([
    ["Uninitialized", xA()],
    [
      "Initialized",
      y([
        ["fields", gI([co()])]
      ])
    ]
  ]);
}
function co() {
  return y([
    ["liquidityNet", IC()],
    ["liquidityGross", Z()],
    ["feeGrowthOutsideA", Z()],
    ["feeGrowthOutsideB", Z()],
    ["rewardGrowthsOutside", bA(Z(), { size: 3 })]
  ]);
}
function Do() {
  return Ei([
    [
      "ByTokenAmounts",
      K([
        ["tokenMaxA", yA()],
        ["tokenMaxB", yA()],
        ["minSqrtPrice", lg()],
        ["maxSqrtPrice", lg()]
      ])
    ]
  ]);
}
function wo(A, I) {
  return Array.isArray(I) ? { __kind: A, fields: I } : { __kind: A, ...I ?? {} };
}
function lo() {
  return y([
    ["growthInsideCheckpoint", Z()],
    ["amountOwed", J()]
  ]);
}
function zI() {
  return K([
    ["slices", _A(uo())]
  ]);
}
function uo() {
  return K([
    ["accountsType", ao()],
    ["length", BA()]
  ]);
}
function ho() {
  return y([
    ["initialized", eA()],
    ["liquidityNet", IC()],
    ["liquidityGross", Z()],
    ["feeGrowthOutsideA", Z()],
    ["feeGrowthOutsideB", Z()],
    ["rewardGrowthsOutside", bA(Z(), { size: 3 })]
  ]);
}
function No() {
  return y([
    ["mint", h()],
    ["vault", h()],
    ["extension", tA(dA(), 32)],
    ["emissionsPerSecondX64", Z()],
    ["growthGlobalX64", Z()]
  ]);
}
var Ro = new Uint8Array([
  17,
  216,
  246,
  142,
  225,
  199,
  218,
  56
]);
function yo() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["startTickIndex", dI()],
    ["whirlpool", h()],
    ["tickBitmap", Z()],
    ["ticks", bA(so(), { size: 88 })]
  ]);
}
function ko(A) {
  return FA(
    A,
    yo()
  );
}
var Mo = new Uint8Array([
  69,
  97,
  189,
  190,
  110,
  7,
  66,
  187
]);
function So() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["startTickIndex", dI()],
    ["ticks", bA(ho(), { size: 88 })],
    ["whirlpool", h()]
  ]);
}
function Go(A) {
  return FA(
    A,
    So()
  );
}
function Fo() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["whirlpool", h()],
    ["positionMint", h()],
    ["liquidity", Z()],
    ["tickLowerIndex", dI()],
    ["tickUpperIndex", dI()],
    ["feeGrowthCheckpointA", Z()],
    ["feeOwedA", J()],
    ["feeGrowthCheckpointB", Z()],
    ["feeOwedB", J()],
    [
      "rewardInfos",
      bA(lo(), { size: 3 })
    ]
  ]);
}
function Ng(A) {
  return FA(
    A,
    Fo()
  );
}
async function LC(A, I, g) {
  const C = await fo(A, I, g);
  return _I(C), C;
}
async function fo(A, I, g) {
  const C = await Fg(A, I, g);
  return Ng(C);
}
function Uo() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["positionBundleMint", h()],
    ["positionBitmap", tA(dA(), 32)]
  ]);
}
function Jo(A) {
  return FA(
    A,
    Uo()
  );
}
function Yo() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["whirlpoolsConfig", h()],
    ["whirlpoolBump", tA(dA(), 1)],
    ["tickSpacing", U()],
    ["feeTierIndexSeed", tA(dA(), 2)],
    ["feeRate", U()],
    ["protocolFeeRate", U()],
    ["liquidity", Z()],
    ["sqrtPrice", Z()],
    ["tickCurrentIndex", dI()],
    ["protocolFeeOwedA", J()],
    ["protocolFeeOwedB", J()],
    ["tokenMintA", h()],
    ["tokenVaultA", h()],
    ["feeGrowthGlobalA", Z()],
    ["tokenMintB", h()],
    ["tokenVaultB", h()],
    ["feeGrowthGlobalB", Z()],
    ["rewardLastUpdatedTimestamp", J()],
    [
      "rewardInfos",
      bA(No(), { size: 3 })
    ]
  ]);
}
function mC(A) {
  return FA(
    A,
    Yo()
  );
}
async function Kg(A, I, g) {
  const C = await Lo(A, I, g);
  return _I(C), C;
}
async function Lo(A, I, g) {
  const C = await Fg(A, I, g);
  return mC(C);
}
async function bg(A, I, g) {
  const C = await mo(A, I, g);
  return yI(C), C;
}
async function mo(A, I, g) {
  return (await EI(A, I, g)).map((B) => mC(B));
}
var UA = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";
function po(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function JA(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const C = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: po(g.value),
      role: RB(g.value) ? vI(C) : C,
      ...RB(g.value) ? { signer: g.value } : {}
    });
  };
}
function RB(A) {
  return !!A && typeof A == "object" && "address" in A && eI(A);
}
var Ko = new Uint8Array([
  123,
  134,
  81,
  0,
  49,
  68,
  98,
  98
]);
function bo() {
  return m(
    K([["discriminator", nA(DA(), 8)]]),
    (A) => ({ ...A, discriminator: Ko })
  );
}
function Ho(A, I) {
  const g = I?.programAddress ?? UA, B = {
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
  B.tokenProgram.value || (B.tokenProgram.value = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
  const Q = JA(g);
  return Object.freeze({
    accounts: [
      Q(B.positionAuthority),
      Q(B.receiver),
      Q(B.position),
      Q(B.positionMint),
      Q(B.positionTokenAccount),
      Q(B.tokenProgram)
    ],
    data: bo().encode({}),
    programAddress: g
  });
}
var To = new Uint8Array([1, 182, 135, 59, 155, 25, 99, 223]);
function qo() {
  return m(
    K([["discriminator", nA(DA(), 8)]]),
    (A) => ({
      ...A,
      discriminator: To
    })
  );
}
function Oo(A, I) {
  const g = I?.programAddress ?? UA, B = {
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
  B.token2022Program.value || (B.token2022Program.value = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
  const Q = JA(g);
  return Object.freeze({
    accounts: [
      Q(B.positionAuthority),
      Q(B.receiver),
      Q(B.position),
      Q(B.positionMint),
      Q(B.positionTokenAccount),
      Q(B.token2022Program)
    ],
    data: qo().encode(
      {}
    ),
    programAddress: g
  });
}
var xo = new Uint8Array([
  207,
  117,
  95,
  191,
  229,
  180,
  226,
  15
]);
function Vo() {
  return m(
    K([
      ["discriminator", nA(DA(), 8)],
      [
        "remainingAccountsInfo",
        jI(zI())
      ]
    ]),
    (A) => ({ ...A, discriminator: xo })
  );
}
function pC(A, I) {
  const g = I?.programAddress ?? UA, B = {
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
  B.memoProgram.value || (B.memoProgram.value = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  const E = JA(g);
  return Object.freeze({
    accounts: [
      E(B.whirlpool),
      E(B.positionAuthority),
      E(B.position),
      E(B.positionTokenAccount),
      E(B.tokenMintA),
      E(B.tokenMintB),
      E(B.tokenOwnerAccountA),
      E(B.tokenVaultA),
      E(B.tokenOwnerAccountB),
      E(B.tokenVaultB),
      E(B.tokenProgramA),
      E(B.tokenProgramB),
      E(B.memoProgram)
    ],
    data: Vo().encode(
      Q
    ),
    programAddress: g
  });
}
var _o = new Uint8Array([
  177,
  107,
  37,
  180,
  160,
  19,
  49,
  209
]);
function Zo() {
  return m(
    K([
      ["discriminator", nA(DA(), 8)],
      ["rewardIndex", BA()],
      [
        "remainingAccountsInfo",
        jI(zI())
      ]
    ]),
    (A) => ({ ...A, discriminator: _o })
  );
}
function KC(A, I) {
  const g = I?.programAddress ?? UA, B = {
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
  B.memoProgram.value || (B.memoProgram.value = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  const E = JA(g);
  return Object.freeze({
    accounts: [
      E(B.whirlpool),
      E(B.positionAuthority),
      E(B.position),
      E(B.positionTokenAccount),
      E(B.rewardOwnerAccount),
      E(B.rewardMint),
      E(B.rewardVault),
      E(B.rewardTokenProgram),
      E(B.memoProgram)
    ],
    data: Zo().encode(
      Q
    ),
    programAddress: g
  });
}
var Wo = new Uint8Array([
  58,
  127,
  188,
  62,
  79,
  82,
  196,
  96
]);
function jo() {
  return m(
    K([
      ["discriminator", nA(DA(), 8)],
      ["liquidityAmount", lg()],
      ["tokenMinA", yA()],
      ["tokenMinB", yA()],
      [
        "remainingAccountsInfo",
        jI(zI())
      ]
    ]),
    (A) => ({
      ...A,
      discriminator: Wo
    })
  );
}
function vo(A, I) {
  const g = I?.programAddress ?? UA, B = {
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
  B.memoProgram.value || (B.memoProgram.value = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  const E = JA(g);
  return Object.freeze({
    accounts: [
      E(B.whirlpool),
      E(B.tokenProgramA),
      E(B.tokenProgramB),
      E(B.memoProgram),
      E(B.positionAuthority),
      E(B.position),
      E(B.positionTokenAccount),
      E(B.tokenMintA),
      E(B.tokenMintB),
      E(B.tokenOwnerAccountA),
      E(B.tokenOwnerAccountB),
      E(B.tokenVaultA),
      E(B.tokenVaultB),
      E(B.tickArrayLower),
      E(B.tickArrayUpper)
    ],
    data: jo().encode(
      Q
    ),
    programAddress: g
  });
}
var Xo = new Uint8Array([239, 251, 9, 124, 210, 198, 53, 43]);
function zo() {
  return m(
    K([
      ["discriminator", nA(DA(), 8)],
      ["method", Do()],
      [
        "remainingAccountsInfo",
        jI(zI())
      ]
    ]),
    (A) => ({
      ...A,
      discriminator: Xo
    })
  );
}
function Po(A, I) {
  const g = I?.programAddress ?? UA, B = {
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
  B.memoProgram.value || (B.memoProgram.value = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  const E = JA(g);
  return Object.freeze({
    accounts: [
      E(B.whirlpool),
      E(B.tokenProgramA),
      E(B.tokenProgramB),
      E(B.memoProgram),
      E(B.positionAuthority),
      E(B.position),
      E(B.positionTokenAccount),
      E(B.tokenMintA),
      E(B.tokenMintB),
      E(B.tokenOwnerAccountA),
      E(B.tokenOwnerAccountB),
      E(B.tokenVaultA),
      E(B.tokenVaultB),
      E(B.tickArrayLower),
      E(B.tickArrayUpper)
    ],
    data: zo().encode(
      Q
    ),
    programAddress: g
  });
}
var $o = new Uint8Array([
  41,
  33,
  165,
  200,
  120,
  231,
  142,
  50
]);
function At() {
  return m(
    K([
      ["discriminator", nA(DA(), 8)],
      ["startTickIndex", wg()],
      ["idempotent", Jg()]
    ]),
    (A) => ({
      ...A,
      discriminator: $o
    })
  );
}
function yB(A, I) {
  const g = I?.programAddress ?? UA, B = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !1 },
    funder: { value: A.funder ?? null, isWritable: !0 },
    tickArray: { value: A.tickArray ?? null, isWritable: !0 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 }
  }, Q = { ...A };
  B.systemProgram.value || (B.systemProgram.value = "11111111111111111111111111111111");
  const E = JA(g);
  return Object.freeze({
    accounts: [
      E(B.whirlpool),
      E(B.funder),
      E(B.tickArray),
      E(B.systemProgram)
    ],
    data: At().encode(
      Q
    ),
    programAddress: g
  });
}
var It = new Uint8Array(
  [212, 47, 95, 92, 114, 102, 131, 250]
);
function gt() {
  return m(
    K([
      ["discriminator", nA(DA(), 8)],
      ["tickLowerIndex", wg()],
      ["tickUpperIndex", wg()],
      ["withTokenMetadataExtension", Jg()]
    ]),
    (A) => ({
      ...A,
      discriminator: It
    })
  );
}
function Bt(A, I) {
  const g = I?.programAddress ?? UA, B = {
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
  B.token2022Program.value || (B.token2022Program.value = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"), B.systemProgram.value || (B.systemProgram.value = "11111111111111111111111111111111"), B.associatedTokenProgram.value || (B.associatedTokenProgram.value = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), B.metadataUpdateAuth.value || (B.metadataUpdateAuth.value = "3axbTs2z5GBy6usVbNVoqEgZMng3vZvMnAoX29BFfwhr");
  const E = JA(g);
  return Object.freeze({
    accounts: [
      E(B.funder),
      E(B.owner),
      E(B.position),
      E(B.positionMint),
      E(B.positionTokenAccount),
      E(B.whirlpool),
      E(B.token2022Program),
      E(B.systemProgram),
      E(B.associatedTokenProgram),
      E(B.metadataUpdateAuth)
    ],
    data: gt().encode(
      Q
    ),
    programAddress: g
  });
}
var Ct = new Uint8Array([
  154,
  230,
  250,
  13,
  236,
  209,
  75,
  223
]);
function Qt() {
  return m(
    K([["discriminator", nA(DA(), 8)]]),
    (A) => ({
      ...A,
      discriminator: Ct
    })
  );
}
function Et(A, I) {
  const g = I?.programAddress ?? UA, B = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !0 },
    position: { value: A.position ?? null, isWritable: !0 },
    tickArrayLower: { value: A.tickArrayLower ?? null, isWritable: !1 },
    tickArrayUpper: { value: A.tickArrayUpper ?? null, isWritable: !1 }
  }, Q = JA(g);
  return Object.freeze({
    accounts: [
      Q(B.whirlpool),
      Q(B.position),
      Q(B.tickArrayLower),
      Q(B.tickArrayUpper)
    ],
    data: Qt().encode({}),
    programAddress: g
  });
}
var bC = J().decode(
  Mo
), it = J().decode(
  Ro
);
function et(A) {
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
function kB(A) {
  if ("exists" in A && !A.exists)
    return A;
  const g = J().decode(
    A.data.discriminator.subarray(0, 8)
  ) === bC ? "Fixed" : "Dynamic";
  return {
    ...A,
    data: {
      __kind: g,
      ...A.data,
      ticks: A.data.ticks.map(et)
    }
  };
}
function ot(A) {
  if ("exists" in A && !A.exists)
    return A;
  const I = J().decode(
    A.data.subarray(0, 8)
  );
  switch (I) {
    case bC:
      return kB(Go(A));
    case it:
      return kB(ko(A));
    default:
      throw new Error(`Unknown discriminator: ${I}`);
  }
}
async function HC(A, I, g) {
  const C = await TC(A, I, g);
  return yI(C), C;
}
async function TC(A, I, g) {
  return (await EI(A, I, g)).map((B) => ot(B));
}
async function PI(A, I = HA.programId) {
  return await kI({
    programAddress: I,
    seeds: ["position", IA().encode(A)]
  });
}
async function tt(A, I = HA.programId) {
  return await kI({
    programAddress: I,
    seeds: ["position_bundle", IA().encode(A)]
  });
}
async function nt(A, I, g = HA.programId) {
  return await kI({
    programAddress: g,
    seeds: [
      "bundled_position",
      IA().encode(A),
      Buffer.from(I.toString())
    ]
  });
}
async function BI(A, I, g = HA.programId) {
  return await kI({
    programAddress: g,
    seeds: [
      "tick_array",
      IA().encode(A),
      `${I}`
    ]
  });
}
function MB() {
  return 148;
}
var rt = "SysvarRent111111111111111111111111111111111";
async function at(A, I, g) {
  return await Fg(A, I, g);
}
function st() {
  return y([
    ["lamportsPerByteYear", ui()],
    ["exemptionThreshold", Dg()],
    ["burnPercent", WA()]
  ]);
}
async function ct(A, I) {
  const g = await at(A, rt, I);
  return _I(g), FA(g, st()).data;
}
const Dt = "data:application/wasm;base64,AGFzbQEAAAABjAM0YAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gAX8AYAN/f38AYAABf2AFf39/f38AYAR/f39/AGADf35/AGAFf39/fn8AYAh/f39/f39/fwBgCH9+f39/f39/AGAEf39/fwF/YAV/fn5+fgBgBH9+fn8AYAN8f38Bf2ADf39/AXxgBX9/f39/AX9gAX4Bf2AIf35+fn5+fn8AYAZ/f39/f38Bf2AKf35/f39/f35/fwBgBn9+fn5+fgBgBn9/f39/fwBgAXwBf2ABfwF8YAJ+fgF/YAJ8fAF8YAh/fn9/f39+fwBgCX9/f39/fn9/fwBgB39/f39/f38AYAF8AXxgCX9/f39/f35+fgBgCH9+fn5+f39/AGADfn9/AX9gB39/f39/f38Bf2ADf35+AGADf35/AX9gAn9/AXxgAABgCX9+fn5+fn5/fwBgA39/fABgBX9/fX9/AGAEf31/fwBgBX9/fn9/AGAEf35/fwBgBX9/fH9/AGAEf3x/fwBgBH9/fn4AYAN8f38BfGAAAX4C1BoxKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmluZGdlbl9vYmplY3RfZHJvcF9yZWYABCguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fc3RyaW5nX25ldwAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMcX193YmluZGdlbl9iaWdpbnRfZ2V0X2FzX2k2NAABKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzEF9fd2JpbmRnZW5fdGhyb3cAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzEV9fd2JpbmRnZW5fbWVtb3J5AAYoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxVfX3diaW5kZ2VuX3N0cmluZ19nZXQAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX2dldF82N2IyYmE2MmZjMzBkZTEyAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxpfX3diZ19nZXRfYjliOTMwNDdmZTNjZjQ1YgAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMdX193YmdfbGVuZ3RoX2UyZDJhNDkxMzJjMWIyNTYAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JpbmRnZW5fb2JqZWN0X2Nsb25lX3JlZgADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMWX193YmluZGdlbl9pc19mdW5jdGlvbgADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3Xzc4ZmViMTA4YjY0NzI3MTMABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX25ldwAZKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMUX193YmluZGdlbl9pc19vYmplY3QAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JnX25leHRfMjVmZWFkZmMwOTEzZmVhOQADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMbX193YmdfbmV4dF82NTc0ZTFhOGE2MmQxMDU1AAMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxtfX3diZ19kb25lXzc2OWU1ZWRlNGIzMWM2N2IAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzHF9fd2JnX3ZhbHVlX2NkMWZmYTdiMWFiNzk0ZjEAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzH19fd2JnX2l0ZXJhdG9yXzlhMjRjODhkZjg2MGRjNjUABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JnX2NhbGxfNjcyYTRkMjE2MzRkNGEyNAAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3XzQwNWUyMmYzOTA1NzZjZTIABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX2dldAABKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMXX193YmluZGdlbl9pc191bmRlZmluZWQAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX3NldF8zNzgzNzAyM2YzZDc0MGU4AAUoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx5fX3diZ19pc0FycmF5X2ExZWFiN2UwZDA2NzM5MWIAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzLV9fd2JnX2luc3RhbmNlb2ZfQXJyYXlCdWZmZXJfZTE0NTg1NDMyZTM3MzdmYwADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMkX193YmdfaXNTYWZlSW50ZWdlcl8zNDNlMmJlZWVlY2UxYmIwAAMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx1fX3diZ19idWZmZXJfNjA5Y2MzZWVlNTFlZDE1OAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3X2ExMjAwMmE3ZjkxYzc1YmUAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX3NldF82NTU5NWJkZDg2OGIzMDA5AAUoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx1fX3diZ19sZW5ndGhfYTQ0NjE5M2RjMjJjMTJmOAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMsX193YmdfaW5zdGFuY2VvZl9VaW50OEFycmF5XzE3MTU2YmNmMTE4MDg2YTkAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGV9fd2JpbmRnZW5fanN2YWxfbG9vc2VfZXEAACguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFF9fd2JpbmRnZW5fYXNfbnVtYmVyABooLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxRfX3diaW5kZ2VuX2Vycm9yX25ldwAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmluZGdlbl9iaWdpbnRfZnJvbV9pNjQAEyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JpbmRnZW5fYmlnaW50X2Zyb21fdTY0ABMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxtfX3diaW5kZ2VuX2JpZ2ludF9mcm9tX3UxMjgAGyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzJF9fd2JnX2dldHdpdGhyZWZrZXlfMWRjMzYxYmQxMDA1M2JmZQAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMdX193YmdfU3RyaW5nX2VlY2M0YTExOTg3MTI3ZDYAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzJF9fd2JnX2dldHdpdGhyZWZrZXlfNjU1MGIyYzA5M2QyZWIxOAAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193Ymdfc2V0XzM4MDdkNWYwYmZjMjRhYTcABSguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzDl9fd2JpbmRnZW5fc2hyAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxNfX3diaW5kZ2VuX2pzdmFsX2VxAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcw1fX3diaW5kZ2VuX2luAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxRfX3diaW5kZ2VuX2lzX2JpZ2ludAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMTX193YmluZGdlbl9pc19hcnJheQADA+8C7QIDCAMBHB0BAQEBDgcKCx4AFAofBRUCCwEFAiAEFhYXAAIAAAICAgIDAAEBDwcBAgELDAwLDAwhIgABBSMFBQkAFCQBARgAAAEIJQEBAQEBAQEBAQEBAAAAAAAAAQAJFwUmAQUFCQEBAQcFAwMFAQEAAQEBCQEBBwEBAwEJAgEBAQEFAQEFAgAAAAIBAQEBAQgAAwEDDgAHBAAQAAMAAgIKCgcHGAEFAgECAgkCDw8JAicAAAAAAAAHBwQICAgRAAQEAgUBASgCAAECAQEFKQUAAQEAEg4FAAQEBAQEBAQEBAQEBAQEBAQBAQQEAAANAAAEAAEECAAAFSoEBysSLS8NAAAIAgAEAQMDAgUFBA0AAgQxAgIABwABAQEAAAAABQAAAAUBAAMDAwEFBQAEAAMDBRAREAADAAEAAAEAAgEAETIAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAAMDAAAAAAAAAAAGBgYGAwYGBgYGMwQFAXABbW0FAwEAEQYJAX8BQYCAwAALB5AQUAZtZW1vcnkCABpnZXRUaWNrQXJyYXlTdGFydFRpY2tJbmRleACIAxR0aWNrSW5kZXhUb1NxcnRQcmljZQCJAxRzcXJ0UHJpY2VUb1RpY2tJbmRleACXAxlnZXRJbml0aWFsaXphYmxlVGlja0luZGV4ALoCHWdldFByZXZJbml0aWFsaXphYmxlVGlja0luZGV4AIcCHWdldE5leHRJbml0aWFsaXphYmxlVGlja0luZGV4AJwCE2lzVGlja0luZGV4SW5Cb3VuZHMA1gITaXNUaWNrSW5pdGlhbGl6YWJsZQCxAg9pbnZlcnRUaWNrSW5kZXgAigMPaW52ZXJ0U3FydFByaWNlANcCF2dldEZ1bGxSYW5nZVRpY2tJbmRleGVzAMIBEG9yZGVyVGlja0luZGV4ZXMAzQEPaXNGdWxsUmFuZ2VPbmx5ANgCE2dldFRpY2tJbmRleEluQXJyYXkAwAEQY29sbGVjdEZlZXNRdW90ZQBDHV9SRURVQ1RJT05fRkFDVE9SX0RFTk9NSU5BVE9SAJkDKF9BREFQVElWRV9GRUVfQ09OVFJPTF9GQUNUT1JfREVOT01JTkFUT1IAmgMSX01BWF9SRUZFUkVOQ0VfQUdFAJ0DHV9USUNLX0FSUkFZX05PVF9FVkVOTFlfU1BBQ0VEAIgCGV9USUNLX0lOREVYX09VVF9PRl9CT1VORFMAiQITX0lOVkFMSURfVElDS19JTkRFWACKAhRfQVJJVEhNRVRJQ19PVkVSRkxPVwCLAhdfQU1PVU5UX0VYQ0VFRFNfTUFYX1U2NACMAhlfU1FSVF9QUklDRV9PVVRfT0ZfQk9VTkRTAI0CFF9USUNLX1NFUVVFTkNFX0VNUFRZAI4CH19TUVJUX1BSSUNFX0xJTUlUX09VVF9PRl9CT1VORFMAjwIjX0lOVkFMSURfU1FSVF9QUklDRV9MSU1JVF9ESVJFQ1RJT04AkAIVX1pFUk9fVFJBREFCTEVfQU1PVU5UAJECEl9JTlZBTElEX1RJTUVTVEFNUACSAhVfSU5WQUxJRF9UUkFOU0ZFUl9GRUUAkwIbX0lOVkFMSURfU0xJUFBBR0VfVE9MRVJBTkNFAJQCGF9USUNLX0lOREVYX05PVF9JTl9BUlJBWQCVAhxfSU5WQUxJRF9USUNLX0FSUkFZX1NFUVVFTkNFAJYCGl9JTlZBTElEX0FEQVBUSVZFX0ZFRV9JTkZPAJcCJF9WT0xBVElMSVRZX0FDQ1VNVUxBVE9SX1NDQUxFX0ZBQ1RPUgCZAxRfRkVFX1JBVEVfSEFSRF9MSU1JVACaAxZkZWNyZWFzZUxpcXVpZGl0eVF1b3RlAGEXZGVjcmVhc2VMaXF1aWRpdHlRdW90ZUEAYhdkZWNyZWFzZUxpcXVpZGl0eVF1b3RlQgBjFmluY3JlYXNlTGlxdWlkaXR5UXVvdGUAZBdpbmNyZWFzZUxpcXVpZGl0eVF1b3RlQQBlF2luY3JlYXNlTGlxdWlkaXR5UXVvdGVCAGYMX05VTV9SRVdBUkRTAJgDHGlzSW5pdGlhbGl6ZWRXaXRoQWRhcHRpdmVGZWUAzAETY29sbGVjdFJld2FyZHNRdW90ZQA/EnRyeUdldEFtb3VudERlbHRhQQDSARJ0cnlHZXRBbW91bnREZWx0YUIA0wEYdHJ5R2V0TmV4dFNxcnRQcmljZUZyb21BANABGHRyeUdldE5leHRTcXJ0UHJpY2VGcm9tQgDRARN0cnlBcHBseVRyYW5zZmVyRmVlAG8adHJ5UmV2ZXJzZUFwcGx5VHJhbnNmZXJGZWUApAEkdHJ5R2V0TWF4QW1vdW50V2l0aFNsaXBwYWdlVG9sZXJhbmNlAI4BJHRyeUdldE1pbkFtb3VudFdpdGhTbGlwcGFnZVRvbGVyYW5jZQCsAQ90cnlBcHBseVN3YXBGZWUAlQEWdHJ5UmV2ZXJzZUFwcGx5U3dhcEZlZQDbARVzd2FwUXVvdGVCeUlucHV0VG9rZW4ATRZzd2FwUXVvdGVCeU91dHB1dFRva2VuAE4QX1RJQ0tfQVJSQVlfU0laRQCTAydfRlVMTF9SQU5HRV9PTkxZX1RJQ0tfU1BBQ0lOR19USFJFU0hPTEQAlAMPX01JTl9USUNLX0lOREVYAJsDD19NQVhfVElDS19JTkRFWACcAxBwcmljZVRvU3FydFByaWNlAOICEHNxcnRQcmljZVRvUHJpY2UA8AILaW52ZXJ0UHJpY2UA8QIQdGlja0luZGV4VG9QcmljZQDjAhBwcmljZVRvVGlja0luZGV4AOQCGmdldFNxcnRQcmljZVNsaXBwYWdlQm91bmRzALgBH2ZpcnN0VW5vY2N1cGllZFBvc2l0aW9uSW5CdW5kbGUA4QEUaXNQb3NpdGlvbkJ1bmRsZUZ1bGwA5gEVaXNQb3NpdGlvbkJ1bmRsZUVtcHR5AOcBFV9QT1NJVElPTl9CVU5ETEVfU0laRQCVAxVfRkVFX1JBVEVfREVOT01JTkFUT1IAlgMRaXNQb3NpdGlvbkluUmFuZ2UAwwIOcG9zaXRpb25TdGF0dXMA4AENcG9zaXRpb25SYXRpbwDXARNfX3diaW5kZ2VuX2V4cG9ydF8wAIACE19fd2JpbmRnZW5fZXhwb3J0XzEAngITX193YmluZGdlbl9leHBvcnRfMgDBAh9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyAOYCCdkBAQBBAQtsnQLcAtgBtgL3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KQPAA3wiASADVK18IAEgASAEQegDaikDACACIAQpA+ADfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgCBxBEAgBEGwA2ogAUIAQuX3xebz8438BEIAEMUBIARBkANqIAJCAELl98Xm8/ON/ARCABDFASAEQaADaiABQgBC2te40RNCABDFASAEQYADaiACQgBC2te40RNCABDFASAEQYgDaikDACAEQZgDaikDACAEQbgDaikDACIBIAQpA5ADfCICIAFUrXwiAyAEKQOAA3wiASADVK18IAEgASAEQagDaikDACACIAQpA6ADfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgMAAcQRAIARB8AJqIAFCAELC1sq/55/qhp5/QgAQxQEgBEHQAmogAkIAQsLWyr/nn+qGnn9CABDFASAEQeACaiABQgBC5pfVjBhCABDFASAEQcACaiACQgBC5pfVjBhCABDFASAEQcgCaikDACAEQdgCaikDACAEQfgCaikDACIBIAQpA9ACfCICIAFUrXwiAyAEKQPAAnwiASADVK18IAEgASAEQegCaikDACACIAQpA+ACfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgIABcQRAIARBsAJqIAFCAEL30JSBiNKArRhCABDFASAEQZACaiACQgBC99CUgYjSgK0YQgAQxQEgBEGgAmogAUIAQt3KiaYkQgAQxQEgBEGAAmogAkIAQt3KiaYkQgAQxQEgBEGIAmopAwAgBEGYAmopAwAgBEG4AmopAwAiASAEKQOQAnwiAiABVK18IgMgBCkDgAJ8IgEgA1StfCABIAEgBEGoAmopAwAgAiAEKQOgAnwiAyACVK18fCIBVq18QiCGIAFCIIiEIQIgAUIghiADQiCIhCEBCyAAQYCAAnEEQCAEQfABaiABQgBC6POdi8bj1smff0IAEMUBIARB0AFqIAJCAELo852LxuPWyZ9/QgAQxQEgBEHgAWogAUIAQuvdhazSAEIAEMUBIARBwAFqIAJCAELr3YWs0gBCABDFASAEQcgBaikDACAEQdgBaikDACAEQfgBaikDACIBIAQpA9ABfCICIAFUrXwiAyAEKQPAAXwiASADVK18IAEg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NwM4IAEgEzcDKCABIBQ3AxggASAEQZgBaikDADcDaCABIARBiAFqKQMANwNYDAELIAEgBCgCUDYCBCABQQE2AgALIAQoAggiAUGDAU0NACABEAALIAQoAgQiAUGDAUsEQCABEAALIARBsAFqJAAgAigCgAJFBEAgAkEwaiANIA5B4AAQSkHgABBKGkIBIRMMCwsgAigChAIhASAAQQE2AgAgACABNgIEDA0LDA4LIAIoAhwgAkEANgIcBEAgAkGAAmogAigCIBCfASACKAKAAkUEQCACKQOIAiEoQgEhHwwKCyACKAKEAiEBIABBATYCACAAIAE2AgQMDAsMDQsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhICACKQOQAiEhQgEhHgwJCyACKAKEAiEBIABBATYCACAAIAE2AgQMCwsMDAsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhIiACKQOQAiEjQgEhHQwICyACKAKEAiEBIABBATYCACAAIAE2AgQMCgsMCwsgAigCHCACQQA2AhwEQCACQQhqIAIoAiAQ9QFBASELIAIoAgwhDCACKAIIRQ0GIABBATYCACAAIAw2AgQMCQsMCgsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhJCACKQOQAiElQgEhHAwGCyACKAKEAiEBIABBATYCACAAIAE2AgQMCAsMCQsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhJiACKQOQAiEnQgEhGwwFCyACKAKEAiEBIABBATYCACAAIAE2AgQMBwsMCAsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEJkCIAIvAYACRQRAIAIvAYICIRBBASEKDAQLIAIoAoQCIQEgAEEBNgIAIAAgATYCBAwGCwwHCyACKAIcIAJBADYCHARAIAJBgAJqIAIoAiAQmQIgAi8BgAJFBEAgAi8BggIhEUEBIQkMAwsgAigChAIhASAAQQE2AgAgACABNgIEDAULDAYLIAIoAhwgAkEANgIcBEAgAkGAAmogAigCIBCZAiACLwGAAkUEQCACLwGCAiESQQEhCAwCCyACKAKEAiEBIABBATYCACAAIAE2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IAFBATYCACABIAQ2AgQMAQsgAyAFOgAMIAMgBDYCCCADQRBqIANBCGoQrwECQAJAIAMpAxgiCiADKQMQIgtCAoWEUEUEQCAKIAuEUEUNAUEAIANB/wBqQcDfwAAQzgEhBCABQQE2AgAgASAENgIEDAILIAEgAygCIDYCBCABQQE2AgAMAQsgA0EoaikDACEKIAMpAyAhCyADQTBqIANBCGoQrwEgAykDOCIMIAMpAzAiDUIChYRQRQRAIAwgDYRQBEBBASADQf8AakHA38AAEM4BIQQgAUEBNgIAIAEgBDYCBAwCCyADQcgAaikDACEMIAMpA0AhDSADQdAAaiADQQhqEK8BAkAgAygCUCIEQQNxQQNGDQACfwJAAkAgBEEBaw4CAwEAC0ECIANB/wBqQcDfwAAQzgEMAQsgAygCYAshBCABQQE2AgAgASAENgIEDAILIAEgAykDYDcDMCABIA03AyAgASALNwMQIAFBADYCACABIAw3AyggASAKNwMYIAEgA0HoAGopAwA3AzgMAQsgASADKAJANgIEIAFBATYCAAsgAygCCCIBQYMBTQ0AIAEQAAsgAygCBCIBQYMBSwRAIAEQAAsgA0GAAWokACACKAKQAUUEQCACQSBqIAggCUEwEEpBMBBKGkIBIQoMBwsgAigClAEhASAAQQI6AHAgACABNgIADAoLDAsLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRIgAikDoAEhE0IBIREMBgsgAigClAEhASAAQQI6AHAgACABNgIADAkLDAoLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRQgAikDoAEhFUIBIRAMBQsgAigClAEhASAAQQI6AHAgACABNgIADAgLDAkLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRYgAikDoAEhF0IBIQ8MBAsgAigClAEhASAAQQI6AHAgACABNgIADAcLDAgLIAIoAgwgAkEANgIMBEAgAkGQAWohAyACKAIQIQQjAEEwayIBJAAgASAENgIMAkAgBBAvQQFHBEAgAUEMaiABQRBqQaDgwAAQVCEFIANBATYCACADIAU2AgQgBEGEAUkNASAEEAAMAQsgAUEQaiAEEJYBIAEoAhAiBEUEQCADIAEpAyA3AxAgA0EANgIAIAMgAUEoaikDADcDGCAERQ0BIAEoAhQiA0GEAUkNASADEAAMAQtByOLAAEHLABDGASEEIANBATYCACADIAQ2AgQgASgCFCIDQYQBSQ0AIAMQAAsgAUEwaiQAIAIoApABRQRAIAcpAwAhGCACKQOgASEZQgEhDgwDCyACKAKUASEBIABBAjoAcCAAIAE2AgAMBgsMBwsgAigCDCACQQA2AgxFDQYgAkGQAWohBCACKAIQIQFBACEGIwBBEGsiAyQAIAMgATYCCAJAQQFBAiABECIiBUEBRhtBACAFGyIFQQJHBEAgBCAFOgABDAELIAQgA0EIaiADQQ9qQcDgwAAQVDYCBEEBIQYLIAQgBjoAACABQYQBTwRAIAEQAAsgA0EQaiQAIAItAJABDQMgAi0AkQEhBgsgAkGQAWogAkEMahB+IAItAJABRQ0ACwsgAigClAEhASAAQQI6AHAgACABNgIADAELIAIoApQBIQEgAEECOgBwIAAgATYCAAsgAkEMahChAgsgAkHQAWokAA8LQer7wABBMRDuAgALrxQCCH8QfiMAQdABayICJAAgAiABNgIIAkACQCABEA5BAUcEQCACQQhqIAJBkAFqQbDgwAAQVSEDIABBAjoAcCAAIAM2AgAgAUGEAUkNASABEAAMAQsgAkEMaiIDIAFB7PDAAEEGEKUCIAJBkAFqIAMQgQECQAJAIAItAJABRQRAIAJB4ABqIQggAkGgAWohCSACQagBaiEHQQIhBgNAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAItAJEBQQFrDgcCAwQFBgEHAAsgBkECRg0MQbXowABBCxDlASEBIABBAjoAcCAAIAE2AgAMEQsgAiACQQxqEIICDAwLIA5QDQlBwOjAAEEMEOUBIQEgAEECOgBwIAAgATYCAAwPCyAPUA0HQczowABBDhDlASEBIABBAjoAcCAAIAE2AgAMDgsgEFANBUHa6MAAQREQ5QEhASAAQQI6AHAgACABNgIADA0LIBFQDQNB6+jAAEEREOUBIQEgAEECOgBwIAAgATYCAAwMCyAKUA0BQfzowABBFBDlASEBIABBAjoAcCAAIAE2AgAMCwsgBkECRwRAIA5QBEBBwOjAAEEMEOMBIQEgAEECOgBwIAAgATYCAAwMCyAPUARAQczowABBDhDjASEBIABBAjoAcCAAIAE2AgAMDAsgEFAEQEHa6MAAQREQ4wEhASAAQQI6AHAgACABNgIADAwLIBFQBEBB6+jAAEEREOMBIQEgAEECOgBwIAAgATYCAAwMCyAKUARAQfzowABBFBDjASEBIABBAjoAcCAAIAE2AgAMDAsgAEFAayACQSBqQTAQShogACASNwM4IAAgEzcDMCAAIBQ3AyggACAVNwMgIAAgFjcDGCAAIBc3AxAgACAYNwMIIAAgGTcDACAAIAZBAXE6AHAMCwtBtejAAEELEOMBIQEgAEECOgBwIAAgATYCAAwKCyACKAIMIAJBADYCDARAIAJBkAFqIQEgAigCECEEIwBBgAFrIgMkACADIAQ2AgQCQCADQQRqIgUQ3wIEQCMAQYABayIEJAAgBCAFELcCIARBADYCDCAEQRBqIAQQsAECQAJAIAQpAxgiCiAEKQMQIgtCAoWEUEUEQCAKIAuEUARAQQAgBEH/AGpBwN/AABDPASEFIAFBATYCACABIAU2AgQMAwsgBEEoaikDACEKIAQpAyAhCyAEQTBqIAQQsAEgBCkDOCIMIAQpAzAiDUIChYRQDQEgDCANhFAEQEEBIARB/wBqQcDfwAAQzwEhBSABQQE2AgAgASAFNgIEDAMLIARByABqKQMAIQwgBCkDQCENIARB0ABqIAQQsAECfwJAAkAgBCgCUCIFQQNxQQNGDQACQCAFQQFrDgIBAgALQQIgBEH/AGpBwN/AABDPAQwCCyABIAQpA2A3AzAgASANNwMgIAEgCzcDECABQQA2AgAgASAMNwMoIAEgCjcDGCABIARB6ABqKQMANwM4DAQLIAQoAmALIQUgAUEBNgIAIAEgBTYCBAwCCyABIAQoAiA2AgQgAUEBNgIADAELIAEgBCgCQDYCBCABQQE2AgALIARBgAFqJAAMAQsgA0HQAGogA0EEahCSASADKAJQIQQCQAJAAkAgAy0AVCIFQQJrDgIBAAILIAFBATYCACABIAQ2AgQMAgsgA0EEaiADQf8AakHA38AAEFUhBCABQQE2AgAgASAENgIEDAELIAMgBToADCADIAQ2AgggA0EQaiADQQhqEK4BAkACQCADKQMYIgogAykDECILQgKFhFBFBEAgCiALhFBFDQFBACADQf8AakHA38AAEM8BIQQgAUEBNgIAIAEgBDYCBAwCCyABIAMoAiA2AgQgAUEBNgIADAELIANBKGopAwAhCiADKQMgIQsgA0EwaiADQQhqEK4BIAMpAzgiDCADKQMwIg1CAoWEUEUEQCAMIA2EUARAQQEgA0H/AGpBwN/AABDPASEEIAFBATYCACABIAQ2AgQMAgsgA0HIAGopAwAhDCADKQNAIQ0gA0HQAGogA0EIahCuAQJAIAMoAlAiBEEDcUEDRg0AAn8CQAJAIARBAWsOAgMBAAtBAiADQf8AakHA38AAEM8BDAELIAMoAmALIQQgAUEBNgIAIAEgBDYCBAwCCyABIAMpA2A3AzAgASANNwMgIAEgCzcDECABQQA2AgAgASAMNwMoIAEgCjcDGCABIANB6ABqKQMANwM4DAELIAEgAygCQDYCBCABQQE2AgALIAMoAggiAUGDAU0NACABEAALIAMoAgQiAUGDAUsEQCABEAALIANBgAFqJAAgAigCkAFFBEAgAkEgaiAIIAlBMBBKQTAQShpCASEKDAcLIAIoApQBIQEgAEECOgBwIAAgATYCAAwKCwwLCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACESIAIpA6ABIRNCASERDAYLIAIoApQBIQEgAEECOgBwIAAgATYCAAwJCwwKCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACEUIAIpA6ABIRVCASEQDAULIAIoApQBIQEgAEECOgBwIAAgATYCAAwICwwJCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACEWIAIpA6ABIRdCASEPDAQLIAIoApQBIQEgAEECOgBwIAAgATYCAAwHCwwICyACKAIMIAJBADYCDARAIAJBkAFqIQMgAigCECEEIwBBMGsiASQAIAEgBDYCDAJAIAQQL0EBRwRAIAFBDGogAUEQakGg4MAAEFUhBSADQQE2AgAgAyAFNgIEIARBhAFJDQEgBBAADAELIAFBEGogBBCWASABKAIQIgRFBEAgAyABKQMgNwMQIANBADYCACADIAFBKGopAwA3AxggBEUNASABKAIUIgNBhAFJDQEgAxAADAELQcjiwABBywAQxgEhBCADQQE2AgAgAyAENgIE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QQFrDhEBAgMEBQYHCAkKCwwNDg8QEQALIAIgAC0AAToACCACQQI2AhQgAkGwwcAANgIQIAJCATcCHCACQTA2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDBELIAIgACkDCDcDCCACQQI2AhQgAkHMwcAANgIQIAJCATcCHCACQTE2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDBALIAIgACkDCDcDCCACQQI2AhQgAkHMwcAANgIQIAJCATcCHCACQTI2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDA8LIAArAwghAyACQQI2AhQgAkHswcAANgIQIAJCATcCHCACQTM2AgwgAiADOQMoIAIgAkEIajYCGCACIAJBKGo2AgggASgCHCABKAIgIAJBEGoQUQwOCyACIAAoAgQ2AgggAkECNgIUIAJBiMLAADYCECACQgE3AhwgAkE0NgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCHCABKAIgIAJBEGoQUQwNCyACIAApAgQ3AgggAkEBNgIUIAJBoMLAADYCECACQgE3AhwgAkE1NgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCHCABKAIgIAJBEGoQUQwMCyABQZnBwABBChDAAgwLCyABQajCwABBChDAAgwKCyABQbLCwABBDBDAAgwJCyABQb7CwABBDhDAAgwICyABQczCwABBCBDAAgwHCyABQdTCwABBAxDAAgwGCyABQdfCwABBBBDAAgwFCyABQdvCwABBDBDAAgwECyABQefCwABBDxDAAgwDCyABQfbCwABBDRDAAgwCCyABQYPDwABBDhDAAgwBCyABIAAoAgQgACgCCBDAAgsgAkEwaiQAC+oEAQp/IwBBMGsiAyQAIAMgATYCLCADIAA2AiggA0EDOgAkIANCIDcCHCADQQA2AhQgA0EANgIMAn8CQAJAAkAgAigCECIKRQRAIAIoAgwiAEUNASACKAIIIgEgAEEDdGohBCAAQQFrQf////8BcUEBaiEHIAIoAgAhAANAIABBBGooAgAiBQRAIAMoAiggACgCACAFIAMoAiwoAgwRAgANBAsgASgCACADQQxqIAFBBGooAgARAAANAyAAQQhqIQAgAUEIaiIBIARHDQALDAELIAIoAhQiAEUNACAAQQV0IQsgAEEBa0H///8/cUEBaiEHIAIoAgghBSACKAIAIQADQCAAQQRqKAIAIgEEQCADKAIoIAAoAgAgASADKAIsKAIMEQIADQMLIAMgCCAKaiIBQRBqKAIANgIcIAMgAUEcai0AADoAJCADIAFBGGooAgA2AiAgAUEMaigCACEEQQAhCUEAIQYCQAJAAkAgAUEIaigCAEEBaw4CAAIBCyAEQQN0IAVqIgwoAgANASAMKAIEIQQLQQEhBgsgAyAENgIQIAMgBjYCDCABQQRqKAIAIQQCQAJAAkAgASgCAEEBaw4CAAIBCyAEQQN0IAVqIgYoAgANASAGKAIEIQQLQQEhCQsgAyAENgIYIAMgCTYCFCAFIAFBFGooAgBBA3RqIgEoAgAgA0EMaiABQQRqKAIAEQAADQIgAEEIaiEAIAsgCEEgaiIIRw0ACwsgByACKAIETw0BIAMoAiggAigCACAHQQN0aiIAKAIAIAAoAgQgAygCLCgCDBECAEUNAQtBAQwBC0EACyADQTBqJAALxgQBCX8jAEEQayIEJAACQAJAAn8CQCAAKAIAQQFGBEAgACgCBCEHIAQgASgCDCIDNgIMIAQgASgCCCICNgIIIAQgASgCBCIFNgIEIAQgASgCACIBNgIAIAAtABghCSAAKAIQIQogAC0AFEEIcQ0BIAohCCAJDAILIAAoAhwgACgCICABEFchAgwDCyAAKAIcIAEgBSAAKAIgKAIMEQIADQEgAEEBOgAYQTAhCCAAQTA2AhAgBEIBNwIAIAcgBWshAUEAIQUgAUEAIAEgB00bIQdBAQshBiADBEAgA0EMbCEDA0ACfwJAAkACQCACLwEAQQFrDgICAQALIAIoAgQMAgsgAigCCAwBCyACLwECIgFB6AdPBEBBBEEFIAFBkM4ASRsMAQtBASABQQpJDQAaQQJBAyABQeQASRsLIAJBDGohAiAFaiEFIANBDGsiAw0ACwsCfwJAIAUgB0kEQCAHIAVrIQMCQAJAAkBBASAGIAZB/wFxQQNGG0H/AXEiAkEBaw4CAAECCyADIQJBACEDDAELIANBAXYhAiADQQFqQQF2IQMLIAJBAWohAiAAKAIgIQYgACgCHCEBA0AgAkEBayICRQ0CIAEgCCAGKAIQEQAARQ0ACwwDCyAAKAIcIAAoAiAgBBBXDAELIAEgBiAEEFcNAUEAIQICfwNAIAMgAiADRg0BGiACQQFqIQIgASAIIAYoAhARAABFDQALIAJBAWsLIANJCyECIAAgCToAGCAAIAo2AhAMAQtBASECCyAEQRBqJAAgAguSBAEEfyMAQYABayIEJAACQAJAAkAgASgCFCICQRBxRQRAIAJBIHENAUEBIQIgACgCACABEHBFDQIMAwsgACgCACECA0AgAyAEakH/AGogAkEPcSIFQTByIAVB1wBqIAVBCkkbOgAAIANBAWshAyACQRBJIAJBBHYhAkUNAAtBASECIAFBAUGRocAAQQIgAyAEakGAAWpBACADaxBFRQ0BDAILIAAoAgAhAgNAIAMgBGpB/wBqIAJBD3EiBUEwciAFQTdqIAVBCkkbOgAAIANBAWshAyACQQ9LIAJBBHYhAg0AC0EBIQIgAUEBQZGhwABBAiADIARqQYABakEAIANrEEUNAQsgASgCHEGNnsAAQQIgASgCICgCDBECAA0AAkAgASgCFCICQRBxRQRAIAJBIHENASAAKAIEIAEQcCECDAILIAAoAgQhAkEAIQMDQCADIARqQf8AaiACQQ9xIgBBMHIgAEHXAGogAEEKSRs6AAAgA0EBayEDIAJBD0sgAkEEdiECDQALIAFBAUGRocAAQQIgAyAEakGAAWpBACADaxBFIQIMAQsgACgCBCECQQAhAwNAIAMgBGpB/wBqIAJBD3EiAEEwciAAQTdqIABBCkkbOgAAIANBAWshAyACQQ9LIAJBBHYhAg0ACyABQQFBkaHAAEECIAMgBGpBgAFqQQAgA2sQRSECCyAEQYABaiQAIAILnQQCB38BfiMAQZABayIDJAACQAJAAkAgACgCACIEQYEBECFFBEBBAUECIAQQIiIFQQFGG0EAIAUbIghBAkYNAUEAIQBBACEFDAILIANBBzoAcCADQfAAaiABIAIQ2QEhBAwCCyADQRhqIAQQFiADQcgAaiADKAIYIAMrAyAQqQIgAygCSEUEQCADQRBqIAQQBgJ/AkAgAygCECIERQ0AIANBCGogBCADKAIUEP0BIANB2ABqIAMoAgggAygCDBC8AiADKAJYQYCAgIB4Rg0AIANBMGogA0HgAGooAgAiBjYCACADIAMpAlg3AyhBBSEFQQEhByADKAIsIQRBAAwBCyADQeQAaiAAELQBAn8gAygCZCIJQYCAgIB4RiIHRQRAIANBQGsiACEGIAAgA0HsAGooAgA2AgAgAyADKQJkNwM4QQYhBSADQTxqDAELIANBMGohBiADQQE2AnQgA0HwxsAANgJwIANCATcCfCADQTw2AowBIAMgADYCiAEgAyADQYgBajYCeCADQShqIANB8ABqEGpBESEFIANBLGoLIAYoAgAhBigCACEEIAlBgICAgHhHCyEAIAatIQoMAQtBAyEFIAMpA1AhCkEAIQALIAMgCjcDeCADIAQ2AnQgAyAIOgBxIAMgBToAcCADQfAAaiABIAIQ2QEhBCAABEAgA0E4ahDIAQsgB0UNACADQShqEMgBCyADQZABaiQAIAQLnQQCB38BfiMAQZABayIDJAACQAJAAkAgACgCACIEQYEBECFFBEBBAUECIAQQIiIFQQFGG0EAIAUbIghBAkYNAUEAIQBBACEFDAILIANBBzoAcCADQfAAaiABIAIQ2gEhBAwCCyADQRhqIAQQFiADQcgAaiADKAIYIAMrAyAQqQIgAygCSEUEQCADQRBqIAQQBgJ/AkAgAygCECIERQ0AIANBCGogBCADKAIUEP0BIANB2ABqIAMoAgggAygCDBC8AiADKAJYQYCAgIB4Rg0AIANBMGogA0HgAGooAgAiBjYCACADIAMpAlg3AyhBBSEFQQEhByADKAIsIQRBAAwBCyADQeQAaiAAELQBAn8gAygCZCIJQYCAgIB4RiIHRQRAIANBQGsiACEGIAAgA0HsAGooAgA2AgAgAyADKQJkNwM4QQYhBSADQTxqDAELIANBMGohBiADQQE2AnQgA0H4ycAANgJwIANCATcCfCADQTw2AowBIAMgADYCiAEgAyADQYgBajYCeCADQShqIANB8ABqEGpBESEFIANBLGoLIAYoAgAhBigCACEEIAlBgICAgHhHCyEAIAatIQoMAQtBAyEFIAMpA1AhCkEAIQALIAMgCjcDeCADIAQ2AnQgAyAIOgBxIAMgBToAcCADQfAAaiABIAIQ2gEhBCAABEAgA0E4ahDIAQsgB0UNACADQShqEMgBCyADQZABaiQAIAQLjwQBDX8gAUEBayEPIAAoAgQhCiAAKAIAIQsgACgCCCEMAkADQCAODQECQAJAIAIgBEkNAANAIAEgBGohBQJAAkACQCACIARrIgZBB00EQCACIARHDQEgAiEEDAULAkAgBUEDakF8cSIIIAVrIgMEQEEAIQADQCAAIAVqLQAAQQpGDQUgAyAAQQFqIgBHDQALIAMgBkEIayIATQ0BDAMLIAZBCGshAAsDQEGAgoQIIAgoAgAiCUGKlKjQAHNrIAlyQYCChAggCEEEaigCACIJQYqUqNAAc2sgCXJxQYCBgoR4cUGAgYKEeEcNAiAIQQhqIQggA0EIaiIDIABNDQALDAELQQAhAANAIAAgBWotAABBCkYNAiAGIABBAWoiAEcNAAsgAiEEDAMLIAMgBkYEQCACIQQMAwsDQCADIAVqLQAAQQpGBEAgAyEADAILIAYgA0EBaiIDRw0ACyACIQQMAgsgACAEaiIDQQFqIQQCQCACIANNDQAgACAFai0AAEEKRw0AIAQhBSAEIQAMAwsgAiAETw0ACwtBASEOIAIiACAHIgVGDQILAkAgDC0AAARAIAtBhKHAAEEEIAooAgwRAgANAQtBACEDIAAgB0cEQCAAIA9qLQAAQQpGIQMLIAAgB2shACABIAdqIQYgDCADOgAAIAUhByALIAYgACAKKAIMEQIARQ0BCwtBASENCyANC/4DAQl/IwBBEGsiBCQAAn8CQCACKAIEIgNFDQAgACACKAIAIAMgASgCDBECAEUNAEEBDAELIAIoAgwiBgRAIAIoAggiAyAGQQxsaiEIIARBDGohCQNAAkACQAJAAkAgAy8BAEEBaw4CAgEACwJAIAMoAgQiAkHBAE8EQCABQQxqKAIAIQYDQEEBIABB9qLAAEHAACAGEQIADQgaIAJBQGoiAkHAAEsNAAsMAQsgAkUNAwsgAEH2osAAIAIgAUEMaigCABECAEUNAkEBDAULIAAgAygCBCADKAIIIAFBDGooAgARAgBFDQFBAQwECyADLwECIQIgCUEAOgAAIARBADYCCAJ/QQRBBSACQZDOAEkbIAJB6AdPDQAaQQEgAkEKSQ0AGkECQQMgAkHkAEkbCyIGIARBCGoiCmoiB0EBayIFIAIgAkEKbiILQQpsa0EwcjoAAAJAIAUgCkYNACAHQQJrIgUgC0EKcEEwcjoAACAEQQhqIAVGDQAgB0EDayIFIAJB5ABuQQpwQTByOgAAIARBCGogBUYNACAHQQRrIgUgAkHoB25BCnBBMHI6AAAgBEEIaiAFRg0AIAdBBWsgAkGQzgBuQTByOgAACyAAIARBCGogBiABQQxqKAIAEQIARQ0AQQEMAwsgA0EMaiIDIAhHDQALC0EACyAEQRBqJAAL7AMCAn8LfiMAQeAAayIBJAAgAUHQAGogABCYAUH/ACABKQNYIgZ5IAEpA1AiCHlCQH0gBkIAUhunIgBrIgKtQiCGIgNCgICAgIAIfSILIANUrQJ+IAJBP00EQCABQUBrIAggBiAAQf8AcUHAAHMQ3QEgASkDQCEFIAFByABqKQMADAELIAFBMGogCCAGQcAAIABrQf8AcRDeASABKQMwIQUgAUE4aikDAAshA0IBfSEMQgAhBEKAgICAgICAgIB/IQlBDiEAA0AgAUEgaiAFIAMgBSADEMUBIAFBEGogASkDICABQShqKQMAIgMgA0I/iKdBP2oQ3gEgBEI/hiADQj+HIgMgBIMgB3wgAyAJgyIDIAp8IgogA1StfCEHIARCAYghBCABQRhqKQMAIQMgASkDECEFIAlCAYiEIQkgAEEBayIADQALIAEgCyAHQiCGIApCIIiEfCIDIAMgC1StIAwgB0Igh3x8QpCuh5j6xA1CABDFASABQQhqKQMAIgUgASkDACIDQtyeiq6PhdfHAn0gA1StfKdBAWsiACAFIANCx7Xw7/r5hekkfSADVK18pyICRwRAIAFB0ABqIAIQMRCYASAAIAIgASkDUCAIViABKQNYIgMgBlYgAyAGURsbIQALIAFB4ABqJAAgAAvaAwEHfwJAAkAgAUGACkkEQCABQQV2IQUCQAJAIAAoAqABIgQEQCAEQQFrIQMgBEECdCAAakEEayECIAQgBWpBAnQgAGpBBGshBiAEQSlJIQcDQCAHRQ0CIAMgBWoiBEEoTw0DIAYgAigCADYCACACQQRrIQIgBkEEayEGIANBAWsiA0F/Rw0ACwsgAUEfcSEIIAFBIE8EQCAAQQAgBUECdBBfGgsgACgCoAEgBWohAiAIRQRAIAAgAjYCoAEgAA8LIAJBAWsiB0EnSw0DIAIhBCAAIAdBAnRqKAIAIgZBACABayIDdiIBRQ0EIAJBJ00EQCAAIAJBAnRqIAE2AgAgAkEBaiEEDAULIAJBKEHIssAAENYBAAsgA0EoQciywAAQ1gEACyAEQShByLLAABDWAQALQfKywABBHUHIssAAEP8BAAsgB0EoQciywAAQ1gEACwJAIAIgBUEBaiIHSwRAIANBH3EhASACQQJ0IABqQQhrIQMDQCACQQJrQShPDQIgA0EEaiAGIAh0IAMoAgAiBiABdnI2AgAgA0EEayEDIAcgAkEBayICSQ0ACwsgACAFQQJ0aiIBIAEoAgAgCHQ2AgAgACAENgKgASAADwtBf0EoQciywAAQ1gEAC9cDAgJ/Bn4jAEFAaiICJAAgAiABNgIIAkACQCABEA5BAUcEQCACQQhqIAJBIGpBwOHAABBVIQMgAEEBNgIAIAAgAzYCBCABQYQBSQ0BIAEQAAwBCyACQQxqIgMgAUG4+8AAQQIQpQIgAkEgaiADEH0gAAJ/IAACfwJAIAItACANACACQThqIQEDQAJAAkACQAJAAkACQAJAIAItACFBAWsOAwIBAwALIARQDQRBnefAAEEVEOUBDAgLIAIgAkEMahCCAgwECyAFUA0BQbLnwABBDxDlAQwGCyAEUARAQZ3nwABBFRDjAQwGCyAFUARAQbLnwABBDxDjAQwGCyAAIAY3AyAgACAHNwMQIAAgCDcDKCAAIAk3AxhBAAwGCyACKAIMIAJBADYCDARAIAJBIGogAigCEBChASACKAIgDQQgASkDACEIIAIpAzAhBkIBIQUMAgtB6vvAAEExEO4CAAsgAigCDCACQQA2AgxFDQYgAkEgaiACKAIQEKEBIAIoAiANAiABKQMAIQkgAikDMCEHQgEhBAsgAkEgaiACQQxqEH0gAi0AIEUNAAsLIAIoAiQLNgIEQQELNgIAIAJBDGoQoQILIAJBQGskAA8LQer7wABBMRDuAgALywMCAn8FfiMAQUBqIgIkACACIAE2AggCQAJAIAEQDkEBRwRAIAJBCGogAkEgakHg4cAAEFUhAyAAQQE2AgAgACADNgIEIAFBhAFJDQEgARAADAELIAJBDGoiAyABQYDUwABBAhClAiACQSBqIAMQhQEgAAJ/IAACfwJAIAItACANACACQThqIQEDQAJAAkACQAJAAkACQAJAIAItACFBAWsOAwIBAwALIARQDQRBlejAAEEWEOUBDAgLIAIgAkEMahCCAgwECyAFUA0BQavowABBChDlAQwGCyAEUARAQZXowABBFhDjAQwGCyAFUARAQavowABBChDjAQwGCyAAIAY3AxAgACAHNwMgIAAgCDcDGEEADAYLIAIoAgwgAkEANgIMBEAgAkEgaiACKAIQEJ8BIAIoAiANBCACKQMoIQdCASEFDAILQer7wABBMRDuAgALIAIoAgwgAkEANgIMRQ0GIAJBIGogAigCEBChASACKAIgDQIgASkDACEIIAIpAzAhBkIBIQQLIAJBIGogAkEMahCFASACLQAgRQ0ACwsgAigCJAs2AgRBAQs2AgAgAkEMahChAgsgAkFAayQADwtB6vvAAEExEO4CAAu8AwICfwZ+IwBBMGsiBCQAIAACfyADQf//A3EiBUGQzgBNBEACQCAFRQRAIAAgATcDCAwBCyABUARAIABCADcDCAwBCwJAAkACQCADQf//A3FBkM4ARwRAIARBIGogAUIAQpDOAEIAEMUBIARBEGogBCkDICIHIARBKGopAwAiCUKQzgAgA61C//8DgyIGfSIIQgAgBkKQzgBWrX0iChCFAiAEIAQpAxAiBiAEQRhqKQMAIgsgCCAKEMUBIAYgByAEKQMAIgh9IAkgBEEIaikDAH0gByAIVK19hEIAUq18IgcgAVQiAyALIAYgB1atfCIGUHENASAGIAOtUSAHIAF9IAJUcUUNAyAGQgBSDQIgACAHNwMIDAQLIAEgASACfCICVgRAIABBFjYCCCAAQfjawAA2AgRBAQwGCyAAIAI3AwgMAwsgAEEWNgIIIABB+NrAADYCBEEBDAQLIABBFjYCCCAAQfjawAA2AgRBAQwDCyABIAEgAnwiAlYEQCAAQRY2AgggAEH42sAANgIEQQEMAwsgACACNwMIC0EADAELIABBFDYCCCAAQabbwAA2AgRBAQs2AgAgBEEwaiQAC5UDAgJ/B34jAEHgAGsiBSQAIAVBQGsiBiABEJgBIAUpA0AhCSAFKQNIIQcgBiACEJgBIAUpA0AhCiAFKQNIIQggBiADEJgBIAVBMGogBSkDQCILQgAgCSAKIAkgClYgByAIViAHIAhRIgEbIgIbIgwgCSAKIAkgClQgByAIVCABGyIBGyIJfSIKQgAQxQEgBUEQaiAFKQNIIg1CACAKQgAQxQEgBSANQgAgByAIIAIbIAcgCCABG30gCSAMVq19IgdCABDFASAFQSBqIAtCACAHQgAQxQEgAAJ/AkAgBUEYaikDACAFQThqKQMAIgggBSkDEHwiByAIVK18IgsgBSkDAHwiCCAFQShqKQMAIAcgByAFKQMgfCIHVq18fCIJIAdCAXwiClCtfCIMIAkgBSkDMEIAUiAEcSIBG0IAUg0AIAEgCiAMhFBxrSAIIAlWrSAFQQhqKQMAIAggC1StfHyEQgBSDQAgACAKIAcgARs3AwhBAAwBCyAAQRY2AgggAEH42sAANgIEQQELNgIAIAVB4ABqJAAL+QMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQJxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEGQjMEAKAIARgRAIAIoAgRBA3FBA0cNAUGIjMEAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAMAgsgACADEHMLAkACQAJAIAIoAgQiA0ECcUUEQCACQZSMwQAoAgBGDQIgAkGQjMEAKAIARg0DIAIgA0F4cSICEHMgACABIAJqIgFBAXI2AgQgACABaiABNgIAIABBkIzBACgCAEcNAUGIjMEAIAE2AgAPCyACIANBfnE2AgQgACABQQFyNgIEIAAgAWogATYCAAsgAUGAAk8EQCAAIAEQeA8LIAFB+AFxQfiJwQBqIQICf0GAjMEAKAIAIgNBASABQQN2dCIBcUUEQEGAjMEAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQZSMwQAgADYCAEGMjMEAQYyMwQAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEGQjMEAKAIARw0BQYiMwQBBADYCAEGQjMEAQQA2AgAPC0GQjMEAIAA2AgBBiIzBAEGIjMEAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsLlAMBBH8CQCACQRBJBEAgACEDDAELAkAgAEEAIABrQQNxIgVqIgQgAE0NACAAIQMgBQRAIAUhBgNAIAMgAToAACADQQFqIQMgBkEBayIGDQALCyAFQQFrQQdJDQADQCADIAE6AAAgA0EHaiABOgAAIANBBmogAToAACADQQVqIAE6AAAgA0EEaiABOgAAIANBA2ogAToAACADQQJqIAE6AAAgA0EBaiABOgAAIANBCGoiAyAERw0ACwsgBCACIAVrIgJBfHFqIgMgBEsEQCABQf8BcUGBgoQIbCEFA0AgBCAFNgIAIARBBGoiBCADSQ0ACwsgAkEDcSECCwJAIAMgAiADaiIFTw0AIAJBB3EiBARAA0AgAyABOgAAIANBAWohAyAEQQFrIgQNAAsLIAJBAWtBB0kNAANAIAMgAToAACADQQdqIAE6AAAgA0EGaiABOgAAIANBBWogAToAACADQQRqIAE6AAAgA0EDaiABOgAAIANBAmogAToAACADQQFqIAE6AAAgA0EIaiIDIAVHDQALCyAAC8kDAgN/An5ByNTAACEDIwBBMGsiAiQAIAIgATYCCAJAAkAgARAOQQFHBEAgAkEIaiACQQxqQbDhwAAQVSEDIABBATYCACAAIAM2AgQgAUGEAUkNASABEAAMAQsgAkEMaiIEIAFByNTAAEECEKUCIAJBIGogBBCEASAAAn8gAAJ/AkAgAi0AIA0AQQAhAQNAAkACQAJAAkACQAJAAkAgAi0AIUEBaw4DAgEDAAsgAUH//wNxRQ0EQaPpwABBBhDlAQwICyACIAJBDGoQggIMBAsgBVANAUGp6cAAQQYQ5QEMBgsgAUEBcUUEQEGj6cAAQQYQ4wEMBgsgBVAEQEGp6cAAQQYQ4wEMBgsgACADOwEQIAAgBjcDCEEADAYLIAIoAgwgAkEANgIMBEAgAkEgaiACKAIQEJ8BIAIoAiANBCACKQMoIQZCASEFDAILQer7wABBMRDuAgALIAIoAgwgAkEANgIMRQ0GIAJBIGogAigCEBCZAiACLwEgDQIgAi8BIiEDQQEhAQsgAkEgaiACQQxqEIQBIAItACBFDQALCyACKAIkCzYCBEEBCzYCACACQQxqEKECCyACQTBqJAAPC0Hq+8AAQTEQ7gIAC/0CAgF/AX4jAEHAAWsiCCQAAkAgCCAGBH4gCEGQAWogBhAKEGAgBkGEAU8EQCAGEAALIAgoApABQQFGDQEgCCAILwGgATsBICAIIAgpA5gBNwMYQgEFIAkLNwMQIAggBwR+IAhBkAFqIAcQChBgIAdBhAFPBEAgBxAACyAIKAKQAUEBRg0BIAggCC8BoAE7ATggCCAIKQOYATcDMEIBBSAJCzcDKCAIQUBrIAEgAiADIAQgBSAIQRBqIAhBKGoQPgJ/IAgoAkBFBEAgCEGQAWoiASAIQdAAakEwEEoaQQAhBiAIQQA2AoQBIAhBCGogASAIQYQBahBtIAgoAghBAXFFBEAgCCgCDAwCC0G47cAAQTEQ7gIAC0EBIQYgCCgCRCAIKAJIEAELIQcgACAGNgIIIAAgB0EAIAYbNgIEIABBACAHIAYbNgIAIAhBwAFqJAAPCyAIIAgoApQBNgKAASAIQYQBaiAIQYABahC+ASAIKAKIASAIKAKMARDuAgAL/AUCBX8IfiMAQcABayIIJAACQCAIIAYEfiAIQZABaiAGEAoQYCAGQYQBTwRAIAYQAAsgCCgCkAFBAUYNASAIIAgvAaABOwEgIAggCCkDmAE3AxhCAQVCAAs3AxAgCCAHBH4gCEGQAWogBxAKEGAgB0GEAU8EQCAHEAALIAgoApABQQFGDQEgCCAILwGgATsBOCAIIAgpA5gBNwMwQgEFQgALNwMoIAhBQGshByAIQShqIQsjAEEgayIGJABBASEJIAYgASAIQRBqIgopAwhCACAKKAIAQQFxIgwbIAovARBBACAMGxBcAkACQAJAAkACQCAGKAIARQRAIAYpAwgiEFAEQEEAIQkgB0EQakEAQTAQXxoMAgsgBiADEJgBIAYpAwghASAGKQMAIQ0gBiAEIAUgBCAFSBsiAxAxEJgBIAYpAwghEyAGKQMAIRQgBiAEIAUgBCAFShsiCRAxEJgBIAYpAwghESAGKQMAIRICQAJAIAEgDRAnIAMgCRCtAUH/AXFBAWsOAwEGBgALIAYgECANIAEgEiAREE8gBigCAA0DDAQLIAYgECAUIBMgEiAREE8gBigCAEUNAyAGKQIEIQEgB0EBNgIAIAcgATcCBAwFCyAHIAYpAgQ3AgQLIAcgCTYCACADQYQBSQ0DIAMQAAwDCyAGKQIEIQEgB0EBNgIAIAcgATcCBAwCCyAGQRhqKQMAIQ4gBikDECEPCyAHIA4gDxAnIAIgASANECcgBCAFIAogCxA+CyAGQSBqJAACfyAIKAJARQRAIAhBkAFqIgIgCEHQAGpBMBBKGkEAIQYgCEEANgKEASAIQQhqIAIgCEGEAWoQbSAIKAIIQQFxRQRAIAgoAgwMAgtBuO3AAEExEO4CAAtBASEGIAgoAkQgCCgCSBABCyECIAAgBjYCCCAAIAJBACAGGzYCBCAAQQAgAiAGGzYCACAIQcABaiQADwsgCCAIKAKUATYCgAEgCEGEAWogCEGAAWoQvgEgCCgCiAEgCCgCjAEQ7gIAC/4FAgV/CH4jAEHAAWsiCCQAAkAgCCAGBH4gCEGQAWogBhAKEGAgBkGEAU8EQCAGEAALIAgoApABQQFGDQEgCCAILwGgATsBICAIIAgpA5gBNwMYQgEFQgALNwMQIAggBwR+IAhBkAFqIAcQChBgIAdBhAFPBEAgBxAACyAIKAKQAUEBRg0BIAggCC8BoAE7ATggCCAIKQOYATcDMEIBBUIACzcDKCAIQUBrIQcgCEEQaiELIwBBIGsiBiQAQQEhCSAGIAEgCEEoaiIKKQMIQgAgCigCAEEBcSIMGyAKLwEQQQAgDBsQXAJAAkACQAJAAkAgBigCAEUEQCAGKQMIIhBQBEBBACEJIAdBEGpBAEEwEF8aDAILIAYgAxCYASAGKQMIIQEgBikDACENIAYgBCAFIAQgBUgbIgMQMRCYASAGKQMIIREgBikDACESIAYgBCAFIAQgBUobIgkQMRCYASAGKQMIIRMgBikDACEUAkACQCABIA0QJyADIAkQrQFB/wFxQQFrDgMGAQYACyAGIBAgEiARIA0gARCPASAGKAIADQMMBAsgBiAQIBIgESAUIBMQjwEgBigCAEUNAyAGKQIEIQEgB0EBNgIAIAcgATcCBAwFCyAHIAYpAgQ3AgQLIAcgCTYCACADQYQBSQ0DIAMQAAwDCyAGKQIEIQEgB0EBNgIAIAcgATcCBAwCCyAGQRhqKQMAIQ4gBikDECEPCyAHIA4gDxAnIAIgASANECcgBCAFIAsgChA+CyAGQSBqJAACfyAIKAJARQRAIAhBkAFqIgIgCEHQAGpBMBBKGkEAIQYgCEEANgKEASAIQQhqIAIgCEGEAWoQbSAIKAIIQQFxRQRAIAgoAgwMAgtBuO3AAEExEO4CAAtBASEGIAgoAkQgCCgCSBABCyECIAAgBjYCCCAAIAJBACAGGzYCBCAAQQAgAiAGGzYCACAIQcABaiQADwsgCCAIKAKUATYCgAEgCEGEAWogCEGAAWoQvgEgCCgCiAEgCCgCjAEQ7gIAC/0CAgF/AX4jAEHAAWsiCCQAAkAgCCAGBH4gCEGQAWogBhAKEGAgBkGEAU8EQCAGEAALIAgoApABQQFGDQEgCCAILwGgATsBICAIIAgpA5gBNwMYQgEFIAkLNwMQIAggBwR+IAhBkAFqIAcQChBgIAdBhAFPBEAgBxAACyAIKAKQAUEBRg0BIAggCC8BoAE7ATggCCAIKQOYATcDMEIBBSAJCzcDKCAIQUBrIAEgAiADIAQgBSAIQRBqIAhBKGoQRwJ/IAgoAkBFBEAgCEGQAWoiASAIQdAAakEwEEoaQQAhBiAIQQA2AoQBIAhBCGogASAIQYQBahBuIAgoAghBAXFFBEAgCCgCDAwCC0G47cAAQTEQ7gIAC0EBIQYgCCgCRCAIKAJIEAELIQcgACAGNgIIIAAgB0EAIAYbNgIEIABBACAHIAYbNgIAIAhBwAFqJAAPCyAIIAgoApQBNgKAASAIQYQBaiAIQYABahC+ASAIKAKIASAIKAKMARDuAgAL0AcCBn8IfiMAQcABayIIJAACQCAIIAYEfiAIQZABaiAGEAoQYCAGQYQBTwRAIAYQAAsgCCgCkAFBAUYNASAIIAgvAaABOwEgIAggCCkDmAE3AxhCAQVCAAs3AxAgCCAHBH4gCEGQAWogBxAKEGAgB0GEAU8EQCAHEAALIAgoApABQQFGDQEgCCAILwGgATsBOCAIIAgpA5gBNwMwQgEFQgALNwMoIAhBQGshByAIQShqIQwjAEHQAGsiBiQAQQEhCQJAAkACQCAIQRBqIgovARBBACAKKAIAQQFxIg0bIgtB//8DcUGQzgBLBEBBFCECQabbwAAhBAwBCyALQf//A3FFIAFQckUEQCAKKQMIIRAgBkEgaiALrUL//wODQgAgAUIAEMUBIAZBEGogBikDICIOIAZBKGopAwAiEUKQzgBCABCFAiAGIAYpAxAiDyAGQRhqKQMAIhJCkM4AQgAQxQEgEiAPIA4gBikDACITfSARIAZBCGopAwB9IA4gE1StfYRCAFKtfCIOIA9UrXxQRQRAQRYhAkH42sAAIQQMAgsgASAQQgAgDRsiASAOIAEgDlQbfSEBCyABUARAQQAhCSAHQRBqQQBBMBBfGgwCCyAGQTBqIgkgAxCYASAGKQM4IQ4gBikDMCEPIAkgBCAFIAQgBUgbEDEQmAEgBikDOCEUIAYpAzAhFSAJIAQgBSAEIAVKGxAxEJgBIAYpAzghECAGKQMwIRFCACESQgAhEwJAAkACQAJAAkAgDiAPECcgBCAFEK0BQf8BcUEBaw4DAQQEAAsgBkEwaiABIA8gDiARIBAQTyAGKAIwDQEMAgsgBkEwaiABIBUgFCARIBAQTyAGKAIwRQ0BIAYpAjQhASAHQQE2AgAgByABNwIEDAULIAYpAjQhASAHQQE2AgAgByABNwIEDAQLIAZByABqKQMAIRMgBikDQCESCyAHIBMgEhAnIAIgDiAPECcgBCAFIAogDBBHDAILIAcgAjYCCCAHIAQ2AgQLIAcgCTYCACADQYQBSQ0AIAMQAAsgBkHQAGokAAJ/IAgoAkBFBEAgCEGQAWoiAiAIQdAAakEwEEoaQQAhBiAIQQA2AoQBIAhBCGogAiAIQYQBahBuIAgoAghBAXFFBEAgCCgCDAwCC0G47cAAQTEQ7gIAC0EBIQYgCCgCRCAIKAJIEAELIQIgACAGNgIIIAAgAkEAIAYbNgIEIABBACACIAYbNgIAIAhBwAFqJAAPCyAIIAgoApQBNgKAASAIQYQBaiAIQYABahC+ASAIKAKIASAIKAKMARDuAgAL0gcCBn8IfiMAQcABayIIJAACQCAIIAYEfiAIQZABaiAGEAoQYCAGQYQBTwRAIAYQAAsgCCgCkAFBAUYNASAIIAgvAaABOwEgIAggCCkDmAE3AxhCAQVCAAs3AxAgCCAHBH4gCEGQAWogBxAKEGAgB0GEAU8EQCAHEAALIAgoApABQQFGDQEgCCAILwGgATsBOCAIIAgpA5gBNwMwQgEFQgALNwMoIAhBQGshByAIQRBqIQwjAEHQAGsiBiQAQQEhCQJAAkACQCAIQShqIgovARBBACAKKAIAQQFxIg0bIgtB//8DcUGQzgBLBEBBFCECQabbwAAhBAwBCyALQf//A3FFIAFQckUEQCAKKQMIIRAgBkEgaiALrUL//wODQgAgAUIAEMUBIAZBEGogBikDICIOIAZBKGopAwAiEUKQzgBCABCFAiAGIAYpAxAiDyAGQRhqKQMAIhJCkM4AQgAQxQEgEiAPIA4gBikDACITfSARIAZBCGopAwB9IA4gE1StfYRCAFKtfCIOIA9UrXxQRQRAQRYhAkH42sAAIQQMAgsgASAQQgAgDRsiASAOIAEgDlQbfSEBCyABUARAQQAhCSAHQRBqQQBBMBBfGgwCCyAGQTBqIgkgAxCYASAGKQM4IQ4gBikDMCEPIAkgBCAFIAQgBUgbEDEQmAEgBikDOCEQIAYpAzAhESAJIAQgBSAEIAVKGxAxEJgBIAYpAzghFCAGKQMwIRVCACESQgAhEwJAAkACQAJAAkAgDiAPECcgBCAFEK0BQf8BcUEBaw4DBAEEAAsgBkEwaiABIBEgECAPIA4QjwEgBigCMA0BDAILIAZBMGogASARIBAgFSAUEI8BIAYoAjBFDQEgBikCNCEBIAdBATYCACAHIAE3AgQMBQsgBikCNCEBIAdBATYCACAHIAE3AgQMBAsgBkHIAGopAwAhEyAGKQNAIRILIAcgEyASECcgAiAOIA8QJyAEIAUgDCAKEEcMAgsgByACNgIIIAcgBDYCBAsgByAJNgIAIANBhAFJDQAgAxAACyAGQdAAaiQAAn8gCCgCQEUEQCAIQZABaiICIAhB0ABqQTAQShpBACEGIAhBADYChAEgCEEIaiACIAhBhAFqEG4gCCgCCEEBcUUEQCAIKAIMDAILQbjtwABBMRDuAgALQQEhBiAIKAJEIAgoAkgQAQshAiAAIAY2AgggACACQQAgBhs2AgQgAEEAIAIgBhs2AgAgCEHAAWokAA8LIAggCCgClAE2AoABIAhBhAFqIAhBgAFqEL4BIAgoAogBIAgoAowBEO4CAAv+AgEEfwJAAkACQAJAAkACQAJ/AkAgByAIVgRAIAcgCH0gCFgNAwJAIAYgByAGfVQgByAGQgGGfSAIQgGGWnFFBEAgBiAIVg0BDAoLIAIgA0kNBQwICyAHIAYgCH0iBn0gBlYNCCACIANJDQUgASADaiEMIAEhCwJAA0AgAyAJRg0BIAlBAWohCSALQQFrIgsgA2oiCi0AAEE5Rg0ACyAKIAotAABBAWo6AAAgAyAJa0EBaiADTw0HIApBAWpBMCAJQQFrEF8aDAcLQTEgA0UNAhogAUExOgAAIANBAUcNAUEwDAILIABBADYCAA8LIAFBAWpBMCADQQFrEF8aQTALIQkgBEEBasEiBCAFwUwgAiADTXINAyAMIAk6AAAgA0EBaiEDDAMLIABBADYCAA8LIAMgAkGgnMAAENoCAAsgAyACQYCcwAAQ2gIACyACIANPDQAgAyACQZCcwAAQ2gIACyAAIAQ7AQggACADNgIEIAAgATYCAA8LIABBADYCAAvJAwIBfwR+IwBBEGsiCCQAAkAgASAChFAEQCAAQgA3AwggAEEANgIAIABBEGpCADcDAAwBCyAIIAUQMRCYASAIKQMIIQogCCkDACELIAggBhAxEJgBIAgpAwghCSAIKQMAIQwCQAJAAkACQCAEIAMQJyAFIAYQrQFB/wFxQQFrDgMBAAMCCyAIIAEgAiALIAogDCAJIAcQcSAIKAIARQRAIAAgCCkDCDcDECAAQgA3AwggAEEANgIADAQLIAgpAgQhASAAQQE2AgAgACABNwIEDAMLIAggASACIAsgCiAMIAkgBxBBIAgoAgBFBEAgCCkDCCEBIABCADcDECAAIAE3AwggAEEANgIADAMLIAgpAgQhASAAQQE2AgAgACABNwIEDAILIAggASACIAMgBCAMIAkgBxBBIAgoAgBFBEAgCCkDCCEJIAggASACIAsgCiADIAQgBxBxIAgoAgBFBEAgACAIKQMINwMQIAAgCTcDCCAAQQA2AgAMAwsgCCkCBCEBIABBATYCACAAIAE3AgQMAgsgCCkCBCEBIABBATYCACAAIAE3AgQMAQsgAEIANwMIIABBADYCACAAQRBqQgA3AwALIAhBEGokAAvnAgEFfwJAQc3/e0EQIAAgAEEQTRsiAGsgAU0NACAAQRAgAUELakF4cSABQQtJGyIEakEMahAzIgJFDQAgAkEIayEBAkAgAEEBayIDIAJxRQRAIAEhAAwBCyACQQRrIgUoAgAiBkF4cSACIANqQQAgAGtxQQhrIgIgAEEAIAIgAWtBEE0baiIAIAFrIgJrIQMgBkEDcQRAIAAgAyAAKAIEQQFxckECcjYCBCAAIANqIgMgAygCBEEBcjYCBCAFIAIgBSgCAEEBcXJBAnI2AgAgASACaiIDIAMoAgRBAXI2AgQgASACEF4MAQsgASgCACEBIAAgAzYCBCAAIAEgAmo2AgALAkAgACgCBCIBQQNxRQ0AIAFBeHEiAiAEQRBqTQ0AIAAgBCABQQFxckECcjYCBCAAIARqIgEgAiAEayIEQQNyNgIEIAAgAmoiAiACKAIEQQFyNgIEIAEgBBBeCyAAQQhqIQMLIAMLgwMBB38jAEEQayIEJAACQAJAAkACQAJAIAEoAgQiAkUNACABKAIAIQcgAkEDcSEFAkAgAkEESQRAQQAhAgwBCyAHQRxqIQMgAkF8cSEIQQAhAgNAIAMoAgAgA0EIaygCACADQRBrKAIAIANBGGsoAgAgAmpqamohAiADQSBqIQMgCCAGQQRqIgZHDQALCyAFBEAgBkEDdCAHakEEaiEDA0AgAygCACACaiECIANBCGohAyAFQQFrIgUNAAsLIAEoAgwEQCACQQBIDQEgBygCBEUgAkEQSXENASACQQF0IQILQQAhBSACQQBIDQMgAg0BC0EBIQNBACECDAELQdGIwQAtAAAaQQEhBSACQQEQxwIiA0UNAQsgBEEANgIIIAQgAzYCBCAEIAI2AgAgBEGQhcAAIAEQUUUNAUGshsAAQdYAIARBD2pBnIbAAEGch8AAEMcBAAsgBSACQYyGwAAQuwIACyAAIAQpAgA3AgAgAEEIaiAEQQhqKAIANgIAIARBEGokAAvRAgIIfgR/IwBBMGsiCyQAIAJBIE8EQEGAASENQQAhAgNAIAQhByADIQQgASACajEAACEDAn4gAkUEQCADQv8BgyEIQgAhCUIAIQpCAAwBCyACQRBPBEBCACEIIAtBIGogA0L/AYNCACAMQfgAcRDdASALQShqKQMAIQpCACEJIAspAyAMAQsgCyADQv8BgyIDQgAgDRDeASALQRBqIANCACAMEN0BIAtBGGopAwAhCSALQQhqKQMAIQogCykDECEIIAspAwALIgMgAyAFfCIFVq0gBiAKfHwgBSAFIAQgCHwiAyAEVCIOIA6tIAcgCXx8IgQgB1QgBCAHURutfCIFVq18IQYgDEEIaiEMIA1BCGshDSACQQFqIgJBIEcNAAsgACAFNwMQIAAgAzcDACAAIAY3AxggACAENwMIIAtBMGokAA8LIAIgAkGM9MAAENYBAAvqAgIGfwJ+IwBBIGsiBSQAQRQhAyAAIglC6AdaBEAgCSEKA0AgBUEMaiADaiIEQQNrIAogCkKQzgCAIglCkM4Afn2nIgZB//8DcUHkAG4iB0EBdCIIQZShwABqLQAAOgAAIARBBGsgCEGTocAAai0AADoAACAEQQFrIAYgB0HkAGxrQf//A3FBAXQiBkGUocAAai0AADoAACAEQQJrIAZBk6HAAGotAAA6AAAgA0EEayEDIApC/6ziBFYgCSEKDQALCyAJQglWBEAgAyAFakELaiAJpyIEIARB//8DcUHkAG4iBEHkAGxrQf//A3FBAXQiBkGUocAAai0AADoAACADQQJrIgMgBUEMamogBkGTocAAai0AADoAACAErSEJCyAAUEUgCVBxRQRAIANBAWsiAyAFQQxqaiAJp0EBdEEecUGUocAAai0AADoAAAsgAiABQQFBACAFQQxqIANqQRQgA2sQRSAFQSBqJAAL/QIBAn8jAEFAaiIDJAAgA0E4aiACENQCIAMoAjwhAgJ/AkAgAygCOCIERQ0AIAMgAjYCNCADIAQ2AjAgA0EoaiADQTBqQc3MwABBDiABEOgBAkAgAygCKARAIAMoAiwhAgwBCyADIAFBEGo2AjggA0EgaiADQTBqQdvMwABBCSADQThqEOkBIAMoAiAEQCADKAIkIQIMAQsgAyABQRhqNgI4IANBGGogA0EwakHkzMAAQQkgA0E4ahDpASADKAIYBEAgAygCHCECDAELIAMgAUEgajYCOCADQRBqIANBMGpB7czAAEEJIANBOGoQ6QEgAygCEARAIAMoAhQhAgwBCyADIAFBKGo2AjggA0EIaiADQTBqQfbMwABBCSADQThqEOkBIAMoAggEQCADKAIMIQIMAQsgAyADKAIwIAMoAjQQ0wIgAygCBCECIAMoAgAMAgsgAygCNCIBQYQBSQ0AIAEQAAtBAQshASAAIAI2AgQgACABNgIAIANBQGskAAv9AgECfyMAQUBqIgMkACADQThqIAIQ1AIgAygCPCECAn8CQCADKAI4IgRFDQAgAyACNgI0IAMgBDYCMCADQShqIANBMGpBzczAAEEOIAEQ6AECQCADKAIoBEAgAygCLCECDAELIAMgAUEQajYCOCADQSBqIANBMGpB28zAAEEJIANBOGoQ6QEgAygCIARAIAMoAiQhAgwBCyADIAFBGGo2AjggA0EYaiADQTBqQeTMwABBCSADQThqEOkBIAMoAhgEQCADKAIcIQIMAQsgAyABQSBqNgI4IANBEGogA0EwakGVzcAAQQkgA0E4ahDpASADKAIQBEAgAygCFCECDAELIAMgAUEoajYCOCADQQhqIANBMGpBns3AAEEJIANBOGoQ6QEgAygCCARAIAMoAgwhAgwBCyADIAMoAjAgAygCNBDTAiADKAIEIQIgAygCAAwCCyADKAI0IgFBhAFJDQAgARAAC0EBCyEBIAAgAjYCBCAAIAE2AgAgA0FAayQAC9sCAgN/Bn4jAEHgAGsiAyQAIANBOGogAhAKEGAgAkGEAU8EQCACEAALAkACQCADKAI4QQFHBEACfyADLwFIIgRBkM4ASwRAQRQhBUGm28AADAELQQAhAiAERSABUHINAyADKQNAIQcgA0EoaiAErUIAIAFCABDFASADQRhqIAMpAygiBiADQTBqKQMAIglCkM4AQgAQhQIgA0EIaiADKQMYIgggA0EgaikDACIKQpDOAEIAEMUBIAog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IABBBnZBP3FBgAFyOgANQQMMAgsgAiAAQT9xQYABcjoADSACIABBBnZBwAFyOgAMQQIMAQsgAiAAOgAMQQELEEYMAQsgASgCHCAAIAEoAiAoAhARAAALIAJBEGokAAuqAgIDfwF+IwBBQGoiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBJGoiBEEANgIAIAJCgICAgBA3AhwgAkEwaiADKAIAIgNBCGopAgA3AwAgAkE4aiADQRBqKQIANwMAIAIgAykCADcDKCACQRxqQbiBwAAgAkEoahBRGiACQRhqIAQoAgAiAzYCACACIAIpAhwiBTcDECABQQhqIAM2AgAgASAFNwIACyABKQIAIQUgAUKAgICAEDcCACACQQhqIgMgAUEIaiIBKAIANgIAIAFBADYCAEHRiMEALQAAGiACIAU3AwBBDEEEEMcCIgFFBEBBBEEMEOsCAAsgASACKQMANwIAIAFBCGogAygCADYCACAAQbCEwAA2AgQgACABNgIAIAJBQGskAAv8AQIBfgJ/IwBBgAFrIgQkACAAKAIAKQMAIQICfwJAIAEoAhQiAEEQcUUEQCAAQSBxDQEgAkEBIAEQbAwCC0EAIQADQCAAIARqQf8AaiACp0EPcSIDQTByIANB1wBqIANBCkkbOgAAIABBAWshACACQg9WIAJCBIghAg0ACyABQQFBkaHAAEECIAAgBGpBgAFqQQAgAGsQRQwBC0EAIQADQCAAIARqQf8AaiACp0EPcSIDQTByIANBN2ogA0EKSRs6AAAgAEEBayEAIAJCD1YgAkIEiCECDQALIAFBAUGRocAAQQIgACAEakGAAWpBACAAaxBFCyAEQYABaiQAC/4BAgN/BH4jAEEwayIDJAACQAJ/IAJB//8DcUGQzgBLBEBButvAACEFQRoMAQsgAVAEQEIAIQEMAgsgA0EgaiACQZDOAGqtQv//A4NCACABQgAQxQEgA0EQaiADKQMgIgEgA0EoaikDACIHQpDOAEIAEIUCIAMgAykDECIGIANBGGopAwAiCEKQzgBCABDFASAIIAYgASADKQMAIgl9IAcgA0EIaikDAH0gASAJVK19hEIAUq18IgEgBlStfFANAUH42sAAIQVBFgshAkEBIQQgBSACEAEhAgsgACAENgIMIAAgAkEAIAQbNgIIIABCACABIAQbNwMAIANB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//8Ag0KAgICAgICA+P8AWgRAIAJBATYCFCACQZTDwAA2AhAgAkIBNwIcIAJBNjYCLCACIAA2AiggAiACQShqNgIYIAEoAhwgASgCICACQRBqEFEhAwwBCyACQQA6AAwgAiABNgIIQQEhAyACQQE2AhQgAkGUw8AANgIQIAJCATcCHCACQTY2AiwgAiAANgIoIAIgAkEoajYCGCACQQhqIAJBEGoQ7wINACACLQAMRQRAIAFBnMPAAEECEMACDQELQQAhAwsgAkEwaiQAIAMLzgEBAn8jAEEwayICJAAgAiABNgIMAkAgARAvQQFHBEAgAkEMaiACQRBqQaDhwAAQVSEDIABBATYCACAAIAM2AgQgAUGEAUkNASABEAAMAQsgAkEQaiABEJcBIAIoAhAiAUUEQCAAIAIpAyA3AxAgAEEANgIAIAAgAkEoaikDADcDGCABRQ0BIAIoAhQiAEGEAUkNASAAEAAMAQtBk+PAAEHLABDGASEBIABBATYCACAAIAE2AgQgAigCFCIAQYQBSQ0AIAAQAAsgAkEwaiQAC84BAQJ/IwBBMGsiAiQAIAIgATYCDAJAIAEQL0EBRwRAIAJBDGogAkEQakGg4cAAEFQhAyAAQQE2AgAgACADNgIEIAFBhAFJDQEgARAADAELIAJBEGogARCXASACKAIQIgFFBEAgACACKQMgNwMQIABBADYCACAAIAJBKGopAwA3AxggAUUNASACKAIUIgBBhAFJDQEgABAADAELQZPjwABBywAQxgEhASAAQQE2AgAgACABNgIEIAIoAhQiAEGEAUkNACAAEAALIAJBMGokAAvEAQICfwJ+IwBBQGoiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxBaAn4gAigCEEUEQCAAIAIpAzA3AyAgACACKQMgNwMQIAAgAkE4aikDADcDKCAAIAJBKGopAwA3AxhCASEEQgAMAQsgACACKAIUNgIQQgIhBEIACyEFIAAgBDcDACAAIAU3AwgLIAJBQGskAAu2AQECfyMAQUBqIgMkACADQRhqIAIQChBgIAJBhAFPBEAgAhAACyADKAIYQQFHBEAgA0EIaiABIAMpAyAgAy8BKBBcIAACfyADKAIIRQRAIAMpAxAhAUEADAELIAMoAgwgAygCEBABIQRBAQsiAjYCDCAAIARBACACGzYCCCAAQgAgASACGzcDACADQUBrJAAPCyADIAMoAhw2AjAgA0E0aiADQTBqELsBIAMoAjggAygCPBDuAgALzgECAX8CfiMAQUBqIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARBbIAIoAhBFBEAgAikDMCEDIAIpAyAhBCAAIAJBKGopAwA3AxggACAENwMQIABCADcDCCAAQgE3AwAgACADNwMgDAELIAIoAhQhASAAQgA3AwggAEICNwMAIAAgATYCEAsgAkFAayQAC8EBAgN/AX4jAEEwayICJAAgASgCAEGAgICAeEYEQCABKAIMIQMgAkEUaiIEQQA2AgAgAkKAgICAEDcCDCACQSBqIAMoAgAiA0EIaikCADcDACACQShqIANBEGopAgA3AwAgAiADKQIANwMYIAJBDGpBuIHAACACQRhqEFEaIAJBCGogBCgCACIDNgIAIAIgAikCDCIFNwMAIAFBCGogAzYCACABIAU3AgALIABBsITAADYCBCAAIAE2AgAgAkEwaiQAC5YCAQJ/IwBBIGsiBSQAQeSIwQBB5IjBACgCACIGQQFqNgIAAkACf0EAIAZBAEgNABpBAUGwjMEALQAADQAaQbCMwQBBAToAAEGsjMEAQayMwQAoAgBBAWo2AgBBAgtB/wFxIgZBAkcEQCAGQQFxRQ0BIAVBCGogACABKAIYEQEAAAtB2IjBACgCACIGQQBIDQBB2IjBACAGQQFqNgIAQdiIwQBB3IjBACgCAAR/IAUgACABKAIUEQEAIAUgBDoAHSAFIAM6ABwgBSACNgIYIAUgBSkDADcCEEHciMEAKAIAIAVBEGpB4IjBACgCACgCFBEBAEHYiMEAKAIAQQFrBSAGCzYCAEGwjMEAQQA6AAAgA0UNAAALAAu3AQICfwJ+IwBBQGoiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxBbAn4gAigCEEUEQCAAIAIpAyA3AxAgACACKQMwNwMgIAAgAkEoaikDADcDGEIBIQRCAAwBCyAAIAIoAhQ2AhBCAiEEQgALIQUgACAENwMAIAAgBTcDCAsgAkFAayQAC6wBAQR/IwBBIGsiAiQAQQggACgCACIEQQFqIgMgBEEBdCIFIAMgBUsbIgMgA0EITRsiA0EASARAQQBBACABELsCAAtBACEFIAIgBAR/IAIgBDYCHCACIAAoAgQ2AhRBAQUgBQs2AhggAkEIaiADIAJBFGoQsgEgAigCCEEBRgRAIAIoAgwgAigCECABELsCAAsgAigCDCEBIAAgAzYCACAAIAE2AgQgAkEgaiQAC70BAgR/An4jAEEgayIBJAACQEEAQYDKwAAoAgARAwAiAgRAIAIoAgANASACQX82AgAgAUEIaiACQQRqIAAoAgAiAyAAKAIEIgAQeQJ/IAEoAhgiBEUEQCABKAIIDAELIAEpAwghBSABKQMQIQYgASADIAAQhwM2AhAgASAGNwIIIAQgBSABQQhqEJEBC0EEaygCABAKIAIgAigCAEEBajYCACABQSBqJAAPC0HwyMAAEPABAAtB7MrAABDxAQALhAECAn8BfiAAAn8CQCABrSIEQiCIpw0AIASnIgJB/////wdLDQAgAkUEQCAAQQE2AgggAEEANgIEQQAMAgtB0YjBAC0AABogAkEBEMcCIgMEQCAAIAM2AgggACABNgIEQQAMAgsgACACNgIIIABBATYCBEEBDAELIABBADYCBEEBCzYCAAusAQIDfwF+IwBBIGsiAyQAAkAgAkH//wNxIgVBkM4ATQRAIAFQIAVBkM4ARnINASADQRBqQpDOACACQf//AHEiAq19QgAgAkGQzgBLrX0gAUIAEMUBIAMgAykDECADQRhqKQMAQpDOAEIAEIUCIAMpAwAhBgwBC0EBIQRButvAAEEaEAEhAgsgACAENgIMIAAgAkEAIAQbNgIIIABCACAGIAQbNwMAIANBIGokAAuYAQIBfwR+IwBBEGsiAyQAIAMgABCYASADKQMIIQQgAykDACEFIAMgASACIAEgAkgbEDEQmAEgAykDCCEGIAMpAwAhByADIAEgAiABIAJKGxAxEJgBAn9BAyABIAJGDQAaQQEgBSAHWCAEIAZYIAQgBlEbDQAaIAUgAykDAFogBCADKQMIIgVaIAQgBVEbQQF0CyADQRBqJAALwQECAX8BfiMAQTBrIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARChASACKAIQRQRAIAIpAyAhAyAAIAJBKGopAwA3AxggACADNwMQIABCADcDCCAAQgE3AwAMAQsgAigCFCEBIABCADcDCCAAQgI3AwAgACABNgIQCyACQTBqJAALwQECAX8BfiMAQTBrIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARCiASACKAIQRQRAIAIpAyAhAyAAIAJBKGopAwA3AxggACADNwMQIABCADcDCCAAQgE3AwAMAQsgAigCFCEBIABCADcDCCAAQgI3AwAgACABNgIQCyACQTBqJAALrgECAn8CfiMAQTBrIgIkAAJAAkAgASgCAARAIAJBCGogARD7ASACKAIIDQELIABCADcDCCAAQgA3AwAMAQsgAigCDCEDIAEgASgCDEEBajYCDCACQRBqIAMQoQECfiACKAIQRQRAIAAgAikDIDcDECAAIAJBKGopAwA3AxhCASEEQgAMAQsgACACKAIUNgIQQgIhBEIACyEFIAAgBDcDACAAIAU3AwgLIAJBMGokAAuuAQICfwJ+IwBBMGsiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxCiAQJ+IAIoAhBFBEAgACACKQMgNwMQIAAgAkEoaikDADcDGEIBIQRCAAwBCyAAIAIoAhQ2AhBCAiEEQgALIQUgACAENwMAIAAgBTcDCAsgAkEwaiQAC4UBAQF/AkAgAUEATgRAAn8gAigCBARAIAIoAggiAwRAIAIoAgAgA0EBIAEQvgIMAgsLQQEgAUUNABpB0YjBAC0AABogAUEBEMcCCyICBEAgACABNgIIIAAgAjYCBCAAQQA2AgAPCyAAIAE2AgggAEEBNgIEDAELIABBADYCBAsgAEEBNgIAC8QBAgF/AXwjAEEgayICJAAgAiABKAIAEBYgAkEQaiACKAIAIAIrAwgQqQICQAJAIAIoAhBBAUYEQCACKwMYIQMgARDgAg0BCyAAQgA3AwAMAQsgAEIBNwMAIANEAAAAAAAA4MNmIQEgAEL///////////8AAn4gA5lEAAAAAAAA4ENjBEAgA7AMAQtCgICAgICAgICAfwtCgICAgICAgICAfyABGyADRP///////99DZBtCACADIANhGzcDCAsgAkEgaiQAC50BAQF/IwBBEGsiAiQAAkAgASgCABAgBEAgAkEEaiABENUBIABBCGogAkEMaigCADYCACAAIAIpAgQ3AgAMAQsgASgCABAaRQRAIABBgICAgHg2AgAMAQsgAiABKAIAEB0iATYCACACQQRqIAIQ1QEgAEEIaiACQQxqKAIANgIAIAAgAikCBDcCACABQYQBSQ0AIAEQAAsgAkEQaiQAC7kBAAJAAkACQAJAAkAgASACQZDwwABBCxCwAkUEQCABIAJBm/DAAEEMELACDQEgASACQafwwABBDhCwAg0CIAEgAkG18MAAQREQsAINAyABIAJBxvDAAEERELACDQQgASACQdfwwABBFBCwAkUEQCAAQQY6AAEMBgsgAEEFOgABDAULIABBADoAAQwECyAAQQE6AAEMAwsgAEECOgABDAILIABBAzoAAQwBCyAAQQQ6AAELIABBADoAAAuNAwEHfyMAQRBrIgckAAJAAkAgAkEHTQRAIAINAQwCCyAHQQhqIQYCQAJAAkACQCABQQNqQXxxIgMgAUYNACADIAFrIgMgAiACIANLGyIDRQ0AQQEhBQNAIAEgBGotAABBLkYNBCADIARBAWoiBEcNAAsgAyACQQhrIgVLDQIMAQsgAkEIayEFQQAhAwtBrty48QIhBANAQYCChAggASADaiIIKAIAQa7cuPECcyIJayAJckGAgoQIIAhBBGooAgBBrty48QJzIghrIAhycUGAgYKEeHFBgIGChHhHDQEgA0EIaiIDIAVNDQALCyACIANHBEBBLiEEQQEhBQNAIAEgA2otAABBLkYEQCADIQQMAwsgAiADQQFqIgNHDQALC0EAIQULIAYgBDYCBCAGIAU2AgAgBygCCEEBRiEGDAELIAJBAWshBCABIQMDQCADLQAAQS5GIgYNASADQQFqIQMgBCIFQQFrIQQgBQ0ACwsgACAGIAAtAARyOgAEIAAoAgAgASACEMACIAdBEGokAAuPAQECfyMAQUBqIgIkACACQgA3AzggAkE4aiAAKAIAEAMgAiACKAI8IgA2AjQgAiACKAI4NgIwIAIgADYCLCACQSI2AiggAkECNgIQIAJBiLzAADYCDCACQgE3AhggAiACQSxqIgM2AiQgAiACQSRqNgIUIAEoAhwgASgCICACQQxqEFEgAxDIASACQUBrJAALzggCBH8LfiMAQUBqIgMkACMAQeABayICJAAgAkHAAWogABCYASACQbABakKQzgBBkM4AIAFB//8DcSIAIABBkM4ATxsiAK0iBn1CACAAQZDOAEutfULAhD1CABDFASACQaABaiAGQgBCwIQ9QgAQxQEgAkHQAWoiACACKQOwASACQbgBaikDABB6IAIpA9ABIQcgAikD2AEhCyAAIAIpA6ABIgZCgMivoCV8IgkgAkGoAWopAwAgBiAJVq18IgoQeiACQSBqIAIpA9gBIgxCACACKQPQASIGQgAQxQEgAkGQAWogBkIAIAZCABDFASACQRBqIAtCACACKQPAASIIQgAQxQEgAiACKQPIASINQgAgB0IAEMUBIAJB0ABqIAhCACAHQgAQxQEgAkHwAGogAikDUCACQdgAaikDACIOIAIpAwAgAikDEHx8Ig9CoI0GQgAQhQIgAkEwaiANQgAgBiAMIAIpAyiEQgBSIAJBmAFqKQMAIhAgAikDICIHIAd8fCIHIBBUckF/cyACKQOQASAJVCAHIApUIAcgClEbca18IgdCABDFASACQUBrIAwgBiAHVq18IglCACAIQgAQxQEgAkHgAGogCEIAIAdCABDFASACQYABaiACKQNgIAJB6ABqKQMAIgcgAikDMCACKQNAfHwiCkKgjQZCABCFAiADQRBqIgBCx7ac4tr4KSACQfgAaikDACIGIA1CAFIiASALQgBScSACKQMIQgBSciACKQMYQgBSciAOIA9WciIEGzcDCCAAQvLm8Ib4+cORhH9C0PaEgBAgAikDcCIIIAhC0PaEgBBYG0LQ9oSAECAIIAZQGyAGUBsgBBs3AwAgAEKxifv/DyACQYgBaikDACIGQrGJ+/8PIAIpA4ABIghCr+fswKrm3901VCAGQrGJ+/8PVCAGQrGJ+/8PURsiBBsgASAJQgBScSACKQM4QgBSciACKQNIQgBSciAHIApWciIBGzcDGCAAQq/n7MCq5t/dNSAIQq/n7MCq5t/dNSAEGyABGzcDECACQeABaiQAIAMpAxAhBiADKQMYIQggAykDICEHIAMgA0EoaikDADcDKCADIAc3AyAgAyAINwMYIAMgBjcDECADQQA2AjwgA0EIaiEEIwBBMGsiASQAIAFBKGogA0E8ahDUAiABKAIsIQICfwJAIAEoAigiBUUNACABIAI2AiQgASAFNgIgIAFBGGogAUEgakGfzMAAQQwgABDoAQJAIAEoAhgEQCABKAIcIQIMAQsgAUEQaiABQSBqQavMwABBDCAAQRBqEOgBIAEoAhAEQCABKAIUIQIMAQsgAUEIaiABKAIgIAEoAiQQ0wIgASgCDCECIAEoAggMAgsgASgCJCIAQYQBSQ0AIAAQAAtBAQshACAEIAI2AgQgBCAANgIAIAFBMGokACADKAIIQQFxBEBBuO3AAEExEO4CAAsgAygCDCADQUBrJAALkgEBBH8jAEEQayICJABBASEEAkAgASgCHCIDQScgASgCICIFKAIQIgERAAANACACQQRqIAAoAgBBgQIQSQJAIAItAARBgAFGBEAgAyACKAIIIAERAABFDQEMAgsgAyACLQAOIgAgAkEEamogAi0ADyAAayAFKAIMEQIADQELIANBJyABEQAAIQQLIAJBEGokACAEC3sBAn8gAUH//wNxIgEEQCAAIAAgAW0iACABbGsiA0EfdSIEIABqIAFsIQAgASAEcSADaiEDAkACQCACQf8BcUECRwRAIANBAEwNAiACQQFxDQEMAgsgAyABQQF2SCADQQBMcg0BCyAAIAFqIQALIAAPC0HA1cAAEJsCAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQbjWwAA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEHg1sAAQTcgAkE/akHQ1sAAQeTXwAAQxwEACyAAIAIpAgw3AgAgAEEIaiACQRRqKAIANgIAIAJBQGskAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQejqwAA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEGQ68AAQTcgAkE/akGA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AAAAAGENACAAvSIDQjSIp0H/D3EiAkGyCEsNAAJAAkAgA0IAWQRAIAEgAEQAAAAAAAAwQ6BEAAAAAAAAMMOgIAChIgY5AwggAkH/B08NASABKwMIGkQAAAAAAAAAAAwECyABIABEAAAAAAAAMMOgRAAAAAAAADBDoCAAoSIGOQMIIAJB/wdJDQELIAYgAKAiAEQAAAAAAADwv6AgACAGRAAAAAAAAAAAZBsMAgsgASsDCBpEAAAAAAAA8L8hAAsgAAshACMAQRBrIgEkAAJ+QgAgAL0iA0KAgICAgICA+D9UDQAaIANCgICAgICAgPjHAFoEQEJ/QgAgA0KBgICAgICA+P8AVBsiBAwBCyABQgAgA0ILhkKAgICAgICAgIB/hEH+ACADQjSIp2tB/wBxEN4BIAEpAwAhBCABQQhqKQMACyEDIAUgBDcDACAFIAM3AwggAUEQaiQAQn8gBUEIaikDAEIAIABEAAAAAAAAAABmIgEbIABE////////70dkIgIbQn8gBSkDAEIAIAEbIAIbECcgBUEQaiQAC2wBAX8jAEEwayICJAAgAkEYaiAAKAIAECkgAkEQaiACKAIYIAIoAhwQzwIgAkEIaiACKAIQIAIoAhQQ/QEgAkEkaiIAIAIoAgggAigCDBC8AiACKAIoIAIoAiwgARDtAiAAEMgBIAJBMGokAAttAQF/IwBB4AFrIgEkACABIAAQChA0IABBhAFPBEAgABAACyABKAIAQQFGBEAgASABKAIENgLQASABQdQBaiABQdABahC8ASABKALYASABKALcARDuAgALIAEvAbwBIAEvAb4BRyABQeABaiQAC2YBAX8jAEEgayICJAAgAiAAIAEgACABShs2AhggAiAAIAEgACABSBs2AhQgAkEANgIcIAJBCGogAkEUaiACQRxqEJoBIAIoAghBAXEEQEG47cAAQTEQ7gIACyACKAIMIAJBIGokAAt1AQF/IwBBQGoiAyQAIAMgAjYCFCADIAE2AhAgAyAANgIMIANBAjYCHCADQbTqwAA2AhggA0ICNwIkIANBOjYCPCADQQI2AjQgAyADQTBqNgIgIAMgA0EQajYCOCADIANBDGo2AjAgA0EYahCbASADQUBrJAALdQEBfyMAQUBqIgMkACADIAI2AhQgAyABNgIQIAMgADYCDCADQQI2AhwgA0G06sAANgIYIANCAjcCJCADQTo2AjwgA0ECNgI0IAMgA0EwajYCICADIANBEGo2AjggAyADQQxqNgIwIANBGGoQnAEgA0FAayQAC2MBAX8jAEEQayIFJAAgBUEIaiABIAIgAyAEQQBHED0gBSgCDCEEIAAgBSgCCCIBBH8gASAEEAEhBEEBBUEACyICNgIIIAAgBEEAIAIbNgIEIABBACAEIAIbNgIAIAVBEGokAAtjAQF/IwBBEGsiBSQAIAVBCGogASACIAMgBEEARxBCIAUoAgwhBCAAIAUoAggiAQR/IAEgBBABIQRBAQVBAAsiAjYCCCAAIARBACACGzYCBCAAQQAgBCACGzYCACAFQRBqJAALawICfwF+IwBBEGsiBSQAIAUgASACIAMgBEEARxA8AkAgBSgCAEUEQCAFKQMIIQcMAQtBASEGIAUoAgQgBSgCCBABIQQLIAAgBjYCDCAAIARBACAGGzYCCCAAQgAgByAGGzcDACAFQRBqJAALawICfwF+IwBBEGsiBSQAIAUgASACIAMgBEEARxBdAkAgBSgCAEUEQCAFKQMIIQcMAQtBASEGIAUoAgQgBSgCCBABIQQLIAAgBjYCDCAAIARBACAGGzYCCCAAQgAgByAGGzcDACAFQRBqJAAL1wEBAn8jAEEgayIGJAAgAUUEQEHcv8AAQTIQ7gIACyAGQRRqIgcgASADIAQgBSACKAIQEQcAIwBBEGsiAyQAAkACQCAGQQhqIgIgBygCCCIBIAcoAgBJBH8gA0EIaiAHIAFBBEEEEJkBIAMoAggiAUGBgICAeEcNASAHKAIIBSABCzYCBCACIAcoAgQ2AgAgA0EQaiQADAELIAEgAygCDEHMv8AAELsCAAsgBiAGKAIIIAYoAgwQzwIgBigCBCEBIAAgBigCADYCACAAIAE2AgQgBkEgaiQAC6MBAQd/IwBBEGsiAiQAIAJBBGogASgCACIIEB8QqwEgAigCCCEEIAIoAgRBAUYEQCAEIAIoAgxB6MDAABC7AgALIAIoAgwhBRAFIgYQHCIHEB0hAyAHQYQBTwRAIAcQAAsgAyABKAIAIAUQHiADQYQBTwRAIAMQAAsgBkGEAU8EQCAGEAALIAAgCBAfNgIIIAAgBTYCBCAAIAQ2AgAgAkEQaiQAC2kCAX8BfiMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQaifwAA2AgggA0ICNwIUIANCgICAgCAiBCADrYQ3AyggAyAEIANBBGqthDcDICADIANBIGo2AhAgA0EIaiACEKMCAAuRDAIFfxJ+IwBBIGsiBSQAIAVBEGohBiMAQfACayIDJAAgA0HQAmogABCYAUGQzgAhAAJAAkACQAJAAkACQCADKQPYAiINIAMpA9ACIgsQJyABIAIQrQFB/wFxQQFrDgMDAQIACyADQdACaiIEIAEgAiABIAJIGxAxEJgBIAMpA9gCIRQgAykD0AIhEiAEIAEgAiABIAJKGxAxEJgBIANBoAFqIAtCACALQgAQxQEgA0GQAWogC0IAIA1CABDFASADQYABaiANQgAgDUIAEMUBIAMpA9gCIQkgAykD0AIhDiADQgE3A6gCIANCADcDoAIgA0IANwOYAiADQgA3A5ACIANCADcDyAIgA0IANwPAAiADIA03A7gCIAMgCzcDsAIgA0HoAmoiB0IANwMAIANB4AJqIgFCADcDACADQgA3A9gCIANCADcD0AIgA0GoAWopAwAhCiADKQOQASEIIANBmAFqKQMAIQwgAykDgAEhFSADQYgBaikDACEWIAMpA6ABIQ8gA0GwAmoiACAEEOUCDQMgA0GwAWogA0GQAmoiAiAAQQAQMiADQgE3A6gCIANCADcDoAIgA0IANwOYAiADQgA3A5ACIANCADcDyAIgA0IANwPAAiADIAk3A7gCIAMgDjcDsAIgB0IANwMAIAFCADcDACADQgA3A9gCIANCADcD0AIgACAEEOUCDQMgA0HQAWogAiAAQQAQMiADQfAAaiADKQOwASIQIAMpA9ABIhF9IglCACAPQn2DIg5CABDFASADQeAAaiADKQO4ASIPIAMpA9gBIhN9IBAgEVQiBK19IhBCACAOQgAQxQEgA0HQAGogCUIAIAggCnwiESAIfCIIQgAQxQEgA0FAayAQQgAgCEIAEMUBIANBMGogAykDwAEiFyADKQPgASIYfSIZIAQgDyATVCAPIBNRG60iD30gA0HIAWopAwAgA0HoAWopAwB9IBcgGFStfSAPIBlWrX0gDiAIEMUBIANBIGogCSAQIAwgCiARVq18IgkgFXwiCiAMIAggEVStfHwiCCAIIApUrSAWIAkgClatfHwQxQEgA0EQaiADKQNAIg4gAykDIHwiCCADKQMwfCIKIANB6ABqKQMAIANB+ABqKQMAIgkgAykDYHwiDCAJVK18fCIJIANB2ABqKQMAIAwgAykDUHwgDFStfHwiDEIAQpDOAEIAEMUBIAMgCSAMVq0gCSAKVK0gCCAKVq0gA0E4aikDACAIIA5UrSADQcgAaikDACADQShqKQMAfHx8fHx8IghCAEKQzgBCABDFASADQgA3A6gCIAMgAykDEEJwgzcDkAIgAyADQRhqKQMAIgogAykDAHwiCTcDmAIgAyADQQhqKQMAIAkgClStfDcDoAIgAyAMNwOwAiADIAggCyASfXwiCjcDuAIgAyANIBR9IAsgElStfSILIAggClatfCINNwPAAiADIAsgDVatNwPIAiAHQgA3AwAgAUIANwMAIANCADcD2AIgA0IANwPQAiADQbACaiADQdACahDlAg0DIANB8AFqIAIgAEEAEDJBkM4AIAMvAfABIgBrIQQMAgtBACEAQZDOACEEDAELQQAhAAsgBiAEOwECIAYgADsBACADQfACaiQADAELIANBADYC4AIgA0EBNgLUAiADQZjRwAA2AtACIANCBDcC2AIgA0HQAmpB7NDAABCjAgALIAUgBSgCEDYBGCAFQQA2AhwgBUEIaiECIAVBGGohAyMAQTBrIgAkACAAQShqIAVBHGoQ1AIgACgCLCEBAn8CQCAAKAIoIgRFDQAgACABNgIkIAAgBDYCICAAQRhqIABBIGpBrdHAACADEOsBAkAgACgCGARAIAAoAhwhAQwBCyAAQRBqIABBIGpBs9HAACADQQJqEOsBIAAoAhAEQCAAKAIUIQEMAQsgAEEIaiAAKAIgIAAoAiQQ0wIgACgCDCEBIAAoAggMAgsgACgCJCIDQYQBSQ0AIAMQAAtBAQshAyACIAE2AgQgAiADNgIAIABBMGokACAFKAIIQQFxBEBBuO3AAEExEO4CAAsgBSgCDCAFQSBqJAALZgAjAEEwayIAJABB0IjBAC0AAARAIABBAjYCDCAAQfiDwAA2AgggAEIBNwIUIAAgATYCLCAAIABBLGqtQoCAgIAghDcDICAAIABBIGo2AhAgAEEIakGghMAAEKMCAAsgAEEwaiQAC2gBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQQI2AgwgA0GMxcAANgIIIANCAjcCFCADQTo2AiwgA0E7NgIkIAMgADYCICADIANBIGo2AhAgAyADNgIoIANBCGoQmwEgA0EwaiQAC2gBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQQI2AgwgA0GQyMAANgIIIANCAjcCFCADQT42AiwgA0E7NgIkIAMgADYCICADIANBIGo2AhAgAyADNgIoIANBCGoQnAEgA0EwaiQAC2MBAn8jAEEQayIDJAAgAyABIAIQ3wEgAAJ/IAMoAgBFBEAgAykDCCEBQQAMAQsgAygCBCADKAIIEAEhBEEBCyICNgIMIAAgBEEAIAIbNgIIIABCACABIAIbNwMAIANBEGokAAtoAQF/IwBBMGsiAyQAIAMgAjYCBCADIAE2AgAgA0ECNgIMIANB9OnAADYCCCADQgI3AhQgA0E6NgIsIANBOzYCJCADIAA2AiAgAyADQSBqNgIQIAMgAzYCKCADQQhqEJwBIANBMGokAAtWAQF+AkAgA0HAAHFFBEAgA0UNASACIANBP3GtIgSGIAFBACADa0E/ca2IhCECIAEgBIYhAQwBCyABIANBP3GthiECQgAhAQsgACABNwMAIAAgAjcDCAtWAQF+AkAgA0HAAHFFBEAgA0UNASACQQAgA2tBP3GthiABIANBP3GtIgSIhCEBIAIgBIghAgwBCyACIANBP3GtiCEBQgAhAgsgACABNwMAIAAgAjcDCAv0AgICfwZ+IwBBEGsiAyQAQQEhBELAhD0gAq19IQVCACACQcCEPUutfSEGIwBBQGoiAiQAIAMCfwJAIAFQBEAgA0IANwMIDAELIAJBIGpCAEIAIAFCABDFASACQTBqIAFCAELAhD1CABDFASACKQMoQgBSIAJBOGopAwAiASACKQMgfCIHIAFUckUEQCAFIAaEUEUEQCACQRBqIAIpAzAiCCAHIAUgBhCFAiACIAIpAxAiCSACQRhqKQMAIgogBSAGEMUBIAogCSAIIAIpAwAiAX0gByACQQhqKQMAfSABIAhWrX2EQgBSrXwiASAJVK18UARAIAMgATcDCAwDCyADQRY2AgggA0H42sAANgIEQQEMAwtB6NrAABCaAgALIANBHTYCCCADQcvawAA2AgRBAQwBC0EACzYCACACQUBrJAACQCADKAIARQRAIAAgAykDCDcDCEEAIQQMAQsgACADKQIENwIECyAAIAQ2AgAgA0EQaiQAC/MBAQF/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f2ENABpBAiAnQoCAgICAgID4/wCDIiVCgICAgICAgPj/AFENABogJ0L/////////B4MiKUKAgICAgICACIQgJ0IBhkL+////////D4MgJ0I0iKdB/w9xIgEbIiZCAYMhKCAlUARAQQQgKVANARogAUGzCGshAEIBISUgKFAMAQtCgICAgICAgCAgJkIBhiAmQoCAgICAgIAIUSIAGyEmQgJCASAAGyElQct3Qcx3IAAbIAFqIQAgKFALIQEgCSAAOwHoCCAJICU3A+AIIAlCATcD2AggCSAmNwPQCCAJIAE6AOoIAkACfwJAAkACQAJAIAFBAmsiAwRAQQEhAUHLncAAQcydwAAgJ0IAUyIGG0HLncAAQQEgBhsgAhshGyAnQj+IpyACciEcQQMgAyADQQNPG0ECaw4CAgMBCyAJQQM2ApgIIAlBzZ3AADYClAggCUECOwGQCEEBIRtBASEBIAlBkAhqDAQLIAlBAzYCmAggCUHQncAANgKUCCAJQQI7AZAIIAlBkAhqDAMLQQIhASAJQQI7AZAIIBNFDQEgCSATNgKgCCAJQQA7AZwIIAlBAjYCmAggCUHJncAANgKUCCAJQZAIagwCC0F0QQUgAMEiAEEASBsgAGwiAEHA/QBJBEAgCUGQCGohDCAJQRBqIQogAEEEdkEVaiEHQYCAfkEAIBNrIBNBgIACTxshAQJAAkACfwJAAkACQAJAIAlB0AhqIhEpAwAiJVBFBEAgJUKAgICAgICAgCBaDQEgB0UNAkGgfyARLwEYIgBBIGsgACAlQoCAgIAQVCIAGyICQRBrIAIgJUIghiAlIAAbIiVCgICAgICAwABUIgAbIgJBCGsgAiAlQhCGICUgABsiJUKAgICAgICAgAFUIgAbIgJBBGsgAiAlQgiGICUgABsiJUKAgICAgICAgBBUIgAbIgJBAmsgAiAlQgSGICUgABsiJUKAgICAgICAgMAAVCIAGyAlQgKGICUgABsiJUIAWWsiA2vBQdAAbEGwpwVqQc4QbSIAQdEATw0DIABBBHQiAkGQjsAAaikDACImQv////8PgyInICUgJUJ/hUI/iIYiJUIgiCIofiIpQiCIICZCIIgiJiAofnwgJiAlQv////8PgyIlfiImQiCIfCApQv////8PgyAlICd+QiCIfCAmQv////8Pg3xCgICAgAh8QiCIfCIm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IAkoAsAIIAkoAsQIIAAgEyAJQZAIahB1IAkoAgwhASAJKAIIDAMLQQIhASAJQQI7AZAIIBNFBEBBASEBIAlBATYCmAggCUHTncAANgKUCCAJQZAIagwDCyAJIBM2AqAIIAlBADsBnAggCUECNgKYCCAJQcmdwAA2ApQIIAlBkAhqDAILQdSdwABBJUH8ncAAEP8BAAtBASEBIAlBATYCmAggCUHTncAANgKUCCAJQZAIagshACAJIAE2AswIIAkgADYCyAggCSAcNgLECCAJIBs2AsAIIAggCUHACGoQUiAJQfAIaiQADAELIABBKEHIssAAENoCAAsPCyABQQAhACMAQYABayIEJAAgP70hJgJ/QQMgP5lEAAAAAAAA8H9hDQAaQQIgJkKAgICAgICA+P8AgyIlQoCAgICAgID4/wBRDQAaICZC/////////weDIilCgICAgICAgAiEICZCAYZC/v///////w+DICZCNIinQf8PcSIAGyInQgGDISggJVAEQEEEIClQDQEaIABBswhrIQBCASElIChQDAELQoCAgICAgIAgICdCAYYgJ0KAgICAgICACFEiARshJ0ICQgEgARshJUHLd0HMdyABGyAAaiEAIChQCyEBIAQgADsBeCAEICU3A3AgBEIBNwNoIAQgJzcDYCAEIAE6AHoCfwJAAkACQCABQQJrIgEEQEEBIQBBy53AAEHMncAAICZCAFMiAxtBy53AAEEBIAMbIAIbIRggJkI/iKcgAnIhG0EDIAEgAUEDTxtBAmsOAgMCAQsgBEEDNgIoIARBzZ3AADYCJCAEQQI7ASBBASEYQQEhACAEQSBqDAMLIARBAzYCKCAEQdCdwAA2AiQgBEECOwEgIARBIGoMAgsgBEEgaiEHIARBD2oiDiEIIwBBMGsiAyQAAkACQAJ/AkACQAJAAkACQAJAAkACQCAEQeAAaiIMIgApAwAiJVBFBEAgACkDCCInUA0BIAApAxAiJlANAiAlICZ8IiYgJVQNAyAlICdUDQQgJkKAgICAgICAgCBaDQUgAyAALwEYIgA7AQggAyAlICd9Iic3AwAgACAAQSBrIAAgJkKAgICAEFQiARsiAkEQayACICZCIIYgJiABGyImQoCAgICAgMAAVCIBGyICQQhrIAIgJkIQhiAmIAEbIiZCgICAgICAgIABVCIBGyICQQRr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NgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQdr9wABBGBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQcj9wABBEhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQez+wABBHRDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYn/wABBFhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQZ//wABBGBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYP9wABBExDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQbf/wABBHhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQdX/wABBIhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQff/wABBFBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYuAwQBBERDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQZyAwQBBFBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQbCAwQBBGhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQcqAwQBBFxDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQfL9wABBGxDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQeGAwQBBGRDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALyQECA38BfiMAQRBrIgMkACADIAE2AgwjAEEwayICJAAgAkEIaiADQQxqIgQQswECQAJAIAIoAghBAUYEQCACKQMQIgVCAFkNAQsgBCACQS9qQdDfwAAQVSEEIABBAToAACAAIAQ2AgQMAQsgAAJ/IAVC/wFYBEAgACAFPAABQQAMAQsgAkEBOgAYIAIgBTcDICAAIAJBGGogAkEvakHQ38AAENwBNgIEQQELOgAACyACQTBqJAAgAUGEAU8EQCABEAALIANBEGokAAvKAQIDfwF+IwBBEGsiAyQAIAMgATYCDCMAQTBrIgIkACACQQhqIANBDGoiBBCzAQJAAkAgAigCCEEBRgRAIAIpAxAiBUIAWQ0BCyAEIAJBL2pB8N/AABBVIQQgAEEBOwEAIAAgBDYCBAwBCyAAAn8gBUL//wNYBEAgACAFPQECQQAMAQsgAkEBOgAYIAIgBTcDICAAIAJBGGogAkEvakHw38AAENwBNgIEQQELOwEACyACQTBqJAAgAUGEAU8EQCABEAALIANBEGokAAs3AQF/IwBBIGsiASQAIAFBADYCGCABQQE2AgwgAUHEs8AANgIIIAFCBDcCECABQQhqIAAQowIACzcBAX8jAEEgayIBJAAgAUEANgIYIAFBATYCDCABQYi0wAA2AgggAUIENwIQIAFBCGogABCjAgALLgAgAUH//wNxIgFFBEBB4NXAABCbAgALIAAgAWogACABbyIAIABBH3UgAXFqawuyAQECfyMAQRBrIgAkACABKAIcQfiCwABBCyABKAIgKAIMEQIAIQMgAEEIaiICQQA6AAUgAiADOgAEIAIgATYCACACIgEtAAQhAiABLQAFBEAgAQJ/QQEgAkEBcQ0AGiABKAIAIgEtABRBBHFFBEAgASgCHEGLocAAQQIgASgCICgCDBECAAwBCyABKAIcQYqhwABBASABKAIgKAIMEQIACyICOgAECyACQQFxIABBEGokAAsnAAJAIANFIAEgAxCmAkVyRQRAIAAgASADIAIQvgIiAA0BCwALIAAL5gECBH8CfiMAQRBrIgMkACADIAE2AgwgAyAANgIIAn8gA0EIaiECIwBBIGsiACQAAkBBAEH4xsAAKAIAEQMAIgEEQCABKAIADQEgAUF/NgIAIABBCGogAUEEaiACKAIA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AEEPdkEBcQthAQJ/AkACQCAAQQRrKAIAIgJBeHEiA0EEQQggAkEDcSICGyABak8EQCACQQAgAyABQSdqSxsNASAAEEwMAgtB+YHAAEEuQaiCwAAQ/wEAC0G4gsAAQS5B6ILAABD/AQALC2kBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQQI2AgwgA0HEtMAANgIIIANCAjcCFCADIANBBGqtQoCAgIAghDcDKCADIAOtQoCAgIAghDcDICADIANBIGo2AhAgA0EIaiACEKMCAAtpAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0ECNgIMIANB+LTAADYCCCADQgI3AhQgAyADQQRqrUKAgICAIIQ3AyggAyADrUKAgICAIIQ3AyAgAyADQSBqNgIQIANBCGogAhCjAgALCwAgACgCACABEHALDwBByJ7AAEErIAAQ/wEACw0AIAApAwBBASABEGwLDAAgACgCABAZQQBHCwwAIAAoAgAQG0EARwsNACAAKAIAIAEgAhArCwsAIAAgASACEMoBCw0AIAAQMSABIAIQ7gELDQAgACABIAIQygEQWAsMACAAIAFBIBDyAUULCwAgACMAaiQAIwALDQAgAEG4gcAAIAEQUQsMACAAIAEpAgA3AwALDQAgAEGQhcAAIAEQUQsOACABQYiFwABBBRDAAgsZACAAIAFB1IjBACgCACIAQQMgABsRAQAACw0AIABB7KDAACABEFELCgAgAiAAIAEQRgsJACAAIAEQBAALDQAgAEH4wMAAIAEQUQsLACAAIAEgAhDuAQsZAEEAIAAgASACEMoBEFhrEDEgASACEO4BCw4AIAFBsNPAAEEVEMACCw4AIAFBkNTAAEEfEMACCw4AIAFB2NTAAEESEMACCwcAIAAQyAELDgAgAUH018AAQQUQwAILDgAgAUHA3sAAQQUQwAILDgAgAUGv6cAAQRQQwAILDgAgAUHD6cAAQRQQwAILDQAgAEHo6sAAIAEQUQsOACABQYDtwABBBRDAAgsOACABQZzxwABBERDAAgsOACABQeDxwABBFhDAAgsOACABQcD1wABBExDAAgsOACABQYj3wABBIRDAAgsOACABQcT4wABBIRDAAgsOACABQeT6wABBFhDAAgsOACABQcj7wABBIBDAAgsNACABQej7wABBAhBGCw4AIAFB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SvMe4U5ANKFSHmHhU/BqYVRPb+FUnbxhVQDPYVZl0aFWANohVwDgoViu4iFa7OThW9DoYVwgAO5c8AF/XQBwAAcALQEBAQIBAgEBSAswFRABZQcCBgICAQQjAR4bWws6CQkBGAQBCQEDAQUrAzsJKhgBIDcBAQEECAQBAwcKAh0BOgEBAQIECAEJAQoCGgECAjkBBAIEAgIDAwEeAgMBCwI5AQQFAQIEARQCFgYBAToBAQIBBAgBBwMKAh4BOwEBAQwBCQEoAQMBNwEBAwUDAQQHAgsCHQE6AQICAQEDAwEEBwILAhwCOQIBAQIECAEJAQoCHQFIAQQBAgMBAQgBUQECBwwIYgECCQsHSQIbAQEBAQE3DgEFAQIFCwEkCQFmBAEGAQICAhkCBAMQBA0BAgIGAQ8BAAMABBwDHQIeAkACAQcIAQILCQEtAwEBdQIiAXYDBAIJAQYD2wICAToBAQcBAQEBAggGCgIBMB8xBDAKBAMmCQwCIAQCBjgBAQIDAQEFOAgCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLAQEsAzABAgQCAgIBJAFDBgICAgIMAQgBLwEzAQEDAgIFAgEBKgIIAe4BAgEEAQABABAQEAACAAHiAZUFAAMBAgUEKAMEAaUCAARBBQACTwRGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQEBCAQCAV8DAgQGAQIBnQEDCBUCOQIBAQEBDAEJAQ4HAwVDAQIGAQECAQEDBAMBAQ4CVQgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIIZQEBAQIEAQUACQEC9QEKBAQBkAQCAgQBIAooBgIECAEJBgIDLg0BAgAHAQYBAVIWAgcBAgECegYDAQECAQcBAUgCAwEBAQACCwI0BQUDFwEAAQYPAAwDAwAFOwcAAT8EUQELAgACAC4CFwAFAwYICAIHHgSUAwA3BDIIAQ4BFgUBDwAHARECBwECAQVkAaAHAAE9BAAE/gIAB20HAGCA8ABKc1ZhbHVlKCn/HRAACAAAAAceEAABAAAATGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkAAAYHhAAKgAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL29uY2VfY2VsbC0xLjIwLjMvc3JjL2xpYi5ycwAAAEweEABdAAAACAMAABkAAAByZWVudHJhbnQgaW5pdAAAvB4QAA4AAABMHhAAXQAAAHoCAAANAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvd2FzbS1iaW5kZ2VuLTAuMi4xMDAvc3JjL2NvbnZlcnQvc2xpY2VzLnJz5B4QAGwAAADoAAAAAQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL3dhc20tYmluZGdlbi0wLjIuMTAwL3NyYy9jb252ZXJ0L3NsaWNlcy5yc2AfEABsAAAAJAEAAA4AAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2pzLXN5cy0wLjMuNzcvc3JjL2xpYi5ycw4gEABaAAAA+xgAAAEAAAAAAAAACAAAAAQAAAA3AAAAOAAAADkAAABhIGJvb2xlYW5ieXRlIGFycmF5Ym9vbGVhbiBgYAAAAKMgEAAJAAAArCAQAAEAAABpbnRlZ2VyIGAAAADAIBAACQAAAKwgEAABAAAAZmxvYXRpbmcgcG9pbnQgYNwgEAAQAAAArCAQAAEAAABjaGFyYWN0ZXIgYAD8IBAACwAAAKwgEAABAAAAc3RyaW5nIAAYIRAABwAAAHVuaXQgdmFsdWVPcHRpb24gdmFsdWVuZXd0eXBlIHN0cnVjdHNlcXVlbmNlbWFwZW51bXVuaXQgdmFyaWFudG5ld3R5cGUgdmFyaWFudHR1cGxlIHZhcmlhbnRzdHJ1Y3QgdmFyaWFudAAAAAEAAAAAAAAALjBpMzJ1OHUxNnUzMnU2NGkxMjh1MTI4SGFzaCB0YWJsZSBjYXBhY2l0eSBvdmVyZmxvd7QhEAAcAAAAL3J1c3QvZGVwcy9oYXNoYnJvd24tMC4xNS4yL3NyYy9yYXcvbW9kLnJzAADYIRAAKgAAACMAAAAoAAAAL3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5ycxQiEABMAAAAKgIAABEAAABpbnZhbGlkIHR5cGU6ICwgZXhwZWN0ZWQgAAAAcCIQAA4AAAB+IhAACwAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAnCIQAE8AAAAUAQAAGQAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAAD8IhAASgAAAKIAAAAZAAAA//////////9YIxAAQfDGwAAL+wIBAAAAAAAAAD0AAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9zZXJkZS13YXNtLWJpbmRnZW4tMC42LjUvc3JjL2xpYi5ycwAAAHwjEABlAAAANQAAAA4AAABpbnZhbGlkIHR5cGU6ICwgZXhwZWN0ZWQgAAAA9CMQAA4AAAACJBAACwAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAICQQAE8AAAAUAQAAGQAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAACAJBAASgAAAKIAAAAZAAAAAAAAAP//////////4CQQAEH4ycAAC4EBAQAAAAAAAAA/AAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvc2VyZGUtd2FzbS1iaW5kZ2VuLTAuNS4wL3NyYy9saWIucnMAAAAEJRAAZQAAADUAAAAOAEGGy8AACxrwPwAAAAAAAPg/AAAAAAAAAAAG0M9D6/1MPgBBq8vAAAuiC0ADuOI/L2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL21hdGgvcHJpY2UucnMAsCUQAEcAAAAjAAAAGAAAAFNxcnRQcmljZVNsaXBwYWdlQm91bmRzbWluU3FydFByaWNlbWF4U3FydFByaWNlRGVjcmVhc2VMaXF1aWRpdHlRdW90ZWxpcXVpZGl0eURlbHRhdG9rZW5Fc3RBdG9rZW5Fc3RCdG9rZW5NaW5BdG9rZW5NaW5CSW5jcmVhc2VMaXF1aWRpdHlRdW90ZXRva2VuTWF4QXRva2VuTWF4QkNvbGxlY3RSZXdhcmRzUXVvdGVyZXdhcmRzQ29sbGVjdFJld2FyZFF1b3RlcmV3YXJkc093ZWRFeGFjdEluU3dhcFF1b3RldG9rZW5JbnRva2VuRXN0T3V0dG9rZW5NaW5PdXR0cmFkZUZlZXRyYWRlRmVlUmF0ZU1pbnRyYWRlRmVlUmF0ZU1heEV4YWN0T3V0U3dhcFF1b3RldG9rZW5PdXR0b2tlbkVzdEludG9rZW5NYXhJbi9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2V0aG51bS0xLjUuMC9zcmMvaW50cmluc2ljcy9uYXRpdmUvZGl2bW9kLnJzXicQAG4AAAAtAAAACgAAAF4nEABuAAAAaQAAACsAAABeJxAAbgAAAGsAAAAnAAAAXicQAG4AAACNAAAAEQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2V0aG51bS0xLjUuMC9zcmMvdWludC9vcHMucnMAAAwoEABeAAAAEQAAAAEAAABhdHRlbXB0IHRvIGRpdmlkZSBieSB6ZXJvAAAAfCgQABkAAABQb3NpdGlvblJhdGlvcmF0aW9BcmF0aW9CUG9zaXRpb25TdGF0dXNwcmljZUluUmFuZ2VwcmljZUJlbG93UmFuZ2VwcmljZUFib3ZlUmFuZ2VpbnZhbGlkUG9zaXRpb25GYWNhZGVsaXF1aWRpdHl0aWNrTG93ZXJJbmRleHRpY2tVcHBlckluZGV4ZmVlR3Jvd3RoQ2hlY2twb2ludEFmZWVPd2VkQWZlZUdyb3d0aENoZWNrcG9pbnRCZmVlT3dlZEJyZXdhcmRJbmZvcwAABikQAAkAAAAPKRAADgAAAB0pEAAOAAAAKykQABQAAAA/KRAACAAAAEcpEAAUAAAAWykQAAgAAABjKRAACwAAAHN0cnVjdCBQb3NpdGlvbkZhY2FkZVBvc2l0aW9uUmV3YXJkSW5mb0ZhY2FkZWdyb3d0aEluc2lkZUNoZWNrcG9pbnRhbW91bnRPd2VkAAAA3SkQABYAAADzKRAACgAAAHN0cnVjdCBQb3NpdGlvblJld2FyZEluZm9GYWNhZGVUcmFuc2ZlckZlZWZlZUJwc21heEZlZQAAOioQAAYAAABAKhAABgAAAHN0cnVjdCBUcmFuc2ZlckZlZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL3RpY2sucnNqKhAARgAAAB0AAAAKAAAAaioQAEYAAACGAAAAIAAAAGoqEABGAAAAoQAAACAAAABqKhAARgAAALQAAAAgAAAAaioQAEYAAADRAAAABQAAAGoqEABGAAAA/AAAABoAAABqKhAARgAAAD4BAAASAAAAVGljayBpbmRleCBub3QgaW4gYXJyYXkAQAAAAAwAAAAEAAAAQQAAAEIAAABDAEHY1sAAC5kGAQAAAEQAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAACXKxAASwAAAN8KAAAOAAAARXJyb3IAAACXKxAASwAAAI4FAAAbAAAAlysQAEsAAACNBQAAGwAAAJcrEABLAAAAZwQAABIAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9ldGhudW0tMS41LjAvc3JjL3VpbnQvb3BzLnJzAAAsLBAAXgAAABEAAAABAAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAJwsEAAZAAAAYXR0ZW1wdCB0byBjYWxjdWxhdGUgdGhlIHJlbWFpbmRlciB3aXRoIGEgZGl2aXNvciBvZiB6ZXJvAAAAwCwQADkAAAAvaG9tZS9ydW5uZXIvd29yay93aGlybHBvb2xzL3doaXJscG9vbHMvcnVzdC1zZGsvY29yZS9zcmMvbWF0aC90b2tlbi5yc0FyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93BC0QAEcAAABmAQAAFAAAAEFtb3VudCBleGNlZWRzIG1heCB1NjRTcXJ0IHByaWNlIG91dCBvZiBib3VuZHNJbnZhbGlkIHRyYW5zZmVyIGZlZUludmFsaWQgc2xpcHBhZ2UgdG9sZXJhbmNlWAAAAGFuIGFycmF5IG9mIGxlbmd0aCAA2C0QABMAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9zZXJkZS1iaWctYXJyYXktMC41LjEvc3JjL2NvbnN0X2dlbmVyaWNzLnJzAAAA9C0QAG0AAABtAAAANABB/NzAAAsdAQAAAEUAAABGAAAADAAAAAQAAABHAAAASAAAAEMAQaTdwAAL6gEBAAAASQAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAOMuEABLAAAA3woAAA4AAABFcnJvcgAAAOMuEABLAAAAjgUAABsAAADjLhAASwAAAI0FAAAbAAAA4y4QAEsAAABnBAAAEgAAAEFtb3VudCBleGNlZWRzIG1heCB1NjQAQZjfwAALBQEAAABKAEGo38AACwUBAAAASwBBuN/AAAsFAQAAAEsAQcjfwAALBQEAAABLAEHY38AACwUBAAAATABB6N/AAAsFAQAAAE0AQfjfwAALBQEAAABOAEGI4MAACwUBAAAATwBBmODAAAsFAQAAAFAAQajgwAALBQEAAABRAEG44MAACwUBAAAAUgBByODAAAsFAQAAAFMAQdjgwAALBQEAAABFAEHo4MAACwUBAAAAVABB+ODAAAsFAQAAAFUAQYjhwAALBQEAAABWAEGY4cAACwUBAAAAVwBBqOHAAAsFAQAAAFgAQbjhwAALBQEAAABZAEHI4cAACwUBAAAAWgBB2OHAAAsFAQAAAFsAQejhwAALBQEAAABcAEH44cAAC4UJAQAAAF0AAABDb3VsZG4ndCBkZXNlcmlhbGl6ZSB1NjQgZnJvbSBhIEJpZ0ludCBvdXRzaWRlIHU2NDo6TUlOLi51NjQ6Ok1BWCBib3VuZHNDb3VsZG4ndCBkZXNlcmlhbGl6ZSBpMTI4IGZyb20gYSBCaWdJbnQgb3V0c2lkZSBpMTI4OjpNSU4uLmkxMjg6Ok1BWCBib3VuZHNDb3VsZG4ndCBkZXNlcmlhbGl6ZSB1MTI4IGZyb20gYSBCaWdJbnQgb3V0c2lkZSB1MTI4OjpNSU4uLnUxMjg6Ok1BWCBib3VuZHN0cmFkZUVuYWJsZVRpbWVzdGFtcGFkYXB0aXZlRmVlQ29uc3RhbnRzYWRhcHRpdmVGZWVWYXJpYWJsZXNmaWx0ZXJQZXJpb2RkZWNheVBlcmlvZHJlZHVjdGlvbkZhY3RvcmFkYXB0aXZlRmVlQ29udHJvbEZhY3Rvcm1heFZvbGF0aWxpdHlBY2N1bXVsYXRvcnRpY2tHcm91cFNpemVtYWpvclN3YXBUaHJlc2hvbGRUaWNrc2xhc3RSZWZlcmVuY2VVcGRhdGVUaW1lc3RhbXBsYXN0TWFqb3JTd2FwVGltZXN0YW1wdm9sYXRpbGl0eVJlZmVyZW5jZXRpY2tHcm91cEluZGV4UmVmZXJlbmNldm9sYXRpbGl0eUFjY3VtdWxhdG9yZmVlVGllckluZGV4U2VlZHRpY2tTcGFjaW5nZmVlUmF0ZXByb3RvY29sRmVlUmF0ZWxpcXVpZGl0eXNxcnRQcmljZXRpY2tDdXJyZW50SW5kZXhmZWVHcm93dGhHbG9iYWxBZmVlR3Jvd3RoR2xvYmFsQnJld2FyZExhc3RVcGRhdGVkVGltZXN0YW1wcmV3YXJkSW5mb3NlbWlzc2lvbnNQZXJTZWNvbmRYNjRncm93dGhHbG9iYWxYNjR0aWNrTG93ZXJJbmRleHRpY2tVcHBlckluZGV4ZmVlR3Jvd3RoQ2hlY2twb2ludEFmZWVPd2VkQWZlZUdyb3d0aENoZWNrcG9pbnRCZmVlT3dlZEJncm93dGhJbnNpZGVDaGVja3BvaW50YW1vdW50T3dlZGluaXRpYWxpemVkbGlxdWlkaXR5TmV0bGlxdWlkaXR5R3Jvc3NmZWVHcm93dGhPdXRzaWRlQWZlZUdyb3d0aE91dHNpZGVCcmV3YXJkR3Jvd3Roc091dHNpZGVzdGFydFRpY2tJbmRleHRpY2tzZmVlQnBzbWF4RmVlYW4gYXJyYXkgb2YgbGVuZ3RoIDJhbiBhcnJheSBvZiBsZW5ndGggM2ludmFsaWQgdmFsdWU6ICwgZXhwZWN0ZWQgAAAA1zQQAA8AAADmNBAACwAAAG1pc3NpbmcgZmllbGQgYGAENRAADwAAABM1EAABAAAAaW52YWxpZCBsZW5ndGggACQ1EAAPAAAA5jQQAAsAAABkdXBsaWNhdGUgZmllbGQgYAAAAEQ1EAARAAAAEzUQAAEAAABfAAAADAAAAAQAAABgAAAAYQAAAEMAQYjrwAAL7gYBAAAAYgAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAMc1EABLAAAA3woAAA4AAAAvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zbGljZS5ycwAAJDYQAEoAAACiAAAAGQAAAEVycm9yAAAAxzUQAEsAAACOBQAAGwAAAMc1EABLAAAAjQUAABsAAADHNRAASwAAAGcEAAASAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcF90aHJvdygpYCBvbiBhbiBgRXJyYCB2YWx1ZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL2FkYXB0aXZlX2ZlZS5ycwDpNhAATgAAANIAAAAZAAAA6TYQAE4AAADHAAAAGQAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGXpNhAATgAAALkAAAARAAAARGl2aXNvciBtdXN0IGJlIHBvc2l0aXZlLgAAAJA3EAAZAAAA6TYQAE4AAADnAQAABQAAAEFyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93VGlja1JhbmdldGlja0xvd2VySW5kZXh0aWNrVXBwZXJJbmRleFRpY2tGYWNhZGVpbml0aWFsaXplZGxpcXVpZGl0eU5ldGxpcXVpZGl0eUdyb3NzZmVlR3Jvd3RoT3V0c2lkZUFmZWVHcm93dGhPdXRzaWRlQnJld2FyZEdyb3d0aHNPdXRzaWRlABA4EAALAAAAGzgQAAwAAAAnOBAADgAAADU4EAARAAAARjgQABEAAABXOBAAFAAAAHN0cnVjdCBUaWNrRmFjYWRlVGlja0FycmF5RmFjYWRlc3RhcnRUaWNrSW5kZXh0aWNrcwC8OBAADgAAAMo4EAAFAAAAc3RydWN0IFRpY2tBcnJheUZhY2FkZQBBgPLAAAvAAgEAAABjAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQAAAAAABAAAAAQAAABkAAAAVHJ5RnJvbUludEVycm9yL2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL21hdGgvYWRhcHRpdmVfZmVlLnJzSW52YWxpZCB0aW1lc3RhbXAAAFM5EABOAAAA4AEAAA4AAAAvaG9tZS9ydW5uZXIvd29yay93aGlybHBvb2xzL3doaXJscG9vbHMvcnVzdC1zZGsvY29yZS9zcmMvbWF0aC9idW5kbGUucnPEORAASAAAAD0AAAAUAAAAAAAAAP//////////////////////////////////////////AEHg9MAAC9EMT3JhY2xlRmFjYWRldHJhZGVFbmFibGVUaW1lc3RhbXBhZGFwdGl2ZUZlZUNvbnN0YW50c2FkYXB0aXZlRmVlVmFyaWFibGVzbDoQABQAAACAOhAAFAAAAJQ6EAAUAAAAc3RydWN0IE9yYWNsZUZhY2FkZWZpbHRlclBlcmlvZGRlY2F5UGVyaW9kcmVkdWN0aW9uRmFjdG9yYWRhcHRpdmVGZWVDb250cm9sRmFjdG9ybWF4Vm9sYXRpbGl0eUFjY3VtdWxhdG9ydGlja0dyb3VwU2l6ZW1ham9yU3dhcFRocmVzaG9sZFRpY2tzAAAA0zoQAAwAAADfOhAACwAAAOo6EAAPAAAA+ToQABgAAAAROxAAGAAAACk7EAANAAAANjsQABcAAABzdHJ1Y3QgQWRhcHRpdmVGZWVDb25zdGFudHNGYWNhZGVsYXN0UmVmZXJlbmNlVXBkYXRlVGltZXN0YW1wbGFzdE1ham9yU3dhcFRpbWVzdGFtcHZvbGF0aWxpdHlSZWZlcmVuY2V0aWNrR3JvdXBJbmRleFJlZmVyZW5jZXZvbGF0aWxpdHlBY2N1bXVsYXRvcgAAqTsQABwAAADFOxAAFgAAANs7EAATAAAA7jsQABcAAAAFPBAAFQAAAHN0cnVjdCBBZGFwdGl2ZUZlZVZhcmlhYmxlc0ZhY2FkZVdoaXJscG9vbEZhY2FkZWZlZVRpZXJJbmRleFNlZWR0aWNrU3BhY2luZ2ZlZVJhdGVwcm90b2NvbEZlZVJhdGVsaXF1aWRpdHlzcXJ0UHJpY2V0aWNrQ3VycmVudEluZGV4ZmVlR3Jvd3RoR2xvYmFsQWZlZUdyb3d0aEdsb2JhbEJyZXdhcmRMYXN0VXBkYXRlZFRpbWVzdGFtcHJld2FyZEluZm9zdDwQABAAAACEPBAACwAAAI88EAAHAAAAljwQAA8AAAClPBAACQAAAK48EAAJAAAAtzwQABAAAADHPBAAEAAAANc8EAAQAAAA5zwQABoAAAABPRAACwAAAHN0cnVjdCBXaGlybHBvb2xGYWNhZGVXaGlybHBvb2xSZXdhcmRJbmZvRmFjYWRlZW1pc3Npb25zUGVyU2Vjb25kWDY0Z3Jvd3RoR2xvYmFsWDY0AJM9EAAVAAAAqD0QAA8AAABzdHJ1Y3QgV2hpcmxwb29sUmV3YXJkSW5mb0ZhY2FkZSgpY2FsbGVkIGBPcHRpb246OnVud3JhcF90aHJvdygpYCBvbiBhIGBOb25lYCB2YWx1ZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL3RpY2tfYXJyYXkucnNUaWNrIGFycmF5IG5vdCBldmVubHkgc3BhY2VkVGljayBzZXF1ZW5jZSBlbXB0eQAAGz4QAEwAAABFAAAADAAAABs+EABMAAAATAAAADgAAAAbPhAATAAAAE8AAAANAAAASW52YWxpZCB0aWNrIGluZGV4VGljayBpbmRleCBvdXQgb2YgYm91bmRzSW52YWxpZCB0aWNrIGFycmF5IHNlcXVlbmNlL2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL3R5cGVzL3RpY2tfYXJyYXkucnMAAA0/EABNAAAAQgAAABEAAABBcml0aG1ldGljIG92ZXItIG9yIHVuZGVyZmxvd0Ftb3VudCBleGNlZWRzIG1heCB1NjRTcXJ0IHByaWNlIG91dCBvZiBib3VuZHNTcXJ0IHByaWNlIGxpbWl0IG91dCBvZiBib3VuZHNJbnZhbGlkIHNxcnQgcHJpY2UgbGltaXQgZGlyZWN0aW9uWmVybyB0cmFkYWJsZSBhbW91bnRJbnZhbGlkIHRpbWVzdGFtcEludmFsaWQgdHJhbnNmZXIgZmVlSW52YWxpZCBzbGlwcGFnZSB0b2xlcmFuY2VUaWNrIGluZGV4IG5vdCBpbiBhcnJheUludmFsaWQgYWRhcHRpdmUgZmVlIGluZm9Db2xsZWN0RmVlc1F1b3RlZmVlT3dlZEFmZWVPd2VkQgAAZQAAAAwAAAAEAAAAZgAAAGcAAABDAEG8gcEAC4kDAQAAAGgAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAAD7QBAASwAAAN8KAAAOAAAARXJyb3IAAAD7QBAASwAAAI4FAAAbAAAA+0AQAEsAAACNBQAAGwAAAPtAEABLAAAAZwQAABIAAABTcXJ0IHByaWNlIGxpbWl0IG91dCBvZiBib3VuZHNaZXJvIHRyYWRhYmxlIGFtb3VudEFyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93SW52YWxpZCBhZGFwdGl2ZSBmZWUgaW5mb0ludmFsaWQgc3FydCBwcmljZSBsaW1pdCBkaXJlY3Rpb25BbW91bnQgZXhjZWVkcyBtYXggdTY0aQAAAAwAAAAEAAAAagAAAGsAAABDAEHQhMEAC98DAQAAAGwAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAACPQhAASwAAAN8KAAAOAAAARXJyb3IAAACPQhAASwAAAI4FAAAbAAAAj0IQAEsAAACNBQAAGwAAAI9CEABLAAAAZwQAABIAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9ldGhudW0tMS41LjAvc3JjL3VpbnQvb3BzLnJzAAAkQxAAXgAAABEAAAABAAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAJRDEAAZAAAAYXR0ZW1wdCB0byBjYWxjdWxhdGUgdGhlIHJlbWFpbmRlciB3aXRoIGEgZGl2aXNvciBvZiB6ZXJvAAAAuEMQADkAAABBcml0aG1ldGljIG92ZXItIG9yIHVuZGVyZmxvd0Ftb3VudCBleGNlZWRzIG1heCB1NjQAQciIwQALASMASAlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQIGd2FscnVzBjAuMjMuMwx3YXNtLWJpbmRnZW4TMC4yLjEwMCAoMjQwNWVjMmI0KQ==", wt = async (A = {}, I) => {
  let g;
  if (I.startsWith("data:")) {
    const C = I.replace(/^data:.*?base64,/, "");
    let B;
    if (typeof Buffer == "function" && typeof Buffer.from == "function")
      B = Buffer.from(C, "base64");
    else if (typeof atob == "function") {
      const Q = atob(C);
      B = new Uint8Array(Q.length);
      for (let E = 0; E < Q.length; E++)
        B[E] = Q.charCodeAt(E);
    } else
      throw new Error("Cannot decode base64-encoded data URL");
    g = await WebAssembly.instantiate(B, A);
  } else {
    const C = await fetch(I), B = C.headers.get("Content-Type") || "";
    if ("instantiateStreaming" in WebAssembly && B.startsWith("application/wasm"))
      g = await WebAssembly.instantiateStreaming(C, A);
    else {
      const Q = await C.arrayBuffer();
      g = await WebAssembly.instantiate(Q, A);
    }
  }
  return g.instance.exports;
};
let k;
function lt(A) {
  k = A;
}
const MA = new Array(128).fill(void 0);
MA.push(void 0, null, !0, !1);
function R(A) {
  return MA[A];
}
let NI = 0, JI = null;
function mI() {
  return (JI === null || JI.byteLength === 0) && (JI = new Uint8Array(k.memory.buffer)), JI;
}
const dt = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let pI = new dt("utf-8");
const ut = typeof pI.encodeInto == "function" ? function(A, I) {
  return pI.encodeInto(A, I);
} : function(A, I) {
  const g = pI.encode(A);
  return I.set(g), {
    read: A.length,
    written: g.length
  };
};
function Hg(A, I, g) {
  if (g === void 0) {
    const i = pI.encode(A), e = I(i.length, 1) >>> 0;
    return mI().subarray(e, e + i.length).set(i), NI = i.length, e;
  }
  let C = A.length, B = I(C, 1) >>> 0;
  const Q = mI();
  let E = 0;
  for (; E < C; E++) {
    const i = A.charCodeAt(E);
    if (i > 127) break;
    Q[B + E] = i;
  }
  if (E !== C) {
    E !== 0 && (A = A.slice(E)), B = g(B, C, C = E + A.length * 3, 1) >>> 0;
    const i = mI().subarray(B + E, B + C), e = ut(A, i);
    E += e.written, B = g(B, C, E, 1) >>> 0;
  }
  return NI = E, B;
}
let AI = null;
function Y() {
  return (AI === null || AI.buffer.detached === !0 || AI.buffer.detached === void 0 && AI.buffer !== k.memory.buffer) && (AI = new DataView(k.memory.buffer)), AI;
}
let lI = MA.length;
function N(A) {
  lI === MA.length && MA.push(MA.length + 1);
  const I = lI;
  return lI = MA[I], MA[I] = A, I;
}
function Tg(A, I) {
  try {
    return A.apply(this, I);
  } catch (g) {
    k.__wbindgen_export_2(N(g));
  }
}
function ht(A) {
  A < 132 || (MA[A] = lI, lI = A);
}
function P(A) {
  const I = R(A);
  return ht(A), I;
}
function z(A) {
  return A == null;
}
function Rg(A) {
  const I = typeof A;
  if (I == "number" || I == "boolean" || A == null)
    return `${A}`;
  if (I == "string")
    return `"${A}"`;
  if (I == "symbol") {
    const B = A.description;
    return B == null ? "Symbol" : `Symbol(${B})`;
  }
  if (I == "function") {
    const B = A.name;
    return typeof B == "string" && B.length > 0 ? `Function(${B})` : "Function";
  }
  if (Array.isArray(A)) {
    const B = A.length;
    let Q = "[";
    B > 0 && (Q += Rg(A[0]));
    for (let E = 1; E < B; E++)
      Q += ", " + Rg(A[E]);
    return Q += "]", Q;
  }
  const g = /\[object ([^\]]+)\]/.exec(toString.call(A));
  let C;
  if (g && g.length > 1)
    C = g[1];
  else
    return toString.call(A);
  if (C == "Object")
    try {
      return "Object(" + JSON.stringify(A) + ")";
    } catch {
      return "Object";
    }
  return A instanceof Error ? `${A.name}: ${A.message}
${A.stack}` : C;
}
const Nt = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let qC = new Nt("utf-8", { ignoreBOM: !0, fatal: !0 });
qC.decode();
function qg(A, I) {
  return A = A >>> 0, qC.decode(mI().subarray(A, A + I));
}
function SB(A, I, g) {
  return k.priceToTickIndex(A, I, g);
}
function Rt(A, I) {
  const g = k.getSqrtPriceSlippageBounds(N(A), I);
  return P(g);
}
function yt() {
  return k._POSITION_BUNDLE_SIZE() >>> 0;
}
function CI(A, I) {
  return k.getTickArrayStartTickIndex(A, I);
}
function GB(A, I, g) {
  return k.getInitializableTickIndex(A, I, z(g) ? 16777215 : g ? 1 : 0);
}
function kt(A, I) {
  const g = k.orderTickIndexes(A, I);
  return P(g);
}
function qI(A, I, g) {
  try {
    const E = k.__wbindgen_add_to_stack_pointer(-16);
    k.getTickIndexInArray(E, A, I, g);
    var C = Y().getInt32(E + 4 * 0, !0), B = Y().getInt32(E + 4 * 1, !0), Q = Y().getInt32(E + 4 * 2, !0);
    if (Q)
      throw P(B);
    return C >>> 0;
  } finally {
    k.__wbindgen_add_to_stack_pointer(16);
  }
}
function OC(A, I, g, C, B, Q) {
  try {
    const o = k.__wbindgen_add_to_stack_pointer(-16);
    k.collectFeesQuote(o, N(A), N(I), N(g), N(C), z(B) ? 0 : N(B), z(Q) ? 0 : N(Q));
    var E = Y().getInt32(o + 4 * 0, !0), i = Y().getInt32(o + 4 * 1, !0), e = Y().getInt32(o + 4 * 2, !0);
    if (e)
      throw P(i);
    return P(E);
  } finally {
    k.__wbindgen_add_to_stack_pointer(16);
  }
}
function xC(A, I, g, C, B, Q, E, i) {
  try {
    const r = k.__wbindgen_add_to_stack_pointer(-16);
    k.collectRewardsQuote(r, N(A), N(I), N(g), N(C), B, z(Q) ? 0 : N(Q), z(E) ? 0 : N(E), z(i) ? 0 : N(i));
    var e = Y().getInt32(r + 4 * 0, !0), o = Y().getInt32(r + 4 * 1, !0), t = Y().getInt32(r + 4 * 2, !0);
    if (t)
      throw P(o);
    return P(e);
  } finally {
    k.__wbindgen_add_to_stack_pointer(16);
  }
}
function Mt(A, I, g, C, B, Q, E) {
  try {
    const t = k.__wbindgen_add_to_stack_pointer(-16);
    k.decreaseLiquidityQuote(t, N(A), I, N(g), C, B, z(Q) ? 0 : N(Q), z(E) ? 0 : N(E));
    var i = Y().getInt32(t + 4 * 0, !0), e = Y().getInt32(t + 4 * 1, !0), o = Y().getInt32(t + 4 * 2, !0);
    if (o)
      throw P(e);
    return P(i);
  } finally {
    k.__wbindgen_add_to_stack_pointer(16);
  }
}
function St(A, I, g, C, B, Q, E) {
  try {
    const t = k.__wbindgen_add_to_stack_pointer(-16);
    k.decreaseLiquidityQuoteA(t, A, I, N(g), C, B, z(Q) ? 0 : N(Q), z(E) ? 0 : N(E));
    var i = Y().getInt32(t + 4 * 0, !0), e = Y().getInt32(t + 4 * 1, !0), o = Y().getInt32(t + 4 * 2, !0);
    if (o)
      throw P(e);
    return P(i);
  } finally {
    k.__wbindgen_add_to_stack_pointer(16);
  }
}
function Gt(A, I, g, C, B, Q, E) {
  try {
    const t = k.__wbindgen_add_to_stack_pointer(-16);
    k.decreaseLiquidityQuoteB(t, A, I, N(g), C, B, z(Q) ? 0 : N(Q), z(E) ? 0 : N(E));
    var i = Y().getInt32(t + 4 * 0, !0), e = Y().getInt32(t + 4 * 1, !0), o = Y().getInt32(t + 4 * 2, !0);
    if (o)
      throw P(e);
    return P(i);
  } finally {
    k.__wbindgen_add_to_stack_pointer(16);
  }
}
function Ft(A, I) {
  const g = String(R(I)), C = Hg(g, k.__wbindgen_export_0, k.__wbindgen_export_1), B = NI;
  Y().setInt32(A + 4 * 1, B, !0), Y().setInt32(A + 4 * 0, C, !0);
}
function ft(A) {
  const I = R(A).buffer;
  return N(I);
}
function Ut() {
  return Tg(function(A, I) {
    const g = R(A).call(R(I));
    return N(g);
  }, arguments);
}
function Jt(A) {
  return R(A).done;
}
function Yt() {
  return Tg(function(A, I) {
    const g = Reflect.get(R(A), R(I));
    return N(g);
  }, arguments);
}
function Lt(A, I) {
  const g = R(A)[I >>> 0];
  return N(g);
}
function mt(A, I) {
  const g = R(A)[R(I)];
  return N(g);
}
function pt(A, I) {
  const g = R(A)[R(I)];
  return N(g);
}
function Kt(A) {
  let I;
  try {
    I = R(A) instanceof ArrayBuffer;
  } catch {
    I = !1;
  }
  return I;
}
function bt(A) {
  let I;
  try {
    I = R(A) instanceof Uint8Array;
  } catch {
    I = !1;
  }
  return I;
}
function Ht(A) {
  return Array.isArray(R(A));
}
function Tt(A) {
  return Number.isSafeInteger(R(A));
}
function qt() {
  return N(Symbol.iterator);
}
function Ot(A) {
  return R(A).length;
}
function xt(A) {
  return R(A).length;
}
function Vt() {
  const A = new Object();
  return N(A);
}
function _t() {
  const A = new Array();
  return N(A);
}
function Zt(A) {
  const I = new Uint8Array(R(A));
  return N(I);
}
function Wt(A) {
  const I = R(A).next;
  return N(I);
}
function jt() {
  return Tg(function(A) {
    const I = R(A).next();
    return N(I);
  }, arguments);
}
function vt(A, I, g) {
  R(A)[I >>> 0] = P(g);
}
function Xt(A, I, g) {
  R(A)[P(I)] = P(g);
}
function zt(A, I, g) {
  R(A).set(R(I), g >>> 0);
}
function Pt(A) {
  const I = R(A).value;
  return N(I);
}
function $t(A) {
  return +R(A);
}
function An(A) {
  return N(A);
}
function In(A, I) {
  const g = BigInt.asUintN(64, A) << BigInt(64) | BigInt.asUintN(64, I);
  return N(g);
}
function gn(A) {
  const I = BigInt.asUintN(64, A);
  return N(I);
}
function Bn(A, I) {
  const g = R(I), C = typeof g == "bigint" ? g : void 0;
  Y().setBigInt64(A + 8 * 1, z(C) ? BigInt(0) : C, !0), Y().setInt32(A + 4 * 0, !z(C), !0);
}
function Cn(A) {
  const I = R(A);
  return typeof I == "boolean" ? I ? 1 : 0 : 2;
}
function Qn(A, I) {
  const g = Rg(R(I)), C = Hg(g, k.__wbindgen_export_0, k.__wbindgen_export_1), B = NI;
  Y().setInt32(A + 4 * 1, B, !0), Y().setInt32(A + 4 * 0, C, !0);
}
function En(A, I) {
  const g = new Error(qg(A, I));
  return N(g);
}
function en(A, I) {
  return R(A) in R(I);
}
function on(A) {
  return Array.isArray(R(A));
}
function tn(A) {
  return typeof R(A) == "bigint";
}
function nn(A) {
  return typeof R(A) == "function";
}
function rn(A) {
  const I = R(A);
  return typeof I == "object" && I !== null;
}
function an(A) {
  return R(A) === void 0;
}
function sn(A, I) {
  return R(A) === R(I);
}
function cn(A, I) {
  return R(A) == R(I);
}
function Dn() {
  const A = k.memory;
  return N(A);
}
function wn(A, I) {
  const g = R(I), C = typeof g == "number" ? g : void 0;
  Y().setFloat64(A + 8 * 1, z(C) ? 0 : C, !0), Y().setInt32(A + 4 * 0, !z(C), !0);
}
function ln(A) {
  return N(A);
}
function dn(A) {
  const I = R(A);
  return N(I);
}
function un(A) {
  P(A);
}
function hn(A, I) {
  const g = R(A) >> R(I);
  return N(g);
}
function Nn(A, I) {
  const g = R(I), C = typeof g == "string" ? g : void 0;
  var B = z(C) ? 0 : Hg(C, k.__wbindgen_export_0, k.__wbindgen_export_1), Q = NI;
  Y().setInt32(A + 4 * 1, Q, !0), Y().setInt32(A + 4 * 0, B, !0);
}
function Rn(A, I) {
  const g = qg(A, I);
  return N(g);
}
function yn(A, I) {
  throw new Error(qg(A, I));
}
URL = globalThis.URL;
const kn = await wt({ "./orca_whirlpools_core_js_bindings_bg.js": {
  __wbindgen_object_drop_ref: un,
  __wbindgen_string_new: Rn,
  __wbindgen_bigint_get_as_i64: Bn,
  __wbindgen_debug_string: Qn,
  __wbindgen_throw: yn,
  __wbindgen_memory: Dn,
  __wbindgen_string_get: Nn,
  __wbg_get_67b2ba62fc30de12: Yt,
  __wbg_get_b9b93047fe3cf45b: Lt,
  __wbg_length_e2d2a49132c1b256: xt,
  __wbindgen_object_clone_ref: dn,
  __wbindgen_is_function: nn,
  __wbg_new_78feb108b6472713: _t,
  __wbindgen_number_new: ln,
  __wbindgen_is_object: rn,
  __wbg_next_25feadfc0913fea9: Wt,
  __wbg_next_6574e1a8a62d1055: jt,
  __wbg_done_769e5ede4b31c67b: Jt,
  __wbg_value_cd1ffa7b1ab794f1: Pt,
  __wbg_iterator_9a24c88df860dc65: qt,
  __wbg_call_672a4d21634d4a24: Ut,
  __wbg_new_405e22f390576ce2: Vt,
  __wbindgen_number_get: wn,
  __wbindgen_is_undefined: an,
  __wbg_set_37837023f3d740e8: vt,
  __wbg_isArray_a1eab7e0d067391b: Ht,
  __wbg_instanceof_ArrayBuffer_e14585432e3737fc: Kt,
  __wbg_isSafeInteger_343e2beeeece1bb0: Tt,
  __wbg_buffer_609cc3eee51ed158: ft,
  __wbg_new_a12002a7f91c75be: Zt,
  __wbg_set_65595bdd868b3009: zt,
  __wbg_length_a446193dc22c12f8: Ot,
  __wbg_instanceof_Uint8Array_17156bcf118086a9: bt,
  __wbindgen_jsval_loose_eq: cn,
  __wbindgen_boolean_get: Cn,
  __wbindgen_as_number: $t,
  __wbindgen_error_new: En,
  __wbindgen_bigint_from_i64: An,
  __wbindgen_bigint_from_u64: gn,
  __wbindgen_bigint_from_u128: In,
  __wbg_getwithrefkey_1dc361bd10053bfe: mt,
  __wbg_String_eecc4a11987127d6: Ft,
  __wbg_getwithrefkey_6550b2c093d2eb18: pt,
  __wbg_set_3807d5f0bfc24aa7: Xt,
  __wbindgen_shr: hn,
  __wbindgen_jsval_eq: sn,
  __wbindgen_in: en,
  __wbindgen_is_bigint: tn,
  __wbindgen_is_array: on
} }, Dt), {
  memory: Mn,
  getTickArrayStartTickIndex: Sn,
  tickIndexToSqrtPrice: Gn,
  sqrtPriceToTickIndex: Fn,
  getInitializableTickIndex: fn,
  getPrevInitializableTickIndex: Un,
  getNextInitializableTickIndex: Jn,
  isTickIndexInBounds: Yn,
  isTickInitializable: Ln,
  invertTickIndex: mn,
  invertSqrtPrice: pn,
  getFullRangeTickIndexes: Kn,
  orderTickIndexes: bn,
  isFullRangeOnly: Hn,
  getTickIndexInArray: Tn,
  collectFeesQuote: qn,
  _REDUCTION_FACTOR_DENOMINATOR: On,
  _ADAPTIVE_FEE_CONTROL_FACTOR_DENOMINATOR: xn,
  _MAX_REFERENCE_AGE: Vn,
  _TICK_ARRAY_NOT_EVENLY_SPACED: _n,
  _TICK_INDEX_OUT_OF_BOUNDS: Zn,
  _INVALID_TICK_INDEX: Wn,
  _ARITHMETIC_OVERFLOW: jn,
  _AMOUNT_EXCEEDS_MAX_U64: vn,
  _SQRT_PRICE_OUT_OF_BOUNDS: Xn,
  _TICK_SEQUENCE_EMPTY: zn,
  _SQRT_PRICE_LIMIT_OUT_OF_BOUNDS: Pn,
  _INVALID_SQRT_PRICE_LIMIT_DIRECTION: $n,
  _ZERO_TRADABLE_AMOUNT: Ar,
  _INVALID_TIMESTAMP: Ir,
  _INVALID_TRANSFER_FEE: gr,
  _INVALID_SLIPPAGE_TOLERANCE: Br,
  _TICK_INDEX_NOT_IN_ARRAY: Cr,
  _INVALID_TICK_ARRAY_SEQUENCE: Qr,
  _INVALID_ADAPTIVE_FEE_INFO: Er,
  _VOLATILITY_ACCUMULATOR_SCALE_FACTOR: ir,
  _FEE_RATE_HARD_LIMIT: er,
  decreaseLiquidityQuote: or,
  decreaseLiquidityQuoteA: tr,
  decreaseLiquidityQuoteB: nr,
  increaseLiquidityQuote: rr,
  increaseLiquidityQuoteA: ar,
  increaseLiquidityQuoteB: sr,
  _NUM_REWARDS: cr,
  isInitializedWithAdaptiveFee: Dr,
  collectRewardsQuote: wr,
  tryGetAmountDeltaA: lr,
  tryGetAmountDeltaB: dr,
  tryGetNextSqrtPriceFromA: ur,
  tryGetNextSqrtPriceFromB: hr,
  tryApplyTransferFee: Nr,
  tryReverseApplyTransferFee: Rr,
  tryGetMaxAmountWithSlippageTolerance: yr,
  tryGetMinAmountWithSlippageTolerance: kr,
  tryApplySwapFee: Mr,
  tryReverseApplySwapFee: Sr,
  swapQuoteByInputToken: Gr,
  swapQuoteByOutputToken: Fr,
  _TICK_ARRAY_SIZE: fr,
  _FULL_RANGE_ONLY_TICK_SPACING_THRESHOLD: Ur,
  _MIN_TICK_INDEX: Jr,
  _MAX_TICK_INDEX: Yr,
  priceToSqrtPrice: Lr,
  sqrtPriceToPrice: mr,
  invertPrice: pr,
  tickIndexToPrice: Kr,
  priceToTickIndex: br,
  getSqrtPriceSlippageBounds: Hr,
  firstUnoccupiedPositionInBundle: Tr,
  isPositionBundleFull: qr,
  isPositionBundleEmpty: Or,
  _POSITION_BUNDLE_SIZE: xr,
  _FEE_RATE_DENOMINATOR: Vr,
  isPositionInRange: _r,
  positionStatus: Zr,
  positionRatio: Wr,
  __wbindgen_export_0: jr,
  __wbindgen_export_1: vr,
  __wbindgen_export_2: Xr,
  __wbindgen_add_to_stack_pointer: zr
} = kn, Pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _ADAPTIVE_FEE_CONTROL_FACTOR_DENOMINATOR: xn,
  _AMOUNT_EXCEEDS_MAX_U64: vn,
  _ARITHMETIC_OVERFLOW: jn,
  _FEE_RATE_DENOMINATOR: Vr,
  _FEE_RATE_HARD_LIMIT: er,
  _FULL_RANGE_ONLY_TICK_SPACING_THRESHOLD: Ur,
  _INVALID_ADAPTIVE_FEE_INFO: Er,
  _INVALID_SLIPPAGE_TOLERANCE: Br,
  _INVALID_SQRT_PRICE_LIMIT_DIRECTION: $n,
  _INVALID_TICK_ARRAY_SEQUENCE: Qr,
  _INVALID_TICK_INDEX: Wn,
  _INVALID_TIMESTAMP: Ir,
  _INVALID_TRANSFER_FEE: gr,
  _MAX_REFERENCE_AGE: Vn,
  _MAX_TICK_INDEX: Yr,
  _MIN_TICK_INDEX: Jr,
  _NUM_REWARDS: cr,
  _POSITION_BUNDLE_SIZE: xr,
  _REDUCTION_FACTOR_DENOMINATOR: On,
  _SQRT_PRICE_LIMIT_OUT_OF_BOUNDS: Pn,
  _SQRT_PRICE_OUT_OF_BOUNDS: Xn,
  _TICK_ARRAY_NOT_EVENLY_SPACED: _n,
  _TICK_ARRAY_SIZE: fr,
  _TICK_INDEX_NOT_IN_ARRAY: Cr,
  _TICK_INDEX_OUT_OF_BOUNDS: Zn,
  _TICK_SEQUENCE_EMPTY: zn,
  _VOLATILITY_ACCUMULATOR_SCALE_FACTOR: ir,
  _ZERO_TRADABLE_AMOUNT: Ar,
  __wbindgen_add_to_stack_pointer: zr,
  __wbindgen_export_0: jr,
  __wbindgen_export_1: vr,
  __wbindgen_export_2: Xr,
  collectFeesQuote: qn,
  collectRewardsQuote: wr,
  decreaseLiquidityQuote: or,
  decreaseLiquidityQuoteA: tr,
  decreaseLiquidityQuoteB: nr,
  firstUnoccupiedPositionInBundle: Tr,
  getFullRangeTickIndexes: Kn,
  getInitializableTickIndex: fn,
  getNextInitializableTickIndex: Jn,
  getPrevInitializableTickIndex: Un,
  getSqrtPriceSlippageBounds: Hr,
  getTickArrayStartTickIndex: Sn,
  getTickIndexInArray: Tn,
  increaseLiquidityQuote: rr,
  increaseLiquidityQuoteA: ar,
  increaseLiquidityQuoteB: sr,
  invertPrice: pr,
  invertSqrtPrice: pn,
  invertTickIndex: mn,
  isFullRangeOnly: Hn,
  isInitializedWithAdaptiveFee: Dr,
  isPositionBundleEmpty: Or,
  isPositionBundleFull: qr,
  isPositionInRange: _r,
  isTickIndexInBounds: Yn,
  isTickInitializable: Ln,
  memory: Mn,
  orderTickIndexes: bn,
  positionRatio: Wr,
  positionStatus: Zr,
  priceToSqrtPrice: Lr,
  priceToTickIndex: br,
  sqrtPriceToPrice: mr,
  sqrtPriceToTickIndex: Fn,
  swapQuoteByInputToken: Gr,
  swapQuoteByOutputToken: Fr,
  tickIndexToPrice: Kr,
  tickIndexToSqrtPrice: Gn,
  tryApplySwapFee: Mr,
  tryApplyTransferFee: Nr,
  tryGetAmountDeltaA: lr,
  tryGetAmountDeltaB: dr,
  tryGetMaxAmountWithSlippageTolerance: yr,
  tryGetMinAmountWithSlippageTolerance: kr,
  tryGetNextSqrtPriceFromA: ur,
  tryGetNextSqrtPriceFromB: hr,
  tryReverseApplySwapFee: Sr,
  tryReverseApplyTransferFee: Rr
}, Symbol.toStringTag, { value: "Module" }));
lt(Pr);
var VC = /* @__PURE__ */ ((A) => (A[A.Uninitialized = 0] = "Uninitialized", A[A.Initialized = 1] = "Initialized", A[A.Frozen = 2] = "Frozen", A))(VC || {});
function $r() {
  return rC(VC);
}
function Aa() {
  return tA(dA(), 36);
}
function sI() {
  return tA(dA(), 64);
}
function Ia() {
  return eC(
    [
      ["Uninitialized", xA()],
      [
        "TransferFeeConfig",
        f(
          y([
            ["transferFeeConfigAuthority", h()],
            ["withdrawWithheldAuthority", h()],
            ["withheldAmount", J()],
            ["olderTransferFee", FB()],
            ["newerTransferFee", FB()]
          ]),
          U()
        )
      ],
      [
        "TransferFeeAmount",
        f(
          y([["withheldAmount", J()]]),
          U()
        )
      ],
      [
        "MintCloseAuthority",
        f(
          y([["closeAuthority", h()]]),
          U()
        )
      ],
      [
        "ConfidentialTransferMint",
        f(
          y([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["autoApproveNewAccounts", eA()],
            [
              "auditorElgamalPubkey",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ]
          ]),
          U()
        )
      ],
      [
        "ConfidentialTransferAccount",
        f(
          y([
            ["approved", eA()],
            ["elgamalPubkey", h()],
            ["pendingBalanceLow", sI()],
            ["pendingBalanceHigh", sI()],
            ["availableBalance", sI()],
            ["decryptableAvailableBalance", Aa()],
            ["allowConfidentialCredits", eA()],
            ["allowNonConfidentialCredits", eA()],
            ["pendingBalanceCreditCounter", J()],
            ["maximumPendingBalanceCreditCounter", J()],
            ["expectedPendingBalanceCreditCounter", J()],
            ["actualPendingBalanceCreditCounter", J()]
          ]),
          U()
        )
      ],
      [
        "DefaultAccountState",
        f(
          y([["state", $r()]]),
          U()
        )
      ],
      [
        "ImmutableOwner",
        f(y([]), U())
      ],
      [
        "MemoTransfer",
        f(
          y([
            ["requireIncomingTransferMemos", eA()]
          ]),
          U()
        )
      ],
      [
        "NonTransferable",
        f(y([]), U())
      ],
      [
        "InterestBearingConfig",
        f(
          y([
            ["rateAuthority", h()],
            ["initializationTimestamp", J()],
            ["preUpdateAverageRate", eB()],
            ["lastUpdateTimestamp", J()],
            ["currentRate", eB()]
          ]),
          U()
        )
      ],
      [
        "CpiGuard",
        f(
          y([["lockCpi", eA()]]),
          U()
        )
      ],
      [
        "PermanentDelegate",
        f(
          y([["delegate", h()]]),
          U()
        )
      ],
      [
        "NonTransferableAccount",
        f(y([]), U())
      ],
      [
        "TransferHook",
        f(
          y([
            ["authority", h()],
            ["programId", h()]
          ]),
          U()
        )
      ],
      [
        "TransferHookAccount",
        f(
          y([["transferring", eA()]]),
          U()
        )
      ],
      [
        "ConfidentialTransferFee",
        f(
          y([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["elgamalPubkey", h()],
            ["harvestToMintEnabled", eA()],
            ["withheldAmount", sI()]
          ]),
          U()
        )
      ],
      [
        "ConfidentialTransferFeeAmount",
        f(
          y([["withheldAmount", sI()]]),
          U()
        )
      ],
      [
        "MetadataPointer",
        f(
          y([
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
          U()
        )
      ],
      [
        "TokenMetadata",
        f(
          y([
            [
              "updateAuthority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["mint", h()],
            ["name", f(aI(), oA())],
            ["symbol", f(aI(), oA())],
            ["uri", f(aI(), oA())],
            [
              "additionalMetadata",
              ri(
                f(aI(), oA()),
                f(aI(), oA())
              )
            ]
          ]),
          U()
        )
      ],
      [
        "GroupPointer",
        f(
          y([
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
          U()
        )
      ],
      [
        "TokenGroup",
        f(
          y([
            [
              "updateAuthority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["mint", h()],
            ["size", J()],
            ["maxSize", J()]
          ]),
          U()
        )
      ],
      [
        "GroupMemberPointer",
        f(
          y([
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
          U()
        )
      ],
      [
        "TokenGroupMember",
        f(
          y([
            ["mint", h()],
            ["group", h()],
            ["memberNumber", J()]
          ]),
          U()
        )
      ],
      ["ConfidentialMintBurn", xA()],
      [
        "ScaledUiAmountConfig",
        f(
          y([
            ["authority", h()],
            ["multiplier", Dg()],
            ["newMultiplierEffectiveTimestamp", J()],
            ["newMultiplier", Dg()]
          ]),
          U()
        )
      ],
      [
        "PausableConfig",
        f(
          y([
            [
              "authority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["paused", eA()]
          ]),
          U()
        )
      ],
      ["PausableAccount", xA()]
    ],
    { size: U() }
  );
}
function FB() {
  return y([
    ["epoch", J()],
    ["maximumFee", J()],
    ["transferFeeBasisPoints", U()]
  ]);
}
function ga() {
  return y([
    [
      "mintAuthority",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    ["supply", J()],
    ["decimals", WA()],
    ["isInitialized", eA()],
    [
      "freezeAuthority",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    [
      "extensions",
      V(
        ni(
          bA(Ia(), { size: "remainder" }),
          [CC(kE(BA(), 83).encode(1))]
        ),
        { prefix: null }
      )
    ]
  ]);
}
function Ba(A) {
  return FA(
    A,
    ga()
  );
}
async function Ca(A, I, g) {
  const C = await Og(A, I, g);
  return yI(C), C;
}
async function Og(A, I, g) {
  return (await EI(A, I, g)).map((B) => Ba(B));
}
var Qa = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", RI = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
function Ea(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function ia(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const C = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: Ea(g.value),
      role: fB(g.value) ? vI(C) : C,
      ...fB(g.value) ? { signer: g.value } : {}
    });
  };
}
function fB(A) {
  return !!A && typeof A == "object" && "address" in A && eI(A);
}
var ea = 1;
function oa() {
  return m(
    K([["discriminator", BA()]]),
    (A) => ({
      ...A,
      discriminator: ea
    })
  );
}
function ta(A, I) {
  const g = Qa, B = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    ata: { value: A.ata ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 },
    mint: { value: A.mint ?? null, isWritable: !1 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 },
    tokenProgram: { value: A.tokenProgram ?? null, isWritable: !1 }
  };
  B.tokenProgram.value || (B.tokenProgram.value = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"), B.systemProgram.value || (B.systemProgram.value = "11111111111111111111111111111111");
  const Q = ia(g);
  return Object.freeze({
    accounts: [
      Q(B.payer),
      Q(B.ata),
      Q(B.owner),
      Q(B.mint),
      Q(B.systemProgram),
      Q(B.tokenProgram)
    ],
    data: oa().encode({}),
    programAddress: g
  });
}
function EA(A, I) {
  if (!A) throw new Error(I || "Assertion failed");
}
EA.ok = EA;
function na() {
  return y([
    [
      "mintAuthority",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    ["supply", J()],
    ["decimals", WA()],
    ["isInitialized", eA()],
    [
      "freezeAuthority",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function ra(A) {
  return FA(
    A,
    na()
  );
}
async function aa(A, I, g) {
  const C = await sa(A, I, g);
  return yI(C), C;
}
async function sa(A, I, g) {
  return (await EI(A, I, g)).map((B) => ra(B));
}
var _C = /* @__PURE__ */ ((A) => (A[A.Uninitialized = 0] = "Uninitialized", A[A.Initialized = 1] = "Initialized", A[A.Frozen = 2] = "Frozen", A))(_C || {});
function ca() {
  return rC(_C);
}
function ZC() {
  return y([
    ["mint", h()],
    ["owner", h()],
    ["amount", J()],
    [
      "delegate",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    ["state", ca()],
    [
      "isNative",
      V(J(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    ["delegatedAmount", J()],
    [
      "closeAuthority",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function Da(A) {
  return FA(
    A,
    ZC()
  );
}
async function wa(A, I, g) {
  return (await EI(A, I, g)).map((B) => Da(B));
}
function UB() {
  return 165;
}
var WC = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", GA = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
function la(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function $I(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const C = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: la(g.value),
      role: JB(g.value) ? vI(C) : C,
      ...JB(g.value) ? { signer: g.value } : {}
    });
  };
}
function JB(A) {
  return !!A && typeof A == "object" && "address" in A && eI(A);
}
var da = 9;
function ua() {
  return m(
    K([["discriminator", BA()]]),
    (A) => ({ ...A, discriminator: da })
  );
}
function KI(A, I) {
  const g = GA, B = {
    account: { value: A.account ?? null, isWritable: !0 },
    destination: { value: A.destination ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 }
  }, E = ({ ...A }.multiSigners ?? []).map(
    (e) => ({
      address: e.address,
      role: W.READONLY_SIGNER,
      signer: e
    })
  ), i = $I(g);
  return Object.freeze({
    accounts: [
      i(B.account),
      i(B.destination),
      i(B.owner),
      ...E
    ],
    data: ua().encode({}),
    programAddress: g
  });
}
async function GI(A, I = {}) {
  const {
    programAddress: g = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
  } = I;
  return await kI({
    programAddress: g,
    seeds: [
      IA().encode(A.owner),
      IA().encode(A.tokenProgram),
      IA().encode(A.mint)
    ]
  });
}
var ha = 1;
function Na() {
  return m(
    K([["discriminator", BA()]]),
    (A) => ({
      ...A,
      discriminator: ha
    })
  );
}
function Ra(A, I) {
  const g = WC, B = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    ata: { value: A.ata ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 },
    mint: { value: A.mint ?? null, isWritable: !1 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 },
    tokenProgram: { value: A.tokenProgram ?? null, isWritable: !1 }
  };
  B.tokenProgram.value || (B.tokenProgram.value = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), B.systemProgram.value || (B.systemProgram.value = "11111111111111111111111111111111");
  const Q = $I(g);
  return Object.freeze({
    accounts: [
      Q(B.payer),
      Q(B.ata),
      Q(B.owner),
      Q(B.mint),
      Q(B.systemProgram),
      Q(B.tokenProgram)
    ],
    data: Na().encode({}),
    programAddress: g
  });
}
var ya = 18;
function ka() {
  return m(
    K([
      ["discriminator", BA()],
      ["owner", IA()]
    ]),
    (A) => ({ ...A, discriminator: ya })
  );
}
function YB(A, I) {
  const g = GA, B = {
    account: { value: A.account ?? null, isWritable: !0 },
    mint: { value: A.mint ?? null, isWritable: !1 }
  }, Q = { ...A }, E = $I(g);
  return Object.freeze({
    accounts: [E(B.account), E(B.mint)],
    data: ka().encode(
      Q
    ),
    programAddress: g
  });
}
var Ma = 17;
function Sa() {
  return m(
    K([["discriminator", BA()]]),
    (A) => ({ ...A, discriminator: Ma })
  );
}
function jC(A, I) {
  const g = GA, B = {
    account: { value: A.account ?? null, isWritable: !0 }
  }, Q = $I(g);
  return Object.freeze({
    accounts: [Q(B.account)],
    data: Sa().encode({}),
    programAddress: g
  });
}
var II = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr", QI = F(
  "11111111111111111111111111111111"
), Ga = 32896, Fa = vA(QI), xg = Fa, fa = 100, vC = fa, Ua = "keypair", OA = Ua;
function LB(A) {
  OA = A;
}
var AA = F(
  "So11111111111111111111111111111111111111112"
);
function Ja(A) {
  return OA === "none" || OA === "ata" ? !0 : A != AA;
}
async function Vg(A, I, g) {
  const C = Array.isArray(g) ? g : Object.keys(g), B = C.indexOf(AA), Q = B !== -1, E = await aa(A, C.filter(Ja)), i = await Promise.all(
    E.map(
      (n) => GI({
        owner: I.address,
        mint: n.address,
        tokenProgram: n.programAddress
      }).then((D) => D[0])
    )
  ), e = await wa(A, i), o = {}, t = [], r = [];
  for (let n = 0; n < E.length; n++) {
    const D = E[n], c = e[n];
    o[D.address] = c.address, !c.exists && t.push(
      ta({
        payer: I,
        owner: I.address,
        ata: c.address,
        mint: D.address,
        tokenProgram: D.programAddress
      })
    );
  }
  if (!Array.isArray(g))
    for (let n = 0; n < E.length; n++) {
      if (E[n].address === AA && OA !== "none")
        continue;
      const c = e[n];
      c.exists && c.data.amount;
    }
  if (Q && OA === "keypair") {
    const n = await fC(), D = UB();
    let c = await A.getMinimumBalanceForRentExemption(BigInt(D)).send();
    Array.isArray(g) || (c = TI(c + BigInt(g[AA]))), t.push(
      Co({
        payer: I,
        newAccount: n,
        lamports: c,
        space: D,
        programAddress: GA
      }),
      YB({
        account: n.address,
        mint: AA,
        owner: I.address
      })
    ), r.push(
      KI({
        account: n.address,
        owner: I,
        destination: I.address
      })
    ), o[AA] = n.address;
  }
  if (Q && OA === "seed") {
    const n = UB();
    let D = await A.getMinimumBalanceForRentExemption(BigInt(n)).send();
    Array.isArray(g) || (D = TI(D + BigInt(g[AA])));
    const c = Date.now().toString(), u = await crypto.subtle.digest(
      "SHA-256",
      Buffer.concat([
        Buffer.from(IA().encode(I.address)),
        Buffer.from(c),
        Buffer.from(IA().encode(GA))
      ])
    );
    o[AA] = h().decode(
      new Uint8Array(u)
    ), t.push(
      io({
        payer: I,
        newAccount: o[AA],
        base: I.address,
        baseAccount: I,
        seed: c,
        space: n,
        amount: D,
        programAddress: GA
      }),
      YB({
        account: o[AA],
        mint: AA,
        owner: I.address
      })
    ), r.push(
      KI({
        account: o[AA],
        owner: I,
        destination: I.address
      })
    );
  }
  if (Q && OA === "ata") {
    const n = e[B], D = n.exists ? n.data.amount : 0n;
    !Array.isArray(g) && D < BigInt(g[AA]) && t.push(
      JC({
        source: I,
        destination: o[AA],
        amount: BigInt(g[AA]) - D
      }),
      jC({
        account: o[AA]
      })
    ), n.exists || r.push(
      KI({
        account: n.address,
        owner: I,
        destination: I.address
      })
    );
  }
  return {
    createInstructions: t,
    cleanupInstructions: r,
    tokenAccountAddresses: o
  };
}
function RA(A, I) {
  if (A == null || "exists" in A && !A.exists || A.data.extensions.__option === "None")
    return;
  const g = A.data.extensions.value.find(
    (B) => B.__kind === "TransferFeeConfig"
  );
  if (g == null)
    return;
  const C = I >= g.newerTransferFee.epoch ? g.newerTransferFee : g.olderTransferFee;
  return {
    feeBps: C.transferFeeBasisPoints,
    maxFee: C.maximumFee
  };
}
var Ya = 128;
function mB(A, I) {
  const g = BigInt(I + Ya);
  return A.lamportsPerByteYear * g * BigInt(A.exemptionThreshold);
}
function La(A, I, g, C, B, Q) {
  return "liquidity" in A ? Mt(
    A.liquidity,
    C,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    B,
    Q
  ) : "tokenA" in A ? St(
    A.tokenA,
    C,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    B,
    Q
  ) : Gt(
    A.tokenB,
    C,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    B,
    Q
  );
}
async function ma(A, I, g = {}) {
  const C = g.slippageToleranceBps ?? vC, B = g.authority ?? xg, Q = g.whirlpoolDeployment ?? HA;
  EA(
    B.address !== QI,
    "Either supply an authority or set the default funder"
  );
  const E = await PI(
    I,
    Q.programId
  ), i = await LC(A, E[0]), e = await Kg(A, i.data.whirlpool), o = await A.getEpochInfo().send(), [t, r, n, ...D] = await Og(
    A,
    [
      e.data.tokenMintA,
      e.data.tokenMintB,
      I,
      ...e.data.rewardInfos.map((L) => L.mint).filter((L) => L !== QI)
    ]
  );
  EA(t.exists, "Token A not found"), EA(r.exists, "Token B not found"), EA(n.exists, "Position mint not found");
  const c = RA(t, o.epoch), u = RA(r, o.epoch), s = La(
    { liquidity: i.data.liquidity },
    e.data,
    i.data,
    C,
    c,
    u
  ), a = CI(
    i.data.tickLowerIndex,
    e.data.tickSpacing
  ), d = CI(
    i.data.tickUpperIndex,
    e.data.tickSpacing
  ), [G, M, b] = await Promise.all([
    GI({
      owner: B.address,
      mint: I,
      tokenProgram: n.programAddress
    }).then((L) => L[0]),
    BI(
      e.address,
      a,
      Q.programId
    ).then((L) => L[0]),
    BI(
      e.address,
      d,
      Q.programId
    ).then((L) => L[0])
  ]), [q, O] = await HC(A, [
    M,
    b
  ]), j = q.data.ticks[qI(
    i.data.tickLowerIndex,
    a,
    e.data.tickSpacing
  )], v = O.data.ticks[qI(
    i.data.tickUpperIndex,
    d,
    e.data.tickSpacing
  )], rA = OC(
    e.data,
    i.data,
    j,
    v,
    c,
    u
  ), YA = BigInt(Math.floor(Date.now() / 1e3)), X = xC(
    e.data,
    i.data,
    j,
    v,
    YA,
    RA(D[0], o.epoch),
    RA(D[1], o.epoch),
    RA(D[2], o.epoch)
  ), p = /* @__PURE__ */ new Set();
  (s.liquidityDelta > 0n || rA.feeOwedA > 0n || rA.feeOwedB > 0n) && (p.add(e.data.tokenMintA), p.add(e.data.tokenMintB));
  for (let L = 0; L < X.rewards.length; L++)
    X.rewards[L].rewardsOwed > 0n && p.add(e.data.rewardInfos[L].mint);
  const { createInstructions: S, cleanupInstructions: CA, tokenAccountAddresses: wA } = await Vg(
    A,
    B,
    Array.from(p)
  ), iA = [];
  iA.push(...S), s.liquidityDelta > 0n && iA.push(
    vo(
      {
        whirlpool: e.address,
        positionAuthority: B,
        position: E[0],
        positionTokenAccount: G,
        tokenOwnerAccountA: wA[e.data.tokenMintA],
        tokenOwnerAccountB: wA[e.data.tokenMintB],
        tokenVaultA: e.data.tokenVaultA,
        tokenVaultB: e.data.tokenVaultB,
        tickArrayLower: M,
        tickArrayUpper: b,
        liquidityAmount: s.liquidityDelta,
        tokenMinA: s.tokenMinA,
        tokenMinB: s.tokenMinB,
        tokenMintA: e.data.tokenMintA,
        tokenMintB: e.data.tokenMintB,
        tokenProgramA: t.programAddress,
        tokenProgramB: r.programAddress,
        memoProgram: II,
        remainingAccountsInfo: null
      },
      { programAddress: Q.programId }
    )
  ), (rA.feeOwedA > 0n || rA.feeOwedB > 0n) && iA.push(
    pC(
      {
        whirlpool: e.address,
        positionAuthority: B,
        position: E[0],
        positionTokenAccount: G,
        tokenOwnerAccountA: wA[e.data.tokenMintA],
        tokenOwnerAccountB: wA[e.data.tokenMintB],
        tokenVaultA: e.data.tokenVaultA,
        tokenVaultB: e.data.tokenVaultB,
        tokenMintA: e.data.tokenMintA,
        tokenMintB: e.data.tokenMintB,
        tokenProgramA: t.programAddress,
        tokenProgramB: r.programAddress,
        memoProgram: II,
        remainingAccountsInfo: null
      },
      { programAddress: Q.programId }
    )
  );
  for (let L = 0; L < X.rewards.length; L++) {
    if (X.rewards[L].rewardsOwed === 0n)
      continue;
    const zA = D[L];
    EA(zA.exists, `Reward mint ${L} not found`), iA.push(
      KC(
        {
          whirlpool: e.address,
          positionAuthority: B,
          position: E[0],
          positionTokenAccount: G,
          rewardOwnerAccount: wA[zA.address],
          rewardVault: e.data.rewardInfos[L].vault,
          rewardIndex: L,
          rewardMint: zA.address,
          rewardTokenProgram: zA.programAddress,
          memoProgram: II,
          remainingAccountsInfo: null
        },
        { programAddress: Q.programId }
      )
    );
  }
  switch (n.programAddress) {
    case GA:
      iA.push(
        Ho(
          {
            positionAuthority: B,
            position: E[0],
            positionTokenAccount: G,
            positionMint: I,
            receiver: B.address
          },
          { programAddress: Q.programId }
        )
      );
      break;
    case RI:
      iA.push(
        Oo(
          {
            positionAuthority: B,
            position: E[0],
            positionTokenAccount: G,
            positionMint: I,
            receiver: B.address,
            token2022Program: RI
          },
          { programAddress: Q.programId }
        )
      );
      break;
    default:
      throw new Error("Invalid token program");
  }
  return iA.push(...CA), {
    instructions: iA,
    quote: s,
    feesQuote: rA,
    rewardsQuote: X
  };
}
var ag = 100;
async function sg(A, I, g) {
  const C = Math.ceil(I.length / ag), B = [...Array(C).keys()].map(
    (E) => I.slice(E * ag, (E + 1) * ag)
  ), Q = [];
  for (const E of B)
    (await EI(A, E)).forEach((e, o) => {
      const t = g(e);
      Q.push(t);
    });
  return Q;
}
function pa(A, I) {
  const g = Buffer.from(A.positionBitmap), C = [];
  for (let B = 0; B < yt(); B++) {
    const Q = Math.floor(B / 8), E = B % 8;
    g[Q] & 1 << E && C.push(
      nt(
        A.positionBundleMint,
        B,
        I
      ).then((i) => i[0])
    );
  }
  return C;
}
async function Ka(A, I, g = HA) {
  const C = g.programId, [B, Q] = await Promise.all([
    A.getTokenAccountsByOwner(
      I,
      { programId: GA },
      { encoding: "base64" }
    ).send(),
    A.getTokenAccountsByOwner(
      I,
      { programId: RI },
      { encoding: "base64" }
    ).send()
  ]), E = XB(), i = ZC(), e = [...B.value, ...Q.value].map((a) => ({
    ...i.decode(E.encode(a.account.data[0])),
    tokenProgram: a.account.owner
  })).filter((a) => a.amount === 1n), o = await Promise.all(
    e.map(
      (a) => PI(a.mint, C).then((d) => d[0])
    )
  ), t = await Promise.all(
    e.map(
      (a) => tt(a.mint, C).then((d) => d[0])
    )
  ), r = await sg(
    A,
    o,
    Ng
  ), n = await sg(
    A,
    t,
    Jo
  ), D = await Promise.all(
    n.filter((a) => a.exists).flatMap((a) => pa(a.data, C))
  ), u = (await sg(
    A,
    D,
    Ng
  )).filter((a) => a.exists).map((a) => (_I(a), a)).reduce((a, d) => {
    const G = a.get(d.data.positionMint) ?? [];
    return a.set(d.data.positionMint, [...G, d]);
  }, /* @__PURE__ */ new Map()), s = [];
  for (let a = 0; a < e.length; a++) {
    const d = r[a], G = n[a], M = e[a];
    if (d.exists && s.push({
      ...d,
      tokenProgram: M.tokenProgram,
      isPositionBundle: !1
    }), G.exists) {
      const b = u.get(G.data.positionBundleMint) ?? [];
      s.push({
        ...G,
        positions: b,
        tokenProgram: M.tokenProgram,
        isPositionBundle: !0
      });
    }
  }
  return s;
}
async function XC(A, I, g = {}) {
  const C = g.authority ?? xg, B = g.whirlpoolDeployment ?? HA;
  EA(
    C.address !== QI,
    "Either supply an authority or set the default funder"
  );
  const Q = await A.getEpochInfo().send(), E = await PI(
    I,
    B.programId
  ), i = await LC(A, E[0]), e = await Kg(A, i.data.whirlpool), [o, t, r, ...n] = await Og(
    A,
    [
      e.data.tokenMintA,
      e.data.tokenMintB,
      I,
      ...e.data.rewardInfos.map((S) => S.mint).filter((S) => S !== QI)
    ]
  );
  EA(o.exists, "Token A not found"), EA(t.exists, "Token B not found"), EA(r.exists, "Position mint not found");
  const D = CI(
    i.data.tickLowerIndex,
    e.data.tickSpacing
  ), c = CI(
    i.data.tickUpperIndex,
    e.data.tickSpacing
  ), [u, s, a] = await Promise.all([
    GI({
      owner: C.address,
      mint: I,
      tokenProgram: r.programAddress
    }).then((S) => S[0]),
    BI(
      e.address,
      D,
      B.programId
    ).then((S) => S[0]),
    BI(
      e.address,
      c,
      B.programId
    ).then((S) => S[0])
  ]), [d, G] = await HC(A, [
    s,
    a
  ]), M = d.data.ticks[qI(
    i.data.tickLowerIndex,
    D,
    e.data.tickSpacing
  )], b = G.data.ticks[qI(
    i.data.tickUpperIndex,
    c,
    e.data.tickSpacing
  )], q = OC(
    e.data,
    i.data,
    M,
    b,
    RA(o, Q.epoch),
    RA(t, Q.epoch)
  ), O = BigInt(Math.floor(Date.now() / 1e3)), j = xC(
    e.data,
    i.data,
    M,
    b,
    O,
    RA(n[0], Q.epoch),
    RA(n[1], Q.epoch),
    RA(n[2], Q.epoch)
  ), v = /* @__PURE__ */ new Set();
  (q.feeOwedA > 0n || q.feeOwedB > 0n) && (v.add(e.data.tokenMintA), v.add(e.data.tokenMintB));
  for (let S = 0; S < j.rewards.length; S++)
    j.rewards[S].rewardsOwed > 0n && v.add(e.data.rewardInfos[S].mint);
  const { createInstructions: rA, cleanupInstructions: YA, tokenAccountAddresses: X } = await Vg(
    A,
    C,
    Array.from(v)
  ), p = [];
  p.push(...rA), i.data.liquidity > 0n && p.push(
    Et(
      {
        whirlpool: e.address,
        position: E[0],
        tickArrayLower: s,
        tickArrayUpper: a
      },
      { programAddress: B.programId }
    )
  ), (q.feeOwedA > 0n || q.feeOwedB > 0n) && p.push(
    pC(
      {
        whirlpool: e.address,
        positionAuthority: C,
        position: E[0],
        positionTokenAccount: u,
        tokenOwnerAccountA: X[e.data.tokenMintA],
        tokenOwnerAccountB: X[e.data.tokenMintB],
        tokenVaultA: e.data.tokenVaultA,
        tokenVaultB: e.data.tokenVaultB,
        tokenMintA: e.data.tokenMintA,
        tokenMintB: e.data.tokenMintB,
        tokenProgramA: o.programAddress,
        tokenProgramB: t.programAddress,
        memoProgram: II,
        remainingAccountsInfo: null
      },
      { programAddress: B.programId }
    )
  );
  for (let S = 0; S < j.rewards.length; S++) {
    if (j.rewards[S].rewardsOwed === 0n)
      continue;
    const CA = n[S];
    EA(CA.exists, `Reward mint ${S} not found`), p.push(
      KC(
        {
          whirlpool: e.address,
          positionAuthority: C,
          position: E[0],
          positionTokenAccount: u,
          rewardOwnerAccount: X[CA.address],
          rewardVault: e.data.rewardInfos[S].vault,
          rewardIndex: S,
          rewardMint: CA.address,
          rewardTokenProgram: CA.programAddress,
          memoProgram: II,
          remainingAccountsInfo: null
        },
        { programAddress: B.programId }
      )
    );
  }
  return p.push(...YA), {
    feesQuote: q,
    rewardsQuote: j,
    instructions: p
  };
}
async function ba(A, {
  whirlpool: {
    address: I,
    data: { sqrtPrice: g, tokenMintA: C, tokenMintB: B, ...Q }
  },
  param: { tokenMaxA: E, tokenMaxB: i },
  mintA: e,
  mintB: o,
  slippageToleranceBps: t,
  authority: r,
  programAddress: n,
  ...D
}) {
  const {
    createInstructions: c,
    cleanupInstructions: u,
    tokenAccountAddresses: s
  } = await Vg(A, r, {
    [C]: E,
    [B]: i
  }), a = {
    whirlpool: I,
    positionAuthority: r,
    tokenOwnerAccountA: s[C],
    tokenOwnerAccountB: s[B],
    tokenMintA: C,
    tokenMintB: B,
    tokenProgramA: e.programAddress,
    tokenProgramB: o.programAddress,
    memoProgram: II,
    remainingAccountsInfo: null,
    ...Q,
    ...D
  }, { minSqrtPrice: d, maxSqrtPrice: G } = Rt(
    g,
    t
  ), M = Po(
    {
      method: wo("ByTokenAmounts", {
        minSqrtPrice: d,
        maxSqrtPrice: G,
        tokenMaxA: E,
        tokenMaxB: i
      }),
      ...a
    },
    { programAddress: n }
  );
  return {
    createTokenAccountInstructions: c,
    increaseLiquidityInstruction: M,
    cleanupInstructions: u
  };
}
async function Ha(A, I, g, C, B, Q, E, i, e, o, t) {
  EA(
    o.address !== QI,
    "Either supply a funder or set the default funder"
  );
  const r = [], n = await ct(A);
  let D = 0n;
  const c = kt(C, B), u = GB(
    c.tickLowerIndex,
    I.data.tickSpacing,
    !1
  ), s = GB(
    c.tickUpperIndex,
    I.data.tickSpacing,
    !0
  ), a = await fC(), d = CI(
    u,
    I.data.tickSpacing
  ), G = CI(
    s,
    I.data.tickSpacing
  ), [
    M,
    b,
    q,
    O
  ] = await Promise.all([
    PI(a.address, t.programId),
    GI({
      owner: o.address,
      mint: a.address,
      tokenProgram: RI
    }).then((p) => p[0]),
    BI(
      I.address,
      d,
      t.programId
    ).then((p) => p[0]),
    BI(
      I.address,
      G,
      t.programId
    ).then((p) => p[0])
  ]), {
    createTokenAccountInstructions: j,
    increaseLiquidityInstruction: v,
    cleanupInstructions: rA
  } = await ba(A, {
    whirlpool: I,
    position: M[0],
    positionTokenAccount: b,
    param: g,
    mintA: Q,
    mintB: E,
    slippageToleranceBps: i,
    authority: o,
    programAddress: t.programId,
    tickArrayLower: q,
    tickArrayUpper: O,
    tickLowerIndex: u,
    tickUpperIndex: s
  });
  r.push(...j);
  const [YA, X] = await TC(A, [
    q,
    O
  ]);
  return YA.exists || (r.push(
    yB(
      {
        whirlpool: I.address,
        funder: o,
        tickArray: q,
        startTickIndex: d,
        idempotent: !1
      },
      { programAddress: t.programId }
    )
  ), D += mB(
    n,
    MB()
  )), !X.exists && d !== G && (r.push(
    yB(
      {
        whirlpool: I.address,
        funder: o,
        tickArray: O,
        startTickIndex: G,
        idempotent: !1
      },
      { programAddress: t.programId }
    )
  ), D += mB(
    n,
    MB()
  )), r.push(
    Bt(
      {
        funder: o,
        owner: o.address,
        position: M[0],
        positionMint: a,
        positionTokenAccount: b,
        whirlpool: I.address,
        associatedTokenProgram: WC,
        tickLowerIndex: u,
        tickUpperIndex: s,
        token2022Program: RI,
        metadataUpdateAuth: F(
          "3axbTs2z5GBy6usVbNVoqEgZMng3vZvMnAoX29BFfwhr"
        ),
        withTokenMetadataExtension: e
      },
      { programAddress: t.programId }
    )
  ), r.push(v), r.push(...rA), {
    instructions: r,
    positionMint: a.address,
    initializationCost: TI(D)
  };
}
async function zC(A, I, g, C, B, Q = {}) {
  const E = Q.slippageToleranceBps ?? vC, i = Q.withTokenMetadataExtension ?? !0, e = Q.funder ?? xg, o = Q.whirlpoolDeployment ?? HA, t = await Kg(A, I);
  Ta(t.data);
  const [r, n] = await Ca(A, [
    t.data.tokenMintA,
    t.data.tokenMintB
  ]), D = r.data.decimals, c = n.data.decimals, u = SB(C, D, c), s = SB(B, D, c);
  return Ha(
    A,
    t,
    g,
    u,
    s,
    r,
    n,
    E,
    i,
    e,
    o
  );
}
function Ta(A) {
  EA(
    A.tickSpacing !== Ga,
    "Splash pools only support full range positions"
  );
}
typeof globalThis.Buffer > "u" && (globalThis.Buffer = { from: (A) => typeof A == "string" ? new TextEncoder().encode(A) : Uint8Array.from(A) });
const qa = F("ComputeBudget111111111111111111111111111111"), YI = {
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: "USDT"
}, OI = 1232, PC = 2e4, _g = (A) => new Promise((I) => setTimeout(I, A));
function XA(A) {
  const I = _e({ url: A });
  return Ze(async (C) => {
    for (let B = 0; ; B++)
      try {
        return await I(C);
      } catch (Q) {
        const E = Q && Q.context && Q.context.statusCode;
        if (!(E === 429 || E >= 500 && E < 600 || /8100002/.test(String(Q && Q.message))) || B >= 5) throw Q;
        await _g(400 * Math.pow(2, B) + Math.random() * 200);
      }
  });
}
function yg(A, I, g) {
  const C = new Uint8Array(1 + g);
  C[0] = A;
  let B = BigInt(I);
  for (let Q = 0; Q < g; Q++)
    C[1 + Q] = Number(B & 0xffn), B >>= 8n;
  return { programAddress: qa, accounts: [], data: C };
}
function xI(A, I) {
  const g = Math.floor((+A || 0) * Math.pow(10, I));
  return BigInt(g > 0 ? g : 0);
}
async function $C(A, I) {
  for (let g = 0; g < 30; g++) {
    await _g(2e3);
    let C = null;
    try {
      C = (await A.getSignatureStatuses([I]).send()).value[0];
    } catch {
      continue;
    }
    if (C) {
      if (C.err) throw new Error("La red rechazó la transacción: " + JSON.stringify(C.err, (B, Q) => typeof Q == "bigint" ? String(Q) : Q));
      if (C.confirmationStatus === "confirmed" || C.confirmationStatus === "finalized") return !0;
    }
  }
  return !1;
}
async function Oa(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!I) throw new Error("No se cargó la librería de Solana");
  const g = xI(A.amountA, A.decA), C = xI(A.amountB, A.decB);
  if (g <= 0n && C <= 0n) throw new Error("Introduce una cantidad");
  if (!(A.lower > 0) || !(A.upper > A.lower)) throw new Error("Rango de precios no válido");
  const B = XA(A.rpc), Q = vA(F(A.owner)), E = await zC(B, F(A.pool), { tokenMaxA: g, tokenMaxB: C }, A.lower, A.upper, {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    funder: Q
  }), i = (await B.getLatestBlockhash().send()).value, e = async (D) => {
    const c = SI(
      wC({ version: 0 }),
      (s) => FC(Q, s),
      (s) => cC(i, s),
      (s) => lC(D, s)
    ), u = await UC(c);
    return new Uint8Array(hC().encode(u));
  };
  let o = await e([yg(3, PC, 8)].concat(E.instructions));
  if (o.length > OI && (o = await e(E.instructions)), o.length > OI) throw new Error("La transacción es demasiado grande para enviarla de una vez (" + o.length + " bytes)");
  const t = await A.provider.signAndSendTransaction(I.deserialize(o)), r = t && t.signature || String(t), n = await $C(B, r);
  return {
    signature: r,
    confirmed: n,
    positionMint: String(E.positionMint),
    initializationCost: Number(E.initializationCost) / 1e9,
    bytes: o.length
  };
}
const pB = (A) => {
  let I = "";
  for (let g = 0; g < A.length; g += 32768) I += String.fromCharCode.apply(null, A.subarray(g, g + 32768));
  return btoa(I);
};
async function VI(A, I, g) {
  for (let C = 0; ; C++) {
    const B = await fetch(A, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: I, params: g }) });
    if ((B.status === 429 || B.status >= 500) && C < 5) {
      await _g(400 * Math.pow(2, C) + Math.random() * 200);
      continue;
    }
    const Q = await B.text();
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
async function Zg(A, I) {
  const g = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!g) throw new Error("No se cargó la librería de Solana");
  const C = XA(A.rpc), B = A.signer || vA(F(A.owner)), Q = (await C.getLatestBlockhash().send()).value, E = A.alts && A.alts.length ? await Ao(A.alts.map((u) => F(u)), C) : null, i = async (u) => {
    let s = SI(
      wC({ version: 0 }),
      (d) => FC(B, d),
      (d) => cC(Q, d),
      (d) => lC(u, d)
    );
    E && (s = _i(s, E));
    const a = await UC(s);
    return new Uint8Array(hC().encode(a));
  }, e = A.cuLimit ? [yg(2, A.cuLimit, 4)] : [];
  let o = await i(e.concat([yg(3, PC, 8)], I));
  if (o.length > OI && (o = await i(e.concat(I))), o.length > OI) {
    const u = new Error("La transacción es demasiado grande (" + o.length + " bytes)");
    throw u.kzBig = !0, u;
  }
  const t = await VI(A.rpc, "simulateTransaction", [pB(o), { encoding: "base64", sigVerify: !1, replaceRecentBlockhash: !0, commitment: "confirmed" }]), r = t && (t.value || t);
  if (r && r.err) {
    const u = (r.logs || []).filter((s) => /Error|error|failed/.test(s)).slice(-2).join(" · ");
    throw new Error("La simulación falló, no se ha enviado nada. " + (u || JSON.stringify(r.err)));
  }
  const n = g.deserialize(o);
  let D;
  if (A.provider.signTransaction) {
    const u = await A.provider.signTransaction(n);
    D = await VI(A.rpc, "sendTransaction", [pB(u.serialize()), { encoding: "base64", skipPreflight: !1, preflightCommitment: "confirmed", maxRetries: 3 }]);
  } else {
    const u = await A.provider.signAndSendTransaction(n);
    D = u && u.signature || String(u);
  }
  const c = await $C(C, D);
  return { signature: D, confirmed: c };
}
function xa(A, I) {
  const g = atob(A.data), C = new Uint8Array(g.length);
  for (let B = 0; B < g.length; B++) C[B] = g.charCodeAt(B);
  return {
    programAddress: F(A.programId),
    accounts: A.accounts.map((B) => {
      const Q = (B.isSigner ? 2 : 0) + (B.isWritable ? 1 : 0), E = { address: F(B.pubkey), role: Q };
      return B.isSigner && B.pubkey === String(I.address) && (E.signer = I), E;
    }),
    data: C
  };
}
async function Va(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = xI(A.amountA, A.decA), g = xI(A.amountB, A.decB);
  if (I <= 0n && g <= 0n) throw new Error("Introduce una cantidad");
  if (!(A.lower > 0) || !(A.upper > A.lower)) throw new Error("Rango de precios no válido");
  const C = XA(A.rpc), B = vA(F(A.owner)), Q = "So11111111111111111111111111111111111111112", E = (await bg(C, [F(A.pool)]))[0].data, i = String(E.tokenMintA) === Q ? "A" : String(E.tokenMintB) === Q ? "B" : null;
  let e = [], o = [];
  if (i) {
    const [D] = await GI({ owner: B.address, tokenProgram: GA, mint: F(Q) }), c = i === "A" ? I : g;
    let u = BigInt(Math.floor(A.solIn || 0)) + (c > BigInt(Math.floor(A.solOut || 0)) ? c - BigInt(Math.floor(A.solOut || 0)) : 0n);
    e.push(Ra({ payer: B, ata: D, owner: B.address, mint: F(Q) })), u > 0n && e.push(JC({ source: B, destination: D, amount: u })), e.push(jC({ account: D })), o.push(KI({ account: D, destination: B.address, owner: B }));
  }
  let t;
  LB(i ? "none" : "keypair");
  try {
    t = await zC(C, F(A.pool), { tokenMaxA: I, tokenMaxB: g }, A.lower, A.upper, {
      slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
      funder: B
    });
  } finally {
    LB("keypair");
  }
  const r = (A.pre || []).map((D) => xa(D, B)), n = await Zg(Object.assign({}, A, { signer: B, cuLimit: A.cuLimit || 1e6 }), e.concat(r, t.instructions, o));
  return Object.assign(n, { positionMint: String(t.positionMint) });
}
async function _a(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = XA(A.rpc), g = vA(F(A.owner)), C = await ma(I, F(A.mint), {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    authority: g
  });
  return Zg(Object.assign({}, A, { signer: g }), C.instructions);
}
async function Za(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = XA(A.rpc), g = vA(F(A.owner)), C = await XC(I, F(A.mint), { authority: g });
  return Zg(Object.assign({}, A, { signer: g }), C.instructions);
}
const AQ = ["5m", "15m", "30m", "1h", "4h", "8h", "24h", "7d", "30d", "365d"];
async function Wa(A) {
  try {
    let I = await fetch("https://api.orca.so/v2/solana/pools/" + A + "?stats=" + AQ.filter((B) => B !== "365d").join(","));
    if (I.ok || (I = await fetch("https://api.orca.so/v2/solana/pools/" + A)), !I.ok) return null;
    const g = await I.json(), C = g && g.data ? g.data : g;
    return Array.isArray(C) ? C[0] : C;
  } catch {
    return null;
  }
}
const ja = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", va = { TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: 1, TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb: 1 }, Xa = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function za(A) {
  const I = [0];
  for (const g of A) {
    let C = Xa.indexOf(g);
    if (C < 0) return new Uint8Array(0);
    for (let B = 0; B < I.length; B++)
      C += I[B] * 58, I[B] = C & 255, C >>= 8;
    for (; C; )
      I.push(C & 255), C >>= 8;
  }
  for (const g of A) {
    if (g !== "1") break;
    I.push(0);
  }
  return new Uint8Array(I.reverse());
}
let cI = null;
async function Pa() {
  if (cI) return cI;
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
  cI = {};
  for (const I of Object.keys(A)) {
    const g = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode("global:" + I)));
    cI[Array.from(g.slice(0, 8)).join(",")] = A[I];
  }
  return cI;
}
function $a(A, I, g, C) {
  if (A > 0 && I > 0) {
    const B = I / A;
    let Q = g, E = C;
    for (let e = 0; e < 80; e++) {
      const o = (Q + E) / 2;
      (o - g) / (1 / o - 1 / C) < B ? Q = o : E = o;
    }
    const i = (Q + E) / 2;
    return i * i;
  }
  return A > 0 ? g * g : I > 0 ? C * C : null;
}
async function IQ(A, I, g) {
  const C = new Array(A.length);
  let B = 0;
  return await Promise.all(
    Array.from({ length: Math.min(I, A.length) }, async () => {
      for (; B < A.length; ) {
        const Q = B++;
        try {
          C[Q] = await g(A[Q]);
        } catch {
          C[Q] = null;
        }
      }
    })
  ), C;
}
async function As(A, I, g, C, B) {
  const Q = await Pa();
  let E = [], i;
  for (let c = 0; c < 3; c++) {
    const u = await VI(A, "getSignaturesForAddress", [I, Object.assign({ limit: 1e3 }, i ? { before: i } : {})]);
    if (E = E.concat(u || []), !u || u.length < 1e3) break;
    i = u[u.length - 1].signature;
  }
  const e = E.length ? E[E.length - 1].blockTime : null;
  let o = E.filter((c) => !c.err);
  o.length > 100 && (o = o.slice(0, 70).concat(o.slice(-30)));
  const t = await IQ(o, 3, (c) => VI(A, "getTransaction", [c.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" }])), r = [], n = {};
  t.forEach((c) => {
    if (!c || !c.transaction) return;
    const u = c.transaction.message.instructions || [], s = {};
    (c.meta && c.meta.innerInstructions || []).forEach((a) => s[a.index] = a.instructions || []), u.forEach((a, d) => {
      const G = [a].concat(s[d] || []);
      let M = null;
      G.forEach((b) => {
        if (b.programId === ja && b.data && Array.isArray(b.accounts)) {
          const v = Q[Array.from(za(b.data).slice(0, 8)).join(",")];
          M = b.accounts.indexOf(I) >= 0 ? { kind: v || "unk", ai: 0, bi: 0, ao: 0, bo: 0 } : null, M && M.kind !== "rew" && r.push(M);
          return;
        }
        if (!M || !va[b.programId] || !b.parsed) return;
        const q = b.parsed.type;
        if (q !== "transfer" && q !== "transferChecked") return;
        const O = b.parsed.info || {}, j = Number(O.amount || O.tokenAmount && O.tokenAmount.amount || 0);
        if (M.kind === "rew") {
          const v = B[O.source];
          v && (n[v] = (n[v] || 0) + j);
          return;
        }
        O.destination === g ? M.ai += j : O.source === g ? M.ao += j : O.destination === C ? M.bi += j : O.source === C && (M.bo += j);
      });
    });
  });
  const D = [];
  return r.forEach((c) => {
    let u = c.kind;
    u === "unk" && (u = c.ai + c.bi > 0 ? "inc" : c.ao + c.bo > 0 ? "dec" : null), u && (u === "inc" ? D.push({ kind: u, a: c.ai, b: c.bi }) : D.push({ kind: u, a: c.ao, b: c.bo }));
  }), { opened: e, events: D, rewards: n, txCount: E.length };
}
async function Is(A) {
  const I = {};
  try {
    const C = await (await fetch("https://lite-api.jup.ag/price/v3?ids=" + A.join(","))).json();
    A.forEach((B) => {
      const Q = C && C[B] && C[B].usdPrice;
      Q > 0 && (I[B] = +Q);
    });
  } catch {
  }
  return I;
}
function gs(A) {
  if (!(A > 0)) return "—";
  const I = Math.floor(A / 86400), g = Math.floor(A % 86400 / 3600), C = Math.floor(A % 3600 / 60);
  return I ? I + "d " + g + "h" : g ? g + "h " + C + "m" : Math.max(1, C) + "m";
}
const kg = {};
async function Bs(A) {
  const I = (A.pools || []).filter((Q) => kg[Q] != null);
  if (!I.length) return {};
  const g = XA(A.rpc), C = await bg(g, I.map((Q) => F(Q))), B = {};
  return C.forEach((Q) => {
    const E = Number(Q.data.sqrtPrice) / 18446744073709552e3;
    B[String(Q.address)] = E * E * kg[String(Q.address)];
  }), B;
}
function KB(A) {
  return A = String(A), A.slice(0, 4) + "…" + A.slice(-4);
}
async function Cs(A) {
  const I = XA(A.rpc), g = await Ka(I, F(A.owner)), C = [];
  if (g.forEach((s) => {
    s.isPositionBundle ? (s.positions || []).forEach((a) => C.push(a)) : C.push(s);
  }), !C.length) return [];
  const B = Array.from(new Set(C.map((s) => String(s.data.whirlpool)))), Q = await bg(I, B.map((s) => F(s))), E = {};
  Q.forEach((s) => E[String(s.address)] = s.data);
  const i = Array.from(new Set(Q.flatMap((s) => [String(s.data.tokenMintA), String(s.data.tokenMintB)]))), e = {}, o = (await I.getMultipleAccounts(i.map((s) => F(s)), { encoding: "jsonParsed" }).send()).value;
  i.forEach((s, a) => {
    const d = o[a] && o[a].data && o[a].data.parsed && o[a].data.parsed.info;
    e[s] = d ? Number(d.decimals) : 6;
  });
  const t = {};
  await Promise.all(B.map(async (s) => t[s] = await Wa(s)));
  const r = /* @__PURE__ */ new Set();
  Q.forEach((s) => (s.data.rewardInfos || []).forEach((a) => {
    const d = String(a.mint);
    d !== "11111111111111111111111111111111" && r.add(d);
  }));
  const n = await Is(Array.from(new Set(i.concat(Array.from(r)))));
  if (Array.from(r).some((s) => e[s] == null)) {
    const s = Array.from(r).filter((d) => e[d] == null), a = (await I.getMultipleAccounts(s.map((d) => F(d)), { encoding: "jsonParsed" }).send()).value;
    s.forEach((d, G) => {
      const M = a[G] && a[G].data && a[G].data.parsed && a[G].data.parsed.info;
      e[d] = M ? Number(M.decimals) : 6;
    });
  }
  const D = vA(F(A.owner)), c = Date.now() / 1e3;
  return (await IQ(C, 2, async (s) => {
    const a = s.data, d = E[String(a.whirlpool)];
    if (!d) return null;
    const G = String(d.tokenMintA), M = String(d.tokenMintB), b = e[G], q = e[M], O = t[String(a.whirlpool)] || {}, j = O.tokenA || {}, v = O.tokenB || {}, rA = j.symbol || YI[G] || KB(G), YA = v.symbol || YI[M] || KB(M), X = Math.pow(10, b - q);
    kg[String(a.whirlpool)] = X;
    const p = Number(d.sqrtPrice) / 18446744073709552e3, S = Math.pow(1.0001, a.tickLowerIndex / 2), CA = Math.pow(1.0001, a.tickUpperIndex / 2), wA = Number(a.liquidity);
    let iA = 0, L = 0;
    p <= S ? iA = wA * (1 / S - 1 / CA) : p >= CA ? L = wA * (CA - S) : (iA = wA * (1 / p - 1 / CA), L = wA * (p - S));
    const zA = iA / Math.pow(10, b), gQ = L / Math.pow(10, q), FI = p * p * X;
    let LA = n[G], lA = n[M];
    YI[M] && !lA && (lA = 1), YI[G] && !LA && (LA = 1), !LA && lA && (LA = lA * FI), !lA && LA && FI > 0 && (lA = LA / FI);
    const Ag = (x, aA) => LA && lA ? x / Math.pow(10, b) * LA + aA / Math.pow(10, q) * lA : null, oI = Ag(iA, L);
    let tI = null, Ig = 0, gg = 0, Wg = [];
    try {
      const x = await XC(I, F(String(a.positionMint)), { authority: D });
      Ig = Number(x.feesQuote.feeOwedA), gg = Number(x.feesQuote.feeOwedB), tI = Ag(Ig, gg), (d.rewardInfos || []).forEach((aA, $A) => {
        const mA = x.rewardsQuote.rewards[$A], uA = String(aA.mint);
        if (!mA || !(Number(mA.rewardsOwed) > 0) || uA === "11111111111111111111111111111111") return;
        const kA = Number(mA.rewardsOwed) / Math.pow(10, e[uA] || 6);
        Wg.push({ mint: uA, amt: kA }), tI != null && n[uA] && (tI += kA * n[uA]);
      });
    } catch {
    }
    let TA = null;
    try {
      const x = {};
      (d.rewardInfos || []).forEach((aA) => x[String(aA.vault)] = String(aA.mint)), TA = await As(A.rpc, String(s.address), String(d.tokenVaultA), String(d.tokenVaultB), x);
    } catch {
    }
    let PA = null, jg = null, nI = null, vg = null, fI = null, Xg = "—";
    if (TA) {
      TA.opened && (Xg = gs(c - TA.opened));
      let x = 0, aA = 0, $A = 0, mA = 0, uA = 0, kA = 0;
      TA.events.forEach(($) => {
        if ($.kind === "fee") {
          uA += $.a, kA += $.b;
          return;
        }
        const sA = $a($.a, $.b, S, CA), hA = sA == null ? 0 : $.a * sA + $.b;
        $.kind === "inc" ? (x += hA, sA != null && hA > 0 && (mA += sA * X * hA, $A += hA)) : aA += hA;
      }), $A > 0 && (vg = mA / $A), lA && (PA = x / Math.pow(10, q) * lA, jg = aA / Math.pow(10, q) * lA), nI = Ag(uA, kA), nI != null && Object.keys(TA.rewards).forEach(($) => {
        n[$] && (nI += TA.rewards[$] / Math.pow(10, e[$] || 6) * n[$]);
      }), PA > 0 && oI != null && (fI = oI + (jg || 0) + (nI || 0) + (tI || 0) - PA);
    }
    let rI = null, Bg = null;
    try {
      const x = O.stats || {}, aA = Number(d.liquidity);
      if (!(p > S && p < CA))
        rI = { out: !0 }, Bg = 0;
      else if (oI > 0 && aA > 0) {
        const mA = Number(d.feeRate) / 1e6, uA = wA / aA, kA = (sA) => sA ? ((+sA.volume || 0) * mA + (+sA.rewards || 0)) * uA : null, $ = { "5m": 1 / 12, "15m": 0.25, "30m": 0.5, "1h": 1, "4h": 4, "8h": 8, "24h": 24, "7d": 168, "30d": 720, "365d": 8760 };
        rI = {}, AQ.forEach((sA) => {
          let hA = kA(x[sA]);
          if (hA == null) {
            const UI = x["30d"] ? ["30d", kA(x["30d"])] : x["24h"] ? ["24h", kA(x["24h"])] : null;
            UI && UI[1] != null && (hA = UI[1] * $[sA] / $[UI[0]]);
          }
          rI[sA] = hA == null ? null : hA / oI * 100;
        }), Bg = rI["24h"];
      }
    } catch {
    }
    return {
      pair: rA + "/" + YA,
      fee: d.feeRate != null ? String(Number(d.feeRate) / 1e4) : "",
      price: FI,
      lo: S * S * X,
      hi: CA * CA * X,
      usd: oI,
      amtA: zA,
      amtB: gQ,
      symA: rA,
      symB: YA,
      dep: PA,
      pnl: fI,
      pnlPct: fI != null && PA > 0 ? fI / PA * 100 : null,
      harv: nI,
      pend: tI,
      pendA: Ig / Math.pow(10, b),
      pendB: gg / Math.pow(10, q),
      pendRew: Wg,
      est: rI,
      est24: Bg,
      entry: vg,
      dur: Xg,
      mint: String(a.positionMint),
      pool: String(a.whirlpool)
    };
  })).filter(Boolean);
}
window.kzSdk = { ready: !0, version: "0.6.2", openPosition: Oa, swapAndOpen: Va, positions: Cs, closePosition: _a, harvest: Za, livePrices: Bs };
window.dispatchEvent(new Event("kzsdk"));
