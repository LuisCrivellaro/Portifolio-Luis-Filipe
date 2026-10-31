"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { SITE, type Photo } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

const DESKTOP_QUERY = "(min-width: 768px)";
const EASE = [0.16, 1, 0.3, 1] as const;

function subscribe(callback: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
}

// Photo on the left with the card overlapping it; on mobile the card overlaps the bottom of the photo.
export function ContactProfile({ photo, cv }: { photo: Photo | null; cv?: string }) {
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  // Both are only known after hydration: remount so the entrance starts from the right state.
  const motionKey = `${reduced}-${desktop}`;

  return (
    // The container drives the entrance: a clipped photo never counts as "in view" on its own.
    <motion.div
      key={motionKey}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={cn(
        "mx-auto mt-12 flex max-w-sm flex-col md:mt-16 md:max-w-none md:flex-row md:items-center",
        !photo && "md:max-w-2xl md:mx-0"
      )}
    >
      {photo && (
        <motion.figure
          variants={{
            hidden: { clipPath: "inset(0 100% 0 0)" },
            visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease: EASE } },
          }}
          className="group relative aspect-square w-full shrink-0 overflow-hidden border border-border-strong bg-bg-elevated md:w-[420px] lg:w-[460px]"
        >
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 420px, 100vw"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute bottom-5 left-5 h-0.5 w-12 bg-accent" />
        </motion.figure>
      )}

      <div
        className={cn(
          "relative z-10",
          photo && "-mt-16 mx-4 md:mx-0 md:mt-0 md:-ml-24 md:max-w-xl md:flex-1"
        )}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: desktop ? 24 : 0, y: desktop ? 0 : 24 },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.7, delay: photo ? 0.15 : 0, ease: EASE },
            },
          }}
          className="border border-border-strong bg-bg-elevated/90 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md md:p-10 lg:p-12"
        >
          <h2 className="font-display text-[clamp(2.2rem,9vw,2.6rem)] font-medium leading-[1.02] text-fg md:text-[clamp(2.2rem,4.5vw,4rem)]">
            Vamos construir algo.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-muted md:mt-8 md:text-lg">
            Aberto a oportunidades em engenharia de software, IA e automação. Entre em contato e
            vamos conversar sobre o que podemos construir juntos.
          </p>

          {SITE.availability && (
            <p className="mt-6 flex items-start gap-3 font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-fg/85">
              <span className="relative mt-1 flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {SITE.availability}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton
              as="a"
              href={SITE.linkedinChat}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="Entrar em contato pelo LinkedIn (abre em nova aba)"
            >
              <span className="flex items-center gap-3 bg-fg px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-colors hover:bg-accent">
                Entrar em contato
                <ArrowUpRight size={14} strokeWidth={2} />
              </span>
            </MagneticButton>
            {cv && (
              <MagneticButton as="a" href={cv} download ariaLabel="Baixar currículo (PDF)">
                <span className="flex items-center gap-3 border border-border-strong px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent">
                  <Download size={14} strokeWidth={1.75} />
                  Baixar currículo
                </span>
              </MagneticButton>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
