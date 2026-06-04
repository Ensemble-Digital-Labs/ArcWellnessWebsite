import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearAdminSessionCookie } from "@/lib/adminAuth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(clearAdminSessionCookie());
  return NextResponse.json({ ok: true });
}
