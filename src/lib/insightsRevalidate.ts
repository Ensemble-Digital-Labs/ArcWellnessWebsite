import { revalidatePath } from "next/cache";
import type { InsightEntry } from "@/content/pages/insights";

export function revalidateInsightPaths(entries: readonly InsightEntry[]) {
  revalidatePath("/case-studies");
  for (const entry of entries) {
    revalidatePath(
      entry.kind === "blog" ? `/blog/${entry.slug}` : `/case-studies/${entry.slug}`,
    );
  }
}
