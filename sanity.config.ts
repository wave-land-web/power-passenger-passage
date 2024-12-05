import { visionTool } from '@sanity/vision'
import { defineConfig, isDev } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

const devOnlyPlugins = [structureTool({ structure }), visionTool()]

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: isDev ? devOnlyPlugins : [structureTool({ structure })],
  schema,
})
