import { ArrowUpRight, Mail } from "lucide-react";
import { CONTACT, SITE } from "@/lib/data";
import { publicAssetExists } from "@/lib/assets";
import { GithubMark, InstagramMark, LinkedinMark } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactProfile } from "@/components/ui/ContactProfile";

const LINKS = [
  { label: "GitHub", href: SITE.github, external: true, Icon: GithubMark },
  { label: "LinkedIn", href: SITE.linkedin, external: true, Icon: LinkedinMark },
  { label: "Instagram", href: SITE.instagram, external: true, Icon: InstagramMark },
  {
    label: "E-mail",
    href: `mailto:${SITE.email}`,
    external: false,
    detail: SITE.email,
    Icon: ({ size, className }: { size?: number; className?: string }) => (
      <Mail size={size} strokeWidth={1.75} className={className} aria-hidden="true" />
    ),
  },
] as const;

export function Contact({ index, cv }: { index: string; cv?: string }) {
  const photo = publicAssetExists(CONTACT.photo.src) ? CONTACT.photo : null;

  return (
    <section id="contact" className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index={index} label="Contato" />

        <ContactProfile photo={photo} cv={cv} />

        <nav
          aria-label="Links de contato"
          className={
            photo
              ? "mt-20 flex flex-col divide-y divide-border border-y border-border md:mt-32"
              : "mt-20 flex flex-col divide-y divide-border border-y border-border"
          }
        >
          {LINKS.map(({ label, href, external, Icon, ...link }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={external ? `${label} (abre em nova aba)` : `${label}: ${SITE.email}`}
              className="group flex items-center justify-between py-6 transition-colors hover:text-accent"
            >
              <span className="flex items-center gap-4 font-display text-2xl font-medium text-fg transition-colors group-hover:text-accent md:text-3xl">
                <Icon size={20} className="text-muted transition-colors group-hover:text-accent" />
                {label}
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
