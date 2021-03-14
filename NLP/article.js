/*

the object of this script is to parse a
text file and return metadata about the
written content.

- sentences
- words
- dictionary of occurances
 
*/

const sample = `


CHAPTER I.
Down the Rabbit-Hole


Alice was beginning to get very--tired of sitting by her sister on the
bank, and of having nothing to do: once or    twice she had peeped into
the book her sister was reading, but it had no pictures or
conversations in it, “and what is the use of a book,” thought Alice
“without pictures or     conversations?”

So she was considering in her own mind (as well as she could, for the
hot day made her feel very sleepy and stupid), whether the pleasure of
making a daisy-chain would be worth the trouble of getting up and
picking the daisies, when suddenly a White Rabbit with pink eyes ran
close by her.


`;

// console.log(unwrap(sample))
// console.log(leading(sample))
// console.log(whitespacing(sample))
console.log(preprocess(sample));

module.exports = parseText;
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

function quotes(string) {
    return string.replace(/["”“]+/g, `"`).replace(/['’`]+/g, `'`);
}

function linearray(text, end = -1) {
    const string = text.replace(/\n\n+/g, '\n\n');
    return string.split('\n').slice(0, end);
}

function whitespacing(string) {
    return string.replace(/[ ]+/g, ' ').replace(/(\w)(\-+)(\w)/g, '$1 $2 $3');
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
