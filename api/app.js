var express = require('express'),
    trending = require('github-trending'),
    app = express(),
    port = process.env.PORT || 8080;

require('./routes.js')(app, trending);
var server = app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

