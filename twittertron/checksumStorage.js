const fs = require('fs');
const path = require('path');

const pathLastMsg = './lastmessage.tsv';
const filename = './checksums.tsv';
const fullpath = path.join(__dirname, filename);

let checksums = initialize();

module.exports = {
    persistChecksum,
    persistLastTweet,
    parseChecksumData,
    serializeCollection,
    checksumExists,
    loadChecksumData,
    checksumData,
    appendToFile,
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
            const [ chksum, id, screen_name, rehashtags, ts, phrase ] = line.split(/\t/);
            return [chksum, { chksum, screen_name, id, rehashtags, ts, phrase}];
        });

    return Object.fromEntries(text);
}

function appendToFile(text, filename = "plaintext.txt", append = true) {
    const abspath = path.join(__dirname, `./${filename}`);
    const flag = append ? "a" : "w";
    const options = { encoding: 'utf8', flag };
    const fn = function(a) { console.log(a); }

    try {
        fs.writeFile(abspath, text, options, fn);
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function persistLastTweet(text) {
    return appendToFile(text, "lastmessage.txt", false);
}

function persistChecksum(object) {
    const {chksum, screen_name, id, rehashtags, phrase} = object;

    if (checksumExists(chksum)) return;

    const tags = rehashtags.join(",")
    const ts = new Date().valueOf();
    const append = { chksum, id, screen_name, tags, ts, phrase  };
    checksums[chksum] = append;

    console.log(1, append);

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
            const entries = Object.entries(object);
            const values = entries.map(([_,v]) => v || "-");
            return values.join("\t");
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
    console.log(1, collection)
    return collection || {};
}
