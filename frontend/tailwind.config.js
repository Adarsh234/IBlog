/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Defining your signature brand colors
        brand: {
          indigo: "#4f46e5", // indigo-600
          light: "#f8fafc",  // slate-50
          dark: "#0f172a",   // slate-900
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      // Adding a professional typography scale for your blog content
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            h1: { color: theme('colors.slate.900'), fontWeight: '800' },
            h2: { color: theme('colors.slate.900'), fontWeight: '700' },
            strong: { color: theme('colors.slate.900') },
            a: {
              color: theme('colors.indigo.600'),
              '&:hover': { color: theme('colors.indigo.800') },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
