// use curl -X GET {URL} to test server
const http = require('http')
const restAPI = RestfulDataService()

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch(req.url){
        case "/get":
        //Should I be using an instance of the DAO or RestAPI here?
        restAPI.get("12122112");
        break;
        case defualt:
            res.end("defualted")
    }
}
const server = http.createServer(requestListener);
server.listen(8000, function(){
    console.log("listening on 8000");
});


