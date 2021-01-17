// Twitter Bot
// https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08#.flysreo60
//

console.clear();

const twit = require('twit');
const config = require('./config.js');
const cliche = require('cliches');
const db = require('./checksumStorage');
const track = require('./track');
const metadata = require('./metadata');
const T = new twit(config);

console.log(track);

const stream = T.stream('statuses/filter', { track });

let i = 0;

// this should come from a persisted register

stream.on('tweet', function (tweet) {
    const meta = metadata(tweet);
    const {
        id,
        hashtags,
        mentions,
        words,
        id_str,
        screen_name,
        chksum,
        lang,
        retweet,
    } = meta;

    const exists = db.checksumExists(chksum);
    const reject = [lang !== 'en', exists, retweet].filter((v) => v).length > 0;

    if (reject) return;
    if (!i && hashtags && mentions) {
        i += 1;
        // console.log(JSON.stringify(tweet, null, 4));
        console.log(JSON.stringify(meta, null, 4));
    }

    const sentence = words.join(' ');
    const cliches = cliche.test(sentence);

    if (!cliches) return;

    console.log(
        '\n>> (%s) w%s #%s @%s <%s>',
        screen_name,
        words.length,
        hashtags.length,
        mentions.length,
        chksum,
        '\n>> ' + hashtags,
        '\n>> ' + id,
        '\n>> ' + sentence,
        '\n>> ' + textToHashTag(sentence, cliches)
    );

    promoteId(meta);
});

function promoteId({ chksum, screen_name, id, id_str }) {
    if (!db.persistChecksum(chksum, screen_name, id_str)) return;

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

    T.post(path, params, callback);
}

function retweetid(id, name) {
    const path = 'statuses/retweet/:id';
    const params = { id };
    const callback = function (e, r) {
        console.log('<< retweeted', name);
        if (e) console.log(e);
    };

    T.post(path, params, callback);

    // T.post('statuses/retweet/:id', { id }, function (err, response) {
    //     if (response) {
    //         console.log('Retweeted!!!', response);
    //     }
    //     // if there was an error while tweeting
    //     if (err) {
    //         console.log(
    //             'Something went wrong while RETWEETING... Duplication maybe...'
    //         );
    //     }
    // });
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
