import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    IMAGES: R2Bucket;
    GOOGLE_PLACES_API_KEY?: string;
  }
}

export {};
