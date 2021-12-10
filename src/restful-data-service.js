const denmarkTraffic = require('./data-access-object.js');

  function RestfulDataService(){

    async  function get(imo){
        if(imo === "all"){
            let res = await denmarkTraffic.findAllRecentPositions().catch(err =>{
                return {'ok': 0, data: {Error:err.toString()}};
            })
            return res;
        }
        let res = await denmarkTraffic.find(imo).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;
    }

    async function post( data){
        let res = await denmarkTraffic.insert(JSON.parse(data)).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;
    }
    async function remove( imo, filter){
        let res = await denmarkTraffic.remove(imo, filter).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;
    }

    return { GET: get, POST: post, DELETE: remove };
    }
module.exports = {
    RestfulDataService
}
