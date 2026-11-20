// Buffer de Node para el navegador: el SDK de Raydium y web3.js lo usan al cargarse.
import { Buffer } from "buffer";
// Si ya hay un Buffer reducido (el del SDK de Orca), se sustituye por el completo, que lo incluye todo.
if (!globalThis.Buffer || !globalThis.Buffer.concat || !globalThis.Buffer.alloc) globalThis.Buffer = Buffer;
if (!globalThis.process) globalThis.process = { env: {} };
