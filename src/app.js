const express = require('express');
const request = require('express');
const routerArtist = require('./routes/artist');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World - from backend');
});

app.use('/artist', routerArtist);

module.exports = app;
