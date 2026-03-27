import type { Config } from "tailwindcss";
// Import the base config from your UI package if you want to share theme settings
// import sharedConfig from "../../packages/ui/tailwind.config"; 

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Scans Landing app pages
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}", // Scans Shared UI components
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0052FF", // Match your buildathon color here too
      },
    },
  },
  plugins: [],
};
export default config;