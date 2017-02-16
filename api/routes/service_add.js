var MongoClient = require('mongodb').MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/temphub';

var findServiceByUrl = function(db, find, callback) {
  // Get the services collection 
  var collection = db.collection('services');
  // Find some services 
  collection.findOne({url:find.url},function(err, svc) {
    if (err == null) {
      callback(svc);
    } else {
      console.log("Error finding service in mongo db");
      console.log(err);
      callback(null);
    }
  });
}

var findServiceByName = function(db, find, callback) {
  // Get the services collection 
  var collection = db.collection('services');
  // Find some services 
  collection.findOne({name:find.name},function(err, svc) {
    if (err == null) {
      callback(svc);
    } else {
      console.log("Error finding service in mongo db");
      console.log(err);
      callback(null);
    }
  });
}

var insertService = function(db, svc, callback) {
  // Get the services collection 
  var collection = db.collection('services');
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
      if ("url" in svc) {
        if (typeof svc.url === "string") {
          if (svc.url.length > 0) {
            if ("name" in svc) {
              if (typeof svc.name === "string") {
                if (svc.name.length > 0) {
                  console.log(svc);
                  findServiceByUrl(db, svc, function(result) {
		    if (result == null) {
                      findServiceByName(db, svc, function(result) {
		        if (result == null) {
                          insertService(db,svc, function(result) {
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
                          res.json({result:"fail", reason:"Service already exists"});
                        }
                      });
	  	    } else {
                      console.log("Error url already exists");
	              res.status(500);
                      res.json({result:"fail", reason:"Service already exists"});
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
            console.log("Error url property cannot be empty");
	    res.status(500);
            res.json({result:"fail", reason:"Property url is an empty string"});
          }
        } else {
          console.log("Error url property is not a string");
	  res.status(500);
          res.json({result:"fail", reason:"Property url is not a string"});
        }
      } else {
        console.log("Error json object is missing the url property");
	res.status(500);
        res.json({result:"fail", reason:"Property url is missing"});
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
