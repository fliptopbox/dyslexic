const paragraphs = [
7,   1,   4,   3,   5,   1,   5,   6,   8,   9,   6,   5,
          5,   5,   6,   5,   6,   4,   5,  57,  55, 141,  21,  39,
        141,  49, 131,  78,  47,  24, 167, 120,  45, 109, 135,  82,
        131,  44,   0,   0,   0,  14, 118, 101, 112,  82,  86,  12,
          0,   0,   0,   6,  35, 101,  38,   9,   2,   6,  38,  41,
         62, 134, 123, 183,   5,  11,   4,   6,  10,   4, 153, 109,
         90, 128,  49,  61, 123,  97,  19, 129,  40, 150,  81,  52,
          8,  31, 101,  73,  65,   7,  14,   6,  32,   5,  14,  30,
         55,  18,  25,  42,
];


const slope = initializeGradient(29.11, paragraphs)

paragraphs.map(slope); //?


function initializeGradient(wordmean, paragraphs) {
    const firstIndex = paragraphs.findIndex((v) => v >= wordmean);
    return function (value, index) {
        const current = index / firstIndex;
        const incl = Math.tanh(current ** 2 * 3);
        const alt = value >= wordmean ? value : 0;
        return incl > 0.96 ? value : alt;
    };
}

/*
This is a post-process utility.
It cleans word noise from the start of a text.

Applying the slope gradient to the word array
will eliminate the words that preface the content.

The relevance is derived from a TANH curve, which
increse the probability of using a paragraph as it approaches
the first paragraph instance that exceeds average word usage.

Here is the gradient:
https://www.desmos.com/calculator/zsaht6qrfk

*/


