/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm': '450px',
    

      'md': '553px',
    

      'lg': '1440px',
       
    },
    extend: {},
  },
  plugins: [],
}
