const {
    alphaonly,
    vocabulary,
    word,
    paragraphs,
  consonants,
    vowels,
    words,
    whitespacing,
} = require('./article');

const sample = `


CHAPTER I.
Down the Rabbit-Hole


Alice was beginning to get very--tired of sitting by her sister on the
bank, and of having nothing to do: once or    twice she had peeped into
the book her sister was reading, but it had no pictures or
conversations in it, “and what is the use of a book,” thought Alice
“without pictures or     conversations?”

So she was considering in her own mind (as well as she could, for the
hot day made her feel very sleepy and stupid), whether the pleasure of
making a daisy-chain would be worth the trouble of getting up and
picking the daisies, when suddenly a White Rabbit with pink eyes ran
close by her.


`;

describe('description', () => {
    test('collates multiline plaintext into paragraph array', () => {
        expect(paragraphs(sample)).toHaveLength(3);
    });

    test('replace double space and double hyphens', () => {
        expect(whitespacing('alpha-beta')).toEqual('alpha-beta');
        expect(whitespacing('alpha--beta')).toEqual('alpha -- beta');
        expect(whitespacing('alpha  beta')).toEqual('alpha beta');
    });

    test('identifies a valid word object', () => {
        expect(word('Rabbit-Hole')).toBe('Rabbit-Hole');
        expect(word('alpha')).toBe('alpha');
        expect(word('alpha bravo')).toBeNull();
        expect(word('--')).toBeNull();
        expect(word('No.')).toBe('No.');
        expect(word('No. 1')).toBeNull();
    });

    test('get strictly alphabetical word', () => {
        expect(alphaonly('"alpha')).toBe('alpha');
    });

    test('return an array of word objects', () => {
        const p = paragraphs(sample).map(words);
        expect(p[0]).toHaveLength(5);
        expect(p[1]).toHaveLength(57);
        expect(p[2]).toHaveLength(55);
    });
});

describe('corpus metadata', () => {
    test('returns the vocabulary of a corpus', () => {
        const p = 'Alpha Charlie beta charlie'.split(' ');
        const result = vocabulary(p);
        const expected = { alpha: 1, charlie: 2, beta: 1 };
        expect(result).toEqual(expected);
    });

    test('vocabulary from test sample with complex words', () => {
        const p = paragraphs(sample).map(words);
        const result = vocabulary(p[1]);

        expect(result['"and']).toBeUndefined();
        expect(result['and']).toBe(2);
        expect(result['alice']).toBe(2);
    });

    test('collated vocabulary of frequency', () => {
        const p = paragraphs(sample).map(words).flat();
        const entries = Object.entries(vocabulary(p));
        const sorted = entries.sort((a, b) => b[1] - a[1]);

        expect(sorted).toHaveLength(79);

        expect(sorted[0]).toEqual(['the', 8]);
        expect(sorted[1]).toEqual(['of', 5]);
    });

    test('something', () => {
        expect(vowels('alphabetical')).toBe('aei');
        expect(consonants('alphabetical')).toBe('lphbtcl');
    });
});
