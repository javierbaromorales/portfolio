export type WorkflowStep = {
  id: "scope" | "specify" | "build" | "ship"
  index: string
}

export const workflow: WorkflowStep[] = [
  { id: "scope", index: "01" },
  { id: "specify", index: "02" },
  { id: "build", index: "03" },
  { id: "ship", index: "04" },
]
