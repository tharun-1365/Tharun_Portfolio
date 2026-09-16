import { experience } from "@/data/experience";
import { ExperienceItem } from "./ExperienceItem";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/**
 * Experience. Full-width section with a prominent heading and a numbered
 * timeline of roles, each in its own panel.
 */
export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative border-t border-border bg-bg-subtle py-20 sm:py-28"
    >
      <Container className="relative">
        <Reveal>
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-wide text-fg-faint">02 — Experience</p>
              <h2
                id="experience-title"
                className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
              >
                Experience
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-fg-muted sm:text-right">
              Three internships across prompt engineering, technical support and automation
              testing, and Unity / RPA development.
            </p>
          </header>
        </Reveal>

        <Reveal>
          <ol className="reveal-stagger mt-12 space-y-10 sm:mt-16">
            {experience.map((role, index) => (
              <ExperienceItem
                key={`${role.company}-${role.role}`}
                role={role}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
