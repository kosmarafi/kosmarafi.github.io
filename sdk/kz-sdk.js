var AQ = 6, IQ = 10, gQ = -32700, BQ = -32603, CQ = -32602, QQ = -32601, EQ = -32600, iQ = -32015, eQ = -32014, oQ = -32012, tQ = -32010, nQ = -32009, rQ = -32007, aQ = -32006, sQ = -32004, vg = -32002, cQ = -32001, DQ = 28e5, wQ = 2800001, lQ = 2800003, dQ = 2800006, uQ = 2800007, KB = 2800008, hQ = 2800009, NQ = 323e4, RQ = 32300001, yQ = 3230002, kQ = 3230004, MQ = 361e4, SQ = 3610001, GQ = 3610002, FQ = 3610003, fQ = 3610004, UQ = 3610005, JQ = 4615e3, YQ = 4615026, LQ = 5508e3, pQ = 5663e3, zg = 5663001, mQ = 5663004, KQ = 5663015, bQ = 5663016, HQ = 5663021, TQ = 705e4, qQ = 7050030, OQ = 7050031, xQ = 7050035, VQ = 8078e3, _Q = 8078001, ZQ = 8078002, WQ = 8078004, jQ = 8078005, XQ = 8078006, vQ = 8078007, zQ = 8078008, PQ = 8078009, $Q = 8078010, AE = 8078011, mI = 8078012, Pg = 8078013, IE = 8078014, gE = 8078017, BE = 8078018, bB = 8078022, CE = 81e5, QE = 8100002, EE = 8100003;
function HB(A) {
  return Array.isArray(A) ? "%5B" + A.map(HB).join(
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
function iE([A, I]) {
  return `${A}=${HB(I)}`;
}
function eE(A) {
  const I = Object.entries(A).map(iE).join("&");
  return btoa(I);
}
function oE(A, I = {}) {
  {
    let g = `Solana error #${A}; Decode this error by running \`npx @solana/errors decode -- ${A}`;
    return Object.keys(I).length && (g += ` '${eE(I)}'`), `${g}\``;
  }
}
function tE(A, I) {
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
    let g, C;
    I && Object.entries(Object.getOwnPropertyDescriptors(I)).forEach(([Q, E]) => {
      Q === "cause" ? C = { cause: E.value } : (g === void 0 && (g = {
        __code: A
      }), Object.defineProperty(g, Q, E));
    });
    const B = oE(A, g);
    super(B, C), this.context = Object.freeze(
      g === void 0 ? {
        __code: A
      } : g
    ), this.name = "SolanaError";
  }
};
function kg(...A) {
  "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(...A);
}
function TB({ errorCodeBaseOffset: A, getErrorContext: I, orderedErrorNames: g, rpcEnumError: C }, B) {
  let Q, E;
  typeof C == "string" ? Q = C : (Q = Object.keys(C)[0], E = C[Q]);
  const i = g.indexOf(Q), e = A + i, o = I(e, Q, E), t = new w(e, o);
  return kg(t, B), t;
}
var nE = [
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
function qB(A, I) {
  const g = Number(A);
  return TB(
    {
      errorCodeBaseOffset: 4615001,
      getErrorContext(C, B, Q) {
        return C === JQ ? {
          errorName: B,
          index: g,
          ...Q !== void 0 ? { instructionErrorContext: Q } : null
        } : C === YQ ? {
          code: Number(Q),
          index: g
        } : { index: g };
      },
      orderedErrorNames: nE,
      rpcEnumError: I
    },
    qB
  );
}
var rE = [
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
function OB(A) {
  return typeof A == "object" && "InstructionError" in A ? qB(
    ...A.InstructionError
  ) : TB(
    {
      errorCodeBaseOffset: 7050001,
      getErrorContext(I, g, C) {
        if (I === TQ)
          return {
            errorName: g,
            ...C !== void 0 ? { transactionErrorContext: C } : null
          };
        if (I === qQ)
          return {
            index: Number(C)
          };
        if (I === OQ || I === xQ)
          return {
            accountIndex: Number(C.account_index)
          };
      },
      orderedErrorNames: rE,
      rpcEnumError: A
    },
    OB
  );
}
function sg(A) {
  let I;
  if (aE(A)) {
    const { code: g, data: C, message: B } = A, Q = Number(g);
    if (Q === vg) {
      const { err: E, ...i } = C, e = E ? { cause: OB(E) } : null;
      I = new w(vg, {
        ...i,
        ...e
      });
    } else {
      let E;
      switch (Q) {
        case BQ:
        case CQ:
        case EQ:
        case QQ:
        case gQ:
        case oQ:
        case cQ:
        case sQ:
        case eQ:
        case tQ:
        case nQ:
        case rQ:
        case aQ:
        case iQ:
          E = { __serverMessage: B };
          break;
        default:
          typeof C == "object" && !Array.isArray(C) && (E = C);
      }
      I = new w(Q, E);
    }
  } else {
    const g = typeof A == "object" && A !== null && "message" in A && typeof A.message == "string" ? A.message : "Malformed JSON-RPC error with no message attribute";
    I = new w(IQ, { error: A, message: g });
  }
  return kg(I, sg), I;
}
function aE(A) {
  return typeof A == "object" && A !== null && "code" in A && "message" in A && (typeof A.code == "number" || typeof A.code == "bigint") && typeof A.message == "string";
}
function sE(A, I) {
  if (A.length >= I) return A;
  const g = new Uint8Array(I).fill(0);
  return g.set(A), g;
}
var cE = (A, I) => sE(A.length <= I ? A : A.slice(0, I), I);
function xB(A, I, g) {
  const C = g === 0 && A.length === I.length ? A : A.slice(g, g + I.length);
  return VB(C, I);
}
function VB(A, I) {
  return A.length === I.length && A.every((g, C) => g === I[C]);
}
function mA(A, I) {
  return "fixedSize" in I ? I.fixedSize : I.getSizeFromValue(A);
}
function H(A) {
  return Object.freeze({
    ...A,
    encode: (I) => {
      const g = new Uint8Array(mA(I, A));
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
function _B(A) {
  if (!T(A))
    throw new w(ZQ);
}
function DE(A) {
  return !T(A);
}
function wE(A, I) {
  if (T(A) !== T(I))
    throw new w(WQ);
  if (T(A) && T(I) && A.fixedSize !== I.fixedSize)
    throw new w(jQ, {
      decoderFixedSize: I.fixedSize,
      encoderFixedSize: A.fixedSize
    });
  if (!T(A) && !T(I) && A.maxSize !== I.maxSize)
    throw new w(XQ, {
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
function lE(A, I, g = 0) {
  if (I.length - g <= 0)
    throw new w(VQ, {
      codecDescription: A
    });
}
function Mg(A, I, g, C = 0) {
  const B = g.length - C;
  if (B < I)
    throw new w(_Q, {
      bytesLength: B,
      codecDescription: A,
      expected: I
    });
}
function $g(A, I, g) {
  if (I < 0 || I > g)
    throw new w(IE, {
      bytesLength: g,
      codecDescription: A,
      offset: I
    });
}
function ZB(A, I) {
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
      const i = mA(E, A);
      return mA(i, I) + i;
    },
    write: g
  });
}
function F(A, I) {
  const g = (E, i) => {
    const [e, o] = I.read(E, i), t = Number(e);
    return i = o, (i > 0 || E.length > t) && (E = E.slice(i, i + t)), Mg("addDecoderSizePrefix", t, E), [A.decode(E), i + t];
  };
  if (T(I) && T(A))
    return gA({ ...A, fixedSize: I.fixedSize + A.fixedSize, read: g });
  const C = T(I) ? I.fixedSize : I.maxSize ?? null, B = T(A) ? A.fixedSize : A.maxSize ?? null, Q = C !== null && B !== null ? C + B : null;
  return gA({ ...A, ...Q !== null ? { maxSize: Q } : {}, read: g });
}
function WB(A, I, g) {
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
      Mg("fixCodecSize", I, g, C), (C > 0 || g.length > I) && (g = g.slice(C, C + I)), T(A) && (g = cE(g, A.fixedSize));
      const [B] = A.read(g, 0);
      return [B, C + I];
    }
  });
}
function dE(A, I) {
  return H({
    ...A,
    write: (g, C, B) => {
      const Q = (o) => uE(o, C.length), E = I.preOffset ? I.preOffset({ bytes: C, preOffset: B, wrapBytes: Q }) : B;
      $g("offsetEncoder", E, C.length);
      const i = A.write(g, C, E), e = I.postOffset ? I.postOffset({ bytes: C, newPreOffset: E, postOffset: i, preOffset: B, wrapBytes: Q }) : i;
      return $g("offsetEncoder", e, C.length), e;
    }
  });
}
function uE(A, I) {
  return I === 0 ? 0 : (A % I + I) % I;
}
function hE(A, I) {
  if (T(A)) {
    const g = I(A.fixedSize);
    if (g < 0)
      throw new w(Pg, {
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
        throw new w(Pg, {
          bytesLength: C,
          codecDescription: "resizeEncoder"
        });
      return C;
    }
  });
}
function NE(A, I) {
  return dE(
    hE(A, (g) => g + I),
    { preOffset: ({ preOffset: g }) => g + I }
  );
}
function m(A, I) {
  return H({
    ...DE(A) ? { ...A, getSizeFromValue: (g) => A.getSizeFromValue(I(g)) } : A,
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
function RE(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new w(mI, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var yE = (A) => H({
  getSizeFromValue: (I) => {
    const [g, C] = AB(I, A[0]);
    if (!C) return I.length;
    const B = IB(C, A);
    return g.length + Math.ceil(B.toString(16).length / 2);
  },
  write(I, g, C) {
    if (RE(A, I), I === "") return C;
    const [B, Q] = AB(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(B.length).fill(0), C), C + B.length;
    let E = IB(Q, A);
    const i = [];
    for (; E > 0n; )
      i.unshift(Number(E % 256n)), E /= 256n;
    const e = [...Array(B.length).fill(0), ...i];
    return g.set(e, C), C + e.length;
  }
}), kE = (A) => gA({
  read(I, g) {
    const C = g === 0 ? I : I.slice(g);
    if (C.length === 0) return ["", 0];
    let B = C.findIndex((e) => e !== 0);
    B = B === -1 ? C.length : B;
    const Q = A[0].repeat(B);
    if (B === C.length) return [Q, I.length];
    const E = C.slice(B).reduce((e, o) => e * 256n + BigInt(o), 0n), i = ME(E, A);
    return [Q + i, I.length];
  }
});
function AB(A, I) {
  const [g, C] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, C];
}
function IB(A, I) {
  const g = BigInt(I.length);
  let C = 0n;
  for (const B of A)
    C *= g, C += BigInt(I.indexOf(B));
  return C;
}
function ME(A, I) {
  const g = BigInt(I.length), C = [];
  for (; A > 0n; )
    C.unshift(I[Number(A % g)]), A /= g;
  return C.join("");
}
var jB = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", SE = () => yE(jB), GE = () => kE(jB), gB = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", XB = () => H({
  getSizeFromValue: (A) => {
    try {
      return atob(A).length;
    } catch {
      throw new w(mI, {
        alphabet: gB,
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
      throw new w(mI, {
        alphabet: gB,
        base: 64,
        value: A
      });
    }
  }
}), FE = (A) => (
  // eslint-disable-next-line no-control-regex
  A.replace(/\u0000/g, "")
), fE = globalThis.TextDecoder, BB = globalThis.TextEncoder, UE = () => {
  let A;
  return H({
    getSizeFromValue: (I) => (A ||= new BB()).encode(I).length,
    write: (I, g, C) => {
      const B = (A ||= new BB()).encode(I);
      return g.set(B, C), C + B.length;
    }
  });
}, aI = () => {
  let A;
  return gA({
    read(I, g) {
      const C = (A ||= new fE()).decode(I.slice(g));
      return [FE(C), I.length];
    }
  });
}, JE = 128;
function GA(A, I) {
  try {
    return "exists" in A && !A.exists ? A : Object.freeze({ ...A, data: I.decode(A.data) });
  } catch {
    throw new w(yQ, {
      address: A.address
    });
  }
}
function YE(A) {
  return !("exists" in A) || "exists" in A && A.exists;
}
function LE(A) {
  const I = A.filter((g) => YE(g) && g.data instanceof Uint8Array);
  if (I.length > 0) {
    const g = I.map((C) => C.address);
    throw new w(kQ, {
      addresses: g
    });
  }
}
function Sg(A, I) {
  if (!I) return Object.freeze({ address: A, exists: !1 });
  const g = XB().encode(I.data[0]);
  return Object.freeze({ ...vB(I), address: A, data: g, exists: !0 });
}
function pE(A, I) {
  if (!I) return Object.freeze({ address: A, exists: !1 });
  const g = I.data.parsed.info || {};
  return (I.data.program || I.data.parsed.type) && (g.parsedAccountMeta = {
    program: I.data.program,
    type: I.data.parsed.type
  }), Object.freeze({ ...vB(I), address: A, data: g, exists: !0 });
}
function vB(A) {
  return Object.freeze({
    executable: A.executable,
    lamports: A.lamports,
    programAddress: A.owner,
    space: A.space
  });
}
async function Gg(A, I, g = {}) {
  const { abortSignal: C, ...B } = g, Q = await A.getAccountInfo(I, { ...B, encoding: "base64" }).send({ abortSignal: C });
  return Sg(I, Q.value);
}
async function EI(A, I, g = {}) {
  const { abortSignal: C, ...B } = g;
  return (await A.getMultipleAccounts(I, { ...B, encoding: "base64" }).send({ abortSignal: C })).value.map((E, i) => Sg(I[i], E));
}
async function mE(A, I, g = {}) {
  const { abortSignal: C, ...B } = g;
  return (await A.getMultipleAccounts(I, { ...B, encoding: "jsonParsed" }).send({ abortSignal: C })).value.map((E, i) => E && typeof E == "object" && "parsed" in E.data ? pE(I[i], E) : Sg(I[i], E));
}
function xI(A) {
  if (!A.exists)
    throw new w(NQ, { address: A.address });
}
function yI(A) {
  const I = A.filter((g) => !g.exists);
  if (I.length > 0) {
    const g = I.map((C) => C.address);
    throw new w(RQ, { addresses: g });
  }
}
function VI() {
  if (!globalThis.isSecureContext)
    throw new w(MQ);
}
var qA;
async function KE(A) {
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
function bE() {
  if (VI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.digest != "function")
    throw new w(SQ);
}
async function HE() {
  if (VI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.generateKey != "function")
    throw new w(fQ);
  if (!await KE(globalThis.crypto.subtle))
    throw new w(GQ);
}
function TE() {
  if (VI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.exportKey != "function")
    throw new w(FQ);
}
function qE() {
  if (VI(), typeof globalThis.crypto > "u" || typeof globalThis.crypto.subtle?.sign != "function")
    throw new w(UQ);
}
var gg, Bg;
function Fg() {
  return gg || (gg = SE()), gg;
}
function OE() {
  return Bg || (Bg = GE()), Bg;
}
function xE(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    return !1;
  const I = Fg();
  try {
    return I.encode(A).byteLength === 32;
  } catch {
    return !1;
  }
}
function VE(A) {
  if (
    // Lowest address (32 bytes of zeroes)
    A.length < 32 || // Highest address (32 bytes of 255)
    A.length > 44
  )
    throw new w(wQ, {
      actualLength: A.length
    });
  const C = Fg().encode(A).byteLength;
  if (C !== 32)
    throw new w(DQ, {
      actualLength: C
    });
}
function J(A) {
  return VE(A), A;
}
function IA() {
  return m(
    nA(Fg(), 32),
    (A) => J(A)
  );
}
function h() {
  return tA(OE(), 32);
}
function _E() {
  return wE(IA(), h());
}
function fg() {
  return new Intl.Collator("en", {
    caseFirst: "lower",
    ignorePunctuation: !1,
    localeMatcher: "best fit",
    numeric: !1,
    sensitivity: "variant",
    usage: "sort"
  }).compare;
}
var ZE = 37095705934669439343138083508754565189542113879843219016388785533085940283555n, CA = 57896044618658097711785492504343953926634992332820282019728792003956564819949n, CB = 19681161376707505956807079304988542015446066515923890162744021073123829784752n;
function cA(A) {
  const I = A % CA;
  return I >= 0n ? I : CA + I;
}
function NA(A, I) {
  let g = A;
  for (; I-- > 0n; )
    g *= g, g %= CA;
  return g;
}
function WE(A) {
  const g = A * A % CA * A % CA, C = NA(g, 2n) * g % CA, B = NA(C, 1n) * A % CA, Q = NA(B, 5n) * B % CA, E = NA(Q, 10n) * Q % CA, i = NA(E, 20n) * E % CA, e = NA(i, 40n) * i % CA, o = NA(e, 80n) * e % CA, t = NA(o, 80n) * e % CA, r = NA(t, 10n) * Q % CA;
  return NA(r, 2n) * A % CA;
}
function jE(A, I) {
  const g = cA(I * I * I), C = cA(g * g * I), B = WE(A * C);
  let Q = cA(A * g * B);
  const E = cA(I * Q * Q), i = Q, e = cA(Q * CB), o = E === A, t = E === cA(-A), r = E === cA(-A * CB);
  return o && (Q = i), (t || r) && (Q = e), (cA(Q) & 1n) === 1n && (Q = cA(-Q)), !o && !t ? null : Q;
}
function XE(A, I) {
  const g = cA(A * A), C = cA(g - 1n), B = cA(ZE * g + 1n), Q = jE(C, B);
  if (Q === null)
    return !1;
  const E = (I & 128) !== 0;
  return !(Q === 0n && E);
}
function vE(A) {
  const I = A.toString(16);
  return I.length === 1 ? `0${I}` : I;
}
function zE(A) {
  const g = `0x${A.reduce((C, B, Q) => `${vE(Q === 31 ? B & -129 : B)}${C}`, "")}`;
  return BigInt(g);
}
function PE(A) {
  if (A.byteLength !== 32)
    return !1;
  const I = zE(A);
  return XE(I, A[31]);
}
var QB = 32, EB = 16, $E = [
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
async function Ai({ programAddress: A, seeds: I }) {
  if (bE(), I.length > EB)
    throw new w(dQ, {
      actual: I.length,
      maxSeeds: EB
    });
  let g;
  const C = I.reduce((e, o, t) => {
    const r = typeof o == "string" ? (g ||= new TextEncoder()).encode(o) : o;
    if (r.byteLength > QB)
      throw new w(uQ, {
        actual: r.byteLength,
        index: t,
        maxSeedLength: QB
      });
    return e.push(...r), e;
  }, []), B = _E(), Q = B.encode(A), E = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array([...C, ...Q, ...$E])
  ), i = new Uint8Array(E);
  if (PE(i))
    throw new w(KB);
  return B.decode(i);
}
async function kI({
  programAddress: A,
  seeds: I
}) {
  let g = 255;
  for (; g > 0; )
    try {
      return [await Ai({
        programAddress: A,
        seeds: [...I, new Uint8Array([g])]
      }), g];
    } catch (C) {
      if (tE(C, KB))
        g--;
      else
        throw C;
    }
  throw new w(hQ);
}
async function zB(A) {
  if (TE(), A.type !== "public" || A.algorithm.name !== "Ed25519")
    throw new w(lQ);
  const I = await crypto.subtle.exportKey("raw", A);
  return h().decode(new Uint8Array(I));
}
function PB(A, I, g, C) {
  if (C < I || C > g)
    throw new w(AE, {
      codecDescription: A,
      max: g,
      min: I,
      value: C
    });
}
function $B(A) {
  return A?.endian !== 1;
}
function MI(A) {
  return H({
    fixedSize: A.size,
    write(I, g, C) {
      A.range && PB(A.name, A.range[0], A.range[1], I);
      const B = new ArrayBuffer(A.size);
      return A.set(new DataView(B), I, $B(A.config)), g.set(new Uint8Array(B), C), C + A.size;
    }
  });
}
function FA(A) {
  return gA({
    fixedSize: A.size,
    read(I, g = 0) {
      lE(A.name, I, g), Mg(A.name, A.size, I, g);
      const C = new DataView(WB(I, g, A.size));
      return [A.get(C, $B(A.config)), g + A.size];
    }
  });
}
var cg = (A = {}) => FA({
  config: A,
  get: (I, g) => I.getFloat64(0, g),
  name: "f64",
  size: 8
}), AC = (A = {}) => FA({
  config: A,
  get: (I, g) => {
    const C = g ? 8 : 0, B = g ? 0 : 8, Q = I.getBigInt64(C, g), E = I.getBigUint64(B, g);
    return (Q << 64n) + E;
  },
  name: "i128",
  size: 16
}), iB = (A = {}) => FA({
  config: A,
  get: (I, g) => I.getInt16(0, g),
  name: "i16",
  size: 2
}), Dg = (A = {}) => MI({
  config: A,
  name: "i32",
  range: [-+"0x7fffffff" - 1, +"0x7fffffff"],
  set: (I, g, C) => I.setInt32(0, Number(g), C),
  size: 4
}), dI = (A = {}) => FA({
  config: A,
  get: (I, g) => I.getInt32(0, g),
  name: "i32",
  size: 4
}), VA = () => H({
  getSizeFromValue: (A) => A <= 127 ? 1 : A <= 16383 ? 2 : 3,
  maxSize: 3,
  write: (A, I, g) => {
    PB("shortU16", 0, 65535, A);
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
}), wg = (A = {}) => MI({
  config: A,
  name: "u128",
  range: [0n, BigInt("0xffffffffffffffffffffffffffffffff")],
  set: (I, g, C) => {
    const B = C ? 8 : 0, Q = C ? 0 : 8, E = 0xffffffffffffffffn;
    I.setBigUint64(B, BigInt(g) >> 64n, C), I.setBigUint64(Q, BigInt(g) & E, C);
  },
  size: 16
}), Z = (A = {}) => FA({
  config: A,
  get: (I, g) => {
    const C = g ? 8 : 0, B = g ? 0 : 8, Q = I.getBigUint64(C, g), E = I.getBigUint64(B, g);
    return (Q << 64n) + E;
  },
  name: "u128",
  size: 16
}), f = (A = {}) => FA({
  config: A,
  get: (I, g) => I.getUint16(0, g),
  name: "u16",
  size: 2
}), _I = (A = {}) => MI({
  config: A,
  name: "u32",
  range: [0, +"0xffffffff"],
  set: (I, g, C) => I.setUint32(0, Number(g), C),
  size: 4
}), oA = (A = {}) => FA({
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
}), U = (A = {}) => FA({
  config: A,
  get: (I, g) => I.getBigUint64(0, g),
  name: "u64",
  size: 8
}), QA = () => MI({
  name: "u8",
  range: [0, +"0xff"],
  set: (A, I) => A.setUint8(0, Number(I)),
  size: 1
}), WA = () => FA({
  get: (A) => A.getUint8(0),
  name: "u8",
  size: 1
});
function IC(A, I, g) {
  if (I !== g)
    throw new w(vQ, {
      actual: g,
      codecDescription: A,
      expected: I
    });
}
function Ii(A) {
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
  const g = I.size ?? _I(), C = KI(g, iI(A)), B = KI(g, jA(A)) ?? void 0;
  return H({
    ...C !== null ? { fixedSize: C } : {
      getSizeFromValue: (Q) => (typeof g == "object" ? mA(Q.length, g) : 0) + [...Q].reduce((i, e) => i + mA(e, A), 0),
      maxSize: B
    },
    write: (Q, E, i) => (typeof g == "number" && IC("array", g, Q.length), typeof g == "object" && (i = g.write(Q.length, E, i)), Q.forEach((e) => {
      i = A.write(e, E, i);
    }), i)
  });
}
function bA(A, I = {}) {
  const g = I.size ?? oA(), C = iI(A), B = KI(g, C), Q = KI(g, jA(A)) ?? void 0;
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
        const [n, d] = A.read(E, i);
        i = d, e.push(n);
      }
      return [e, i];
    }
  });
}
function KI(A, I) {
  return typeof A != "number" ? null : A === 0 ? 0 : I === null ? null : I * A;
}
function Ug(A = {}) {
  return m(A.size ?? QA(), (I) => I ? 1 : 0);
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
var gi = () => gA({
  read(A, I) {
    return [A.slice(I).reduce((C, B) => C + B.toString(16).padStart(2, "0"), ""), A.length];
  }
});
function gC(A) {
  return H({
    fixedSize: A.length,
    write: (I, g, C) => (g.set(A, C), C + A.length)
  });
}
function BC(A) {
  return gA({
    fixedSize: A.length,
    read: (I, g) => {
      const C = gi();
      if (!xB(I, A, g))
        throw new w(BE, {
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
function lg(A) {
  const I = KA(A.map(iI)), g = KA(A.map(jA)) ?? void 0;
  return H({
    ...I === null ? {
      getSizeFromValue: (C) => A.map((B, Q) => mA(C[Q], B)).reduce((B, Q) => B + Q, 0),
      maxSize: g
    } : { fixedSize: I },
    write: (C, B, Q) => (IC("tuple", A.length, C.length), A.forEach((E, i) => {
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
function Jg(A, I) {
  const g = QC(A), C = (Q, E, i) => {
    const e = I(Q);
    return dg(A, e), A[e].write(Q, E, i);
  };
  if (g !== null)
    return H({ fixedSize: g, write: C });
  const B = EC(A);
  return H({
    ...B !== null ? { maxSize: B } : {},
    getSizeFromValue: (Q) => {
      const E = I(Q);
      return dg(A, E), mA(Q, A[E]);
    },
    write: C
  });
}
function CC(A, I) {
  const g = QC(A), C = (Q, E) => {
    const i = I(Q, E);
    return dg(A, i), A[i].read(Q, E);
  };
  if (g !== null)
    return gA({ fixedSize: g, read: C });
  const B = EC(A);
  return gA({ ...B !== null ? { maxSize: B } : {}, read: C });
}
function dg(A, I) {
  if (typeof A[I] > "u")
    throw new w(gE, {
      maxRange: A.length - 1,
      minRange: 0,
      variant: I
    });
}
function QC(A) {
  if (A.length === 0) return 0;
  if (!T(A[0])) return null;
  const I = A[0].fixedSize;
  return A.every((C) => T(C) && C.fixedSize === I) ? I : null;
}
function EC(A) {
  return Ii(A.map((I) => jA(I)));
}
function Bi(A, I = {}) {
  const g = I.discriminator ?? "__kind", C = I.size ?? QA();
  return Jg(
    A.map(
      ([, B], Q) => m(lg([C, B]), (E) => [Q, E])
    ),
    (B) => Ci(A, B[g])
  );
}
function iC(A, I = {}) {
  const g = I.discriminator ?? "__kind", C = I.size ?? WA();
  return CC(
    A.map(
      ([B, Q]) => SA(gI([C, Q]), ([, E]) => ({
        [g]: B,
        ...E
      }))
    ),
    (B, Q) => Number(C.read(B, Q)[0])
  );
}
function Ci(A, I) {
  const g = A.findIndex(([C]) => I === C);
  if (g < 0)
    throw new w(PQ, {
      value: I,
      variants: A.map(([C]) => C)
    });
  return g;
}
function eC(A) {
  const I = [...new Set(Object.values(A).filter((E) => typeof E == "number"))].sort(), g = Object.fromEntries(Object.entries(A).slice(I.length)), C = Object.keys(g), B = Object.values(g), Q = [
    .../* @__PURE__ */ new Set([...C, ...B.filter((E) => typeof E == "string")])
  ];
  return { enumKeys: C, enumRecord: g, enumValues: B, numericalValues: I, stringValues: Q };
}
function Qi({
  enumKeys: A,
  enumValues: I,
  variant: g
}) {
  const C = oC(I, (B) => B === g);
  return C >= 0 ? C : A.findIndex((B) => B === g);
}
function Ei({
  discriminator: A,
  enumKeys: I,
  enumValues: g,
  useValuesAsDiscriminators: C
}) {
  return C ? oC(g, (B) => B === A) : A >= 0 && A < I.length ? A : -1;
}
function oC(A, I) {
  let g = A.length;
  for (; g--; )
    if (I(A[g], g, A)) return g;
  return -1;
}
function tC(A) {
  if (A.length === 0) return "";
  let I = [A[0], A[0]];
  const g = [];
  for (let C = 1; C < A.length; C++) {
    const B = A[C];
    I[1] + 1 === B ? I[1] = B : (g.push(I[0] === I[1] ? `${I[0]}` : `${I[0]}-${I[1]}`), I = [B, B]);
  }
  return g.push(I[0] === I[1] ? `${I[0]}` : `${I[0]}-${I[1]}`), g.join(", ");
}
function ii(A, I = {}) {
  const g = I.size ?? QA(), C = I.useValuesAsDiscriminators ?? !1, { enumKeys: B, enumValues: Q, numericalValues: E, stringValues: i } = eC(A);
  if (C && Q.some((e) => typeof e == "string"))
    throw new w(bB, {
      stringValues: Q.filter((e) => typeof e == "string")
    });
  return m(g, (e) => {
    const o = Qi({ enumKeys: B, enumValues: Q, variant: e });
    if (o < 0)
      throw new w($Q, {
        formattedNumericalValues: tC(E),
        numericalValues: E,
        stringValues: i,
        variant: e
      });
    return C ? Q[o] : o;
  });
}
function nC(A, I = {}) {
  const g = I.size ?? WA(), C = I.useValuesAsDiscriminators ?? !1, { enumKeys: B, enumValues: Q, numericalValues: E } = eC(A);
  if (C && Q.some((i) => typeof i == "string"))
    throw new w(bB, {
      stringValues: Q.filter((i) => typeof i == "string")
    });
  return SA(g, (i) => {
    const e = Number(i), o = Ei({
      discriminator: e,
      enumKeys: B,
      enumValues: Q,
      useValuesAsDiscriminators: C
    });
    if (o < 0) {
      const t = C ? E : [...Array(B.length).keys()];
      throw new w(zQ, {
        discriminator: e,
        formattedValidDiscriminators: tC(t),
        validDiscriminators: t
      });
    }
    return Q[o];
  });
}
function ei(A, I) {
  return SA(
    gI([...I, A]),
    (g) => g[g.length - 1]
  );
}
function oi(A, I, g = {}) {
  return SA(
    bA(gI([A, I]), g),
    (C) => new Map(C)
  );
}
function Cg() {
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
function b(A) {
  const I = A.map(([, B]) => B), g = KA(I.map(iI)), C = KA(I.map(jA)) ?? void 0;
  return H({
    ...g === null ? {
      getSizeFromValue: (B) => A.map(([Q, E]) => mA(B[Q], E)).reduce((Q, E) => Q + E, 0),
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
var rC = (A) => ({ __option: "Some", value: A }), aC = () => ({ __option: "None" }), eB = (A) => !!(A && typeof A == "object" && "__option" in A && (A.__option === "Some" && "value" in A || A.__option === "None")), oB = (A) => A.__option === "Some", ti = (A) => A !== null ? rC(A) : aC();
function ZI(A, I = {}) {
  const g = I.prefix === null ? m(Cg(), (B) => {
  }) : Ug({ size: I.prefix ?? QA() }), C = I.noneValue === "zeroes" ? (_B(A), nA(Cg(), A.fixedSize)) : I.noneValue ? gC(I.noneValue) : Cg();
  return Jg(
    [
      m(lg([g, C]), (B) => [
        !1,
        void 0
      ]),
      m(lg([g, A]), (B) => [
        !0,
        eB(B) && oB(B) ? B.value : B
      ])
    ],
    (B) => {
      const Q = eB(B) ? B : ti(B);
      return Number(oB(Q));
    }
  );
}
function V(A, I = {}) {
  const g = I.prefix === null ? SA(xA(), () => !1) : eA({ size: I.prefix ?? WA() }), C = I.noneValue === "zeroes" ? (_B(A), tA(xA(), A.fixedSize)) : I.noneValue ? BC(I.noneValue) : xA();
  return CC(
    [
      SA(gI([g, C]), () => aC()),
      SA(gI([g, A]), ([, B]) => rC(B))
    ],
    (B, Q) => {
      if (I.prefix === null && !I.noneValue)
        return +(Q < B.length);
      if (I.prefix === null && I.noneValue != null) {
        const E = I.noneValue === "zeroes" ? new Uint8Array(C.fixedSize).fill(0) : I.noneValue;
        return xB(B, E, Q) ? 0 : 1;
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
0] = "READONLY", A))(W || {}), ni = 2, ri = 1;
function ZA(A) {
  return A >= 2;
}
function uI(A) {
  return (A & ri) !== 0;
}
function tB(A, I) {
  return A | I;
}
function WI(A) {
  return A | ni;
}
function ai(A) {
  return xE(A);
}
var si = 18446744073709551615n, Qg;
function ci() {
  return Qg || (Qg = U()), Qg;
}
function Di(A) {
  if (A < 0 || A > si)
    throw new w(AQ);
}
function bI(A) {
  return Di(A), A;
}
function wi() {
  return li(ci());
}
function li(A) {
  return SA(
    A,
    (I) => bI(typeof I == "bigint" ? I : BigInt(I))
  );
}
function di(A) {
  return "lifetimeConstraint" in A && typeof A.lifetimeConstraint.blockhash == "string" && typeof A.lifetimeConstraint.lastValidBlockHeight == "bigint" && ai(A.lifetimeConstraint.blockhash);
}
function sC(A, I) {
  return "lifetimeConstraint" in I && I.lifetimeConstraint && "blockhash" in I.lifetimeConstraint && I.lifetimeConstraint.blockhash === A.blockhash && I.lifetimeConstraint.lastValidBlockHeight === A.lastValidBlockHeight ? I : Object.freeze({
    ...I,
    lifetimeConstraint: Object.freeze(A)
  });
}
function ui(A, I, g = I) {
  if (!I.match(new RegExp(`^[${A}]*$`)))
    throw new w(mI, {
      alphabet: A,
      base: A.length,
      value: g
    });
}
var hi = (A) => H({
  getSizeFromValue: (I) => {
    const [g, C] = nB(I, A[0]);
    if (!C) return I.length;
    const B = rB(C, A);
    return g.length + Math.ceil(B.toString(16).length / 2);
  },
  write(I, g, C) {
    if (ui(A, I), I === "") return C;
    const [B, Q] = nB(I, A[0]);
    if (!Q)
      return g.set(new Uint8Array(B.length).fill(0), C), C + B.length;
    let E = rB(Q, A);
    const i = [];
    for (; E > 0n; )
      i.unshift(Number(E % 256n)), E /= 256n;
    const e = [...Array(B.length).fill(0), ...i];
    return g.set(e, C), C + e.length;
  }
});
function nB(A, I) {
  const [g, C] = A.split(new RegExp(`((?!${I}).*)`));
  return [g, C];
}
function rB(A, I) {
  const g = BigInt(I.length);
  let C = 0n;
  for (const B of A)
    C *= g, C += BigInt(I.indexOf(B));
  return C;
}
var Ni = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Ri = () => hi(Ni), Eg;
function yi() {
  if (!Eg) {
    const A = _A(QA(), { size: VA() });
    Eg = b([
      ["lookupTableAddress", IA()],
      ["writableIndexes", A],
      ["readonlyIndexes", A]
    ]);
  }
  return Eg;
}
var ig;
function eg() {
  return ig || (ig = QA()), ig;
}
function ki() {
  return b([
    ["numSignerAccounts", eg()],
    ["numReadonlySignerAccounts", eg()],
    ["numReadonlyNonSignerAccounts", eg()]
  ]);
}
var og;
function Mi() {
  return og || (og = m(
    b([
      ["programAddressIndex", QA()],
      ["accountIndices", _A(QA(), { size: VA() })],
      ["data", ZB(DA(), VA())]
    ]),
    // Convert an instruction to have all fields defined
    (A) => A.accountIndices !== void 0 && A.data !== void 0 ? A : {
      ...A,
      accountIndices: A.accountIndices ?? [],
      data: A.data ?? new Uint8Array(0)
    }
  )), og;
}
var Si = 0, Gi = 128;
function Fi() {
  return H({
    getSizeFromValue: (A) => A === "legacy" ? 0 : 1,
    maxSize: 1,
    write: (A, I, g) => {
      if (A === "legacy")
        return g;
      if (A < 0 || A > 127)
        throw new w(mQ, {
          actualVersion: A
        });
      if (A > Si)
        throw new w(HQ, {
          unsupportedVersion: A
        });
      return I.set([A | Gi], g), g + 1;
    }
  });
}
function aB() {
  return b(cC());
}
function sB() {
  return m(
    b([
      ...cC(),
      ["addressTableLookups", fi()]
    ]),
    (A) => A.version === "legacy" ? A : {
      ...A,
      addressTableLookups: A.addressTableLookups ?? []
    }
  );
}
function cC() {
  const A = Jg(
    [
      // Use a 32-byte constant encoder for a missing lifetime token (index 0).
      gC(new Uint8Array(32)),
      // Use a 32-byte base58 encoder for a valid lifetime token (index 1).
      nA(Ri(), 32)
    ],
    (I) => I === void 0 ? 0 : 1
  );
  return [
    ["version", Fi()],
    ["header", ki()],
    ["staticAccounts", _A(IA(), { size: VA() })],
    ["lifetimeToken", A],
    ["instructions", _A(Mi(), { size: VA() })]
  ];
}
function fi() {
  return _A(yi(), { size: VA() });
}
function Ui() {
  return H({
    getSizeFromValue: (A) => A.version === "legacy" ? aB().getSizeFromValue(A) : sB().getSizeFromValue(A),
    write: (A, I, g) => A.version === "legacy" ? aB().write(A, I, g) : sB().write(A, I, g)
  });
}
function cB(A, I, g) {
  A[I] = g(A[I] ?? { role: W.READONLY });
}
var _ = Symbol("AddressMapTypeProperty");
function Ji(A, I) {
  const g = {
    [A]: { [_]: 0, role: W.WRITABLE_SIGNER }
  }, C = /* @__PURE__ */ new Set();
  for (const B of I) {
    cB(g, B.programAddress, (E) => {
      if (C.add(B.programAddress), _ in E) {
        if (uI(E.role))
          switch (E[_]) {
            case 0:
              throw new w(pQ, {
                programAddress: B.programAddress
              });
            default:
              throw new w(zg, {
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
        cB(g, E.address, (i) => {
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
                const t = tB(i.role, o.role);
                if ("lookupTableAddress" in o) {
                  if (
                    // Consider using the new LOOKUP_TABLE if its address is different...
                    i.lookupTableAddress !== o.lookupTableAddress && // ...and sorts before the existing one.
                    (Q ||= fg())(
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
                const t = tB(i.role, o.role);
                if (
                  // Check to see if this address represents a program that is invoked
                  // in this transaction.
                  C.has(E.address)
                ) {
                  if (uI(o.role))
                    throw new w(
                      zg,
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
function Yi(A) {
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
    return e !== uI(E.role) ? e ? -1 : 1 : (I ||= fg(), B[_] === 1 && E[_] === 1 && B.lookupTableAddress !== E.lookupTableAddress ? I(B.lookupTableAddress, E.lookupTableAddress) : I(C, Q));
  }).map(([C, B]) => ({
    address: C,
    ...B
  }));
}
function Li(A) {
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
  return Object.keys(I).sort(fg()).map((g) => ({
    lookupTableAddress: g,
    ...I[g]
  }));
}
function pi(A) {
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
function mi(A) {
  const I = {};
  for (const [g, C] of A.entries())
    I[C.address] = g;
  return I;
}
function Ki(A, I) {
  const g = mi(I);
  return A.map(({ accounts: C, data: B, programAddress: Q }) => ({
    programAddressIndex: g[Q],
    ...C ? { accountIndices: C.map(({ address: E }) => g[E]) } : null,
    ...B ? { data: B } : null
  }));
}
function bi(A) {
  return "nonce" in A ? A.nonce : A.blockhash;
}
function Hi(A) {
  const I = A.findIndex((C) => "lookupTableAddress" in C);
  return (I === -1 ? A : A.slice(0, I)).map(({ address: C }) => C);
}
function Ti(A) {
  const I = Ji(
    A.feePayer.address,
    A.instructions
  ), g = Yi(I), C = A.lifetimeConstraint;
  return {
    ...A.version !== "legacy" ? { addressTableLookups: Li(g) } : null,
    ...C ? { lifetimeToken: bi(C) } : null,
    header: pi(g),
    instructions: Ki(A.instructions, g),
    staticAccounts: Hi(g),
    version: A.version
  };
}
function qi(A, I, g) {
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
function Oi(A, I) {
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
      const t = qi(
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
function DC(A) {
  return Object.freeze({
    instructions: Object.freeze([]),
    version: A.version
  });
}
var xi = "SysvarRecentB1ockHashes11111111111111111111", Vi = "11111111111111111111111111111111";
function _i(A) {
  return A.programAddress === Vi && // Test for `AdvanceNonceAccount` instruction data
  A.data != null && Zi(A.data) && // Test for exactly 3 accounts
  A.accounts?.length === 3 && // First account is nonce account address
  A.accounts[0].address != null && A.accounts[0].role === W.WRITABLE && // Second account is recent blockhashes sysvar
  A.accounts[1].address === xi && A.accounts[1].role === W.READONLY && // Third account is nonce authority account
  A.accounts[2].address != null && ZA(A.accounts[2].role);
}
function Zi(A) {
  return A.byteLength === 4 && A[0] === 4 && A[1] === 0 && A[2] === 0 && A[3] === 0;
}
function Wi(A) {
  return "lifetimeConstraint" in A && typeof A.lifetimeConstraint.nonce == "string" && A.instructions[0] != null && _i(A.instructions[0]);
}
function wC(A, I) {
  return Object.freeze({
    ...I,
    instructions: Object.freeze([
      ...I.instructions,
      ...A
    ])
  });
}
var lC = (
  // Resist the temptation to convert this to a simple string; As of version 133.0.3, Firefox
  // requires the object form of `AlgorithmIdentifier` and will throw a `DOMException` otherwise.
  Object.freeze({ name: "Ed25519" })
);
async function dC(A, I) {
  qE();
  const g = await crypto.subtle.sign(lC, A, WB(I));
  return new Uint8Array(g);
}
async function ji() {
  return await HE(), await crypto.subtle.generateKey(
    /* algorithm */
    lC,
    // Native implementation status: https://github.com/WICG/webcrypto-secure-curves/issues/20
    /* extractable */
    !1,
    // Prevents the bytes of the private key from being visible to JS.
    /* allowed uses */
    ["sign", "verify"]
  );
}
function Xi(A) {
  const I = Object.values(A);
  if (I.length === 0)
    throw new w(bQ);
  return I.map((g) => g || new Uint8Array(64).fill(0));
}
function vi() {
  return m(
    _A(nA(DA(), 64), { size: VA() }),
    Xi
  );
}
function uC() {
  return b([
    ["signatures", vi()],
    ["messageBytes", DA()]
  ]);
}
function zi(A) {
  const I = Ti(A), g = Ui().encode(I), C = I.staticAccounts.slice(0, I.header.numSignerAccounts), B = {};
  for (const E of C)
    B[E] = null;
  let Q;
  return di(A) ? Q = {
    blockhash: A.lifetimeConstraint.blockhash,
    lastValidBlockHeight: A.lifetimeConstraint.lastValidBlockHeight
  } : Wi(A) && (Q = {
    nonce: A.lifetimeConstraint.nonce,
    nonceAccountAddress: A.instructions[0].accounts[0].address
  }), Object.freeze({
    ...Q ? { lifetimeConstraint: Q } : void 0,
    messageBytes: g,
    signatures: Object.freeze(B)
  });
}
async function Pi(A, I) {
  let g, C;
  if (await Promise.all(
    A.map(async (B) => {
      const Q = await zB(B.publicKey), E = I.signatures[Q];
      if (E === void 0) {
        C ||= /* @__PURE__ */ new Set(), C.add(Q);
        return;
      }
      if (C)
        return;
      const i = await dC(B.privateKey, I.messageBytes);
      E !== null && VB(i, E) || (g ||= {}, g[Q] = i);
    })
  ), C && C.size > 0) {
    const B = Object.keys(I.signatures);
    throw new w(KQ, {
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
function $i(A) {
  return JSON.parse(Ae(A), (I, g) => Ce(g) ? Be(g) : g);
}
function Ae(A) {
  const I = [];
  let g = !1;
  for (let C = 0; C < A.length; C++) {
    let B = !1;
    if (A[C] === "\\" && (I.push(A[C++]), B = !B), A[C] === '"') {
      I.push(A[C]), B || (g = !g);
      continue;
    }
    if (!g) {
      const Q = Ie(A, C);
      if (Q?.length) {
        C += Q.length - 1, Q.match(/\.|[eE]-/) ? I.push(Q) : I.push(ge(Q));
        continue;
      }
    }
    I.push(A[C]);
  }
  return I.join("");
}
function Ie(A, I) {
  const g = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;
  if (!A[I]?.match(/[-\d]/))
    return null;
  const C = A.slice(I).match(g);
  return C ? C[0] : null;
}
function ge(A) {
  return `{"$n":"${A}"}`;
}
function Be({ $n: A }) {
  if (A.match(/[eE]/)) {
    const [I, g] = A.split(/[eE]/);
    return BigInt(I) * BigInt(10) ** BigInt(g);
  }
  return BigInt(A);
}
function Ce(A) {
  return !!A && typeof A == "object" && "$n" in A && typeof A.$n == "string";
}
var DB = 0n;
function Qe() {
  const A = DB;
  return DB++, A.toString();
}
function Ee(A) {
  return {
    id: Qe(),
    jsonrpc: "2.0",
    method: A.methodName,
    params: A.params
  };
}
function ie(A, I) {
  return oe(
    JSON.stringify(A, (g, C) => typeof C == "bigint" ? ee(C) : C, I)
  );
}
function ee(A) {
  return { $n: `${A}` };
}
function oe(A) {
  return A.replace(/\{\s*"\$n"\s*:\s*"(-?\d+)"\s*\}/g, "$1");
}
function te(A) {
  return ne(A);
}
function ne(A) {
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
            throw new w(EE, {
              method: Q,
              params: B
            });
          const i = E(...B);
          return re(A, i);
        };
    }
  });
}
function re({ transport: A }, I) {
  return {
    async send(g) {
      return await I.execute({ signal: g?.abortSignal, transport: A });
    }
  };
}
function ae(A) {
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
            const t = Ee(i), r = await o({ payload: t, signal: e });
            return A?.responseTransformer ? A.responseTransformer(r, i) : r;
          }
        });
      };
    }
  });
}
function hC(A) {
  return A == null || typeof A != "object" || Array.isArray(A) ? !1 : "jsonrpc" in A && A.jsonrpc === "2.0" && "method" in A && typeof A.method == "string" && "params" in A;
}
function se(A) {
  return typeof A == "bigint" ? (
    // FIXME(solana-labs/solana/issues/30341) Create a data type to represent u64 in the Solana
    // JSON RPC implementation so that we can throw away this entire patcher instead of unsafely
    // downcasting `bigints` to `numbers`.
    Number(A)
  ) : A;
}
var D = {};
function NC(A) {
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
function RC(A, I) {
  return (g) => {
    const C = NC(A);
    return Object.freeze({
      ...g,
      params: C(g.params, I)
    });
  };
}
function yC(A, I) {
  return (g) => NC(A)(g, I);
}
function ce() {
  return RC([se], { keyPath: [] });
}
function De({
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
function we({
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
      params: De({
        commitmentPropertyName: B === "sendTransaction" ? "preflightCommitment" : "commitment",
        optionsObjectPositionInParams: Q,
        overrideCommitment: A,
        params: C
      })
    });
  };
}
function le(A) {
  return (I, { keyPath: g }) => (typeof I == "bigint" && A && (I > Number.MAX_SAFE_INTEGER || I < -Number.MAX_SAFE_INTEGER) && A(g, I), I);
}
function de(A) {
  return (I) => RC(
    [le((...C) => A(I, ...C))],
    { keyPath: [] }
  )(I);
}
var ue = {
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
function he(A) {
  const I = A?.onIntegerOverflow;
  return (g) => SI(
    g,
    I ? de(I) : (C) => C,
    ce(),
    we({
      defaultCommitment: A?.defaultCommitment,
      optionsObjectPositionByMethod: ue
    })
  );
}
function kC(A) {
  return function(g, { keyPath: C }) {
    return typeof g == "number" && Number.isInteger(g) || typeof g == "bigint" ? Ne(C, A) ? Number(g) : BigInt(g) : g;
  };
}
function Ne(A, I) {
  return I.some((g) => {
    if (g.length !== A.length)
      return !1;
    for (let C = A.length - 1; C >= 0; C--) {
      const B = A[C], Q = g[C];
      if (Q !== B && (Q !== D || typeof B != "number"))
        return !1;
    }
    return !0;
  });
}
function Re(A) {
  return yC([kC(A)], { keyPath: [] });
}
function ye() {
  return (A) => A.result;
}
var ug = [
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
], DI = [
  ...ug,
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
], YI = [
  ["index"],
  ["instructions", D, "accounts", D],
  ["instructions", D, "programIdIndex"],
  ["instructions", D, "stackHeight"]
], wB = [
  ["addressTableLookups", D, "writableIndexes", D],
  ["addressTableLookups", D, "readonlyIndexes", D],
  ["header", "numReadonlySignedAccounts"],
  ["header", "numReadonlyUnsignedAccounts"],
  ["header", "numRequiredSignatures"],
  ["instructions", D, "accounts", D],
  ["instructions", D, "programIdIndex"],
  ["instructions", D, "stackHeight"]
];
function ke() {
  return [
    ["loadedAccountsDataSize"],
    ...DI.map((A) => ["accounts", D, ...A]),
    ...YI.map((A) => ["innerInstructions", D, ...A])
  ];
}
function Me() {
  return (A, I) => {
    const g = A;
    if ("error" in g) {
      const { error: C } = g;
      if (C && typeof C == "object" && "code" in C && (C.code === -32002 || C.code === -32002n) && "data" in C && C.data) {
        const E = yC(
          [kC(ke())],
          { keyPath: [] }
        )(C.data), i = { ...C, data: E };
        throw sg(i);
      }
      throw sg(g.error);
    }
    return g;
  };
}
function Se(A) {
  return (I, g) => {
    const C = g.methodName, B = A?.allowedNumericKeyPaths && C ? A.allowedNumericKeyPaths[C] : void 0;
    return SI(
      I,
      (Q) => Me()(Q),
      (Q) => ye()(Q),
      (Q) => Re(B ?? [])(Q)
    );
  };
}
function Ge(A) {
  return ae({
    requestTransformer: he(A),
    responseTransformer: Se({
      allowedNumericKeyPaths: Fe()
    })
  });
}
var tg;
function Fe() {
  return tg || (tg = {
    getAccountInfo: DI.map((A) => ["value", ...A]),
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
      ...YI.map((A) => [
        "transactions",
        D,
        "meta",
        "innerInstructions",
        D,
        ...A
      ]),
      ...wB.map((A) => ["transactions", D, "transaction", "message", ...A]),
      ["rewards", D, "commission"]
    ],
    getClusterNodes: [
      [D, "featureSet"],
      [D, "shredVersion"]
    ],
    getInflationGovernor: [["initial"], ["foundation"], ["foundationTerm"], ["taper"], ["terminal"]],
    getInflationRate: [["foundation"], ["total"], ["validator"]],
    getInflationReward: [[D, "commission"]],
    getMultipleAccounts: DI.map((A) => ["value", D, ...A]),
    getProgramAccounts: DI.flatMap((A) => [
      ["value", D, "account", ...A],
      [D, "account", ...A]
    ]),
    getRecentPerformanceSamples: [[D, "samplePeriodSecs"]],
    getTokenAccountBalance: [
      ["value", "decimals"],
      ["value", "uiAmount"]
    ],
    getTokenAccountsByDelegate: ug.map((A) => [
      "value",
      D,
      "account",
      ...A
    ]),
    getTokenAccountsByOwner: ug.map((A) => [
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
      ...YI.map((A) => ["meta", "innerInstructions", D, ...A]),
      ...wB.map((A) => ["transaction", "message", ...A])
    ],
    getVersion: [["feature-set"]],
    getVoteAccounts: [
      ["current", D, "commission"],
      ["delinquent", D, "commission"]
    ],
    simulateTransaction: [
      ["value", "loadedAccountsDataSize"],
      ...DI.map((A) => ["value", "accounts", D, ...A]),
      ...YI.map((A) => ["value", "innerInstructions", D, ...A])
    ]
  }), tg;
}
function fe(A) {
  const I = {};
  for (const g in A)
    I[g.toLowerCase()] = A[g];
  return I;
}
function Ue(A) {
  const { fromJson: I, headers: g, toJson: C, url: B } = A;
  let Q;
  const E = g && fe(g);
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
      throw new w(QE, {
        headers: n.headers,
        message: n.statusText,
        statusCode: n.status
      });
    return I ? I(await n.text(), e) : await n.json();
  };
}
var Je = [
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
function lB(A) {
  return hC(A) && Je.includes(A.method);
}
function Ye(A) {
  return Ue({
    ...A,
    fromJson: (I, g) => lB(g) ? $i(I) : JSON.parse(I),
    toJson: (I) => lB(I) ? ie(I) : JSON.stringify(I)
  });
}
var Le = Object.prototype.toString, pe = Object.keys || function(A) {
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
      if (e = Le.call(A), e === "[object Array]") {
        for (B = "[", C = A.length - 1, g = 0; g < C; g++)
          B += wI(A[g], !0) + ",";
        return C > -1 && (B += wI(A[g], !0)), B + "]";
      } else if (e === "[object Object]") {
        for (Q = pe(A).sort(), C = Q.length, B = "", g = 0; g < C; )
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
function me(A) {
  const I = wI(A, !1);
  if (I !== void 0)
    return "" + I;
}
function MC(A, I, g) {
  let C = "";
  if (typeof I[0] == "number") {
    const E = I[0] + 1, i = E % 10, e = E % 100;
    i == 1 && e != 11 ? C = E + "st" : i == 2 && e != 12 ? C = E + "nd" : i == 3 && e != 13 ? C = E + "rd" : C = E + "th";
  } else
    C = `\`${I[0].toString()}\``;
  const B = I.length > 1 ? I.slice(1).map((E) => typeof E == "number" ? `[${E}]` : E).join(".") : void 0, Q = new w(CE, {
    argumentLabel: C,
    keyPath: I,
    methodName: A,
    optionalPathLabel: B ? ` at path \`${B}\`` : "",
    value: g,
    ...B !== void 0 ? { path: B } : void 0
  });
  return kg(Q, MC), Q;
}
var Ke = {
  defaultCommitment: "confirmed",
  onIntegerOverflow(A, I, g) {
    throw MC(A.methodName, I, g);
  }
}, be = globalThis.AbortController, dB;
function uB() {
  return {};
}
function He(A, I) {
  let g;
  return async function(B) {
    const { payload: Q, signal: E } = B, i = I(Q);
    if (i === void 0)
      return await A(B);
    if (g || (queueMicrotask(() => {
      g = void 0;
    }), g = {}), g[i] == null) {
      const o = new be(), t = (async () => {
        try {
          return await A({
            ...B,
            signal: o.signal
          });
        } catch (r) {
          if (r === (dB ||= uB()))
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
        const n = (d) => {
          E.removeEventListener("abort", n), e.numConsumers -= 1, queueMicrotask(() => {
            e.numConsumers === 0 && e.abortController.abort(dB ||= uB());
          }), r(d.target.reason);
        };
        E.addEventListener("abort", n), o.then(t).catch(r).finally(() => {
          E.removeEventListener("abort", n);
        });
      });
    } else
      return await e.responsePromise;
  };
}
function Te(A) {
  return hC(A) ? me([A.method, A.params]) : void 0;
}
function qe(A) {
  const I = {};
  for (const g in A)
    I[g.toLowerCase()] = A[g];
  return I;
}
function Oe(A) {
  return SI(
    Ye({
      ...A,
      headers: {
        ...A.headers ? qe(A.headers) : void 0,
        // Keep these headers lowercase so they will override any user-supplied headers above.
        "solana-client": "js/5.5.1"
      }
    }),
    (I) => He(I, Te)
  );
}
function xe(A) {
  return te({
    api: Ge(Ke),
    transport: A
  });
}
function Yg(A) {
  const I = {};
  return A.forEach((g) => {
    if (!I[g.address])
      I[g.address] = g;
    else if (I[g.address] !== g)
      throw new w(LQ, {
        address: g.address
      });
  }), Object.values(I);
}
function jI(A) {
  return "modifyAndSignTransactions" in A && typeof A.modifyAndSignTransactions == "function";
}
function hI(A) {
  return "signTransactions" in A && typeof A.signTransactions == "function";
}
function SC(A) {
  return "signAndSendTransactions" in A && typeof A.signAndSendTransactions == "function";
}
function eI(A) {
  return hI(A) || jI(A) || SC(A);
}
function Ve(A) {
  return Yg(
    (A.accounts ?? []).flatMap((I) => "signer" in I ? I.signer : [])
  );
}
function _e(A) {
  return Yg([
    ...A.feePayer && eI(A.feePayer) ? [A.feePayer] : [],
    ...A.instructions.flatMap(Ve)
  ]);
}
function GC(A, I) {
  Object.freeze(A);
  const g = { ...I, feePayer: A };
  return Object.freeze(g), g;
}
async function Ze(A) {
  const I = await zB(A.publicKey);
  return Object.freeze({
    address: I,
    keyPair: A,
    signMessages: (C) => Promise.all(
      C.map(
        async (B) => Object.freeze({ [I]: await dC(A.privateKey, B.content) })
      )
    ),
    signTransactions: (C) => Promise.all(
      C.map(async (B) => {
        const Q = await Pi([A], B);
        return Object.freeze({ [I]: Q.signatures[I] });
      })
    )
  });
}
async function FC() {
  return await Ze(await ji());
}
function XA(A) {
  return Object.freeze({
    address: A,
    signMessages: (g) => Promise.resolve(g.map(() => Object.freeze({}))),
    signTransactions: (g) => Promise.resolve(g.map(() => Object.freeze({})))
  });
}
async function fC(A, I) {
  const { partialSigners: g, modifyingSigners: C } = We(
    Yg(_e(A).filter(eI)),
    { identifySendingSigner: !1 }
  );
  return await ve(
    A,
    C,
    g,
    I
  );
}
function We(A, I = {}) {
  const C = I.identifySendingSigner ?? !0 ? je(A) : null, B = A.filter(
    (i) => i !== C && (jI(i) || hI(i))
  ), Q = Xe(B), E = B.filter(hI).filter((i) => !Q.includes(i));
  return Object.freeze({ modifyingSigners: Q, partialSigners: E, sendingSigner: C });
}
function je(A) {
  const I = A.filter(SC);
  if (I.length === 0) return null;
  const g = I.filter(
    (C) => !jI(C) && !hI(C)
  );
  return g.length > 0 ? g[0] : I[0];
}
function Xe(A) {
  const I = A.filter(jI);
  if (I.length === 0) return [];
  const g = I.filter((C) => !hI(C));
  return g.length > 0 ? g : [I[0]];
}
async function ve(A, I = [], g = [], C) {
  const B = zi(A), Q = await I.reduce(
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
async function ze(A, I, g) {
  if (A.length === 0)
    return {};
  const C = await mE(
    I,
    A,
    g
  );
  return LE(C), yI(C), C.reduce((B, Q) => ({
    ...B,
    [Q.address]: Q.data.addresses
  }), {});
}
var Lg = "11111111111111111111111111111111";
function Pe(A) {
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
      address: Pe(g.value),
      role: hB(g.value) ? WI(C) : C,
      ...hB(g.value) ? { signer: g.value } : {}
    });
  };
}
function hB(A) {
  return !!A && typeof A == "object" && "address" in A && eI(A);
}
var $e = 0;
function Ao() {
  return m(
    b([
      ["discriminator", _I()],
      ["lamports", yA()],
      ["space", yA()],
      ["programAddress", IA()]
    ]),
    (A) => ({ ...A, discriminator: $e })
  );
}
function Io(A, I) {
  const g = Lg, B = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    newAccount: { value: A.newAccount ?? null, isWritable: !0 }
  }, Q = { ...A }, E = [Number(Q.space) + JE].reduce(
    (e, o) => e + o,
    0
  ), i = pg();
  return Object.freeze({
    accounts: [
      i(B.payer),
      i(B.newAccount)
    ],
    byteDelta: E,
    data: Ao().encode(
      Q
    ),
    programAddress: g
  });
}
var go = 3;
function Bo() {
  return m(
    b([
      ["discriminator", _I()],
      ["base", IA()],
      ["seed", ZB(UE(), yA())],
      ["amount", yA()],
      ["space", yA()],
      ["programAddress", IA()]
    ]),
    (A) => ({
      ...A,
      discriminator: go
    })
  );
}
function Co(A, I) {
  const g = Lg, B = {
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
    data: Bo().encode(
      Q
    ),
    programAddress: g
  });
}
var Qo = 2;
function Eo() {
  return m(
    b([
      ["discriminator", _I()],
      ["amount", yA()]
    ]),
    (A) => ({ ...A, discriminator: Qo })
  );
}
function io(A, I) {
  const g = Lg, B = {
    source: { value: A.source ?? null, isWritable: !0 },
    destination: { value: A.destination ?? null, isWritable: !0 }
  }, Q = { ...A }, E = pg();
  return Object.freeze({
    accounts: [
      E(B.source),
      E(B.destination)
    ],
    data: Eo().encode(
      Q
    ),
    programAddress: g
  });
}
var eo = J(
  "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
), oo = J(
  "2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ"
);
J(
  "FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR"
);
J(
  "iwhrLHdsgrvmnwU8GF2FSmyabSMjfHwFGJAX2ufJ3ZN"
);
J(
  "8pm8erUsaMpmZ47LttHAPgnDx7xGZUvxY4q47vTCs5Nj"
);
var to = {
  /** The mutable whirlpool program on Solana Mainnet, paired with its mainnet config account. */
  mainnet: {
    programId: eo,
    configAddress: oo
  }
}, HA = to.mainnet, UC = /* @__PURE__ */ ((A) => (A[A.TransferHookA = 0] = "TransferHookA", A[A.TransferHookB = 1] = "TransferHookB", A[A.TransferHookReward = 2] = "TransferHookReward", A[A.TransferHookInput = 3] = "TransferHookInput", A[A.TransferHookIntermediate = 4] = "TransferHookIntermediate", A[A.TransferHookOutput = 5] = "TransferHookOutput", A[A.SupplementalTickArrays = 6] = "SupplementalTickArrays", A[A.SupplementalTickArraysOne = 7] = "SupplementalTickArraysOne", A[A.SupplementalTickArraysTwo = 8] = "SupplementalTickArraysTwo", A[A.TransferHookDepositA = 9] = "TransferHookDepositA", A[A.TransferHookDepositB = 10] = "TransferHookDepositB", A[A.TransferHookWithdrawalA = 11] = "TransferHookWithdrawalA", A[A.TransferHookWithdrawalB = 12] = "TransferHookWithdrawalB", A))(UC || {});
function no() {
  return ii(UC);
}
function ro() {
  return iC([
    ["Uninitialized", xA()],
    [
      "Initialized",
      y([
        ["fields", gI([ao()])]
      ])
    ]
  ]);
}
function ao() {
  return y([
    ["liquidityNet", AC()],
    ["liquidityGross", Z()],
    ["feeGrowthOutsideA", Z()],
    ["feeGrowthOutsideB", Z()],
    ["rewardGrowthsOutside", bA(Z(), { size: 3 })]
  ]);
}
function so() {
  return Bi([
    [
      "ByTokenAmounts",
      b([
        ["tokenMaxA", yA()],
        ["tokenMaxB", yA()],
        ["minSqrtPrice", wg()],
        ["maxSqrtPrice", wg()]
      ])
    ]
  ]);
}
function co(A, I) {
  return Array.isArray(I) ? { __kind: A, fields: I } : { __kind: A, ...I ?? {} };
}
function Do() {
  return y([
    ["growthInsideCheckpoint", Z()],
    ["amountOwed", U()]
  ]);
}
function XI() {
  return b([
    ["slices", _A(wo())]
  ]);
}
function wo() {
  return b([
    ["accountsType", no()],
    ["length", QA()]
  ]);
}
function lo() {
  return y([
    ["initialized", eA()],
    ["liquidityNet", AC()],
    ["liquidityGross", Z()],
    ["feeGrowthOutsideA", Z()],
    ["feeGrowthOutsideB", Z()],
    ["rewardGrowthsOutside", bA(Z(), { size: 3 })]
  ]);
}
function uo() {
  return y([
    ["mint", h()],
    ["vault", h()],
    ["extension", tA(dA(), 32)],
    ["emissionsPerSecondX64", Z()],
    ["growthGlobalX64", Z()]
  ]);
}
var ho = new Uint8Array([
  17,
  216,
  246,
  142,
  225,
  199,
  218,
  56
]);
function No() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["startTickIndex", dI()],
    ["whirlpool", h()],
    ["tickBitmap", Z()],
    ["ticks", bA(ro(), { size: 88 })]
  ]);
}
function Ro(A) {
  return GA(
    A,
    No()
  );
}
var yo = new Uint8Array([
  69,
  97,
  189,
  190,
  110,
  7,
  66,
  187
]);
function ko() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["startTickIndex", dI()],
    ["ticks", bA(lo(), { size: 88 })],
    ["whirlpool", h()]
  ]);
}
function Mo(A) {
  return GA(
    A,
    ko()
  );
}
function So() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["whirlpool", h()],
    ["positionMint", h()],
    ["liquidity", Z()],
    ["tickLowerIndex", dI()],
    ["tickUpperIndex", dI()],
    ["feeGrowthCheckpointA", Z()],
    ["feeOwedA", U()],
    ["feeGrowthCheckpointB", Z()],
    ["feeOwedB", U()],
    [
      "rewardInfos",
      bA(Do(), { size: 3 })
    ]
  ]);
}
function hg(A) {
  return GA(
    A,
    So()
  );
}
async function JC(A, I, g) {
  const C = await Go(A, I, g);
  return xI(C), C;
}
async function Go(A, I, g) {
  const C = await Gg(A, I, g);
  return hg(C);
}
function Fo() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["positionBundleMint", h()],
    ["positionBitmap", tA(dA(), 32)]
  ]);
}
function fo(A) {
  return GA(
    A,
    Fo()
  );
}
function Uo() {
  return y([
    ["discriminator", tA(dA(), 8)],
    ["whirlpoolsConfig", h()],
    ["whirlpoolBump", tA(dA(), 1)],
    ["tickSpacing", f()],
    ["feeTierIndexSeed", tA(dA(), 2)],
    ["feeRate", f()],
    ["protocolFeeRate", f()],
    ["liquidity", Z()],
    ["sqrtPrice", Z()],
    ["tickCurrentIndex", dI()],
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
      bA(uo(), { size: 3 })
    ]
  ]);
}
function YC(A) {
  return GA(
    A,
    Uo()
  );
}
async function mg(A, I, g) {
  const C = await Jo(A, I, g);
  return xI(C), C;
}
async function Jo(A, I, g) {
  const C = await Gg(A, I, g);
  return YC(C);
}
async function LC(A, I, g) {
  const C = await Yo(A, I, g);
  return yI(C), C;
}
async function Yo(A, I, g) {
  return (await EI(A, I, g)).map((B) => YC(B));
}
var fA = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";
function Lo(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function UA(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const C = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: Lo(g.value),
      role: NB(g.value) ? WI(C) : C,
      ...NB(g.value) ? { signer: g.value } : {}
    });
  };
}
function NB(A) {
  return !!A && typeof A == "object" && "address" in A && eI(A);
}
var po = new Uint8Array([
  123,
  134,
  81,
  0,
  49,
  68,
  98,
  98
]);
function mo() {
  return m(
    b([["discriminator", nA(DA(), 8)]]),
    (A) => ({ ...A, discriminator: po })
  );
}
function Ko(A, I) {
  const g = I?.programAddress ?? fA, B = {
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
  const Q = UA(g);
  return Object.freeze({
    accounts: [
      Q(B.positionAuthority),
      Q(B.receiver),
      Q(B.position),
      Q(B.positionMint),
      Q(B.positionTokenAccount),
      Q(B.tokenProgram)
    ],
    data: mo().encode({}),
    programAddress: g
  });
}
var bo = new Uint8Array([1, 182, 135, 59, 155, 25, 99, 223]);
function Ho() {
  return m(
    b([["discriminator", nA(DA(), 8)]]),
    (A) => ({
      ...A,
      discriminator: bo
    })
  );
}
function To(A, I) {
  const g = I?.programAddress ?? fA, B = {
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
  const Q = UA(g);
  return Object.freeze({
    accounts: [
      Q(B.positionAuthority),
      Q(B.receiver),
      Q(B.position),
      Q(B.positionMint),
      Q(B.positionTokenAccount),
      Q(B.token2022Program)
    ],
    data: Ho().encode(
      {}
    ),
    programAddress: g
  });
}
var qo = new Uint8Array([
  207,
  117,
  95,
  191,
  229,
  180,
  226,
  15
]);
function Oo() {
  return m(
    b([
      ["discriminator", nA(DA(), 8)],
      [
        "remainingAccountsInfo",
        ZI(XI())
      ]
    ]),
    (A) => ({ ...A, discriminator: qo })
  );
}
function pC(A, I) {
  const g = I?.programAddress ?? fA, B = {
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
  const E = UA(g);
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
    data: Oo().encode(
      Q
    ),
    programAddress: g
  });
}
var xo = new Uint8Array([
  177,
  107,
  37,
  180,
  160,
  19,
  49,
  209
]);
function Vo() {
  return m(
    b([
      ["discriminator", nA(DA(), 8)],
      ["rewardIndex", QA()],
      [
        "remainingAccountsInfo",
        ZI(XI())
      ]
    ]),
    (A) => ({ ...A, discriminator: xo })
  );
}
function mC(A, I) {
  const g = I?.programAddress ?? fA, B = {
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
  const E = UA(g);
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
    data: Vo().encode(
      Q
    ),
    programAddress: g
  });
}
var _o = new Uint8Array([
  58,
  127,
  188,
  62,
  79,
  82,
  196,
  96
]);
function Zo() {
  return m(
    b([
      ["discriminator", nA(DA(), 8)],
      ["liquidityAmount", wg()],
      ["tokenMinA", yA()],
      ["tokenMinB", yA()],
      [
        "remainingAccountsInfo",
        ZI(XI())
      ]
    ]),
    (A) => ({
      ...A,
      discriminator: _o
    })
  );
}
function Wo(A, I) {
  const g = I?.programAddress ?? fA, B = {
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
  const E = UA(g);
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
    data: Zo().encode(
      Q
    ),
    programAddress: g
  });
}
var jo = new Uint8Array([239, 251, 9, 124, 210, 198, 53, 43]);
function Xo() {
  return m(
    b([
      ["discriminator", nA(DA(), 8)],
      ["method", so()],
      [
        "remainingAccountsInfo",
        ZI(XI())
      ]
    ]),
    (A) => ({
      ...A,
      discriminator: jo
    })
  );
}
function vo(A, I) {
  const g = I?.programAddress ?? fA, B = {
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
  const E = UA(g);
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
    data: Xo().encode(
      Q
    ),
    programAddress: g
  });
}
var zo = new Uint8Array([
  41,
  33,
  165,
  200,
  120,
  231,
  142,
  50
]);
function Po() {
  return m(
    b([
      ["discriminator", nA(DA(), 8)],
      ["startTickIndex", Dg()],
      ["idempotent", Ug()]
    ]),
    (A) => ({
      ...A,
      discriminator: zo
    })
  );
}
function RB(A, I) {
  const g = I?.programAddress ?? fA, B = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !1 },
    funder: { value: A.funder ?? null, isWritable: !0 },
    tickArray: { value: A.tickArray ?? null, isWritable: !0 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 }
  }, Q = { ...A };
  B.systemProgram.value || (B.systemProgram.value = "11111111111111111111111111111111");
  const E = UA(g);
  return Object.freeze({
    accounts: [
      E(B.whirlpool),
      E(B.funder),
      E(B.tickArray),
      E(B.systemProgram)
    ],
    data: Po().encode(
      Q
    ),
    programAddress: g
  });
}
var $o = new Uint8Array(
  [212, 47, 95, 92, 114, 102, 131, 250]
);
function At() {
  return m(
    b([
      ["discriminator", nA(DA(), 8)],
      ["tickLowerIndex", Dg()],
      ["tickUpperIndex", Dg()],
      ["withTokenMetadataExtension", Ug()]
    ]),
    (A) => ({
      ...A,
      discriminator: $o
    })
  );
}
function It(A, I) {
  const g = I?.programAddress ?? fA, B = {
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
  const E = UA(g);
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
    data: At().encode(
      Q
    ),
    programAddress: g
  });
}
var gt = new Uint8Array([
  154,
  230,
  250,
  13,
  236,
  209,
  75,
  223
]);
function Bt() {
  return m(
    b([["discriminator", nA(DA(), 8)]]),
    (A) => ({
      ...A,
      discriminator: gt
    })
  );
}
function Ct(A, I) {
  const g = I?.programAddress ?? fA, B = {
    whirlpool: { value: A.whirlpool ?? null, isWritable: !0 },
    position: { value: A.position ?? null, isWritable: !0 },
    tickArrayLower: { value: A.tickArrayLower ?? null, isWritable: !1 },
    tickArrayUpper: { value: A.tickArrayUpper ?? null, isWritable: !1 }
  }, Q = UA(g);
  return Object.freeze({
    accounts: [
      Q(B.whirlpool),
      Q(B.position),
      Q(B.tickArrayLower),
      Q(B.tickArrayUpper)
    ],
    data: Bt().encode({}),
    programAddress: g
  });
}
var KC = U().decode(
  yo
), Qt = U().decode(
  ho
);
function Et(A) {
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
function yB(A) {
  if ("exists" in A && !A.exists)
    return A;
  const g = U().decode(
    A.data.discriminator.subarray(0, 8)
  ) === KC ? "Fixed" : "Dynamic";
  return {
    ...A,
    data: {
      __kind: g,
      ...A.data,
      ticks: A.data.ticks.map(Et)
    }
  };
}
function it(A) {
  if ("exists" in A && !A.exists)
    return A;
  const I = U().decode(
    A.data.subarray(0, 8)
  );
  switch (I) {
    case KC:
      return yB(Mo(A));
    case Qt:
      return yB(Ro(A));
    default:
      throw new Error(`Unknown discriminator: ${I}`);
  }
}
async function bC(A, I, g) {
  const C = await HC(A, I, g);
  return yI(C), C;
}
async function HC(A, I, g) {
  return (await EI(A, I, g)).map((B) => it(B));
}
async function vI(A, I = HA.programId) {
  return await kI({
    programAddress: I,
    seeds: ["position", IA().encode(A)]
  });
}
async function et(A, I = HA.programId) {
  return await kI({
    programAddress: I,
    seeds: ["position_bundle", IA().encode(A)]
  });
}
async function ot(A, I, g = HA.programId) {
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
function kB() {
  return 148;
}
var tt = "SysvarRent111111111111111111111111111111111";
async function nt(A, I, g) {
  return await Gg(A, I, g);
}
function rt() {
  return y([
    ["lamportsPerByteYear", wi()],
    ["exemptionThreshold", cg()],
    ["burnPercent", WA()]
  ]);
}
async function at(A, I) {
  const g = await nt(A, tt, I);
  return xI(g), GA(g, rt()).data;
}
const st = "data:application/wasm;base64,AGFzbQEAAAABjAM0YAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gAX8AYAN/f38AYAABf2AFf39/f38AYAR/f39/AGADf35/AGAFf39/fn8AYAh/f39/f39/fwBgCH9+f39/f39/AGAEf39/fwF/YAV/fn5+fgBgBH9+fn8AYAN8f38Bf2ADf39/AXxgBX9/f39/AX9gAX4Bf2AIf35+fn5+fn8AYAZ/f39/f38Bf2AKf35/f39/f35/fwBgBn9+fn5+fgBgBn9/f39/fwBgAXwBf2ABfwF8YAJ+fgF/YAJ8fAF8YAh/fn9/f39+fwBgCX9/f39/fn9/fwBgB39/f39/f38AYAF8AXxgCX9/f39/f35+fgBgCH9+fn5+f39/AGADfn9/AX9gB39/f39/f38Bf2ADf35+AGADf35/AX9gAn9/AXxgAABgCX9+fn5+fn5/fwBgA39/fABgBX9/fX9/AGAEf31/fwBgBX9/fn9/AGAEf35/fwBgBX9/fH9/AGAEf3x/fwBgBH9/fn4AYAN8f38BfGAAAX4C1BoxKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmluZGdlbl9vYmplY3RfZHJvcF9yZWYABCguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fc3RyaW5nX25ldwAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMcX193YmluZGdlbl9iaWdpbnRfZ2V0X2FzX2k2NAABKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzEF9fd2JpbmRnZW5fdGhyb3cAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzEV9fd2JpbmRnZW5fbWVtb3J5AAYoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxVfX3diaW5kZ2VuX3N0cmluZ19nZXQAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX2dldF82N2IyYmE2MmZjMzBkZTEyAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxpfX3diZ19nZXRfYjliOTMwNDdmZTNjZjQ1YgAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMdX193YmdfbGVuZ3RoX2UyZDJhNDkxMzJjMWIyNTYAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JpbmRnZW5fb2JqZWN0X2Nsb25lX3JlZgADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMWX193YmluZGdlbl9pc19mdW5jdGlvbgADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3Xzc4ZmViMTA4YjY0NzI3MTMABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX25ldwAZKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMUX193YmluZGdlbl9pc19vYmplY3QAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JnX25leHRfMjVmZWFkZmMwOTEzZmVhOQADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMbX193YmdfbmV4dF82NTc0ZTFhOGE2MmQxMDU1AAMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxtfX3diZ19kb25lXzc2OWU1ZWRlNGIzMWM2N2IAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzHF9fd2JnX3ZhbHVlX2NkMWZmYTdiMWFiNzk0ZjEAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzH19fd2JnX2l0ZXJhdG9yXzlhMjRjODhkZjg2MGRjNjUABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzG19fd2JnX2NhbGxfNjcyYTRkMjE2MzRkNGEyNAAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3XzQwNWUyMmYzOTA1NzZjZTIABiguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFV9fd2JpbmRnZW5fbnVtYmVyX2dldAABKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMXX193YmluZGdlbl9pc191bmRlZmluZWQAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX3NldF8zNzgzNzAyM2YzZDc0MGU4AAUoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx5fX3diZ19pc0FycmF5X2ExZWFiN2UwZDA2NzM5MWIAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzLV9fd2JnX2luc3RhbmNlb2ZfQXJyYXlCdWZmZXJfZTE0NTg1NDMyZTM3MzdmYwADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMkX193YmdfaXNTYWZlSW50ZWdlcl8zNDNlMmJlZWVlY2UxYmIwAAMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx1fX3diZ19idWZmZXJfNjA5Y2MzZWVlNTFlZDE1OAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmdfbmV3X2ExMjAwMmE3ZjkxYzc1YmUAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JnX3NldF82NTU5NWJkZDg2OGIzMDA5AAUoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcx1fX3diZ19sZW5ndGhfYTQ0NjE5M2RjMjJjMTJmOAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMsX193YmdfaW5zdGFuY2VvZl9VaW50OEFycmF5XzE3MTU2YmNmMTE4MDg2YTkAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGV9fd2JpbmRnZW5fanN2YWxfbG9vc2VfZXEAACguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQAAyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzFF9fd2JpbmRnZW5fYXNfbnVtYmVyABooLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxRfX3diaW5kZ2VuX2Vycm9yX25ldwAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193YmluZGdlbl9iaWdpbnRfZnJvbV9pNjQAEyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzGl9fd2JpbmRnZW5fYmlnaW50X2Zyb21fdTY0ABMoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxtfX3diaW5kZ2VuX2JpZ2ludF9mcm9tX3UxMjgAGyguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzJF9fd2JnX2dldHdpdGhyZWZrZXlfMWRjMzYxYmQxMDA1M2JmZQAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMdX193YmdfU3RyaW5nX2VlY2M0YTExOTg3MTI3ZDYAASguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzJF9fd2JnX2dldHdpdGhyZWZrZXlfNjU1MGIyYzA5M2QyZWIxOAAAKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMaX193Ymdfc2V0XzM4MDdkNWYwYmZjMjRhYTcABSguL29yY2Ffd2hpcmxwb29sc19jb3JlX2pzX2JpbmRpbmdzX2JnLmpzDl9fd2JpbmRnZW5fc2hyAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxNfX3diaW5kZ2VuX2pzdmFsX2VxAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcw1fX3diaW5kZ2VuX2luAAAoLi9vcmNhX3doaXJscG9vbHNfY29yZV9qc19iaW5kaW5nc19iZy5qcxRfX3diaW5kZ2VuX2lzX2JpZ2ludAADKC4vb3JjYV93aGlybHBvb2xzX2NvcmVfanNfYmluZGluZ3NfYmcuanMTX193YmluZGdlbl9pc19hcnJheQADA+8C7QIDCAMBHB0BAQEBDgcKCx4AFAofBRUCCwEFAiAEFhYXAAIAAAICAgIDAAEBDwcBAgELDAwLDAwhIgABBSMFBQkAFCQBARgAAAEIJQEBAQEBAQEBAQEBAAAAAAAAAQAJFwUmAQUFCQEBAQcFAwMFAQEAAQEBCQEBBwEBAwEJAgEBAQEFAQEFAgAAAAIBAQEBAQgAAwEDDgAHBAAQAAMAAgIKCgcHGAEFAgECAgkCDw8JAicAAAAAAAAHBwQICAgRAAQEAgUBASgCAAECAQEFKQUAAQEAEg4FAAQEBAQEBAQEBAQEBAQEBAQBAQQEAAANAAAEAAEECAAAFSoEBysSLS8NAAAIAgAEAQMDAgUFBA0AAgQxAgIABwABAQEAAAAABQAAAAUBAAMDAwEFBQAEAAMDBRAREAADAAEAAAEAAgEAETIAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAAMDAAAAAAAAAAAGBgYGAwYGBgYGMwQFAXABbW0FAwEAEQYJAX8BQYCAwAALB5AQUAZtZW1vcnkCABpnZXRUaWNrQXJyYXlTdGFydFRpY2tJbmRleACIAxR0aWNrSW5kZXhUb1NxcnRQcmljZQCJAxRzcXJ0UHJpY2VUb1RpY2tJbmRleACXAxlnZXRJbml0aWFsaXphYmxlVGlja0luZGV4ALoCHWdldFByZXZJbml0aWFsaXphYmxlVGlja0luZGV4AIcCHWdldE5leHRJbml0aWFsaXphYmxlVGlja0luZGV4AJwCE2lzVGlja0luZGV4SW5Cb3VuZHMA1gITaXNUaWNrSW5pdGlhbGl6YWJsZQCxAg9pbnZlcnRUaWNrSW5kZXgAigMPaW52ZXJ0U3FydFByaWNlANcCF2dldEZ1bGxSYW5nZVRpY2tJbmRleGVzAMIBEG9yZGVyVGlja0luZGV4ZXMAzQEPaXNGdWxsUmFuZ2VPbmx5ANgCE2dldFRpY2tJbmRleEluQXJyYXkAwAEQY29sbGVjdEZlZXNRdW90ZQBDHV9SRURVQ1RJT05fRkFDVE9SX0RFTk9NSU5BVE9SAJkDKF9BREFQVElWRV9GRUVfQ09OVFJPTF9GQUNUT1JfREVOT01JTkFUT1IAmgMSX01BWF9SRUZFUkVOQ0VfQUdFAJ0DHV9USUNLX0FSUkFZX05PVF9FVkVOTFlfU1BBQ0VEAIgCGV9USUNLX0lOREVYX09VVF9PRl9CT1VORFMAiQITX0lOVkFMSURfVElDS19JTkRFWACKAhRfQVJJVEhNRVRJQ19PVkVSRkxPVwCLAhdfQU1PVU5UX0VYQ0VFRFNfTUFYX1U2NACMAhlfU1FSVF9QUklDRV9PVVRfT0ZfQk9VTkRTAI0CFF9USUNLX1NFUVVFTkNFX0VNUFRZAI4CH19TUVJUX1BSSUNFX0xJTUlUX09VVF9PRl9CT1VORFMAjwIjX0lOVkFMSURfU1FSVF9QUklDRV9MSU1JVF9ESVJFQ1RJT04AkAIVX1pFUk9fVFJBREFCTEVfQU1PVU5UAJECEl9JTlZBTElEX1RJTUVTVEFNUACSAhVfSU5WQUxJRF9UUkFOU0ZFUl9GRUUAkwIbX0lOVkFMSURfU0xJUFBBR0VfVE9MRVJBTkNFAJQCGF9USUNLX0lOREVYX05PVF9JTl9BUlJBWQCVAhxfSU5WQUxJRF9USUNLX0FSUkFZX1NFUVVFTkNFAJYCGl9JTlZBTElEX0FEQVBUSVZFX0ZFRV9JTkZPAJcCJF9WT0xBVElMSVRZX0FDQ1VNVUxBVE9SX1NDQUxFX0ZBQ1RPUgCZAxRfRkVFX1JBVEVfSEFSRF9MSU1JVACaAxZkZWNyZWFzZUxpcXVpZGl0eVF1b3RlAGEXZGVjcmVhc2VMaXF1aWRpdHlRdW90ZUEAYhdkZWNyZWFzZUxpcXVpZGl0eVF1b3RlQgBjFmluY3JlYXNlTGlxdWlkaXR5UXVvdGUAZBdpbmNyZWFzZUxpcXVpZGl0eVF1b3RlQQBlF2luY3JlYXNlTGlxdWlkaXR5UXVvdGVCAGYMX05VTV9SRVdBUkRTAJgDHGlzSW5pdGlhbGl6ZWRXaXRoQWRhcHRpdmVGZWUAzAETY29sbGVjdFJld2FyZHNRdW90ZQA/EnRyeUdldEFtb3VudERlbHRhQQDSARJ0cnlHZXRBbW91bnREZWx0YUIA0wEYdHJ5R2V0TmV4dFNxcnRQcmljZUZyb21BANABGHRyeUdldE5leHRTcXJ0UHJpY2VGcm9tQgDRARN0cnlBcHBseVRyYW5zZmVyRmVlAG8adHJ5UmV2ZXJzZUFwcGx5VHJhbnNmZXJGZWUApAEkdHJ5R2V0TWF4QW1vdW50V2l0aFNsaXBwYWdlVG9sZXJhbmNlAI4BJHRyeUdldE1pbkFtb3VudFdpdGhTbGlwcGFnZVRvbGVyYW5jZQCsAQ90cnlBcHBseVN3YXBGZWUAlQEWdHJ5UmV2ZXJzZUFwcGx5U3dhcEZlZQDbARVzd2FwUXVvdGVCeUlucHV0VG9rZW4ATRZzd2FwUXVvdGVCeU91dHB1dFRva2VuAE4QX1RJQ0tfQVJSQVlfU0laRQCTAydfRlVMTF9SQU5HRV9PTkxZX1RJQ0tfU1BBQ0lOR19USFJFU0hPTEQAlAMPX01JTl9USUNLX0lOREVYAJsDD19NQVhfVElDS19JTkRFWACcAxBwcmljZVRvU3FydFByaWNlAOICEHNxcnRQcmljZVRvUHJpY2UA8AILaW52ZXJ0UHJpY2UA8QIQdGlja0luZGV4VG9QcmljZQDjAhBwcmljZVRvVGlja0luZGV4AOQCGmdldFNxcnRQcmljZVNsaXBwYWdlQm91bmRzALgBH2ZpcnN0VW5vY2N1cGllZFBvc2l0aW9uSW5CdW5kbGUA4QEUaXNQb3NpdGlvbkJ1bmRsZUZ1bGwA5gEVaXNQb3NpdGlvbkJ1bmRsZUVtcHR5AOcBFV9QT1NJVElPTl9CVU5ETEVfU0laRQCVAxVfRkVFX1JBVEVfREVOT01JTkFUT1IAlgMRaXNQb3NpdGlvbkluUmFuZ2UAwwIOcG9zaXRpb25TdGF0dXMA4AENcG9zaXRpb25SYXRpbwDXARNfX3diaW5kZ2VuX2V4cG9ydF8wAIACE19fd2JpbmRnZW5fZXhwb3J0XzEAngITX193YmluZGdlbl9leHBvcnRfMgDBAh9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyAOYCCdkBAQBBAQtsnQLcAtgBtgL3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KQPAA3wiASADVK18IAEgASAEQegDaikDACACIAQpA+ADfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgCBxBEAgBEGwA2ogAUIAQuX3xebz8438BEIAEMUBIARBkANqIAJCAELl98Xm8/ON/ARCABDFASAEQaADaiABQgBC2te40RNCABDFASAEQYADaiACQgBC2te40RNCABDFASAEQYgDaikDACAEQZgDaikDACAEQbgDaikDACIBIAQpA5ADfCICIAFUrXwiAyAEKQOAA3wiASADVK18IAEgASAEQagDaikDACACIAQpA6ADfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgMAAcQRAIARB8AJqIAFCAELC1sq/55/qhp5/QgAQxQEgBEHQAmogAkIAQsLWyr/nn+qGnn9CABDFASAEQeACaiABQgBC5pfVjBhCABDFASAEQcACaiACQgBC5pfVjBhCABDFASAEQcgCaikDACAEQdgCaikDACAEQfgCaikDACIBIAQpA9ACfCICIAFUrXwiAyAEKQPAAnwiASADVK18IAEgASAEQegCaikDACACIAQpA+ACfCIDIAJUrXx8IgFWrXxCIIYgAUIgiIQhAiABQiCGIANCIIiEIQELIABBgIABcQRAIARBsAJqIAFCAEL30JSBiNKArRhCABDFASAEQZACaiACQgBC99CUgYjSgK0YQgAQxQEgBEGgAmogAUIAQt3KiaYkQgAQxQEgBEGAAmogAkIAQt3KiaYkQgAQxQEgBEGIAmopAwAgBEGYAmopAwAgBEG4AmopAwAiASAEKQOQAnwiAiABVK18IgMgBCkDgAJ8IgEgA1StfCABIAEgBEGoAmopAwAgAiAEKQOgAnwiAyACVK18fCIBVq18QiCGIAFCIIiEIQIgAUIghiADQiCIhCEBCyAAQYCAAnEEQCAEQfABaiABQgBC6POdi8bj1smff0IAEMUBIARB0AFqIAJCAELo852LxuPWyZ9/QgAQxQEgBEHgAWogAUIAQuvdhazSAEIAEMUBIARBwAFqIAJCAELr3YWs0gBCABDFASAEQcgBaikDACAEQdgBaikDACAEQfgBaikDACIBIAQpA9ABfCICIAFUrXwiAyAEKQPAAXwiASADVK18IAEg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NwM4IAEgEzcDKCABIBQ3AxggASAEQZgBaikDADcDaCABIARBiAFqKQMANwNYDAELIAEgBCgCUDYCBCABQQE2AgALIAQoAggiAUGDAU0NACABEAALIAQoAgQiAUGDAUsEQCABEAALIARBsAFqJAAgAigCgAJFBEAgAkEwaiANIA5B4AAQSkHgABBKGkIBIRMMCwsgAigChAIhASAAQQE2AgAgACABNgIEDA0LDA4LIAIoAhwgAkEANgIcBEAgAkGAAmogAigCIBCfASACKAKAAkUEQCACKQOIAiEoQgEhHwwKCyACKAKEAiEBIABBATYCACAAIAE2AgQMDAsMDQsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhICACKQOQAiEhQgEhHgwJCyACKAKEAiEBIABBATYCACAAIAE2AgQMCwsMDAsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhIiACKQOQAiEjQgEhHQwICyACKAKEAiEBIABBATYCACAAIAE2AgQMCgsMCwsgAigCHCACQQA2AhwEQCACQQhqIAIoAiAQ9QFBASELIAIoAgwhDCACKAIIRQ0GIABBATYCACAAIAw2AgQMCQsMCgsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhJCACKQOQAiElQgEhHAwGCyACKAKEAiEBIABBATYCACAAIAE2AgQMCAsMCQsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEKEBIAIoAoACRQRAIAcpAwAhJiACKQOQAiEnQgEhGwwFCyACKAKEAiEBIABBATYCACAAIAE2AgQMBwsMCAsgAigCHCACQQA2AhwEQCACQYACaiACKAIgEJkCIAIvAYACRQRAIAIvAYICIRBBASEKDAQLIAIoAoQCIQEgAEEBNgIAIAAgATYCBAwGCwwHCyACKAIcIAJBADYCHARAIAJBgAJqIAIoAiAQmQIgAi8BgAJFBEAgAi8BggIhEUEBIQkMAwsgAigChAIhASAAQQE2AgAgACABNgIEDAULDAYLIAIoAhwgAkEANgIcBEAgAkGAAmogAigCIBCZAiACLwGAAkUEQCACLwGCAiESQQEhCAwCCyACKAKEAiEBIABBATYCACAAIAE2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IAFBATYCACABIAQ2AgQMAQsgAyAFOgAMIAMgBDYCCCADQRBqIANBCGoQrwECQAJAIAMpAxgiCiADKQMQIgtCAoWEUEUEQCAKIAuEUEUNAUEAIANB/wBqQcDfwAAQzgEhBCABQQE2AgAgASAENgIEDAILIAEgAygCIDYCBCABQQE2AgAMAQsgA0EoaikDACEKIAMpAyAhCyADQTBqIANBCGoQrwEgAykDOCIMIAMpAzAiDUIChYRQRQRAIAwgDYRQBEBBASADQf8AakHA38AAEM4BIQQgAUEBNgIAIAEgBDYCBAwCCyADQcgAaikDACEMIAMpA0AhDSADQdAAaiADQQhqEK8BAkAgAygCUCIEQQNxQQNGDQACfwJAAkAgBEEBaw4CAwEAC0ECIANB/wBqQcDfwAAQzgEMAQsgAygCYAshBCABQQE2AgAgASAENgIEDAILIAEgAykDYDcDMCABIA03AyAgASALNwMQIAFBADYCACABIAw3AyggASAKNwMYIAEgA0HoAGopAwA3AzgMAQsgASADKAJANgIEIAFBATYCAAsgAygCCCIBQYMBTQ0AIAEQAAsgAygCBCIBQYMBSwRAIAEQAAsgA0GAAWokACACKAKQAUUEQCACQSBqIAggCUEwEEpBMBBKGkIBIQoMBwsgAigClAEhASAAQQI6AHAgACABNgIADAoLDAsLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRIgAikDoAEhE0IBIREMBgsgAigClAEhASAAQQI6AHAgACABNgIADAkLDAoLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRQgAikDoAEhFUIBIRAMBQsgAigClAEhASAAQQI6AHAgACABNgIADAgLDAkLIAIoAgwgAkEANgIMBEAgAkGQAWogAigCEBCiASACKAKQAUUEQCAHKQMAIRYgAikDoAEhF0IBIQ8MBAsgAigClAEhASAAQQI6AHAgACABNgIADAcLDAgLIAIoAgwgAkEANgIMBEAgAkGQAWohAyACKAIQIQQjAEEwayIBJAAgASAENgIMAkAgBBAvQQFHBEAgAUEMaiABQRBqQaDgwAAQVCEFIANBATYCACADIAU2AgQgBEGEAUkNASAEEAAMAQsgAUEQaiAEEJYBIAEoAhAiBEUEQCADIAEpAyA3AxAgA0EANgIAIAMgAUEoaikDADcDGCAERQ0BIAEoAhQiA0GEAUkNASADEAAMAQtByOLAAEHLABDGASEEIANBATYCACADIAQ2AgQgASgCFCIDQYQBSQ0AIAMQAAsgAUEwaiQAIAIoApABRQRAIAcpAwAhGCACKQOgASEZQgEhDgwDCyACKAKUASEBIABBAjoAcCAAIAE2AgAMBgsMBwsgAigCDCACQQA2AgxFDQYgAkGQAWohBCACKAIQIQFBACEGIwBBEGsiAyQAIAMgATYCCAJAQQFBAiABECIiBUEBRhtBACAFGyIFQQJHBEAgBCAFOgABDAELIAQgA0EIaiADQQ9qQcDgwAAQVDYCBEEBIQYLIAQgBjoAACABQYQBTwRAIAEQAAsgA0EQaiQAIAItAJABDQMgAi0AkQEhBgsgAkGQAWogAkEMahB+IAItAJABRQ0ACwsgAigClAEhASAAQQI6AHAgACABNgIADAELIAIoApQBIQEgAEECOgBwIAAgATYCAAsgAkEMahChAgsgAkHQAWokAA8LQer7wABBMRDuAgALrxQCCH8QfiMAQdABayICJAAgAiABNgIIAkACQCABEA5BAUcEQCACQQhqIAJBkAFqQbDgwAAQVSEDIABBAjoAcCAAIAM2AgAgAUGEAUkNASABEAAMAQsgAkEMaiIDIAFB7PDAAEEGEKUCIAJBkAFqIAMQgQECQAJAIAItAJABRQRAIAJB4ABqIQggAkGgAWohCSACQagBaiEHQQIhBgNAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAItAJEBQQFrDgcCAwQFBgEHAAsgBkECRg0MQbXowABBCxDlASEBIABBAjoAcCAAIAE2AgAMEQsgAiACQQxqEIICDAwLIA5QDQlBwOjAAEEMEOUBIQEgAEECOgBwIAAgATYCAAwPCyAPUA0HQczowABBDhDlASEBIABBAjoAcCAAIAE2AgAMDgsgEFANBUHa6MAAQREQ5QEhASAAQQI6AHAgACABNgIADA0LIBFQDQNB6+jAAEEREOUBIQEgAEECOgBwIAAgATYCAAwMCyAKUA0BQfzowABBFBDlASEBIABBAjoAcCAAIAE2AgAMCwsgBkECRwRAIA5QBEBBwOjAAEEMEOMBIQEgAEECOgBwIAAgATYCAAwMCyAPUARAQczowABBDhDjASEBIABBAjoAcCAAIAE2AgAMDAsgEFAEQEHa6MAAQREQ4wEhASAAQQI6AHAgACABNgIADAwLIBFQBEBB6+jAAEEREOMBIQEgAEECOgBwIAAgATYCAAwMCyAKUARAQfzowABBFBDjASEBIABBAjoAcCAAIAE2AgAMDAsgAEFAayACQSBqQTAQShogACASNwM4IAAgEzcDMCAAIBQ3AyggACAVNwMgIAAgFjcDGCAAIBc3AxAgACAYNwMIIAAgGTcDACAAIAZBAXE6AHAMCwtBtejAAEELEOMBIQEgAEECOgBwIAAgATYCAAwKCyACKAIMIAJBADYCDARAIAJBkAFqIQEgAigCECEEIwBBgAFrIgMkACADIAQ2AgQCQCADQQRqIgUQ3wIEQCMAQYABayIEJAAgBCAFELcCIARBADYCDCAEQRBqIAQQsAECQAJAIAQpAxgiCiAEKQMQIgtCAoWEUEUEQCAKIAuEUARAQQAgBEH/AGpBwN/AABDPASEFIAFBATYCACABIAU2AgQMAwsgBEEoaikDACEKIAQpAyAhCyAEQTBqIAQQsAEgBCkDOCIMIAQpAzAiDUIChYRQDQEgDCANhFAEQEEBIARB/wBqQcDfwAAQzwEhBSABQQE2AgAgASAFNgIEDAMLIARByABqKQMAIQwgBCkDQCENIARB0ABqIAQQsAECfwJAAkAgBCgCUCIFQQNxQQNGDQACQCAFQQFrDgIBAgALQQIgBEH/AGpBwN/AABDPAQwCCyABIAQpA2A3AzAgASANNwMgIAEgCzcDECABQQA2AgAgASAMNwMoIAEgCjcDGCABIARB6ABqKQMANwM4DAQLIAQoAmALIQUgAUEBNgIAIAEgBTYCBAwCCyABIAQoAiA2AgQgAUEBNgIADAELIAEgBCgCQDYCBCABQQE2AgALIARBgAFqJAAMAQsgA0HQAGogA0EEahCSASADKAJQIQQCQAJAAkAgAy0AVCIFQQJrDgIBAAILIAFBATYCACABIAQ2AgQMAgsgA0EEaiADQf8AakHA38AAEFUhBCABQQE2AgAgASAENgIEDAELIAMgBToADCADIAQ2AgggA0EQaiADQQhqEK4BAkACQCADKQMYIgogAykDECILQgKFhFBFBEAgCiALhFBFDQFBACADQf8AakHA38AAEM8BIQQgAUEBNgIAIAEgBDYCBAwCCyABIAMoAiA2AgQgAUEBNgIADAELIANBKGopAwAhCiADKQMgIQsgA0EwaiADQQhqEK4BIAMpAzgiDCADKQMwIg1CAoWEUEUEQCAMIA2EUARAQQEgA0H/AGpBwN/AABDPASEEIAFBATYCACABIAQ2AgQMAgsgA0HIAGopAwAhDCADKQNAIQ0gA0HQAGogA0EIahCuAQJAIAMoAlAiBEEDcUEDRg0AAn8CQAJAIARBAWsOAgMBAAtBAiADQf8AakHA38AAEM8BDAELIAMoAmALIQQgAUEBNgIAIAEgBDYCBAwCCyABIAMpA2A3AzAgASANNwMgIAEgCzcDECABQQA2AgAgASAMNwMoIAEgCjcDGCABIANB6ABqKQMANwM4DAELIAEgAygCQDYCBCABQQE2AgALIAMoAggiAUGDAU0NACABEAALIAMoAgQiAUGDAUsEQCABEAALIANBgAFqJAAgAigCkAFFBEAgAkEgaiAIIAlBMBBKQTAQShpCASEKDAcLIAIoApQBIQEgAEECOgBwIAAgATYCAAwKCwwLCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACESIAIpA6ABIRNCASERDAYLIAIoApQBIQEgAEECOgBwIAAgATYCAAwJCwwKCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACEUIAIpA6ABIRVCASEQDAULIAIoApQBIQEgAEECOgBwIAAgATYCAAwICwwJCyACKAIMIAJBADYCDARAIAJBkAFqIAIoAhAQoQEgAigCkAFFBEAgBykDACEWIAIpA6ABIRdCASEPDAQLIAIoApQBIQEgAEECOgBwIAAgATYCAAwHCwwICyACKAIMIAJBADYCDARAIAJBkAFqIQMgAigCECEEIwBBMGsiASQAIAEgBDYCDAJAIAQQL0EBRwRAIAFBDGogAUEQakGg4MAAEFUhBSADQQE2AgAgAyAFNgIEIARBhAFJDQEgBBAADAELIAFBEGogBBCWASABKAIQIgRFBEAgAyABKQMgNwMQIANBADYCACADIAFBKGopAwA3AxggBEUNASABKAIUIgNBhAFJDQEgAxAADAELQcjiwABBywAQxgEhBCADQQE2AgAgAyAENgIE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QQFrDhEBAgMEBQYHCAkKCwwNDg8QEQALIAIgAC0AAToACCACQQI2AhQgAkGwwcAANgIQIAJCATcCHCACQTA2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDBELIAIgACkDCDcDCCACQQI2AhQgAkHMwcAANgIQIAJCATcCHCACQTE2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDBALIAIgACkDCDcDCCACQQI2AhQgAkHMwcAANgIQIAJCATcCHCACQTI2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIcIAEoAiAgAkEQahBRDA8LIAArAwghAyACQQI2AhQgAkHswcAANgIQIAJCATcCHCACQTM2AgwgAiADOQMoIAIgAkEIajYCGCACIAJBKGo2AgggASgCHCABKAIgIAJBEGoQUQwOCyACIAAoAgQ2AgggAkECNgIUIAJBiMLAADYCECACQgE3AhwgAkE0NgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCHCABKAIgIAJBEGoQUQwNCyACIAApAgQ3AgggAkEBNgIUIAJBoMLAADYCECACQgE3AhwgAkE1NgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCHCABKAIgIAJBEGoQUQwMCyABQZnBwABBChDAAgwLCyABQajCwABBChDAAgwKCyABQbLCwABBDBDAAgwJCyABQb7CwABBDhDAAgwICyABQczCwABBCBDAAgwHCyABQdTCwABBAxDAAgwGCyABQdfCwABBBBDAAgwFCyABQdvCwABBDBDAAgwECyABQefCwABBDxDAAgwDCyABQfbCwABBDRDAAgwCCyABQYPDwABBDhDAAgwBCyABIAAoAgQgACgCCBDAAgsgAkEwaiQAC+oEAQp/IwBBMGsiAyQAIAMgATYCLCADIAA2AiggA0EDOgAkIANCIDcCHCADQQA2AhQgA0EANgIMAn8CQAJAAkAgAigCECIKRQRAIAIoAgwiAEUNASACKAIIIgEgAEEDdGohBCAAQQFrQf////8BcUEBaiEHIAIoAgAhAANAIABBBGooAgAiBQRAIAMoAiggACgCACAFIAMoAiwoAgwRAgANBAsgASgCACADQQxqIAFBBGooAgARAAANAyAAQQhqIQAgAUEIaiIBIARHDQALDAELIAIoAhQiAEUNACAAQQV0IQsgAEEBa0H///8/cUEBaiEHIAIoAgghBSACKAIAIQADQCAAQQRqKAIAIgEEQCADKAIoIAAoAgAgASADKAIsKAIMEQIADQMLIAMgCCAKaiIBQRBqKAIANgIcIAMgAUEcai0AADoAJCADIAFBGGooAgA2AiAgAUEMaigCACEEQQAhCUEAIQYCQAJAAkAgAUEIaigCAEEBaw4CAAIBCyAEQQN0IAVqIgwoAgANASAMKAIEIQQLQQEhBgsgAyAENgIQIAMgBjYCDCABQQRqKAIAIQQCQAJAAkAgASgCAEEBaw4CAAIBCyAEQQN0IAVqIgYoAgANASAGKAIEIQQLQQEhCQsgAyAENgIYIAMgCTYCFCAFIAFBFGooAgBBA3RqIgEoAgAgA0EMaiABQQRqKAIAEQAADQIgAEEIaiEAIAsgCEEgaiIIRw0ACwsgByACKAIETw0BIAMoAiggAigCACAHQQN0aiIAKAIAIAAoAgQgAygCLCgCDBECAEUNAQtBAQwBC0EACyADQTBqJAALxgQBCX8jAEEQayIEJAACQAJAAn8CQCAAKAIAQQFGBEAgACgCBCEHIAQgASgCDCIDNgIMIAQgASgCCCICNgIIIAQgASgCBCIFNgIEIAQgASgCACIBNgIAIAAtABghCSAAKAIQIQogAC0AFEEIcQ0BIAohCCAJDAILIAAoAhwgACgCICABEFchAgwDCyAAKAIcIAEgBSAAKAIgKAIMEQIADQEgAEEBOgAYQTAhCCAAQTA2AhAgBEIBNwIAIAcgBWshAUEAIQUgAUEAIAEgB00bIQdBAQshBiADBEAgA0EMbCEDA0ACfwJAAkACQCACLwEAQQFrDgICAQALIAIoAgQMAgsgAigCCAwBCyACLwECIgFB6AdPBEBBBEEFIAFBkM4ASRsMAQtBASABQQpJDQAaQQJBAyABQeQASRsLIAJBDGohAiAFaiEFIANBDGsiAw0ACwsCfwJAIAUgB0kEQCAHIAVrIQMCQAJAAkBBASAGIAZB/wFxQQNGG0H/AXEiAkEBaw4CAAECCyADIQJBACEDDAELIANBAXYhAiADQQFqQQF2IQMLIAJBAWohAiAAKAIgIQYgACgCHCEBA0AgAkEBayICRQ0CIAEgCCAGKAIQEQAARQ0ACwwDCyAAKAIcIAAoAiAgBBBXDAELIAEgBiAEEFcNAUEAIQICfwNAIAMgAiADRg0BGiACQQFqIQIgASAIIAYoAhARAABFDQALIAJBAWsLIANJCyECIAAgCToAGCAAIAo2AhAMAQtBASECCyAEQRBqJAAgAguSBAEEfyMAQYABayIEJAACQAJAAkAgASgCFCICQRBxRQRAIAJBIHENAUEBIQIgACgCACABEHBFDQIMAwsgACgCACECA0AgAyAEakH/AGogAkEPcSIFQTByIAVB1wBqIAVBCkkbOgAAIANBAWshAyACQRBJIAJBBHYhAkUNAAtBASECIAFBAUGRocAAQQIgAyAEakGAAWpBACADaxBFRQ0BDAILIAAoAgAhAgNAIAMgBGpB/wBqIAJBD3EiBUEwciAFQTdqIAVBCkkbOgAAIANBAWshAyACQQ9LIAJBBHYhAg0AC0EBIQIgAUEBQZGhwABBAiADIARqQYABakEAIANrEEUNAQsgASgCHEGNnsAAQQIgASgCICgCDBECAA0AAkAgASgCFCICQRBxRQRAIAJBIHENASAAKAIEIAEQcCECDAILIAAoAgQhAkEAIQMDQCADIARqQf8AaiACQQ9xIgBBMHIgAEHXAGogAEEKSRs6AAAgA0EBayEDIAJBD0sgAkEEdiECDQALIAFBAUGRocAAQQIgAyAEakGAAWpBACADaxBFIQIMAQsgACgCBCECQQAhAwNAIAMgBGpB/wBqIAJBD3EiAEEwciAAQTdqIABBCkkbOgAAIANBAWshAyACQQ9LIAJBBHYhAg0ACyABQQFBkaHAAEECIAMgBGpBgAFqQQAgA2sQRSECCyAEQYABaiQAIAILnQQCB38BfiMAQZABayIDJAACQAJAAkAgACgCACIEQYEBECFFBEBBAUECIAQQIiIFQQFGG0EAIAUbIghBAkYNAUEAIQBBACEFDAILIANBBzoAcCADQfAAaiABIAIQ2QEhBAwCCyADQRhqIAQQFiADQcgAaiADKAIYIAMrAyAQqQIgAygCSEUEQCADQRBqIAQQBgJ/AkAgAygCECIERQ0AIANBCGogBCADKAIUEP0BIANB2ABqIAMoAgggAygCDBC8AiADKAJYQYCAgIB4Rg0AIANBMGogA0HgAGooAgAiBjYCACADIAMpAlg3AyhBBSEFQQEhByADKAIsIQRBAAwBCyADQeQAaiAAELQBAn8gAygCZCIJQYCAgIB4RiIHRQRAIANBQGsiACEGIAAgA0HsAGooAgA2AgAgAyADKQJkNwM4QQYhBSADQTxqDAELIANBMGohBiADQQE2AnQgA0HwxsAANgJwIANCATcCfCADQTw2AowBIAMgADYCiAEgAyADQYgBajYCeCADQShqIANB8ABqEGpBESEFIANBLGoLIAYoAgAhBigCACEEIAlBgICAgHhHCyEAIAatIQoMAQtBAyEFIAMpA1AhCkEAIQALIAMgCjcDeCADIAQ2AnQgAyAIOgBxIAMgBToAcCADQfAAaiABIAIQ2QEhBCAABEAgA0E4ahDIAQsgB0UNACADQShqEMgBCyADQZABaiQAIAQLnQQCB38BfiMAQZABayIDJAACQAJAAkAgACgCACIEQYEBECFFBEBBAUECIAQQIiIFQQFGG0EAIAUbIghBAkYNAUEAIQBBACEFDAILIANBBzoAcCADQfAAaiABIAIQ2gEhBAwCCyADQRhqIAQQFiADQcgAaiADKAIYIAMrAyAQqQIgAygCSEUEQCADQRBqIAQQBgJ/AkAgAygCECIERQ0AIANBCGogBCADKAIUEP0BIANB2ABqIAMoAgggAygCDBC8AiADKAJYQYCAgIB4Rg0AIANBMGogA0HgAGooAgAiBjYCACADIAMpAlg3AyhBBSEFQQEhByADKAIsIQRBAAwBCyADQeQAaiAAELQBAn8gAygCZCIJQYCAgIB4RiIHRQRAIANBQGsiACEGIAAgA0HsAGooAgA2AgAgAyADKQJkNwM4QQYhBSADQTxqDAELIANBMGohBiADQQE2AnQgA0H4ycAANgJwIANCATcCfCADQTw2AowBIAMgADYCiAEgAyADQYgBajYCeCADQShqIANB8ABqEGpBESEFIANBLGoLIAYoAgAhBigCACEEIAlBgICAgHhHCyEAIAatIQoMAQtBAyEFIAMpA1AhCkEAIQALIAMgCjcDeCADIAQ2AnQgAyAIOgBxIAMgBToAcCADQfAAaiABIAIQ2gEhBCAABEAgA0E4ahDIAQsgB0UNACADQShqEMgBCyADQZABaiQAIAQLjwQBDX8gAUEBayEPIAAoAgQhCiAAKAIAIQsgACgCCCEMAkADQCAODQECQAJAIAIgBEkNAANAIAEgBGohBQJAAkACQCACIARrIgZB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NCADIAQ2AjAgA0EoaiADQTBqQc3MwABBDiABEOgBAkAgAygCKARAIAMoAiwhAgwBCyADIAFBEGo2AjggA0EgaiADQTBqQdvMwABBCSADQThqEOkBIAMoAiAEQCADKAIkIQIMAQsgAyABQRhqNgI4IANBGGogA0EwakHkzMAAQQkgA0E4ahDpASADKAIYBEAgAygCHCECDAELIAMgAUEgajYCOCADQRBqIANBMGpB7czAAEEJIANBOGoQ6QEgAygCEARAIAMoAhQhAgwBCyADIAFBKGo2AjggA0EIaiADQTBqQfbMwABBCSADQThqEOkBIAMoAggEQCADKAIMIQIMAQsgAyADKAIwIAMoAjQQ0wIgAygCBCECIAMoAgAMAgsgAygCNCIBQYQBSQ0AIAEQAAtBAQshASAAIAI2AgQgACABNgIAIANBQGskAAv9AgECfyMAQUBqIgMkACADQThqIAIQ1AIgAygCPCECAn8CQCADKAI4IgRFDQAgAyACNgI0IAMgBDYCMCADQShqIANBMGpBzczAAEEOIAEQ6AECQCADKAIoBEAgAygCLCECDAELIAMgAUEQajYCOCADQSBqIANBMGpB28zAAEEJIANBOGoQ6QEgAygCIARAIAMoAiQhAgwBCyADIAFBGGo2AjggA0EYaiADQTBqQeTMwABBCSADQThqEOkBIAMoAhgEQCADKAIcIQIMAQsgAyABQSBqNgI4IANBEGogA0EwakGVzcAAQQkgA0E4ahDpASADKAIQBEAgAygCFCECDAELIAMgAUEoajYCOCADQQhqIANBMGpBns3AAEEJIANBOGoQ6QEgAygCCARAIAMoAgwhAgwBCyADIAMoAjAgAygCNBDTAiADKAIEIQIgAygCAAwCCyADKAI0IgFBhAFJDQAgARAAC0EBCyEBIAAgAjYCBCAAIAE2AgAgA0FAayQAC9sCAgN/Bn4jAEHgAGsiAyQAIANBOGogAhAKEGAgAkGEAU8EQCACEAALAkACQCADKAI4QQFHBEACfyADLwFIIgRBkM4ASwRAQRQhBUGm28AADAELQQAhAiAERSABUHINAyADKQNAIQcgA0EoaiAErUIAIAFCABDFASADQRhqIAMpAygiBiADQTBqKQMAIglCkM4AQgAQhQIgA0EIaiADKQMYIgggA0EgaikDACIKQpDOAEIAEMUBIAog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IABBBnZBP3FBgAFyOgANQQMMAgsgAiAAQT9xQYABcjoADSACIABBBnZBwAFyOgAMQQIMAQsgAiAAOgAMQQELEEYMAQsgASgCHCAAIAEoAiAoAhARAAALIAJBEGokAAuqAgIDfwF+IwBBQGoiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBJGoiBEEANgIAIAJCgICAgBA3AhwgAkEwaiADKAIAIgNBCGopAgA3AwAgAkE4aiADQRBqKQIANwMAIAIgAykCADcDKCACQRxqQbiBwAAgAkEoahBRGiACQRhqIAQoAgAiAzYCACACIAIpAhwiBTcDECABQQhqIAM2AgAgASAFNwIACyABKQIAIQUgAUKAgICAEDcCACACQQhqIgMgAUEIaiIBKAIANgIAIAFBADYCAEHRiMEALQAAGiACIAU3AwBBDEEEEMcCIgFFBEBBBEEMEOsCAAsgASACKQMANwIAIAFBCGogAygCADYCACAAQbCEwAA2AgQgACABNgIAIAJBQGskAAv8AQIBfgJ/IwBBgAFrIgQkACAAKAIAKQMAIQICfwJAIAEoAhQiAEEQcUUEQCAAQSBxDQEgAkEBIAEQbAwCC0EAIQADQCAAIARqQf8AaiACp0EPcSIDQTByIANB1wBqIANBCkkbOgAAIABBAWshACACQg9WIAJCBIghAg0ACyABQQFBkaHAAEECIAAgBGpBgAFqQQAgAGsQRQwBC0EAIQADQCAAIARqQf8AaiACp0EPcSIDQTByIANBN2ogA0EKSRs6AAAgAEEBayEAIAJCD1YgAkIEiCECDQALIAFBAUGRocAAQQIgACAEakGAAWpBACAAaxBFCyAEQYABaiQAC/4BAgN/BH4jAEEwayIDJAACQAJ/IAJB//8DcUGQzgBLBEBButvAACEFQRoMAQsgAVAEQEIAIQEMAgsgA0EgaiACQZDOAGqtQv//A4NCACABQgAQxQEgA0EQaiADKQMgIgEgA0EoaikDACIHQpDOAEIAEIUCIAMgAykDECIGIANBGGopAwAiCEKQzgBCABDFASAIIAYgASADKQMAIgl9IAcgA0EIaikDAH0gASAJVK19hEIAUq18IgEgBlStfFANAUH42sAAIQVBFgshAkEBIQQgBSACEAEhAgsgACAENgIMIAAgAkEAIAQbNgIIIABCACABIAQbNwMAIANB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//8Ag0KAgICAgICA+P8AWgRAIAJBATYCFCACQZTDwAA2AhAgAkIBNwIcIAJBNjYCLCACIAA2AiggAiACQShqNgIYIAEoAhwgASgCICACQRBqEFEhAwwBCyACQQA6AAwgAiABNgIIQQEhAyACQQE2AhQgAkGUw8AANgIQIAJCATcCHCACQTY2AiwgAiAANgIoIAIgAkEoajYCGCACQQhqIAJBEGoQ7wINACACLQAMRQRAIAFBnMPAAEECEMACDQELQQAhAwsgAkEwaiQAIAMLzgEBAn8jAEEwayICJAAgAiABNgIMAkAgARAvQQFHBEAgAkEMaiACQRBqQaDhwAAQVSEDIABBATYCACAAIAM2AgQgAUGEAUkNASABEAAMAQsgAkEQaiABEJcBIAIoAhAiAUUEQCAAIAIpAyA3AxAgAEEANgIAIAAgAkEoaikDADcDGCABRQ0BIAIoAhQiAEGEAUkNASAAEAAMAQtBk+PAAEHLABDGASEBIABBATYCACAAIAE2AgQgAigCFCIAQYQBSQ0AIAAQAAsgAkEwaiQAC84BAQJ/IwBBMGsiAiQAIAIgATYCDAJAIAEQL0EBRwRAIAJBDGogAkEQakGg4cAAEFQhAyAAQQE2AgAgACADNgIEIAFBhAFJDQEgARAADAELIAJBEGogARCXASACKAIQIgFFBEAgACACKQMgNwMQIABBADYCACAAIAJBKGopAwA3AxggAUUNASACKAIUIgBBhAFJDQEgABAADAELQZPjwABBywAQxgEhASAAQQE2AgAgACABNgIEIAIoAhQiAEGEAUkNACAAEAALIAJBMGokAAvEAQICfwJ+IwBBQGoiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxBaAn4gAigCEEUEQCAAIAIpAzA3AyAgACACKQMgNwMQIAAgAkE4aikDADcDKCAAIAJBKGopAwA3AxhCASEEQgAMAQsgACACKAIUNgIQQgIhBEIACyEFIAAgBDcDACAAIAU3AwgLIAJBQGskAAu2AQECfyMAQUBqIgMkACADQRhqIAIQChBgIAJBhAFPBEAgAhAACyADKAIYQQFHBEAgA0EIaiABIAMpAyAgAy8BKBBcIAACfyADKAIIRQRAIAMpAxAhAUEADAELIAMoAgwgAygCEBABIQRBAQsiAjYCDCAAIARBACACGzYCCCAAQgAgASACGzcDACADQUBrJAAPCyADIAMoAhw2AjAgA0E0aiADQTBqELsBIAMoAjggAygCPBDuAgALzgECAX8CfiMAQUBqIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARBbIAIoAhBFBEAgAikDMCEDIAIpAyAhBCAAIAJBKGopAwA3AxggACAENwMQIABCADcDCCAAQgE3AwAgACADNwMgDAELIAIoAhQhASAAQgA3AwggAEICNwMAIAAgATYCEAsgAkFAayQAC8EBAgN/AX4jAEEwayICJAAgASgCAEGAgICAeEYEQCABKAIMIQMgAkEUaiIEQQA2AgAgAkKAgICAEDcCDCACQSBqIAMoAgAiA0EIaikCADcDACACQShqIANBEGopAgA3AwAgAiADKQIANwMYIAJBDGpBuIHAACACQRhqEFEaIAJBCGogBCgCACIDNgIAIAIgAikCDCIFNwMAIAFBCGogAzYCACABIAU3AgALIABBsITAADYCBCAAIAE2AgAgAkEwaiQAC5YCAQJ/IwBBIGsiBSQAQeSIwQBB5IjBACgCACIGQQFqNgIAAkACf0EAIAZBAEgNABpBAUGwjMEALQAADQAaQbCMwQBBAToAAEGsjMEAQayMwQAoAgBBAWo2AgBBAgtB/wFxIgZBAkcEQCAGQQFxRQ0BIAVBCGogACABKAIYEQEAAAtB2IjBACgCACIGQQBIDQBB2IjBACAGQQFqNgIAQdiIwQBB3IjBACgCAAR/IAUgACABKAIUEQEAIAUgBDoAHSAFIAM6ABwgBSACNgIYIAUgBSkDADcCEEHciMEAKAIAIAVBEGpB4IjBACgCACgCFBEBAEHYiMEAKAIAQQFrBSAGCzYCAEGwjMEAQQA6AAAgA0UNAAALAAu3AQICfwJ+IwBBQGoiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxBbAn4gAigCEEUEQCAAIAIpAyA3AxAgACACKQMwNwMgIAAgAkEoaikDADcDGEIBIQRCAAwBCyAAIAIoAhQ2AhBCAiEEQgALIQUgACAENwMAIAAgBTcDCAsgAkFAayQAC6wBAQR/IwBBIGsiAiQAQQggACgCACIEQQFqIgMgBEEBdCIFIAMgBUsbIgMgA0EITRsiA0EASARAQQBBACABELsCAAtBACEFIAIgBAR/IAIgBDYCHCACIAAoAgQ2AhRBAQUgBQs2AhggAkEIaiADIAJBFGoQsgEgAigCCEEBRgRAIAIoAgwgAigCECABELsCAAsgAigCDCEBIAAgAzYCACAAIAE2AgQgAkEgaiQAC70BAgR/An4jAEEgayIBJAACQEEAQYDKwAAoAgARAwAiAgRAIAIoAgANASACQX82AgAgAUEIaiACQQRqIAAoAgAiAyAAKAIEIgAQeQJ/IAEoAhgiBEUEQCABKAIIDAELIAEpAwghBSABKQMQIQYgASADIAAQhwM2AhAgASAGNwIIIAQgBSABQQhqEJEBC0EEaygCABAKIAIgAigCAEEBajYCACABQSBqJAAPC0HwyMAAEPABAAtB7MrAABDxAQALhAECAn8BfiAAAn8CQCABrSIEQiCIpw0AIASnIgJB/////wdLDQAgAkUEQCAAQQE2AgggAEEANgIEQQAMAgtB0YjBAC0AABogAkEBEMcCIgMEQCAAIAM2AgggACABNgIEQQAMAgsgACACNgIIIABBATYCBEEBDAELIABBADYCBEEBCzYCAAusAQIDfwF+IwBBIGsiAyQAAkAgAkH//wNxIgVBkM4ATQRAIAFQIAVBkM4ARnINASADQRBqQpDOACACQf//AHEiAq19QgAgAkGQzgBLrX0gAUIAEMUBIAMgAykDECADQRhqKQMAQpDOAEIAEIUCIAMpAwAhBgwBC0EBIQRButvAAEEaEAEhAgsgACAENgIMIAAgAkEAIAQbNgIIIABCACAGIAQbNwMAIANBIGokAAuYAQIBfwR+IwBBEGsiAyQAIAMgABCYASADKQMIIQQgAykDACEFIAMgASACIAEgAkgbEDEQmAEgAykDCCEGIAMpAwAhByADIAEgAiABIAJKGxAxEJgBAn9BAyABIAJGDQAaQQEgBSAHWCAEIAZYIAQgBlEbDQAaIAUgAykDAFogBCADKQMIIgVaIAQgBVEbQQF0CyADQRBqJAALwQECAX8BfiMAQTBrIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARChASACKAIQRQRAIAIpAyAhAyAAIAJBKGopAwA3AxggACADNwMQIABCADcDCCAAQgE3AwAMAQsgAigCFCEBIABCADcDCCAAQgI3AwAgACABNgIQCyACQTBqJAALwQECAX8BfiMAQTBrIgIkACACQQhqIAEQgQIgAigCDCEBAkACQAJAAkAgAigCCEEBaw4CAQACCyAAQgA3AwggAEIANwMADAILIABCADcDCCAAQgI3AwAgACABNgIQDAELIAJBEGogARCiASACKAIQRQRAIAIpAyAhAyAAIAJBKGopAwA3AxggACADNwMQIABCADcDCCAAQgE3AwAMAQsgAigCFCEBIABCADcDCCAAQgI3AwAgACABNgIQCyACQTBqJAALrgECAn8CfiMAQTBrIgIkAAJAAkAgASgCAARAIAJBCGogARD7ASACKAIIDQELIABCADcDCCAAQgA3AwAMAQsgAigCDCEDIAEgASgCDEEBajYCDCACQRBqIAMQoQECfiACKAIQRQRAIAAgAikDIDcDECAAIAJBKGopAwA3AxhCASEEQgAMAQsgACACKAIUNgIQQgIhBEIACyEFIAAgBDcDACAAIAU3AwgLIAJBMGokAAuuAQICfwJ+IwBBMGsiAiQAAkACQCABKAIABEAgAkEIaiABEPsBIAIoAggNAQsgAEIANwMIIABCADcDAAwBCyACKAIMIQMgASABKAIMQQFqNgIMIAJBEGogAxCiAQJ+IAIoAhBFBEAgACACKQMgNwMQIAAgAkEoaikDADcDGEIBIQRCAAwBCyAAIAIoAhQ2AhBCAiEEQgALIQUgACAENwMAIAAgBTcDCAsgAkEwaiQAC4UBAQF/AkAgAUEATgRAAn8gAigCBARAIAIoAggiAwRAIAIoAgAgA0EBIAEQvgIMAgsLQQEgAUUNABpB0YjBAC0AABogAUEBEMcCCyICBEAgACABNgIIIAAgAjYCBCAAQQA2AgAPCyAAIAE2AgggAEEBNgIEDAELIABBADYCBAsgAEEBNgIAC8QBAgF/AXwjAEEgayICJAAgAiABKAIAEBYgAkEQaiACKAIAIAIrAwgQqQICQAJAIAIoAhBBAUYEQCACKwMYIQMgARDgAg0BCyAAQgA3AwAMAQsgAEIBNwMAIANEAAAAAAAA4MNmIQEgAEL///////////8AAn4gA5lEAAAAAAAA4ENjBEAgA7AMAQtCgICAgICAgICAfwtCgICAgICAgICAfyABGyADRP///////99DZBtCACADIANhGzcDCAsgAkEgaiQAC50BAQF/IwBBEGsiAiQAAkAgASgCABAgBEAgAkEEaiABENUBIABBCGogAkEMaigCADYCACAAIAIpAgQ3AgAMAQsgASgCABAaRQRAIABBgICAgHg2AgAMAQsgAiABKAIAEB0iATYCACACQQRqIAIQ1QEgAEEIaiACQQxqKAIANgIAIAAgAikCBDcCACABQYQBSQ0AIAEQAAsgAkEQaiQAC7kBAAJAAkACQAJAAkAgASACQZDwwABBCxCwAkUEQCABIAJBm/DAAEEMELACDQEgASACQafwwABBDhCwAg0CIAEgAkG18MAAQREQsAINAyABIAJBxvDAAEERELACDQQgASACQdfwwABBFBCwAkUEQCAAQQY6AAEMBgsgAEEFOgABDAULIABBADoAAQwECyAAQQE6AAEMAwsgAEECOgABDAILIABBAzoAAQwBCyAAQQQ6AAELIABBADoAAAuNAwEHfyMAQRBrIgckAAJAAkAgAkEHTQRAIAINAQwCCyAHQQhqIQYCQAJAAkACQCABQQNqQXxxIgMgAUYNACADIAFrIgMgAiACIANLGyIDRQ0AQQEhBQNAIAEgBGotAABBLkYNBCADIARBAWoiBEcNAAsgAyACQQhrIgVLDQIMAQsgAkEIayEFQQAhAwtBrty48QIhBANAQYCChAggASADaiIIKAIAQa7cuPECcyIJayAJckGAgoQIIAhBBGooAgBBrty48QJzIghrIAhycUGAgYKEeHFBgIGChHhHDQEgA0EIaiIDIAVNDQALCyACIANHBEBBLiEEQQEhBQNAIAEgA2otAABBLkYEQCADIQQMAwsgAiADQQFqIgNHDQALC0EAIQULIAYgBDYCBCAGIAU2AgAgBygCCEEBRiEGDAELIAJBAWshBCABIQMDQCADLQAAQS5GIgYNASADQQFqIQMgBCIFQQFrIQQgBQ0ACwsgACAGIAAtAARyOgAEIAAoAgAgASACEMACIAdBEGokAAuPAQECfyMAQUBqIgIkACACQgA3AzggAkE4aiAAKAIAEAMgAiACKAI8IgA2AjQgAiACKAI4NgIwIAIgADYCLCACQSI2AiggAkECNgIQIAJBiLzAADYCDCACQgE3AhggAiACQSxqIgM2AiQgAiACQSRqNgIUIAEoAhwgASgCICACQQxqEFEgAxDIASACQUBrJAALzggCBH8LfiMAQUBqIgMkACMAQeABayICJAAgAkHAAWogABCYASACQbABakKQzgBBkM4AIAFB//8DcSIAIABBkM4ATxsiAK0iBn1CACAAQZDOAEutfULAhD1CABDFASACQaABaiAGQgBCwIQ9QgAQxQEgAkHQAWoiACACKQOwASACQbgBaikDABB6IAIpA9ABIQcgAikD2AEhCyAAIAIpA6ABIgZCgMivoCV8IgkgAkGoAWopAwAgBiAJVq18IgoQeiACQSBqIAIpA9gBIgxCACACKQPQASIGQgAQxQEgAkGQAWogBkIAIAZCABDFASACQRBqIAtCACACKQPAASIIQgAQxQEgAiACKQPIASINQgAgB0IAEMUBIAJB0ABqIAhCACAHQgAQxQEgAkHwAGogAikDUCACQdgAaikDACIOIAIpAwAgAikDEHx8Ig9CoI0GQgAQhQIgAkEwaiANQgAgBiAMIAIpAyiEQgBSIAJBmAFqKQMAIhAgAikDICIHIAd8fCIHIBBUckF/cyACKQOQASAJVCAHIApUIAcgClEbca18IgdCABDFASACQUBrIAwgBiAHVq18IglCACAIQgAQxQEgAkHgAGogCEIAIAdCABDFASACQYABaiACKQNgIAJB6ABqKQMAIgcgAikDMCACKQNAfHwiCkKgjQZCABCFAiADQRBqIgBCx7ac4tr4KSACQfgAaikDACIGIA1CAFIiASALQgBScSACKQMIQgBSciACKQMYQgBSciAOIA9WciIEGzcDCCAAQvLm8Ib4+cORhH9C0PaEgBAgAikDcCIIIAhC0PaEgBBYG0LQ9oSAECAIIAZQGyAGUBsgBBs3AwAgAEKxifv/DyACQYgBaikDACIGQrGJ+/8PIAIpA4ABIghCr+fswKrm3901VCAGQrGJ+/8PVCAGQrGJ+/8PURsiBBsgASAJQgBScSACKQM4QgBSciACKQNIQgBSciAHIApWciIBGzcDGCAAQq/n7MCq5t/dNSAIQq/n7MCq5t/dNSAEGyABGzcDECACQeABaiQAIAMpAxAhBiADKQMYIQggAykDICEHIAMgA0EoaikDADcDKCADIAc3AyAgAyAINwMYIAMgBjcDECADQQA2AjwgA0EIaiEEIwBBMGsiASQAIAFBKGogA0E8ahDUAiABKAIsIQICfwJAIAEoAigiBUUNACABIAI2AiQgASAFNgIgIAFBGGogAUEgakGfzMAAQQwgABDoAQJAIAEoAhgEQCABKAIcIQIMAQsgAUEQaiABQSBqQavMwABBDCAAQRBqEOgBIAEoAhAEQCABKAIUIQIMAQsgAUEIaiABKAIgIAEoAiQQ0wIgASgCDCECIAEoAggMAgsgASgCJCIAQYQBSQ0AIAAQAAtBAQshACAEIAI2AgQgBCAANgIAIAFBMGokACADKAIIQQFxBEBBuO3AAEExEO4CAAsgAygCDCADQUBrJAALkgEBBH8jAEEQayICJABBASEEAkAgASgCHCIDQScgASgCICIFKAIQIgERAAANACACQQRqIAAoAgBBgQIQSQJAIAItAARBgAFGBEAgAyACKAIIIAERAABFDQEMAgsgAyACLQAOIgAgAkEEamogAi0ADyAAayAFKAIMEQIADQELIANBJyABEQAAIQQLIAJBEGokACAEC3sBAn8gAUH//wNxIgEEQCAAIAAgAW0iACABbGsiA0EfdSIEIABqIAFsIQAgASAEcSADaiEDAkACQCACQf8BcUECRwRAIANBAEwNAiACQQFxDQEMAgsgAyABQQF2SCADQQBMcg0BCyAAIAFqIQALIAAPC0HA1cAAEJsCAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQbjWwAA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEHg1sAAQTcgAkE/akHQ1sAAQeTXwAAQxwEACyAAIAIpAgw3AgAgAEEIaiACQRRqKAIANgIAIAJBQGskAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQejqwAA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEGQ68AAQTcgAkE/akGA68AAQZTswAAQxwEACyAAIAIpAgw3AgAgAEEIaiACQRRqKAIANgIAIAJBQGskAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQZyBwQA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEHEgcEAQTcgAkE/akG0gcEAQciCwQAQxwEACyAAIAIpAgw3AgAgAEEIaiACQRRqKAIANgIAIAJBQGskAAuXAQEBfyMAQUBqIgIkACACQQA2AhQgAkKAgICAEDcCDCACQbCEwQA2AjggAkEDOgAwIAJCIDcCKCACQQA2AiAgAkEANgIYIAIgAkEMajYCNCABIAJBGGoQywEEQEHYhMEAQTcgAkE/akHIhMEAQdyFwQAQxwEACyAAIAIpAgw3AgAgAEEIaiACQRRqKAIANgIAIAJBQGskAAuPAQEDfyMAQRBrIgIkAAJAAkAgASgCAARAIAIgARD7ASACKAIADQELIABBADsBAAwBCyACKAIEIQRBASEDIAEgASgCDEEBajYCDCACQQhqIAQQmAICQCACLQAIRQRAIAAgAi0ACToAAiAAQQE6AAFBACEDDAELIAAgAigCDDYCBAsgACADOgAACyACQRBqJAALfQACQCAAAn8CQCABIAJIDQAgA0H//wNxIgNB2ABsIAJqIAFMDQAgA0UNAiABIAJrIgEgAUEfdSIBcyABayADbiEBQQAMAQtBoNbAAEEXEAEhAUEBCyICNgIIIAAgAUEAIAIbNgIEIABBACABIAIbNgIADwtBkNbAABCaAgALegEBfyMAQSBrIgIkAAJ/IAAoAgBBgICAgHhHBEAgASAAKAIEIAAoAggQwAIMAQsgAkEQaiAAKAIMKAIAIgBBCGopAgA3AwAgAkEYaiAAQRBqKQIANwMAIAIgACkCADcDCCABKAIcIAEoAiAgAkEIahBRCyACQSBqJAALfwEBfyMAQSBrIgEkAAJAIABB//8DcSIABEAgAUH0iRtB9IkbIABwIgBrNgIYIAEgAEH0iRtrNgIUIAFBADYCHCABQQhqIAFBFGogAUEcahCaASABKAIIQQFxDQEgASgCDCABQSBqJAAPC0GA1sAAEJoCAAtBuO3AAEExEO4CAAuLAQEBfyMAQRBrIgIkACACIAEQgQIgAigCBCEBIAACfwJAAkACQAJAIAIoAgBBAWsOAgEAAgsgAEEAOgABQQAMAwsgACABNgIEDAELIAJBCGogARCYAiACLQAIRQRAIAAgAi0ACToAAiAAQQE6AAFBAAwCCyAAIAIoAgw2AgQLQQELOgAAIAJBEGokAAuJAQEDf0H/////B0GM9mQgACgCgFgiASABQYz2ZEwbIAAtAHBBAkYbIQEDQCABIAEgACACaiIBQYDYAGooAgAiAyADQf////8HRhsgAUHwAGotAABBAkYbIQEgAkGQ2ABqIgJB4JAERw0AC0H0iRsgASAALwHgkARB2ABsakEBayIAIABB9IkbThsLbgEGfiAAIANC/////w+DIgUgAUL/////D4MiBn4iByAGIANCIIgiBn4iCCAFIAFCIIgiCX58IgVCIIZ8Igo3AwAgACAHIApWrSAGIAl+IAUgCFStQiCGIAVCIIiEfHwgASAEfiACIAN+fHw3AwgLcAECfyMAQRBrIgIkACACQQRqIAEQqwEgAigCCCEDIAIoAgRBAUYEQCADIAIoAgxB8OzAABC7AgALIAIoAgwgACABEEohACACIAE2AgwgAiAANgIIIAIgAzYCBCAAIAEQJCACQQRqEMgBIAJBEGokAAt8AQF/IwBBQGoiBSQAIAUgATYCDCAFIAA2AgggBSADNgIUIAUgAjYCECAFQQI2AhwgBUHcoMAANgIYIAVCAjcCJCAFIAVBEGqtQoCAgICQA4Q3AzggBSAFQQhqrUKAgICAoAOENwMwIAUgBUEwajYCICAFQRhqIAQQowIAC2cBBX9BASEDIwBBEGsiASQAIAFBDGohBCAAKAIAIgIEQCABQQE2AgwgACgCBCEDIAFBCGohBCACIQULIAQgBTYCAAJAIAEoAgwiAEUNACABKAIIIgJFDQAgAyACENkCCyABQRBqJAALcAECfyMAQSBrIgIkACABQQBKBEAgACAAIAFtIgMgAWxGIABBAEpyRQRAQQAgAGsgAW5Bf3MhAwsgAkEgaiQAIAMPCyACQQA2AhggAkEBNgIMIAJBrO/AADYCCCACQgQ3AhAgAkEIakG078AAEKMCAAvpAwMCfgF/AXwjAEEQayIFJAACfCAARAAAAAAAACRAIAFB/wFxuCACQf8BcbihEDWjEEtEAAAAAAAA8EOiIQAjAEEQayEBAkAgAEQAAAAAAAAAAGENACAAvSIDQjSIp0H/D3EiAkGyCEsNAAJAAkAgA0IAWQRAIAEgAEQAAAAAAAAwQ6BEAAAAAAAAMMOgIAChIgY5AwggAkH/B08NASABKwMIGkQAAAAAAAAAAAwECyABIABEAAAAAAAAMMOgRAAAAAAAADBDoCAAoSIGOQMIIAJB/wdJDQELIAYgAKAiAEQAAAAAAADwv6AgACAGRAAAAAAAAAAAZBsMAgsgASsDCBpEAAAAAAAA8L8hAAsgAAshACMAQRBrIgEkAAJ+QgAgAL0iA0KAgICAgICA+D9UDQAaIANCgICAgICAgPjHAFoEQEJ/QgAgA0KBgICAgICA+P8AVBsiBAwBCyABQgAgA0ILhkKAgICAgICAgIB/hEH+ACADQjSIp2tB/wBxEN4BIAEpAwAhBCABQQhqKQMACyEDIAUgBDcDACAFIAM3AwggAUEQaiQAQn8gBUEIaikDAEIAIABEAAAAAAAAAABmIgEbIABE////////70dkIgIbQn8gBSkDAEIAIAEbIAIbECcgBUEQaiQAC2wBAX8jAEEwayICJAAgAkEYaiAAKAIAECkgAkEQaiACKAIYIAIoAhwQzwIgAkEIaiACKAIQIAIoAhQQ/QEgAkEkaiIAIAIoAgggAigCDBC8AiACKAIoIAIoAiwgARDtAiAAEMgBIAJBMGokAAttAQF/IwBB4AFrIgEkACABIAAQChA0IABBhAFPBEAgABAACyABKAIAQQFGBEAgASABKAIENgLQASABQdQBaiABQdABahC8ASABKALYASABKALcARDuAgALIAEvAbwBIAEvAb4BRyABQeABaiQAC2YBAX8jAEEgayICJAAgAiAAIAEgACABShs2AhggAiAAIAEgACABSBs2AhQgAkEANgIcIAJBCGogAkEUaiACQRxqEJoBIAIoAghBAXEEQEG47cAAQTEQ7gIACyACKAIMIAJBIGokAAt1AQF/IwBBQGoiAyQAIAMgAjYCFCADIAE2AhAgAyAANgIMIANBAjYCHCADQbTqwAA2AhggA0ICNwIkIANBOjYCPCADQQI2AjQgAyADQTBqNgIgIAMgA0EQajYCOCADIANBDGo2AjAgA0EYahCbASADQUBrJAALdQEBfyMAQUBqIgMkACADIAI2AhQgAyABNgIQIAMgADYCDCADQQI2AhwgA0G06sAANgIYIANCAjcCJCADQTo2AjwgA0ECNgI0IAMgA0EwajYCICADIANBEGo2AjggAyADQQxqNgIwIANBGGoQnAEgA0FAayQAC2MBAX8jAEEQayIFJAAgBUEIaiABIAIgAyAEQQBHED0gBSgCDCEEIAAgBSgCCCIBBH8gASAEEAEhBEEBBUEACyICNgIIIAAgBEEAIAIbNgIEIABBACAEIAIbNgIAIAVBEGokAAtjAQF/IwBBEGsiBSQAIAVBCGogASACIAMgBEEARxBCIAUoAgwhBCAAIAUoAggiAQR/IAEgBBABIQRBAQVBAAsiAjYCCCAAIARBACACGzYCBCAAQQAgBCACGzYCACAFQRBqJAALawICfwF+IwBBEGsiBSQAIAUgASACIAMgBEEARxA8AkAgBSgCAEUEQCAFKQMIIQcMAQtBASEGIAUoAgQgBSgCCBABIQQLIAAgBjYCDCAAIARBACAGGzYCCCAAQgAgByAGGzcDACAFQRBqJAALawICfwF+IwBBEGsiBSQAIAUgASACIAMgBEEARxBdAkAgBSgCAEUEQCAFKQMIIQcMAQtBASEGIAUoAgQgBSgCCBABIQQLIAAgBjYCDCAAIARBACAGGzYCCCAAQgAgByAGGzcDACAFQRBqJAAL1wEBAn8jAEEgayIGJAAgAUUEQEHcv8AAQTIQ7gIACyAGQRRqIgcgASADIAQgBSACKAIQEQcAIwBBEGsiAyQAAkACQCAGQQhqIgIgBygCCCIBIAcoAgBJBH8gA0EIaiAHIAFBBEEEEJkBIAMoAggiAUGBgICAeEcNASAHKAIIBSABCzYCBCACIAcoAgQ2AgAgA0EQaiQADAELIAEgAygCDEHMv8AAELsCAAsgBiAGKAIIIAYoAgwQzwIgBigCBCEBIAAgBigCADYCACAAIAE2AgQgBkEgaiQAC6MBAQd/IwBBEGsiAiQAIAJBBGogASgCACIIEB8QqwEgAigCCCEEIAIoAgRBAUYEQCAEIAIoAgxB6MDAABC7AgALIAIoAgwhBRAFIgYQHCIHEB0hAyAHQYQBTwRAIAcQAAsgAyABKAIAIAUQHiADQYQBTwRAIAMQAAsgBkGEAU8EQCAGEAALIAAgCBAfNgIIIAAgBTYCBCAAIAQ2AgAgAkEQaiQAC2kCAX8BfiMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQaifwAA2AgggA0ICNwIUIANCgICAgCAiBCADrYQ3AyggAyAEIANBBGqthDcDICADIANBIGo2AhAgA0EIaiACEKMCAAuRDAIFfxJ+IwBBIGsiBSQAIAVBEGohBiMAQfACayIDJAAgA0HQAmogABCYAUGQzgAhAAJAAkACQAJAAkACQCADKQPYAiINIAMpA9ACIgsQJyABIAIQrQFB/wFxQQFrDgMDAQIACyADQdACaiIEIAEgAiABIAJIGxAxEJgBIAMpA9gCIRQgAykD0AIhEiAEIAEgAiABIAJKGxAxEJgBIANBoAFqIAtCACALQgAQxQEgA0GQAWogC0IAIA1CABDFASADQYABaiANQgAgDUIAEMUBIAMpA9gCIQkgAykD0AIhDiADQgE3A6gCIANCADcDoAIgA0IANwOYAiADQgA3A5ACIANCADcDyAIgA0IANwPAAiADIA03A7gCIAMgCzcDsAIgA0HoAmoiB0IANwMAIANB4AJqIgFCADcDACADQgA3A9gCIANCADcD0AIgA0GoAWopAwAhCiADKQOQASEIIANBmAFqKQMAIQwgAykDgAEhFSADQYgBaikDACEWIAMpA6ABIQ8gA0GwAmoiACAEEOUCDQMgA0GwAWogA0GQAmoiAiAAQQAQMiADQgE3A6gCIANCADcDoAIgA0IANwOYAiADQgA3A5ACIANCADcDyAIgA0IANwPAAiADIAk3A7gCIAMgDjcDsAIgB0IANwMAIAFCADcDACADQgA3A9gCIANCADcD0AIgACAEEOUCDQMgA0HQAWogAiAAQQAQMiADQfAAaiADKQOwASIQIAMpA9ABIhF9IglCACAPQn2DIg5CABDFASADQeAAaiADKQO4ASIPIAMpA9gBIhN9IBAgEVQiBK19IhBCACAOQgAQxQEgA0HQAGogCUIAIAggCnwiESAIfCIIQgAQxQEgA0FAayAQQgAgCEIAEMUBIANBMGogAykDwAEiFyADKQPgASIYfSIZIAQgDyATVCAPIBNRG60iD30gA0HIAWopAwAgA0HoAWopAwB9IBcgGFStfSAPIBlWrX0gDiAIEMUBIANBIGogCSAQIAwgCiARVq18IgkgFXwiCiAMIAggEVStfHwiCCAIIApUrSAWIAkgClatfHwQxQEgA0EQaiADKQNAIg4gAykDIHwiCCADKQMwfCIKIANB6ABqKQMAIANB+ABqKQMAIgkgAykDYHwiDCAJVK18fCIJIANB2ABqKQMAIAwgAykDUHwgDFStfHwiDEIAQpDOAEIAEMUBIAMgCSAMVq0gCSAKVK0gCCAKVq0gA0E4aikDACAIIA5UrSADQcgAaikDACADQShqKQMAfHx8fHx8IghCAEKQzgBCABDFASADQgA3A6gCIAMgAykDEEJwgzcDkAIgAyADQRhqKQMAIgogAykDAHwiCTcDmAIgAyADQQhqKQMAIAkgClStfDcDoAIgAyAMNwOwAiADIAggCyASfXwiCjcDuAIgAyANIBR9IAsgElStfSILIAggClatfCINNwPAAiADIAsgDVatNwPIAiAHQgA3AwAgAUIANwMAIANCADcD2AIgA0IANwPQAiADQbACaiADQdACahDlAg0DIANB8AFqIAIgAEEAEDJBkM4AIAMvAfABIgBrIQQMAgtBACEAQZDOACEEDAELQQAhAAsgBiAEOwECIAYgADsBACADQfACaiQADAELIANBADYC4AIgA0EBNgLUAiADQZjRwAA2AtACIANCBDcC2AIgA0HQAmpB7NDAABCjAgALIAUgBSgCEDYBGCAFQQA2AhwgBUEIaiECIAVBGGohAyMAQTBrIgAkACAAQShqIAVBHGoQ1AIgACgCLCEBAn8CQCAAKAIoIgRFDQAgACABNgIkIAAgBDYCICAAQRhqIABBIGpBrdHAACADEOsBAkAgACgCGARAIAAoAhwhAQwBCyAAQRBqIABBIGpBs9HAACADQQJqEOsBIAAoAhAEQCAAKAIUIQEMAQsgAEEIaiAAKAIgIAAoAiQQ0wIgACgCDCEBIAAoAggMAgsgACgCJCIDQYQBSQ0AIAMQAAtBAQshAyACIAE2AgQgAiADNgIAIABBMGokACAFKAIIQQFxBEBBuO3AAEExEO4CAAsgBSgCDCAFQSBqJAALZgAjAEEwayIAJABB0IjBAC0AAARAIABBAjYCDCAAQfiDwAA2AgggAEIBNwIUIAAgATYCLCAAIABBLGqtQoCAgIAghDcDICAAIABBIGo2AhAgAEEIakGghMAAEKMCAAsgAEEwaiQAC2gBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQQI2AgwgA0GMxcAANgIIIANCAjcCFCADQTo2AiwgA0E7NgIkIAMgADYCICADIANBIGo2AhAgAyADNgIoIANBCGoQmwEgA0EwaiQAC2gBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQQI2AgwgA0GQyMAANgIIIANCAjcCFCADQT42AiwgA0E7NgIkIAMgADYCICADIANBIGo2AhAgAyADNgIoIANBCGoQnAEgA0EwaiQAC2MBAn8jAEEQayIDJAAgAyABIAIQ3wEgAAJ/IAMoAgBFBEAgAykDCCEBQQAMAQsgAygCBCADKAIIEAEhBEEBCyICNgIMIAAgBEEAIAIbNgIIIABCACABIAIbNwMAIANBEGokAAtoAQF/IwBBMGsiAyQAIAMgAjYCBCADIAE2AgAgA0ECNgIMIANB9OnAADYCCCADQgI3AhQgA0E6NgIsIANBOzYCJCADIAA2AiAgAyADQSBqNgIQIAMgAzYCKCADQQhqEJwBIANBMGokAAtWAQF+AkAgA0HAAHFFBEAgA0UNASACIANBP3GtIgSGIAFBACADa0E/ca2IhCECIAEgBIYhAQwBCyABIANBP3GthiECQgAhAQsgACABNwMAIAAgAjcDCAtWAQF+AkAgA0HAAHFFBEAgA0UNASACQQAgA2tBP3GthiABIANBP3GtIgSIhCEBIAIgBIghAgwBCyACIANBP3GtiCEBQgAhAgsgACABNwMAIAAgAjcDCAv0AgICfwZ+IwBBEGsiAyQAQQEhBELAhD0gAq19IQVCACACQcCEPUutfSEGIwBBQGoiAiQAIAMCfwJAIAFQBEAgA0IANwMIDAELIAJBIGpCAEIAIAFCABDFASACQTBqIAFCAELAhD1CABDFASACKQMoQgBSIAJBOGopAwAiASACKQMgfCIHIAFUckUEQCAFIAaEUEUEQCACQRBqIAIpAzAiCCAHIAUgBhCFAiACIAIpAxAiCSACQRhqKQMAIgogBSAGEMUBIAogCSAIIAIpAwAiAX0gByACQQhqKQMAfSABIAhWrX2EQgBSrXwiASAJVK18UARAIAMgATcDCAwDCyADQRY2AgggA0H42sAANgIEQQEMAwtB6NrAABCaAgALIANBHTYCCCADQcvawAA2AgRBAQwBC0EACzYCACACQUBrJAACQCADKAIARQRAIAAgAykDCDcDCEEAIQQMAQsgACADKQIENwIECyAAIAQ2AgAgA0EQaiQAC/MBAQF/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f2ENABpBAiAnQoCAgICAgID4/wCDIiVCgICAgICAgPj/AFENABogJ0L/////////B4MiKUKAgICAgICACIQgJ0IBhkL+////////D4MgJ0I0iKdB/w9xIgEbIiZCAYMhKCAlUARAQQQgKVANARogAUGzCGshAEIBISUgKFAMAQtCgICAgICAgCAgJkIBhiAmQoCAgICAgIAIUSIAGyEmQgJCASAAGyElQct3Qcx3IAAbIAFqIQAgKFALIQEgCSAAOwHoCCAJICU3A+AIIAlCATcD2AggCSAmNwPQCCAJIAE6AOoIAkACfwJAAkACQAJAIAFBAmsiAwRAQQEhAUHLncAAQcydwAAgJ0IAUyIGG0HLncAAQQEgBhsgAhshGyAnQj+IpyACciEcQQMgAyADQQNPG0ECaw4CAgMBCyAJQQM2ApgIIAlBzZ3AADYClAggCUECOwGQCEEBIRtBASEBIAlBkAhqDAQLIAlBAzYCmAggCUHQncAANgKUCCAJQQI7AZAIIAlBkAhqDAMLQQIhASAJQQI7AZAIIBNFDQEgCSATNgKgCCAJQQA7AZwIIAlBAjYCmAggCUHJncAANgKUCCAJQZAIagwCC0F0QQUgAMEiAEEASBsgAGwiAEHA/QBJBEAgCUGQCGohDCAJQRBqIQogAEEEdkEVaiEHQYCAfkEAIBNrIBNBgIACTxshAQJAAkACfwJAAkACQAJAIAlB0AhqIhEpAwAiJVBFBEAgJUKAgICAgICAgCBaDQEgB0UNAkGgfyARLwEYIgBBIGsgACAlQoCAgIAQVCIAGyICQRBrIAIgJUIghiAlIAAbIiVCgICAgICAwABUIgAbIgJBCGsgAiAlQhCGICUgABsiJUKAgICAgICAgAFUIgAbIgJBBGsgAiAlQgiGICUgABsiJUKAgICAgICAgBBUIgAbIgJBAmsgAiAlQgSGICUgABsiJUKAgICAgICAgMAAVCIAGyAlQgKGICUgABsiJUIAWWsiA2vBQdAAbEGwpwVqQc4QbSIAQdEATw0DIABBBHQiAkGQjsAAaikDACImQv////8PgyInICUgJUJ/hUI/iIYiJUIgiCIofiIpQiCIICZCIIgiJiAofnwgJiAlQv////8PgyIlfiImQiCIfCApQv////8PgyAlICd+QiCIfCAmQv////8Pg3xCgICAgAh8QiCIfCIm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IAkoAsAIIAkoAsQIIAAgEyAJQZAIahB1IAkoAgwhASAJKAIIDAMLQQIhASAJQQI7AZAIIBNFBEBBASEBIAlBATYCmAggCUHTncAANgKUCCAJQZAIagwDCyAJIBM2AqAIIAlBADsBnAggCUECNgKYCCAJQcmdwAA2ApQIIAlBkAhqDAILQdSdwABBJUH8ncAAEP8BAAtBASEBIAlBATYCmAggCUHTncAANgKUCCAJQZAIagshACAJIAE2AswIIAkgADYCyAggCSAcNgLECCAJIBs2AsAIIAggCUHACGoQUiAJQfAIaiQADAELIABBKEHIssAAENoCAAsPCyABQQAhACMAQYABayIEJAAgP70hJgJ/QQMgP5lEAAAAAAAA8H9hDQAaQQIgJkKAgICAgICA+P8AgyIlQoCAgICAgID4/wBRDQAaICZC/////////weDIilCgICAgICAgAiEICZCAYZC/v///////w+DICZCNIinQf8PcSIAGyInQgGDISggJVAEQEEEIClQDQEaIABBswhrIQBCASElIChQDAELQoCAgICAgIAgICdCAYYgJ0KAgICAgICACFEiARshJ0ICQgEgARshJUHLd0HMdyABGyAAaiEAIChQCyEBIAQgADsBeCAEICU3A3AgBEIBNwNoIAQgJzcDYCAEIAE6AHoCfwJAAkACQCABQQJrIgEEQEEBIQBBy53AAEHMncAAICZCAFMiAxtBy53AAEEBIAMbIAIbIRggJkI/iKcgAnIhG0EDIAEgAUEDTxtBAmsOAgMCAQsgBEEDNgIoIARBzZ3AADYCJCAEQQI7ASBBASEYQQEhACAEQSBqDAMLIARBAzYCKCAEQdCdwAA2AiQgBEECOwEgIARBIGoMAgsgBEEgaiEHIARBD2oiDiEIIwBBMGsiAyQAAkACQAJ/AkACQAJAAkACQAJAAkACQCAEQeAAaiIMIgApAwAiJVBFBEAgACkDCCInUA0BIAApAxAiJlANAiAlICZ8IiYgJVQNAyAlICdUDQQgJkKAgICAgICAgCBaDQUgAyAALwEYIgA7AQggAyAlICd9Iic3AwAgACAAQSBrIAAgJkKAgICAEFQiARsiAkEQayACICZCIIYgJiABGyImQoCAgICAgMAAVCIBGyICQQhrIAIgJkIQhiAmIAEbIiZCgICAgICAgIABVCIBGyICQQRr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NgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQdr9wABBGBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQcj9wABBEhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQez+wABBHRDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYn/wABBFhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQZ//wABBGBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYP9wABBExDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQbf/wABBHhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQdX/wABBIhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQff/wABBFBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQYuAwQBBERDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQZyAwQBBFBDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQbCAwQBBGhDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQcqAwQBBFxDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQfL9wABBGxDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALOwECfyMAQRBrIgEkACABQQhqQeGAwQBBGRDPAiABKAIMIQIgACABKAIINgIAIAAgAjYCBCABQRBqJAALyQECA38BfiMAQRBrIgMkACADIAE2AgwjAEEwayICJAAgAkEIaiADQQxqIgQQswECQAJAIAIoAghBAUYEQCACKQMQIgVCAFkNAQsgBCACQS9qQdDfwAAQVSEEIABBAToAACAAIAQ2AgQMAQsgAAJ/IAVC/wFYBEAgACAFPAABQQAMAQsgAkEBOgAYIAIgBTcDICAAIAJBGGogAkEvakHQ38AAENwBNgIEQQELOgAACyACQTBqJAAgAUGEAU8EQCABEAALIANBEGokAAvKAQIDfwF+IwBBEGsiAyQAIAMgATYCDCMAQTBrIgIkACACQQhqIANBDGoiBBCzAQJAAkAgAigCCEEBRgRAIAIpAxAiBUIAWQ0BCyAEIAJBL2pB8N/AABBVIQQgAEEBOwEAIAAgBDYCBAwBCyAAAn8gBUL//wNYBEAgACAFPQECQQAMAQsgAkEBOgAYIAIgBTcDICAAIAJBGGogAkEvakHw38AAENwBNgIEQQELOwEACyACQTBqJAAgAUGEAU8EQCABEAALIANBEGokAAs3AQF/IwBBIGsiASQAIAFBADYCGCABQQE2AgwgAUHEs8AANgIIIAFCBDcCECABQQhqIAAQowIACzcBAX8jAEEgayIBJAAgAUEANgIYIAFBATYCDCABQYi0wAA2AgggAUIENwIQIAFBCGogABCjAgALLgAgAUH//wNxIgFFBEBB4NXAABCbAgALIAAgAWogACABbyIAIABBH3UgAXFqawuyAQECfyMAQRBrIgAkACABKAIcQfiCwABBCyABKAIgKAIMEQIAIQMgAEEIaiICQQA6AAUgAiADOgAEIAIgATYCACACIgEtAAQhAiABLQAFBEAgAQJ/QQEgAkEBcQ0AGiABKAIAIgEtABRBBHFFBEAgASgCHEGLocAAQQIgASgCICgCDBECAAwBCyABKAIcQYqhwABBASABKAIgKAIMEQIACyICOgAECyACQQFxIABBEGokAAsnAAJAIANFIAEgAxCmAkVyRQRAIAAgASADIAIQvgIiAA0BCwALIAAL5gECBH8CfiMAQRBrIgMkACADIAE2AgwgAyAANgIIAn8gA0EIaiECIwBBIGsiACQAAkBBAEH4xsAAKAIAEQMAIgEEQCABKAIADQEgAUF/NgIAIABBCGogAUEEaiACKAIA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AEEPdkEBcQthAQJ/AkACQCAAQQRrKAIAIgJBeHEiA0EEQQggAkEDcSICGyABak8EQCACQQAgAyABQSdqSxsNASAAEEwMAgtB+YHAAEEuQaiCwAAQ/wEAC0G4gsAAQS5B6ILAABD/AQALC2kBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQQI2AgwgA0HEtMAANgIIIANCAjcCFCADIANBBGqtQoCAgIAghDcDKCADIAOtQoCAgIAghDcDICADIANBIGo2AhAgA0EIaiACEKMCAAtpAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0ECNgIMIANB+LTAADYCCCADQgI3AhQgAyADQQRqrUKAgICAIIQ3AyggAyADrUKAgICAIIQ3AyAgAyADQSBqNgIQIANBCGogAhCjAgALCwAgACgCACABEHALDwBByJ7AAEErIAAQ/wEACw0AIAApAwBBASABEGwLDAAgACgCABAZQQBHCwwAIAAoAgAQG0EARwsNACAAKAIAIAEgAhArCwsAIAAgASACEMoBCw0AIAAQMSABIAIQ7gELDQAgACABIAIQygEQWAsMACAAIAFBIBDyAUULCwAgACMAaiQAIwALDQAgAEG4gcAAIAEQUQsMACAAIAEpAgA3AwALDQAgAEGQhcAAIAEQUQsOACABQYiFwABBBRDAAgsZACAAIAFB1IjBACgCACIAQQMgABsRAQAACw0AIABB7KDAACABEFELCgAgAiAAIAEQRgsJACAAIAEQBAALDQAgAEH4wMAAIAEQUQsLACAAIAEgAhDuAQsZAEEAIAAgASACEMoBEFhrEDEgASACEO4BCw4AIAFBsNPAAEEVEMACCw4AIAFBkNTAAEEfEMACCw4AIAFB2NTAAEESEMACCwcAIAAQyAELDgAgAUH018AAQQUQwAILDgAgAUHA3sAAQQUQwAILDgAgAUGv6cAAQRQQwAILDgAgAUHD6cAAQRQQwAILDQAgAEHo6sAAIAEQUQsOACABQYDtwABBBRDAAgsOACABQZzxwABBERDAAgsOACABQeDxwABBFhDAAgsOACABQcD1wABBExDAAgsOACABQYj3wABBIRDAAgsOACABQcT4wABBIRDAAgsOACABQeT6wABBFhDAAgsOACABQcj7wABBIBDAAgsNACABQej7wABBAhBGCw4AIAFB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SvMe4U5ANKFSHmHhU/BqYVRPb+FUnbxhVQDPYVZl0aFWANohVwDgoViu4iFa7OThW9DoYVwgAO5c8AF/XQBwAAcALQEBAQIBAgEBSAswFRABZQcCBgICAQQjAR4bWws6CQkBGAQBCQEDAQUrAzsJKhgBIDcBAQEECAQBAwcKAh0BOgEBAQIECAEJAQoCGgECAjkBBAIEAgIDAwEeAgMBCwI5AQQFAQIEARQCFgYBAToBAQIBBAgBBwMKAh4BOwEBAQwBCQEoAQMBNwEBAwUDAQQHAgsCHQE6AQICAQEDAwEEBwILAhwCOQIBAQIECAEJAQoCHQFIAQQBAgMBAQgBUQECBwwIYgECCQsHSQIbAQEBAQE3DgEFAQIFCwEkCQFmBAEGAQICAhkCBAMQBA0BAgIGAQ8BAAMABBwDHQIeAkACAQcIAQILCQEtAwEBdQIiAXYDBAIJAQYD2wICAToBAQcBAQEBAggGCgIBMB8xBDAKBAMmCQwCIAQCBjgBAQIDAQEFOAgCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLAQEsAzABAgQCAgIBJAFDBgICAgIMAQgBLwEzAQEDAgIFAgEBKgIIAe4BAgEEAQABABAQEAACAAHiAZUFAAMBAgUEKAMEAaUCAARBBQACTwRGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQEBCAQCAV8DAgQGAQIBnQEDCBUCOQIBAQEBDAEJAQ4HAwVDAQIGAQECAQEDBAMBAQ4CVQgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIIZQEBAQIEAQUACQEC9QEKBAQBkAQCAgQBIAooBgIECAEJBgIDLg0BAgAHAQYBAVIWAgcBAgECegYDAQECAQcBAUgCAwEBAQACCwI0BQUDFwEAAQYPAAwDAwAFOwcAAT8EUQELAgACAC4CFwAFAwYICAIHHgSUAwA3BDIIAQ4BFgUBDwAHARECBwECAQVkAaAHAAE9BAAE/gIAB20HAGCA8ABKc1ZhbHVlKCn/HRAACAAAAAceEAABAAAATGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkAAAYHhAAKgAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL29uY2VfY2VsbC0xLjIwLjMvc3JjL2xpYi5ycwAAAEweEABdAAAACAMAABkAAAByZWVudHJhbnQgaW5pdAAAvB4QAA4AAABMHhAAXQAAAHoCAAANAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvd2FzbS1iaW5kZ2VuLTAuMi4xMDAvc3JjL2NvbnZlcnQvc2xpY2VzLnJz5B4QAGwAAADoAAAAAQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL3dhc20tYmluZGdlbi0wLjIuMTAwL3NyYy9jb252ZXJ0L3NsaWNlcy5yc2AfEABsAAAAJAEAAA4AAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2pzLXN5cy0wLjMuNzcvc3JjL2xpYi5ycw4gEABaAAAA+xgAAAEAAAAAAAAACAAAAAQAAAA3AAAAOAAAADkAAABhIGJvb2xlYW5ieXRlIGFycmF5Ym9vbGVhbiBgYAAAAKMgEAAJAAAArCAQAAEAAABpbnRlZ2VyIGAAAADAIBAACQAAAKwgEAABAAAAZmxvYXRpbmcgcG9pbnQgYNwgEAAQAAAArCAQAAEAAABjaGFyYWN0ZXIgYAD8IBAACwAAAKwgEAABAAAAc3RyaW5nIAAYIRAABwAAAHVuaXQgdmFsdWVPcHRpb24gdmFsdWVuZXd0eXBlIHN0cnVjdHNlcXVlbmNlbWFwZW51bXVuaXQgdmFyaWFudG5ld3R5cGUgdmFyaWFudHR1cGxlIHZhcmlhbnRzdHJ1Y3QgdmFyaWFudAAAAAEAAAAAAAAALjBpMzJ1OHUxNnUzMnU2NGkxMjh1MTI4SGFzaCB0YWJsZSBjYXBhY2l0eSBvdmVyZmxvd7QhEAAcAAAAL3J1c3QvZGVwcy9oYXNoYnJvd24tMC4xNS4yL3NyYy9yYXcvbW9kLnJzAADYIRAAKgAAACMAAAAoAAAAL3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5ycxQiEABMAAAAKgIAABEAAABpbnZhbGlkIHR5cGU6ICwgZXhwZWN0ZWQgAAAAcCIQAA4AAAB+IhAACwAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAnCIQAE8AAAAUAQAAGQAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAAD8IhAASgAAAKIAAAAZAAAA//////////9YIxAAQfDGwAAL+wIBAAAAAAAAAD0AAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9zZXJkZS13YXNtLWJpbmRnZW4tMC42LjUvc3JjL2xpYi5ycwAAAHwjEABlAAAANQAAAA4AAABpbnZhbGlkIHR5cGU6ICwgZXhwZWN0ZWQgAAAA9CMQAA4AAAACJBAACwAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAICQQAE8AAAAUAQAAGQAAAC9ydXN0Yy8wNWY5ODQ2Zjg5M2IwOWExYmUxZmM4NTYwZTMzZmMzYzgxNWNmZWNiL2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAACAJBAASgAAAKIAAAAZAAAAAAAAAP//////////4CQQAEH4ycAAC4EBAQAAAAAAAAA/AAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvc2VyZGUtd2FzbS1iaW5kZ2VuLTAuNS4wL3NyYy9saWIucnMAAAAEJRAAZQAAADUAAAAOAEGGy8AACxrwPwAAAAAAAPg/AAAAAAAAAAAG0M9D6/1MPgBBq8vAAAuiC0ADuOI/L2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL21hdGgvcHJpY2UucnMAsCUQAEcAAAAjAAAAGAAAAFNxcnRQcmljZVNsaXBwYWdlQm91bmRzbWluU3FydFByaWNlbWF4U3FydFByaWNlRGVjcmVhc2VMaXF1aWRpdHlRdW90ZWxpcXVpZGl0eURlbHRhdG9rZW5Fc3RBdG9rZW5Fc3RCdG9rZW5NaW5BdG9rZW5NaW5CSW5jcmVhc2VMaXF1aWRpdHlRdW90ZXRva2VuTWF4QXRva2VuTWF4QkNvbGxlY3RSZXdhcmRzUXVvdGVyZXdhcmRzQ29sbGVjdFJld2FyZFF1b3RlcmV3YXJkc093ZWRFeGFjdEluU3dhcFF1b3RldG9rZW5JbnRva2VuRXN0T3V0dG9rZW5NaW5PdXR0cmFkZUZlZXRyYWRlRmVlUmF0ZU1pbnRyYWRlRmVlUmF0ZU1heEV4YWN0T3V0U3dhcFF1b3RldG9rZW5PdXR0b2tlbkVzdEludG9rZW5NYXhJbi9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2V0aG51bS0xLjUuMC9zcmMvaW50cmluc2ljcy9uYXRpdmUvZGl2bW9kLnJzXicQAG4AAAAtAAAACgAAAF4nEABuAAAAaQAAACsAAABeJxAAbgAAAGsAAAAnAAAAXicQAG4AAACNAAAAEQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2V0aG51bS0xLjUuMC9zcmMvdWludC9vcHMucnMAAAwoEABeAAAAEQAAAAEAAABhdHRlbXB0IHRvIGRpdmlkZSBieSB6ZXJvAAAAfCgQABkAAABQb3NpdGlvblJhdGlvcmF0aW9BcmF0aW9CUG9zaXRpb25TdGF0dXNwcmljZUluUmFuZ2VwcmljZUJlbG93UmFuZ2VwcmljZUFib3ZlUmFuZ2VpbnZhbGlkUG9zaXRpb25GYWNhZGVsaXF1aWRpdHl0aWNrTG93ZXJJbmRleHRpY2tVcHBlckluZGV4ZmVlR3Jvd3RoQ2hlY2twb2ludEFmZWVPd2VkQWZlZUdyb3d0aENoZWNrcG9pbnRCZmVlT3dlZEJyZXdhcmRJbmZvcwAABikQAAkAAAAPKRAADgAAAB0pEAAOAAAAKykQABQAAAA/KRAACAAAAEcpEAAUAAAAWykQAAgAAABjKRAACwAAAHN0cnVjdCBQb3NpdGlvbkZhY2FkZVBvc2l0aW9uUmV3YXJkSW5mb0ZhY2FkZWdyb3d0aEluc2lkZUNoZWNrcG9pbnRhbW91bnRPd2VkAAAA3SkQABYAAADzKRAACgAAAHN0cnVjdCBQb3NpdGlvblJld2FyZEluZm9GYWNhZGVUcmFuc2ZlckZlZWZlZUJwc21heEZlZQAAOioQAAYAAABAKhAABgAAAHN0cnVjdCBUcmFuc2ZlckZlZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL3RpY2sucnNqKhAARgAAAB0AAAAKAAAAaioQAEYAAACGAAAAIAAAAGoqEABGAAAAoQAAACAAAABqKhAARgAAALQAAAAgAAAAaioQAEYAAADRAAAABQAAAGoqEABGAAAA/AAAABoAAABqKhAARgAAAD4BAAASAAAAVGljayBpbmRleCBub3QgaW4gYXJyYXkAQAAAAAwAAAAEAAAAQQAAAEIAAABDAEHY1sAAC5kGAQAAAEQAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAACXKxAASwAAAN8KAAAOAAAARXJyb3IAAACXKxAASwAAAI4FAAAbAAAAlysQAEsAAACNBQAAGwAAAJcrEABLAAAAZwQAABIAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9ldGhudW0tMS41LjAvc3JjL3VpbnQvb3BzLnJzAAAsLBAAXgAAABEAAAABAAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAJwsEAAZAAAAYXR0ZW1wdCB0byBjYWxjdWxhdGUgdGhlIHJlbWFpbmRlciB3aXRoIGEgZGl2aXNvciBvZiB6ZXJvAAAAwCwQADkAAAAvaG9tZS9ydW5uZXIvd29yay93aGlybHBvb2xzL3doaXJscG9vbHMvcnVzdC1zZGsvY29yZS9zcmMvbWF0aC90b2tlbi5yc0FyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93BC0QAEcAAABmAQAAFAAAAEFtb3VudCBleGNlZWRzIG1heCB1NjRTcXJ0IHByaWNlIG91dCBvZiBib3VuZHNJbnZhbGlkIHRyYW5zZmVyIGZlZUludmFsaWQgc2xpcHBhZ2UgdG9sZXJhbmNlWAAAAGFuIGFycmF5IG9mIGxlbmd0aCAA2C0QABMAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9zZXJkZS1iaWctYXJyYXktMC41LjEvc3JjL2NvbnN0X2dlbmVyaWNzLnJzAAAA9C0QAG0AAABtAAAANABB/NzAAAsdAQAAAEUAAABGAAAADAAAAAQAAABHAAAASAAAAEMAQaTdwAAL6gEBAAAASQAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAOMuEABLAAAA3woAAA4AAABFcnJvcgAAAOMuEABLAAAAjgUAABsAAADjLhAASwAAAI0FAAAbAAAA4y4QAEsAAABnBAAAEgAAAEFtb3VudCBleGNlZWRzIG1heCB1NjQAQZjfwAALBQEAAABKAEGo38AACwUBAAAASwBBuN/AAAsFAQAAAEsAQcjfwAALBQEAAABLAEHY38AACwUBAAAATABB6N/AAAsFAQAAAE0AQfjfwAALBQEAAABOAEGI4MAACwUBAAAATwBBmODAAAsFAQAAAFAAQajgwAALBQEAAABRAEG44MAACwUBAAAAUgBByODAAAsFAQAAAFMAQdjgwAALBQEAAABFAEHo4MAACwUBAAAAVABB+ODAAAsFAQAAAFUAQYjhwAALBQEAAABWAEGY4cAACwUBAAAAVwBBqOHAAAsFAQAAAFgAQbjhwAALBQEAAABZAEHI4cAACwUBAAAAWgBB2OHAAAsFAQAAAFsAQejhwAALBQEAAABcAEH44cAAC4UJAQAAAF0AAABDb3VsZG4ndCBkZXNlcmlhbGl6ZSB1NjQgZnJvbSBhIEJpZ0ludCBvdXRzaWRlIHU2NDo6TUlOLi51NjQ6Ok1BWCBib3VuZHNDb3VsZG4ndCBkZXNlcmlhbGl6ZSBpMTI4IGZyb20gYSBCaWdJbnQgb3V0c2lkZSBpMTI4OjpNSU4uLmkxMjg6Ok1BWCBib3VuZHNDb3VsZG4ndCBkZXNlcmlhbGl6ZSB1MTI4IGZyb20gYSBCaWdJbnQgb3V0c2lkZSB1MTI4OjpNSU4uLnUxMjg6Ok1BWCBib3VuZHN0cmFkZUVuYWJsZVRpbWVzdGFtcGFkYXB0aXZlRmVlQ29uc3RhbnRzYWRhcHRpdmVGZWVWYXJpYWJsZXNmaWx0ZXJQZXJpb2RkZWNheVBlcmlvZHJlZHVjdGlvbkZhY3RvcmFkYXB0aXZlRmVlQ29udHJvbEZhY3Rvcm1heFZvbGF0aWxpdHlBY2N1bXVsYXRvcnRpY2tHcm91cFNpemVtYWpvclN3YXBUaHJlc2hvbGRUaWNrc2xhc3RSZWZlcmVuY2VVcGRhdGVUaW1lc3RhbXBsYXN0TWFqb3JTd2FwVGltZXN0YW1wdm9sYXRpbGl0eVJlZmVyZW5jZXRpY2tHcm91cEluZGV4UmVmZXJlbmNldm9sYXRpbGl0eUFjY3VtdWxhdG9yZmVlVGllckluZGV4U2VlZHRpY2tTcGFjaW5nZmVlUmF0ZXByb3RvY29sRmVlUmF0ZWxpcXVpZGl0eXNxcnRQcmljZXRpY2tDdXJyZW50SW5kZXhmZWVHcm93dGhHbG9iYWxBZmVlR3Jvd3RoR2xvYmFsQnJld2FyZExhc3RVcGRhdGVkVGltZXN0YW1wcmV3YXJkSW5mb3NlbWlzc2lvbnNQZXJTZWNvbmRYNjRncm93dGhHbG9iYWxYNjR0aWNrTG93ZXJJbmRleHRpY2tVcHBlckluZGV4ZmVlR3Jvd3RoQ2hlY2twb2ludEFmZWVPd2VkQWZlZUdyb3d0aENoZWNrcG9pbnRCZmVlT3dlZEJncm93dGhJbnNpZGVDaGVja3BvaW50YW1vdW50T3dlZGluaXRpYWxpemVkbGlxdWlkaXR5TmV0bGlxdWlkaXR5R3Jvc3NmZWVHcm93dGhPdXRzaWRlQWZlZUdyb3d0aE91dHNpZGVCcmV3YXJkR3Jvd3Roc091dHNpZGVzdGFydFRpY2tJbmRleHRpY2tzZmVlQnBzbWF4RmVlYW4gYXJyYXkgb2YgbGVuZ3RoIDJhbiBhcnJheSBvZiBsZW5ndGggM2ludmFsaWQgdmFsdWU6ICwgZXhwZWN0ZWQgAAAA1zQQAA8AAADmNBAACwAAAG1pc3NpbmcgZmllbGQgYGAENRAADwAAABM1EAABAAAAaW52YWxpZCBsZW5ndGggACQ1EAAPAAAA5jQQAAsAAABkdXBsaWNhdGUgZmllbGQgYAAAAEQ1EAARAAAAEzUQAAEAAABfAAAADAAAAAQAAABgAAAAYQAAAEMAQYjrwAAL7gYBAAAAYgAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAMc1EABLAAAA3woAAA4AAAAvcnVzdGMvMDVmOTg0NmY4OTNiMDlhMWJlMWZjODU2MGUzM2ZjM2M4MTVjZmVjYi9saWJyYXJ5L2FsbG9jL3NyYy9zbGljZS5ycwAAJDYQAEoAAACiAAAAGQAAAEVycm9yAAAAxzUQAEsAAACOBQAAGwAAAMc1EABLAAAAjQUAABsAAADHNRAASwAAAGcEAAASAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcF90aHJvdygpYCBvbiBhbiBgRXJyYCB2YWx1ZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL2FkYXB0aXZlX2ZlZS5ycwDpNhAATgAAANIAAAAZAAAA6TYQAE4AAADHAAAAGQAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGXpNhAATgAAALkAAAARAAAARGl2aXNvciBtdXN0IGJlIHBvc2l0aXZlLgAAAJA3EAAZAAAA6TYQAE4AAADnAQAABQAAAEFyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93VGlja1JhbmdldGlja0xvd2VySW5kZXh0aWNrVXBwZXJJbmRleFRpY2tGYWNhZGVpbml0aWFsaXplZGxpcXVpZGl0eU5ldGxpcXVpZGl0eUdyb3NzZmVlR3Jvd3RoT3V0c2lkZUFmZWVHcm93dGhPdXRzaWRlQnJld2FyZEdyb3d0aHNPdXRzaWRlABA4EAALAAAAGzgQAAwAAAAnOBAADgAAADU4EAARAAAARjgQABEAAABXOBAAFAAAAHN0cnVjdCBUaWNrRmFjYWRlVGlja0FycmF5RmFjYWRlc3RhcnRUaWNrSW5kZXh0aWNrcwC8OBAADgAAAMo4EAAFAAAAc3RydWN0IFRpY2tBcnJheUZhY2FkZQBBgPLAAAvAAgEAAABjAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQAAAAAABAAAAAQAAABkAAAAVHJ5RnJvbUludEVycm9yL2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL21hdGgvYWRhcHRpdmVfZmVlLnJzSW52YWxpZCB0aW1lc3RhbXAAAFM5EABOAAAA4AEAAA4AAAAvaG9tZS9ydW5uZXIvd29yay93aGlybHBvb2xzL3doaXJscG9vbHMvcnVzdC1zZGsvY29yZS9zcmMvbWF0aC9idW5kbGUucnPEORAASAAAAD0AAAAUAAAAAAAAAP//////////////////////////////////////////AEHg9MAAC9EMT3JhY2xlRmFjYWRldHJhZGVFbmFibGVUaW1lc3RhbXBhZGFwdGl2ZUZlZUNvbnN0YW50c2FkYXB0aXZlRmVlVmFyaWFibGVzbDoQABQAAACAOhAAFAAAAJQ6EAAUAAAAc3RydWN0IE9yYWNsZUZhY2FkZWZpbHRlclBlcmlvZGRlY2F5UGVyaW9kcmVkdWN0aW9uRmFjdG9yYWRhcHRpdmVGZWVDb250cm9sRmFjdG9ybWF4Vm9sYXRpbGl0eUFjY3VtdWxhdG9ydGlja0dyb3VwU2l6ZW1ham9yU3dhcFRocmVzaG9sZFRpY2tzAAAA0zoQAAwAAADfOhAACwAAAOo6EAAPAAAA+ToQABgAAAAROxAAGAAAACk7EAANAAAANjsQABcAAABzdHJ1Y3QgQWRhcHRpdmVGZWVDb25zdGFudHNGYWNhZGVsYXN0UmVmZXJlbmNlVXBkYXRlVGltZXN0YW1wbGFzdE1ham9yU3dhcFRpbWVzdGFtcHZvbGF0aWxpdHlSZWZlcmVuY2V0aWNrR3JvdXBJbmRleFJlZmVyZW5jZXZvbGF0aWxpdHlBY2N1bXVsYXRvcgAAqTsQABwAAADFOxAAFgAAANs7EAATAAAA7jsQABcAAAAFPBAAFQAAAHN0cnVjdCBBZGFwdGl2ZUZlZVZhcmlhYmxlc0ZhY2FkZVdoaXJscG9vbEZhY2FkZWZlZVRpZXJJbmRleFNlZWR0aWNrU3BhY2luZ2ZlZVJhdGVwcm90b2NvbEZlZVJhdGVsaXF1aWRpdHlzcXJ0UHJpY2V0aWNrQ3VycmVudEluZGV4ZmVlR3Jvd3RoR2xvYmFsQWZlZUdyb3d0aEdsb2JhbEJyZXdhcmRMYXN0VXBkYXRlZFRpbWVzdGFtcHJld2FyZEluZm9zdDwQABAAAACEPBAACwAAAI88EAAHAAAAljwQAA8AAAClPBAACQAAAK48EAAJAAAAtzwQABAAAADHPBAAEAAAANc8EAAQAAAA5zwQABoAAAABPRAACwAAAHN0cnVjdCBXaGlybHBvb2xGYWNhZGVXaGlybHBvb2xSZXdhcmRJbmZvRmFjYWRlZW1pc3Npb25zUGVyU2Vjb25kWDY0Z3Jvd3RoR2xvYmFsWDY0AJM9EAAVAAAAqD0QAA8AAABzdHJ1Y3QgV2hpcmxwb29sUmV3YXJkSW5mb0ZhY2FkZSgpY2FsbGVkIGBPcHRpb246OnVud3JhcF90aHJvdygpYCBvbiBhIGBOb25lYCB2YWx1ZS9ob21lL3J1bm5lci93b3JrL3doaXJscG9vbHMvd2hpcmxwb29scy9ydXN0LXNkay9jb3JlL3NyYy9tYXRoL3RpY2tfYXJyYXkucnNUaWNrIGFycmF5IG5vdCBldmVubHkgc3BhY2VkVGljayBzZXF1ZW5jZSBlbXB0eQAAGz4QAEwAAABFAAAADAAAABs+EABMAAAATAAAADgAAAAbPhAATAAAAE8AAAANAAAASW52YWxpZCB0aWNrIGluZGV4VGljayBpbmRleCBvdXQgb2YgYm91bmRzSW52YWxpZCB0aWNrIGFycmF5IHNlcXVlbmNlL2hvbWUvcnVubmVyL3dvcmsvd2hpcmxwb29scy93aGlybHBvb2xzL3J1c3Qtc2RrL2NvcmUvc3JjL3R5cGVzL3RpY2tfYXJyYXkucnMAAA0/EABNAAAAQgAAABEAAABBcml0aG1ldGljIG92ZXItIG9yIHVuZGVyZmxvd0Ftb3VudCBleGNlZWRzIG1heCB1NjRTcXJ0IHByaWNlIG91dCBvZiBib3VuZHNTcXJ0IHByaWNlIGxpbWl0IG91dCBvZiBib3VuZHNJbnZhbGlkIHNxcnQgcHJpY2UgbGltaXQgZGlyZWN0aW9uWmVybyB0cmFkYWJsZSBhbW91bnRJbnZhbGlkIHRpbWVzdGFtcEludmFsaWQgdHJhbnNmZXIgZmVlSW52YWxpZCBzbGlwcGFnZSB0b2xlcmFuY2VUaWNrIGluZGV4IG5vdCBpbiBhcnJheUludmFsaWQgYWRhcHRpdmUgZmVlIGluZm9Db2xsZWN0RmVlc1F1b3RlZmVlT3dlZEFmZWVPd2VkQgAAZQAAAAwAAAAEAAAAZgAAAGcAAABDAEG8gcEAC4kDAQAAAGgAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAAD7QBAASwAAAN8KAAAOAAAARXJyb3IAAAD7QBAASwAAAI4FAAAbAAAA+0AQAEsAAACNBQAAGwAAAPtAEABLAAAAZwQAABIAAABTcXJ0IHByaWNlIGxpbWl0IG91dCBvZiBib3VuZHNaZXJvIHRyYWRhYmxlIGFtb3VudEFyaXRobWV0aWMgb3Zlci0gb3IgdW5kZXJmbG93SW52YWxpZCBhZGFwdGl2ZSBmZWUgaW5mb0ludmFsaWQgc3FydCBwcmljZSBsaW1pdCBkaXJlY3Rpb25BbW91bnQgZXhjZWVkcyBtYXggdTY0aQAAAAwAAAAEAAAAagAAAGsAAABDAEHQhMEAC98DAQAAAGwAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA1Zjk4NDZmODkzYjA5YTFiZTFmYzg1NjBlMzNmYzNjODE1Y2ZlY2IvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAACPQhAASwAAAN8KAAAOAAAARXJyb3IAAACPQhAASwAAAI4FAAAbAAAAj0IQAEsAAACNBQAAGwAAAI9CEABLAAAAZwQAABIAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9ldGhudW0tMS41LjAvc3JjL3VpbnQvb3BzLnJzAAAkQxAAXgAAABEAAAABAAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAJRDEAAZAAAAYXR0ZW1wdCB0byBjYWxjdWxhdGUgdGhlIHJlbWFpbmRlciB3aXRoIGEgZGl2aXNvciBvZiB6ZXJvAAAAuEMQADkAAABBcml0aG1ldGljIG92ZXItIG9yIHVuZGVyZmxvd0Ftb3VudCBleGNlZWRzIG1heCB1NjQAQciIwQALASMASAlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQIGd2FscnVzBjAuMjMuMwx3YXNtLWJpbmRnZW4TMC4yLjEwMCAoMjQwNWVjMmI0KQ==", ct = async (A = {}, I) => {
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
function Dt(A) {
  k = A;
}
const MA = new Array(128).fill(void 0);
MA.push(void 0, null, !0, !1);
function R(A) {
  return MA[A];
}
let NI = 0, UI = null;
function LI() {
  return (UI === null || UI.byteLength === 0) && (UI = new Uint8Array(k.memory.buffer)), UI;
}
const wt = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let pI = new wt("utf-8");
const lt = typeof pI.encodeInto == "function" ? function(A, I) {
  return pI.encodeInto(A, I);
} : function(A, I) {
  const g = pI.encode(A);
  return I.set(g), {
    read: A.length,
    written: g.length
  };
};
function Kg(A, I, g) {
  if (g === void 0) {
    const i = pI.encode(A), e = I(i.length, 1) >>> 0;
    return LI().subarray(e, e + i.length).set(i), NI = i.length, e;
  }
  let C = A.length, B = I(C, 1) >>> 0;
  const Q = LI();
  let E = 0;
  for (; E < C; E++) {
    const i = A.charCodeAt(E);
    if (i > 127) break;
    Q[B + E] = i;
  }
  if (E !== C) {
    E !== 0 && (A = A.slice(E)), B = g(B, C, C = E + A.length * 3, 1) >>> 0;
    const i = LI().subarray(B + E, B + C), e = lt(A, i);
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
function bg(A, I) {
  try {
    return A.apply(this, I);
  } catch (g) {
    k.__wbindgen_export_2(N(g));
  }
}
function dt(A) {
  A < 132 || (MA[A] = lI, lI = A);
}
function P(A) {
  const I = R(A);
  return dt(A), I;
}
function z(A) {
  return A == null;
}
function Ng(A) {
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
    B > 0 && (Q += Ng(A[0]));
    for (let E = 1; E < B; E++)
      Q += ", " + Ng(A[E]);
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
const ut = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let TC = new ut("utf-8", { ignoreBOM: !0, fatal: !0 });
TC.decode();
function Hg(A, I) {
  return A = A >>> 0, TC.decode(LI().subarray(A, A + I));
}
function MB(A, I, g) {
  return k.priceToTickIndex(A, I, g);
}
function ht(A, I) {
  const g = k.getSqrtPriceSlippageBounds(N(A), I);
  return P(g);
}
function Nt() {
  return k._POSITION_BUNDLE_SIZE() >>> 0;
}
function CI(A, I) {
  return k.getTickArrayStartTickIndex(A, I);
}
function SB(A, I, g) {
  return k.getInitializableTickIndex(A, I, z(g) ? 16777215 : g ? 1 : 0);
}
function Rt(A, I) {
  const g = k.orderTickIndexes(A, I);
  return P(g);
}
function HI(A, I, g) {
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
function qC(A, I, g, C, B, Q) {
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
function OC(A, I, g, C, B, Q, E, i) {
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
function yt(A, I, g, C, B, Q, E) {
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
function kt(A, I, g, C, B, Q, E) {
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
function Mt(A, I, g, C, B, Q, E) {
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
function St(A, I) {
  const g = String(R(I)), C = Kg(g, k.__wbindgen_export_0, k.__wbindgen_export_1), B = NI;
  Y().setInt32(A + 4 * 1, B, !0), Y().setInt32(A + 4 * 0, C, !0);
}
function Gt(A) {
  const I = R(A).buffer;
  return N(I);
}
function Ft() {
  return bg(function(A, I) {
    const g = R(A).call(R(I));
    return N(g);
  }, arguments);
}
function ft(A) {
  return R(A).done;
}
function Ut() {
  return bg(function(A, I) {
    const g = Reflect.get(R(A), R(I));
    return N(g);
  }, arguments);
}
function Jt(A, I) {
  const g = R(A)[I >>> 0];
  return N(g);
}
function Yt(A, I) {
  const g = R(A)[R(I)];
  return N(g);
}
function Lt(A, I) {
  const g = R(A)[R(I)];
  return N(g);
}
function pt(A) {
  let I;
  try {
    I = R(A) instanceof ArrayBuffer;
  } catch {
    I = !1;
  }
  return I;
}
function mt(A) {
  let I;
  try {
    I = R(A) instanceof Uint8Array;
  } catch {
    I = !1;
  }
  return I;
}
function Kt(A) {
  return Array.isArray(R(A));
}
function bt(A) {
  return Number.isSafeInteger(R(A));
}
function Ht() {
  return N(Symbol.iterator);
}
function Tt(A) {
  return R(A).length;
}
function qt(A) {
  return R(A).length;
}
function Ot() {
  const A = new Object();
  return N(A);
}
function xt() {
  const A = new Array();
  return N(A);
}
function Vt(A) {
  const I = new Uint8Array(R(A));
  return N(I);
}
function _t(A) {
  const I = R(A).next;
  return N(I);
}
function Zt() {
  return bg(function(A) {
    const I = R(A).next();
    return N(I);
  }, arguments);
}
function Wt(A, I, g) {
  R(A)[I >>> 0] = P(g);
}
function jt(A, I, g) {
  R(A)[P(I)] = P(g);
}
function Xt(A, I, g) {
  R(A).set(R(I), g >>> 0);
}
function vt(A) {
  const I = R(A).value;
  return N(I);
}
function zt(A) {
  return +R(A);
}
function Pt(A) {
  return N(A);
}
function $t(A, I) {
  const g = BigInt.asUintN(64, A) << BigInt(64) | BigInt.asUintN(64, I);
  return N(g);
}
function An(A) {
  const I = BigInt.asUintN(64, A);
  return N(I);
}
function In(A, I) {
  const g = R(I), C = typeof g == "bigint" ? g : void 0;
  Y().setBigInt64(A + 8 * 1, z(C) ? BigInt(0) : C, !0), Y().setInt32(A + 4 * 0, !z(C), !0);
}
function gn(A) {
  const I = R(A);
  return typeof I == "boolean" ? I ? 1 : 0 : 2;
}
function Bn(A, I) {
  const g = Ng(R(I)), C = Kg(g, k.__wbindgen_export_0, k.__wbindgen_export_1), B = NI;
  Y().setInt32(A + 4 * 1, B, !0), Y().setInt32(A + 4 * 0, C, !0);
}
function Cn(A, I) {
  const g = new Error(Hg(A, I));
  return N(g);
}
function Qn(A, I) {
  return R(A) in R(I);
}
function En(A) {
  return Array.isArray(R(A));
}
function en(A) {
  return typeof R(A) == "bigint";
}
function on(A) {
  return typeof R(A) == "function";
}
function tn(A) {
  const I = R(A);
  return typeof I == "object" && I !== null;
}
function nn(A) {
  return R(A) === void 0;
}
function rn(A, I) {
  return R(A) === R(I);
}
function an(A, I) {
  return R(A) == R(I);
}
function sn() {
  const A = k.memory;
  return N(A);
}
function cn(A, I) {
  const g = R(I), C = typeof g == "number" ? g : void 0;
  Y().setFloat64(A + 8 * 1, z(C) ? 0 : C, !0), Y().setInt32(A + 4 * 0, !z(C), !0);
}
function Dn(A) {
  return N(A);
}
function wn(A) {
  const I = R(A);
  return N(I);
}
function ln(A) {
  P(A);
}
function dn(A, I) {
  const g = R(A) >> R(I);
  return N(g);
}
function un(A, I) {
  const g = R(I), C = typeof g == "string" ? g : void 0;
  var B = z(C) ? 0 : Kg(C, k.__wbindgen_export_0, k.__wbindgen_export_1), Q = NI;
  Y().setInt32(A + 4 * 1, Q, !0), Y().setInt32(A + 4 * 0, B, !0);
}
function hn(A, I) {
  const g = Hg(A, I);
  return N(g);
}
function Nn(A, I) {
  throw new Error(Hg(A, I));
}
URL = globalThis.URL;
const Rn = await ct({ "./orca_whirlpools_core_js_bindings_bg.js": {
  __wbindgen_object_drop_ref: ln,
  __wbindgen_string_new: hn,
  __wbindgen_bigint_get_as_i64: In,
  __wbindgen_debug_string: Bn,
  __wbindgen_throw: Nn,
  __wbindgen_memory: sn,
  __wbindgen_string_get: un,
  __wbg_get_67b2ba62fc30de12: Ut,
  __wbg_get_b9b93047fe3cf45b: Jt,
  __wbg_length_e2d2a49132c1b256: qt,
  __wbindgen_object_clone_ref: wn,
  __wbindgen_is_function: on,
  __wbg_new_78feb108b6472713: xt,
  __wbindgen_number_new: Dn,
  __wbindgen_is_object: tn,
  __wbg_next_25feadfc0913fea9: _t,
  __wbg_next_6574e1a8a62d1055: Zt,
  __wbg_done_769e5ede4b31c67b: ft,
  __wbg_value_cd1ffa7b1ab794f1: vt,
  __wbg_iterator_9a24c88df860dc65: Ht,
  __wbg_call_672a4d21634d4a24: Ft,
  __wbg_new_405e22f390576ce2: Ot,
  __wbindgen_number_get: cn,
  __wbindgen_is_undefined: nn,
  __wbg_set_37837023f3d740e8: Wt,
  __wbg_isArray_a1eab7e0d067391b: Kt,
  __wbg_instanceof_ArrayBuffer_e14585432e3737fc: pt,
  __wbg_isSafeInteger_343e2beeeece1bb0: bt,
  __wbg_buffer_609cc3eee51ed158: Gt,
  __wbg_new_a12002a7f91c75be: Vt,
  __wbg_set_65595bdd868b3009: Xt,
  __wbg_length_a446193dc22c12f8: Tt,
  __wbg_instanceof_Uint8Array_17156bcf118086a9: mt,
  __wbindgen_jsval_loose_eq: an,
  __wbindgen_boolean_get: gn,
  __wbindgen_as_number: zt,
  __wbindgen_error_new: Cn,
  __wbindgen_bigint_from_i64: Pt,
  __wbindgen_bigint_from_u64: An,
  __wbindgen_bigint_from_u128: $t,
  __wbg_getwithrefkey_1dc361bd10053bfe: Yt,
  __wbg_String_eecc4a11987127d6: St,
  __wbg_getwithrefkey_6550b2c093d2eb18: Lt,
  __wbg_set_3807d5f0bfc24aa7: jt,
  __wbindgen_shr: dn,
  __wbindgen_jsval_eq: rn,
  __wbindgen_in: Qn,
  __wbindgen_is_bigint: en,
  __wbindgen_is_array: En
} }, st), {
  memory: yn,
  getTickArrayStartTickIndex: kn,
  tickIndexToSqrtPrice: Mn,
  sqrtPriceToTickIndex: Sn,
  getInitializableTickIndex: Gn,
  getPrevInitializableTickIndex: Fn,
  getNextInitializableTickIndex: fn,
  isTickIndexInBounds: Un,
  isTickInitializable: Jn,
  invertTickIndex: Yn,
  invertSqrtPrice: Ln,
  getFullRangeTickIndexes: pn,
  orderTickIndexes: mn,
  isFullRangeOnly: Kn,
  getTickIndexInArray: bn,
  collectFeesQuote: Hn,
  _REDUCTION_FACTOR_DENOMINATOR: Tn,
  _ADAPTIVE_FEE_CONTROL_FACTOR_DENOMINATOR: qn,
  _MAX_REFERENCE_AGE: On,
  _TICK_ARRAY_NOT_EVENLY_SPACED: xn,
  _TICK_INDEX_OUT_OF_BOUNDS: Vn,
  _INVALID_TICK_INDEX: _n,
  _ARITHMETIC_OVERFLOW: Zn,
  _AMOUNT_EXCEEDS_MAX_U64: Wn,
  _SQRT_PRICE_OUT_OF_BOUNDS: jn,
  _TICK_SEQUENCE_EMPTY: Xn,
  _SQRT_PRICE_LIMIT_OUT_OF_BOUNDS: vn,
  _INVALID_SQRT_PRICE_LIMIT_DIRECTION: zn,
  _ZERO_TRADABLE_AMOUNT: Pn,
  _INVALID_TIMESTAMP: $n,
  _INVALID_TRANSFER_FEE: Ar,
  _INVALID_SLIPPAGE_TOLERANCE: Ir,
  _TICK_INDEX_NOT_IN_ARRAY: gr,
  _INVALID_TICK_ARRAY_SEQUENCE: Br,
  _INVALID_ADAPTIVE_FEE_INFO: Cr,
  _VOLATILITY_ACCUMULATOR_SCALE_FACTOR: Qr,
  _FEE_RATE_HARD_LIMIT: Er,
  decreaseLiquidityQuote: ir,
  decreaseLiquidityQuoteA: er,
  decreaseLiquidityQuoteB: or,
  increaseLiquidityQuote: tr,
  increaseLiquidityQuoteA: nr,
  increaseLiquidityQuoteB: rr,
  _NUM_REWARDS: ar,
  isInitializedWithAdaptiveFee: sr,
  collectRewardsQuote: cr,
  tryGetAmountDeltaA: Dr,
  tryGetAmountDeltaB: wr,
  tryGetNextSqrtPriceFromA: lr,
  tryGetNextSqrtPriceFromB: dr,
  tryApplyTransferFee: ur,
  tryReverseApplyTransferFee: hr,
  tryGetMaxAmountWithSlippageTolerance: Nr,
  tryGetMinAmountWithSlippageTolerance: Rr,
  tryApplySwapFee: yr,
  tryReverseApplySwapFee: kr,
  swapQuoteByInputToken: Mr,
  swapQuoteByOutputToken: Sr,
  _TICK_ARRAY_SIZE: Gr,
  _FULL_RANGE_ONLY_TICK_SPACING_THRESHOLD: Fr,
  _MIN_TICK_INDEX: fr,
  _MAX_TICK_INDEX: Ur,
  priceToSqrtPrice: Jr,
  sqrtPriceToPrice: Yr,
  invertPrice: Lr,
  tickIndexToPrice: pr,
  priceToTickIndex: mr,
  getSqrtPriceSlippageBounds: Kr,
  firstUnoccupiedPositionInBundle: br,
  isPositionBundleFull: Hr,
  isPositionBundleEmpty: Tr,
  _POSITION_BUNDLE_SIZE: qr,
  _FEE_RATE_DENOMINATOR: Or,
  isPositionInRange: xr,
  positionStatus: Vr,
  positionRatio: _r,
  __wbindgen_export_0: Zr,
  __wbindgen_export_1: Wr,
  __wbindgen_export_2: jr,
  __wbindgen_add_to_stack_pointer: Xr
} = Rn, vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _ADAPTIVE_FEE_CONTROL_FACTOR_DENOMINATOR: qn,
  _AMOUNT_EXCEEDS_MAX_U64: Wn,
  _ARITHMETIC_OVERFLOW: Zn,
  _FEE_RATE_DENOMINATOR: Or,
  _FEE_RATE_HARD_LIMIT: Er,
  _FULL_RANGE_ONLY_TICK_SPACING_THRESHOLD: Fr,
  _INVALID_ADAPTIVE_FEE_INFO: Cr,
  _INVALID_SLIPPAGE_TOLERANCE: Ir,
  _INVALID_SQRT_PRICE_LIMIT_DIRECTION: zn,
  _INVALID_TICK_ARRAY_SEQUENCE: Br,
  _INVALID_TICK_INDEX: _n,
  _INVALID_TIMESTAMP: $n,
  _INVALID_TRANSFER_FEE: Ar,
  _MAX_REFERENCE_AGE: On,
  _MAX_TICK_INDEX: Ur,
  _MIN_TICK_INDEX: fr,
  _NUM_REWARDS: ar,
  _POSITION_BUNDLE_SIZE: qr,
  _REDUCTION_FACTOR_DENOMINATOR: Tn,
  _SQRT_PRICE_LIMIT_OUT_OF_BOUNDS: vn,
  _SQRT_PRICE_OUT_OF_BOUNDS: jn,
  _TICK_ARRAY_NOT_EVENLY_SPACED: xn,
  _TICK_ARRAY_SIZE: Gr,
  _TICK_INDEX_NOT_IN_ARRAY: gr,
  _TICK_INDEX_OUT_OF_BOUNDS: Vn,
  _TICK_SEQUENCE_EMPTY: Xn,
  _VOLATILITY_ACCUMULATOR_SCALE_FACTOR: Qr,
  _ZERO_TRADABLE_AMOUNT: Pn,
  __wbindgen_add_to_stack_pointer: Xr,
  __wbindgen_export_0: Zr,
  __wbindgen_export_1: Wr,
  __wbindgen_export_2: jr,
  collectFeesQuote: Hn,
  collectRewardsQuote: cr,
  decreaseLiquidityQuote: ir,
  decreaseLiquidityQuoteA: er,
  decreaseLiquidityQuoteB: or,
  firstUnoccupiedPositionInBundle: br,
  getFullRangeTickIndexes: pn,
  getInitializableTickIndex: Gn,
  getNextInitializableTickIndex: fn,
  getPrevInitializableTickIndex: Fn,
  getSqrtPriceSlippageBounds: Kr,
  getTickArrayStartTickIndex: kn,
  getTickIndexInArray: bn,
  increaseLiquidityQuote: tr,
  increaseLiquidityQuoteA: nr,
  increaseLiquidityQuoteB: rr,
  invertPrice: Lr,
  invertSqrtPrice: Ln,
  invertTickIndex: Yn,
  isFullRangeOnly: Kn,
  isInitializedWithAdaptiveFee: sr,
  isPositionBundleEmpty: Tr,
  isPositionBundleFull: Hr,
  isPositionInRange: xr,
  isTickIndexInBounds: Un,
  isTickInitializable: Jn,
  memory: yn,
  orderTickIndexes: mn,
  positionRatio: _r,
  positionStatus: Vr,
  priceToSqrtPrice: Jr,
  priceToTickIndex: mr,
  sqrtPriceToPrice: Yr,
  sqrtPriceToTickIndex: Sn,
  swapQuoteByInputToken: Mr,
  swapQuoteByOutputToken: Sr,
  tickIndexToPrice: pr,
  tickIndexToSqrtPrice: Mn,
  tryApplySwapFee: yr,
  tryApplyTransferFee: ur,
  tryGetAmountDeltaA: Dr,
  tryGetAmountDeltaB: wr,
  tryGetMaxAmountWithSlippageTolerance: Nr,
  tryGetMinAmountWithSlippageTolerance: Rr,
  tryGetNextSqrtPriceFromA: lr,
  tryGetNextSqrtPriceFromB: dr,
  tryReverseApplySwapFee: kr,
  tryReverseApplyTransferFee: hr
}, Symbol.toStringTag, { value: "Module" }));
Dt(vr);
var xC = /* @__PURE__ */ ((A) => (A[A.Uninitialized = 0] = "Uninitialized", A[A.Initialized = 1] = "Initialized", A[A.Frozen = 2] = "Frozen", A))(xC || {});
function zr() {
  return nC(xC);
}
function Pr() {
  return tA(dA(), 36);
}
function sI() {
  return tA(dA(), 64);
}
function $r() {
  return iC(
    [
      ["Uninitialized", xA()],
      [
        "TransferFeeConfig",
        F(
          y([
            ["transferFeeConfigAuthority", h()],
            ["withdrawWithheldAuthority", h()],
            ["withheldAmount", U()],
            ["olderTransferFee", GB()],
            ["newerTransferFee", GB()]
          ]),
          f()
        )
      ],
      [
        "TransferFeeAmount",
        F(
          y([["withheldAmount", U()]]),
          f()
        )
      ],
      [
        "MintCloseAuthority",
        F(
          y([["closeAuthority", h()]]),
          f()
        )
      ],
      [
        "ConfidentialTransferMint",
        F(
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
          f()
        )
      ],
      [
        "ConfidentialTransferAccount",
        F(
          y([
            ["approved", eA()],
            ["elgamalPubkey", h()],
            ["pendingBalanceLow", sI()],
            ["pendingBalanceHigh", sI()],
            ["availableBalance", sI()],
            ["decryptableAvailableBalance", Pr()],
            ["allowConfidentialCredits", eA()],
            ["allowNonConfidentialCredits", eA()],
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
          y([["state", zr()]]),
          f()
        )
      ],
      [
        "ImmutableOwner",
        F(y([]), f())
      ],
      [
        "MemoTransfer",
        F(
          y([
            ["requireIncomingTransferMemos", eA()]
          ]),
          f()
        )
      ],
      [
        "NonTransferable",
        F(y([]), f())
      ],
      [
        "InterestBearingConfig",
        F(
          y([
            ["rateAuthority", h()],
            ["initializationTimestamp", U()],
            ["preUpdateAverageRate", iB()],
            ["lastUpdateTimestamp", U()],
            ["currentRate", iB()]
          ]),
          f()
        )
      ],
      [
        "CpiGuard",
        F(
          y([["lockCpi", eA()]]),
          f()
        )
      ],
      [
        "PermanentDelegate",
        F(
          y([["delegate", h()]]),
          f()
        )
      ],
      [
        "NonTransferableAccount",
        F(y([]), f())
      ],
      [
        "TransferHook",
        F(
          y([
            ["authority", h()],
            ["programId", h()]
          ]),
          f()
        )
      ],
      [
        "TransferHookAccount",
        F(
          y([["transferring", eA()]]),
          f()
        )
      ],
      [
        "ConfidentialTransferFee",
        F(
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
          f()
        )
      ],
      [
        "ConfidentialTransferFeeAmount",
        F(
          y([["withheldAmount", sI()]]),
          f()
        )
      ],
      [
        "MetadataPointer",
        F(
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
          f()
        )
      ],
      [
        "TokenMetadata",
        F(
          y([
            [
              "updateAuthority",
              V(h(), {
                prefix: null,
                noneValue: "zeroes"
              })
            ],
            ["mint", h()],
            ["name", F(aI(), oA())],
            ["symbol", F(aI(), oA())],
            ["uri", F(aI(), oA())],
            [
              "additionalMetadata",
              oi(
                F(aI(), oA()),
                F(aI(), oA())
              )
            ]
          ]),
          f()
        )
      ],
      [
        "GroupPointer",
        F(
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
          f()
        )
      ],
      [
        "TokenGroup",
        F(
          y([
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
          f()
        )
      ],
      [
        "TokenGroupMember",
        F(
          y([
            ["mint", h()],
            ["group", h()],
            ["memberNumber", U()]
          ]),
          f()
        )
      ],
      ["ConfidentialMintBurn", xA()],
      [
        "ScaledUiAmountConfig",
        F(
          y([
            ["authority", h()],
            ["multiplier", cg()],
            ["newMultiplierEffectiveTimestamp", U()],
            ["newMultiplier", cg()]
          ]),
          f()
        )
      ],
      [
        "PausableConfig",
        F(
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
          f()
        )
      ],
      ["PausableAccount", xA()]
    ],
    { size: f() }
  );
}
function GB() {
  return y([
    ["epoch", U()],
    ["maximumFee", U()],
    ["transferFeeBasisPoints", f()]
  ]);
}
function Aa() {
  return y([
    [
      "mintAuthority",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    ["supply", U()],
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
        ei(
          bA($r(), { size: "remainder" }),
          [BC(NE(QA(), 83).encode(1))]
        ),
        { prefix: null }
      )
    ]
  ]);
}
function Ia(A) {
  return GA(
    A,
    Aa()
  );
}
async function ga(A, I, g) {
  const C = await Tg(A, I, g);
  return yI(C), C;
}
async function Tg(A, I, g) {
  return (await EI(A, I, g)).map((B) => Ia(B));
}
var Ba = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", RI = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
function Ca(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function Qa(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const C = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: Ca(g.value),
      role: FB(g.value) ? WI(C) : C,
      ...FB(g.value) ? { signer: g.value } : {}
    });
  };
}
function FB(A) {
  return !!A && typeof A == "object" && "address" in A && eI(A);
}
var Ea = 1;
function ia() {
  return m(
    b([["discriminator", QA()]]),
    (A) => ({
      ...A,
      discriminator: Ea
    })
  );
}
function ea(A, I) {
  const g = Ba, B = {
    payer: { value: A.payer ?? null, isWritable: !0 },
    ata: { value: A.ata ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 },
    mint: { value: A.mint ?? null, isWritable: !1 },
    systemProgram: { value: A.systemProgram ?? null, isWritable: !1 },
    tokenProgram: { value: A.tokenProgram ?? null, isWritable: !1 }
  };
  B.tokenProgram.value || (B.tokenProgram.value = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"), B.systemProgram.value || (B.systemProgram.value = "11111111111111111111111111111111");
  const Q = Qa(g);
  return Object.freeze({
    accounts: [
      Q(B.payer),
      Q(B.ata),
      Q(B.owner),
      Q(B.mint),
      Q(B.systemProgram),
      Q(B.tokenProgram)
    ],
    data: ia().encode({}),
    programAddress: g
  });
}
function EA(A, I) {
  if (!A) throw new Error(I || "Assertion failed");
}
EA.ok = EA;
function oa() {
  return y([
    [
      "mintAuthority",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    ["supply", U()],
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
function ta(A) {
  return GA(
    A,
    oa()
  );
}
async function na(A, I, g) {
  const C = await ra(A, I, g);
  return yI(C), C;
}
async function ra(A, I, g) {
  return (await EI(A, I, g)).map((B) => ta(B));
}
var VC = /* @__PURE__ */ ((A) => (A[A.Uninitialized = 0] = "Uninitialized", A[A.Initialized = 1] = "Initialized", A[A.Frozen = 2] = "Frozen", A))(VC || {});
function aa() {
  return nC(VC);
}
function _C() {
  return y([
    ["mint", h()],
    ["owner", h()],
    ["amount", U()],
    [
      "delegate",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    ["state", aa()],
    [
      "isNative",
      V(U(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ],
    ["delegatedAmount", U()],
    [
      "closeAuthority",
      V(h(), {
        prefix: oA(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function sa(A) {
  return GA(
    A,
    _C()
  );
}
async function ca(A, I, g) {
  return (await EI(A, I, g)).map((B) => sa(B));
}
function fB() {
  return 165;
}
var Da = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", pA = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
function wa(A) {
  if (!A)
    throw new Error("Expected a Address.");
  return typeof A == "object" && "address" in A ? A.address : Array.isArray(A) ? A[0] : A;
}
function qg(A, I) {
  return (g) => {
    if (!g.value)
      return Object.freeze({
        address: A,
        role: W.READONLY
      });
    const C = g.isWritable ? W.WRITABLE : W.READONLY;
    return Object.freeze({
      address: wa(g.value),
      role: UB(g.value) ? WI(C) : C,
      ...UB(g.value) ? { signer: g.value } : {}
    });
  };
}
function UB(A) {
  return !!A && typeof A == "object" && "address" in A && eI(A);
}
var la = 9;
function da() {
  return m(
    b([["discriminator", QA()]]),
    (A) => ({ ...A, discriminator: la })
  );
}
function ng(A, I) {
  const g = pA, B = {
    account: { value: A.account ?? null, isWritable: !0 },
    destination: { value: A.destination ?? null, isWritable: !0 },
    owner: { value: A.owner ?? null, isWritable: !1 }
  }, E = ({ ...A }.multiSigners ?? []).map(
    (e) => ({
      address: e.address,
      role: W.READONLY_SIGNER,
      signer: e
    })
  ), i = qg(g);
  return Object.freeze({
    accounts: [
      i(B.account),
      i(B.destination),
      i(B.owner),
      ...E
    ],
    data: da().encode({}),
    programAddress: g
  });
}
async function zI(A, I = {}) {
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
var ua = 18;
function ha() {
  return m(
    b([
      ["discriminator", QA()],
      ["owner", IA()]
    ]),
    (A) => ({ ...A, discriminator: ua })
  );
}
function JB(A, I) {
  const g = pA, B = {
    account: { value: A.account ?? null, isWritable: !0 },
    mint: { value: A.mint ?? null, isWritable: !1 }
  }, Q = { ...A }, E = qg(g);
  return Object.freeze({
    accounts: [E(B.account), E(B.mint)],
    data: ha().encode(
      Q
    ),
    programAddress: g
  });
}
var Na = 17;
function Ra() {
  return m(
    b([["discriminator", QA()]]),
    (A) => ({ ...A, discriminator: Na })
  );
}
function ya(A, I) {
  const g = pA, B = {
    account: { value: A.account ?? null, isWritable: !0 }
  }, Q = qg(g);
  return Object.freeze({
    accounts: [Q(B.account)],
    data: Ra().encode({}),
    programAddress: g
  });
}
var II = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr", QI = J(
  "11111111111111111111111111111111"
), ka = 32896, Ma = XA(QI), Og = Ma, Sa = 100, ZC = Sa, Ga = "keypair", OA = Ga;
function YB(A) {
  OA = A;
}
var AA = J(
  "So11111111111111111111111111111111111111112"
);
function Fa(A) {
  return OA === "none" || OA === "ata" ? !0 : A != AA;
}
async function xg(A, I, g) {
  const C = Array.isArray(g) ? g : Object.keys(g), B = C.indexOf(AA), Q = B !== -1, E = await na(A, C.filter(Fa)), i = await Promise.all(
    E.map(
      (n) => zI({
        owner: I.address,
        mint: n.address,
        tokenProgram: n.programAddress
      }).then((d) => d[0])
    )
  ), e = await ca(A, i), o = {}, t = [], r = [];
  for (let n = 0; n < E.length; n++) {
    const d = E[n], c = e[n];
    o[d.address] = c.address, !c.exists && t.push(
      ea({
        payer: I,
        owner: I.address,
        ata: c.address,
        mint: d.address,
        tokenProgram: d.programAddress
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
    const n = await FC(), d = fB();
    let c = await A.getMinimumBalanceForRentExemption(BigInt(d)).send();
    Array.isArray(g) || (c = bI(c + BigInt(g[AA]))), t.push(
      Io({
        payer: I,
        newAccount: n,
        lamports: c,
        space: d,
        programAddress: pA
      }),
      JB({
        account: n.address,
        mint: AA,
        owner: I.address
      })
    ), r.push(
      ng({
        account: n.address,
        owner: I,
        destination: I.address
      })
    ), o[AA] = n.address;
  }
  if (Q && OA === "seed") {
    const n = fB();
    let d = await A.getMinimumBalanceForRentExemption(BigInt(n)).send();
    Array.isArray(g) || (d = bI(d + BigInt(g[AA])));
    const c = Date.now().toString(), u = await crypto.subtle.digest(
      "SHA-256",
      Buffer.concat([
        Buffer.from(IA().encode(I.address)),
        Buffer.from(c),
        Buffer.from(IA().encode(pA))
      ])
    );
    o[AA] = h().decode(
      new Uint8Array(u)
    ), t.push(
      Co({
        payer: I,
        newAccount: o[AA],
        base: I.address,
        baseAccount: I,
        seed: c,
        space: n,
        amount: d,
        programAddress: pA
      }),
      JB({
        account: o[AA],
        mint: AA,
        owner: I.address
      })
    ), r.push(
      ng({
        account: o[AA],
        owner: I,
        destination: I.address
      })
    );
  }
  if (Q && OA === "ata") {
    const n = e[B], d = n.exists ? n.data.amount : 0n;
    !Array.isArray(g) && d < BigInt(g[AA]) && t.push(
      io({
        source: I,
        destination: o[AA],
        amount: BigInt(g[AA]) - d
      }),
      ya({
        account: o[AA]
      })
    ), n.exists || r.push(
      ng({
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
var fa = 128;
function LB(A, I) {
  const g = BigInt(I + fa);
  return A.lamportsPerByteYear * g * BigInt(A.exemptionThreshold);
}
function Ua(A, I, g, C, B, Q) {
  return "liquidity" in A ? yt(
    A.liquidity,
    C,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    B,
    Q
  ) : "tokenA" in A ? kt(
    A.tokenA,
    C,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    B,
    Q
  ) : Mt(
    A.tokenB,
    C,
    I.sqrtPrice,
    g.tickLowerIndex,
    g.tickUpperIndex,
    B,
    Q
  );
}
async function Ja(A, I, g = {}) {
  const C = g.slippageToleranceBps ?? ZC, B = g.authority ?? Og, Q = g.whirlpoolDeployment ?? HA;
  EA(
    B.address !== QI,
    "Either supply an authority or set the default funder"
  );
  const E = await vI(
    I,
    Q.programId
  ), i = await JC(A, E[0]), e = await mg(A, i.data.whirlpool), o = await A.getEpochInfo().send(), [t, r, n, ...d] = await Tg(
    A,
    [
      e.data.tokenMintA,
      e.data.tokenMintB,
      I,
      ...e.data.rewardInfos.map((L) => L.mint).filter((L) => L !== QI)
    ]
  );
  EA(t.exists, "Token A not found"), EA(r.exists, "Token B not found"), EA(n.exists, "Position mint not found");
  const c = RA(t, o.epoch), u = RA(r, o.epoch), s = Ua(
    { liquidity: i.data.liquidity },
    e.data,
    i.data,
    C,
    c,
    u
  ), a = CI(
    i.data.tickLowerIndex,
    e.data.tickSpacing
  ), l = CI(
    i.data.tickUpperIndex,
    e.data.tickSpacing
  ), [G, M, K] = await Promise.all([
    zI({
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
      l,
      Q.programId
    ).then((L) => L[0])
  ]), [q, O] = await bC(A, [
    M,
    K
  ]), j = q.data.ticks[HI(
    i.data.tickLowerIndex,
    a,
    e.data.tickSpacing
  )], X = O.data.ticks[HI(
    i.data.tickUpperIndex,
    l,
    e.data.tickSpacing
  )], rA = qC(
    e.data,
    i.data,
    j,
    X,
    c,
    u
  ), JA = BigInt(Math.floor(Date.now() / 1e3)), v = OC(
    e.data,
    i.data,
    j,
    X,
    JA,
    RA(d[0], o.epoch),
    RA(d[1], o.epoch),
    RA(d[2], o.epoch)
  ), p = /* @__PURE__ */ new Set();
  (s.liquidityDelta > 0n || rA.feeOwedA > 0n || rA.feeOwedB > 0n) && (p.add(e.data.tokenMintA), p.add(e.data.tokenMintB));
  for (let L = 0; L < v.rewards.length; L++)
    v.rewards[L].rewardsOwed > 0n && p.add(e.data.rewardInfos[L].mint);
  const { createInstructions: S, cleanupInstructions: BA, tokenAccountAddresses: wA } = await xg(
    A,
    B,
    Array.from(p)
  ), iA = [];
  iA.push(...S), s.liquidityDelta > 0n && iA.push(
    Wo(
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
        tickArrayUpper: K,
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
  for (let L = 0; L < v.rewards.length; L++) {
    if (v.rewards[L].rewardsOwed === 0n)
      continue;
    const zA = d[L];
    EA(zA.exists, `Reward mint ${L} not found`), iA.push(
      mC(
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
    case pA:
      iA.push(
        Ko(
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
        To(
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
  return iA.push(...BA), {
    instructions: iA,
    quote: s,
    feesQuote: rA,
    rewardsQuote: v
  };
}
var rg = 100;
async function ag(A, I, g) {
  const C = Math.ceil(I.length / rg), B = [...Array(C).keys()].map(
    (E) => I.slice(E * rg, (E + 1) * rg)
  ), Q = [];
  for (const E of B)
    (await EI(A, E)).forEach((e, o) => {
      const t = g(e);
      Q.push(t);
    });
  return Q;
}
function Ya(A, I) {
  const g = Buffer.from(A.positionBitmap), C = [];
  for (let B = 0; B < Nt(); B++) {
    const Q = Math.floor(B / 8), E = B % 8;
    g[Q] & 1 << E && C.push(
      ot(
        A.positionBundleMint,
        B,
        I
      ).then((i) => i[0])
    );
  }
  return C;
}
async function La(A, I, g = HA) {
  const C = g.programId, [B, Q] = await Promise.all([
    A.getTokenAccountsByOwner(
      I,
      { programId: pA },
      { encoding: "base64" }
    ).send(),
    A.getTokenAccountsByOwner(
      I,
      { programId: RI },
      { encoding: "base64" }
    ).send()
  ]), E = XB(), i = _C(), e = [...B.value, ...Q.value].map((a) => ({
    ...i.decode(E.encode(a.account.data[0])),
    tokenProgram: a.account.owner
  })).filter((a) => a.amount === 1n), o = await Promise.all(
    e.map(
      (a) => vI(a.mint, C).then((l) => l[0])
    )
  ), t = await Promise.all(
    e.map(
      (a) => et(a.mint, C).then((l) => l[0])
    )
  ), r = await ag(
    A,
    o,
    hg
  ), n = await ag(
    A,
    t,
    fo
  ), d = await Promise.all(
    n.filter((a) => a.exists).flatMap((a) => Ya(a.data, C))
  ), u = (await ag(
    A,
    d,
    hg
  )).filter((a) => a.exists).map((a) => (xI(a), a)).reduce((a, l) => {
    const G = a.get(l.data.positionMint) ?? [];
    return a.set(l.data.positionMint, [...G, l]);
  }, /* @__PURE__ */ new Map()), s = [];
  for (let a = 0; a < e.length; a++) {
    const l = r[a], G = n[a], M = e[a];
    if (l.exists && s.push({
      ...l,
      tokenProgram: M.tokenProgram,
      isPositionBundle: !1
    }), G.exists) {
      const K = u.get(G.data.positionBundleMint) ?? [];
      s.push({
        ...G,
        positions: K,
        tokenProgram: M.tokenProgram,
        isPositionBundle: !0
      });
    }
  }
  return s;
}
async function WC(A, I, g = {}) {
  const C = g.authority ?? Og, B = g.whirlpoolDeployment ?? HA;
  EA(
    C.address !== QI,
    "Either supply an authority or set the default funder"
  );
  const Q = await A.getEpochInfo().send(), E = await vI(
    I,
    B.programId
  ), i = await JC(A, E[0]), e = await mg(A, i.data.whirlpool), [o, t, r, ...n] = await Tg(
    A,
    [
      e.data.tokenMintA,
      e.data.tokenMintB,
      I,
      ...e.data.rewardInfos.map((S) => S.mint).filter((S) => S !== QI)
    ]
  );
  EA(o.exists, "Token A not found"), EA(t.exists, "Token B not found"), EA(r.exists, "Position mint not found");
  const d = CI(
    i.data.tickLowerIndex,
    e.data.tickSpacing
  ), c = CI(
    i.data.tickUpperIndex,
    e.data.tickSpacing
  ), [u, s, a] = await Promise.all([
    zI({
      owner: C.address,
      mint: I,
      tokenProgram: r.programAddress
    }).then((S) => S[0]),
    BI(
      e.address,
      d,
      B.programId
    ).then((S) => S[0]),
    BI(
      e.address,
      c,
      B.programId
    ).then((S) => S[0])
  ]), [l, G] = await bC(A, [
    s,
    a
  ]), M = l.data.ticks[HI(
    i.data.tickLowerIndex,
    d,
    e.data.tickSpacing
  )], K = G.data.ticks[HI(
    i.data.tickUpperIndex,
    c,
    e.data.tickSpacing
  )], q = qC(
    e.data,
    i.data,
    M,
    K,
    RA(o, Q.epoch),
    RA(t, Q.epoch)
  ), O = BigInt(Math.floor(Date.now() / 1e3)), j = OC(
    e.data,
    i.data,
    M,
    K,
    O,
    RA(n[0], Q.epoch),
    RA(n[1], Q.epoch),
    RA(n[2], Q.epoch)
  ), X = /* @__PURE__ */ new Set();
  (q.feeOwedA > 0n || q.feeOwedB > 0n) && (X.add(e.data.tokenMintA), X.add(e.data.tokenMintB));
  for (let S = 0; S < j.rewards.length; S++)
    j.rewards[S].rewardsOwed > 0n && X.add(e.data.rewardInfos[S].mint);
  const { createInstructions: rA, cleanupInstructions: JA, tokenAccountAddresses: v } = await xg(
    A,
    C,
    Array.from(X)
  ), p = [];
  p.push(...rA), i.data.liquidity > 0n && p.push(
    Ct(
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
        tokenOwnerAccountA: v[e.data.tokenMintA],
        tokenOwnerAccountB: v[e.data.tokenMintB],
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
    const BA = n[S];
    EA(BA.exists, `Reward mint ${S} not found`), p.push(
      mC(
        {
          whirlpool: e.address,
          positionAuthority: C,
          position: E[0],
          positionTokenAccount: u,
          rewardOwnerAccount: v[BA.address],
          rewardVault: e.data.rewardInfos[S].vault,
          rewardIndex: S,
          rewardMint: BA.address,
          rewardTokenProgram: BA.programAddress,
          memoProgram: II,
          remainingAccountsInfo: null
        },
        { programAddress: B.programId }
      )
    );
  }
  return p.push(...JA), {
    feesQuote: q,
    rewardsQuote: j,
    instructions: p
  };
}
async function pa(A, {
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
  ...d
}) {
  const {
    createInstructions: c,
    cleanupInstructions: u,
    tokenAccountAddresses: s
  } = await xg(A, r, {
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
    ...d
  }, { minSqrtPrice: l, maxSqrtPrice: G } = ht(
    g,
    t
  ), M = vo(
    {
      method: co("ByTokenAmounts", {
        minSqrtPrice: l,
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
async function ma(A, I, g, C, B, Q, E, i, e, o, t) {
  EA(
    o.address !== QI,
    "Either supply a funder or set the default funder"
  );
  const r = [], n = await at(A);
  let d = 0n;
  const c = Rt(C, B), u = SB(
    c.tickLowerIndex,
    I.data.tickSpacing,
    !1
  ), s = SB(
    c.tickUpperIndex,
    I.data.tickSpacing,
    !0
  ), a = await FC(), l = CI(
    u,
    I.data.tickSpacing
  ), G = CI(
    s,
    I.data.tickSpacing
  ), [
    M,
    K,
    q,
    O
  ] = await Promise.all([
    vI(a.address, t.programId),
    zI({
      owner: o.address,
      mint: a.address,
      tokenProgram: RI
    }).then((p) => p[0]),
    BI(
      I.address,
      l,
      t.programId
    ).then((p) => p[0]),
    BI(
      I.address,
      G,
      t.programId
    ).then((p) => p[0])
  ]), {
    createTokenAccountInstructions: j,
    increaseLiquidityInstruction: X,
    cleanupInstructions: rA
  } = await pa(A, {
    whirlpool: I,
    position: M[0],
    positionTokenAccount: K,
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
  const [JA, v] = await HC(A, [
    q,
    O
  ]);
  return JA.exists || (r.push(
    RB(
      {
        whirlpool: I.address,
        funder: o,
        tickArray: q,
        startTickIndex: l,
        idempotent: !1
      },
      { programAddress: t.programId }
    )
  ), d += LB(
    n,
    kB()
  )), !v.exists && l !== G && (r.push(
    RB(
      {
        whirlpool: I.address,
        funder: o,
        tickArray: O,
        startTickIndex: G,
        idempotent: !1
      },
      { programAddress: t.programId }
    )
  ), d += LB(
    n,
    kB()
  )), r.push(
    It(
      {
        funder: o,
        owner: o.address,
        position: M[0],
        positionMint: a,
        positionTokenAccount: K,
        whirlpool: I.address,
        associatedTokenProgram: Da,
        tickLowerIndex: u,
        tickUpperIndex: s,
        token2022Program: RI,
        metadataUpdateAuth: J(
          "3axbTs2z5GBy6usVbNVoqEgZMng3vZvMnAoX29BFfwhr"
        ),
        withTokenMetadataExtension: e
      },
      { programAddress: t.programId }
    )
  ), r.push(X), r.push(...rA), {
    instructions: r,
    positionMint: a.address,
    initializationCost: bI(d)
  };
}
async function jC(A, I, g, C, B, Q = {}) {
  const E = Q.slippageToleranceBps ?? ZC, i = Q.withTokenMetadataExtension ?? !0, e = Q.funder ?? Og, o = Q.whirlpoolDeployment ?? HA, t = await mg(A, I);
  Ka(t.data);
  const [r, n] = await ga(A, [
    t.data.tokenMintA,
    t.data.tokenMintB
  ]), d = r.data.decimals, c = n.data.decimals, u = MB(C, d, c), s = MB(B, d, c);
  return ma(
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
function Ka(A) {
  EA(
    A.tickSpacing !== ka,
    "Splash pools only support full range positions"
  );
}
typeof globalThis.Buffer > "u" && (globalThis.Buffer = { from: (A) => typeof A == "string" ? new TextEncoder().encode(A) : Uint8Array.from(A) });
const ba = J("ComputeBudget111111111111111111111111111111"), JI = {
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: "USDT"
}, TI = 1232, XC = 2e4, Vg = (A) => new Promise((I) => setTimeout(I, A));
function vA(A) {
  const I = Oe({ url: A });
  return xe(async (C) => {
    for (let B = 0; ; B++)
      try {
        return await I(C);
      } catch (Q) {
        const E = Q && Q.context && Q.context.statusCode;
        if (!(E === 429 || E >= 500 && E < 600 || /8100002/.test(String(Q && Q.message))) || B >= 5) throw Q;
        await Vg(400 * Math.pow(2, B) + Math.random() * 200);
      }
  });
}
function Rg(A, I, g) {
  const C = new Uint8Array(1 + g);
  C[0] = A;
  let B = BigInt(I);
  for (let Q = 0; Q < g; Q++)
    C[1 + Q] = Number(B & 0xffn), B >>= 8n;
  return { programAddress: ba, accounts: [], data: C };
}
function qI(A, I) {
  const g = Math.floor((+A || 0) * Math.pow(10, I));
  return BigInt(g > 0 ? g : 0);
}
async function vC(A, I) {
  for (let g = 0; g < 30; g++) {
    await Vg(2e3);
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
async function Ha(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!I) throw new Error("No se cargó la librería de Solana");
  const g = qI(A.amountA, A.decA), C = qI(A.amountB, A.decB);
  if (g <= 0n && C <= 0n) throw new Error("Introduce una cantidad");
  if (!(A.lower > 0) || !(A.upper > A.lower)) throw new Error("Rango de precios no válido");
  const B = vA(A.rpc), Q = XA(J(A.owner)), E = await jC(B, J(A.pool), { tokenMaxA: g, tokenMaxB: C }, A.lower, A.upper, {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    funder: Q
  }), i = (await B.getLatestBlockhash().send()).value, e = async (d) => {
    const c = SI(
      DC({ version: 0 }),
      (s) => GC(Q, s),
      (s) => sC(i, s),
      (s) => wC(d, s)
    ), u = await fC(c);
    return new Uint8Array(uC().encode(u));
  };
  let o = await e([Rg(3, XC, 8)].concat(E.instructions));
  if (o.length > TI && (o = await e(E.instructions)), o.length > TI) throw new Error("La transacción es demasiado grande para enviarla de una vez (" + o.length + " bytes)");
  const t = await A.provider.signAndSendTransaction(I.deserialize(o)), r = t && t.signature || String(t), n = await vC(B, r);
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
async function OI(A, I, g) {
  for (let C = 0; ; C++) {
    const B = await fetch(A, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: I, params: g }) });
    if ((B.status === 429 || B.status >= 500) && C < 5) {
      await Vg(400 * Math.pow(2, C) + Math.random() * 200);
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
async function _g(A, I) {
  const g = window.solanaWeb3 && window.solanaWeb3.VersionedTransaction;
  if (!g) throw new Error("No se cargó la librería de Solana");
  const C = vA(A.rpc), B = A.signer || XA(J(A.owner)), Q = (await C.getLatestBlockhash().send()).value, E = A.alts && A.alts.length ? await ze(A.alts.map((u) => J(u)), C) : null, i = async (u) => {
    let s = SI(
      DC({ version: 0 }),
      (l) => GC(B, l),
      (l) => sC(Q, l),
      (l) => wC(u, l)
    );
    E && (s = Oi(s, E));
    const a = await fC(s);
    return new Uint8Array(uC().encode(a));
  }, e = A.cuLimit ? [Rg(2, A.cuLimit, 4)] : [];
  let o = await i(e.concat([Rg(3, XC, 8)], I));
  if (o.length > TI && (o = await i(e.concat(I))), o.length > TI) {
    const u = new Error("La transacción es demasiado grande (" + o.length + " bytes)");
    throw u.kzBig = !0, u;
  }
  const t = await OI(A.rpc, "simulateTransaction", [pB(o), { encoding: "base64", sigVerify: !1, replaceRecentBlockhash: !0, commitment: "confirmed" }]), r = t && (t.value || t);
  if (r && r.err) {
    const u = (r.logs || []).filter((s) => /Error|error|failed/.test(s)).slice(-2).join(" · ");
    throw new Error("La simulación falló, no se ha enviado nada. " + (u || JSON.stringify(r.err)));
  }
  const n = g.deserialize(o);
  let d;
  if (A.provider.signTransaction) {
    const u = await A.provider.signTransaction(n);
    d = await OI(A.rpc, "sendTransaction", [pB(u.serialize()), { encoding: "base64", skipPreflight: !1, preflightCommitment: "confirmed", maxRetries: 3 }]);
  } else {
    const u = await A.provider.signAndSendTransaction(n);
    d = u && u.signature || String(u);
  }
  const c = await vC(C, d);
  return { signature: d, confirmed: c };
}
function Ta(A, I) {
  const g = atob(A.data), C = new Uint8Array(g.length);
  for (let B = 0; B < g.length; B++) C[B] = g.charCodeAt(B);
  return {
    programAddress: J(A.programId),
    accounts: A.accounts.map((B) => {
      const Q = (B.isSigner ? 2 : 0) + (B.isWritable ? 1 : 0), E = { address: J(B.pubkey), role: Q };
      return B.isSigner && B.pubkey === String(I.address) && (E.signer = I), E;
    }),
    data: C
  };
}
async function qa(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = qI(A.amountA, A.decA), g = qI(A.amountB, A.decB);
  if (I <= 0n && g <= 0n) throw new Error("Introduce una cantidad");
  if (!(A.lower > 0) || !(A.upper > A.lower)) throw new Error("Rango de precios no válido");
  const C = vA(A.rpc), B = XA(J(A.owner));
  let Q;
  YB("ata");
  try {
    Q = await jC(C, J(A.pool), { tokenMaxA: I, tokenMaxB: g }, A.lower, A.upper, {
      slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
      funder: B
    });
  } finally {
    YB("keypair");
  }
  const E = (A.pre || []).map((e) => Ta(e, B)), i = await _g(Object.assign({}, A, { signer: B, cuLimit: A.cuLimit || 1e6 }), E.concat(Q.instructions));
  return Object.assign(i, { positionMint: String(Q.positionMint) });
}
async function Oa(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = vA(A.rpc), g = XA(J(A.owner)), C = await Ja(I, J(A.mint), {
    slippageToleranceBps: Math.max(1, Math.round(A.slipBps || 100)),
    authority: g
  });
  return _g(Object.assign({}, A, { signer: g }), C.instructions);
}
async function xa(A) {
  if (!A || !A.provider || !A.owner) throw new Error("Conecta tu wallet primero");
  const I = vA(A.rpc), g = XA(J(A.owner)), C = await WC(I, J(A.mint), { authority: g });
  return _g(Object.assign({}, A, { signer: g }), C.instructions);
}
const zC = ["5m", "15m", "30m", "1h", "4h", "8h", "24h", "7d", "30d", "365d"];
async function Va(A) {
  try {
    let I = await fetch("https://api.orca.so/v2/solana/pools/" + A + "?stats=" + zC.filter((B) => B !== "365d").join(","));
    if (I.ok || (I = await fetch("https://api.orca.so/v2/solana/pools/" + A)), !I.ok) return null;
    const g = await I.json(), C = g && g.data ? g.data : g;
    return Array.isArray(C) ? C[0] : C;
  } catch {
    return null;
  }
}
const _a = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", Za = { TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: 1, TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb: 1 }, Wa = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function ja(A) {
  const I = [0];
  for (const g of A) {
    let C = Wa.indexOf(g);
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
async function Xa() {
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
function va(A, I, g, C) {
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
async function PC(A, I, g) {
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
async function za(A, I, g, C, B) {
  const Q = await Xa();
  let E = [], i;
  for (let c = 0; c < 3; c++) {
    const u = await OI(A, "getSignaturesForAddress", [I, Object.assign({ limit: 1e3 }, i ? { before: i } : {})]);
    if (E = E.concat(u || []), !u || u.length < 1e3) break;
    i = u[u.length - 1].signature;
  }
  const e = E.length ? E[E.length - 1].blockTime : null;
  let o = E.filter((c) => !c.err);
  o.length > 100 && (o = o.slice(0, 70).concat(o.slice(-30)));
  const t = await PC(o, 3, (c) => OI(A, "getTransaction", [c.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" }])), r = [], n = {};
  t.forEach((c) => {
    if (!c || !c.transaction) return;
    const u = c.transaction.message.instructions || [], s = {};
    (c.meta && c.meta.innerInstructions || []).forEach((a) => s[a.index] = a.instructions || []), u.forEach((a, l) => {
      const G = [a].concat(s[l] || []);
      let M = null;
      G.forEach((K) => {
        if (K.programId === _a && K.data && Array.isArray(K.accounts)) {
          const X = Q[Array.from(ja(K.data).slice(0, 8)).join(",")];
          M = K.accounts.indexOf(I) >= 0 ? { kind: X || "unk", ai: 0, bi: 0, ao: 0, bo: 0 } : null, M && M.kind !== "rew" && r.push(M);
          return;
        }
        if (!M || !Za[K.programId] || !K.parsed) return;
        const q = K.parsed.type;
        if (q !== "transfer" && q !== "transferChecked") return;
        const O = K.parsed.info || {}, j = Number(O.amount || O.tokenAmount && O.tokenAmount.amount || 0);
        if (M.kind === "rew") {
          const X = B[O.source];
          X && (n[X] = (n[X] || 0) + j);
          return;
        }
        O.destination === g ? M.ai += j : O.source === g ? M.ao += j : O.destination === C ? M.bi += j : O.source === C && (M.bo += j);
      });
    });
  });
  const d = [];
  return r.forEach((c) => {
    let u = c.kind;
    u === "unk" && (u = c.ai + c.bi > 0 ? "inc" : c.ao + c.bo > 0 ? "dec" : null), u && (u === "inc" ? d.push({ kind: u, a: c.ai, b: c.bi }) : d.push({ kind: u, a: c.ao, b: c.bo }));
  }), { opened: e, events: d, rewards: n, txCount: E.length };
}
async function Pa(A) {
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
function $a(A) {
  if (!(A > 0)) return "—";
  const I = Math.floor(A / 86400), g = Math.floor(A % 86400 / 3600), C = Math.floor(A % 3600 / 60);
  return I ? I + "d " + g + "h" : g ? g + "h " + C + "m" : Math.max(1, C) + "m";
}
const yg = {};
async function As(A) {
  const I = (A.pools || []).filter((Q) => yg[Q] != null);
  if (!I.length) return {};
  const g = vA(A.rpc), C = await LC(g, I.map((Q) => J(Q))), B = {};
  return C.forEach((Q) => {
    const E = Number(Q.data.sqrtPrice) / 18446744073709552e3;
    B[String(Q.address)] = E * E * yg[String(Q.address)];
  }), B;
}
function mB(A) {
  return A = String(A), A.slice(0, 4) + "…" + A.slice(-4);
}
async function Is(A) {
  const I = vA(A.rpc), g = await La(I, J(A.owner)), C = [];
  if (g.forEach((s) => {
    s.isPositionBundle ? (s.positions || []).forEach((a) => C.push(a)) : C.push(s);
  }), !C.length) return [];
  const B = Array.from(new Set(C.map((s) => String(s.data.whirlpool)))), Q = await LC(I, B.map((s) => J(s))), E = {};
  Q.forEach((s) => E[String(s.address)] = s.data);
  const i = Array.from(new Set(Q.flatMap((s) => [String(s.data.tokenMintA), String(s.data.tokenMintB)]))), e = {}, o = (await I.getMultipleAccounts(i.map((s) => J(s)), { encoding: "jsonParsed" }).send()).value;
  i.forEach((s, a) => {
    const l = o[a] && o[a].data && o[a].data.parsed && o[a].data.parsed.info;
    e[s] = l ? Number(l.decimals) : 6;
  });
  const t = {};
  await Promise.all(B.map(async (s) => t[s] = await Va(s)));
  const r = /* @__PURE__ */ new Set();
  Q.forEach((s) => (s.data.rewardInfos || []).forEach((a) => {
    const l = String(a.mint);
    l !== "11111111111111111111111111111111" && r.add(l);
  }));
  const n = await Pa(Array.from(new Set(i.concat(Array.from(r)))));
  if (Array.from(r).some((s) => e[s] == null)) {
    const s = Array.from(r).filter((l) => e[l] == null), a = (await I.getMultipleAccounts(s.map((l) => J(l)), { encoding: "jsonParsed" }).send()).value;
    s.forEach((l, G) => {
      const M = a[G] && a[G].data && a[G].data.parsed && a[G].data.parsed.info;
      e[l] = M ? Number(M.decimals) : 6;
    });
  }
  const d = XA(J(A.owner)), c = Date.now() / 1e3;
  return (await PC(C, 2, async (s) => {
    const a = s.data, l = E[String(a.whirlpool)];
    if (!l) return null;
    const G = String(l.tokenMintA), M = String(l.tokenMintB), K = e[G], q = e[M], O = t[String(a.whirlpool)] || {}, j = O.tokenA || {}, X = O.tokenB || {}, rA = j.symbol || JI[G] || mB(G), JA = X.symbol || JI[M] || mB(M), v = Math.pow(10, K - q);
    yg[String(a.whirlpool)] = v;
    const p = Number(l.sqrtPrice) / 18446744073709552e3, S = Math.pow(1.0001, a.tickLowerIndex / 2), BA = Math.pow(1.0001, a.tickUpperIndex / 2), wA = Number(a.liquidity);
    let iA = 0, L = 0;
    p <= S ? iA = wA * (1 / S - 1 / BA) : p >= BA ? L = wA * (BA - S) : (iA = wA * (1 / p - 1 / BA), L = wA * (p - S));
    const zA = iA / Math.pow(10, K), $C = L / Math.pow(10, q), GI = p * p * v;
    let YA = n[G], lA = n[M];
    JI[M] && !lA && (lA = 1), JI[G] && !YA && (YA = 1), !YA && lA && (YA = lA * GI), !lA && YA && GI > 0 && (lA = YA / GI);
    const PI = (x, aA) => YA && lA ? x / Math.pow(10, K) * YA + aA / Math.pow(10, q) * lA : null, oI = PI(iA, L);
    let tI = null, $I = 0, Ag = 0, Zg = [];
    try {
      const x = await WC(I, J(String(a.positionMint)), { authority: d });
      $I = Number(x.feesQuote.feeOwedA), Ag = Number(x.feesQuote.feeOwedB), tI = PI($I, Ag), (l.rewardInfos || []).forEach((aA, $A) => {
        const LA = x.rewardsQuote.rewards[$A], uA = String(aA.mint);
        if (!LA || !(Number(LA.rewardsOwed) > 0) || uA === "11111111111111111111111111111111") return;
        const kA = Number(LA.rewardsOwed) / Math.pow(10, e[uA] || 6);
        Zg.push({ mint: uA, amt: kA }), tI != null && n[uA] && (tI += kA * n[uA]);
      });
    } catch {
    }
    let TA = null;
    try {
      const x = {};
      (l.rewardInfos || []).forEach((aA) => x[String(aA.vault)] = String(aA.mint)), TA = await za(A.rpc, String(s.address), String(l.tokenVaultA), String(l.tokenVaultB), x);
    } catch {
    }
    let PA = null, Wg = null, nI = null, jg = null, FI = null, Xg = "—";
    if (TA) {
      TA.opened && (Xg = $a(c - TA.opened));
      let x = 0, aA = 0, $A = 0, LA = 0, uA = 0, kA = 0;
      TA.events.forEach(($) => {
        if ($.kind === "fee") {
          uA += $.a, kA += $.b;
          return;
        }
        const sA = va($.a, $.b, S, BA), hA = sA == null ? 0 : $.a * sA + $.b;
        $.kind === "inc" ? (x += hA, sA != null && hA > 0 && (LA += sA * v * hA, $A += hA)) : aA += hA;
      }), $A > 0 && (jg = LA / $A), lA && (PA = x / Math.pow(10, q) * lA, Wg = aA / Math.pow(10, q) * lA), nI = PI(uA, kA), nI != null && Object.keys(TA.rewards).forEach(($) => {
        n[$] && (nI += TA.rewards[$] / Math.pow(10, e[$] || 6) * n[$]);
      }), PA > 0 && oI != null && (FI = oI + (Wg || 0) + (nI || 0) + (tI || 0) - PA);
    }
    let rI = null, Ig = null;
    try {
      const x = O.stats || {}, aA = Number(l.liquidity);
      if (!(p > S && p < BA))
        rI = { out: !0 }, Ig = 0;
      else if (oI > 0 && aA > 0) {
        const LA = Number(l.feeRate) / 1e6, uA = wA / aA, kA = (sA) => sA ? ((+sA.volume || 0) * LA + (+sA.rewards || 0)) * uA : null, $ = { "5m": 1 / 12, "15m": 0.25, "30m": 0.5, "1h": 1, "4h": 4, "8h": 8, "24h": 24, "7d": 168, "30d": 720, "365d": 8760 };
        rI = {}, zC.forEach((sA) => {
          let hA = kA(x[sA]);
          if (hA == null) {
            const fI = x["30d"] ? ["30d", kA(x["30d"])] : x["24h"] ? ["24h", kA(x["24h"])] : null;
            fI && fI[1] != null && (hA = fI[1] * $[sA] / $[fI[0]]);
          }
          rI[sA] = hA == null ? null : hA / oI * 100;
        }), Ig = rI["24h"];
      }
    } catch {
    }
    return {
      pair: rA + "/" + JA,
      fee: l.feeRate != null ? String(Number(l.feeRate) / 1e4) : "",
      price: GI,
      lo: S * S * v,
      hi: BA * BA * v,
      usd: oI,
      amtA: zA,
      amtB: $C,
      symA: rA,
      symB: JA,
      dep: PA,
      pnl: FI,
      pnlPct: FI != null && PA > 0 ? FI / PA * 100 : null,
      harv: nI,
      pend: tI,
      pendA: $I / Math.pow(10, K),
      pendB: Ag / Math.pow(10, q),
      pendRew: Zg,
      est: rI,
      est24: Ig,
      entry: jg,
      dur: Xg,
      mint: String(a.positionMint),
      pool: String(a.whirlpool)
    };
  })).filter(Boolean);
}
window.kzSdk = { ready: !0, version: "0.6.1", openPosition: Ha, swapAndOpen: qa, positions: Is, closePosition: Oa, harvest: xa, livePrices: As };
window.dispatchEvent(new Event("kzsdk"));
