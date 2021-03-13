const fs = require('fs');
const path = require('path');

function config(key = null) {
    const fn = path.join(__dirname, 'runtime.json');
    const text = fs.readFileSync(fn, 'utf8');
    const json = JSON.parse(text);

    return key && json[key] || json;
}

module.exports = config;
