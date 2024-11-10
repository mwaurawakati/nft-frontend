/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nftstorage.link', 'rize2day.b-cdn.net', 'nftstorage.b-cdn.net', 'stakecoreum.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;