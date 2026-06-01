import Image from "next/image";
import type { ReactNode } from "react";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  titleEmphasis?: string;
  body?: string;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function PageHero({
  eyebrow,
  title,
  titleEmphasis,
  body,
  imageSrc,
  imageAlt,
  children,
  className,
  align = "left",
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative min-h-[min(72vh,44rem)] overflow-hidden bg-arc-charcoal",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-arc-charcoal via-arc-charcoal/55 to-arc-charcoal/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-arc-charcoal/80 via-arc-charcoal/35 to-transparent md:max-w-[70%]"
        aria-hidden
      />

      <div
        className={cn(
          "relative mx-auto flex max-w-6xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8 lg:pb-20",
          centered && "items-center text-center",
        )}
      >
        {eyebrow ? (
          <p
            className={cn(
              "mb-4 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-arc-teal",
              centered && "mx-auto",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={cn(
            "max-w-3xl font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]",
            centered && "mx-auto max-w-4xl",
          )}
        >
          {title}
          {titleEmphasis ? (
            <>
              <br />
              <TitleEmphasis className="text-[1.08em] text-arc-rose-gold sm:text-[1.1em] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                {titleEmphasis}
              </TitleEmphasis>
            </>
          ) : null}
        </h1>
        {body ? (
          <p
            className={cn(
              "mt-5 max-w-xl font-sans text-base leading-relaxed text-white/88 sm:text-lg",
              centered && "mx-auto max-w-2xl",
            )}
          >
            {body}
          </p>
        ) : null}
        {children ? <div className={cn("mt-8", centered && "flex justify-center")}>{children}</div> : null}
      </div>
    </section>
  );
}
