const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, './glossary-eng-all.tsv');
const glossary = fs.readFileSync(filename, 'utf8');
const collection = glossary
    .split('\n')
    .map((s) => s.split('\t'))
    .map(([id, title, by, misc = null]) => ({ id, title, by, misc }))
    .map((o) => {
        const by = String(o.by || 'Unknown').replace(/^by /i, '');
        const src = relativepath(o.id);
        const files = getTextFiles(src);
        const dest = destinationpath(o.id, by, o.title);
        return { ...o, by, files };
    });

const row = collection[2];
const [filepath] = row.files.slice(-1);
const text = fileToLines(filepath);
const output = metadata(text);

output.frontmatter.filepath = filepath;
console.log( output.frontmatter );

/**/
getTextFiles('1/11/');
function getTextFiles(folder) {
    const dir = path.join(__dirname, folder);
    if (!fs.existsSync(dir)) return [];
    const items = fs.readdirSync(dir);
    const [name] = folder
        .replace(/\/$/, '')
        .split(/\//)
        .filter((s) => s.trim())
        .slice(-1);

    const re = new RegExp(`^(${name}).*(txt)$`);
    return items.filter((s) => re.test(s)).map((s) => `${folder}${s}`); //?
}

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

    const bottomoffset = 650;
    const { length } = lines;
    const top = lines.slice(0, 50);
    const tail = lines.slice(-bottomoffset);

    const startof = /start of (\w+ )?project/i;
    const endof = /end of (\w+ )?project/i;

    let dict = {};

    const start =
        1 +
        top.findIndex((s) => {
            const meta = keyValuePair(s);
            if (meta) dict = { ...dict, ...meta };

            return startof.test(s);
        });

    let end = tail.findIndex((s) => endof.test(s));
    end = end ? length - bottomoffset + end : end;

    const corpus = lines.slice(start, end);
    const plaintext = corpus.join('\n').trim();

    return {
        frontmatter: { ...dict, start, end },
        plaintext,
    };
}

function keyValuePair(s = '') {
    if (!/:/.test(s)) return null;
    const match = String(s || '').match(/^(\w[^:,'";\.]+):\s+(.*)/i);
    const [_, key, value] = match || [];
    return _ ? { [key.toLowerCase().replace(/\s+/g, '')]: value } : null;
}
