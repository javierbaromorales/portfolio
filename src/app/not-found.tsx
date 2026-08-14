import Link from "next/link"

export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-svh flex-col justify-center px-8 py-16">
          <p className="text-[14px] tracking-[1.82px] uppercase">404</p>
          <Link href="/" className="mt-8 w-fit text-[18px] underline">
            Back / Volver
          </Link>
        </main>
      </body>
    </html>
  )
}
