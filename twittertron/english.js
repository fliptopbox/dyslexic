module.exports = function english(text = "", min = 1) {
    // Search for English conjunctives
    //
    // if the text is english return matched conjunctives
    // otherwise return falsey value
    // NOTE: this will fail for short phrases

    const eng = /\b(in|[std]o|can|[io]f|an|as|are|and|will|I|they?|is|m[ey]|your?)\b/ig;
    const keys = String(text || "")
        .split(" ")
        .map((s) => (eng.test(s) ? s : null))
        .filter((s) => s);

    return keys.length >= min ? keys : null;
}

