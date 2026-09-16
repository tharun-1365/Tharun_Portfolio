import Link from "next/link";
import type { ExperienceRole } from "@/lib/types";
import { Badge } from "./ui/Badge";
import { ArrowRightIcon } from "./ui/Icons";

interface ExperienceItemProps {
  role: ExperienceRole;
  /** Zero-based position; rendered as 01, 02, … */
  index: number;
  isLast: boolean;
}

/**
 * One role on the timeline: number + node in the gutter, role and company as
 * the headline, duration/status column, verified responsibilities, and the
 * technologies those responsibilities name.
 */
export function ExperienceItem({ role, index, isLast }: ExperienceItemProps) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <li className="relative grid gap-4 sm:grid-cols-[72px_1fr] sm:gap-8">
      {/* Gutter: number + timeline node/line */}
      <div className="relative flex items-center gap-3 sm:block sm:pt-7">
        <span className="font-mono text-sm text-fg-faint">{number}</span>
        <span
          aria-hidden="true"
          className="hidden h-2.5 w-2.5 rounded-full border border-border-strong bg-bg sm:absolute sm:top-8 sm:right-0 sm:block sm:translate-x-1/2"
        />
        {!isLast ? (
          <span
            aria-hidden="true"
            className="hidden sm:absolute sm:top-12 sm:right-0 sm:bottom-[-2.5rem] sm:block sm:w-px sm:translate-x-1/2 sm:bg-border"
          />
        ) : null}
      </div>

      <article className="card card-hover p-6 sm:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{role.role}</h3>
            <p className="mt-1.5 text-base text-fg-muted">
              {role.company}
              {role.location ? <span className="text-fg-faint"> · {role.location}</span> : null}
            </p>
          </div>
          <dl className="flex shrink-0 flex-wrap items-center gap-2">
            <div>
              <dt className="sr-only">Duration</dt>
              <dd>
                <Badge tone="outline">{role.duration}</Badge>
              </dd>
            </div>
            {role.status === "completed" ? (
              <div>
                <dt className="sr-only">Status</dt>
                <dd>
                  <Badge dot>Completed</Badge>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <ul className="mt-6 max-w-2xl space-y-2.5 text-sm leading-relaxed text-fg-muted sm:text-base">
          {role.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-border-strong" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          {role.tags && role.tags.length > 0 ? (
            <ul aria-label="Technologies" className="flex flex-wrap gap-2">
              {role.tags.map((tag) => (
                <li key={tag}>
                  <Badge>{tag}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          {role.related ? (
            <Link
              href={role.related.href}
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              {role.related.label}
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quart group-hover/link:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </article>
    </li>
  );
}
