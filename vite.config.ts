import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Served from norin4.github.io/vpn-v1/ (no custom domain yet).
  // When a domain is attached: set base to "/" AND add public/CNAME in the same commit,
  // otherwise every asset 404s and the page goes blank.
  base: "/vpn-v1/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
