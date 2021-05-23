const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;

require('./messages');
require('./bot');
require('./word-usage');
require('./random-tweet');
require('./flow-rate');
require('./promote-tweet');

const socket = require('./socket');
const filename = 'public';
const fullpath = path.join(__dirname, filename);

const app = express();
app.use(express.static(fullpath));

const server = http.createServer(app);
server.listen(port, greeting);

console.log('http server listening on %d', port);

socket.init(server);

function greeting() {
    console.log(`WebServer listening on port: ${port}`);
}

//const wss = new WebSocketServer({ server });
//console.log('websocket server created');

//wss.on('connection', handleConnection);

//function handleConnection(ws) {
//    console.log('|| client Set length: ', wss.clients.size);
//    ws.send('welcome');

//    console.log("websocket connection open")
//    ws.on('message', handleMessage);
//    ws.on('close', handleClose);
//}

//function handleClose() {
//    console.log('closed');
//    console.log('Number of clients: ', wss.clients.size);
//}

//function handleMessage(e) {
//    console.log(e);
//}

//function broadcast(message) {
//    const { clients } = wss;
//    clients.forEach((c) => c.send(message));
//}

//// handle messages passed on from Events
////

//process.messages.on('publish', broadcast);

//process.messages.on('pulse', (array) => {
//    const tsv = ['pulse'].concat.apply([], array).join('\t');
//    broadcast(tsv);
//});

//process.messages.on('flow-rate', (array) => {
//    broadcast(['flow', ...array].join('\t'));
//});
