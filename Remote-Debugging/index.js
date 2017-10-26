
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('hello world');
});

app.listen(8080, _ => { console.log('Listening on port 8080') });