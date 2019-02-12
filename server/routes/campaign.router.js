const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/dm', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `SELECT * FROM "campaigns"
                           WHERE "user_id" = $1;`;
        pool.query(queryText, [req.user.id] )
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get dm campaign', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});

router.get('/pc', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `SELECT campaigns.name FROM "campaigns"
                           JOIN users_campaigns ON campaign_id=campaigns.id
                           WHERE "users_campaigns"."user_id" = $1;`;
        pool.query(queryText, [req.user.id] )
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get pc campaign', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */

// This route takes in a name for a new campaign, 
// and an array of usernames to add as player
// and creates records in the campaigns and 
// users_campaigns tables
router.post('/', (req, res) => {
    console.log(req.body);

    (async () => {
        const client = await pool.connect();

        try{
            await client.query('BEGIN');
            let queryText = `INSERT INTO "campaigns" ("name", "user_id")
                             VALUES ($1, $2) RETURNING "id";`;
            const values = [ req.body.name, req.user.id ];
            const campResult = await client.query(queryText, values);

            const campId = campResult.rows[0].id;
            let playerId;

            for(let player of req.body.players){
                queryText = `SELECT * FROM person 
                             WHERE username = $1;`;
                const playerResult = await client.query(queryText, [player]);
                playerId = playerResult.rows[0].id;

                queryText = `INSERT INTO "users_campaigns" ("user_id", "campaign_id")
                             VALUES ($1, $2);`;
                const result = await client.query(queryText, [playerId, campId]);
            }
            await client.query('COMMIT');
            res.sendStatus(201);
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
});

 

module.exports = router;