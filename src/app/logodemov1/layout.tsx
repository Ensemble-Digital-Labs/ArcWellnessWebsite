import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ARC Wellness | Logo demo v1",
  description: "Marketing homepage — alternate header wordmark preview.",
};

export default function LogoDemoV1Layout({ children }: { children: ReactNode }) {
  return children;
}
