'use strict';

// Setup websocket support
//
// We want to represent here an unique "voting session"
// based on the sessionhash provided by our hashing function
//
// User should be able to join the room, and start voting once
// host starts the voting process.
module.exports = (app, httpServer) => {

  app.io = require('socket.io')();
  app.io.attach(httpServer);
  // Register websocket namespace
  const nsp = app.io.of('/voting');

  nsp.on('connection', (socket) => {
    console.log('new user connected: '+socket);

    // handle vote events
    socket.on('vote', (voteInfo) => { // { "roomId": "GRdf56", "vote": "restaurantId" ... }
      nsp.to(voteInfo.roomId).emit('vote', voteInfo); // send to all listeners
    });

    // handle join events
    socket.on('join', (room) => { // { "roomId": "GRdf56"}
      console.log('Joining room: '+JSON.stringify(room));
      socket.join(room.roomId);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

  });

  app.nsp = nsp; // append that particular namespace to app object
};
