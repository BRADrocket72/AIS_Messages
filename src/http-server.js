// use curl -X GET {URL} to test server
const http = require('http')

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch(req.url){
        case "/find":
        res.end('hello World');
        break;
        case defualt:
            res.end("defualted")
    }
}
const server = http.createServer(requestListener);
server.listen(8000, function(){
    console.log("listening on 8000");
});


