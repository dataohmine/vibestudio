  /** @type {import('next').NextConfig} */
  const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath: '/vibestudio',
    assetPrefix: '/vibestudio',
    images: {
      unoptimized: true,
    },
    experimental: {
      esmExternals: false,
    },
  }

  module.exports = nextConfig
