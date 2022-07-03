/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
     },
     borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
