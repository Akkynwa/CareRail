import type { NextAuthOptions } from "next";

const nextConfig = {
  // This is the CRITICAL line for monorepos
  transpilePackages: ["@carerail/ui", "@carerail/auth"],
  
  // Disable Turbopack if you're still hitting BMI2 errors
  experimental: {
    turbo: {
      enabled: false,
    },
  },
};

export default nextConfig;