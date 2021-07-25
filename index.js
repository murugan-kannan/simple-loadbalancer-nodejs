/**
 * @author Murugan Kannan (https://github.com/murugan-kannan)
 */

// run `node index.js` in the terminal
var loadBalancer = require('./load-balancer');


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
