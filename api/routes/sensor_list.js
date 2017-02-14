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

var findSensorNames = function(db, callback) {
  // Get the temperatures collection 
  var collection = db.collection('sensors');
  // Find some temperaturess 
  var sensors = collection.find({}).toArray(function(err, docs) {
    if (err == null) {
      callback(docs);
    } else {
      console.log("Error finding sensors in mongo db");
      console.log(err);
      callback([]); 
    }
  })
}

module.exports = function(req, res) {
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  if (err == null) {
  findSensors(db, function(temps) {
    findSensorNames(db, function(sensors) {	
      var array = [];
      temps.forEach(function (temp) {
        var obj = {sensorId:temp};
        sensors.forEach(function (sensor) {
	if (temp == sensor.sensorId) {
          obj.name=sensor.name;
        }
      });
      array.push(obj); });
      res.json(array);
      db.close();
  });});
  } else {
  console.log("Error connecting to mongo db");
  console.log(err);
  res.json([]);
  }
});
}
