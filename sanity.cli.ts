import { defineCliConfig } from 'sanity/cli'
import path from 'path'

export default defineCliConfig({
  api: {
    projectId: 'b7pblshe',
    dataset: 'marketing-dev',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
  },
})
