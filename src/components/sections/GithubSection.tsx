import { SITE } from "@/lib/data";
import { GithubMark } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ActivityGrid } from "@/components/ui/ActivityGrid";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function GithubSection() {
  return (
    <section className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="05" label="GitHub" />

        <div className="mt-10 grid grid-cols-1 gap-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.05] text-fg">
                Building in public.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Most of what I learn ends up as code. Explore my repositories, experiments and
                ongoing projects on GitHub.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <MagneticButton as="a" href={SITE.github} target="_blank" rel="noopener noreferrer" ariaLabel="View GitHub profile">
                <span className="flex items-center gap-3 border border-border-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent">
                  <GithubMark size={14} />
                  View GitHub
                </span>
              </MagneticButton>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            <Reveal delay={0.15}>
              <ActivityGrid />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
                Decorative pattern
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
