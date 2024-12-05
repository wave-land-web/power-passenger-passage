import { visionTool } from '@sanity/vision'
import { defineConfig, isDev } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

const devOnlyPlugins = [
  structureTool({
    structure: (S, context) => {
      console.log(context)
      return S.list()
        .title('Base')
        .items([
          // Website (posts, pages, etc.)
          S.listItem()
            .title('Website')
            .child(
              S.list()
                .title('Website')
                .items([S.documentTypeListItem('post').title('Posts')])
              // TODO: Add pages here
            ),
          // Emails (newsletters, etc.)
          S.listItem()
            .title('Emails')
            .child(
              S.list()
                .title('Emails')
                .items([S.documentTypeListItem('newsletter').title('Newsletter')])
            ),
        ])
    },
  }),
  visionTool(),
]

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: isDev
    ? devOnlyPlugins
    : [
        structureTool({
          structure: (S, context) => {
            console.log(context)
            return S.list()
              .title('Base')
              .items([
                // Website (posts, pages, etc.)
                S.listItem()
                  .title('Website')
                  .child(
                    S.list()
                      .title('Website')
                      .items([S.documentTypeListItem('post').title('Posts')])
                    // TODO: Add pages here
                  ),
                // Emails (newsletters, etc.)
                S.listItem()
                  .title('Emails')
                  .child(
                    S.list()
                      .title('Emails')
                      .items([S.documentTypeListItem('newsletter').title('Newsletter')])
                  ),
              ])
          },
        }),
      ],
  schema,
})
