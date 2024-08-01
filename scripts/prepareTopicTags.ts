import craftCategories from '@/scripts/data/craftExports/craftCategories.json'
import { CraftCategory } from './craftTypes'

const categories = (craftCategories as unknown as CraftCategory[]).slice(0, 10)
