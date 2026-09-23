"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { EXPERIENCE } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="border-t border-border px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="02" label="Experience" />

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12">
          <div className="relative hidden md:col-span-1 md:block">
            <div className="absolute left-0 top-1 h-full w-px bg-border">
              <div
                ref={lineRef}
                className="h-full w-full origin-top bg-accent"
                style={{ transform: reducedMotion ? "scaleY(1)" : undefined }}
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">
                {EXPERIENCE.period}
              </p>
              <h3 className="mt-4 font-display text-3xl font-medium leading-tight text-fg md:text-4xl">
                {EXPERIENCE.company}
              </h3>
              <p className="mt-2 text-base text-muted md:text-lg">{EXPERIENCE.role}</p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <StaggerGroup className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" stagger={0.07}>
              {EXPERIENCE.points.map((point, index) => (
                <StaggerItem key={point}>
                  <div className="flex gap-4 border-t border-border pt-4">
                    <span className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-fg/85 md:text-base">{point}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
