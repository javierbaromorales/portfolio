export type Education = {
  id: string
  start: string
  end: string
  school: string
  detail: string
}

export const education: Education[] = [
  {
    id: "ulatina",
    start: "2016",
    end: "2019",
    school: "Universidad Latina de Panamá",
    detail: "Ingeniería en Sistemas Informáticos",
  },
  {
    id: "ipi",
    start: "2009",
    end: "2011",
    school: "Instituto Politécnico",
    detail: "Informática",
  },
]
