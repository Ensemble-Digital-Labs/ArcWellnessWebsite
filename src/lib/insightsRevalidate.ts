import { revalidatePath } from "next/cache";
import type { InsightEntry } from "@/content/pages/insights";

export function revalidateInsightPaths(entries: readonly InsightEntry[]) {
  revalidatePath("/library/education");
  for (const entry of entries) {
    revalidatePath(`/blogs/${entry.slug}`);
  }
}
