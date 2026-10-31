import Image from "next/image";
import type { Recognition as RecognitionItem } from "@/lib/data";
import { publicAssetExists } from "@/lib/assets";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function Recognition({ index, items }: { index: string; items: readonly RecognitionItem[] }) {
  return (
    <section id="recognition" className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index={index} label="Reconhecimentos" />

        <ul className="mt-12 flex flex-col gap-20 md:mt-16">
          {items.map((item) => {
            const photo = item.photo && publicAssetExists(item.photo.src) ? item.photo : null;

            return (
              <li key={item.id} className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
                {photo && (
                  <div className="md:col-span-5">
                    <Reveal y={40}>
                      <figure className="max-w-sm overflow-hidden border border-border-strong bg-bg-elevated md:max-w-none">
                        <Image
                          src={photo.src}
                          width={photo.width}
                          height={photo.height}
                          alt={photo.alt}
                          sizes="(min-width: 1280px) 500px, (min-width: 768px) 40vw, 384px"
                          className="h-auto w-full brightness-90 contrast-105 grayscale-[0.2]"
                        />
                      </figure>
                    </Reveal>
                  </div>
                )}

                <div className={photo ? "md:col-span-6 md:col-start-7 md:pb-4" : "md:col-span-8"}>
                  <Reveal delay={0.05}>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {item.year ? `${item.event} ${item.year}` : item.event}
                    </p>
                    <h3 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-fg">
                      {item.award}
                    </h3>
                    {item.description && (
                      <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
                        {item.description}
                      </p>
                    )}
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
