import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/adminAuth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/insights");
  }

  return (
    <Suspense fallback={<div className="px-6 py-16 text-sm text-arc-charcoal/60">Loading…</div>}>
      <AdminLoginForm configured={isAdminConfigured()} />
    </Suspense>
  );
}
