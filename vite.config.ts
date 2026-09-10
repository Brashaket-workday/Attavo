import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" -> relative asset URLs, so it works at any GitHub Pages subpath
// (https://<user>.github.io/<repo>/) without editing this file.
export default defineConfig({ plugins: [react()], base: "./", build: { outDir: "dist" } });
