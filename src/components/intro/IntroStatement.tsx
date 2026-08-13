import { copy } from "@/content/copy"
import { Reveal } from "@/motion/Reveal"
import { SectionHeading } from "@/components/ui/SectionHeading"

export function IntroStatement() {
  return (
    <section className="site-shell py-[clamp(4.5rem,12vw,8rem)]">
      <Reveal>
        <div className="site-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
            <SectionHeading>{copy.intro.statement}</SectionHeading>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {copy.intro.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-prose text-[0.98rem] leading-[1.7] text-mute">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
