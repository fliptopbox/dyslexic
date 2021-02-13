var oxymoron = require('./oxymorons');

describe('description', () => {
    test('nothing returned for no matches', () => {
        expect(oxymoron()).toBeNull();
        expect(oxymoron('   ')).toBeNull();
        expect(oxymoron('very funny')).toBeNull();
    });

    test('array of phrases for matched phrases', () => {
        const orig = 'They BEHAVE badly today, a true story';
        const result = oxymoron(orig);
        const expected = {
            orig,
            matches: ['behave badly', 'true story'],
        };
        expect(result).toEqual(expected);
    });
});
