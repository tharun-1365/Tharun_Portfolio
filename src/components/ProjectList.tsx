import Link from "next/link";
import { publishedProjects } from "@/data/projects";
import type { Project } from "@/lib/types";
import { ProjectItem, ProjectLinks } from "./ProjectItem";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/**
 * Featured Projects. The flagship project gets a larger editorial block with
 * its pipeline; the rest are compact rows. Full-width section (no side
 * column) so the list has room.
 */
export function ProjectList() {
  const featured = publishedProjects.find((p) => p.featured);
  const rest = publishedProjects.filter((p) => p !== featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-border py-16 sm:py-24">
      <Container>
        <Reveal>
          <header className="max-w-2xl">
            <p className="font-mono text-xs tracking-wide text-fg-faint">03 — Featured Projects</p>
            <h2 id="projects-title" className="mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              Projects
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              Descriptions are written from the actual repositories. Each case study links to the
              source where it is public.
            </p>
          </header>
        </Reveal>

        {featured ? (
          <Reveal className="mt-10">
            <FeaturedProject project={featured} />
          </Reveal>
        ) : null}

        <Reveal>
          <ol className="mt-4 divide-y divide-border border-t border-border">
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
    <article className="group rounded-lg border border-border bg-bg-subtle p-6 transition-colors hover:border-border-strong sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:gap-12">
        <div className="min-w-0">
          <p className="flex items-center gap-3 font-mono text-xs text-fg-faint">
            <span className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1">
              {project.number}
            </span>
            <span>Flagship</span>
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            <Link href={href} className="link-underline">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 font-mono text-xs text-fg-faint">{project.technologies.join(" · ")}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">{project.tagline}</p>

          {project.summaryFlow ? (
            <ol
              aria-label="Pipeline"
              className="mt-6 flex flex-wrap items-center gap-y-2 font-mono text-xs text-fg-muted"
            >
              {project.summaryFlow.map((step, index) => (
                <li key={step} className="flex items-center">
                  <span className="rounded border border-border bg-bg px-2 py-1">{step}</span>
                  {index < project.summaryFlow!.length - 1 ? (
                    <span aria-hidden="true" className="px-1.5 text-fg-faint">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}

          <ProjectLinks project={project} className="mt-6" />
        </div>

        {project.highlights ? (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 self-start border-t border-border pt-4 font-mono text-xs lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            {project.highlights.map((h) => (
              <div key={h.label} className="contents">
                <dt className="text-fg-faint">{h.label}</dt>
                <dd className="text-fg-muted">{h.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </article>
  );
}
