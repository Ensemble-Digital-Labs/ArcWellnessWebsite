import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ARC Wellness | Client showcase",
  description: "Marketing homepage mock — client showcase route.",
};

export default function ClientShowcaseLayout({ children }: { children: ReactNode }) {
  return children;
}
