import { SKILLS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

const CATEGORIES = Object.entries(SKILLS) as [keyof typeof SKILLS, readonly string[]][];
const ALL_SKILLS = CATEGORIES.flatMap(([, items]) => items);

export function Skills({ index }: { index: string }) {
  return (
    <section id="skills" className="border-t border-border py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel index={index} label="Habilidades" />
      </div>

      <div className="mt-10 border-y border-border">
        <Marquee items={ALL_SKILLS} />
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {CATEGORIES.map(([category, items]) => (
            <div key={category} className="border-t border-border pt-6">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">
                  {category}
                </p>
              </Reveal>
              <StaggerGroup className="mt-6 flex flex-col gap-4" stagger={0.06}>
                {items.map((skill) => (
                  <StaggerItem key={skill}>
                    <p className="group inline-block font-display text-xl font-medium leading-snug text-fg transition-colors">
                      {skill}
                      <span className="mt-1 block h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
