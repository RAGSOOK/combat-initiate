
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
    
    console.log('room join', data.character);
    if(data.character != undefined){
      socket.broadcast.to(data.room).emit('addCharacter', data.character);
      console.log(data.character,'Joined room',data.room);
    } else{
      console.log('DM joined room',data.room);
    }

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('leave room', function(data) {
    socket.broadcast.to(data.room).emit('removeCharacter', data.character);
    socket.leave(data.room);
    console.log('someone left room', data.room);
  });

  // socket.on('subscribeToTest', (test) => {
  //   console.log('client is subscribing to test', test);

  //   io.sockets.emit('test', test);
  // });

});


