#!/bin/node
/*


    Run as standalone singleton to leech random phrases
    from the remote host. The server is not really generating
    sentences, rather recycling randomly writern phrases.

    With enough polls we will be able to leech all text


*/
const curl = require('curl');
const english = require('./english');
const u = require("./checksumStorage");
const fn = (v) => u.appendToFile("\n" + v, "random.txt");

const h2 = /<h2>(.*)<\/h2>/gi;
const url = 'http://www.madsci.org/cgi-bin/lynn/jardin/SCG';
let timer;


leech(3500, fn);

function log (s, pre = ">>") {
    console.log(pre, " ", s);
    return s;
}

function recurl(callback = null) {
    curl.get(url, {}, (e, a, html) => {
        let phrase = html.replace(/\n+/g, ' ').match(h2);

        if (!phrase || !phrase.length) {
            console.log('Error :(', html);
            return;
        }

        phrase = phrase[0].replace(/<[^>]+>/g, '').trim(); //?

        if (!english(phrase)) return;

        if(typeof callback === "function") {
            log(phrase, "fn");
            return callback(phrase);
        }

        return log(phrase);
    });
}

function leech(ms, oneach = null) {
    if(!ms) {
        console.log("Stop interval");
        clearInterval(timer);
        return;
    }

    timer = setInterval(() => recurl(oneach), ms);
}

