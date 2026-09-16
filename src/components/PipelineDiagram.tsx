import { cn } from "@/lib/utils";

interface PipelineStep {
  label: string;
  detail: string;
}

/**
 * Compact pipeline: nodes on a single rail. Horizontal on wide screens,
 * vertical on narrow ones. Used on the featured project card.
 */
export function PipelineDiagram({ steps, className }: { steps: PipelineStep[]; className?: string }) {
  return (
    <ol
      aria-label="Pipeline"
      className={cn("reveal-stagger relative grid gap-5 lg:grid-cols-6 lg:gap-4", className)}
    >
      {/* Rails */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-border lg:hidden" />
      <span aria-hidden="true" className="absolute top-[5px] right-0 left-0 hidden h-px bg-border lg:block" />

      {steps.map((step, index) => (
        <li key={step.label} className="relative pl-6 lg:pt-5 lg:pl-0">
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-[11px] w-[11px] rounded-full border bg-bg-elevated",
              index === 0 || index === steps.length - 1 ? "border-accent" : "border-border-strong",
              "top-1 left-0 lg:top-0",
            )}
          >
            {index === 0 || index === steps.length - 1 ? (
              <span className="absolute inset-[3px] rounded-full bg-accent" />
            ) : null}
          </span>
          <p className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] text-fg-faint">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-sm font-medium text-fg">{step.label}</span>
          </p>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-fg-faint">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
