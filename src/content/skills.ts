import type { SkillCluster } from "@/content/types"

export const skillClusters: SkillCluster[] = [
  {
    id: "language",
    nodes: [
      { id: "ts", label: "TypeScript", related: ["js"] },
      { id: "js", label: "JavaScript", related: ["ts"] },
    ],
  },
  {
    id: "ui",
    nodes: [
      { id: "angular", label: "Angular", related: ["ts"] },
      { id: "react", label: "React", related: ["next"] },
      { id: "next", label: "Next.js", related: ["react"] },
    ],
  },
  {
    id: "markup",
    nodes: [
      { id: "html", label: "HTML", related: ["css"] },
      { id: "css", label: "CSS", related: ["html"] },
    ],
  },
  {
    id: "quality",
    nodes: [
      { id: "a11y", label: "Accessibility", related: ["perf"], labelKey: "accessibility" },
      { id: "perf", label: "Performance", related: ["a11y"], labelKey: "performance" },
    ],
  },
]
