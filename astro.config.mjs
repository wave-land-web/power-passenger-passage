// @ts-check
import netlify from '@astrojs/netlify'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import sanity from '@sanity/astro'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://powerpassengerpassage.com/',
  output: 'hybrid',
  prefetch: {
    prefetchAll: true,
  },
  image: {
    domains: ['cdn.sanity.io'],
  },
  integrations: [
    tailwind(),
    icon(),
    sitemap({
      lastmod: new Date(),
      filter: (page) =>
        page !== 'https://powerpassengerpassage.com/subscribed/' &&
        page !== 'https://powerpassengerpassage.com/unsubscribed/' &&
        page !== 'https://powerpassengerpassage.com/success/',
    }),
    sanity({
      projectId: 'tenszbcb',
      dataset: 'production',
      // Set useCdn to false if you're building statically.
      useCdn: false,
      apiVersion: '2024-11-14',
      studioBasePath: '/studio',
    }),
    react(),
    partytown(),
  ],
  adapter: netlify({
    imageCDN: false,
    cacheOnDemandPages: true,
  }),
})
