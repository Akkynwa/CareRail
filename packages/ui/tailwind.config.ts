import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../apps/**/*.{js,ts,jsx,tsx,mdx}", // This covers all your apps
    "./src/**/*.{js,ts,jsx,tsx,mdx}",      // This covers the UI package itself
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0052FF", // Your Buildathon brand color
      },
    },
  },
  plugins: [],
};
export default config;