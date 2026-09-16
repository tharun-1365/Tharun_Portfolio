"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Current URL hash (without '#'); empty on the server. */
function useHash(): string {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange);
      return () => window.removeEventListener("hashchange", onChange);
    },
    () => window.location.hash.replace("#", ""),
    () => "",
  );
}

export interface CaseStudyTab {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Segmented tab navigation (WAI-ARIA tabs pattern). All panels are in the DOM
 * (hidden, not unmounted) so the content is indexable and printable. The
 * active tab is mirrored to the URL hash so a tab can be linked directly.
 */
export function CaseStudyTabs({ tabs }: { tabs: CaseStudyTab[] }) {
  const [selected, setSelected] = useState(tabs[0]?.id);
  const hash = useHash();
  // A valid hash (deep link) wins; otherwise the last clicked tab.
  const active = tabs.some((t) => t.id === hash) ? hash : selected;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (id: string, focus = false) => {
    setSelected(id);
    window.history.replaceState(null, "", `#${id}`);
    if (focus) tabRefs.current[tabs.findIndex((t) => t.id === id)]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next !== null) {
      event.preventDefault();
      select(tabs[next].id, true);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Case study sections"
        className="-mx-5 flex gap-1 overflow-x-auto border-b border-border px-5 sm:mx-0 sm:px-0"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={cn(
                "relative -mb-px whitespace-nowrap px-3 py-3 text-sm transition-colors",
                selected ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {tab.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 bottom-0 h-px transition-colors",
                  selected ? "bg-fg" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
          className="pt-8 outline-none focus-visible:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
