import { copy } from "@/content/copy"
import { Reveal } from "@/motion/Reveal"

export function IntroStatement() {
  return (
    <section className="site-shell py-[clamp(4.5rem,12vw,8rem)]">
      <Reveal>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-mute uppercase">
              {copy.intro.leftEyebrow}
            </p>
            <ul className="mt-6 flex flex-col gap-1">
              {copy.intro.roles.map((role) => (
                <li
                  key={role}
                  className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-medium tracking-[-0.03em] text-ink"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-mute uppercase">
              {copy.intro.rightEyebrow}
            </p>
            <div className="mt-6 flex flex-col gap-5">
              <p className="font-display text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.4] tracking-[-0.02em] text-ink">
                {copy.intro.statement}
              </p>
              {copy.intro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-prose text-[0.98rem] leading-[1.7] text-mute"
                >
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
