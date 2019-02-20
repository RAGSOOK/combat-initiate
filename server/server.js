
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const socket = require('socket.io');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const campaignRouter = require('./routes/campaign.router.js');
const playerRouter = require('./routes/player.router.js');
const characterRouter = require('./routes/character.router.js');
const encounterRouter = require('./routes/encounter.router.js');
const monsterRouter = require('./routes/monster.router.js');
const sessionRouter = require('./routes/session.router.js');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/campaign', campaignRouter);
app.use('/api/player', playerRouter);
app.use('/api/character', characterRouter);
app.use('/api/encounter', encounterRouter);
app.use('/api/monster', monsterRouter);
app.use('/session', sessionRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
let server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

//socket.io
// Everything past here is sockets
let io = socket(server);

io.on('connection', function(socket){
  console.log( "Nice work buddy! A user connected.");

  socket.on('room', function(data) {
    socket.join(data.room);
    
    //if user is player
    if(data.character != undefined){
      socket.broadcast.to(data.room).emit('addCharacter', data.character);
      console.log(data.character,'Joined room',data.room);

    //else user is DM
    } else{
      console.log('DM joined room',data.room);
    }

  });

  //requests all players to re-submit their character
  socket.on('pollRoom', function(data){
    socket.broadcast.to(data.room).emit('pollChars');
  });

  //each re-submitted character is emitted back
  socket.on('polledChar', function(data){
    socket.broadcast.to(data.room).emit('prevChars', {character: data.character});
  });

  //receives then send list of actors from DM
  socket.on('sendActors', function(data){
    console.log('monsters sent', data.monsters);
    console.log('characters sent', data.characters);
    io.in(data.room).emit('setActors', {characters: data.characters,
                                        monsters: data.monsters});
  });

  //sets state on session page for inCombat to true
  socket.on('startEncounter', function(data) {
    io.in(data.room).emit('startCombat', data.encounter);
  });

  //receives and returns the actors in combat in order
  socket.on('sendOrder', function(data){
    socket.broadcast.to(data.room).emit('actorOrder', {actors: data.actors});
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('leave room', function(data) {
    socket.broadcast.to(data.room).emit('removeCharacter', data.character);
    socket.leave(data.room);
    console.log('someone left room', data.room);
  });

});


