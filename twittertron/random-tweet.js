const fs = require('fs');
const path = require('path');
const rc = require('./runtime');

const cliche = require('cliches');
const { pascalCase } = require('pascal-case');
const { sentence } = require('./getRandomSentence');
const oxymoron = require('../NLP/src/oxymorons');

const cachedOxymorons = load();

let messageCounter = 0;
let { messageModulus } = rc('runtime') || 5000;

if (process.messages) {
    console.log('Register listener randomTweet()');
    process.messages.on('message', randomTweet);
}

function trigger(/* args */) {
    if (arguments.length) {
        console.log.call(console, ...arguments);
        process.messages.emit('pulse', [...arguments]);
        return (messageCounter += 1);
    }

    messageCounter += 1;
    if (messageCounter < messageModulus) return false;

    messageCounter = 0;
    return true;
}

function randomTweet(e) {
    // update this local script scope value
    messageModulus = rc('runtime').messageModulus;
    const progress = messageCounter / messageModulus;
    const c = cliche.test(e.text);
    const o = oxymoron(e.text);
    const { id } = e;

    if (c) trigger('Cliche', c.map(pascalCase), id, progress);
    if (o) trigger('Oxymoron', o.matches.map(pascalCase), id, progress);

    return trigger() ? publishMessage() : null;
}

function publishMessage() {
    console.log('Generate random messages', messageCounter, messageModulus);
    const generator = [oxymoronMessage, randomMessage];
    const index = ((Math.random() * 100) >> 0) % generator.length;
    const message = generator[index]();

    process.messages.emit('publish', message);
    messageCounter = 0;
}

function weekdayWord() {
    const names = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const i = new Date().getDay();
    return names[i];
}

function weekdayHash() {
    const day = weekdayWord();
    const sentences = [
        `${day}Bloody${day}`,
        `Another${day}`,
        `Its${day}AllDay`,
        `${day}Again`,
        `${day}IsAlmostYesterday`,
        `TommorrowIsNot${day}`,
        `Cancel${day}`,
        `${day}HatesMe`,
    ];
    const i = (Math.random() * 1000) % sentences.length >> 0;
    return sentences[i];
}

function hmmmmm(prefix = 'H', nth = 'm') {
    const array = [...Array(((Math.random() * 16) >> 0) + 2)];
    const trailing = array.map(() => nth).join('');
    return prefix + trailing;
}

module.exports.randomMessage = randomMessage;
function randomMessage(m = 0) {
    const text = sentence(m);
    const tags = [
        'DicemanDialogue',
        'SurrealNonsense',
        'StrangeProes',
        'PeculiarProes',
        hmmmmm(),
        'RandomThingToSay',
        weekdayHash(),
    ].sort(() => Math.random() - 0.5);

    const x = tags.length / 2;
    const n = x - ((Math.random() * x) >> 0);
    const array = tags.slice(-n);
    const hashtags = ['WritingCommunity', ...array]
        .map((s) => `#${s}`)
        .slice(0, 5)
        .sort(() => Math.random() - 0.5);

    const textlines = `${text}\t`.split('\t');
    const message = [...textlines, '', '', ...hashtags].join('\n');

    return message;
}

let oxyhistory = [];
function oxymoronMessage() {
    const [text, hash] = getOxyMessage();
    const index = oxyhistory.indexOf(text);

    if (index + 1) {
        console.log('Already used', index, text);
        return oxymoronMessage();
    }

    // add next message and trim history
    oxyhistory = [...oxyhistory, text].slice(-20);

    const labels = ['WritingCommunity', 'Oxymoron', hash]
        .map((s) => `#${s}`)
        .sort((_, i) => i && Math.random() - 0.5)
        .join('\n');

    return `${text}\n\n${labels}`;
}

function getOxyMessage() {
    const len = cachedOxymorons.length;
    const index = ((Math.random() * 1000) >> 0) % len;
    return cachedOxymorons[index];
}

function load(filename = 'oxymoron.txt') {
    const fullpath = path.join(__dirname, filename);
    let plaintext;

    try {
        plaintext = fs.readFileSync(fullpath, 'utf8', { flag: 'r' });
    } catch (e) {
        console.log('Error loading JSON:', filename);
        return;
    }

    if (!plaintext) return;

    const legal = (s) => /^\w/i.test(s);
    const format = ([by, text]) => [`"${text}" - ${by}`, `${pascalCase(by)}`];

    const lines = plaintext
        .split('\n')
        .filter(legal)
        .map((s) => s.split('\t'))
        .map(format);
    return lines;
}
