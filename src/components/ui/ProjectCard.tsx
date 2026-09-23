"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, reversed }: { project: Project; reversed: boolean }) {
  return (
    <article className="group border-t border-border py-16 md:py-20">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className={cn("md:col-span-7", reversed ? "md:order-2" : "md:order-1")}>
          <Reveal y={40}>
            <div className="aspect-4/3 w-full overflow-hidden border border-border-strong">
              <div className="h-full w-full transition-transform duration-700 ease-out md:group-hover:scale-[1.04]">
                <ProjectVisual visual={project.visual} />
              </div>
            </div>
          </Reveal>
        </div>

        <div
          className={cn(
            "md:col-span-5 md:transition-transform md:duration-500 md:group-hover:translate-x-1",
            reversed ? "md:order-1" : "md:order-2"
          )}
        >
          <Reveal delay={0.05}>
            <span className="font-mono text-xs text-accent">{project.index}</span>
            <h3 className="mt-3 font-display text-2xl font-medium leading-snug text-fg md:text-3xl">
              {project.name}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
              {project.description}
            </p>

            <StaggerGroup className="mt-6 flex flex-wrap gap-2" stagger={0.05}>
              {project.tags.map((tag) => (
                <StaggerItem key={tag}>
                  <span className="border border-border-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {tag}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-fg transition-colors hover:text-accent"
              >
                View project
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ) : (
              <span className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.15em] text-muted-2">
                Internal Project
              </span>
            )}
          </Reveal>
        </div>
      </div>
    </article>
  );
}
