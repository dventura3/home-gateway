(function(){

	var mongoose = require("mongoose");

	var context = new mongoose.Schema({
		"sameAs" : {
			"@id" : String,
			"@type" : String
		},
		"hasFeatureOfInterest" : {
			"@id" : String,
			"@set" : String
		},
		"produceFeatureOfInterest" : {
			"@id" : String,
			"@set" : String
		},
		"observeFeatureOfInterest" : {
			"@id" : String,
			"@set" : String
		},
		"energyConsumption" : String,
		"minEnergyConsumption" : String,
		"maxEnergyConsumption" : String
	});

	var ObjsBasicKnowledgeSchema = new mongoose.Schema({
		"@context" : context,
		"@id" : { type : String, unique: true },
		"@type" : String,
		"sameAs" : String,
		"hasFeatureOfInterest" : [String],
		"produceFeatureOfInterest" : [String],
		"observeFeatureOfInterest" : [String],
		"energyConsumption" : {
			"minEnergyConsumption" : Number,
			"maxEnergyConsumption" : Number
		}
	});


	ObjsBasicKnowledgeSchema.statics.save = function(obj_knowledge, cb){
		var that = this;
		obj_knowledge.validate(function(err){     
		  if (err) {
		    cb(new Error("Validation not valid!"));
		  }     
		  else {
		  	that.find({ "@id": obj_knowledge["@id"] }, function(err, obj_knowledge_found){
		  		if(!obj_knowledge_found || obj_knowledge_found.length == 0){
		  			// validation passed
		    		obj_knowledge.save(cb);
		    	}
		    	else{	    		
		  			cb(new Error("Object basic knowledge already exists!"));
		    	}
		  	});
		  }
		});
	}

	ObjsBasicKnowledgeSchema.statics.drop = function(cb){
		this.remove({}, cb);
	};


	var ObjsBasicKnowledge = mongoose.model("obk", ObjsBasicKnowledgeSchema);

	module.exports = ObjsBasicKnowledge;

})();