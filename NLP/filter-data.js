const fs = require('fs');
const path = require('path');

const indexfile = 'data/glossary-eng-curated.tsv';
const corpus = require('./tableofcontent');
const metadata = require('./metadata');
const u = require('./article');

const collection = corpus.toc(indexfile);

/**/

console.log(collection);
collection.forEach((o) => {
    if (o.jsonExists) {
        // console.log('x exists', o.id, o.title);
        return;
    }

    const {
        jsonFilename,
        baseFilename,
        data,
        summary,
        vocabulary,
    } = makeJsonAsset(o);

    const json = JSON.stringify({ summary, data });
    const vocabularyJson = JSON.stringify(vocabulary);
    const vocFilename = `${baseFilename}-vocabulary.json`;
    const options = { encoding: 'utf8' };

    fs.writeFileSync(jsonFilename, json, options);
    fs.writeFileSync(vocFilename, vocabularyJson, options);

    console.log('< done', summary.title);
    // console.log('< ', summary);

    // console.warn(Object.fromEntries(data.flat().map(check).filter(a => a)));
    return;
});

/**/

function makeJsonAsset(row) {
    const [filepath] = row.files.slice(-1);
    const { frontmatter, plaintext } = metadata(filepath);

    const id = row?.id;
    const title = frontmatter?.title || '*' + row?.title;

    console.log('> ', id, title);

    const p = u
        .paragraphs(plaintext)
        .map(u.words)
        .filter((s) => s);

    const paragraphcount = p.length;
    const paragraphwords = p.map((item) => item.length);

    const allwords = p.flat().filter((s) => s);
    const wordcount = allwords.length;
    const vocabulary = u.vocabulary(allwords);

    const wordsunique = Object.keys(vocabulary).length;
    const wordcountmax = paragraphwords.reduce((a, c) => Math.max(a, c), 0);
    const wordsperparagraph = Number((wordcount / paragraphcount).toFixed(3));

    const summary = {
        ...row,
        ...frontmatter,
        wordcount,
        paragraphcount,
        wordsunique,
        wordcountmax,
        wordsperparagraph,
    };

    const { filename } = frontmatter;
    const baseFilename = filename.replace(/\.\w+$/i, '');
    const jsonFilename = `${baseFilename}.json`;
    const data = p.map((words) => words.map((w) => u.stringvalue(w).slice(-2)));

    return { jsonFilename, baseFilename, data, summary, vocabulary };
}

/**!/
function check(row) {
    const [word, value] = row;
    if (!word) return null;
    const string = value.toString(36);
    return string !== word ? [word, [string, value]] : null;
}
/**/
