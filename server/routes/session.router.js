// requires
let express = require("express");
let router = express.Router();
// let mongoose = require("mongoose");

//schema
// let SessionsSchema = mongoose.Schema({
//   theme: {},
//   participantsArray: []
// });//ends SessionsSchema

//prototype
// let Sessions = mongoose.model( "sessions", SessionsSchema, "sessions");

/*
//posts
  router.post( '/addSession', function(req,res){
    let session = new Sessions();
    session.theme = req.body.theme;
    session.participantsArray = req.body.participantsArray;

    session.save(function(err, savedSession){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }
      res.send(savedSession);
    });//end session.save
  });//ends router.post to /addSession
*/

//exports
module.exports = router;