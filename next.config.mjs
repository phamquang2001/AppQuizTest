/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    esmExternals: true
  },
  env: {
    URL_BASE: process.env.URL_BASE,
  },
};

export default nextConfig;
