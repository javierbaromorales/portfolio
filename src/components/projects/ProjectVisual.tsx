import { cn } from "@/lib/utils"

export function ProjectVisual({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const isWorkflow = slug === "enterprise-workflow"

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden border border-ink bg-paper",
        className,
      )}
    >
      {isWorkflow ? (
        <svg viewBox="0 0 640 400" className="absolute inset-0 size-full text-ink" aria-hidden>
          <rect x="36" y="48" width="280" height="300" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="180" y="88" width="260" height="252" fill="var(--paper)" stroke="currentColor" strokeWidth="1" />
          <rect x="340" y="140" width="260" height="200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <line x1="36" y1="88" x2="316" y2="88" stroke="currentColor" strokeWidth="1" />
          <line x1="180" y1="128" x2="440" y2="128" stroke="currentColor" strokeWidth="1" />
          <line x1="340" y1="180" x2="600" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <rect x="52" y="112" width="96" height="7" fill="currentColor" opacity="0.16" />
          <rect x="52" y="132" width="148" height="7" fill="currentColor" opacity="0.1" />
          <rect x="196" y="156" width="128" height="7" fill="currentColor" opacity="0.16" />
        </svg>
      ) : (
        <svg viewBox="0 0 640 400" className="absolute inset-0 size-full text-ink" aria-hidden>
          <rect x="48" y="56" width="360" height="220" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="220" y="120" width="360" height="220" fill="var(--paper)" stroke="currentColor" strokeWidth="1" />
          <rect x="160" y="88" width="200" height="140" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <rect x="248" y="148" width="140" height="72" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="408" y="148" width="140" height="72" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        </svg>
      )}
      <p className="absolute right-4 bottom-4 font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
        Representation
      </p>
    </div>
  )
}
