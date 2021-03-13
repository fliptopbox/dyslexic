// Twitter Bot
// https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08#.flysreo60
// https://devcenter.heroku.com/articles/node-websockets
//

console.clear();

const twit = require('twit');
const rc = require('./runtime');
const config = require('./config.js');
const db = require('./checksumStorage');
const track = rc('track');
const metadata = require('./metadata');
const dev = !process.env.PORT ? true : false;

console.log(track);

const T = new twit(config);
const stream = T.stream('statuses/filter', { track });

// render metadata and dispatch result
stream.on('tweet', (e) => process.messages.emit('tweet', e));

process.messages.on('tweet', emitMessageMetadata);
process.messages.on('publish', publishTextMessage);
process.messages.on('post-message', postMessage);

function emitMessageMetadata(e) {
    const meta = { ...metadata(e) };
    process.messages.emit('message', meta);
}

function postMessage(path, params, callback) {
    callback =
        callback ||
        function (err) {
            console.log('<< [%s]', path);
            if (err) console.log('Twitter Error', err);
        };
    return dev ? callback() : T.post(path, params, callback);
}

function publishTextMessage(textmessage) {
    const status = textmessage;
    const params = { status };
    const path = 'statuses/update';

    console.log(
        '\nGenerate Surreal Tweet:',
        '\n----------------------------------\n',
        textmessage,
        '\n----------------------------------\n',
        `\n(characters: ${textmessage.length})`
    );

    postMessage(path, params);
    db.persistLastTweet(status);

    return status;
}
