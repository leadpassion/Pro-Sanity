import { schemas } from '@/schemas'
import { Schema as SchemaCompiler } from '@sanity/schema'
import { ArraySchemaType } from 'sanity'

/**
 * This function takes a schema name and a block content field name and returns the root schema block content type
 * @param {string} schemaName The name of the schema in Sanity
 * @param {string} blockContentFieldName The name of the field in the schema that holds the portable text blocks
 * @returns The root schema block content type
 */
export const getBlockContentType = (
  schemaName: string,
  blockContentFieldName: string,
): ArraySchemaType<unknown> => {
  // Compile the project's schema so Sanity's block tools can use it
  // to convert the HTML to portable text blocks
  // See https://www.npmjs.com/package/@sanity/block-tools
  const rootSchema = SchemaCompiler.compile({
    name: 'Braze CMS',
    // TODO TEMP FIX
    types: schemas.filter((s) => s.name !== 'icon')
  })

  // The compiled schema type for the field holding the portable text blocks
  // This gets passed to the block tools so it knows what type of blocks to create
  const blockContentType = rootSchema
    .get(schemaName)
    .fields.find((field: any) => field.name === blockContentFieldName).type

  return blockContentType
}
