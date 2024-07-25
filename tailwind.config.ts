import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["PingARLT", "PT Sans", "sans-serif"],
        regular: "PingARLT",
      },
      colors: {
        primary: {
          DEFAULT: "#004956",
          d: "#004955",
          l: "#004D5A",
          darker: "#1e2f32",
        },
        light: {
          DEFAULT: "#BBF3E5",
          d: "#A8F0DE",
          l: "#CBF6EB",
        },
        secondary: {
          DEFAULT: "#76E8CD",
          d: "#73E7CC",
          l: "#96EDD9",
          "50": "#BAF3E6",
          "25": "#CFF7EE",
        },
        grayer: {
          50: "#fcfcfc",
          100: "#f8f8f8",
          200: "#eee",
          300: "#bbb",
        },
        darker: {
          50: "#999999",
          100: "#666666",
          200: "#444444",
          250: "#333333",
          300: "#222222",
          350: "#2C2C2C",
          400: "#272626",
        },
      },
      fontSize: {
        sm: ["0.875rem", "20px"],
        md: ["0.9rem", "20px"],
        base: ["1rem", "24px"],
        lg: ["1.2rem", "30px"],
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};
export default config;
