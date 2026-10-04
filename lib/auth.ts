const SESSION_COOKIE = "menushish_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

type AuthUser = {
  id: string;
  email: string | null;
  phone: string | null;
  display_name: string | null;
  created_at: string;
};

const encoder = new TextEncoder();

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(normalized);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function normalizeEmail(value?: string | null) {
  return value?.trim().toLowerCase() || null;
}

export function normalizePhone(value?: string | null) {
  let normalized = value?.trim().replace(/\D/g, "") || "";
  if (normalized.startsWith("00")) normalized = normalized.slice(2);
  if (normalized.startsWith("225")) return normalized;
  if (normalized.length === 10 && normalized.startsWith("0")) return "225" + normalized.slice(1);
  if (normalized.length === 9) return "225" + normalized;
  return normalized || null;
}

export function validatePassword(value?: string | null) {
  return typeof value === "string" && value.length >= 8 && value.length <= 128;
}

export async function hashPassword(password: string, salt?: Uint8Array) {
  const actualSalt = salt ?? crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: actualSalt as unknown as BufferSource, iterations: 120_000, hash: "SHA-256" },
    key,
    256
  );
  return {
    salt: bytesToBase64Url(actualSalt),
    hash: bytesToBase64Url(new Uint8Array(bits)),
  };
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  try {
    const actual = await hashPassword(password, base64UrlToBytes(salt));
    return actual.hash === expectedHash;
  } catch {
    return false;
  }
}

export async function createSession(db: any, userId: string) {
  const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
  const token = bytesToBase64Url(tokenBytes);
  const tokenHash = await sha256Hex(token);
  await db.prepare(
    "INSERT INTO sessions (token_hash,user_id,expires_at) VALUES (?,?,datetime('now','+30 days'))"
  ).bind(tokenHash, userId).run();
  return token;
}

export function sessionCookie(token: string, request?: Request) {
  return [
    SESSION_COOKIE + "=" + token,
    "Path=/",
    "HttpOnly",
    ...(request?.url.startsWith("https://") ? ["Secure"] : []),
    "SameSite=Lax",
    "Max-Age=" + SESSION_MAX_AGE,
  ].join("; ");
}

export function clearSessionCookie(request?: Request) {
  return [
    SESSION_COOKIE + "=",
    "Path=/",
    "HttpOnly",
    ...(request?.url.startsWith("https://") ? ["Secure"] : []),
    "SameSite=Lax",
    "Max-Age=0",
  ].join("; ");
}

function readCookie(request: Request) {
  const raw = request.headers.get("cookie") ?? "";
  const found = raw.split(";").map((part) => part.trim()).find((part) => part.startsWith(SESSION_COOKIE + "="));
  return found ? found.slice((SESSION_COOKIE + "=").length) : null;
}

export async function getAuthUser(db: any, request: Request): Promise<AuthUser | null> {
  const token = readCookie(request);
  if (!token) return null;
  const tokenHash = await sha256Hex(token);
  const user = await db.prepare(
    "SELECT u.id,u.email,u.phone,u.display_name,u.created_at FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at > datetime('now') LIMIT 1"
  ).bind(tokenHash).first() as AuthUser | null;
  return user ?? null;
}

export async function deleteCurrentSession(db: any, request: Request) {
  const token = readCookie(request);
  if (!token) return;
  const tokenHash = await sha256Hex(token);
  await db.prepare("DELETE FROM sessions WHERE token_hash=?").bind(tokenHash).run();
}

export type { AuthUser };
