const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'AISTestData';

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

modules.exports = {
    find
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
}
// call the run function
run().catch(console.dir);



