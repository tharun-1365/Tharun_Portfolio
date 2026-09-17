import Link from "next/link";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/Badge";
import { ArrowRightIcon, GitHubIcon } from "./ui/Icons";

export const statusLabel: Record<Project["status"], string> = {
  active: "In development",
  completed: "Completed",
  prototype: "Prototype",
  draft: "Draft",
};

/** "owner/repo" from a GitHub URL, for the small repo indicator. */
export function repoPath(url: string): string {
  return url.replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "");
}

/**
 * Project card for the two-column grid. Number, status, title, one sentence,
 * a mini data-flow derived from the verified architecture, tags, and links.
 */
export function ProjectItem({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  const flow = project.caseStudy.architecture.diagram.nodes.slice(0, 4).map((n) => n.label);

  return (
    <li className="group card card-hover flex h-full min-w-0 flex-col p-6 sm:p-7">
      <article className="flex h-full min-w-0 flex-col">
        <header className="flex items-center justify-between gap-4">
          <span className="font-mono text-sm text-fg-faint transition-transform duration-300 ease-out-quart group-hover:translate-x-1">
            {project.number}
          </span>
          <div className="flex items-center gap-2">
            {project.type === "internship" ? <Badge>Internship</Badge> : null}
            <Badge dot={project.status === "active"}>{statusLabel[project.status]}</Badge>
          </div>
        </header>

        <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg">
          <Link href={href} className="link-underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.tagline}</p>

        {flow.length > 1 ? (
          <p
            aria-label="Data flow"
            className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 rounded-md border border-border bg-bg-subtle px-3 py-2 font-mono text-[11px] text-fg-muted"
          >
            {flow.map((label, index) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-fg-faint">
                    →
                  </span>
                ) : null}
                {label}
              </span>
            ))}
          </p>
        ) : null}

        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge tone="outline">{tech}</Badge>
            </li>
          ))}
        </ul>

        <ProjectLinks project={project} className="mt-auto border-t border-border pt-5" />
      </article>
    </li>
  );
}

export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const href = `/projects/${project.slug}`;
  return (
    <div className={cn("mt-6 flex min-w-0 items-center justify-between gap-4 text-sm", className)}>
      <Link
        href={href}
        className="group/link inline-flex items-center gap-1.5 font-medium text-fg transition-colors hover:text-accent"
      >
        {project.ctaLabel ?? "View Case Study"}
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quart group-hover/link:translate-x-0.5" />
      </Link>
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label="View GitHub repository"
          title="GitHub Repository"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:border-border-strong hover:bg-bg-subtle hover:text-fg"
        >
          <GitHubIcon className="h-4 w-4" />
        </a>
      ) : (
        <span className="font-mono text-xs text-fg-faint">source not public</span>
      )}
    </div>
  );
}
