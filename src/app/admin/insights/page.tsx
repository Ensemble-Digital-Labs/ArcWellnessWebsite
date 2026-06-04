import { redirect } from "next/navigation";
import { AdminInsightsManager } from "@/app/admin/insights/AdminInsightsManager";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getInsightEntries } from "@/lib/insightsStore";

export default async function AdminInsightsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login?next=/admin/insights");
  }

  const entries = getInsightEntries();

  return <AdminInsightsManager initialEntries={entries} />;
}
