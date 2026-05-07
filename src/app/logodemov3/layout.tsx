import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ARC Wellness | Logo demo v3",
  description: "Marketing homepage — v4 med spa header wordmark preview.",
};

export default function LogoDemoV3Layout({ children }: { children: ReactNode }) {
  return children;
}
