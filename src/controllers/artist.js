const { query } = require('express');
const { redirect } = require('express/lib/response');
const getDb = require('../services/db');

exports.createArtist = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
      name,
      genre,
    ]);

    res.status(201); //.json(req.body);
    res.send(
      `Artist "${req.body.name}" has been added to the database under the genre of "${req.body.genre}"`
    );
  } catch (err) {
    res.status(500).json(err);
    res.send('Entry must be a string in JSON format');
  }

  db.close();
};

exports.readArtist = async (req, res) => {
  const db = await getDb();

  try {
    const [artists] = await db.query('SELECT * FROM Artist');
    res.status(201).json({ artists });
  } catch (err) {
    res.status(500).json(err);
  }

  db.close();
};

exports.singleArtist = async (req, res) => {
  const db = await getDb();

  const { artistId } = req.params;
  const [artists] = await db.query('SELECT * FROM Artist');

  const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
    artistId,
  ]);
  try {
    if (!artist) {
      res.status(404);
      res.send(
        ` Artist ID no: ${artistId} does not exist! Please choose between 1 - ${artists.length}.`
      );
    } else {
      res.status(200).json(artist);
    }
  } catch (err) {
    res.status(500).json(err);
  }

  db.close();
};

exports.updateDetails = async (req, res) => {
  const db = await getDb();
  const details = req.body;
  const { artistId } = req.params;

  const [artists] = await db.query('SELECT * FROM Artist');

  try {
    const [{ updatedrow }] = await db.query(
      'UPDATE Artist SET ? WHERE id = ?',
      [details, artistId]
    );

    if (!updatedrow) {
      res.sendStatus(404);
      res.send('Update failed');
    } else {
      res.sendStatus(200).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }

  db.close();
};
