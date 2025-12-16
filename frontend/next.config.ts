import type { NextConfig } from "next";

module.exports = {
  experimental: {
    optimizePackageImports: ["@tailwindcss/postcss"],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
