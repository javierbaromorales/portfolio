import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  children,
  className,
}: {
  eyebrow?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <header className={cn("flex flex-col gap-4", className)}>
      {eyebrow ? (
        <p className="font-mono text-[11px] tracking-[0.22em] text-mute uppercase">
          {eyebrow}
        </p>
      ) : null}
      {children ? (
        <h2 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink">
          {children}
        </h2>
      ) : null}
    </header>
  )
}
