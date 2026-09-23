import { PROJECTS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="border-t border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="03" label="Selected Projects" />

        <Reveal>
          <h2 className="mt-8 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-fg">
            A few things I&apos;ve built.
          </h2>
        </Reveal>

        <div className="mt-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
