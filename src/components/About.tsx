import { Section } from "./ui/Section";

export function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="About">
      <div className="grid gap-10 lg:grid-cols-[1fr_240px] lg:gap-14">
        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
          <p>
            I&apos;m an Information Technology student at St. Joseph&apos;s College of Engineering,
            Chennai, interested in building software systems, interactive experiences, and AI-driven
            applications.
          </p>
          <p>
            My work spans software development, Unity game development in C#, automated QA, and
            machine learning. I prefer building working systems over demos: recording gameplay and
            replaying it deterministically, training a classifier and wiring it to an API, or
            automating a repetitive reporting task during an internship.
          </p>
          <p>
            I work mainly in Java, Python, C, and C#. Current focus: test automation, game tooling,
            and practical ML.
          </p>
        </div>

        {/* Compact facts panel — all values appear elsewhere on the page. */}
        <dl className="card grid h-fit grid-cols-2 gap-x-6 gap-y-4 p-5 font-mono text-xs lg:grid-cols-1">
          <div>
            <dt className="text-fg-faint">degree</dt>
            <dd className="mt-1 text-fg">B.Tech IT, 2023–2027</dd>
          </div>
          <div>
            <dt className="text-fg-faint">college</dt>
            <dd className="mt-1 text-fg">St. Joseph&apos;s College of Engineering</dd>
          </div>
          <div>
            <dt className="text-fg-faint">internships</dt>
            <dd className="mt-1 text-fg">3</dd>
          </div>
          <div>
            <dt className="text-fg-faint">public repos featured</dt>
            <dd className="mt-1 text-fg">4 on GitHub</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
