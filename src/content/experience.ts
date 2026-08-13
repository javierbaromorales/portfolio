import type { Experience } from "@/content/types"

export const experience: Experience[] = [
  {
    id: "independent",
    role: "Independent Software Developer",
    company: "Independent",
    location: "United States",
    start: "Sep 2022",
    end: "Present",
    current: true,
    featured: true,
    description:
      "Product and interface work for clients and independent projects. Frontend architecture, component systems, and the APIs they sit on.",
  },
  {
    id: "getecsa",
    role: "Software Developer",
    company: "Getecsa",
    location: "Panama",
    start: "Dec 2020",
    end: "May 2022",
    featured: false,
    description:
      "Application software across the stack. Building and maintaining production systems with a web interface and supporting services.",
  },
  {
    id: "rootstack",
    role: "Software Developer",
    company: "Rootstack",
    location: "Panama",
    start: "Oct 2019",
    end: "Jun 2020",
    featured: false,
    description:
      "Client project delivery. Web interfaces and the application layer behind them, in a studio environment.",
  },
  {
    id: "crimsonlogic",
    role: "Software Developer Intern",
    company: "CrimsonLogic Panama",
    location: "Panama",
    start: "Mar 2018",
    end: "Oct 2018",
    featured: false,
    internship: true,
    description: "Internship. Early time in a production software team.",
  },
]
