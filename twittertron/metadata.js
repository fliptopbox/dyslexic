const strhash = require('string-hash');
const word = require("./word");

/* quokka inline test *!/

const sample = require('./tweet-message.json');
gethashtags(sample); //?
getmentions(sample); //?
const x = gettext(sample); //?
getwords(x); //?
metadata(sample); //?

/**/

module.exports = metadata;

function metadata(tweet) {
    const { id, id_str, lang, timestamp_ms, user } = tweet;
    const text = gettext(tweet).trim();
    const words = getwords(text);
    const mentions = getmentions(tweet);
    const hashtags = gethashtags(tweet);
    const chksum = strhash(words.join("")).toString(36);
    const retweet = tweet.retweet || /^RT\s/i.test(text) ? true : false;

    const {
        screen_name,
        description,
        followers_count,
        friends_count,
        listed_count,
        favourites_count,
        statuses_count,
    } = user;

    const metadata = {
        id,
        id_str,
        lang,
        retweet,
        screen_name,
        description,
        followers_count,
        friends_count,
        listed_count,
        favourites_count,
        statuses_count,
        timestamp_ms,
        text,
        words,
        mentions,
        hashtags,
        chksum,
    };
    return metadata;
}

function gettext(tweet) {
    const { text, extended_tweet } = tweet;
    const string = extended_tweet ? extended_tweet.full_text : text;
    return String(string).replace(/\n+/g, '');
}

function getwords(text) {
    return text
        .split(/\s+/g)
        .map(word)
        .filter(s => s);
}

function getmentions({ entities, extended_tweet }) {
    // consolidate
    // there are two possible occrances
    // const { entities = {}, extended_tweet = {} } = tweet;

    const extended = extended_tweet || { entities: { user_mentions: [] } };

    const hashes = [
        ...new Set(
            [
                ...entities.user_mentions, //
                ...extended.entities.user_mentions,
            ].map((o) => o.screen_name)
        ),
    ];
    return hashes;
}

function gethashtags({ entities, extended_tweet }) {
    // consolidate
    // there are two possible occrances
    // const { entities = {}, extended_tweet = {} } = tweet;

    const extended = extended_tweet || { entities: { hashtags: [] } };

    const hashes = [
        ...new Set(
            [
                ...entities.hashtags, //
                ...extended.entities.hashtags,
            ].map((o) => o.text)
        ),
    ];
    return hashes;
}
