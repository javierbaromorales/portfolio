'use client'

import { ViewTransition } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import type { Project } from "@/content/types"
import { copy } from "@/content/copy"
import { ProjectVisual } from "@/components/projects/ProjectVisual"
import { SectionHeading } from "@/components/ui/SectionHeading"

gsap.registerPlugin(useGSAP, ScrollTrigger)

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".project-visual",
          { scale: 0.85 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          },
        )
        gsap.fromTo(
          ".project-title",
          { y: 36 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              end: "center center",
              scrub: true,
            },
          },
        )
        gsap.fromTo(
          ".project-meta",
          { y: -16 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              end: "center center",
              scrub: true,
            },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <article
      ref={root}
      className={index === 0 ? "border-t border-rule" : "border-t border-rule"}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        className="site-shell grid gap-8 py-[clamp(3.5rem,10vw,7rem)] lg:grid-cols-12 lg:items-end"
      >
        <div className="lg:col-span-7">
          <ViewTransition name={`work-${project.slug}`} default="none">
            <div className="project-visual origin-center will-change-transform">
              <ProjectVisual slug={project.slug} />
            </div>
          </ViewTransition>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5">
          <p className="project-meta font-mono text-[11px] tracking-[0.2em] text-ink uppercase">
            {project.kicker}
          </p>
          <h3 className="project-title font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink">
            {project.title}
          </h3>
          <p className="max-w-md text-[0.95rem] leading-relaxed text-mute">
            {project.summary}
          </p>
          <p className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase">
            {project.role}
            <span className="mx-2 text-rule">/</span>
            {project.stack.slice(0, 3).join(" · ")}
          </p>
        </div>
      </Link>
    </article>
  )
}

export function ProjectShowcase({
  projects,
  heading = false,
  id,
}: {
  projects: Project[]
  heading?: boolean
  id?: string
}) {
  return (
    <section id={id} className={id ? "scroll-mt-24" : undefined}>
      {heading ? (
        <div className="site-shell pb-8">
          <SectionHeading eyebrow={copy.work.eyebrow} />
          <p className="mt-4 max-w-md text-sm text-mute">{copy.work.note}</p>
        </div>
      ) : null}
      {projects.map((project, index) => (
        <ProjectPanel key={project.slug} project={project} index={index} />
      ))}
    </section>
  )
}
