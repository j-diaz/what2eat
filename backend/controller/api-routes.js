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
  // Get all active voting sessions in the system
  // -------------------------------------------------------
  app.get(prefix + '/voting-sessions/all', (req, res) => {
      // Call mongodb and get all mongo documents which "session" property
      // is set to active

      res.send({});
  });

  // To do: add more API routes here...


  // -------------------------------------------------------
  // For any other route, not previoously registered send index
  // -------------------------------------------------------
  app.all('/*', (req, res, next) => {
   res.sendFile('index.html', {root: __dirname + '../../../app'});
  });

}; // end of node.js module
