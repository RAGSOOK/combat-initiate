const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
// GETs players for campaign
router.get('/:id', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `SELECT person.username, person.id FROM person
                            JOIN users_campaigns ON users_campaigns.user_id = person.id
                            WHERE users_campaigns.campaign_id = $1;`;
        pool.query(queryText, [req.params.id] )
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

module.exports = router;