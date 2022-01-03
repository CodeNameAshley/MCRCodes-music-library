const { redirect } = require('express/lib/response');
const getDb = require('../services/db');

exports.createArtist = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
      req.body.name,
      req.body.genre,
    ]);

    res.sendStatus(201).json(req.body);
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.readArtist = async (req, res) => {
  const db = await getDb();

  try {
    const [artists] = await db.query('SELECT * FROM Artists');

    res.sendStatus(200).json(artists);
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.singleArtist = async (req, res) => {
  const db = await getDb();

  const { artistId } = req.params;

  const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
    artistId,
  ]);

  if (!artist) {
    res.sendStatus(404);
    res.send('This artist does not exist!');
  } else {
    res.sendStatus(200).json(artist);
  }
};
