import { defineConfig } from "vite";

import { reactServerPlugin } from "./vite-plugin-react-server";

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "../build/node-server",
    rollupOptions: {
      input: "src/NodeServer.tsx",
      output: {
        preserveModules: true
      }
    },
    ssr: true,
    ssrEmitAssets: true,
    target: "node22"
  },
  plugins: [reactServerPlugin()],
  resolve: {
    conditions: ["react-server"]
  },
  root: "src",
  ssr: {
    optimizeDeps: {
      include: ["react/**/*", "react-server-dom-webpack/server"]
    }
  }
});