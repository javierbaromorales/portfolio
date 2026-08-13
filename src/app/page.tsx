import dynamic from "next/dynamic"
import { SiteHeader } from "@/components/navigation/SiteHeader"
import { HeroScene } from "@/components/hero/HeroScene"
import { IntroStatement } from "@/components/intro/IntroStatement"
import { ProjectShowcase } from "@/components/projects/ProjectShowcase"
import { ExperienceList } from "@/components/experience/ExperienceList"
import { AboutBlock } from "@/components/about/AboutBlock"
import { ContactClose } from "@/components/contact/ContactClose"
import { SiteFooter } from "@/components/SiteFooter"
import { getFeaturedProjects } from "@/content/projects"
import { personJsonLd, serializeJsonLd } from "@/lib/schema"

const HowIBuild = dynamic(() =>
  import("@/components/approach/HowIBuild").then((mod) => mod.HowIBuild),
)

const SkillMap = dynamic(() =>
  import("@/components/system/SkillMap").then((mod) => mod.SkillMap),
)

export default function Home() {
  const featured = getFeaturedProjects()
  const first = featured[0] ? [featured[0]] : []
  const rest = featured.slice(1)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
      />
      <SiteHeader />
      <main id="main">
        <HeroScene />
        <IntroStatement />
        <ProjectShowcase projects={first} heading id="work" />
        <HowIBuild />
        <ProjectShowcase projects={rest} />
        <ExperienceList />
        <SkillMap />
        <AboutBlock />
        <ContactClose />
      </main>
      <SiteFooter />
    </>
  )
}
