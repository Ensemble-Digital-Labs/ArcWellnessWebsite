import { revalidatePath } from "next/cache";
import type { InsightEntry } from "@/content/pages/insights";

export function revalidateInsightPaths(entries: readonly InsightEntry[]) {
  revalidatePath("/blogs");
  for (const entry of entries) {
    revalidatePath(`/blogs/${entry.slug}`);
  }
}
