/**
 * Shared content types. All site content lives in `src/data/*` and is typed
 * here so that adding a project, role or skill group never touches JSX.
 */

export type ProjectType = "open-source" | "internship" | "academic";

export type ProjectStatus =
  | "active" // still being developed
  | "completed"
  | "prototype" // working proof of concept, limited scope
  | "draft"; // placeholder: not rendered until details are confirmed

/** One box in an ArchitectureDiagram. */
export interface ArchitectureNode {
  /** Short label, e.g. "Recording". */
  label: string;
  /** One-line technical note under the label, e.g. "QAInputRecorder". */
  detail?: string;
  /** Optional list of concrete artifacts/components (rendered in mono). */
  items?: string[];
}

export interface ArchitectureDiagramData {
  /** Nodes are rendered as a flow in array order. */
  nodes: ArchitectureNode[];
  /**
   * "auto" lays the flow out horizontally on wide screens when it fits and
   * vertically otherwise. Force one with "horizontal" / "vertical".
   */
  direction?: "auto" | "horizontal" | "vertical";
  /** Small caption rendered below the diagram. */
  caption?: string;
}

export interface TechGroup {
  category: string;
  items: string[];
}

export interface Project {
  /** URL slug: /projects/[slug] */
  slug: string;
  /** Display number, e.g. "01". Assigned automatically by position; leave unset in data. */
  number?: string;
  title: string;
  /** One sentence shown in the project list. */
  tagline: string;
  /** Short technology labels shown next to the title (3–5 max). */
  technologies: string[];
  type: ProjectType;
  status: ProjectStatus;
  /** Year (or range) of the work. Omit when not confirmed. */
  year?: string;
  /** Company or institution the work was done for (internship projects). */
  organization?: string;
  /** Larger presentation in the project list. Use once. */
  featured?: boolean;
  /** Short flow (≤ 6 steps) shown inline on the featured card. */
  summaryFlow?: string[];
  /** A few verified facts shown on the featured card, e.g. "217 tests". */
  highlights?: { label: string; value: string }[];
  github?: string;
  demo?: string;
  /** Short note about source availability, e.g. for internship work. */
  sourceNote?: string;
  /** Label of the primary call-to-action on the project card. */
  ctaLabel?: string;

  /** Case study content. Keep paragraphs short. */
  caseStudy: {
    overview: string[];
    problem: string[];
    approach: string[];
    features: string[];
    architecture: {
      diagram: ArchitectureDiagramData;
      notes: string[];
    };
    /** Optional dedicated Testing tab (used by the QA project). */
    testing?: string[];
    implementation?: string[];
    stack: TechGroup[];
  };
}

export interface ExperienceRole {
  company: string;
  location?: string;
  role: string;
  duration: string;
  status?: "completed";
  /** Verified responsibilities only. */
  points: string[];
  /** Optional link to a related case study on this site. */
  related?: { label: string; href: string };
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationEntry {
  institution: string;
  location: string;
  degree: string;
  period: string;
  details?: string[];
}
