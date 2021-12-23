const express = require('express');
const router = express.Router();
const controller = require('../controllers/artist');

router.post('/', controller.createArtist);

module.exports = router;
