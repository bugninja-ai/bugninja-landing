/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@bugninja/shared-ui'],
  images: {
    domains: [
      'localhost',
      'cms', // for internal Docker use
      'bugninja-product-cms-1',
      'cms.bugninja.ai',
      'bugninja.ai'
    ],
  },

}

module.exports = nextConfig 