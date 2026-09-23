"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { SITE } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HEADLINE_WORDS = SITE.headline.split(" ");

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [
            ".hero-bg",
            ".hero-name-inner",
            ".hero-role",
            ".hero-word",
            ".hero-cta",
            ".hero-scroll",
          ],
          { opacity: 1, y: 0, clearProps: "transform" }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".hero-bg", { opacity: 0 }, { opacity: 1, duration: 1.4 })
        .fromTo(
          ".hero-name-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.08 },
          "-=1"
        )
        .fromTo(
          ".hero-role",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-word",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.025 },
          "-=0.3"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.25"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-10 pt-32 md:px-10 md:pb-14 md:pt-40"
    >
      <div
        className="hero-bg pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(89,227,176,0.08), transparent 70%)",
        }}
      />
      <div className="hero-bg pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />

      <div>
        <h1 className="font-display font-medium uppercase leading-[0.92] tracking-tight text-fg">
          <span className="block overflow-hidden text-[clamp(2.8rem,9vw,7.5rem)]">
            <span className="hero-name-inner block">Luis Filipe</span>
          </span>
          <span className="block overflow-hidden text-[clamp(2.8rem,9vw,7.5rem)]">
            <span className="hero-name-inner block">Crivellaro</span>
          </span>
        </h1>

        <p className="hero-role mt-6 font-mono text-xs uppercase tracking-[0.25em] text-accent md:text-sm">
          {SITE.role}
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl font-display text-[clamp(1.4rem,3vw,2.5rem)] font-normal leading-[1.15] text-fg/90">
          {HEADLINE_WORDS.map((word, index) => (
            <span key={`${word}-${index}`} className="mr-[0.28em] inline-block overflow-hidden align-top">
              <span className="hero-word inline-block">{word}</span>
            </span>
          ))}
        </p>

        <div className="hero-cta flex shrink-0 items-center gap-4">
          <MagneticButton as="a" href="#projects" ariaLabel="View my work">
            <span className="group flex items-center gap-3 border border-border-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent">
              View my work
            </span>
          </MagneticButton>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll to explore
        </span>
        <ArrowDown
          size={14}
          strokeWidth={1.5}
          className={reducedMotion ? "text-muted" : "animate-bounce text-muted"}
        />
      </div>
    </section>
  );
}
