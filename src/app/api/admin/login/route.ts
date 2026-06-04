import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  adminSessionCookie,
  createAdminSessionToken,
  isAdminConfigured,
  verifyAdminCredentials,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin login is not configured. Set ARC_ADMIN_USERNAME, ARC_ADMIN_PASSWORD, and ARC_ADMIN_SESSION_SECRET in .env.local.",
      },
      { status: 503 },
    );
  }

  let username = "";
  let password = "";
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    username = body.username?.trim() ?? "";
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookie(token));

  return NextResponse.json({ ok: true });
}
