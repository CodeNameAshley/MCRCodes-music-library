const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read genre', () => {
  let db;
  let genres;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Tame Impala',
        'rock',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Kylie Minogue',
        'pop',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Dave Brubeck',
        'jazz',
      ]),
    ]);

    [genres] = await db.query('SELECT DISTINCT genre from Artist');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/genre', () => {
    describe('GET', () => {
      it('returns all unique genre records in the database', async () => {
        const res = await request(app).get('/genre').send();

        expect(res.status).to.equal(201);
        expect(res.body.length).to.equal(3);

        res.body.forEach((genres) => {
          const expected = genres.find((a) => a.type === genres.type);

          expect(genres).to.deep.equal(expected);
        });
      });
    });
  });

  describe('/genre/:genreType', () => {
    describe('GET', () => {
      it('returns all artist with the correct genre', async () => {
        const expected = genres[0];
        const res = await request(app).get(`/genre/${expected.type}`).send();

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(expected);
      });

      it('returns a 404 if the genre is not in the database', async () => {
        const res = await request(app).get('/genre/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});
