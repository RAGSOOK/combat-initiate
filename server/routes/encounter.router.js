const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// GETs encounters for id
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `SELECT * FROM encounters
                            WHERE user_id = $1;`;
        pool.query(queryText, [req.user.id] )
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get encounters', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
}); 

// POST
// INSERTS new character for user
router.post('/', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `INSERT INTO encounters ("name", "user_id")
                           VALUES ($1, $2);`;
        pool.query(queryText, [req.body.name, req.user.id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in post encounter', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});

// UPDATES 
// Takes in form data and replaces all character info with new info
// Accessable by player only
// this is using async because I may need it later.
router.put('/:id', (req, res) => {
    console.log('in post encounter edits');
    if(req.isAuthenticated()){
        (async () => {
            const client = await pool.connect();

            try{
                await client.query('BEGIN');

                //checks that the user trying to update has ownership
                if(req.user.id = req.body.userId){

                    //Update the name of the character
                    queryText = `UPDATE encounters SET name = $1
                                 WHERE "id" = $2;`;
                    await client.query(queryText, [req.body.newName, req.body.encId]);

                    await client.query('COMMIT');
                    res.sendStatus(200);
                }else{
                    res.sendStatus(403);
                }

            }catch (error) {
                console.log('Rollback', error);
                await client.query('ROLLBACK');
                throw error;
            }finally {
                client.release();
            }
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
})

module.exports = router;