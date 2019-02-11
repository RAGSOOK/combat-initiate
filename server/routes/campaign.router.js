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
router.post('/', (req, res) => {

});

module.exports = router;