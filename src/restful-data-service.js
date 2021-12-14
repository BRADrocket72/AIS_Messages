const denmarkTraffic = require('./data-access-object.js');
//This function handles all calls to /vessels/
  function RestfulDataService(){

    async  function get(mmsi){
        let res = await denmarkTraffic.find(mmsi).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;
    }

    return { GET: get};
    }

//This function handles all calls to /AISMessages/
    function AISMessagesService(){

        async  function get(mmsi){
            let res;
            //if mmmsi is not found in the url,it returns all recent positions
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
    //messages is in json form
        async function post( messages){
            let res = await denmarkTraffic.insertAISMessagesBatch(JSON.parse(messages)).catch(err =>{
                return {'ok': 0, data: {Error:err.toString()}};
            })
            return res;
        }
        //This request removes all messages older than 10 min
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
