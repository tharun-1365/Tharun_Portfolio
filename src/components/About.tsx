import { Section } from "./ui/Section";

export function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="About">
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
    </Section>
  );
}
