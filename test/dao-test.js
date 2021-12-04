const assert = require('chai').assert;
const dao = require('../src/data-access-object');


describe('Test size of Batch',async function(){
    it('', async function() {
        console.log(await dao.find())
			assert.lengthOf([await dao.find()],1)
		})
});
