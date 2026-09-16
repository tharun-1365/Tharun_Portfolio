import Link from "next/link";
import { publishedProjects } from "@/data/projects";
import type { Project } from "@/lib/types";
import { PipelineDiagram } from "./PipelineDiagram";
import { ProjectItem, ProjectLinks, statusLabel } from "./ProjectItem";
import { Badge } from "./ui/Badge";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/**
 * Featured Projects: one large flagship panel with its pipeline, then the
 * remaining projects in a two-column grid.
 */
export function ProjectList() {
  const featured = publishedProjects.find((p) => p.featured);
  const rest = publishedProjects.filter((p) => p !== featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-wide text-fg-faint">03 — Featured Projects</p>
              <h2 id="projects-title" className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                Projects
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-fg-muted sm:text-right">
              Written from the actual repositories. Each case study links to the source where it is
              public.
            </p>
          </header>
        </Reveal>

        {featured ? (
          <Reveal className="mt-12 sm:mt-16">
            <FeaturedProject project={featured} />
          </Reveal>
        ) : null}

        <Reveal>
          <ol className="reveal-stagger mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((project) => (
              <ProjectItem key={project.slug} project={project} />
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="group card card-hover relative overflow-hidden">
      {/* Faint dot texture on the panel header only. */}
      <div aria-hidden="true" className="bg-dots absolute inset-x-0 top-0 h-40 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_260px] lg:gap-12">
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm text-fg-faint transition-transform duration-300 ease-out-quart group-hover:translate-x-1">
                {project.number}
              </span>
              <Badge tone="accent">Flagship</Badge>
              <Badge dot={project.status === "active"}>{statusLabel[project.status]}</Badge>
              {project.year ? <Badge>{project.year}</Badge> : null}
            </p>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-fg sm:text-3xl lg:text-[2.1rem] lg:leading-tight">
              <Link href={href} className="link-underline">
                {project.title}
              </Link>
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">{project.tagline}</p>
            <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge tone="outline">{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>

          {project.highlights ? (
            <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5 font-mono text-xs lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
              {project.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="text-fg-faint">{h.label}</dt>
                  <dd className="mt-1 text-fg">{h.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {project.pipeline ? (
          <div className="mt-8 rounded-lg border border-border bg-bg-subtle px-5 py-5 sm:px-6">
            <p className="mb-5 font-mono text-[11px] tracking-[0.12em] text-fg-faint uppercase">
              Implemented pipeline
            </p>
            <PipelineDiagram steps={project.pipeline} />
          </div>
        ) : null}

        <ProjectLinks project={project} className="mt-6" />
      </div>
    </article>
  );
}
