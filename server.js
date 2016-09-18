var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var RouteCtrl = require("./controllers/route_ctrl");


/*--------------- Configuration -------------------*/


var SERVER_PORT = process.env.SERVER_PORT     || 3301;
var SERVER_HOST = process.env.SERVER_HOST     || "127.0.0.1";
var MONGOOSE_DB = process.env.MONGOOSE_DB     || "mongodb://localhost:27017/smart_edifice";
var MONGOOSE_USERNAME = process.env.MONGOOSE_USERNAME  || "";
var MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD  || "";
var options = {
  user : MONGOOSE_USERNAME,
  pass : MONGOOSE_PASSWORD
};


var app = express();
app.use(
  function crossOrigin(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization, Content-Length, X-Requested-With');

    if('OPTIONS' == req.method){
        res.send(200);
    }
    else
        next();
  }
);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


/*--------------- Routes -------------------*/


app.post("/trigger/time", RouteCtrl.TimeTrigger);
app.post("/trigger/user", RouteCtrl.UserPositionTrigger);
app.post("/trigger/object", RouteCtrl.ObjectStatusTrigger);

app.post("/bootstrap", RouteCtrl.ObjectBKBootstrap);


mongoose.connect(MONGOOSE_DB, options, function(err, results){
  if(err) return -1;
  app.listen(SERVER_PORT, SERVER_HOST);
  console.log("Home Gateway Started...");
});

module.exports = app; // for testing