import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CaseStudyTabs, type CaseStudyTab } from "./CaseStudyTabs";
import { repoPath, statusLabel } from "./ProjectItem";
import { TechStack } from "./TechStack";
import { Badge } from "./ui/Badge";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "./ui/Icons";

const typeLabel: Record<Project["type"], string> = {
  "open-source": "Open source",
  internship: "Internship project",
  academic: "Academic project",
};

interface ProjectCaseStudyProps {
  project: Project;
  previous?: Project;
  next?: Project;
}

export function ProjectCaseStudy({ project, previous, next }: ProjectCaseStudyProps) {
  const cs = project.caseStudy;

  const tabs: CaseStudyTab[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-12">
          <Prose paragraphs={cs.overview} />
          <SubSection title="Problem">
            <Prose paragraphs={cs.problem} />
          </SubSection>
          <SubSection title="Approach">
            <Prose paragraphs={cs.approach} />
          </SubSection>
          {cs.implementation && cs.implementation.length > 0 ? (
            <SubSection title="Implementation">
              <BulletList items={cs.implementation} />
            </SubSection>
          ) : null}
          <SubSection title="Key features">
            <BulletList items={cs.features} />
          </SubSection>
        </div>
      ),
    },
    {
      id: "architecture",
      label: "Architecture",
      content: (
        <div className="space-y-10">
          <ArchitectureDiagram data={cs.architecture.diagram} title={`${project.title} architecture`} />
          {cs.architecture.notes.length > 0 ? (
            <SubSection title="Notes">
              <BulletList items={cs.architecture.notes} />
            </SubSection>
          ) : null}
        </div>
      ),
    },
  ];

  if (cs.testing && cs.testing.length > 0) {
    tabs.push({
      id: "testing",
      label: "Testing",
      content: <BulletList items={cs.testing} />,
    });
  }

  tabs.push({
    id: "technology",
    label: "Tech Stack",
    content: <TechStack groups={cs.stack} />,
  });

  const metaParts = [typeLabel[project.type], statusLabel[project.status], project.year, project.organization].filter(
    Boolean,
  );

  return (
    <article>
      <Container className="pt-24 sm:pt-32">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-fg-faint">
            <span>{project.number}</span>
            {metaParts.map((part) => (
              <Badge key={part} dot={part === statusLabel.active}>
                {part}
              </Badge>
            ))}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{project.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul aria-label="Technologies" className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge tone="outline">{tech}</Badge>
                </li>
              ))}
            </ul>
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 items-center gap-2 rounded-md border border-border px-3 font-mono text-xs text-fg transition-colors hover:border-border-strong hover:bg-bg-subtle"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                {repoPath(project.github)}
                <ArrowUpRightIcon className="h-3 w-3 text-fg-faint" />
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 items-center gap-2 rounded-md border border-border px-3 text-xs font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-subtle"
              >
                Live demo
                <ArrowUpRightIcon className="h-3 w-3 text-fg-faint" />
              </a>
            ) : null}
          </div>

          {project.sourceNote ? (
            <p className="mt-5 max-w-2xl border-l-2 border-border pl-4 text-sm leading-relaxed text-fg-muted">
              {project.sourceNote}
            </p>
          ) : null}
        </header>

        <Reveal className="mt-12 max-w-4xl">
          <CaseStudyTabs tabs={tabs} />
        </Reveal>

        <nav aria-label="Other projects" className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {previous ? (
            <AdjacentLink project={previous} direction="previous" />
          ) : (
            <span />
          )}
          {next ? <AdjacentLink project={next} direction="next" /> : null}
        </nav>
      </Container>
    </article>
  );
}

function AdjacentLink({ project, direction }: { project: Project; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group card card-hover flex flex-col gap-1 p-4 ${isNext ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-1 font-mono text-xs text-fg-faint">
        {!isNext ? <ArrowLeftIcon className="h-3 w-3" /> : null}
        {isNext ? "Next" : "Previous"} · {project.number}
        {isNext ? <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" /> : null}
      </span>
      <span className="text-sm font-medium text-fg">{project.title}</span>
    </Link>
  );
}

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-xs tracking-wide text-fg-faint">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-fg-muted">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-relaxed text-fg-muted sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-border-strong" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
