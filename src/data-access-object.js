const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'AISTestData';

var isStub = false;

async function find(imo) {
    //param: imo in string format
    //output: full vessel document as an obj
    if (this.isStub) {
        return [{ IMO: 1000007 }]
    }
    var client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect()
        const vessels = client.db(dbName).collection('vessels');
        var doc = await vessels.findOne({ IMO: imo });
        console.log(doc)
        return doc;
    } catch (error) {
        console.log("in error")
        return error
    } finally {
        client.close()
    }

}

async function insertAISMessagesBatch(messages){
    var client = new MongoClient(url, {useNewUrlParser: true});
    try{
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("aisdk_20201118");
        col.insertMany(messages)
    }catch(error){
        return error;
    }finally{
        client.close()
    }
}

async function findAllRecentPositions() {
    //param: none
    //output: array of objs in form {mmsi, Latitude, Longitude}
    var client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect();
        const db = client.db(dbName)
        const col = db.collection("aisdk_20201118")
        var docs = await col.aggregate([{ $project: { _id: 0, MMSI: 1, Latitude: { $arrayElemAt: ['$Position.coordinates', 0] }, Longitude: { $arrayElemAt: ['$Position.coordinates', 1] } } }]).toArray()
        console.log(docs)
        return docs;
    }
    catch (err) {
        console.log(err.stack);
    }
    finally {
        client.close();
    }
}
async function findShipPositionByMMSI(mmsi) {
    //param: mmsi in string form
    //output full document 
    var client = new MongoClient(url, { useNewUrlParser: true });
    try {
        //connect with database
        await client.connect();
        console.log(mmsi)
        const db = client.db(dbName)
        const col = db.collection('aisdk_20201118');
        var docs = await col.aggregate([
            { $match: { "MMSI": Number(mmsi) } },
            { $project: { _id: 0,MMSI:1, Latitude: { $arrayElemAt: ['$Position.coordinates', 0] }, Longitude: { $arrayElemAt: ['$Position.coordinates', 1] } } },
            {$limit:1}]).toArray();
            return docs;

    } catch (error) {
        return error
    } finally {
        client.close()
    }
}


async function deleteOldMessages() {
    //params none
    //calculates current time and deletes all messages older than 10 min
    //returns count of documents deleted
    if (typeof imo === string) {
        return error;
    }
    if (this.isStub) {
        return [{}]
    }
    var client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect()
        const aisdk_20201118 = client.db(dbName).collection('aisdk_20201118');
        var tenMinutesOld = new Date(Date.now() - 1000 * 60 * 10);
        var docs = await aisdk_20201118.deleteMany({ timestamp: { $lt: tenMinutesOld } }, function (err, result) {
            if (err) throw error;
            console.log('A refresh error occurred');
            console.log(obj.result.n + "documents deleted")
            return obj.result.n
        });
        return docs;
    } catch (error) {
        return error
    } finally {
        client.close()
    }

}


async function findPortByName(name) {
    var client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect()
        const ports = client.db(dbName).collection('ports');
        var docs = await ports.find({ Name: name }, { projection: { _id: 0, IMO: 1, Name: 1, Built: 1 } }).toArray();
        return docs
    } catch (error) {
        return error
    } finally {
        client.close()
    }
}



module.exports = { find, deleteOldMessages, findAllRecentPositions, findPortByName, findShipPositionByMMSI, isStub, insertAISMessagesBatch }





