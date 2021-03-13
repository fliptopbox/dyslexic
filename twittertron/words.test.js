const word = require('./word');

describe('Word normal', () => {
    test('a set of normalization tests', () => {
        illegal().forEach((s) => expect(word(s)).toBeUndefined());

        expect(word('i’m')).toBe("i'm"); //?
        expect(word('here,')).toBe('here'); //?
        expect(word('here:')).toBe('here'); //?
        expect(word('at.')).toBe('at'); //?
        expect(word('"the')).toBe('the'); //?
        expect(word('is...)')).toBe('is'); //?
        expect(word('h8')).toBe('h8'); //?
        expect(word('cul8r')).toBe('cul8r'); //?
    });
});

function illegal() {
    return Object.keys({
        1: 194,
        50: 230,
        100: 112,
        1906: 41,
        2021: 154,
        '#2014_tet_not_included': 51,
        '#hashTag': 123,
        '#イェダム': 164,
        '#トレジャー': 78,
        '#방예담': 211,
        '#트레저#イェダム': 43,
        '#트레저': 254,
        '&amp;': 123,
        '(m.a.s.h.)': 31,
        ',': 123,
        '.': 123,
        '...': 123,
        '.plz': 71,
        '12:34': 123,
        '2,766,471': 123,
        '2021)congratulations!🎊🥳🐰👑no': 123,
        ';)': 123,
        '@_jinyoondara_': 213,
        '@domainAt': 123,
        '@klmcginnis': 36,
        '@mamataofficial': 101,
        '@ruruglxy': 46,
        'acad/writing': 222,
        'announcement!!i': 87,
        'assignments📒analysis': 74,
        'before!but': 35,
        'clarifications💌just': 145,
        'critique📒reflection': 74,
        'dashing#treasure': 62,
        'dynamic#bangyedam': 192,
        'effectively.#sentences_rules#writing_interest_ideas#effectively_sentences_https://t.co/4hgz0du1kd': 52,
        'engage.❔writing': 40,
        'essay?me': 163,
        'essay💽movie': 74,
        'exposed!in': 61,
        'handling;#midterm#essay': 123,
        'help!💚editing/layout/design': 221,
        'https://t.co/7uanor6q4i': 34,
        'https://t.co/aclb016uls': 216,
        'https://t.co/vaqqefncnkgoodreads': 34,
        'law."thank': 123,
        'life.#2014_tet_not_included': 44,
        'news!today': 47,
        'review📒modules': 74,
        'royalwriters11@gmail.com': 123,
        'services:✅poster✅infographic✅ppt✅brochure✅logo✅paraphrasing✅proofreading': 222,
        'story+message❤️totally': 40,
        'there?write': 143,
        'thriller."#kindle': 34,
        'writing/language/words': 123,
        'you.*#comicbook': 67,
        '|': 123,
        '✅transcribing✅module✅essay✅reqs✅assignment➕more!!💯legit!': 222,
        '👇👇https://t.co/t0qdsn8bmf': 163,
        '👉🏻#academateproofs👈🏻https://t.co/ajzxlofg3a': 169,
        '😭': 123,
        __: { totalwords: 1043487, msgcounter: 60054 },
    });
}
