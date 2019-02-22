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

router.get('/:id', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `SELECT * FROM encounters
                            JOIN campaigns_encounters 
                            ON encounters.id = campaigns_encounters.encounter_id
                            WHERE campaigns_encounters.campaign_id = $1;`;
        pool.query(queryText, [req.params.id] )
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get encounters by campaign id', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});

// POST
// INSERTS new encounter for user with monsters
router.post('/', (req, res) => {
    if(req.isAuthenticated()){
        (async () => {
            const client = await pool.connect();
            try{
                await client.query('BEGIN');

                let queryText = `INSERT INTO encounters ("name", "user_id")
                                VALUES ($1, $2)
                                RETURNING "id";`;
                const encResult = await client.query(queryText, [req.body.name, req.user.id]);

                const encId = encResult.rows[0].id;
                let monsterId;

                //loop through players and add each to the junction table with this campaign
                for(let monster of req.body.monstersIdsToAdd){
                    monsterId = monster.id;

                    queryText = `INSERT INTO "encounters_monsters" ("monster_id", "encounter_id")
                                VALUES ($1, $2);`;
                    await client.query(queryText, [monsterId, encId]);
                }

                await client.query('COMMIT');
                res.sendStatus(200);

            }catch(error){
                res.sendStatus(403);
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

// UPDATES 
// Takes in form data and replaces all monster info with new monsters
router.put('/:id', (req, res) => {
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

                    queryText = `DELETE FROM encounters_monsters
                                 WHERE encounter_id = $1;`;
                    await client.query(queryText, [req.body.encId]);

                    console.log(req.body.newMonsters);
                    for(let monster of req.body.newMonsters){
                        console.log(monster);
                        let id = parseInt(monster.id);
                        console.log(id);
                        queryText = `INSERT INTO "encounters_monsters" ("monster_id", "encounter_id")
                                    VALUES ($1, $2);`;
                        await client.query(queryText, [id, req.body.encId]);
                    }

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