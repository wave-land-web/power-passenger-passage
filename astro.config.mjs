// @ts-check
import netlify from '@astrojs/netlify'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://powerpassengerpassage.com/',
  prefetch: {
    prefetchAll: true,
  },
  image: {
    domains: ['cdn.sanity.io'],
  },
  integrations: [
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
  vite: {
    plugins: [tailwindcss()],
  },
})
