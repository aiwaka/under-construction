import type { AstroIntegration } from "astro";
import fs from "fs/promises";

const PKG_NAME = "astro-load-microcms-image";

export default function preload(): AstroIntegration {
  return {
    name: PKG_NAME,
    hooks: {
      "astro:config:setup": async () => {
        console.log("load-microcms-image")
        // await fs.mkdir("dist/assets/preloaded", { recursive: true });
        // const files = await fs.readdir("public/assets/preloaded");
        // await Promise.all(files.map(async file => fs.copyFile(`public/assets/preloaded/${file}`, `dist/assets/preloaded/${file}`)));
      }
    }
  };
}