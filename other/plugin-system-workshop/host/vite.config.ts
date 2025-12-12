import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        plugin: "./src/plugin-remote/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    })

  ],
});
