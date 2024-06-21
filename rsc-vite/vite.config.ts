import react from "@vitejs/plugin-react";
import { builtinModules } from "node:module";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "custom",
  build: {
    emptyOutDir: true,
    manifest: true,
    modulePreload: {
      polyfill: false
    },
    outDir: "../build/browser-client",
    sourcemap: true
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"]
      }
    })
  ],
  root: "src",
  server: {
    middlewareMode: true
  },
  ssr: {
    external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
    noExternal: process.env.NODE_ENV === "production" ? [/.*/] : undefined
  }
});