/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: 'var(--color-white)',
      black: 'var(--color-black)',
      grey: 'var(--color-grey)',
      slate: 'var(--color-slate)',
      red: {
        900: 'var(--color-red-900)',
        500: 'var(--color-red-500)',
        100: 'var(--color-red-100)',
      },
      tan: {
        100: 'var(--color-tan-100)',
      },
    },
    extend: {
      fontFamily: {
        header: ['Alegreya', 'serif'],
        body: ['Alegreya Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
