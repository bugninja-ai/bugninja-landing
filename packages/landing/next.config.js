/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@bugninja/shared-ui'],
  images: {
    domains: [
      'localhost',
      'cms', // for internal Docker use
      'bugninja-product-cms-1'
    ],
  },

}

module.exports = nextConfig 