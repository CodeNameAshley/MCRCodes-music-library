const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist');

router.post('/', artistController.createArtist);
router.get('/', artistController.readArtist);
router.get('/:artistId', artistController.singleArtist);
router.patch('/:artistId', artistController.updateDetails);

module.exports = router;
