/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@jpc/configurator', '@jpc/types'],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'jpctrailers.co.uk'],
    },
  },
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
