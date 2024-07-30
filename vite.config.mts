import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  server: {
    port: 3200,
    // fs: {
    //   // Allow serving files from one level up to the project root
    //   allow: [".."],
    // },
  },
  resolve: {
    alias: {
      process: "process/browser",
    },
  },
  build: {
    outDir: "build",
    sourcemap: false,
    minify: "esbuild",
  },
});
