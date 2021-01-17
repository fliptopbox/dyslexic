const fs = require('fs');
const filename = './checksums.tsv';
let checksums = initialize();

module.exports = {
    persistChecksum,
    parseChecksumData,
    serializeCollection,
    checksumExists,
    loadChecksumData,
    checksumData
}

function checksumData() {
    return {...checksums};
}

function parseChecksumData(tsv) {
    const maxLines = 333;
    const tail = tsv
        .trim()
        .split("\n")
        .filter(s => !/^#/.test(s))
        .slice(-maxLines);

    const text = tail
        .map((line) => {
            const [key, name, id] = line.split(/\s+/);
            return [key, { key, name, id }];
        });

    return Object.fromEntries(text);
}

function persistChecksum(key, name, id) {
    if (checksumExists(key)) return;

    checksums[key] = {key, id, name};

    const content = serializeCollection(checksums);
    const options = { encoding: 'utf8', flag: 'w' };

    fs.writeFileSync(filename, content, options);
    return {...checksums};
}

function serializeCollection(collection) {
    const array = Object.entries(collection)
        .sort((aa, bb) => {
            const a = Number(aa[1].id);
            const b = Number(bb[1].id);
            return a - b;
        })
        .map(([_, object]) => {
            const {id,name,key} = object;
            return `${key}\t${name}\t${id}`;
        }).join("\n")

    return array;
}

function checksumExists(key) {
    return checksums[key];
}

function loadChecksumData() {
    try {
        return fs.readFileSync(filename, 'utf8');
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function initialize() {
    const textdata = loadChecksumData();
    const collection = parseChecksumData(textdata);
    return collection || {};
}
