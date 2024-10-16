/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontSize: {
      '2xs': ['var(--fs-2xs)', { lineHeight: 'var(--line-height)' }],
      xs: ['var(--fs-xs)', { lineHeight: 'var(--line-height)' }],
      base: ['var(--fs-base)', { lineHeight: 'var(--line-height)' }],
      s: ['var(--fs-s)', { lineHeight: 'var(--line-height)' }],
      m: ['var(--fs-m)', { lineHeight: 'var(--line-height)' }],
      l: ['var(--fs-l)', { lineHeight: 'var(--line-height)' }],
      xl: ['var(--fs-xl)', { lineHeight: 'var(--line-height)' }],
      '2xl': ['var(--fs-2xl)', { lineHeight: 'var(--line-height)' }],
      '3xl': ['var(--fs-3xl)', { lineHeight: 'var(--line-height)' }],
      '4xl': ['var(--fs-4xl)', { lineHeight: 'var(--line-height)' }],
      '5xl': ['var(--fs-5xl)', { lineHeight: 'var(--line-height)' }],
      '6xl': ['var(--fs-6xl)', { lineHeight: 'var(--line-height)' }],
      '7xl': ['var(--fs-7xl)', { lineHeight: 'var(--line-height)' }],
      '8xl': ['var(--fs-8xl)', { lineHeight: 'var(--line-height)' }],
      '9xl': ['var(--fs-9xl)', { lineHeight: 'var(--line-height)' }],
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
