const press = require('./tableofcontent');
const metadata = require('./metadata');
const article = require('./article');

const collection = press.toc();

const row = collection[0];
const [filepath] = row.files.slice(-1);
const { frontmatter, plaintext } = metadata(filepath, row);

const { words, vocabulary } = article;
const p = article.paragraphs(plaintext).map(words).filter(s => s);
const paragraphcount = p.length;
const paragraphwords = p.map(item => item.length);

const allwords = p.flat().filter(s => s.trim());
const wordcount = allwords.length;

const entries = Object.entries(vocabulary(allwords)) //
    .map(([k, n]) => [k, n, { value: parseInt(k, 36) }]);

const wordsunique = entries.length;
const wordcountmax = Math.max(...paragraphwords);
const wordsperparagraph = ((((wordcount / paragraphcount) * 1000) >> 0) / 1000);


frontmatter.wordcount = wordcount;
frontmatter.paragraphcount = paragraphcount;
frontmatter.wordsunique = wordsunique;
frontmatter.wordcountmax = wordcountmax;
frontmatter.wordsperparagraph = wordsperparagraph;




const sorted = entries.sort((a, b) => b[1] - a[1]);

// console.log("total words", allwords.length);
// console.log("total paragraphs", p.length);
console.log("total paragraph words", paragraphwords);

console.log(dictionaryToFrontmatter(frontmatter));
// console.log(sorted.slice(0, 50));
// console.log(dictionaryToFrontmatter(frontmatter));

function dictionaryToFrontmatter(object) {
    // Given a dictionart output
    // YAML frontmatter block
    const entries = Object.entries(object).map(([k, v]) => `${k}: ${v}`);

    return ['---', ...entries, '---', ''].join('\n');
}
