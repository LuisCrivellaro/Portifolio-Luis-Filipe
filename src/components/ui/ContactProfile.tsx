"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { SITE } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ContactLanyard } from "@/components/ui/ContactLanyard";
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

// Keep the badge clear of the contact copy so its full surface can be dragged.
export function ContactProfile({ cv }: { cv?: string }) {
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  // Both are only known after hydration: remount so the entrance starts from the right state.
  const motionKey = `${reduced}-${desktop}`;

  return (
    // The container drives the entrance for both the visual and the contact copy.
    <motion.div
      key={motionKey}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="mx-auto mt-12 grid max-w-sm grid-cols-1 items-center gap-8 md:mt-16 md:max-w-none md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
        }}
        className="min-w-0"
      >
        <ContactLanyard />
      </motion.div>

      <div className="relative z-10 min-w-0">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: desktop ? 24 : 0, y: desktop ? 0 : 24 },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.7, delay: 0.15, ease: EASE },
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
