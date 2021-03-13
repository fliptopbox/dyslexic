const WebSocket = require('ws');
const socketServer = new WebSocket.Server({ port: 3030 });

socketServer.on('connection', handleConnection);

function handleConnection(ws) {
    console.log('|| client Set length: ', socketServer.clients.size);
    ws.send('welcome');

    ws.on('message', handleMessage);
    ws.on('close', handleClose);
}

function handleClose() {
    console.log('closed');
    console.log('Number of clients: ', socketServer.clients.size);
}

function handleMessage(e) {
    console.log(e);
}

function broadcast(message) {
    const { clients } = socketServer;
    clients.forEach((c) => c.send(message));
}

// handle messages passed on from Events
//

process.messages.on('publish', broadcast);

process.messages.on('pulse', (array) => {
    const tsv = ['pulse'].concat.apply([], array).join('\t');
    broadcast(tsv);
});

process.messages.on('flow-rate', array => {
  broadcast(["flow", ...array].join("\t"));
});
