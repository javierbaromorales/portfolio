import { notFound } from "next/navigation"

export function generateStaticParams() {
  return []
}

export const dynamicParams = false

export default function WorkPage() {
  notFound()
}
