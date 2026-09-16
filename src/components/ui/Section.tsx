import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  /** Small mono label above the heading, e.g. "02 — Experience". */
  eyebrow: string;
  title: string;
  /** Optional one-line lead under the title. */
  lead?: string;
  /** "split": heading column + content column on wide screens. "stack": heading above content. */
  layout?: "split" | "stack";
  /** Alternate surface tone so consecutive sections read as distinct bands. */
  surface?: "base" | "subtle";
  children: ReactNode;
  className?: string;
}

/**
 * Standard page section with eyebrow + heading. Sections alternate surface
 * tones and are separated by hairline borders for rhythm.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  layout = "split",
  surface = "base",
  children,
  className,
}: SectionProps) {
  const header = (
    <header className={cn(layout === "split" && "md:sticky md:top-24 md:self-start")}>
      <p className="font-mono text-xs tracking-wide text-fg-faint">{eyebrow}</p>
      <h2
        id={`${id}-title`}
        className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
      >
        {title}
      </h2>
      {lead ? <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted">{lead}</p> : null}
    </header>
  );

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "border-t border-border py-20 sm:py-28",
        surface === "subtle" && "bg-bg-subtle",
        className,
      )}
    >
      <Container>
        <Reveal>
          {layout === "split" ? (
            <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-14 lg:grid-cols-[260px_1fr]">
              {header}
              <div className="min-w-0">{children}</div>
            </div>
          ) : (
            <div>
              {header}
              <div className="mt-10 min-w-0 sm:mt-14">{children}</div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
