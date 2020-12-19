const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
    let id = req.params.id;
    console.log('router id', id);
    const queryText = `SELECT name FROM "genres" 
                      JOIN "movie_genre" ON genres.id = movie_genre.genre_id
                      JOIN "movies" ON movie_genre.movie_id = movies.id
                      WHERE movies.id = $1;`
    
    pool.query(queryText, [id])
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Bad news bears, error in POST', error);
        res.sendStatus(500);
      });
});

module.exports = router;