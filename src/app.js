const express = require('express');
const routerArtist = require('./routes/artist');
const routerGenre = require('./routes/genre');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World - from backend');
});

app.use('/artist', routerArtist);
app.use('/genre', routerGenre);

module.exports = app;
