const db = require('../db/mongodb');
const dburl = require('../db/url');


var findTemperaturesLast24 = function(db, callback) {
  var currentTime = new Date();
  var last24Hours = new Date(currentTime - 86400 * 1000).toISOString();
  var query =
  [
    {"$match" : { tempInFarenheit : {"$lt": 185}, utc_timestamp : { "$gt" : last24Hours } }},
    {"$group":
      {
        "_id":
        {
         "minute":  {"$substr" : ["$utc_timestamp", 0, 16]},
        },
        "results":  { $push: { "tempInFarenheit":"$tempInFarenheit", "sensorId":"$sensorId" }}
      }
    },
    {"$sort": { "_id.minute":1}}
  ];
  queryAggregateData(db,query,'temperatures',callback);
}

module.exports = function(req, res) {
// Use connect method to connect to the Server
db(dburl, function(err, db) {
  if (err == null) {
  findTemperaturesLast24(db, function(temps) {
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
