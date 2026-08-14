export type ImageKind = "photograph" | "representation"

export type ProjectLink = {
  label: string
  href: string
}

export type CaseStudySection = {
  id: string
  title: string
  body: string
}

export type Project = {
  slug: string
  title: string
  kicker: string
  summary: string
  role: string
  stack: string[]
  year?: string
  featured: boolean
  confidential: boolean
  imageKind: ImageKind
  image?: string
  links?: ProjectLink[]
  sections: CaseStudySection[]
}

export type Experience = {
  id: "freelance" | "getecsa" | "rootstack" | "crimsonlogic"
  company: string
  start: string
  end: string
  current?: boolean
  featured: boolean
  internship?: boolean
  tech?: string[]
}

export type Principle = {
  id: "interface" | "components" | "ship" | "readable"
  index: string
}

export type SkillNode = {
  id: string
  label: string
  related: string[]
  labelKey?: "accessibility" | "performance"
}

export type SkillCluster = {
  id: "language" | "ui" | "markup" | "quality"
  nodes: SkillNode[]
}

export const layerIds = [
  "interface",
  "components",
  "application",
  "data",
  "delivery",
] as const
