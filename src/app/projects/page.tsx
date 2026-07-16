import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "projects",
  description: "만들어 온 프로젝트 목록",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-2xl">
      <p aria-hidden className="font-mono text-xs text-ink-soft">
        $ ls projects/
      </p>
      <h1 className="mt-2 font-heading text-xl font-semibold tracking-tight text-ink">
        Projects
      </h1>
      <div className="mt-6 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
