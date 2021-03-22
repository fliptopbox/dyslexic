const fileToLines = require('./fileToLines');

module.exports = metadata;
function metadata(absFilename, front = {}) {
    // extract the header metadata
    // parse everything upto the start marker
    // from the end reverse to find the end marker
    // extract the content between the markers

    const lines = fileToLines(absFilename);
    const bottomoffset = 650;
    const { length } = lines;
    const head = lines.slice(0, 50);
    const tail = lines.slice(-bottomoffset);

    const startof = /start of (\w+ )?project/i;
    const endof = /end of (\w+ )?project/i;

    let dict = {};

    const start =
        1 +
        head.findIndex((s) => {
            const meta = keyValuePair(s);
            if (meta) dict = { ...dict, ...meta };

            return startof.test(s);
        });

    let end = tail.findIndex((s) => endof.test(s));
    end = end ? length - bottomoffset + end : end;

    const corpus = lines.slice(start, end);
    const plaintext = corpus.join('\n').trim();
    const size = plaintext.length;
    const filename = absFilename;

    return {
        frontmatter: { ...front, ...dict, filename, size, start, end },
        plaintext,
    };
}

function keyValuePair(s = '') {
    if (!/:/.test(s)) return null;
    const match = String(s || '').match(/^(\w[^:,'";\.]+):\s+(.*)/i);
    const [_, key, value] = match || [];
    return _ ? { [key.toLowerCase().replace(/\s+/g, '')]: value } : null;
}
