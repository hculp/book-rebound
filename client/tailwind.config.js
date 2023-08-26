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
      colors: {
        forestback: {
          50: '#A2AC94',
          100: '#CBCCBC'
        },
        forestfront: {
          50: '#404C24',
          100: '#3E4437'
        },
        leafy: {
          50: '#B2FFA9',
          100: '#91FF85'
        },
        wooded: {
          50: '#81523F',
          51: '#523428',
          100: '#3F2A2B'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

