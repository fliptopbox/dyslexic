const fs = require('fs');
// const path = require('path');

module.exports = fileToLines;
function fileToLines(absFilename) {
    const text = fs
        .readFileSync(absFilename, 'utf8')
        .split('\n')
        .map((s) => s.replace(/\s+$/, ""));

    return text;
}
