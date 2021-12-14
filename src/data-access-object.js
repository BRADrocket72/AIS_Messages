const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'AISTestData';

var isStub = false;

async function find(mmsi) {
    //param: imo in string format
    //output: full vessel document as an obj
    if (this.isStub) {
        return [{ IMO: 1000007 }]
    }
    if(typeof mmsi === null){
        throw error;
    }
    var client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect()
        const vessels = client.db(dbName).collection("vessels");
        var doc = await vessels.findOne({ MMSI: mmsi });
        return doc;
    } catch (error) {
        return error
    } finally {
        client.close()
    }

}

async function insertAISMessagesBatch(messages){
    //input param, json formatted aismessages
    if(typeof messages === null){
        throw Error();
    }
    var client = new MongoClient(url, {useNewUrlParser: true});
    try{
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("aisdk_20201118");
        var result = await col.insertMany(messages)
        return result.insertedIds.length;
    }catch(error){
        return error;
    }finally{
        client.close()
    }
}

async function insertAISMessage(message){
    if(typeof messages !== Object){
        throw error;
    }
    var client = new MongoClient(url, {useNewUrlParser: true});
    try{
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("aisdk_20201118");
        var result = await col.insertMany(message)
        return result.acknowledged;
    }catch(error){
        return 0;
    }finally{
        client.close()
    }
}

async function findAllRecentPositions() {
    //param: none
    //output: array of objs in form {mmsi, Latitude, Longitude}
    if(this.isStub){
        return [{"MMSI":246430000,"Latitude":57.145633,"Longitude":8.316067}]
    }
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
    if(this.isStub){
        return {"MMSI":246430000,"Latitude":57.145633,"Longitude":8.316067}
    }
    if(typeof mmsi === null){
        throw error;
    }
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
    if (this.isStub) {
        //return deleted count
        return 100;
    }
    var client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect()
        const aisdk_20201118 = client.db(dbName).collection('aisdk_20201118');
        var tenMinutesOld = new Date(Date.now() - 1000 * 60 * 10);
        var docs =await aisdk_20201118.deleteMany( {$expr: { $lt: [ { $getField: {$literal: "$numberLong" } }, tenMinutesOld ] }});

        return docs.deletedCount;
    } catch (error) {
        return error
    } finally {
        client.close()
    }

}


async function findPortByName(Name) {
    if(this.isStub){
        return {
            "id" : "2976",
            "un/locode" : "DKHBO",
            "port_location" : "Hobro",
            "country" : "Denmark",
            "longitude" : "9.809167",
            "latitude" : "56.639722",
            "website" : "\\N",
            "mapview_1" : 1,
            "mapview_2" : null,
            "mapview_3" : null}
    }
    if(typeof Name === null){
        throw error;
    }
    var client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect()
        const ports = client.db(dbName).collection('ports');
        var docs = await ports.find({port_location:"Hobro"});
        return docs
    } catch (error) {
        return error
    } finally {
        client.close()
    }
}



module.exports = { find, deleteOldMessages, findAllRecentPositions, findPortByName, findShipPositionByMMSI, isStub, insertAISMessage, insertAISMessagesBatch }





