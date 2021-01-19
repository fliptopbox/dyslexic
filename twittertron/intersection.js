module.exports = function intersection(array, text) {
    // a is a list of strings (needles)
    // b is a paragraph of text (haystack)
    // returns a list of needles

    if (!array || !text) return;

    const string = '' + text
        .trim()
        .replace(/\n+/g, ' ')
        .toLowerCase() + '';

    const rexs = array.map((s) => {
        const re = new RegExp(`${s}`, 'mgi');
        return re;
    });

    const matches = rexs
        .map((re, i) => {
            const exists = re.test(`${string}`);
            return exists ? i : -1;
        })
        .filter((s) => (s + 1))
        .map((i) => array[i]);

    return matches;
}
