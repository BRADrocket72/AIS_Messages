// use curl -X GET {URL} to test server
const http = require('http')

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('hello World');
}
const server = http.createServer(requestListener);
server.listen('mongodb://localhost:27017');
