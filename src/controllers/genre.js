const { query } = require('express');
const { redirect } = require('express/lib/response');
const getDb = require('../services/db');

exports.allGenre = async (req, res) => {
  const db = await getDb();

  try {
    const [typesOfGenres] = await db.query('SELECT genre FROM Artist');
    res.status(201).json({ typesOfGenres });
  } catch (err) {
    res.status(500).json(err);
  }

  db.close();
};

exports.readGenre = async (req, res) => {
  const db = await getDb();

  const { genreType } = req.params;
  //const [artists] = await db.query('SELECT * FROM Artist');

  const [artistsByGenre] = await db.query(
    'SELECT * FROM Artist WHERE genre = ?',
    [genreType]
  );
  try {
    if (!artistsByGenre) {
      res.status(404);
      res.send(` ${genreType} does not exist!.`);
    } else {
      res.status(200).json({ artistsByGenre });
    }
  } catch (err) {
    res.status(500).json(err);
  }

  db.close();
};
