import { skills } from "@/data/skills";
import { Section } from "./ui/Section";

/** Categorised skill lists. No bars, no percentages. */
export function Skills() {
  return (
    <Section id="skills" eyebrow="04 — Skills" title="Skills">
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <dt className="font-mono text-xs tracking-wide text-fg-faint">{group.category}</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border px-2.5 py-1 text-sm text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
