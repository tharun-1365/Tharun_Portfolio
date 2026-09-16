import { skills } from "@/data/skills";
import { Badge } from "./ui/Badge";
import { Section } from "./ui/Section";

/** Three grouped panels: mono heading, tags, and a line of evidence. No bars. */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="04 — Skills"
      title="Skills"
      lead="Grouped by how they show up in the work above. Every tag maps to a project or internship on this page."
      layout="stack"
      surface="subtle"
    >
      <div className="reveal-stagger grid gap-4 md:grid-cols-3">
        {skills.map((group, index) => (
          <article key={group.category} className="card card-hover flex flex-col p-6">
            <header className="flex items-center justify-between">
              <h3 className="font-mono text-xs tracking-[0.12em] text-fg-faint uppercase">{group.category}</h3>
              <span className="font-mono text-[11px] text-fg-faint">{String(index + 1).padStart(2, "0")}</span>
            </header>
            <ul className="mt-5 mb-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge tone="outline" className="h-7 px-2.5 text-xs">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
            {group.evidence ? (
              <p className="mt-auto border-t border-border pt-4 text-xs leading-relaxed text-fg-faint">
                {group.evidence}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
