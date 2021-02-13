const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const filename = "public"
const fullpath = path.join(__dirname, filename);

app.use(express.static(fullpath));
// app.get('/', (req, res) => { res.send('Hello World!'); });

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

require('./bot');
