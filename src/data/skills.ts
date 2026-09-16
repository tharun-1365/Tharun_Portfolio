import type { SkillGroup } from "@/lib/types";

/**
 * Skill groups. `evidence` names where each group shows up in the projects
 * and internships on this site, so every tag is traceable.
 */
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Java", "C#", "Python", "JavaScript"],
    evidence: "C# in UnityQA · Python in the Cloud Optimizer and password analyser · Java at Intellect Design Arena · JavaScript/TypeScript in Attendify and the analyser frontend",
  },
  {
    category: "Development",
    items: ["Unity", "OOP", "Git", "GitHub", "QA Testing", "Automation"],
    evidence: "Unity 6 framework with EditMode/PlayMode suites · automation testing and XPath at Intellect Design Arena · all projects versioned on GitHub",
  },
  {
    category: "AI & Automation",
    items: ["Prompt Engineering", "AI-assisted Software Development", "RPA"],
    evidence: "Prompt Engineer Intern at Innovate IT · RPA and Python automation at Trusty Bytes",
  },
];
