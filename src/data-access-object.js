const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'AISTestData';

var isStub = false;

async function find(imo){
    var client = new MongoClient(url, {useNewUrlParser: true});
    try {
        await client.connect()
        const vessels = client.db(dbName).collection('vessels');
        var docs =await vessels.findOne({IMO:imo});
        console.log(docs);
    } catch (error) {
        return error
    }finally{
        client.close()
    }

}


 async function deleteOldMessages(){
    var client = new MongoClient(url, {useNewUrlParser: true});
    try {
        await client.connect()
            const aisdk_20201118 = client.db(dbName).collection('aisdk_20201118');
            var tenMinutesOld = new Date(Date.now()-1000 * 60*10);
            var docs = await aisdk_20201118.deleteMany({timestamp: {$lt:tenMinutesOld}}, function(err, result) {
                if(err) throw error;
                    console.log('A refresh error occurred');
                    console.log(obj.result.n + "documents deleted")
                });
            return docs;
    }catch (error) {
        return error
    }finally{
        client.close()
    }

}


//Function to get all data and print it 

// create client so we connec to database
const client = new MongoClient(url);

// run function is used to connect with collection of database to read the data from database
async function run() {
    try {
        // connect with databaee
        await client.connect();
        // print the message that we successfully connected with database
        console.log("Connected correctly to server");
      // load the countryDatabase and store in db variable
        const db = client.db(dbName)
    // load the collection named as MyData and store in col variable
        const col= db.collection("vessels")
 // use find function to get all the data, then print the data to on console     
        col.find({}).toArray().then((ans)=>{console.log(ans)}).catch();
// find one function used to get only one document or data and print it on console
        const data= await col.findOne()
        console.log(data)

    } 
      // if we catch error then print the error on console
    catch (err) {
        console.log(err.stack);
    }
   // at last, we nned to close the client
    finally {
        await client.close();
    }
    return {find, deleteOldMessages,run}
}


// Priority 2 query that Read all ports matching the given name
async function findMatchName(Name){
    var client = new MongoClient(url, {useNewUrlParser: true});
    try {
        await client.connect()
        const ports = client.db(dbName).collection('ports');
        var docs = await ports.find({Name: "$Name"}, {projection: {_id:0, IMO:1, Name:1, Built:1}}).toArray();
        return docs
       // console.log(docs);
    } catch (error) {
        return error
    }finally{
        client.close()
    }
}

async function findAllRecentPositions(){
    var client = new MongoClient(url, {useNewUrlParser: true});
    try{
        //connect with database
        await client.connect();
        const aisdk_20201118 = client.db(dbName).collection('aisdk_20201118');
        var docs = await aisdk_20201118.aggregate([{$project: {_id:0,Position:1}}]).toArray();
        return docs;
        
    }catch (error){
        return error
    }finally{
        client.close()
    }

async function findShipsPositionFindByMMSI(mmsi){
        var client = new MongoClient(url, {useNewUrlParser: true});
        try{
            //connect with database
            await client.connect();
            const aisdk_20201118 = client.db(dbName).collection('aisdk_20201118');
            var docs = await aisdk_20201118.aggregate([
                {$match: {MMSI:mmsi}},
                {$project: {_id:0,Position:1}}]).toArray();

            return docs;
            
        }catch (error){
            return error
        }finally{
            client.close()
        }
    }
}

module.exports = {
    find :find,

    

}



