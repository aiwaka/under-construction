import type { AstroIntegration } from "astro";
import fs from "fs";
import { createClient } from "microcms-js-sdk";

const PKG_NAME = "astro-load-microcms-image";

export default function preload(): AstroIntegration {
  return {
    name: PKG_NAME,
    hooks: {
      "astro:config:setup": async () => {
        (await import("dotenv")).config();
        const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
        const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY;
        if (!(MICROCMS_SERVICE_DOMAIN && MICROCMS_API_KEY)) {
          throw Error("MICROCMS_XXX_XXX variables are not defined in `.env`.");
        }

        const microCMSClient = createClient({
          serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
          apiKey: process.env.MICROCMS_API_KEY!,
        });
        const imageDataFromMicroCMS = await microCMSClient.get({
          endpoint: "images-in-articles",
          queries: { fields: "id,title,thumbnail,images" },
        });
        const path = new URL(
          "../../generated/images-data.json",
          import.meta.url
        );

        fs.writeFileSync(
          path,
          JSON.stringify(imageDataFromMicroCMS["contents"])
        );
      },
    },
  };
}
