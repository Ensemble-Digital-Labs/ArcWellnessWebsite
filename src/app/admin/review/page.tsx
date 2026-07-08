import { redirect } from "next/navigation";
import { AdminClientReviewManager } from "@/app/admin/review/AdminClientReviewManager";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getClientReviewDocument } from "@/lib/clientReviewStore";

export default async function AdminReviewPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login?next=/admin/review");
  }

  const doc = getClientReviewDocument();

  return <AdminClientReviewManager initialDoc={doc} />;
}
