import Image from "next/image";
import { ABOUT } from "@/lib/data";
import { publicAssetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export function About({ index }: { index: string }) {
  const portrait = publicAssetExists(ABOUT.portrait.src) ? ABOUT.portrait : null;

  return (
    <section id="about" className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index={index} label="Sobre" />

        <div className="mt-12 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className={portrait ? "md:col-span-7" : "md:col-span-8"}>
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-normal leading-[1.25] text-fg">
                {ABOUT.paragraphs[0]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {ABOUT.paragraphs[1]}
              </p>
            </Reveal>

            {portrait && (
              <div className="mt-14 grid grid-cols-1 gap-10 border-t border-border pt-8 sm:grid-cols-2">
                <FocusList />
                <StackList />
              </div>
            )}
          </div>

          {portrait ? (
            <div className="md:col-span-5 md:pl-6">
              <Reveal y={40}>
                <figure className="group relative max-w-sm overflow-hidden border border-border-strong bg-bg-elevated md:max-w-none">
                  <Image
                    src={portrait.src}
                    width={portrait.width}
                    height={portrait.height}
                    alt={portrait.alt}
                    sizes="(min-width: 1280px) 460px, (min-width: 768px) 38vw, 384px"
                    className="h-auto w-full brightness-90 contrast-105 grayscale-[0.2] transition-[filter] duration-700 ease-out group-hover:grayscale"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/70 via-transparent to-transparent"
                  />
                </figure>
              </Reveal>
            </div>
          ) : (
            <div
              className={cn(
                "flex flex-col gap-10 border-t border-border pt-8 md:col-span-4",
                "md:border-l md:border-t-0 md:pl-10 md:pt-0"
              )}
            >
              <FocusList />
              <StackList />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FocusList() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">Foco</p>
      <StaggerGroup className="mt-4 flex flex-col gap-3">
        {ABOUT.focus.map((item) => (
          <StaggerItem key={item}>
            <p className="font-display text-base font-medium text-fg md:text-lg">{item}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

function StackList() {
  return (
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
  );
}
