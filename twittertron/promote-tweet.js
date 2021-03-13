/*
 * This modules takes a tweet message
 * evaluates the author and contents
 * and likes/retweets the message
 * or ignores it.
 */

const rc = require('./runtime');
const db = require('./checksumStorage');
const cliche = require('cliches');
const intersection = require('./intersection.js');
const { track, ignore, interesting } = rc();
const textToHashTag = require('./textToHashTag');

if (process.messages) {
    console.log('Register listener promoteTweet()');
    process.messages.on('message', promoteTweet);
}

function promoteTweet(e) {
    if (reject(e)) return;

    const { words, chksum } = e;
    const phrase = words.join(' ');
    const cliches = cliche.test(phrase);

    if (!cliches?.length) return;

    const [cons, pros] = filter(e);
    const total = pros - cons;
    const promote = pros > 3 || (!cons && pros > 1) || total > 2 || false;
    const rehashtags = textToHashTag(phrase, cliches);

    console.log('Candidate', promote, chksum, phrase);
    promoteId({ ...e, rehashtags, phrase });
}

function reject(e) {
    const { retweet, lang, chksum } = e;
    const exists = db.checksumExists(chksum);

    const conditions = [
        lang !== 'en', // not english
        exists, // not unique message
        retweet, // not virgin message
    ];

    return conditions.filter((v) => v).length > 0;
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

function promoteId(object) {
    const { chksum, screen_name, id, id_str } = object;
    if (!db.persistChecksum(object)) return;

    const ms = random(30, 10);
    const rt = ms + 1000 * 5;

    setTimeout(() => like(id_str, screen_name), ms);
    setTimeout(() => retweetid(id_str, screen_name), rt);

    console.log('Persisted %s %s\nLike: %s\nRe: %s\n\n', chksum, id, ms, rt);
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
    process.messages.emit('post-message', path, params, callback);
}
