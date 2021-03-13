const fs = require('fs');
const path = require('path');
const txtfile = '../assets/abbreviations.tsv';

const text = loadTextData();
const collection = parseTextData(text);

function loadTextData(relpath = txtfile) {
    const abspath = path.join(__dirname, relpath);
    return fs.readFileSync(abspath, 'utf8');
}

function parseTextData(text) {
    const array = text
        .split(/\n/)
        .filter((s) => !/($^|^#)/.test(s))
        .map((s) => s.split(/\t+/));

    return Object.fromEntries(array);
}

function exists(word) {

  const value = collection[word];

  const uc = word.toUpperCase();
  const alt = collection[uc];
  const pair = alt ? [word, alt] : null;

  return pair || value || null;
}

function unpunctuate(text, full = false) {
    if (/^\W+$/.test(text)) return text;

    const re = /([\w\d-]+)([,;:!?\.]+$)?/;
    const [word, punc] = text.match(re).slice(1);
    const abbr = exists(word);
    const phrase = abbr ? abbr[1] : word;

    if (!full) return `${phrase}${punc || ''}`;

    return Object.assign(
        {},
        {
            key: word, // dictionary key
            orig: text, // input text
            desc: phrase, // dictionary description
            text: `${phrase}${punc || ''}`, // re-punctutated
            exists: abbr ? true : false,
        }
    );
}

function expand(sentence, uc = false) {
    const array = sentence
        .split(/\s+/)
        .map((v) => unpunctuate(v))
    return array;
}

function extract(sentence) {
    const array = sentence
        .split(/\s+/)
        .map(v => unpunctuate(v, true))
        .filter((s) => s.exists)
        .map(({key, desc}) => [key, desc])

    return [...array];
}

function addAbbrieviation(key, value) {
    collection[key] = value;
}

function list() {
    return collection;
}

const methods = { extract, addAbbrieviation, list, expand, unpunctuate };
module.exports = methods;
