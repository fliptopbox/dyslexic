const fs = require('fs');
const path = require('path');
const w = require('./word');
const rc = require("./runtime");

let glossary = {};
let state = {
    totalwords: 0,
    msgcounter: 0,
};

let prevFilename = null;
let savetimer = null;

const datafolder = '../data/popularity/';
const saveDelay = 10 * 1000; //seconds between saves

glossary = load();

if (process.messages) {
    console.log('Register listener wordUsage()');
    process.messages.on('message', wordUsage);
}

module.exports = wordUsage;
function wordUsage(e) {
    const { showsummary, showhead } = rc("word-usage");
    const { words } = e;

    words.forEach((s) => {
        const key = s.toLowerCase();
        const value = glossary[key] || 0;
        glossary[key] = value + 1;
    });

    state.msgcounter += 1;
    state.totalwords += words.length;

    if (!savetimer) {
        savetimer = setTimeout(() => {
            head(showhead);
            summary(showsummary);
            save();
            clearTimeout(savetimer);
            savetimer = null;
        }, saveDelay);
    }
}

function summary(show) {
    if (!show) return;

    const { msgcounter, totalwords } = state;
    console.log(
        `
        Messages         [%s]
        Total words      [%s]
        Mean words/msg   [%s]
        Glossary length  [%s]

        `,
        msgcounter,
        totalwords,
        (totalwords / msgcounter) >> 0,
        Object.keys(glossary).length
    );
}

function head(n = 200) {
    if (!n) return;

    let array = Object.entries(glossary);
    if (array.length < n) return;

    const { msgcounter, totalwords } = state;
    const wc = (totalwords / msgcounter / 2) >> 0;
    const min = ([_, v]) => v > wc;
    const order = (a, b) => b[1] - a[1];

    console.log(array.filter(min).sort(order).slice(0, n));
}

function datestamp(f = 'yyyymnddhh') {
    const iso = new Date().toISOString(); //?
    const parts = iso.split(/[:tz\-\.]+/gi);
    const [yyyy, mn, dd, hh, mm, ss, ms] = parts;
    const object = { yyyy, mn, dd, hh, mm, ss, ms };
    const keys = Object.keys(object);

    let string = String(f);

    keys.forEach((k) => (string = string.replace(k, object[k])));

    return string;
}

function setFilename(ext = 'json') {
    const ts = datestamp('yyyy-mn-ddThh');
    if (prevFilename !== ts) {
        console.log('New log filename. reseting total counters');
        state.totalwords = 0;
        state.msgcounter = 0;
        glossary = {};
    }

    prevFilename = ts;
    return `${ts}.${ext}`;
}

function load() {
    const filename = setFilename();
    const fullpath = path.join(__dirname, datafolder, filename);
    let object;

    console.log('Loading %s', filename);

    try {
        const string = fs.readFileSync(fullpath, 'utf8');
        object = JSON.parse(string);

        console.log('Previous state:', object.__);

        const { msgcounter, totalwords } = object.__;
        state = { ...state, msgcounter, totalwords };

        delete object.__;
    } catch (e) {
        console.log(e);
        console.log('Error loading JSON:', datafolder, filename);
        object = {};
    }

    console.log(
        'Setting variables total: %s - msgs: %s',
        state.totalwords,
        state.msgcounter
    );

    return object;
}

function save() {
    // cast array to Object
    const minwordcount = 30;
    const entries = Object.entries(glossary).filter(
        ([_, v]) => v > minwordcount
    );

    const filename = setFilename();
    const fullpath = path.join(__dirname, datafolder, filename);

    const object = Object.fromEntries(entries);

    object.__ = { ...state };

    const content = JSON.stringify(object);
    const options = { encoding: 'utf8', flag: 'w' };

    try {
        fs.writeFileSync(fullpath, content, options);
    } catch (e) {
        console.log('Error:', e.stack);
    }

    console.log(
        '>> Persisting to: (%s) %s',
        state.msgcounter,
        datafolder,
        filename
    );
}
