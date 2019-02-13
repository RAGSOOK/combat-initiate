const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
// GETs campaigns as DM
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

// GETs campaigns as player
router.get('/pc', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `SELECT campaigns.name, campaigns.id FROM "campaigns"
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

    if(req.isAuthenticated()){
        (async () => {//wraps around everything we want to 'await'

            //opens a connection until it's closed later
            const client = await pool.connect();

            try{
                //SQL thing, tells where to ROLLBACK to
                await client.query('BEGIN');
                //Create the campaign
                let queryText = `INSERT INTO "campaigns" ("name", "user_id")
                                VALUES ($1, $2) RETURNING "id";`;
                
                const values = [ req.body.name, req.user.id ];

                //returns created row id
                const campResult = await client.query(queryText, values);

                //get id of new campaign row
                const campId = campResult.rows[0].id;
                let playerId;

                //loop through players and add each to the junction table with this campaign
                for(let player of req.body.players){
                    queryText = `SELECT * FROM person 
                                WHERE username = $1;`;
                    const playerResult = await client.query(queryText, [player]);
                    playerId = playerResult.rows[0].id;

                    queryText = `INSERT INTO "users_campaigns" ("user_id", "campaign_id")
                                VALUES ($1, $2);`;
                    await client.query(queryText, [playerId, campId]);
                }

                //once you hit this you can't ROLLBACK
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
    }else{
        res.sendStatus(403);
    }
});

// Deletes a Campaign
// First needs to check that the user trying to delete has ownership of campaign
// then needs to delete any rows in junction table that depend on it
router.delete('/:id', (req, res) => {
    if(req.isAuthenticated()){
        (async () => {
            const client = await pool.connect();

            try{
                await client.query('BEGIN');
                // Get the user id of the campaign to be deleted
                let queryText = `SELECT user_id FROM campaigns
                                 WHERE id = $1;`;
                const selResponse = await client.query(queryText, [req.params.id]);
                const camp_user_id = selResponse.rows[0].user_id;

                //checks that the user trying to delete has ownership
                // this may not be necessary as a user can only see it 
                // if it's theirs
                if(req.user.id = camp_user_id){

                    //delete dependent rows from junction table
                    queryText = `DELETE FROM users_campaigns
                                    WHERE campaign_id = $1;`;
                    await client.query(queryText, [req.params.id]);

                    //delete campaign row itself
                    queryText = `DELETE FROM campaigns
                                WHERE id = $1;`;
                    await client.query(queryText, [req.params.id]);

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
});

// Deletes a row from the users-campaigns table
// effectively removing a player from a campaign
// Accesable by player, not DM
router.delete('/player/:id', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `DELETE FROM "users_campaigns"
                           WHERE "user_id" = $1
                           AND "campaign_id" = $2;`;
        pool.query(queryText, [req.user.id, req.params.id] )
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in delete player from campaign', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});


// UPDATES 
// Takes in form data and replaces all campaign info with new info
// Accessable by DM not player
router.put('/:id', (req, res) => {
    console.log('in post campaign edits');
    if(req.isAuthenticated()){
        (async () => {
            const client = await pool.connect();

            try{
                await client.query('BEGIN');
                // Get the user id of the campaign to be deleted
                let queryText = `SELECT user_id FROM campaigns
                                 WHERE id = $1;`;
                const selResponse = await client.query(queryText, [req.params.id]);
                const camp_user_id = selResponse.rows[0].user_id;

                //checks that the user trying to update has ownership
                if(req.user.id = camp_user_id){

                    //delete dependent rows from junction table
                    //new rows will be added
                    queryText = `DELETE FROM users_campaigns
                                    WHERE campaign_id = $1;`;
                    await client.query(queryText, [req.params.id]);

                    let playerId;

                    //loop through players and add each to the junction table with this campaign
                    for(let player of req.body.newPlayers){
                        queryText = `SELECT * FROM person 
                                    WHERE username = $1;`;
                        const playerResult = await client.query(queryText, [player]);
                        playerId = playerResult.rows[0].id;
    
                        queryText = `INSERT INTO "users_campaigns" ("user_id", "campaign_id")
                                    VALUES ($1, $2);`;
                        await client.query(queryText, [playerId, req.body.campaignId]);
                    }

                    //Update the name of the campaign
                    queryText = `UPDATE campaigns SET name = $1
                                 WHERE "id" = $2;`;
                    await client.query(queryText, [req.body.newName, req.body.campaignId]);

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
});

 

module.exports = router;