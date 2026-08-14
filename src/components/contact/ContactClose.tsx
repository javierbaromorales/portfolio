import { copy } from "@/content/copy"
import { siteConfig } from "@/config/site"
import { Reveal } from "@/motion/Reveal"
import { MagneticButton } from "@/components/ui/MagneticButton"

export function ContactClose() {
  const href = siteConfig.email
    ? `mailto:${siteConfig.email}`
    : (siteConfig.links.linkedin ?? "#")

  return (
    <section id="contact" className="scroll-mt-24 bg-ink text-paper">
      <div className="site-shell py-[clamp(5rem,14vw,9rem)]">
        <Reveal>
          <h2 className="max-w-5xl font-display text-[clamp(2.2rem,6vw,5.4rem)] leading-[0.92] font-medium tracking-[-0.04em] text-paper">
            {copy.contact.headline}
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-paper/60">
            {copy.contact.supporting}
          </p>
          <div className="mt-10">
            <MagneticButton href={href} invert>
              {copy.contact.cta}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
