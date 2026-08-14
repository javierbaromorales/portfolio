import { useTranslations } from "next-intl"
import { Reveal } from "@/motion/Reveal"
import { SectionHeading } from "@/components/ui/SectionHeading"

export function AboutBlock() {
  const t = useTranslations("education")

  return (
    <section id="about" className="site-shell scroll-mt-24 border-t border-rule py-[clamp(4.5rem,12vw,8rem)]">
      <Reveal>
        <div className="site-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <SectionHeading eyebrow={t("eyebrow")} />
            <div className="mt-10 flex flex-col gap-6">
              <p className="max-w-2xl text-[1.05rem] leading-[1.7] text-ink">
                {t("paragraph")}
              </p>
            </div>
            <p className="mt-12 font-mono text-[11px] tracking-[0.14em] text-mute uppercase">
              {t("line")}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
