const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, './glossary-eng-all.tsv');
const glossary = fs.readFileSync( filename, 'utf8');
const collection = glossary
    .split('\n')
    .map((s) => s.split('\t'))
    .map(([id, title, by, misc = null]) => ({ id, title, by, misc }))
    .map((o) => {
        const by = String(o.by || 'Unknown').replace(/^by /i, '');
        const src = relativepath(o.id);
        const dest = destinationpath(o.id, by, o.title);
        return { ...o, by, src, dest };
    });


console.log(collection.length, collection[13])





/**!/

const files =  ["1/0/0/0/10001/10001.txt", "8/0/0/8008/8008.txt", "8/9/3/8930/8930-8.txt"]
const text = fileToLines(files[2]);

console.log(metadata(text)); //?

/**/

function relativepath(id) {
    const parts = String(id).split('');
    parts.splice(-1, 1, id, '');
    return parts.join('/');
}

function asciihyphen(s) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9\s]+/g, '')
        .replace(/\s+/g, '-');
}

function destinationpath(id, by = 'unknown', title = 'unknown') {
    const s = asciihyphen(by);
    const name = asciihyphen(title);
    return `${s}/${id}-${name}.txt`;
}

function fileToLines(filename) {
    const text = fs
        .readFileSync(path.join(__dirname, filename), 'utf8')
        .split('\n')
        .map((s) => s.trim());

    return text;
}

function metadata(lines) {
    // extract the header metadata
    // parse everything upto the start marker
    // from the end reverse to find the end marker
    // extract the content between the markers

    const offset = 350;
    const { length } = lines;
    const top = lines.slice(0, 50);
    const tail = lines.slice(-offset);

    const alpha = /START OF \w+ PROJECT/i;
    const omega = /End of the Project Gutenberg/i;

    let dict = {};

    const start = top.findIndex((s) => {
        const meta = keyValuePair(s);
        if (meta) dict = { ...dict, ...meta };

        return alpha.test(s);
    });

    let end = tail.findIndex((s) => omega.test(s));
    end = end ? length - offset + end : end;

    const corpus = lines.slice(start, end);

    return { ...dict, start, end, corpus };
}

function keyValuePair(s = '') {
    if (!/:/.test(s)) return null;
    const match = String(s || '').match(/^(\w[^:,'";\.]+):\s+(.*)/i);
    const [_, key, value] = match || [];
    return _ ? { [key.toLowerCase().replace(/\s+/g, '')]: value } : null;
}
