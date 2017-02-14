var MongoClient = require('mongodb').MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/temphub';

var findTemperatures = function(db,query, callback) {
  // Get the temperatures collection 
  var collection = db.collection('temperatures');
  // Find some temperaturess 
  collection.aggregate([
    { "$group": {
        "_id": {
            "minute":  {"$substr" : ["$utc_timestamp", 0, 16]},
        },
        "results":  { $push: { "tempInFarenheit":"$tempInFarenheit",
                               "sensorId":"$sensorId" }}
      }
    },
      {"$sort": { "_id.minute":1}}
]).toArray(function(err, docs) {
    if (err == null) {
    callback(docs);
    } else {
    console.log("Error finding temperatures in mongo db");
    console.log(err);
    callback([]);
    }
  });
}

module.exports = function(req, res) {
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  if (err == null) {
  var query = {};
  if ("sensorId" in req.params) {
    query = {sensorId:req.params.sensorId};
  }
  findTemperatures(db, query, function(temps) {
    res.json(temps);
    db.close();
  });
  } else {
  console.log("Error connecting to mongo db");
  console.log(err);
  res.json([]);
  }
});
}
