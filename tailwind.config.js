/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#3b82f6", // Blue
          secondary: "#8b5cf6", // Purple, complementary to blue
          accent: "#f59e0b", // Amber, for contrast
          neutral: "#6b7280", // Cool gray
          "base-100": "#1f2937", // Dark blue-gray
          info: "#38bdf8", // Light blue
          success: "#10b981", // Emerald
          warning: "#f59e0b", // Amber
          error: "#ef4444", // Red
        },
        light: {
          primary: "#3b82f6", // Blue
          secondary: "#8b5cf6", // Purple, complementary to blue
          accent: "#f59e0b", // Amber, for contrast
          neutral: "#9ca3af", // Lighter cool gray
          "base-100": "#f3f4f6", // Very light gray
          info: "#38bdf8", // Light blue
          success: "#10b981", // Emerald
          warning: "#f59e0b", // Amber
          error: "#ef4444", // Red
        },
        // You can add more themes here
      },
      "dark",
      "light",
    ],
  },
  plugins: [daisyui],
};
