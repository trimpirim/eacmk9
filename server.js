var app = require('./app'),
  http = require('http');

var port = process.env.PORT || 5023;

// Fire it up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});