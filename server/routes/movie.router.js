const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET ROUTE
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "movies" ORDER BY "title" DESC;`;
  
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((error) => {
      console.log('Bad news bears, error in POST', error);
      res.sendStatus(500);
    });
}); // end GET ROUTE - for all movies to HOME page

// GET ROUTE
router.get('/:id', (req, res) => {
  let id = req.params.id; // identifys specific movie for DETAILS page
  console.log('router id', id);
  const queryText = `SELECT * FROM "movies" WHERE id = $1;`
  
  pool.query(queryText, [id])
    .then((result) => { res.send(result.rows); })
    .catch((error) => {
      console.log('Bad news bears, error in POST', error);
      res.sendStatus(500);
    });
}); // end GET ROUTE - for DETAILS page

// POST ROUTE
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `INSERT INTO "movies" ("title", "poster", "description")
                            VALUES ($1, $2, $3)
                            RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Query for the junction table
    const insertMovieGenreQuery = `INSERT INTO "movie_genre" ("movie_id", "genre_id")
                                   VALUES  ($1, $2);`;

      // SECOND QUERY MAKES GENRE FOR THE NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
      .then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(error => {
        // catch for second query
        console.log('Bad news bears, error in POST', error);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(error => {
    console.log('Bad news bears, error in POST', error);
    res.sendStatus(500)
  })
}) // end POST ROUTE

// PUT ROUTE
router.put('/:id', (req, res) => {
  console.log('in PUT');
  let edit = req.body;
  let id = req.params.id; // identify which item to update
  let sqlText = `UPDATE "movies" SET "title" = $1, "description" = $2 WHERE "id" = $3;`
  pool.query(sqlText, [edit.title, edit.description, id]) 
      .then((result) => { 
          res.sendStatus(200); 
      }).catch(error => {
        console.log('Bad news bears, error in PUT', error);
        res.sendStatus(500)
      })
})

module.exports = router;