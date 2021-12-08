export function RestfulDataService(){
    const dao = require('src\data-access-object.js');

    export async  function get(imo){
        let res = await dao.find(imo).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;
    }
}