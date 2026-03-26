/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true,
  },
  transpilePackages: ["@carerail/ui", "@carerail/db", "@carerail/auth", "@carerail/utils", "@carerail/qr"]
};

export default nextConfig;