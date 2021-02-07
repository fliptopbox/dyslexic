// Returns a string sentence derived from a sequential cursor
// iterating over a large recordset of rendered phrases
//

const fs = require('fs');
const path = require('path');
const filename = './random.txt';
const fullpath = path.join(__dirname, filename);

const text = fs.readFileSync(fullpath, 'utf8');
const sentences = unique(text);
let n = (Math.random() * sentences.length) >> 0;

function unique(string) {
   const array = string
      .trim()
      .split('\n')
      .filter(s => /^\w+/g.test(s));

    return Array.from(new Set(array));
}

// replace the record set with unique rows only
function save() {
    const abspath = fullpath;
    const options = { encoding: 'utf8', flag: 'w' };
    const text = sentences.join('\n');
    const fn = function (a) {
        console.log(a);
    };
    fs.writeFile(abspath, text, options, fn);
}

function sentence() {
    n += 1;
    const u = sentences.length;
    const i = n % u;
    return sentences[i];
}

function current() {
    return n;
}

function recordset() {
    return sentences;
}

module.exports = {
    recordset,
    sentence,
    current,
    save,
   unique
};
