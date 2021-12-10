const denmarkTraffic = require('./data-access-object.js');

  function RestfulDataService(){

    async  function get(imo){
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

    
    return { GET: get };
    }
module.exports = {
    RestfulDataService
}
