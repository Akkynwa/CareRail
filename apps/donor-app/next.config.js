/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this to tell Next.js to compile your shared packages
  transpilePackages: ["@carerail/ui", "@carerail/auth"],
};

export default nextConfig;