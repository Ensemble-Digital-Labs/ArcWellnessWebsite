"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/** Matches fixed wordmark clearance (`ARC_PINNED_CLEAR_BELOW_LOGO` rhythm). */
const NAV_SPACER_H =
  "h-[max(8.25rem,env(safe-area-inset-top))] sm:h-[max(10.25rem,env(safe-area-inset-top))] md:h-[max(11.25rem,env(safe-area-inset-top))] lg:h-[max(12.25rem,env(safe-area-inset-top))]";

const STICKY_HEADER_TOP =
  "top-[max(8.25rem,env(safe-area-inset-top))] sm:top-[max(10.25rem,env(safe-area-inset-top))] md:top-[max(11.25rem,env(safe-area-inset-top))] lg:top-[max(12.25rem,env(safe-area-inset-top))]";

/** Step headers — reference `StickyTabs` uses `calc(mainNavHeight - 1px)` for a hairline stack. */
const STEP_STICKY_HEADER_TOP =
  "top-[calc(max(8.25rem,env(safe-area-inset-top))-1px)] sm:top-[calc(max(10.25rem,env(safe-area-inset-top))-1px)] md:top-[calc(max(11.25rem,env(safe-area-inset-top))-1px)] lg:top-[calc(max(12.25rem,env(safe-area-inset-top))-1px)]";

/** First screen below nav spacer ≈ remaining viewport (`100dvh` − wordmark band). */
const LEAD_FILL_MIN_H =
  "min-h-[calc(100dvh-max(8.25rem,env(safe-area-inset-top,0px)))] sm:min-h-[calc(100dvh-max(10.25rem,env(safe-area-inset-top,0px)))] md:min-h-[calc(100dvh-max(11.25rem,env(safe-area-inset-top,0px)))] lg:min-h-[calc(100dvh-max(12.25rem,env(safe-area-inset-top,0px)))]";

/**
 * Pull intro art up through the in-flow nav spacer so it reaches the viewport top, while keeping
 * layers **inside** the sticky lead so they follow the screen lock (root-anchored bg scrolls away).
 */
const LEAD_BG_VIEWPORT_PULL =
  "-top-[max(8.25rem,env(safe-area-inset-top))] sm:-top-[max(10.25rem,env(safe-area-inset-top))] md:-top-[max(11.25rem,env(safe-area-inset-top))] lg:-top-[max(12.25rem,env(safe-area-inset-top))]";

export type ArcStickyTabsItemProps = {
  title: ReactNode;
  id: string | number;
  children: ReactNode;
};

/**
 * Sentinel only — **`ArcStickyTabs`** reads props from direct **`ArcStickyTabs.Item`** children.
 */
export function ArcStickyTabsItem(_props: ArcStickyTabsItemProps) {
  return null;
}

ArcStickyTabsItem.displayName = "ArcStickyTabsItem";

export type ArcStickyTabsProps = {
  children: ReactNode;
  /** Renders after the nav spacer, before tab sections (e.g. section headline + CTA). */
  lead?: ReactNode;
  /**
   * Pin **`lead`** under the wordmark while the user scrolls; an in-flow **scroll hint** below
   * adds modest scroll distance (then the lead scrolls away as step headers stack).
   */
  leadSticky?: boolean;
  /** Copy above the chevron; defaults to a short primary + supporting line. */
  leadScrollHint?: ReactNode;
  /** Wrapper classes for the scroll hint strip (replaces empty “gap” spacer). */
  leadScrollHintClassName?: string;
  /** Bar behind sticky lead (border / wash). */
  leadStickyBarClassName?: string;
  /**
   * When **`leadSticky`**, size the lead + scroll hint block to **fill the first viewport**
   * under the nav spacer (headline top, hint anchored toward the bottom).
   */
  leadStickyFillViewport?: boolean;
  /**
   * Tall wrapper **`min-height`** so the sticky lead **stays locked** while scrolling
   * (default **`min-h-[135dvh]`** — short hold; override if needed).
   */
  leadStickyLockTrackClassName?: string;
  /**
   * Full-bleed intro image: fills the first viewport (including the wordmark band) and lives **inside**
   * the sticky lead so it **pins with the screen lock** instead of scrolling off early.
   */
  leadStickyBackgroundSrc?: string;
  /** Scrim / gradient over **`leadStickyBackgroundSrc`** for legibility. */
  leadStickyBackgroundOverlayClassName?: string;
  rootClassName?: string;
  navSpacerClassName?: string;
  sectionClassName?: string;
  stickyHeaderContainerClassName?: string;
  headerContentWrapperClassName?: string;
  headerContentLayoutClassName?: string;
  titleClassName?: string;
  contentLayoutClassName?: string;
};

const DEFAULT_LEAD_SCROLL_HINT = (
  <>
    <p className="font-sans text-[10px] font-semibold uppercase leading-snug tracking-[0.22em] text-arc-charcoal/65 sm:text-[11px] sm:tracking-[0.28em]">
      Keep scrolling to follow your path
    </p>
    <p className="font-sans text-[11px] font-normal leading-relaxed text-arc-charcoal/58 sm:text-xs">
      Your wellness journey unfolds in the steps below.
    </p>
  </>
);

function ArcStickyTabsRoot({
  children,
  lead,
  leadSticky = false,
  leadScrollHint,
  leadScrollHintClassName,
  leadStickyBarClassName = "bg-arc-teal-muted/92 shadow-[0_8px_28px_rgba(0,0,0,0.05)] backdrop-blur-md supports-[backdrop-filter]:bg-arc-teal-muted/78",
  leadStickyFillViewport = true,
  leadStickyLockTrackClassName,
  leadStickyBackgroundSrc,
  leadStickyBackgroundOverlayClassName,
  rootClassName = "bg-arc-teal-muted/85 text-arc-charcoal",
  navSpacerClassName = "bg-arc-teal-muted/90 backdrop-blur-sm",
  sectionClassName = "relative overflow-clip bg-arc-teal-muted/85",
  stickyHeaderContainerClassName = "shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
  /** Border only — solid cream lives on the sticky shell so scroll content cannot show through. */
  headerContentWrapperClassName = "border-b border-arc-teal/12",
  headerContentLayoutClassName = "mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10",
  titleClassName = "my-0 font-serif text-xl font-semibold leading-tight text-arc-charcoal sm:text-2xl md:text-[1.65rem]",
  contentLayoutClassName = "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20",
}: ArcStickyTabsProps) {
  const leadLockTrack =
    leadStickyLockTrackClassName ??
    (leadStickyFillViewport ? "min-h-[135dvh]" : undefined);

  const leadBgSrc = leadStickyBackgroundSrc;
  const leadBgFill = Boolean(leadBgSrc) && leadSticky && lead != null;

  return (
    <div className={cn("relative overflow-clip", rootClassName)}>
      <div
        className={cn(
          "sticky left-0 top-0 z-20 w-full shrink-0",
          NAV_SPACER_H,
          navSpacerClassName,
          leadBgFill &&
            "bg-transparent backdrop-blur-none supports-[backdrop-filter]:bg-transparent",
        )}
        aria-hidden
      />

      {lead != null ? (
        leadSticky ? (
          <div className={cn("relative z-[1]", leadLockTrack)}>
            <div
              className={cn(
                /* No overflow-hidden here — it breaks stickiness in some engines; clip only the bg layer. */
                "relative sticky z-[25] flex flex-col",
                STICKY_HEADER_TOP,
                leadStickyBarClassName,
                leadStickyFillViewport &&
                  cn(
                    /* Do not add min-h-0 on this node: tailwind-merge would drop LEAD_FILL_MIN_H and kill the lock band + flex fill. */
                    LEAD_FILL_MIN_H,
                    "gap-0 pt-2 sm:pt-3",
                    "pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-[max(1.75rem,env(safe-area-inset-bottom,0px))]",
                  ),
                !leadStickyFillViewport && "gap-4 pb-2 pt-2 sm:pb-3",
              )}
            >
              {leadBgFill && leadBgSrc ? (
                <>
                  <div
                    className={cn(
                      "pointer-events-none absolute left-0 right-0 z-0 h-[100dvh] overflow-hidden",
                      LEAD_BG_VIEWPORT_PULL,
                    )}
                  >
                    <Image
                      src={leadBgSrc}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                      priority={false}
                    />
                  </div>
                  <div
                    className={cn(
                      "pointer-events-none absolute left-0 right-0 z-[1] h-[100dvh]",
                      LEAD_BG_VIEWPORT_PULL,
                      leadStickyBackgroundOverlayClassName ??
                        "bg-gradient-to-b from-arc-cream/82 via-arc-teal-muted/40 to-arc-teal-muted/55",
                    )}
                    aria-hidden
                  />
                </>
              ) : null}
              <div
                className={cn(
                  "relative z-[2] flex min-h-0 flex-col",
                  leadStickyFillViewport &&
                    "flex-1 items-center justify-center px-3 text-center sm:px-6",
                  !leadStickyFillViewport && "shrink-0",
                )}
              >
                {lead}
              </div>
              <div
                className={cn(
                  "relative z-[2] flex w-full shrink-0 flex-col items-center gap-2 bg-gradient-to-b from-arc-teal-muted/40 to-arc-teal-muted/60 px-4 py-5 sm:gap-2.5 sm:py-6",
                  leadScrollHintClassName,
                )}
                role="note"
              >
                <div className="flex max-w-md flex-col items-center gap-2 text-center">
                  {leadScrollHint ?? DEFAULT_LEAD_SCROLL_HINT}
                </div>
                <ChevronDown
                  className="size-[1.35rem] shrink-0 text-arc-teal-ink/70 motion-reduce:animate-none motion-safe:animate-bounce sm:size-6"
                  strokeWidth={1.65}
                  aria-hidden
                />
                <span className="sr-only">
                  More content below; scroll the page to continue.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-0">{lead}</div>
        )
      ) : null}

      {/*
        Step blocks mirror the reference StickyTabs pattern: sticky title bar (`-mt-px`, hairline top),
        then content. Sticky uses **`z-30`** and content **`z-0`** so scrolling bodies slide **under** the
        cream bar instead of painting over it (Lenis / shadows make ties at `z-10` unreliable).
      */}
      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== ArcStickyTabsItem) {
          if (process.env.NODE_ENV === "development" && child != null) {
            console.warn(
              "ArcStickyTabs expects only ArcStickyTabs.Item elements as direct children (lead uses the `lead` prop).",
            );
          }
          return null;
        }

        const el = child as ReactElement<ArcStickyTabsItemProps>;
        const { title, id, children: itemContent } = el.props;

        return (
          <section
            key={id}
            id={typeof id === "string" ? id : `path-step-${id}`}
            className={cn("relative isolate overflow-clip", sectionClassName)}
          >
            <div
              className={cn(
                "sticky z-40 -mt-px flex w-full flex-col bg-arc-cream backdrop-blur-none supports-[backdrop-filter]:backdrop-blur-none",
                STEP_STICKY_HEADER_TOP,
                stickyHeaderContainerClassName,
              )}
            >
              <div className={cn(headerContentWrapperClassName)}>
                <div className={cn(headerContentLayoutClassName)}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={cn(titleClassName)}>{title}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "relative z-0 min-h-0 bg-inherit",
                contentLayoutClassName,
              )}
            >
              {itemContent}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export const ArcStickyTabs = Object.assign(ArcStickyTabsRoot, {
  Item: ArcStickyTabsItem,
});
