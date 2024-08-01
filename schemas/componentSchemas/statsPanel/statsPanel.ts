import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { TbPercentage } from 'react-icons/tb'
import { stat } from './stat'
import { PreviewStatsPanel } from './PreviewStatsPanel'

export const statsPanel = definePageComponent({
  name: 'statsPanel',
  title: 'Stats Panel',
  description: 'A series of cards that display statistics.',
  icon: TbPercentage,
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [stat],
    }),
    defineField({
      name: 'style',
      title: 'Style',
      description: 'The style of cards displayed in the stat panel.',
      type: 'string',
      options: {
        list: [
          { title: 'Gray (4 columns with gray cards)', value: 'gray' },
          { title: 'Glass (3 columns with translucent cards)', value: 'glass' },
        ],
      },
      initialValue: 'gray',
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
    },
    prepare: ({ stats }) => {
      return {
        title: 'Stats Panel',
        stats,
      }
    },
  },
  components: {
    preview: PreviewStatsPanel,
  },
})
