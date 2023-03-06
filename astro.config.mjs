import { defineConfig } from "astro/config";

// https://astro.build/config
import svelte from "@astrojs/svelte";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), image(), mdx()],

  trailingSlash: "always",
  base: import.meta.env.PROD ? "/under-construction" : "",
});
