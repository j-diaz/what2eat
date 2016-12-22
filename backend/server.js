'use strict';

const express = require('express'),
    app = express(),
    port = process.env.PORT || 9000,
    path = require('path'),
    ngAppPath = path.resolve(__dirname, '../app'), //serve our angular app
    version = 'v1';

// Configuration
app.set('port', port);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Serve static angular app
app.use(express.static(ngAppPath));
app.set('views', ngAppPath);

// Register all backend url endpoints
require(__dirname + '/controller/api-routes.js')(app, version);

// Start server
const server = app.listen(port, function() {
    console.log('Server started on port: ' + port);
});

// Export the server as a module.
module.exports = server;
