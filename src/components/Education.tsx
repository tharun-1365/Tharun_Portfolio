import { education } from "@/data/education";
import { Badge } from "./ui/Badge";
import { Section } from "./ui/Section";

export function Education() {
  return (
    <Section id="education" eyebrow="05 — Education" title="Education">
      <ul className="space-y-4">
        {education.map((entry) => (
          <li key={entry.institution} className="card card-hover p-6 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-fg">{entry.degree}</h3>
                <p className="mt-1.5 text-base text-fg-muted">
                  {entry.institution}
                  <span className="text-fg-faint"> · {entry.location}</span>
                </p>
              </div>
              <Badge tone="outline">{entry.period}</Badge>
            </div>
            {entry.details && entry.details.length > 0 ? (
              <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-4 font-mono text-xs">
                {entry.details.map((detail) => {
                  const [label, value] = detail.split(":").map((s) => s.trim());
                  return (
                    <div key={detail} className="flex gap-3">
                      <dt className="text-fg-faint">{value ? label.toLowerCase() : "note"}</dt>
                      <dd className="text-fg">{value ?? label}</dd>
                    </div>
                  );
                })}
              </dl>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
