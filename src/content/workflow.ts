export type WorkflowStep = {
  id: string
  index: string
  title: string
  body: string
}

export const workflow: WorkflowStep[] = [
  {
    id: "scope",
    index: "01",
    title: "Scope the problem",
    body: "Challenge work starts with the constraint: the broken flow, the missing states, the interface that already failed.",
  },
  {
    id: "specify",
    index: "02",
    title: "Specify the interface",
    body: "Empty, error, and success paths first. Layout and type are decided before a component is named.",
  },
  {
    id: "build",
    index: "03",
    title: "Build the system",
    body: "Angular is the primary stack. React and Next.js when the product is built that way. Components are the contract.",
  },
  {
    id: "ship",
    index: "04",
    title: "Ship it readable",
    body: "Accessible, performant, and typed — left so the next engineer can follow the intent.",
  },
]
