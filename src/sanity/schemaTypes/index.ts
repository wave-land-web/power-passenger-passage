import type { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, post],
}
