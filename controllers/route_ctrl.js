(function(){

	var ObjsBasicKnowledge = require("../models/objs_basic_knowledge_model");
	var BootstrapFile = require("./bootstrap_from_file");
	var async = require("async");

	var RouteCtrl = {
		TimeTrigger : function(req, res){
			//TODO
			res.status(302).send({"status" : "ERROR"});
		},
		UserPositionTrigger : function(req, res){
			//TODO
			res.status(302).send({"status" : "ERROR"});
		},
		ObjectStatusTrigger : function(req, res){
			//TODO
			res.status(302).send({"status" : "ERROR"});
		},
		ObjectBKBootstrap : function(req, res){
			/*
			* This function should be used by objects, in order to send their basic knowledge to the gateway.
			* We simulate objects, loading objects basic knowledge from a file.
			*/
			BootstrapFile.load_objects_basic_knowledge(function(err, objs_data){
				if(err)
					res.status(302).send({"status" : "Error in the file reading"});
				else{
					//objs_data is an array... so we have to iterate and add each element to the DB
					async.eachSeries(
						objs_data, 
						function(oneObj, cb) {
							var obk = new ObjsBasicKnowledge(oneObj);
					    ObjsBasicKnowledge.save(obk, function(err, object_basic_knowledge_saved){
					    	if(err)
					    		cb(err);
					    	else
					    		cb(null);
					    });
				  	},
				    function(err){
				    	if(err)
				    		return res.status(302).send({"status" : "Error in the db-save operation"});
				    	else
				    		return res.status(200).send(objs_data);
				    }
				  ); //end async
				}
			});
		}
	};

	module.exports = RouteCtrl;

})();