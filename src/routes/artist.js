const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist');

router.post('/', artistController.createArtist);
router.get('/', artistController.readArtist);
router.get('/:artistId', artistController.singleArtist);
router.patch('/:artistId', artistController.updateDetails);
router.delete('/:artistIdent', artistController.deleteArtist);

module.exports = router;
