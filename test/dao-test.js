const assert = require('chai').assert;
const dao = require('../src/data-access-object');
dao.isStub = true

describe('Find returns one object',async function(){
    it('', async function() {
        console.log(await dao.find("1000007"))
			assert.lengthOf([await dao.find()],1)
		})
});
