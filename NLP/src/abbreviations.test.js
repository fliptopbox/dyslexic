const {
    addAbbrieviation,
    extract,
    list,
    unpunctuate,
    expand,
} = require('./abbreviations');

describe('description', () => {
    test('something', () => {
        const collection = list();
        expect(collection).toBeInstanceOf(Object);

        const keys = Object.keys(collection);
        expect(keys.length).toBeGreaterThan(1300);
    });

    test('simple text replacememnt', () => {
        expect(unpunctuate('2N8,')).toMatch(/tonight,/i);
        expect(unpunctuate('2NTE,')).toMatch(/tonight/i);
        expect(unpunctuate('LOL')).toMatch(/laugh out loud/i);
        expect(unpunctuate('WTF')).toMatch(/what the fuck/i);
    });

    test('punctutated repacement preserves punctuation', () => {
        expect(unpunctuate('abcx')).toEqual('abcx');
        expect(unpunctuate('abcx,')).toEqual('abcx,');
    });

    test('can add new abbriviations', () => {
        expect(unpunctuate('QQQ')).toMatch(/qqq/i);
        addAbbrieviation('QQQ', 'queen');
        expect(unpunctuate('QQQ')).toMatch(/queen/i);
    });

    test('can replace former abbriviations', () => {
        expect(unpunctuate('ABC')).toMatch(/already been chewed/i);
        addAbbrieviation('ABC', 'alpha bravo charlie');
        expect(unpunctuate('ABC')).toMatch(/alpha bravo charlie/i);
    });

    test('should replace abbrs within sentence', () => {
        const text = 'see you 2N8, imma 2M2H be there at ... 404 CU L8R!';
        const expected = [
            'see',
            'you',
            'Tonight,',
            'imma',
            'Too much to handle',
            'be',
            'there',
            'at',
            '...',
            "I don't know",
            'See you',
            'Later!',
        ];

        expect(expand(text)).toEqual(expected);
    });

    test('should extract a single abbr', () => {
        const text = 'CUL8R';
        const result = extract(text);
        const expected = [['CUL8R', 'See you later']];
        expect(result).toEqual(expected);
    });

    test('should extract all abbreviations from a senetence', () => {
        const text = 'CUL8R DTR, or lets get CRZ on the WE!';
        const result = extract(text);
        const expected = [
            ['CUL8R', 'See you later'],
            ['DTR', 'Define the relationship'],
            ['CRZ', 'Crazy'],
            ['WE', 'Whatever'],
        ];
        expect(result).toEqual(expected);
    });
});
