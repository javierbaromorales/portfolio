import Link from "next/link"

export default function NotFound() {
  return (
    <main id="main" className="site-shell flex min-h-svh flex-col justify-center py-16">
      <p className="font-[family-name:var(--font-rubik)] text-[14px] tracking-[1.82px] text-black uppercase">
        404
      </p>
      <Link
        href="/"
        className="mt-8 w-fit font-[family-name:var(--font-rubik)] text-[18px] text-black underline"
      >
        Back
      </Link>
    </main>
  )
}
