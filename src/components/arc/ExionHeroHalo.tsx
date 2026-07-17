import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Golden ripple halo behind the Exion hero frames — ported 1:1 from the demo
 * (arcwelness-service-demo.netlify.app/exion): layered radial / linear / conic
 * glow plates plus an SVG of masked, blurred gold arcs and an animated shine
 * spark. Decorative only (`aria-hidden`); the shine spark respects
 * `prefers-reduced-motion` via the `.hero-shine-spark` rule in globals.css.
 */
export function ExionHeroHalo({ className }: { className?: string }) {
  const raw = useId().replace(/:/g, "");
  const arc = `hero-arc-${raw}`;
  const core = `hero-core-${raw}`;
  const fil = `hero-fil-${raw}`;
  const soft = `hero-soft-${raw}`;
  const mask = `hero-mask-${raw}`;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-visible",
        className,
      )}
    >
      {/* Main soft glow */}
      <div
        className="absolute -right-[10%] top-[2%] h-[96%] w-[108%] rounded-full opacity-95"
        style={{
          background:
            "radial-gradient(ellipse 70% 62% at 54% 42%, rgba(255,253,247,0.98) 0%, rgba(248,237,216,0.9) 22%, rgba(232,200,136,0.46) 45%, rgba(193,154,91,0.18) 64%, transparent 84%)",
          filter: "blur(10px)",
        }}
      />
      {/* Diagonal sheen */}
      <div
        className="absolute right-[3%] top-[15%] h-[82%] w-[58%] rounded-full opacity-80"
        style={{
          background:
            "linear-gradient(110deg, transparent 0%, rgba(255,250,239,0.75) 26%, rgba(240,217,160,0.48) 56%, rgba(193,154,91,0.16) 100%)",
          filter: "blur(34px)",
        }}
      />
      {/* Conic swirl */}
      <div
        className="absolute -right-[4%] top-[10%] h-[76%] w-[74%] rounded-full opacity-65"
        style={{
          background:
            "conic-gradient(from 210deg at 48% 48%, transparent 0deg, rgba(217,184,120,0.22) 68deg, rgba(255,249,234,0.5) 116deg, rgba(193,154,91,0.18) 158deg, transparent 230deg)",
          filter: "blur(18px)",
        }}
      />
      {/* Arc ribbons */}
      <svg
        viewBox="0 0 600 700"
        preserveAspectRatio="xMidYMid meet"
        className="absolute -right-[4%] -top-[2%] h-[104%] w-[86%]"
      >
        <defs>
          <radialGradient id={core} cx="48%" cy="46%" r="62%">
            <stop offset="0%" stopColor="#fff9ef" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#f0d9a0" stopOpacity="0.32" />
            <stop offset="72%" stopColor="#c19a5b" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#c19a5b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={arc} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a87d3f" stopOpacity="0" />
            <stop offset="22%" stopColor="#c19a5b" stopOpacity="0.35" />
            <stop offset="48%" stopColor="#f0d9a0" stopOpacity="0.95" />
            <stop offset="68%" stopColor="#fff4d6" stopOpacity="1" />
            <stop offset="88%" stopColor="#d9b878" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c19a5b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={fil} x1="15%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#c19a5b" stopOpacity="0" />
            <stop offset="30%" stopColor="#d9b878" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#fff6df" stopOpacity="0.95" />
            <stop offset="78%" stopColor="#e8c888" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#c19a5b" stopOpacity="0" />
          </linearGradient>
          <filter id={soft} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`${mask}-g`} x1="0" y1="0.55" x2="1" y2="0.35">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="26%" stopColor="white" stopOpacity="0.08" />
            <stop offset="52%" stopColor="white" stopOpacity="0.72" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id={mask}>
            <rect width="600" height="700" fill={`url(#${mask}-g)`} />
          </mask>
        </defs>
        <ellipse cx="270" cy="330" rx="255" ry="300" fill={`url(#${core})`} />
        <g mask={`url(#${mask})`} filter={`url(#${soft})`}>
          <path
            d="M 365 635 C 555 525, 585 270, 450 118 C 385 50, 275 28, 175 66"
            fill="none"
            stroke={`url(#${arc})`}
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.18"
          />
          <path
            d="M 350 612 C 525 505, 560 292, 435 145 C 372 78, 282 56, 190 92"
            fill="none"
            stroke={`url(#${arc})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.82"
          />
          <path
            d="M 330 600 C 500 495, 530 300, 420 165 C 365 102, 278 84, 200 116"
            fill="none"
            stroke={`url(#${fil})`}
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity="0.72"
          />
          <path
            d="M 392 585 C 548 472, 570 255, 452 126 C 396 70, 300 55, 215 92"
            fill="none"
            stroke={`url(#${fil})`}
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.62"
          />
          <path
            d="M 305 575 C 470 474, 505 315, 405 188 C 356 126, 272 108, 205 140"
            fill="none"
            stroke={`url(#${arc})`}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.46"
          />
          <path
            d="M 455 212 C 492 168, 498 128, 460 96"
            fill="none"
            stroke="#fff8e7"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
            className="hero-shine-spark"
          />
          <path
            d="M 395 560 C 548 448, 575 245, 465 118"
            fill="none"
            stroke={`url(#${fil})`}
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.36"
          />
          <path
            d="M 370 546 C 515 442, 540 270, 440 145"
            fill="none"
            stroke={`url(#${fil})`}
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.3"
          />
        </g>
      </svg>
    </div>
  );
}
