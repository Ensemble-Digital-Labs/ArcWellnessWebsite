import type { Metadata } from "next";
import { ExionV2Showcase } from "@/client-showcase/exion-v2/ExionV2Showcase";

export const metadata: Metadata = {
  title: "EXION v2 | ARC Wellness client showcase",
  description: "EXION service page mock — client showcase layout with curved section transitions.",
  robots: { index: false, follow: false },
};

export default function ExionV2Page() {
  return <ExionV2Showcase />;
}
