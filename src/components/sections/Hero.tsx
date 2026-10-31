"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowRight, Download, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/data";
import { DotGlobeHero } from "@/components/ui/globe-hero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HEADLINE_WORDS = SITE.headline.split(" ");

export function Hero({ cv }: { cv?: string }) {
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
            ...root.querySelectorAll(".hero-badge"),
            ".hero-name-inner",
            ".hero-underline",
            ".hero-role",
            ".hero-word",
            ".hero-cta",
            ".hero-scroll",
          ],
          { opacity: 1, y: 0, scaleX: 1, clearProps: "transform" }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".hero-bg", { opacity: 0 }, { opacity: 1, duration: 1.4 })
        .fromTo(
          // The badge only renders when an availability line is set.
          root.querySelectorAll(".hero-badge"),
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6 },
          "-=1.1"
        )
        .fromTo(
          ".hero-name-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.08 },
          "-=0.6"
        )
        .fromTo(
          ".hero-underline",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-role",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.9"
        )
        .fromTo(
          ".hero-word",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.025 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
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
    <section id="top" ref={rootRef} className="relative">
      <DotGlobeHero
        rotationSpeed={reducedMotion ? 0 : 0.0025}
        globeRadius={1.25}
        globeColor="#59e3b0"
        globeOpacity={0.12}
      >
        <div
          className="hero-bg pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(89,227,176,0.08), transparent 70%)",
          }}
        />
        <div
          className="hero-bg pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 30%, var(--bg) 85%)",
          }}
        />

        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-32 text-center md:px-10 md:pt-40">
          {SITE.availability && (
            <div className="hero-badge mb-10 inline-flex items-center gap-3 border border-accent/30 bg-accent-dim/40 px-5 py-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={
                    reducedMotion
                      ? "hidden"
                      : "absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"
                  }
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent md:text-xs">
                {SITE.availability}
              </span>
            </div>
          )}

          <h1 className="font-display font-medium uppercase leading-[0.92] tracking-tight text-fg">
            <span className="block overflow-hidden text-[clamp(2.2rem,7vw,5rem)] font-light text-fg/70">
              <span className="hero-name-inner block">Luis Filipe</span>
            </span>
            <span className="relative block pb-4">
              <span className="block overflow-hidden text-[clamp(2.8rem,10vw,8rem)]">
                <span className="hero-name-inner block">Crivellaro</span>
              </span>
              <span className="hero-underline absolute bottom-0 left-0 h-0.75 w-full origin-left bg-linear-to-r from-accent via-accent/70 to-transparent" />
            </span>
          </h1>

          <p className="hero-role mt-8 font-mono text-xs uppercase tracking-[0.25em] text-accent md:text-sm">
            {SITE.role}
          </p>

          <p className="mt-8 max-w-3xl font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-normal leading-tight text-fg/85">
            {HEADLINE_WORDS.map((word, index) => (
              <span key={`${word}-${index}`} className="mr-[0.28em] inline-block overflow-hidden align-top">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <div className="hero-cta">
            <MagneticButton as="a" href="#projects" ariaLabel="Ver meus projetos">
              <span className="group flex items-center gap-3 bg-fg px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-colors hover:bg-accent">
                Ver meus projetos
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </MagneticButton>
            </div>
            <div className="hero-cta">
            <MagneticButton
              as="a"
              href={SITE.linkedinChat}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="Entrar em contato pelo LinkedIn (abre em nova aba)"
            >
              <span className="flex items-center gap-3 border border-border-strong bg-bg/80 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent">
                <MessageCircle size={14} strokeWidth={1.75} />
                Entrar em contato
              </span>
            </MagneticButton>
            </div>
            {cv && (
              <div className="hero-cta">
                <MagneticButton as="a" href={cv} download ariaLabel="Baixar currículo (PDF)">
                  <span className="flex items-center gap-3 px-4 py-4 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent">
                    <Download size={14} strokeWidth={1.75} />
                    Baixar currículo
                  </span>
                </MagneticButton>
              </div>
            )}
          </div>
        </div>
      </DotGlobeHero>

      <div className="hero-scroll absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Role para explorar
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
