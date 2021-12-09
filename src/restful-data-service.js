const dao = require('./data-access-object.js').denmarkTraffic;

  function RestfulDataService(){

    async  function get(imo,filter){
        let res = await dao.find(imo).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;
    }
    return { GET: get };
}
module.exports = {
    RestfulDataService
}
