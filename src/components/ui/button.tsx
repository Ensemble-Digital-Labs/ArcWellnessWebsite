"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * ARC Wellness — premium CTAs with brand teal / cream. Polished from a Base UI + CVA reference;
 * variants use `globals.css` tokens (`arc-teal`, `arc-cream`, etc.).
 */
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-sans text-xs font-bold uppercase tracking-[0.22em] outline-none transition-[box-shadow,transform,background-color,border-color,color,filter] duration-200 ease-out sm:text-sm",
    "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/90 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-10 px-6 sm:h-10 sm:px-7",
        lg: "h-11 px-7 sm:h-12 sm:px-9",
        sm: "h-9 gap-1.5 px-5 sm:h-9",
      },
      variant: {
        /** Brand primary — teal fill, soft outer glow + inset highlight */
        default: [
          "border-[color:color-mix(in_srgb,var(--arc-teal)_82%,#1a1a1a)] bg-arc-teal text-white",
          "[text-shadow:0_1px_2px_rgba(0,0,0,0.22)]",
          "shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_16px_40px_-10px_rgba(78,196,176,0.62)]",
          "hover:border-arc-teal-hover hover:bg-arc-teal-hover hover:shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_20px_44px_-12px_rgba(54,157,136,0.55)]",
          "active:translate-y-px active:shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]",
          "focus-visible:ring-offset-arc-cream",
        ].join(" "),
        /** For photography / dark overlays — cream glass outline */
        heroOutline: [
          "border-2 border-arc-cream/88 bg-arc-cream/[0.07] text-arc-cream backdrop-blur-[1.5px]",
          "[text-shadow:0_1px_3px_rgba(0,0,0,0.45)]",
          "shadow-[0_10px_32px_-12px_rgba(0,0,0,0.45)]",
          "hover:border-arc-cream hover:bg-arc-cream/16",
          "active:translate-y-px",
          "focus-visible:ring-arc-cream/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        ].join(" "),
        /** Light sections — subtle charcoal outline */
        outline: [
          "border-arc-charcoal/20 bg-transparent text-arc-charcoal",
          "[text-shadow:0_1px_0_rgba(255,255,255,0.35)]",
          "shadow-[0_1px_2px_rgba(44,44,44,0.06)]",
          "hover:border-arc-charcoal/35 hover:bg-arc-cream-deep/40",
          "active:translate-y-px",
          "focus-visible:ring-offset-arc-cream",
        ].join(" "),
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

function Button({ className, variant, size, render, ...props }: ButtonProps) {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    className: cn(buttonVariants({ className, size, variant })),
    "data-slot": "button",
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export { Button, buttonVariants };
