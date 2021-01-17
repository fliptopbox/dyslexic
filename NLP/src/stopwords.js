import contraction from './contraction.js';
import wordArray from './stopwords_array.js';
import sample from "./sample.text.js";

const cache = wordArray
    .filter((s) => s && s.length > 2 && /[aeiou]/i.test(s))
    .filter((s) => !/\w+(ly|ings?)$/i.test(s))
    .filter(contraction);

/*
    Stopwords

    - remove words that contain numbers
    - remove all the contractions
    - remove words without vowels (malformed words)
    - remove short words ie. less than 3 characters
 */

export function stopwords() {
    return cache;
}

/*
    paragraphs

    Given an article:
    - split the content into paragraphs
 */
export function paragraphs (article) {
    return article.split(/\n+/g).filter(s => s);
}



function words (text) {
    const mem = {};
    return text.trim().split(/\s+/g)
        .map(s => {
            const word = `${s.trim()}`;
            const normal = word.toLowerCase().replace(/(^\W+|\W+$)/g, "");
            const stop = mem[normal] || cache.includes(normal);
            return {word, normal, stop}
        });
}
/**/

cache;
const w = words(sample); //?
const array = w
    .filter(o => !o.stop)
    .sort((a,b) => a.normal < b.normal ? 1 : -1); //?

const counters = {};
array.forEach(e => {
    counters[e.normal] = counters[e.normal] || 0;
    counters[e.normal] += 1;    
});
Object.entries(counters).sort((a,b) => (a[1] < b[1] ? 1 : -1));//?
// paragraphs(sample); //?





/**/