// Twitter Bot
// https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08#.flysreo60
// https://devcenter.heroku.com/articles/node-websockets
//

console.clear();

const twit = require('twit');
const curl = require('curl');
const cliche = require('cliches');
const { sentence } = require('./getRandomSentence');

const config = require('./config.js');
const db = require('./checksumStorage');
const { track, ignore, interesting } = require('./track');
const metadata = require('./metadata');
const intersection = require('./intersection.js');
const T = new twit(config);

console.log(track);

const stream = T.stream('statuses/filter', { track });

let messageCounter = 0; // inc everytime a cliche comes in.
const messageModulus = 789; // ie 23 % 5; where 0 triggers a surreal tweet event

// this should come from a persisted register
console.log(stream);

stream.on('tweet', function (tweet) {
    const meta = metadata(tweet);
    const {
        id,
        hashtags,
        mentions,
        words,
        screen_name,
        description,
        chksum,
        lang,
        retweet,
    } = meta;

    const exists = db.checksumExists(chksum);
    const reject = [lang !== 'en', exists, retweet].filter((v) => v).length > 0;

    if (reject) return;

    const phrase = words.join(' ');
    const cliches = cliche.test(phrase);

    // a dev helper to see stream data
    // console.log('Candidate message', screen_name, messageCounter, cliches);

    if (!cliches) return;

    const rehashtags = textToHashTag(phrase, cliches);
    const filtered = filter(meta);
    const [cons, pros] = filtered;
    const total = pros - cons;
    const promote = pros > 3 || (!cons && pros > 1) || total > 2 || false;

    console.log(
        '\n>> (%s) w%s #%s @%s <%s>',
        screen_name,
        words.length,
        hashtags.length,
        mentions.length,
        `${chksum} ${messageCounter} ${messageModulus}`,
        '\n>> ' + hashtags,
        '\n>> ' + id,
        '\n>> ' + phrase,
        '\n>> ' + rehashtags,
        '\n>> ' + description,
        '\n>> ' + filtered,
        '\n== ' + promote
    );

    if (!promote) return;
    promoteId({ ...meta, rehashtags });

    if (messageCounter % messageModulus !== 0) return;
    surrealTweet();

    messageCounter += 1;
});

function surrealTweet() {
    const phrase = sentence();
    const status = generateRandomMessage(phrase);
    const params = { status };
    const path = 'statuses/update';

    console.log("Generate Surreal Tweet:\n%s\n%s", phrase, new Date().toString());

    postMessage(path, params);
    db.persistLastTweet(phrase);
}

function generateRandomMessage(phrase) {
    const tags = [
        'DicemanPoetry',
        'MadnessPassedBy',
        'SurrealNonSense',
        'Silliness',
        'StrangeProes',
        'RandomThingToSay',
    ].sort(() => Math.random() - 0.5);

    const x = tags.length / 2;
    const n = x - ((Math.random() * x) >> 0);
    const array = tags.slice(-n);
    const items = ['WritingCommunity', ...array].map((s) => `#${s}`);
    const message = [phrase.trim(), '', '', ...items].join('\n');

    return message;
}

function filter({ text, description }) {
    const string = `${text} -- ${description}`;
    const ignored = intersection(ignore, string);
    const intrested = intersection(interesting, string);
    const tracking = intersection(track, string);

    if (ignored.length) {
        console.log('!! ', ignored);
    }
    return [
        //
        ignored.length,
        intrested.length + tracking.length,
    ];
}

function promoteId({ chksum, rehashtags, screen_name, id, id_str }) {
    if (!db.persistChecksum(chksum, screen_name, id_str, rehashtags)) return;

    const [l, r] = [random(30, 10), random(90, 30)];
    console.log('Persisted %s %s\nLike: %s\nRe: %s\n\n', chksum, id, l, r);

    setTimeout(() => like(id_str, screen_name), l);
    setTimeout(() => retweetid(id_str, screen_name), r);
}

function random(max = 60, min = 15) {
    // arguments in seconds but
    // random delay as miliseconds
    const seconds = (Math.random() * (max - min) + min) >> 0;
    return seconds * 1000;
}

function like(id, name) {
    const path = 'favorites/create';
    const params = { id };
    const callback = function (e) {
        console.log('<< liked', name);
        if (e) console.log(e);
    };

    postMessage(path, params, callback);
}

function retweetid(id, name) {
    const path = 'statuses/retweet/:id';
    const params = { id };
    const callback = function (e, r) {
        console.log('<< retweeted', name);
        if (e) console.log(e);
    };

    postMessage(path, params, callback);
}

function postMessage(path, params, callback) {
    callback =
        callback ||
        function (e) {
            console.log('<< [%s]', path);
            if (e) console.log('Twitter Error', e);
        };

    T.post(path, params, callback);
}

function textToHashTag(text, phrases) {
    const sentences = phrases.map((s) => {
        // remap the re phrase to the used text
        const re = new RegExp(`(${s})`, 'i');
        return text
            .match(re)[0]
            .toLowerCase()
            .split(/\s+/g)
            .map((w) => w.replace(/./, (c) => c.toUpperCase()))
            .join('');
    });

    return sentences;
}
