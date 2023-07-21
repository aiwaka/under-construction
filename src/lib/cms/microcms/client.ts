import { createClient } from "microcms-js-sdk";
/** microCMSに接続するためのクライアントオブジェクト */
export const microCMSClient = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});
