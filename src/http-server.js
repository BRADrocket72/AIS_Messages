// use curl -X GET {URL} to test server
const http = require('http')
const RestfulDataService = require('./restful-data-service.js').RestfulDataService()
const AISMessagesService = require('./restful-data-service.js').AISMessagesService()

function httpServer() {
    //Sorting function for the server
    const requestListener = function (req, res) {
        let url = new URL(req.url, 'http://localhost:8000');

        res.setHeader("Content-Type", "application/json");
        //gets the search parameters from uri string
        let filter = {};
        for (let [k, v] of url.searchParams) { filter[k] = v }
        //handles all calls to the vessels collections
        if (url.pathname.startsWith('/denmarkTraffic/vessels')) {
            let body = '';
            req.on('data', (chunk) => { body += chunk; })
            //attempts to pull the mmsi from the url
            let idFound = /[^/]+$/.exec(url.pathname);
            //if imo is not found sets mmsi to "all" to retrieve all vessels
            let mmsi = idFound != null ? Number(idFound) : null;
            req.on('end', async () => {
                let rslt;
                switch (req.method) {
                    case 'GET':
                        //gets vessel data if mmsi is "all", it retrieves all vessels
                        rslt = await RestfulDataService['GET'](mmsi);
                        break;
                    case defualt:
                        res.end("defaulted")
                }
                let code = rslt.ok ? 200 : 404;
                res.writeHead(code, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(rslt) + '\n');
            })
        }
        //Handles calls to the AISMessages collection
        if (url.pathname.startsWith('/denmarkTraffic/AISMessages')) {
            let body = '';
            req.on('data', (chunk) => { console.log(body)
                body += chunk; })

            let idFound = /[^/]+$/.exec(url.pathname);
            //gets mmsi from uri string, if not found, it is set to "all"
            let mmsi = idFound != null ? String(idFound) : "all";
            
            req.on('end', async () => {
                let rslt;
                switch (req.method) {
                    case 'GET':
                        //gets most recent message by mmsi, if mmsi is "all", returns all messages
                        rslt = await AISMessagesService['GET'](mmsi);
                        break;
                    case 'DELETE':
                        rslt = await AISMessagesService['DELETE']();
                        break;
                    case 'POST':
                        rslt = await AISMessagesService['POST'](body);
                        break;
                    case defualt:
                        res.end("defaulted")
                }
                let code = rslt.ok ? 200 : 404;
                res.writeHead(code, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(rslt) + '\n');
            });
        }

        
    }
        //when the server is http-server is called, the server is created with the req listener above
        const server = http.createServer(requestListener);
        server.listen(8000, function () {
            console.log("listening on 8000");
        });
   
}
//httpServer is ran, the server starts with the req listener
httpServer()

module.exports = {
    httpServer
}
