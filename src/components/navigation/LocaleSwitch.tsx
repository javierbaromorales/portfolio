"use client"

import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"

export function LocaleSwitch({
  className,
  label,
  linkClassName,
}: {
  className?: string
  label: string
  linkClassName?: string
}) {
  const locale = useLocale()

  return (
    <div
      className={cn("inline-flex items-center", className)}
      aria-label={label}
    >
      <a
        href="/"
        hrefLang="en"
        className={cn(
          "inline-flex items-center justify-center leading-none",
          locale === "en" && "underline decoration-solid underline-offset-[0.2em]",
          linkClassName,
        )}
      >
        En
      </a>
      <a
        href="/es"
        hrefLang="es"
        className={cn(
          "inline-flex items-center justify-center leading-none",
          locale === "es" && "underline decoration-solid underline-offset-[0.2em]",
          linkClassName,
        )}
      >
        Es
      </a>
    </div>
  )
}
