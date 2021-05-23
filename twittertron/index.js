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

const filename = 'public';
const fullpath = path.join(__dirname, filename);

const app = express();
app.use(express.static(fullpath));

const server = http.createServer(app);
server.listen(port, greeting);
console.log('http server listening on %d', port);

const socket = require('./socket');
socket.init(server);

function greeting() {
    console.log(`WebServer listening on port: ${port}`);
}
