// use curl -X GET {URL} to test server
const http = require('http')
const RestfulDataService = require('./restful-data-service.js').RestfulDataService()
const AISMessagesService = require('./restful-data-service.js').AISMessagesService()

function httpServer() {
    const requestListener = function (req, res) {
        let url = new URL(req.url, 'http://localhost:8000');

        res.setHeader("Content-Type", "application/json");
        let filter = {};
        for (let [k, v] of url.searchParams) { filter[k] = v }

        if (url.pathname.startsWith('/denmarkTraffic/vessels')) {
            let body = '';
            req.on('data', (chunk) => { body += chunk; })

            let idFound = /[^/]+$/.exec(url.pathname);
            let imo = idFound != null ? String(idFound) : "all";
            req.on('end', async () => {
                let rslt;
                switch (req.method) {
                    case 'GET':
                        rslt = await RestfulDataService['GET'](imo);
                        break;
                    case defualt:
                        res.end("defaulted")
                }
            })
        }

        if (url.pathname.startsWith('/denmarkTraffic/AISMessages')) {
            let body = '';
            req.on('data', (chunk) => { body += chunk; })

            let idFound = /[^/]+$/.exec(url.pathname);
            let mmsi = idFound != null ? String(idFound) : "all";
            
            req.on('end', async () => {
                let rslt;
                switch (req.method) {
                    case 'GET':
                        rslt = await AISMessagesService['GET'](mmsi);
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
        const server = http.createServer(requestListener);
        server.listen(8000, function () {
            console.log("listening on 8000");
        });
   
}
httpServer()

module.exports = {
    httpServer
}
