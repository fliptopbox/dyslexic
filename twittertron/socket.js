const WebSocketServer = require('ws').Server;
let wss;

module.exports.init = init;
function init(server) {
    wss = new WebSocketServer({ server });
    console.log('websocket server created');

    wss.on('connection', handleConnection);
}

function handleConnection(ws) {
    console.log('|| client Set length: ', wss.clients.size);
    ws.send('welcome');

    console.log('websocket connection open');
    ws.on('message', handleMessage);
    ws.on('close', handleClose);
}

function handleClose() {
    console.log('closed');
    console.log('Number of clients: ', wss.clients.size);
}

function handleMessage(e) {
    console.log(e);
}

function broadcast(message) {
    const { clients } = wss;
    clients.forEach((c) => c.send(message));
}

// handle messages passed on from Events
//

process.messages.on('publish', broadcast);

process.messages.on('pulse', (array) => {
    const tsv = ['pulse'].concat.apply([], array).join('\t');
    broadcast(tsv);
});

process.messages.on('flow-rate', (array) => {
    broadcast(['flow', ...array].join('\t'));
});
