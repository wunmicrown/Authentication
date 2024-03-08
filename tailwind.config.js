/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      height:{
        "full-dvh-100px": "calc(100dvh - 100px)",
      }
    },
  },
  plugins: [],
}