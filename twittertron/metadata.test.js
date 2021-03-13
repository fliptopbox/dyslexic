const m = require('./metadata');
const schema = require('./tweet-message.json');
const metaobject = {
    chksum: '1w3avqx',
    description: 'Twitter feed of https://instagram.com/custommagic.cards/',
    favourites_count: 5425,
    followers_count: 38,
    friends_count: 163,
    hashtags: [
        'mtg',
        'magicthegathering',
        'custommtg',
        'custommagic',
        'custommagiccard',
        'custommagicthegathering',
        'flash',
    ],
    id: 1350808856692224000,
    id_str: '1350808856692224010',
    lang: 'en',
    listed_count: 0,
    mentions: ['joeschobo'],
    retweet: false,
    screen_name: 'custommagiccard',
    statuses_count: 1521,
    text:
        'Give your spells flash with this futuristic artifact creature designed by @joeschobo #mtg #magicthegathering #custommtg #custommagic #custommagiccard  #custommagicthegathering #flash https://t.co/mKor8NVQyW',
    timestamp_ms: '1610892902907',
    words: [
        'Give',
        'your',
        'spells',
        'flash',
        'with',
        'this',
        'futuristic',
        'artifact',
        'creature',
        'designed',
        'by',
    ],
};

describe('Metadata', () => {
    test('test stub data has not changed', () => {
        const tweet = { ...schema };
        const result = m(tweet);
        expect(result).toEqual(metaobject);
    });

    test('predictable schema output', () => {
        const tweet = { ...schema };
        tweet.text = 'alpha bravo charlie delta';
        tweet.user.description = 'kilroy was here';
        tweet.extended_tweet.full_text = 'alpha bravo charlie delta';

        const meta = { ...metaobject };
        meta.chksum = '142w4wp';
        meta.description = 'kilroy was here';
        meta.text = 'alpha bravo charlie delta';
        meta.words = meta.text.split(' ');

        const result = m(tweet);
        const expected = { ...meta };
        expect(result).toEqual(expected);
    });

    test('ignores number words from output', () => {
        const tweet = { ...schema };
        tweet.text = 'alpha 2021 charlie delta';
        tweet.user.description = 'kilroy was here';
        tweet.extended_tweet.full_text = 'alpha 2021 charlie delta';

        const meta = { ...metaobject };
        const stings = ['alpha', '2021', 'charlie', 'delta'];
        meta.chksum = '1evukr5';
        meta.description = 'kilroy was here';
        meta.text = stings.join(' ');
        meta.words = ['alpha', 'charlie', 'delta'];

        const result = m(tweet);
        const expected = { ...meta };
        expect(result).toEqual(expected);
    });
});
