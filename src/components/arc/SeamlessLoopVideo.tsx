"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type SeamlessLoopVideoHandle = {
  play: () => void;
  pause: () => void;
};

type SeamlessLoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Seconds before the end to start crossfade (default ~0.42s). */
  crossfadeLeadSec?: number;
  /** Crossfade length in ms (default 480). */
  crossfadeMs?: number;
};

/**
 * Two stacked `<video>` elements with the same source: as one clip nears its end, the other
 * starts from 0 and opacity crossfades over — avoids the visible seam from native `loop`.
 */
export const SeamlessLoopVideo = forwardRef<SeamlessLoopVideoHandle, SeamlessLoopVideoProps>(
  function SeamlessLoopVideo(
    {
      src,
      poster,
      className,
      style,
      crossfadeLeadSec = 0.42,
      crossfadeMs = 480,
    },
    ref,
  ) {
    const aRef = useRef<HTMLVideoElement>(null);
    const bRef = useRef<HTMLVideoElement>(null);
    const leadingRef = useRef<"a" | "b">("a");
    const swapGuardRef = useRef(false);
    const fadeClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [topClip, setTopClip] = useState<"a" | "b">("a");

    const clearFadeTimer = () => {
      if (fadeClearRef.current) {
        clearTimeout(fadeClearRef.current);
        fadeClearRef.current = null;
      }
    };

    const playLeadingOnly = useCallback(() => {
      const a = aRef.current;
      const b = bRef.current;
      if (!a || !b) return;
      const lead = leadingRef.current === "a" ? a : b;
      const follow = leadingRef.current === "a" ? b : a;
      follow.pause();
      follow.currentTime = 0;
      void lead.play().catch(() => {});
    }, []);

    const pauseBoth = useCallback(() => {
      aRef.current?.pause();
      bRef.current?.pause();
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        play: playLeadingOnly,
        pause: pauseBoth,
      }),
      [pauseBoth, playLeadingOnly],
    );

    const handleTimeUpdate = useCallback(
      (event: React.SyntheticEvent<HTMLVideoElement>) => {
        const el = event.currentTarget;
        const a = aRef.current;
        const b = bRef.current;
        if (!a || !b) return;

        const lead =
          leadingRef.current === "a" ? a : b;
        const other =
          leadingRef.current === "a" ? b : a;
        if (el !== lead) return;

        const dur = lead.duration;
        if (!dur || !Number.isFinite(dur) || dur <= 0) return;

        const leadWindow = Math.min(
          crossfadeLeadSec,
          Math.max(0.1, dur * 0.2),
        );

        if (lead.currentTime < dur - leadWindow) return;

        if (swapGuardRef.current) return;
        swapGuardRef.current = true;

        lead.pause();

        other.currentTime = 0;
        void other.play().catch(() => {});

        const nextTop: "a" | "b" = leadingRef.current === "a" ? "b" : "a";
        setTopClip(nextTop);
        leadingRef.current = nextTop;

        clearFadeTimer();
        fadeClearRef.current = setTimeout(() => {
          const oldLead = nextTop === "a" ? b : a;
          oldLead.currentTime = 0;
          oldLead.pause();
          swapGuardRef.current = false;
          fadeClearRef.current = null;
        }, crossfadeMs + 40);
      },
      [crossfadeLeadSec, crossfadeMs],
    );

    useEffect(() => () => clearFadeTimer(), []);

    const transitionClass = "transition-opacity ease-out";
    const durationStyle = { transitionDuration: `${crossfadeMs}ms` } as const;

    return (
      <>
        <video
          ref={aRef}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full scale-[1.02] object-cover",
            transitionClass,
            topClip === "a" ? "z-[2] opacity-100" : "z-[1] opacity-0",
            className,
          )}
          style={{ ...style, ...durationStyle }}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          autoPlay
          aria-hidden
          onTimeUpdate={handleTimeUpdate}
        />
        <video
          ref={bRef}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full scale-[1.02] object-cover",
            transitionClass,
            topClip === "b" ? "z-[2] opacity-100" : "z-[1] opacity-0",
            className,
          )}
          style={{ ...style, ...durationStyle }}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden
          onTimeUpdate={handleTimeUpdate}
        />
      </>
    );
  },
);
