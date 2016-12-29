'use strict';

const express = require('express'),
    app = express(),
    port = process.env.PORT || 9000,
    path = require('path'),
    ngAppPath = path.resolve(__dirname, '../app'), //serve our vue app
    version = 'v1',
    io = require('socket.io')(app);

// Configuration
app.set('port', port);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Serve static angular app
app.use(express.static(ngAppPath));
app.set('views', ngAppPath);

// Register websocket namespace
const nsp = io.of('/voting');
nsp.on('connection', (socket) => {
  console.log('someone connected');
});

// Register all backend url REST endpoints
require(__dirname + '/controller/api-routes.js')(app, version, nsp);

// Start server
const server = app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

// Export the server as a module.
module.exports = server;
