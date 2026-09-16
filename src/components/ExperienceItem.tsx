import Link from "next/link";
import type { ExperienceRole } from "@/lib/types";
import { ArrowRightIcon } from "./ui/Icons";

interface ExperienceItemProps {
  role: ExperienceRole;
  /** Zero-based position; rendered as 01, 02, … */
  index: number;
}

/**
 * One role. Number in the gutter, role + company as the headline, duration
 * and status in a mono column, then the verified responsibilities.
 */
export function ExperienceItem({ role, index }: ExperienceItemProps) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <li className="group border-b border-border transition-colors hover:border-border-strong">
      <article className="grid gap-5 py-10 sm:grid-cols-[56px_1fr] sm:gap-6 sm:py-12">
        <p
          aria-hidden="true"
          className="font-mono text-sm text-fg-faint transition-transform duration-300 ease-out-quart group-hover:translate-x-1"
        >
          {number}
        </p>

        <div className="min-w-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{role.role}</h3>
              <p className="mt-1.5 text-base text-fg-muted">
                {role.company}
                {role.location ? <span className="text-fg-faint"> · {role.location}</span> : null}
              </p>
            </div>

            <dl className="flex shrink-0 gap-6 font-mono text-xs md:flex-col md:gap-1.5 md:text-right">
              <div>
                <dt className="sr-only">Duration</dt>
                <dd className="text-fg">{role.duration}</dd>
              </div>
              {role.status === "completed" ? (
                <div>
                  <dt className="sr-only">Status</dt>
                  <dd className="inline-flex items-center gap-1.5 text-fg-faint">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
                    Completed
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

          {role.related ? (
            <Link
              href={role.related.href}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              {role.related.label}
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </article>
    </li>
  );
}
