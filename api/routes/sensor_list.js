var MongoClient = require('mongodb').MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/temphub';

var findSensors = function(db, callback) {
  // Get the temperatures collection 
  var collection = db.collection('temperatures');
  // Find some temperaturess 
  var sensors = collection.distinct('sensorId').then(function(docs) {
    callback(docs);
  }).catch( function(error) {
   console.log(error);
   callback([]);
});
}

module.exports = function(req, res) {
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  if (err == null) {
  findSensors(db, function(temps) {
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
