import { ArrowUpRight } from "lucide-react";
import { EARLIER_PROJECTS, FEATURED_PROJECTS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects({ index }: { index: string }) {
  return (
    <section id="projects" className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index={index} label="Projetos em destaque" />

        <Reveal>
          <h2 className="mt-8 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-fg">
            Software feito para empresas reais.
          </h2>
        </Reveal>

        <div className="mt-6">
          {FEATURED_PROJECTS.map((project, projectIndex) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={String(projectIndex + 1).padStart(2, "0")}
              reversed={projectIndex % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-16 md:pt-20">
          <Reveal>
            <h3 className="font-display text-2xl font-medium text-fg md:text-3xl">
              Projetos acadêmicos e anteriores
            </h3>
          </Reveal>

          <ul className="mt-8 divide-y divide-border border-y border-border">
            {EARLIER_PROJECTS.map((project) => {
              const content = (
                <>
                  <span className="font-display text-lg font-medium text-fg transition-colors group-hover:text-accent md:col-span-4">
                    {project.name}
                  </span>
                  <span className="text-sm leading-relaxed text-muted md:col-span-7">
                    {project.description}
                  </span>
                  <span className="hidden justify-end md:col-span-1 md:flex">
                    {project.href && (
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    )}
                  </span>
                </>
              );
              const rowClass =
                "group grid grid-cols-1 gap-1 py-5 md:grid-cols-12 md:items-baseline md:gap-8";

              return (
                <li key={project.id}>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={rowClass}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={rowClass}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
