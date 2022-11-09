import { sveltekit } from "@sveltejs/kit/vite";
import { fileURLToPath } from "node:url";
import type { UserConfig } from "vite";

const config: UserConfig = {
  server: {
    port: 8080
  },
  // @でsrcを参照できるようにしている. tsconfigでもpathを設定する
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  plugins: [sveltekit()]
};

export default config;
