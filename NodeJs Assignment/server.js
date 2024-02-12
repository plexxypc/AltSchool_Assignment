const http = require('http');

// Setting the hostname and port number
const hostname = 'localhost';
const port = 8000;

// Establishing the HTTP server
const server = http.createServer((req, res) => {
  // Setting the response headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  res.end('My name is Paul Udor');

  console.log(`Request received: ${req.method} ${req.url}`);
});

// Listening in for incoming requests on the specified hostname and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
