const db = require('../db/mongodb');
const dburl = require('../db/url');


module.exports = function(req, res) {
// Use connect method to connect to the Server
db(dburl, function(err, db) {
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
                  queryOneData(db, {sensorId:svc.sensorId}, 'sensors', function(result) {
		    if (result == null) {
                      queryOneData(db, {name:svc.name},'sensors', function(result) {
		        if (result == null) {
                          insertData(db,'sensors',svc, function(result) {
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
