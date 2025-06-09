/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@bugninja/shared-ui'],
}

module.exports = nextConfig 