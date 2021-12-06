function RestfulDataService(){
    const dao = require('src\data-access-object.js');
    
    async function get(imo,filter){
        let res = await dao.find(imo, filter).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;
    }
}