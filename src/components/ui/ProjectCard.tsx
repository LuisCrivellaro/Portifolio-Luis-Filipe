import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import type { FeaturedProject } from "@/lib/data";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
  reversed,
}: {
  project: FeaturedProject;
  index: string;
  reversed: boolean;
}) {
  return (
    <article id={`projeto-${project.id}`} className="group scroll-mt-24 border-t border-border py-16 md:py-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
        <div
          className={cn(
            "md:sticky md:top-28 md:col-span-7 md:self-start",
            reversed ? "md:order-2" : "md:order-1"
          )}
        >
          <Reveal y={40}>
            <div className="relative aspect-4/3 w-full overflow-hidden border border-border-strong bg-bg-elevated">
              <div className="h-full w-full transition-transform duration-700 ease-out md:group-hover:scale-[1.03]">
                {project.image ? (
                  <Image
                    src={project.image.src}
                    width={project.image.width}
                    height={project.image.height}
                    alt={project.image.alt}
                    sizes="(min-width: 1280px) 720px, (min-width: 768px) 56vw, calc(100vw - 48px)"
                    className="h-full w-full object-cover object-left-top"
                  />
                ) : (
                  <ProjectVisual visual={project.visual} />
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <div className={cn("md:col-span-5", reversed ? "md:order-1" : "md:order-2")}>
          <Reveal delay={0.05}>
            <span className="font-mono text-xs text-accent">{index}</span>
            <h3 className="mt-3 font-display text-3xl font-medium leading-snug text-fg md:text-4xl">
              {project.name}
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {project.client}
            </p>

            {(project.status || project.private) && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.status && (
                  <span className="inline-flex items-center gap-2 border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {project.status}
                    {project.statusNote && (
                      <span className="text-muted normal-case tracking-normal">
                        · {project.statusNote}
                      </span>
                    )}
                  </span>
                )}
                {project.private && (
                  <span className="inline-flex items-center gap-2 border border-border-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    <Lock size={11} strokeWidth={2} aria-hidden="true" />
                    Sistema privado de cliente
                  </span>
                )}
              </div>
            )}

            <p className="mt-8 text-base leading-relaxed text-fg md:text-lg">{project.problem}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{project.built}</p>

            {project.result && (
              <p className="mt-6 border-t border-border pt-4 font-display text-lg font-medium text-fg">
                {project.result}
              </p>
            )}

            <ul className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
                  {highlight}
                </li>
              ))}
            </ul>

            <StaggerGroup className="mt-8 flex flex-wrap gap-2" stagger={0.04}>
              {project.tags.map((tag) => (
                <StaggerItem key={tag}>
                  <span className="border border-border-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {tag}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-fg transition-colors hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
            )}
            {project.linkNote && (
              <p className="mt-3 font-mono text-[11px] tracking-[0.05em] text-muted-2">
                {project.linkNote}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </article>
  );
}
