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
  children: ReactNode;
  className?: string;
}

/**
 * Standard page section: eyebrow + h2 in a left column, content on the right
 * on wide screens; stacked on mobile.
 */
export function Section({ id, eyebrow, title, lead, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("border-t border-border py-16 sm:py-24", className)}
    >
      <Container>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12 lg:grid-cols-[240px_1fr]">
            <header className="md:sticky md:top-24 md:self-start">
              <p className="font-mono text-xs tracking-wide text-fg-faint">{eyebrow}</p>
              <h2
                id={`${id}-title`}
                className="mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl"
              >
                {title}
              </h2>
              {lead ? <p className="mt-3 text-sm leading-relaxed text-fg-muted">{lead}</p> : null}
            </header>
            <div className="min-w-0">{children}</div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
