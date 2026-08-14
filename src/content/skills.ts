import type { SkillCluster } from "@/content/types"

export const skillClusters: SkillCluster[] = [
  {
    id: "language",
    label: "Language",
    nodes: [
      { id: "ts", label: "TypeScript", related: ["js"] },
      { id: "js", label: "JavaScript", related: ["ts"] },
    ],
  },
  {
    id: "ui",
    label: "UI",
    nodes: [
      { id: "angular", label: "Angular", related: ["ts"] },
      { id: "react", label: "React", related: ["next"] },
      { id: "next", label: "Next.js", related: ["react"] },
    ],
  },
  {
    id: "markup",
    label: "Markup",
    nodes: [
      { id: "html", label: "HTML", related: ["css"] },
      { id: "css", label: "CSS", related: ["html"] },
    ],
  },
  {
    id: "quality",
    label: "Quality",
    nodes: [
      { id: "a11y", label: "Accessibility", related: ["perf"] },
      { id: "perf", label: "Performance", related: ["a11y"] },
    ],
  },
]
