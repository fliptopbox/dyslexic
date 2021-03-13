const path = require('path');
const express = require('express');

require('./messages');
require('./socket');
require('./bot');
require('./word-usage');
require('./random-tweet');
require('./flow-rate');
require('./promote-tweet')

const PORT = process.env.PORT || 3000;

const filename = 'public';
const fullpath = path.join(__dirname, filename);
const app = express();

app.use(express.static(fullpath));
app.listen(PORT, greeting);

function greeting() {
    console.log(`WebSocket Server listening on port: ${PORT}`);
}
