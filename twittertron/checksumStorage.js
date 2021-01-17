const fs = require('fs');
const path = require('path');

const filename = './checksums.tsv';
const fullpath = path.join(__dirname, filename);

let checksums = initialize();

module.exports = {
    persistChecksum,
    parseChecksumData,
    serializeCollection,
    checksumExists,
    loadChecksumData,
    checksumData,
};

function checksumData() {
    return { ...checksums };
}

function parseChecksumData(tsv) {
    const text = tsv
        .trim()
        .split('\n')
        .filter((s) => !/^#/.test(s))
        .map((line) => {
            const [key, name, id, tags = ""] = line.split(/\s+/);
            return [key, { key, name, id, tags }];
        });

    return Object.fromEntries(text);
}

function persistChecksum(key, name, id, rehashtags) {
    if (checksumExists(key)) return;

    const tags = rehashtags.join(",")
    checksums[key] = { key, id, name, tags };

    const content = serializeCollection(checksums);
    const options = { encoding: 'utf8', flag: 'w' };

    try {
        fs.writeFileSync(fullpath, content, options);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return { ...checksums };
}

function serializeCollection(collection, tail = 300) {
    const entries = Object.entries(collection).sort((aa, bb) => {
        const a = Number(aa[1].id);
        const b = Number(bb[1].id);
        return a - b;
    }).slice(-tail);

    const array = entries
        .map(([_, object]) => {
            const { id, name, key, tags } = object;
            return `${key}\t${name}\t${id}\t${tags}`;
        })
        .join('\n');

    return array;
}

function checksumExists(key) {
    return checksums[key];
}

function loadChecksumData() {
    try {
        return fs.readFileSync(fullpath, 'utf8');
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function initialize() {
    const textdata = loadChecksumData();
    const collection = parseChecksumData(textdata);
    return collection || {};
}
