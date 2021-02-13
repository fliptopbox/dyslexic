const fs = require('fs');
const path = require('path');
const txtfile = '../assets/oxymorons.txt';

const text = loadTextData();
const keyword = new Set();
const collection = parseTextData(text);

function loadTextData(relpath = txtfile) {
    const abspath = path.join(__dirname, relpath);
    return fs.readFileSync(abspath, 'utf8');
}

function parseTextData(text) {
    const array = text.split(/\n/).filter((s) => !/($^|^#)/.test(s));

    array.forEach((s) => {
        const [key] = s.split(' ');
        keyword.add(key);
    });

    return array;
}

function matchPhrases(phrase) {
    const parts = phrase
        .split(' ')
        .map((s) => (keyword.has(s) ? s : null))
        .filter((s) => s)
        .map((s) => new RegExp(s, 'i'));

    const pairs = collection
        .filter((s) => (parts.some((re) => re.test(s)) ? s : null))
        .filter((s) => new RegExp(s).test(phrase));

    return pairs;
}

module.exports = function oxymoron(sentence = null) {
    if (!sentence) return null;

    const text = sentence.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!text) return null;

    const matches = matchPhrases(text);
    if (!matches.length) return null;

    return {
        orig: sentence,
        matches,
    };
};
