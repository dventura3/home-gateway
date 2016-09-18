(function(){

	//var ObjBasicKnowledge = require("./objects_basic_knowledge");
	var fs = require('fs');
	
	exports.load_objects_basic_knowledge = function(cb){
		fs.readFile( __dirname + '/../objects_basic_knowledge.json', 'utf8', function(err, data){
			if(err) cb(err);
		  obj = JSON.parse(data);
		  cb(null, obj);
		});
	}

})();