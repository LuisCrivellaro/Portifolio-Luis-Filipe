import { ABOUT } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="01" label="About" />

        <div className="mt-12 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-display text-[clamp(1.6rem,3.4vw,2.75rem)] font-normal leading-[1.25] text-fg">
                {ABOUT.paragraphs[0]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {ABOUT.paragraphs[1]}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-10 border-t border-border pt-8 md:col-span-4 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">Focus</p>
              <StaggerGroup className="mt-4 flex flex-col gap-3">
                {ABOUT.focus.map((item) => (
                  <StaggerItem key={item}>
                    <p className="font-display text-base font-medium text-fg md:text-lg">
                      {item}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">Stack</p>
              <StaggerGroup className="mt-4 flex flex-wrap gap-2" stagger={0.05}>
                {ABOUT.stack.map((item) => (
                  <StaggerItem key={item}>
                    <span className="inline-block border border-border-strong px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                      {item}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
