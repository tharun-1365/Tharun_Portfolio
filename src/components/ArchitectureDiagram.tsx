import type { ArchitectureDiagramData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  data: ArchitectureDiagramData;
  /** Accessible name for the figure. */
  title: string;
  className?: string;
}

/**
 * Minimal, monochrome flow diagram: boxes, arrows, labels. Renders as a
 * horizontal row on wide screens when the flow is short enough, and as a
 * vertical list otherwise (and always on small screens).
 */
export function ArchitectureDiagram({ data, title, className }: ArchitectureDiagramProps) {
  const { nodes, caption } = data;
  const direction = data.direction ?? "auto";
  const horizontal = direction === "horizontal" || (direction === "auto" && nodes.length <= 5);

  if (nodes.length === 0) return null;

  return (
    <figure className={cn("w-full", className)} aria-label={title}>
      <ol
        className={cn(
          "reveal-stagger flex flex-col",
          horizontal && "md:flex-row md:items-stretch",
        )}
      >
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;
          return (
            <li
              key={node.label}
              className={cn("flex flex-col", horizontal && "md:flex-1 md:flex-row md:items-stretch")}
            >
              <div
                className={cn(
                  "card flex-1 p-4 transition-colors hover:border-border-strong",
                  horizontal ? "md:min-w-0" : "sm:flex sm:gap-6",
                )}
              >
                <div className={cn(!horizontal && "sm:w-56 sm:shrink-0")}>
                  <p className="flex items-baseline gap-2">
                    <span className="font-mono text-[11px] text-fg-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-fg">{node.label}</span>
                  </p>
                  {node.detail ? (
                    <p className="mt-1 text-xs leading-relaxed text-fg-muted">{node.detail}</p>
                  ) : null}
                </div>
                {node.items && node.items.length > 0 ? (
                  <ul
                    className={cn(
                      "mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-fg-faint",
                      !horizontal && "sm:mt-0 sm:content-start sm:self-center",
                    )}
                  >
                    {node.items.map((item) => (
                      <li key={item} className="before:mr-1 before:text-border-strong before:content-['·']">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {!isLast ? (
                <div
                  aria-hidden="true"
                  className={cn(
                    "flex items-center justify-center text-fg-faint",
                    "h-7 w-full",
                    horizontal && "md:h-auto md:w-7",
                  )}
                >
                  <ArrowDown className={cn("h-3.5 w-3.5", horizontal && "md:hidden")} />
                  {horizontal ? <ArrowRight className="hidden h-3.5 w-3.5 md:block" /> : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {caption ? (
        <figcaption className="mt-4 font-mono text-xs leading-relaxed text-fg-faint">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v12M4 10l4 4 4-4" />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h12M10 4l4 4-4 4" />
    </svg>
  );
}
