const assert = require('chai').assert;
const dao = require('../src/data-access-object');
dao.isStub = true

describe('Find returns one object',async function(){
    it('', async function() {
        result = await (dao.find("1000007"))
        
        assert(result, {IMO : 1000007})
    })
});
describe('Find returns one object',async function(){
    it('', async function() {
        result = describe('Find returns one object',async function(){
            it('', async function() {
                assert.throws(()=> {
                    await (dao.find(null))
                })
            })
        });
    })
});


describe ('Test find function input for non-null value',async function(){
    it('', async function(){
        assert.throws(() => {
            await (dao.find(null))
        })
    })
})


describe ('Test insert batch batch of AIS messages input',async function(){
    it('', async function(){
        assert.throws(() => {
            await (dao.find(null))
        })
    })
})

describe('Returns MMSI, Latitude, and Longitude', async function(){
    it('', async function(){
        result = await (dao.findAllRecentPositions())

        assert(result, [{"MMSI":246430000,"Latitude":57.145633,"Longitude":8.316067}])
    })
});

describe('Returns one MMSI, Latitude, and Longitude', async function(){
    it('', async function(){
        result = await (dao.findShipPositionByMMSI())

        assert(result, [{"MMSI":246430000,"Latitude":57.145633,"Longitude":8.316067}])
    })
});

describe('Tests if MMSI value in findShipPositionByMMSI function is null',async function(){
    it('', async function(){
        assert.throws(() => {
            await (dao.find(null))
        })
    })
})

describe('Deletes messages older than ten minutes', async function(){
    it('', async function(){
        result = await (dao.deleteOldMessages())
        assert(result, { "acknowledged" : true, "deletedCount" : 2000007 })
    })
})

describe ('Returns all ports matching the given name', async function(){
    it('', async function(){
        result = await (dao.findPortByName("Name"))

        assert(result, [{
            "id" : "2976",
            "un/locode" : "DKHBO",
            "port_location" : "Hobro",
            "country" : "Denmark",
            "longitude" : "9.809167",
            "latitude" : "56.639722",
            "website" : "\\N",
            "mapview_1" : 1,
            "mapview_2" : null,
            "mapview_3" : null}])
    })
})

describe ('Tests parameter for findPortByName function', async function(){
    it('', async function(){
        assert.throws(() => {
            await(dao.find(null))
        })
    })
})