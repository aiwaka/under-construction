/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly MICROCMS_SERVICE_DOMAIN: string;
  readonly MICROCMS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
