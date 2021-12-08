const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'AISTestData';
function denmarkTraffic(){
var isStub = false;

async function find(){
    var client = new MongoClient(url, {useNewUrlParser: true});
    try {
        await client.connect()
        const vessels = client.db(dbName).collection('vessels');
        var docs =await vessels.findOne();
        return docs;
    } catch (error) {
        return error
    }finally{
        client.close()
    }

}
}

module.exports = {
    denmarkTraffic
}

