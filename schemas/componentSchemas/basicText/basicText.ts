import { definePageComponent } from '../definePageComponent'
import { TextIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'

export const basicText = definePageComponent({
  name: 'basicText',
  title: 'Basic Text',
  description: 'A simple text block',
  icon: TextIcon,
  fields: [
    {
      name: 'body',
      title: 'Body',
      type: 'complexRichText',
    },
    {
      name: 'bodyRight',
      title: 'Body Right',
      type: 'complexRichText',
      group: 'right',
      hidden: ({ parent }) => parent.layout !== 'twoColumns',
    },
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Single Column', value: 'singleColumn' },
          { title: 'Two Columns', value: 'twoColumns' },
        ],
      },
      initialValue: 'singleColumn',
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
      body: 'body',
      bodyRight: 'bodyRight',
    },
    prepare: ({ body }) => {
      const bodyString = body ? blockPreview(body) : 'No body'
      return {
        title: 'Basic Text',
        subtitle: bodyString,
      }
    },
  },
  components: {
    // preview: PreviewBasicText,
  },
})
