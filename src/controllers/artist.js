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
      `Artist "${req.body.name}" has been added to the database with a genre of "${req.body.genre}"`
    );
  } catch (err) {
    res.status(500).json(err);
    //res.send('Entry must be a string in JSON format');
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

  const [[artistById]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
    artistId,
  ]);
  try {
    if (!artistById) {
      res.status(404);
      res.send(
        ` Artist ID no: ${artistId} does not exist! Please choose between 1 - ${artists.length}.`
      );
    } else {
      res.status(200).json(artistById);
    }
  } catch (err) {
    res.status(500).json(err);
  }

  db.close();
};

// exports.artistName = async (req, res) => {
//   const db = await getDb();

//   const { artistName } = req.params;
//   const [[artistByName]] = await db.query(
//     'SELECT * FROM Artist WHERE name = ?',
//     [artistName]
//   );

//   try {
//     if (!artistByName) {
//       res.status(404);
//       res.send(` Artist ID no: ${artistName} does not exist!`);
//     } else {
//       res.status(200).json(artistByName);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }

//   db.close();
// };

exports.updateDetails = async (req, res) => {
  const db = await getDb();
  const details = req.body;
  const { artistId } = req.params;

  let updatedName;
  let updatedGenre;

  if (req.body.name && req.body.genre) {
    updatedName = `The artist name has been updated to '${req.body.name}'.`;
    updatedGenre = `The genre has been updated to '${req.body.genre}'`;
  } else if (!req.body.name) {
    updatedName = `The artist name has not changed.`;
    updatedGenre = `The genre has been updated to '${req.body.genre}'`;
  } else if (!req.body.genre) {
    updatedName = `The artist name has been updated to '${req.body.name}'.`;
    updatedGenre = `The genre has not changed`;
  }

  //const [artists] = await db.query('SELECT * FROM Artist');

  try {
    const [{ updatedrow }] = await db.query(
      'UPDATE Artist SET ? WHERE id = ?',
      [details, artistId]
    );

    if (!updatedrow) {
      res.status(201);
      res.send(
        `Artist no:${artistId} has been updated! ${updatedName} ${updatedGenre}.`
      );
    } else {
      res.status(404);
      res.send('The update failed');
    }
  } catch (err) {
    res.sendStatus(500);
  }

  db.close();
};
