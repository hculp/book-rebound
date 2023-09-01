/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        
      },
      colors: {
        forestback: {
          50: '#A2AC94',
          100: '#CBCCBC'
        },
        forestfront: {
          50: '#52632b',
          100: '#3E4437'
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

