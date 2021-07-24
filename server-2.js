var http = require('http');

var server = http.createServer(function(req, res) {
  res.end('Server 2');
});

module.exports = server;
