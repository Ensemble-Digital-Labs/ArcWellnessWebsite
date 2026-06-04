import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "arc_admin_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

function sessionSecret(): string | null {
  const secret = process.env.ARC_ADMIN_SESSION_SECRET?.trim();
  return secret && secret.length >= 16 ? secret : null;
}

function adminUsername(): string | null {
  const username = process.env.ARC_ADMIN_USERNAME?.trim();
  return username && username.length >= 2 ? username : null;
}

function adminPassword(): string | null {
  const password = process.env.ARC_ADMIN_PASSWORD?.trim();
  return password && password.length >= 4 ? password : null;
}

export function isAdminConfigured(): boolean {
  return Boolean(sessionSecret() && adminUsername() && adminPassword());
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = adminUsername();
  const expectedPass = adminPassword();
  if (!expectedUser || !expectedPass || !username || !password) return false;
  return safeEqual(username, expectedUser) && safeEqual(password, expectedPass);
}

function signPayload(payload: string): string {
  const secret = sessionSecret();
  if (!secret) throw new Error("Admin session secret is not configured");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createAdminSessionToken(): string {
  const exp = String(Date.now() + SESSION_MAX_AGE_SEC * 1000);
  return `${exp}.${signPayload(exp)}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token || !sessionSecret()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  let signaturesMatch = false;
  try {
    signaturesMatch = timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(signPayload(payload)),
    );
  } catch {
    return false;
  }

  if (!signaturesMatch) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function adminSessionCookie(token: string) {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  };
}

export function clearAdminSessionCookie() {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
