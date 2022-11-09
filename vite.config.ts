import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  server: {
    port: 8080
  },
  plugins: [sveltekit()]
};

export default config;
