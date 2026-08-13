import type { SkillCluster } from "@/content/types"

export const skillClusters: SkillCluster[] = [
  {
    id: "interface",
    label: "Interface",
    nodes: [
      { id: "angular", label: "Angular", related: ["typescript", "javascript", "html", "css", "components"] },
      { id: "react", label: "React", related: ["nextjs", "typescript", "javascript", "components"] },
      { id: "nextjs", label: "Next.js", related: ["react", "typescript", "vercel"] },
      { id: "typescript", label: "TypeScript", related: ["javascript", "react", "angular", "nextjs"] },
      { id: "javascript", label: "JavaScript", related: ["typescript", "html", "css"] },
      { id: "html", label: "HTML", related: ["css", "javascript", "responsive"] },
      { id: "css", label: "CSS", related: ["html", "tailwind", "responsive"] },
      { id: "tailwind", label: "Tailwind", related: ["css", "nextjs", "react"] },
    ],
  },
  {
    id: "application",
    label: "Application",
    nodes: [
      { id: "java", label: "Java", related: ["spring", "rest"] },
      { id: "spring", label: "Spring Boot", related: ["java", "rest"] },
      { id: "laravel", label: "Laravel", related: ["rest", "symfony"] },
      { id: "symfony", label: "Symfony", related: ["laravel", "rest"] },
      { id: "rest", label: "REST APIs", related: ["java", "spring", "laravel", "symfony"] },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    nodes: [
      { id: "architecture", label: "Architecture", related: ["components", "monorepos", "clean"] },
      { id: "components", label: "Component systems", related: ["architecture", "angular", "react"] },
      { id: "monorepos", label: "Monorepos", related: ["architecture", "git"] },
      { id: "clean", label: "Clean code", related: ["architecture", "maintain"] },
      { id: "performance", label: "Performance", related: ["responsive", "nextjs"] },
      { id: "responsive", label: "Responsive design", related: ["css", "html", "performance"] },
      { id: "maintain", label: "Maintainability", related: ["clean", "architecture"] },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    nodes: [
      { id: "git", label: "Git", related: ["github", "monorepos"] },
      { id: "figma", label: "Figma", related: ["components", "css"] },
      { id: "vercel", label: "Vercel", related: ["nextjs", "github"] },
      { id: "github", label: "GitHub", related: ["git", "vercel"] },
    ],
  },
]
