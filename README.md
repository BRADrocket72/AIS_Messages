# AIS_Messages
We have created a Mongo Database With a Rest API interface
The queries have different levels of implementation in our program. In the Result_Images directory, We have screenshots each function either from our rest APi or from the Mongo interactive shell. We completed all of the bold priority operations, but did not get to all of teh priority 2 operations.


We had used the standard mongo db for this project with no modifications to the data
Use this command to create the database:
mongorestore --drop --gzip --archive=AISTestData.bson.gz

For Tests:
We are using mocha and chai which should already be in the modules, but if not "npm install chai mocha" may need to be called

To run tests: npm test

For Curl Testing:
use: node ./http-server.js
This will start the server on localhost:8000

We have two paths one to vessel information

localhost:8000/denmarkTraffic/vessels

And one to AISMessages

localhost:8000/denmarkTraffic/AISMessages

Sample curl commands can be found in the images in the Result_images directory

