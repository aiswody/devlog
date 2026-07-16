import type { Project } from "@/lib/projects";

/** 프로젝트 레포 링크 카드 — projects 페이지와 글 하단에서 공용 */
export function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-heading font-semibold tracking-tight text-ink">
          {project.name}
        </h3>
        {project.repo ? (
          <span className="shrink-0 font-mono text-xs text-accent">
            repo →
          </span>
        ) : (
          <span className="shrink-0 font-mono text-xs text-ink-soft">
            repo 준비 중
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {project.description}
      </p>
      <p className="mt-3 flex flex-wrap gap-x-2 font-mono text-xs text-accent">
        {project.tech.map((tech) => (
          <span key={tech}>#{tech}</span>
        ))}
      </p>
    </>
  );

  const className =
    "block rounded-lg border border-line bg-surface p-5 hover:border-accent";

  if (project.repo) {
    return (
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
}
