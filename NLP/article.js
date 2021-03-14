/*

the object of this script is to parse a
text file and return metadata about the
written content.

- sentences
- words
- dictionary of occurances

*/

function parseText(plaintext) {
    const lines = linearray(plaintext, 111);
    return lines;
}

function preprocess(string) {
    let text = String(string || '');
    text = whitespacing(text);
    text = leading(text);
    text = unwrap(text);
    text = quotes(text);

    return text;
}

function vocabulary(array) {
    // collates the words with frequency counters
    const dictionary = {};
    array
        .map(alphaonly)
        .filter((s) => s.trim())
        .forEach((key) => {
            key = key.toLowerCase();
            dictionary[key] = dictionary[key] || 0;
            dictionary[key] += 1;
        });

    return dictionary;
}

function alphaonly(string) {
    // returns alphabetical characters only
    const re = /\W/gi;
    return string.replace(re, '');
}

function words(text) {
    // return an array of words
    return text.split(/\s+/).filter(word);
}

function word(text) {
    // simple word
    if (/^\w+$/.test(text)) return text;

    // no internal spaces
    if (/\s+/g.test(text)) return null;

    // simple hyphenation
    if (/^\w+\-\w+$/.test(text)) return text;

    //
    const boundry = `([\\w,\\.!?;:"”“'’\`)\\]}]+)`;
    const re = new RegExp(`${boundry}`, 'i');

    return re.test(text) ? text : null;
}

function paragraphs(string, max) {
    const text = preprocess(string).trim();
    return linearray(text, max).filter((s) => s.trim());
}

function quotes(string) {
    return string.replace(/["”“]+/g, `"`).replace(/['’`]+/g, `'`);
}

function linearray(text, head = 0) {
    const string = text.replace(/\n\n+/g, '\n\n');
    const array = string.split('\n');

    return head ? array.slice(0, -head) : array;
}

function whitespacing(string) {
    return string
        .replace(/[ ]+/g, ' ')
        .replace(/(\w)(\-{2,})(\w)/g, '$1 $2 $3');
}

function leading(string) {
    const text = string.replace(/\r+/g, '').replace(/\n\n+/g, '\n\n');
    return text;
}

function unwrap(string) {
    const boundry = `([\\w,\\.!?;:"”“'’\`)\\]}]+)`;
    const eol = new RegExp(`${boundry}\n${boundry}`, 'g'); //?
    const text = string.replace(eol, '$1 $2');
    return text;
}

function wordvalue(word) {
    // return the numberic value of a word
    // (basically base 36 value)
    const latin = parseInt(word, 36);
    return latin;
}

function vowels(word) {
    // returns only vowels (unique)
    return word
        .replace(/[^aeiou]+/g, '')
        .split('')
        .filter((c, i, a) => i === a.indexOf(c))
        .join('');
}

function consonants(word) {
    // returns only vowels (unique)
    return word.replace(/[aeiou]+/g, '');
}

function wordattr(word) {
    // various attrubutes of a word
    return {
        integer: parseInt(word, 36),
        vowels: vowels(word),
        consonants: consonants(word),
    };
}

module.exports = {
    alphaonly,
    leading,
    unwrap,
    parseText,
    whitespacing,
    quotes,
    linearray,
    preprocess,
    paragraphs,
    vocabulary,
    words,
    word,
    wordattr,
    wordvalue,
    vowels,
    consonants,
};
