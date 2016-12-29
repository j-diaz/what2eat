'use strict';

// ---------------------------------------------------------
// This module registers all the "API" routes of the system.
//
// Routes for other devices such as phone or tablet apps
// to share data and information with our system.
//
// Basically the developer API.
//
// Vue.js will handle client side routes or
// webpage endpoints. Thus, we only need to serve the index
// page and vue-router will take care of the rest.
//
// ---------------------------------------------------------

// Add the yelp node.js module
const Yelp = require('yelp');

// Instiate a yelp object from the module
const yelp = new Yelp({
 consumer_key: process.env.CONSUMER_KEY,
 consumer_secret: process.env.CONSUMER_SECRET,
 token: process.env.TOKEN,
 token_secret: process.env.TOKEN_SECRET
});

module.exports = (app, version) => {

  // Prefix string for all the API routes
  // Helpful for versioning our api backend url routes
  const prefix = '/api/'+version;

  // -------------------------------------------------------
  // Root page serves the index page
  // -------------------------------------------------------
  app.get('/', (req, res ,next) => {
    res.render('index.html');
  });
  
  app.get('/voting-session/:session', (req, res) => {
    res.render('voting.html');
  });

  // -------------------------------------------------------
  // Get all the restaurants available in the system
  // -------------------------------------------------------
  app.get(prefix + '/restaurant/all', (req, res) => {

     // build a longitude and latitude object as the yelp api expects
     var ll = req.query.latitude  + ',' + req.query.longitude;
     console.log('ll: '+ll);

     // Make a search in yelp
     yelp.search({ term: 'food', ll: ll }).then((data) => {

          console.log('Recieved data from yelp');
          // Send the data to the client
          res.send(data);

        }).catch((err) => {
          // Print error if found.
          console.error(err);
        });
  }); // end of get /api/v1/restaurant/all route

  // -------------------------------------------------------
  // Generate an unique URL for a new voting session
  // -------------------------------------------------------
  app.get(prefix + '/new/voting-session', (req, res) => {

      // Call DB get new url

      // Example has of url
      var hash = { uri: '/voting/bGR54ys'};
      res.send(hash);
  });

  // To do: add more API routes here...
  // Client should have a /voting/*

  app.get(prefix + '/voting-sesion/ab/join', (req, res) => {

    // join websocket channel according to regex pattern
    app.io.join('ab').emit('some event');
    // render page for that particular voting session
    res.send({});
  });

  // app.post(prefix + '/voting-session/ab', (req, res) => {
  //
  //   res.send({});
  // });

  // -------------------------------------------------------
  // For any other route, not previoously registered send index
  // -------------------------------------------------------
  app.all('/*', (req, res, next) => {
   res.sendFile('index.html', {root: __dirname + '../../../app'});
  });

}; // end of node.js module
