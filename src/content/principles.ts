import type { Principle } from "@/content/types"

export const principles: Principle[] = [
  {
    index: "01",
    title: "Interface first",
    body: "Start from what the person sees and does. Layout, type, and state before the rest of the stack.",
  },
  {
    index: "02",
    title: "Components as the contract",
    body: "Reuse is a system, not a folder of similar files. Tokens, variants, and clear ownership.",
  },
  {
    index: "03",
    title: "Ship it honest",
    body: "Accessible, fast enough, and typed. Performance and a11y are part of the build, not a later pass.",
  },
  {
    index: "04",
    title: "Leave it readable",
    body: "The next engineer should see the intent. Structure over cleverness.",
  },
]
