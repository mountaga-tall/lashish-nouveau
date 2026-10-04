import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getDatabase() {
  try {
    const context = getCloudflareContext();
    return context.env.DB;
  } catch {
    return null;
  }
}