// Buffer de Node para el navegador: el SDK de Raydium y web3.js lo usan al cargarse.
import { Buffer } from "buffer";
if (!globalThis.Buffer) globalThis.Buffer = Buffer;
if (!globalThis.process) globalThis.process = { env: {} };
