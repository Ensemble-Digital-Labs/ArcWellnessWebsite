import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ARC Wellness | Logo demo v2",
  description: "Marketing homepage — v2 transparent header wordmark preview.",
};

export default function LogoDemoV2Layout({ children }: { children: ReactNode }) {
  return children;
}
