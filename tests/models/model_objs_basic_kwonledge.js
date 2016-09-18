(function(){

var mongoose = require("mongoose");
var chai = require("chai");
var expect = chai.expect;
var ObjsBasicKnowledge = require("../../models/objs_basic_knowledge_model");


describe('##Objects Basic Knowledge Model', function() {
  
  var db_name = "mongodb://localhost:27017/smart_edifice_test";

  var obk = new ObjsBasicKnowledge({
    "@context" : {
      "sameAs" : {
        "@id" : "http://www.featureofinterest.org/2016/foi#wikiObject",
        "@type" : "@id"
      },
      "hasFeatureOfInterest" : {
        "@id" : "http://www.featureofinterest.org/2016/foi#hasFeatureOfInterest",
        "@set" : "@id"
      },
      "produceFeatureOfInterest" : {
        "@id" : "http://www.featureofinterest.org/2016/foi#produceFeatureOfInterest",
        "@set" : "@id"
      },
      "observeFeatureOfInterest" : {
        "@id" : "http://www.featureofinterest.org/2016/foi#observeFeatureOfInterest",
        "@set" : "@id"
      },
      "energyConsumption" : "http://www.w3.org/2006/03/wn/wn20/schema/synset-electricity-n-2",
      "minEnergyConsumption" : "http://www.featureofinterest.org/2016/foi#minEnergyConsumption",
      "maxEnergyConsumption" : "http://www.featureofinterest.org/2016/foi#maxEnergyConsumption"
    },
    "@id" : "127.0.0.7",
    "@type" : "http://www.w3.org/2006/03/wn/wn20/schema/synset-air_conditioner-n-1",
    "sameAs" : "https://simple.wikipedia.org/wiki/Air_conditioner",
    "hasFeatureOfInterest" : [
      "http://www.w3.org/2006/03/wn/wn20/schema/synset-measure-v-1"
    ],
    "produceFeatureOfInterest" : [
      "http://www.w3.org/2006/03/wn/wn20/schema/synset-temperature-n-1",
      "http://www.w3.org/2006/03/wn/wn20/schema/synset-humidity-n-1"
    ],
    "observeFeatureOfInterest" : [
      "http://www.w3.org/2006/03/wn/wn20/schema/synset-temperature-n-1",
      "http://www.w3.org/2006/03/wn/wn20/schema/synset-humidity-n-1"
    ],
    "energyConsumption" : {
      "minEnergyConsumption" : 200,
      "maxEnergyConsumption" : 1800
    }
  });

/*
  before(function(done) {
    if (mongoose.connection.db) {
        return done();
    }
    mongoose.connect(db_name, done);
  });


  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
        mongoose.connection.close(done);
    });
  });


  //Before each test we empty the database
  beforeEach(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });
*/

  //Before each test we empty the database
  beforeEach(function(done){
    ObjsBasicKnowledge.drop(function(){
      done();
    });
  });


  it("save() should return error if there is already the basic knowledge of the same object", function(done) {
    ObjsBasicKnowledge.save(obk, function(err, obj_saved){
      ObjsBasicKnowledge.save(obk, function(err, obj_RE_saved){
        expect(err).not.to.be.null;
        done();
      });
    });
  });


  it("save() should return a JSON-LD representing the object's basic knowledge saved in the DB", function(done) {
    ObjsBasicKnowledge.save(obk, function(err, obj_saved){
      expect(err).to.be.null;
      expect(obk["@id"]).to.equal(obj_saved["@id"]);
      expect(obk["@type"]).to.equal(obj_saved["@type"]);
      expect(obk["sameAs"]).to.equal(obj_saved["sameAs"]);
      expect(obj_saved["hasFeatureOfInterest"]).to.have.lengthOf(1);
      expect(obk["hasFeatureOfInterest"]).to.eql(obj_saved["hasFeatureOfInterest"]);
      expect(obj_saved["produceFeatureOfInterest"]).to.have.lengthOf(2);
      expect(obk["produceFeatureOfInterest"]).to.eql(obj_saved["produceFeatureOfInterest"]);
      expect(obj_saved["observeFeatureOfInterest"]).to.have.lengthOf(2);
      expect(obk["observeFeatureOfInterest"]).to.eql(obj_saved["observeFeatureOfInterest"]);
      expect(obk["energyConsumption"]).has.deep.property("minEnergyConsumption", 200);
      expect(obk["energyConsumption"]).has.deep.property("maxEnergyConsumption", 1800);
      done();
    });
  });

});


})();
