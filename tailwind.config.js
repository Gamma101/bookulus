/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "lora": ["Lora-Regular", "sans-serif"],
        "lora-bold": ["Lora-Bold", "sans-serif"],
        "lora-semibold": ["Lora-SemiBold", "sans-serif"],
        "lora-medium": ["Lora-Medium", "sans-serif"],
        "manrope": ["Manrope-Regular", "sans-serif"],
        "manrope-bold": ["manrope-Bold", "sans-serif"],
        "manrope-semibold": ["Manrope-SemiBold", "sans-serif"],
        "manrope-medium": ["Manrope-Medium", "sans-serif"]
      },
      colors: {
        primary: "#007e7e",
        secondary: "#CDC3A3",
        danger: "#893e3e",
        background: "#034548",
        dark: "#02373a"
      }
    },
  },
  plugins: [],
}