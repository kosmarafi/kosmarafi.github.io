import { defineConfig } from "vite";

// Compila src/ray.js (Raydium) en ../sdk/kz-ray.js, aparte del SDK principal: solo se descarga al abrir un pool de Raydium.
export default defineConfig({
  define: { global: "globalThis", "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    target: "esnext",
    outDir: "../sdk",
    emptyOutDir: false,
    lib: { entry: "src/ray.js", formats: ["es"], fileName: () => "kz-ray.js" },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
