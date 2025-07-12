/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
    theme: {
    extend: {
      colors:{
        customBlue1: '#03172C',
        customBlue2: '#05284B',
        customBlue3: '#134679',
        customBlue4: '#0C65BE',
        customBlue5: '#4587C9',
        customBlue6: '#1677ff',
        customBlueGreen: '#00FFF6',
        customMustard: '#EDC53A',
        customGray1: '#626262',
        customGray2: '#909090',
      }
    },
  },
  plugins: [],

}

