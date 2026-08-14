import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function BrandMark({
  className,
  alt = siteConfig.name,
}: {
  className?: string
  alt?: string
}) {
  return (
    <img
      src="/figma/logo-name.svg"
      alt={alt}
      width={79}
      height={26}
      className={cn("block h-[26px] w-[79px] max-w-none", className)}
    />
  )
}
