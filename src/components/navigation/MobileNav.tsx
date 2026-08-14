'use client'

import { useState } from "react"
import { useTranslations } from "next-intl"
import { siteConfig } from "@/config/site"
import { HashLink } from "@/components/navigation/HashLink"
import { LocaleSwitch } from "@/components/navigation/LocaleSwitch"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            className="h-11 rounded-none px-2 font-mono text-[11px] leading-none tracking-[0.18em] text-ink uppercase md:hidden"
          />
        }
      >
        {t("a11y.menu")}
      </SheetTrigger>
      <SheetContent
        side="right"
        closeLabel={t("a11y.close")}
        className="w-full overscroll-contain gap-0 border-paper/15 bg-ink p-0 text-paper pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] data-[side=right]:sm:max-w-none"
      >
        <SheetHeader className="border-b border-paper/15 px-6 py-5">
          <SheetTitle className="font-mono text-[11px] tracking-[0.2em] text-paper uppercase">
            {siteConfig.shortName}
          </SheetTitle>
          <SheetDescription className="font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase">
            {t("role")}
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-1 flex-col justify-center gap-8 px-6">
          {siteConfig.nav.map((item) => (
            <HashLink
              key={item.id}
              href={item.href}
              onNavigate={() => setOpen(false)}
              className="flex min-h-11 items-center font-display text-4xl tracking-[-0.03em] text-paper"
            >
              {t(`nav.${item.id}`)}
            </HashLink>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-paper/15 px-6 py-5">
          <p className="font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase">
            {siteConfig.location}
          </p>
          <LocaleSwitch
            label={t("a11y.locale")}
            className="font-mono text-[11px] tracking-[0.16em] text-paper uppercase"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
