import fs from 'fs'
import * as cheerio from 'cheerio'
import { htmlToText } from 'html-to-text'
import { nanoid } from 'nanoid'
import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'
import { parse } from 'ndjson'

// Read the HTML file from './data/misc/glossary.html'
const html = fs.readFileSync('scripts/data/misc/glossary.html', 'utf8')

// Load the HTML into Cheerio
const $ = cheerio.load(html)

type GlossaryTerm = {
  _id: string
  _type: string
  term: string
  pronunciation: string
  tldr: string
  definition: string
  usedInASentence: string
}

const glossaryTerms: GlossaryTerm[] = []

const processHtml = (html: string) => {
  return htmlToText(html)
    .replaceAll(/\n/g, ' ')
    .replaceAll(/\s+/g, ' ')
    .replaceAll('“', '')
    .replaceAll('”', '')
    .trim()
}

// Loop through each term in the HTML
$('h1').each((i, el) => {
  const term = $(el).text()
  // The pronunciation is the next element after the term
  const pronunciation = $(el).next().text()

  // The TL:DR is the element immediately following <h2>TL:DR</h2>
  const tldr = $(el).next().next().next().text()

  // The definition is the element immediately following <h2>DEFINITION</h2>
  const definition = $(el).next().next().next().next().next().text()

  // The used in a sentence is the element immediately following <h2>USED IN A SENTENCE</h2>
  const usedInASentence = $(el)
    .next()
    .next()
    .next()
    .next()
    .next()
    .next()
    .next()
    .text()

  glossaryTerms.push({
    _id: `imported-craft-glossaryTerm-${nanoid()}`,
    _type: 'glossaryTerm',
    term,
    pronunciation: htmlToText(pronunciation)
      .replaceAll(/\//g, '\\')
      .replaceAll(/\\/g, '\\'),
    tldr: processHtml(tldr),
    definition: [
      {
        _type: 'block',
        _key: '224d891fca70',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            text: processHtml(definition),
            marks: [],
          },
        ],
      },
    ],
    usedInASentence: processHtml(usedInASentence),
  })
})

// Write the glossary terms to a JSON file
fs.writeFileSync(
  'scripts/data/misc/glossary.ndjson',
  JSON.stringify(glossaryTerms).replaceAll('},{', '}\n{').slice(1, -1),
)
