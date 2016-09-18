(function(){

//We set the process.env in order to use the testing DB
process.env.MONGOOSE_DB = "mongodb://localhost:27017/smart_edifice_test";


var mongoose = require("mongoose");
var chai = require("chai");
var chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../server');
var ObjsBasicKnowledge = require("../models/objs_basic_knowledge_model");


chai.use(chaiHttp);


//Before each test we empty the collection "ObjsBasicKnowledge"
beforeEach(function(done){
  ObjsBasicKnowledge.drop(function(){
    done();
  });
});



describe('##Server', function() {

  it("POST /bootstrap - should save the object's basic knowledge in the DB", function(done) {
    chai.request(server)
    .post('/bootstrap')
    .send({'name': 'Java', 'lastName': 'Script'})
    .end(function(err, res){
      expect(res).have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(5);
      expect(res.body[0]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-air_conditioner-n-1");
      expect(res.body[1]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-oven-n-1");
      expect(res.body[2]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-alarm_clock-n-1");
      expect(res.body[3]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-radio-n-1");
      expect(res.body[4]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-sensor-n-1");
      done();
    });
  });
  
});


})();
