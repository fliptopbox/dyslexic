/*
 * collect data relative the velocity
 * and relevance of incoming tweets
 */

if (process.messages) {
    console.log('Register listener flowrate()');
    process.messages.on('message', flowrate);
}

const rc = require('./runtime');
const { ma } = require('moving-averages');

let last = new Date().valueOf();
let timediff = [];
let mm = { max: 0, min: 100 };
let messages = 0;

module.exports = flowrate;
function flowrate() {
    const { flowrate, emasize, history, preroll, flowpermessage } = rc("flowrate");
    if (!flowrate) return;

    messages += 1;

    const dt = new Date();
    const ts = dt.valueOf();
    const diff = ts - last;
    last = ts;

    const sec = dt.getSeconds();
    const minute = dt.getMinutes();
    const hour = dt.getHours();
    const day = dt.getDate();
    const weekday = dt.getDay();

    let { min, max } = mm;
    min = Math.min(min, diff);
    max = Math.max(max, diff);
    mm = { min, max };

    const row = [diff, diff / max, weekday, day, hour, minute, sec, max, min];

    timediff.push(row);
    timediff = timediff.slice(-history);

    const totals = timediff.map((a) => a[0]);
    const { length } = timediff;

    if (length < preroll) return;

    let sum = totals.reduce((a, c) => a + c, 0);
    let avg = sum / length;
    let RA = ma(totals, emasize).slice(-1)[0];

    // console.log( diff, diff/max, weekday, day, hour, minute, sec, max, min);
    // supress messages stat report by modulus
    if(flowpermessage && (messages % flowpermessage !== 0)) return;
    // messages = messages % flowpermessage;

    process.messages.emit("flow-rate", [diff, max, avg, RA] )
    bar(diff, max, avg, RA);
}

function bar(diff, max, avg, SMA) {
    const ratio = diff / max;
    const { barwidth, showflow, spikeratio, barchar } = rc("flowrate");
    const length = barwidth || 80;
    const [solid, bg, vert, over, smachar] = barchar;
    const pipes = Math.ceil(ratio * length);

    const mean = Math.ceil((avg / max) * length);
    const sma = Math.ceil((SMA / max) * length);

    const ascii = Array(pipes).fill(solid);
    const blank = Array(length - pipes).fill(bg);

    const flux = mean / sma;
    const spike = flux - spikeratio < spikeratio ? 'x' : ' ';

    let graph = [...ascii, ...blank].slice(0, length);
    graph[mean] = vert;
    graph[sma] = smachar;
    if (sma === mean) graph[sma] = over;

    graph = graph.join('');

    if (showflow) {
        console.log(`${graph} ${spike} ${flux.toFixed(2)}`);
    }

    return [pipes, length, mean, sma];
}
