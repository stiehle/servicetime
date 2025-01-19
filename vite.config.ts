import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        math: "parens-division",
      },

      scss: {
        api: "modern-compiler", // or "modern", "legacy"
        importers: [
          // ...
        ],
      },
    },
  },
  plugins: [react()],
  base: "/servicetime/",
});
