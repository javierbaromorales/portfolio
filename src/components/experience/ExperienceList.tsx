import { experience } from "@/content/experience"
import { copy } from "@/content/copy"
import { Reveal } from "@/motion/Reveal"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { cn } from "@/lib/utils"

export function ExperienceList() {
  return (
    <section id="experience" className="site-shell scroll-mt-24 border-t border-rule py-[clamp(4.5rem,12vw,8rem)]">
      <Reveal>
        <SectionHeading eyebrow={copy.experience.eyebrow} />
        <ol className="mt-12 flex flex-col">
          {experience.map((item) => (
            <li
              key={item.id}
              className={cn(
                "grid gap-3 border-t border-rule py-8 md:grid-cols-[8rem_1fr] md:gap-8",
                item.featured && "py-12",
                item.internship && "py-5 opacity-70",
              )}
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase">
                {item.start}
                <span className="text-rule"> — </span>
                {item.end}
              </p>
              <div>
                <h3
                  className={cn(
                    "font-display tracking-[-0.02em] text-paper",
                    item.featured ? "text-3xl md:text-4xl" : "text-xl",
                    item.internship && "text-base",
                  )}
                >
                  {item.role}
                </h3>
                <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-mute uppercase">
                  {item.company}
                  <span className="mx-2 text-rule">/</span>
                  {item.location}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
