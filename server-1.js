var http = require('http');

var server = http.createServer(function(req, res) {
  res.end('Server 1');
});

module.exports = server;
