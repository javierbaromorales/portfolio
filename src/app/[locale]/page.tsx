import { HomePage } from "@/components/home/HomePage"
import { SiteHeader } from "@/components/navigation/SiteHeader"

export default function Home() {
  return (
    <main id="main">
      <SiteHeader className="lg:hidden" />
      <HomePage />
    </main>
  )
}
