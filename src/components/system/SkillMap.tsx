'use client'

import { useMemo, useState } from "react"
import { skillClusters } from "@/content/skills"
import { copy } from "@/content/copy"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { cn } from "@/lib/utils"

export function SkillMap() {
  const [active, setActive] = useState<string | null>(null)

  const related = useMemo(() => {
    if (!active) return new Set<string>()
    const match = skillClusters
      .flatMap((cluster) => cluster.nodes)
      .find((node) => node.id === active)
    return new Set([active, ...(match?.related ?? [])])
  }, [active])

  return (
    <section id="system" className="site-shell scroll-mt-24 border-t border-rule py-[clamp(4.5rem,12vw,8rem)]">
      <SectionHeading eyebrow={copy.system.eyebrow}>
        {copy.system.statement}
      </SectionHeading>
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {skillClusters.map((cluster) => (
          <div key={cluster.id} className="border-t border-rule pt-5">
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
              {cluster.label}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {cluster.nodes.map((node) => {
                const dimmed = active !== null && !related.has(node.id)
                return (
                  <li key={node.id}>
                    <button
                      type="button"
                      onPointerEnter={() => setActive(node.id)}
                      onPointerLeave={() => setActive(null)}
                      onFocus={() => setActive(node.id)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        "font-display text-2xl tracking-[-0.03em] text-paper transition-opacity duration-500",
                        dimmed && "opacity-25",
                      )}
                    >
                      {node.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
