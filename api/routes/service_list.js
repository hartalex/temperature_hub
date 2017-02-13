var MongoClient = require('mongodb').MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/temphub';

var findServices = function(db, callback) {
  // Get the services collection 
  var collection = db.collection('services');
  // Find some services 
  collection.find({}).toArray(function(err, docs) {
    if (err == null) {
    callback(docs);
    } else {
    console.log("Error finding services in mongo db");
    console.log(err);
    callback([]);
    }
  });
}

module.exports = function(req, res) {
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  if (err == null) {
  findServices(db, function(svcs) {
    res.json(svcs);
    db.close();
  });
  } else {
  console.log("Error connecting to mongo db");
  console.log(err);
  res.json([]);
  }
});
}
