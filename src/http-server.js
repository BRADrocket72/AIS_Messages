// use curl -X GET {URL} to test server
const http = require('http')
const RestfulDataService = require('./restful-data-service.js').RestfulDataService()

function httpServer(){
const requestListener = function (req, res) {
    console.log("here 19")
    let url = new URL(req.url,'http://localhost:8000');
    
    res.setHeader("Content-Type", "application/json");
    let filter = {};
for (let [k,v] of url.searchParams){ filter[k]=v }

    if(url.pathname.startsWith('/denmarkTraffic/vessels')){
        let body = '';
        req.on('data', (chunk) =>{body += chunk;})

        let idFound = /[^/]+$/.exec( url.pathname );
        let imo = idFound!=null? Number(idFound): null;
        console.log("here 19")
    req.on('end', async ()=>{
        let rslt;
    switch(req.method){
        case 'GET':
        //Should I be using an instance of the DAO or RestAPI here?
        console.log("here")
         rslt = await RestfulDataService['GET'](imo,filter);
        break;
        case defualt:
            res.end("defaulted")
    }
})
}}
const server = http.createServer(requestListener);
server.listen(8000, function(){
    console.log("listening on 8000");
});
}
httpServer()

module.exports = {
httpServer
}
