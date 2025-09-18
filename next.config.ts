import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export' as const,
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.BASE_PATH || '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.BASE_PATH || '' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
