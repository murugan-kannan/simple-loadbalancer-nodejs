/**
 * @author Murugan Kannan (https://github.com/murugan-kannan)
 */

// run `node index.js` in the terminal
var server1 = require('./server-1');
var server2 = require('./server-2');
var loadBalancer = require('./load-balancer');

// Starting the server 1 
server1.listen(3000, function() {
  console.log('The server1 is up and running now');
});

// Starting the server 2
server2.listen(3001, function() {
  console.log('The server2 is up and running now');
});


// Server details
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

// Starting the server with server config
loadBalancer.start(3002, serverConfig);
