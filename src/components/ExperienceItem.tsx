import Link from "next/link";
import type { ExperienceRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/Badge";
import { ArrowRightIcon } from "./ui/Icons";

interface ExperienceItemProps {
  role: ExperienceRole;
  /** Zero-based position; rendered as 01, 02, … */
  index: number;
  isLast: boolean;
}

/**
 * One entry on the timeline. Oversized marker + node on a continuous rail in
 * the gutter; the entry itself leads with the company name, then role, meta
 * badges, the verified responsibilities, and the technologies they name.
 */
export function ExperienceItem({ role, index, isLast }: ExperienceItemProps) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <li className="relative grid gap-5 py-10 sm:grid-cols-[96px_1fr] sm:gap-10 sm:py-14 lg:grid-cols-[128px_1fr]">
      {/* Gutter: large marker, node, and rail */}
      <div className="relative flex items-center gap-4 sm:block">
        <span
          aria-hidden="true"
          className="font-mono text-4xl leading-none font-semibold tracking-tight text-fg-faint sm:text-5xl lg:text-6xl"
        >
          {number}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-border sm:hidden" />
        {/* node */}
        <span
          aria-hidden="true"
          className="hidden sm:absolute sm:top-2 sm:right-0 sm:block sm:h-3 sm:w-3 sm:translate-x-1/2 sm:rounded-full sm:border-2 sm:border-fg sm:bg-bg-subtle"
        />
        {/* rail */}
        <span
          aria-hidden="true"
          className={cn(
            "hidden sm:absolute sm:right-0 sm:block sm:w-px sm:translate-x-1/2 sm:bg-border-strong",
            "sm:top-5",
            isLast ? "sm:bottom-[calc(100%-1.25rem)]" : "sm:-bottom-14",
          )}
        />
      </div>

      <article className="card card-hover p-7 sm:p-9">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">{role.company}</h3>
            <p className="mt-2 text-lg text-fg-muted">{role.role}</p>
          </div>
          <dl className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
            <div>
              <dt className="sr-only">Duration</dt>
              <dd>
                <Badge tone="outline" className="h-7 px-2.5 text-xs">
                  {role.duration}
                </Badge>
              </dd>
            </div>
            {role.status === "completed" ? (
              <div>
                <dt className="sr-only">Status</dt>
                <dd>
                  <Badge dot className="h-7 px-2.5 text-xs">
                    Completed
                  </Badge>
                </dd>
              </div>
            ) : null}
            {role.location ? (
              <div>
                <dt className="sr-only">Location</dt>
                <dd>
                  <Badge className="h-7 px-2.5 text-xs">{role.location}</Badge>
                </dd>
              </div>
            ) : null}
          </dl>
        </header>

        <ul className="mt-7 max-w-2xl space-y-3 border-t border-border pt-6 text-base leading-relaxed text-fg-muted">
          {role.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-border-strong" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {(role.tags && role.tags.length > 0) || role.related ? (
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
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
        ) : null}
      </article>
    </li>
  );
}
