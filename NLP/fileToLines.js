const fs = require('fs');
const path = require('path');

module.exports = fileToLines;
function fileToLines(filename) {
    const text = fs
        .readFileSync(path.join(__dirname, filename), 'utf8')
        .split('\n')
        .map((s) => s.replace(/\s+$/, ""));

    return text;
}