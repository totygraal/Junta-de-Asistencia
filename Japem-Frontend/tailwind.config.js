/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2ecc71',   // Verde
        secondary: '#c9a227', // Dorado
        accent: '#e74c3c',    // Rojo
        neutral: '#f5f5f5',   // Gris claro
        dark: '#1a1a1a',      // Negro profundo
      },
    },
  },
  plugins: [],
}
