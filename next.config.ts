import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    staticFolder: '/public', // Ensure access to public assets
  },
};

export default nextConfig;