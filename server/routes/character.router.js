const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// GETs characters for id
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `SELECT * FROM characters
                            WHERE user_id = $1;`;
        pool.query(queryText, [req.user.id] )
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get characters', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
}); 

router.post('/', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `INSERT INTO characters ("name", "user_id")
                           VALUES ($1, $2);`;
        pool.query(queryText, [req.body.name, req.user.id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in post character', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});

module.exports = router;