import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms-zenith.treasuredeal.com',
      },
    ],
  },
  env: {
    td_api: 'https://cms-zenith.treasuredeal.com',
  },
}

export default withNextIntl(nextConfig)
