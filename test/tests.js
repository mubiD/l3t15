const expect = require('chai').expect; // Require chai's functionality. 
const request = require('request'); // Require request from express.


describe('Testing response status', function(){ //Grouping single test isnt necessary. This is good practice when wanting to add more tests at a later stage.
    it('Status Code', function(done){ 
        request('http://localhost:8080/test', function(error, response, body){ //Endpoint matches get in app.js
          expect(response.statusCode).to.equal(200); //The chai test. 
          done(); //Test is done.
        });
    });
})

//This test checks whether the status is okay/successful(200).