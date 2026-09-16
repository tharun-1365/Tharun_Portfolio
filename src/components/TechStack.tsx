import type { TechGroup } from "@/lib/types";

/** Grouped technology list for a case study. */
export function TechStack({ groups }: { groups: TechGroup[] }) {
  return (
    <dl className="divide-y divide-border">
      {groups.map((group) => (
        <div key={group.category} className="grid gap-2 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
          <dt className="font-mono text-xs tracking-wide text-fg-faint sm:pt-0.5">{group.category}</dt>
          <dd>
            <ul className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-fg">
              {group.items.map((item, index) => (
                <li key={item}>
                  {item}
                  {index < group.items.length - 1 ? <span className="text-fg-faint"> ·</span> : null}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
