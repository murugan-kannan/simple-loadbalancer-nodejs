// run `node index.js` in the terminal
var server1 = require('./server-1');
var server2 = require('./server-2');
var loadBalancer = require('./load-balancer');

server1.listen(3000, function() {
  console.log('The server1 is up and running now');
});

server2.listen(3001, function() {
  console.log('The server2 is up and running now');
});

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

console.log(loadBalancer);

loadBalancer.start(3002, serverConfig);
