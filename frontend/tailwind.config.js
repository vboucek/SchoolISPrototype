module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      'phone': '300px',
      // => @media (min-width: 640px) { ... }

      'tablet': '600px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1201px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1400px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
