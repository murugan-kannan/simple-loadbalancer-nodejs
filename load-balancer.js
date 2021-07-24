var http = require('http');
var url = require('url');

var loadBalancer = {
  count: 0
};

loadBalancer.pickServer = function() {
  return this.config[this.count++ % this.config.length];
};

loadBalancer.server = http.createServer(function(req, res) {
  var config = loadBalancer.pickServer();

  var url = new URL(req.url, `${config.scheme}://${config.host}`);

  //console.log(url);
  console.log(req.method);

  var options = {
    hostname: url.host,
    port: url.port,
    path: req.path,
    method: req.method
  };

  loadBalancer._processRequest(options, res);
});

loadBalancer._processRequest = function(options, orginalResponse) {
  var req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    var buffer = '';
    res.on('data', function(data) {
      buffer += decoder.write(data);
    });

    orginalResponse.writeHead(res.statusCode);
    orginalResponse.end(buffer);
  });

  req.on('error', error => {
    orginalResponse.end(error);
  });

  req.end();
};

loadBalancer.start = function(port, config) {
  loadBalancer.config = config;

  this.server.listen(port, function() {
    console.log('The Load Balancer is up and running now');
  });
};

module.exports = loadBalancer;
