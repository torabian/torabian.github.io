// vite.config.ts for plugin
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic", // classic runtime uses React.createElement
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: "src/exposed.tsx",
      name: "MyPlugin",
      formats: ["iife"], // output as ES module
    },
    rollupOptions: {
      external: ["react", "react-dom"], // don't bundle React
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"), // <-- replace at build time
  },
});
