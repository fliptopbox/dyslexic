const fs = require('fs');
const path = require('path');
const TOC = require('./tableofcontent');
const parseText = require('./article');
const metadata = require("./metadata")

const collection = TOC();

const row = collection[1];
const [filepath] = row.files.slice(-1);
const {frontmatter, plaintext} = metadata(filepath, row);



const content = parseText(plaintext);

content;



console.log(dictionaryToFrontmatter(frontmatter));



function dictionaryToFrontmatter(object) {
    // Given a dictionart output
    // YAML frontmatter block
    const entries = Object.entries(object).map(([k, v]) => `${k}: ${v}`);

    return ['---', ...entries, '---', ''].join('\n');
}
