function RestfulDataService(){
    const dt = require(DenmarkTraffic());

    async function get(imo,filter){
        let res = await dt.find(imo, filter).catch(err =>{
            return {'ok': 0, data: {Error:err.toString()}};
        })
        return res;

    }
}