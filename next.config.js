/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "downloads.ctfassets.net"
      }
    ],
  },
  i18n: {
    locales: ['en-US', 'ro-MD'],
    defaultLocale: 'en-US',
  },
  async redirects() {
    return [
      {
        source: '/divinityADN',
        destination: '/divinityDNA',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig
