// @ts-check
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://powerpassengerpassage.com',
  output: 'hybrid',
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    tailwind(),
    icon(),
    sitemap({
      lastmod: new Date(),
    }),
  ],
  adapter: netlify({
    imageCDN: false,
    cacheOnDemandPages: true,
  }),
})
