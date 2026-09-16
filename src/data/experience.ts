import type { ExperienceRole } from "@/lib/types";

/**
 * Internships, most recent first. Only confirmed responsibilities are listed.
 */
export const experience: ExperienceRole[] = [
  {
    company: "Innovate IT",
    role: "Prompt Engineer Intern",
    duration: "2 months",
    status: "completed",
    tags: ["Prompt Engineering", "AI-assisted Development", "SDLC"],
    points: [
      "Collaborated with mentors to develop and refine AI prompts for software development and SDLC (Software Development Life Cycle) workflows.",
      "Designed prompts to improve the speed, efficiency, and quality of AI-assisted software development.",
    ],
  },
  {
    company: "Intellect Design Arena",
    location: "Navalur",
    role: "Technical Support Intern",
    duration: "1 month",
    tags: ["Java", "Automation Testing", "XPath", "Technical Documentation"],
    points: [
      "Troubleshot Java-based issues.",
      "Worked with automation testing and XPath.",
      "Assisted with demos and technical documentation.",
      "Developed Report Optimizer, a mini project for analysing reports and extracting useful data for faster decision-making.",
    ],
    related: { label: "Report Optimizer case study", href: "/projects/report-optimizer" },
  },
  {
    company: "Trusty Bytes",
    location: "Ekkatuthangal",
    role: "Unity Development / RPA Intern",
    duration: "1.5 months",
    tags: ["Unity", "C#", "RPA", "Python"],
    points: [
      "Learned Unity game development using C#: scene design, prefabs, animations, and gameplay workflows.",
      "Developed basic RPA (Robotic Process Automation) and Python solutions to automate business processes.",
    ],
  },
];
