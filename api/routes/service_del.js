const db = require('../db/mongodb');
const dburl = require('../db/url');

module.exports = function(req, res) {
// Use connect method to connect to the Server
db.connect(dburl, function(err, dbobj) {
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
                      db.deleteData(dbobj,'services', svc, function(result) {
                        if (result != null && result.result.n > 0) {
                          console.log(result);
                          res.json({result:"ok"});
                        } else {
	                  res.status(500);
                          res.json({result:"fail"});
                        }
                        dbobj.close();
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
