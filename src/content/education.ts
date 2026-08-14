export type Education = {
  id: "ulatina" | "ipi"
  start: string
  end: string
  school: string
}

export const education: Education[] = [
  {
    id: "ulatina",
    start: "2016",
    end: "2019",
    school: "Universidad Latina de Panamá",
  },
  {
    id: "ipi",
    start: "2009",
    end: "2011",
    school: "Instituto Politécnico",
  },
]
