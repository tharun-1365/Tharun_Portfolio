import Link from "next/link";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ArrowUpRightIcon } from "./ui/Icons";

/** Editorial project row: number, title, stack, one sentence, links. */
export function ProjectItem({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  return (
    <li className="group">
      <article className="grid gap-4 py-8 sm:grid-cols-[56px_1fr] sm:gap-6">
        <p
          aria-hidden="true"
          className="font-mono text-sm text-fg-faint transition-transform duration-300 ease-out-quart group-hover:translate-x-1"
        >
          {project.number}
        </p>
        <div className="min-w-0">
          <h3 className="text-lg font-medium tracking-tight text-fg">
            <Link href={href} className="link-underline">
              {project.title}
            </Link>
          </h3>
          <p className="mt-1.5 font-mono text-xs text-fg-faint">
            {project.technologies.join(" · ")}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">{project.tagline}</p>
          <ProjectLinks project={project} />
        </div>
      </article>
    </li>
  );
}

export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const href = `/projects/${project.slug}`;
  return (
    <div className={cn("mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm", className)}>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-fg transition-colors hover:text-accent"
      >
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5" />
        {project.ctaLabel ?? "View Case Study"}
      </Link>
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
          GitHub
        </a>
      ) : null}
    </div>
  );
}
