const db = require('../db/mongodb');
const dburl = require('../db/url');

module.exports = function(req, res) {
// Use connect method to connect to the Server
  db(dburl, function(err, db) {
    if (err == null) {
      querydistinctData(db,'sensorId','temperatures', function(temps) {
        queryData(db,{},'sensors', function(sensors) {
          var array = [];
          temps.forEach(function (temp) {
            var obj = {sensorId:temp};
            sensors.forEach(function (sensor) {
              if (temp == sensor.sensorId) {
                obj.name=sensor.name;
              }
            });
            array.push(obj);
          });
          res.json(array);
          db.close();
        });
      });
    } else {
      console.log("Error connecting to mongo db");
      console.log(err);
      res.json([]);
    }
  });
}
