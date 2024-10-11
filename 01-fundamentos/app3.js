const fs = require('fs')

const content = fs.readFileSync('readme.md', 'utf-8')

const wordCount = content.split(' ')
const reactWordCount = wordCount.filter(word => word.toLowerCase().includes('react')).length

const reactCount = content.match(/react/gi ?? []).length

console.log('Palabras', wordCount.length)
console.log('Palabras react filtradas', reactCount)
