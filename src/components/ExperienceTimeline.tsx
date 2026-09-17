import { experience } from "@/data/experience";
import { ExperienceItem } from "./ExperienceItem";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/**
 * Experience. A distinct band with its own surface and a faint grid, a large
 * heading, and three substantial timeline entries with oversized markers.
 */
export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative overflow-hidden border-t border-b border-border bg-bg-subtle py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
      />

      <Container className="relative">
        <Reveal>
          <header className="grid gap-6 border-b border-border pb-10 sm:pb-12 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.14em] text-fg-faint uppercase">02 — Experience</p>
              <h2
                id="experience-title"
                className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl"
              >
                Experience
              </h2>
              <p className="mt-3 text-lg text-fg-muted">Professional experience &amp; internships</p>
            </div>
            <dl className="flex gap-8 font-mono text-xs md:justify-end">
              <div>
                <dt className="text-fg-faint">internships</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg">{String(experience.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt className="text-fg-faint">areas</dt>
                <dd className="mt-1 text-sm text-fg">Prompt engineering · Technical support · Unity / RPA</dd>
              </div>
            </dl>
          </header>
        </Reveal>

        <Reveal>
          <ol className="reveal-stagger mt-4">
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
