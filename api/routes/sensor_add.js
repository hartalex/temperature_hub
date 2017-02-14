var MongoClient = require('mongodb').MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/temphub';

var findSensorById = function(db, find, callback) {
  // Get the sensors collection 
  var collection = db.collection('sensors');
  // Find some sensors 
  collection.findOne({sensorId:find.sensorId},function(err, svc) {
    if (err == null) {
      callback(svc);
    } else {
      console.log("Error finding sensor in mongo db");
      console.log(err);
      callback(null);
    }
  });
}

var findSensorByName = function(db, find, callback) {
  // Get the services collection 
  var collection = db.collection('sensors');
  // Find some services 
  collection.findOne({name:find.name},function(err, svc) {
    if (err == null) {
      callback(svc);
    } else {
      console.log("Error finding sensor in mongo db");
      console.log(err);
      callback(null);
    }
  });
}

var insertSensor = function(db, svc, callback) {
  // Get the services collection 
  var collection = db.collection('sensors');
  // Find some services 
  collection.insert(svc, {w:1}, function(err, result) {
    if (err == null) {
      callback(result);
    } else {
      console.log("Error inserting services in mongo db");
      console.log(err);
      callback(null);
    }
  });
}

module.exports = function(req, res) {
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  if (err == null) {
  var svc = req.body;
    if (typeof svc === "undefined") {
      console.log("Error request body is undefined");
      res.json({result:"fail", reason:"Request Body is Undefined"});
    } else { 
      if ("sensorId" in svc) {
        if (typeof svc.sensorId === "string") {
          if (svc.sensorId.length > 0) {
            if ("name" in svc) {
              if (typeof svc.name === "string") {
                if (svc.name.length > 0) {
                  console.log(svc);
                  findSensorById(db, svc, function(result) {
		    if (result == null) {
                      findSensorByName(db, svc, function(result) {
		        if (result == null) {
                          insertSensor(db,svc, function(result) {
                            console.log(result);
                            if (result != null && result.result.n > 0) {
                              res.json({result:"ok"});
                            } else {
	                      res.status(500);
                              res.json({result:"fail"});
                            }
                            db.close();
                          });
	  	        } else {
                          console.log("Error name already exists");
	                  res.status(500);
                          res.json({result:"fail", reason:"Sensor already exists"});
                        }
                      });
	  	    } else {
                      console.log("Error sensorID already exists");
	              res.status(500);
                      res.json({result:"fail", reason:"Sensor already exists"});
                    }
                  });
                } else {
                  console.log("Error name property cannot be empty");
	          res.status(500);
                  res.json({result:"fail", reason:"Property name is an empty string"});
                }
              } else {
                console.log("Error name property is not a string");
	        res.status(500);
                res.json({result:"fail", reason:"Property name is not a string"});
              }
            } else {
              console.log("Error json object is missing the name property");
	      res.status(500);
              res.json({result:"fail", reason:"Missing name property"});
            }
          } else {
            console.log("Error sensorId property cannot be empty");
	    res.status(500);
            res.json({result:"fail", reason:"Property sensorId is an empty string"});
          }
        } else {
          console.log("Error sensorId property is not a string");
	  res.status(500);
          res.json({result:"fail", reason:"Property sensorId is not a string"});
        }
      } else {
        console.log("Error json object is missing the sensorId property");
	res.status(500);
        res.json({result:"fail", reason:"Property sensorId is missing"});
      }
    }
  } else {
    console.log("Error connecting to mongo db");
    console.log(err);
    res.status(500);
    res.json({result:"fail"});
  }
});
}
