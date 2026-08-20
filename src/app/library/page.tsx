import { redirect } from "next/navigation";

/** Arc Library landing — default to Education. */
export default function LibraryIndexPage() {
  redirect("/library/education");
}
