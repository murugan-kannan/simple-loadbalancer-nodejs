var http = require('http');
var url = require('url');

var serverConfig = [
  {
    scheme: 'http',
    host: 'localhost:3000'
  },
  {
    scheme: 'http',
    host: 'localhost:3001'
  }
];

var count = 0;
function pickServer() {
  return serverConfig[count++ % serverConfig.length];
}

var server = http.createServer(function(req, res) {
  var config = pickServer();

  var url = new URL(req.url, `${config.scheme}://${config.host}`);

  //console.log(url);
  console.log(req.method);

  res.end('Load Balancer');
});

var _processRequest = function(options, res) {};

var loadBalancer = {};

loadBalancer.start = function(port) {
  server.listen(port, function() {
    console.log('The Load Balancer is up and running now');
  });
};

module.exports = loadBalancer;
