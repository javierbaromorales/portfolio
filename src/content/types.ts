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
  id: string
  role: string
  company: string
  location: string
  start: string
  end: string
  current?: boolean
  description: string
  featured: boolean
  internship?: boolean
  tech?: string[]
}

export type Principle = {
  index: string
  title: string
  body: string
}

export type SkillNode = {
  id: string
  label: string
  related: string[]
}

export type SkillCluster = {
  id: string
  label: string
  nodes: SkillNode[]
}
