import { defineConfig } from "vite";

// Compila src/met.js (Meteora DLMM) en ../sdk/kz-met.js: solo se descarga cuando hay posiciones o pools de Meteora.
export default defineConfig({
  define: { global: "globalThis", "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    target: "esnext",
    outDir: "../sdk",
    emptyOutDir: false,
    lib: { entry: "src/met.js", formats: ["es"], fileName: () => "kz-met.js" },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
