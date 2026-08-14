import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.30.64.20"],
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
