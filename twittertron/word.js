module.exports = word;
function word(string) {
    // returns a cleaned word String if
    // the @string is alphabetic OR alphanumeric
    //
    // purely numeric, or emoticons or emoji (aka unicode)
    // characters, or decoratored or punctuated words will be rejected.
    // (see unit test for comprehensive sample)
    //

    string = `${string}`.trim();

    if (!string) return;
    if (string.length > 32) return;

    // normalize punctuation characters
    string = string.replace(/[…]+/g, ' ... ');
    string = string.replace(/[—|–]+/g, '-');
    string = string.replace(/[`’‘]+/g, "'"); // `
    string = string.replace(/[“”]+/g, `"`);

    // HTML entities and links and unicode characters
    if (/^&\w+;$/.test(string)) return;
    if (/https?/i.test(string)) return;
    if (/[\u2000-\uFFFF]+/.test(string)) return;

    // interword punctuation eg. alpha!beta
    if (/\w([\\\/!\?#;:\*\."]+)\w/.test(string)) return;

    // numbers in the word eg. 12345
    if (/^[\d]+$/.test(string)) return;

    // currency 1,234.00 and time 12:34:56
    if (/\d+[,:\-]\d+/.test(string)) return;

    // metadata prefixes
    if (/^[\.~@#\_\-]+/.test(string)) return;

    const re = /(^\W+|\W+$)/g;
    const text = string.replace(re, '');

    return text || undefined;
}
