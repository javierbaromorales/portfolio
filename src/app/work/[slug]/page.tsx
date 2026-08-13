import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ViewTransition } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/navigation/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"
import { ProjectVisual } from "@/components/projects/ProjectVisual"
import { getFeaturedProjects, getProject, projects } from "@/content/projects"
import { projectJsonLd, serializeJsonLd } from "@/lib/schema"

type WorkPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Work" }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  }
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const jsonLd = projectJsonLd(project.slug)
  const others = getFeaturedProjects().filter((item) => item.slug !== project.slug)

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      ) : null}
      <SiteHeader />
      <main id="main" className="pt-24">
        <article className="site-shell py-[clamp(3rem,8vw,6rem)]">
          <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            {project.kicker}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-paper">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mute">
            {project.summary}
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-mute uppercase">
            {project.role}
            <span className="mx-2 text-rule">/</span>
            {project.stack.join(" · ")}
          </p>

          <ViewTransition name={`work-${project.slug}`} default="none">
            <div className="mt-12">
              <ProjectVisual slug={project.slug} />
            </div>
          </ViewTransition>

          <div className="mt-16 flex max-w-2xl flex-col gap-12">
            {project.sections.map((section) => (
              <section key={section.id}>
                <h2 className="font-display text-2xl tracking-[-0.02em] text-paper">
                  {section.title}
                </h2>
                <p className="mt-4 text-[0.98rem] leading-[1.75] text-mute">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {project.confidential ? (
            <p className="mt-16 max-w-xl font-mono text-[11px] tracking-[0.14em] text-mute uppercase">
              Outcome omitted. No public metrics.
            </p>
          ) : null}

          <p className="mt-16">
            <Link
              href="/#work"
              className="font-mono text-[11px] tracking-[0.2em] text-paper uppercase border-b border-accent pb-1"
            >
              Back to selected work
            </Link>
          </p>
        </article>

        {others.length > 0 ? (
          <aside className="site-shell border-t border-rule py-12">
            <p className="font-mono text-[11px] tracking-[0.2em] text-mute uppercase">
              Also
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/work/${item.slug}`}
                    className="font-display text-2xl tracking-[-0.03em] text-paper"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </main>
      <SiteFooter />
    </>
  )
}
