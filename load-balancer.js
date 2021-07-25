/**
 * @author Murugan Kannan (https://github.com/murugan-kannan)
 */

var http = require('http');
var basePath = __dirname;
var fs = require('fs');
var path = require('path');
var StringDecoder = require('string_decoder').StringDecoder;

var loadBalancer = {
  count: 0
};

// Logic to pick the server config here i used Load Balancer
loadBalancer.pickServer = function () {
  console.debug("Choosing Server");
  return this.config[this.count++ % this.config.length];
};

// to handle all your request.
loadBalancer.server = http.createServer(function(req, res) {
  
  // To Serve static file.
  if (req.url === "/favicon.ico") {
    var stream = fs.createReadStream(path.join(basePath, req.url));
    stream.on('error', function () {
      res.writeHead(404);
      res.end();
    });
    stream.pipe(res);
    return;
  }

  // Currently its supports only GET method. so not reading any data from payload.
  req.on('data', function () {
    //
  });

  req.on('end', function () {
    var config = loadBalancer.pickServer();

    console.debug("server selected");
    
    // building the URL and Request Object
    var url = new URL(req.url, `${config.scheme}://${config.host}`);
    var options = {
      hostname: url.hostname,
      port: url.port,
      path: req.url,
      method: req.method
    };

    // processing the request.
    console.debug("Processing server");
    loadBalancer._processRequest(options, res);

  });
  
});

// to process the incoming request.  currently its supports only GET method.
loadBalancer._processRequest = function (options, orginalResponse) {
  
  console.log(options);
  
  // Sending the request to downstream server.
  var req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    var decoder = new StringDecoder('utf-8');

    var buffer = '';
    res.on('data', function(data) {
      buffer += decoder.write(data);
    });

    res.on('end', function (data) {
      buffer += decoder.end();

      // sending the downstream data into original response which is handled by load balancer
      orginalResponse.writeHead(res.statusCode);
      orginalResponse.end(buffer);
    });

   
  });

  req.on('error', error => {
    console.log(error);
  });

  req.end();
};

// To start the load balancer server.
loadBalancer.start = function(port, config) {
  loadBalancer.config = config;

  this.server.listen(port, function() {
    console.log('The Load Balancer is up and running now');
  });
};

module.exports = loadBalancer;
