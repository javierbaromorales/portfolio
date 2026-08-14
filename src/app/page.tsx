import { FigmaPage } from "@/components/figma/FigmaPage"
import { SiteHeader } from "@/components/navigation/SiteHeader"

export default function Home() {
  return (
    <main id="main">
      <SiteHeader className="md:hidden" />
      <FigmaPage />
    </main>
  )
}
