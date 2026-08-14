import type { Project } from "@/content/types"

export const projects: Project[] = []

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
