import type { Project } from "@/content/types"

export const projects: Project[] = [
  {
    slug: "enterprise-workflow",
    title: "Enterprise workflow interface",
    kicker: "Client · confidential",
    summary:
      "Frontend architecture for a complex internal product. The interface had to stay clear while the process behind it was not. Client work, not public.",
    role: "Frontend architecture",
    stack: ["TypeScript", "Angular", "component systems", "REST APIs"],
    featured: true,
    confidential: true,
    imageKind: "representation",
    sections: [
      {
        id: "context",
        title: "Context",
        body: "An internal workflow product used daily by people who already knew the process — and still got lost in the software. The job was to make the interface hold a complicated operation without pretending it was simple.",
      },
      {
        id: "role",
        title: "Role",
        body: "Frontend architecture: how screens, components, and API contracts shared one model of the work. Not a visual refresh on top of an unchanged system.",
      },
      {
        id: "constraints",
        title: "Constraints",
        body: "The product is not public. Specific flows, metrics, and screenshots stay with the client. What can be said is the shape of the problem and how the frontend was structured to meet it.",
      },
      {
        id: "approach",
        title: "Approach",
        body: "Start from the task, not the page. Name the objects the user actually moves. Build a component system around those objects so new steps do not mean new one-off screens.",
      },
      {
        id: "architecture",
        title: "Architecture",
        body: "A layered frontend: presentation, domain components, application services, API boundary. Each layer had a job. The UI did not reach through to data shapes it should not know.",
      },
      {
        id: "stack",
        title: "Stack",
        body: "TypeScript, Angular, a documented component system, REST APIs. The stack served the architecture — it was not the architecture.",
      },
    ],
  },
  {
    slug: "independent-product",
    title: "Independent product work",
    kicker: "Independent · 2022–present",
    summary:
      "Selected independent engagements: interfaces and the application layer they depend on. High-level until a writeup can be public.",
    role: "Software engineer",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
    year: "2022–present",
    featured: true,
    confidential: true,
    imageKind: "representation",
    sections: [
      {
        id: "context",
        title: "Context",
        body: "Independent work since 2022: shipping software for products that needed a frontend that could grow, not a page that only had to launch.",
      },
      {
        id: "role",
        title: "Role",
        body: "End-to-end on the web stack when needed, with the center of gravity on the interface, the component system, and how those talk to the API.",
      },
      {
        id: "approach",
        title: "Approach",
        body: "Prefer a small set of honest surfaces over a catalogue of screens. Keep types, routes, and UI in one line of thought so a change in the data does not silently break the page.",
      },
      {
        id: "architecture",
        title: "Architecture",
        body: "Application code structured so the UI is a client of a clear boundary — not a pile of fetch calls living in components.",
      },
      {
        id: "stack",
        title: "Stack",
        body: "React, Next.js, TypeScript, Tailwind. JavaScript and CSS where the work demanded it. The public details of each engagement stay limited until they can be named.",
      },
    ],
  },
]

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
