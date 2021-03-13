/*
 *
 * Opend the data folder
 * iterate of all the JSON files
 *
 * open json file and merge with previous state
 * persist new state to disk, save filename for deletetion
 *
 *
 */

const fs = require('fs');
const path = require('path');
const word = require('./word');

const datafolder = '../data/';
const popfolder = '../data/popularity/';
const abspath = path.join(__dirname, popfolder);

const files = fs.readdirSync(abspath);
const summary = [];

module.exports = collate;
function collate() {
    const fullpaths = files.map((s) => `${abspath}${s}`);
    const jsondata = fullpaths.map(fileToJson).filter((s) => s);
    const collection = {};
    let min = files.length;
    let max = 0;

    jsondata.forEach((obj) => {
        Object.entries(obj).forEach((array) => {
            const [k, v] = array;

            if (!word(k)) return;

            collection[k] = collection[k] || 0;
            collection[k] += v;

            min = Math.min(min, collection[k]);
            max = Math.max(max, collection[k]);
        });
    });

    const sorted = sortedArray(collection, files.length);
    const o = { summary, words: sorted, min, max, ts: new Date() };
    saveToJson('popularity.json', o);
    console.log('done', files.length);
}

function sortedArray(object) {
    const array = Object.entries(object)
        .filter((k, v) => word(k))
        .sort((a, b) => b[1] - a[1]);

    return array;
}

function saveToJson(filename, object) {
    const absfile = path.join(__dirname, datafolder, filename);
    const string = JSON.stringify(object, null, 4);
    fs.writeFileSync(absfile, string, 'utf8');
}

function fileToJson(absfile) {
    const text = fs.readFileSync(absfile, 'utf8');
    const json = JSON.parse(text);
    const retweets = json.rt || 0;

    // log the metadata
    const parts = absfile.split('/');
    const filename = parts.slice(-1)[0];
    const id = filename.replace('.json', '');
    const date = new Date(`${id}:00:00`);

    // process all files except active file aka this hours file
    const current = new Date().toISOString().replace(/:(.*)$/, '');
    if (current === id) return null;

    if (json.__) {
        const { totalwords, msgcounter } = json.__;
        summary.push({
            id,
            absfile,
            hour: date.getHours(),
            weekday: date.getDay(),
            totalwords,
            msgcounter,
            retweets,
        });
    }

    return json;
}
