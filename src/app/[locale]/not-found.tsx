import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export default async function NotFound() {
  const t = await getTranslations("notFound")

  return (
    <main id="main" className="site-shell flex min-h-svh flex-col justify-center py-16">
      <p className="font-[family-name:var(--font-rubik)] text-[14px] tracking-[1.82px] text-black uppercase">
        404
      </p>
      <Link
        href="/"
        className="mt-8 w-fit font-[family-name:var(--font-rubik)] text-[18px] text-black underline"
      >
        {t("back")}
      </Link>
    </main>
  )
}
