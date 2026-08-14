import { cn } from "@/lib/utils"

export function DiagramFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-ink bg-paper",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function WorkflowDrawing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 400"
      className={cn("size-full text-ink", className)}
      aria-hidden
    >
      <rect x="40" y="48" width="240" height="304" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="196" y="88" width="240" height="248" fill="var(--paper)" stroke="currentColor" strokeWidth="1" />
      <rect x="352" y="136" width="240" height="200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="40" y1="88" x2="280" y2="88" stroke="currentColor" strokeWidth="1" />
      <line x1="196" y1="128" x2="436" y2="128" stroke="currentColor" strokeWidth="1" />
      <line x1="352" y1="176" x2="592" y2="176" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <rect x="56" y="112" width="88" height="8" fill="currentColor" opacity="0.18" />
      <rect x="56" y="132" width="140" height="8" fill="currentColor" opacity="0.12" />
      <rect x="212" y="152" width="120" height="8" fill="currentColor" opacity="0.18" />
      <rect x="212" y="172" width="88" height="8" fill="currentColor" opacity="0.12" />
    </svg>
  )
}

export function HairlineOrbit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("size-full text-ink", className)}
      aria-hidden
    >
      <path
        d="M200 36c92 0 164 72 164 164S292 364 200 364 36 292 36 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M200 96c58 0 104 46 104 104S258 304 200 304 96 258 96 200c0-36 18-68 46-88"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}
