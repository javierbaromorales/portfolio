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
        "relative aspect-[16/10] overflow-hidden border border-rule bg-ink",
        className,
      )}
    >
      <div className="draw-grid absolute inset-0 opacity-70" />
      {isWorkflow ? (
        <svg viewBox="0 0 640 400" className="absolute inset-0 size-full" aria-hidden>
          <rect x="48" y="56" width="220" height="280" fill="none" stroke="#6BA8C4" strokeWidth="1" />
          <rect x="200" y="88" width="220" height="240" fill="rgba(107,168,196,0.08)" stroke="#6BA8C4" strokeWidth="1" />
          <rect x="352" y="128" width="220" height="200" fill="none" stroke="#2A2C31" strokeWidth="1" />
          <line x1="48" y1="96" x2="268" y2="96" stroke="#6BA8C4" strokeWidth="1" />
          <line x1="200" y1="128" x2="420" y2="128" stroke="#6BA8C4" strokeWidth="1" />
          <line x1="352" y1="168" x2="572" y2="168" stroke="#2A2C31" strokeWidth="1" />
          <circle cx="68" cy="76" r="3" fill="#6BA8C4" />
          <circle cx="220" cy="108" r="3" fill="#6BA8C4" />
        </svg>
      ) : (
        <svg viewBox="0 0 640 400" className="absolute inset-0 size-full" aria-hidden>
          <rect x="80" y="70" width="480" height="260" fill="none" stroke="#2A2C31" strokeWidth="1" />
          <rect x="120" y="110" width="160" height="180" fill="rgba(107,168,196,0.1)" stroke="#6BA8C4" strokeWidth="1" />
          <rect x="300" y="110" width="220" height="80" fill="none" stroke="#6BA8C4" strokeWidth="1" />
          <rect x="300" y="210" width="220" height="80" fill="none" stroke="#8C8880" strokeWidth="1" />
          <path d="M280 200 H300" stroke="#6BA8C4" strokeWidth="1" />
          <path d="M280 250 H300" stroke="#8C8880" strokeWidth="1" />
        </svg>
      )}
      <p className="absolute right-4 bottom-4 font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
        Representation
      </p>
    </div>
  )
}
