(function(){

var chai = require("chai");
var expect = chai.expect;
var Bootstrap = require("../../controllers/bootstrap_from_file");



describe('##Bootstrap From File', function() {
  
  it('load_objects_basic_knowledge() should return JSON-LD object with objects basic knowledge', function(done) {
    
    var read_data = Bootstrap.load_objects_basic_knowledge(function(err, read_data){

      expect(err).to.not.be.an('error');
      expect(read_data).to.be.an('array');
      expect(read_data).to.have.lengthOf(5);
      expect(read_data[0]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-air_conditioner-n-1");
      expect(read_data[1]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-oven-n-1");
      expect(read_data[2]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-alarm_clock-n-1");
      expect(read_data[3]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-radio-n-1");
      expect(read_data[4]).to.have.deep.property("@type", "http://www.w3.org/2006/03/wn/wn20/schema/synset-sensor-n-1");

      done()

    });

  });
});


})();
