import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const LINKS = [
  { label: "GitHub", href: SITE.github, external: true },
  { label: "LinkedIn", href: SITE.linkedin, external: true },
  { label: "Email", href: `mailto:${SITE.email}`, external: false, detail: SITE.email },
] as const;

export function Contact() {
  return (
    <section id="contact" className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="06" label="Contact" />

        <Reveal>
          <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-medium leading-[1.02] text-fg">
            Let&apos;s build something.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Open to opportunities in software engineering, AI and automation. Reach out and
            let&apos;s talk about what we could build together.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <MagneticButton as="a" href={`mailto:${SITE.email}`} ariaLabel="Get in touch via email">
            <span className="flex items-center gap-3 bg-fg px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-colors hover:bg-accent">
              Get in touch
              <ArrowUpRight size={14} strokeWidth={2} />
            </span>
          </MagneticButton>
        </Reveal>

        <nav aria-label="Contact links" className="mt-20 flex flex-col divide-y divide-border border-y border-border">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-6 transition-colors hover:text-accent"
            >
              <span className="font-display text-2xl font-medium text-fg transition-colors group-hover:text-accent md:text-3xl">
                {link.label}
              </span>
              <span className="flex items-center gap-4">
                {"detail" in link && (
                  <span className="hidden font-mono text-sm text-muted md:inline">
                    {link.detail}
                  </span>
                )}
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                />
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
