import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduce memory usage during build
  experimental: {
    webpackMemoryOptimizations: true,
  },
  // Disable source maps in production to save memory
  productionBrowserSourceMaps: false,
};

export default nextConfig;
