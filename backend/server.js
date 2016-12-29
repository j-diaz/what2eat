'use strict';

const express = require('express'),
    app = express(),
    port = process.env.PORT || 9000,
    path = require('path'),
    frontend = path.resolve(__dirname, '../app'), //serve our vue app
    version = 'v1',
    httpServ = require('http').createServer(app);


// Configuration
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(frontend));
app.set('views', frontend);
app.set('port', port);

// Setup websockets behviour
require(__dirname + '/controller/ws.js')(app, httpServ)

// Register all backend url REST endpoints
require(__dirname + '/controller/api-routes.js')(app, version);

// Start server
const server = httpServ.listen(port, () => {
    console.log('Server started on port: ' + port);
});

// Export the server as a module.
module.exports = server;
