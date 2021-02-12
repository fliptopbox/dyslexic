const fs = require('fs');
const path = require('path');

const dictionary = {};
const text = loadTextData();
const collection = parseTextData(text);

function loadTextData(relpath = '../assets/emoticons.txt') {
    const abspath = path.join(__dirname, relpath);
    return fs.readFileSync(abspath, 'utf8');
}

function parseTextData(text) {
    const array = text
        .split(/^$/m)
        .map((s) => s.split(/\n/))
        .map(emoticonObject);

    array.forEach(updateDictionary);
    return array;
}

function updateDictionary(object, index) {
    if (!object) return;

    // (for duplicates retain first description)
    object.ascii.forEach((s) => {
        if(dictionary[s] !== undefined) return;
        dictionary[s] = index;
    });
}

function emoticonObject(lines) {
    const ascii = lines //
        .filter((s) => !/^#/.test(s))
        .filter((s) => s.trim());

    if (ascii.length < 3) return null;

    const emojiRegEx = /\p{Emoji_Presentation}/gu;
    const description = ascii.splice(-1)[0];
    const emoji = ascii.splice(-1)[0].match(emojiRegEx);

    return {
        description,
        emoji,
        ascii,
    };
}

function emoticon(text) {
    const words = text.split(/\s+/g);
    const array = words
        .map((w) => dictionary[w])
        .filter((s) => s)
        .map((n) => collection[n]);

    return array;
}

module.exports = emoticon;

// QUOKKA TESTS
// emoticon('this is test :)'); //?
// emoticon(':)'); //?
