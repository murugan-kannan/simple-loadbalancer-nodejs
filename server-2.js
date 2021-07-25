/**
 * @author Murugan Kannan (https://github.com/murugan-kannan)
 */

var http = require('http');

// To handle the request.
var server = http.createServer(function (req, res) {
  
  if (req.url === "/") {
    res.end('Data - Server 2');
  } else if (req.url === "/hello") {
    res.end('Hello - Server 2');
  } else {
    res.end();
  }
  
});

module.exports = server;
