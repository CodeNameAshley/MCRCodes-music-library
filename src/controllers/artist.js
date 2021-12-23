const getDb = require('../services/db');

exports.createArtist = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
      req.body.name,
      req.body.genre,
    ]);

    res.status(201).json(req.body);
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};
