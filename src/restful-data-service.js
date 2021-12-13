const denmarkTraffic = require('./data-access-object.js');

  function RestfulDataService(){

    async  function get(imo){
        let res = await denmarkTraffic.find(imo).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;
    }

    return { GET: get};
    }


    function AISMessagesService(){

        async  function get(mmsi){
            let res;
            if(mmsi === "all"){
                 res = await denmarkTraffic.findAllRecentPositions().catch(err =>{
                    return {'ok': 0, data: {Error:err.toString()}};
                })
                return res;
            }
            res = await denmarkTraffic.findShipPositionByMMSI(mmsi).catch(err =>{
                return {'ok': 0, data: {Error:err.toString()}};
                
            })
            return res;
        }
    
        async function post( messages){
            let res = await denmarkTraffic.insertAISMessagesBatch(JSON.parse(messages)).catch(err =>{
                return {'ok': 0, data: {Error:err.toString()}};
            })
            return res;
        }
        async function remove(){
            let res = await denmarkTraffic.deleteOldMessages().catch(err =>{
                return {'ok': 0, data: {Error:err.toString()}};
            })
            return res;
        }
    
        return { GET: get, POST: post, DELETE: remove };
        }
module.exports = {
    RestfulDataService, AISMessagesService
}
