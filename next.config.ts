import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export' as const,
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
