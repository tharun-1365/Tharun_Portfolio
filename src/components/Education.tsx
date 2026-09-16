import { education } from "@/data/education";
import { Section } from "./ui/Section";

export function Education() {
  return (
    <Section id="education" eyebrow="05 — Education" title="Education">
      <ul className="divide-y divide-border">
        {education.map((entry) => (
          <li key={entry.institution} className="flex flex-col gap-1 py-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <div>
              <h3 className="text-base font-medium text-fg">{entry.degree}</h3>
              <p className="mt-1 text-sm text-fg-muted">
                {entry.institution}, {entry.location}
              </p>
              {entry.details?.map((detail) => (
                <p key={detail} className="mt-1 text-sm text-fg-faint">
                  {detail}
                </p>
              ))}
            </div>
            <p className="shrink-0 font-mono text-xs text-fg-faint">{entry.period}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
