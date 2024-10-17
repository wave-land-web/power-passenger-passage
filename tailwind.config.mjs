/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontSize: {
      '2xs': ['var(--fs-2xs)', { lineHeight: 'var(--line-height)' }],
      xs: ['var(--fs-xs)', { lineHeight: 'var(--line-height)' }],
      sm: ['var(--fs-sm)', { lineHeight: 'var(--line-height)' }],
      base: ['var(--fs-base)', { lineHeight: 'var(--line-height)' }],
      md: ['var(--fs-md)', { lineHeight: 'var(--line-height)' }],
      lg: ['var(--fs-lg)', { lineHeight: 'var(--line-height)' }],
      xl: ['var(--fs-xl)', { lineHeight: 'var(--line-height)' }],
      '2xl': ['var(--fs-2xl)', { lineHeight: 'var(--line-height)' }],
    },
    colors: {
      transparent: 'transparent',
      white: 'var(--color-white)',
      whiteTransparent: 'var(--color-white-transparent)',
      black: 'var(--color-black)',
      grey: 'var(--color-grey)',
      slate: 'var(--color-slate)',
      red: {
        900: 'var(--color-red-900)',
        800: 'var(--color-red-800)',
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
