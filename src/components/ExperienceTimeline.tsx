import { experience } from "@/data/experience";
import { ExperienceItem } from "./ExperienceItem";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/**
 * Experience. Full-width section (no side column) with a prominent heading,
 * a numbered list of roles, and a hairline divider between entries.
 */
export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-t border-border bg-bg-subtle py-16 sm:py-24"
    >
      <Container>
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
          <ol className="mt-10 border-t border-border sm:mt-14">
            {experience.map((role, index) => (
              <ExperienceItem key={`${role.company}-${role.role}`} role={role} index={index} />
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
