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

loadBalancer.listen(3002, function() {
  console.log('The Load Balancer is up and running now');
});
