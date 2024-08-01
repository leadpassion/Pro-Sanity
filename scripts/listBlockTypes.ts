import { CraftReport } from './craftTypes'
import craftReportsAndGuides from './data/craftExports/craftReportsAndGuides.json'

const reportsAndGuides = craftReportsAndGuides as unknown as CraftReport[]

let entryCount = 0
const blockTypes = new Set<string>()

for (const entry of reportsAndGuides) {
  entryCount++

  // Iterate over each key in the contentMatrixSimple object
  for (const key in entry.contentMatrixSimple) {
    const blockType = entry.contentMatrixSimple[key].type
    blockTypes.add(blockType)
  }

  // Same for contentMatrics
  for (const key in entry.contentMatrix) {
    const blockType = entry.contentMatrix[key].type
    blockTypes.add(blockType)
  }
}

console.log('Entry Count:', entryCount)
console.log('Block types', blockTypes)
