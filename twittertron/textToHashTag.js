
module.exports = function textToHashTag(text, phrases) {
    const sentences = phrases.map((s) => {
        // remap the re phrase to the used text
        const re = new RegExp(`(${s})`, 'i');
        return text
            .match(re)[0]
            .toLowerCase()
            .split(/\s+/g)
            .map((w) => w.replace(/./, (c) => c.toUpperCase()))
            .join('');
    });

    return sentences;
}
