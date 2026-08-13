import Link from "next/link"
import { SiteHeader } from "@/components/navigation/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="site-shell flex min-h-svh flex-col justify-center pt-24">
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">404</p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] tracking-[-0.04em] text-paper">
          This route is not on the drawing.
        </h1>
        <Link
          href="/"
          className="mt-8 w-fit font-mono text-[11px] tracking-[0.2em] text-paper uppercase border-b border-accent pb-1"
        >
          Back to the site
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
