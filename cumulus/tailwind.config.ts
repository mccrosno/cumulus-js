import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        midnight: {
          50: "#F4F2F9",
          100: "#E7E3F2",
          200: "#D6D0EA",
          300: "#CAC1E3",
          400: "#C2B8DF",
          500: "#B2A5D7",
          600: "#A293CF",
          700: "#9281C7",
          800: "#8775C1",
          900: "#715CB2",
          950: "#57419B",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
