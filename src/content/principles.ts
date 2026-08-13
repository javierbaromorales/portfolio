import type { Principle } from "@/content/types"

export const principles: Principle[] = [
  {
    index: "01",
    title: "Clarity",
    body: "If the next action is not obvious, the interface is not finished. Type, hierarchy, and empty space do the explaining before decoration does.",
  },
  {
    index: "02",
    title: "Systems",
    body: "Components are a language. They only work if they map to the product’s objects — not to a one-off layout for each screen.",
  },
  {
    index: "03",
    title: "Performance",
    body: "What the user waits on is part of the design. Load less, animate transform and opacity, keep the main thread for the work that needs it.",
  },
  {
    index: "04",
    title: "Maintainability",
    body: "A ship that cannot be changed is unfinished. Structure the stack so a later engineer can find the decision and reverse it.",
  },
]
