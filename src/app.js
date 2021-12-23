const express = require('express');
const request = require('express');
const app = express();

app.use(express.json);

app.get('/', (req, res) => {
  res.status(200).send('Hello World - from backend');
});

module.exports = app;
