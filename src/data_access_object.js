const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'AISTestData';
(async function(){
    var client = new MongoClient(url, {useNewUrlParser: true});
    try {
        await client.connect()
        const vessels = client.db(dbName).collection('vessels');
        var docs =await vessels.findOne();
        console.log(docs);
    } catch (error) {
        console.log(error)
    }finally{
        client.close()
    }
    
})()


