const db = require('../db/mongodb');
const dburl = require('../db/url');


module.exports = function(req, res) {
// Use connect method to connect to the Server
db(dburl, function(err, db) {
  if (err == null) {
    var query = {};
    if ("sensorId" in req.params) {
      query = {sensorId:req.params.sensorId};
    }
    queryData(db, query, 'temperatures', function(temps) {
    res.json(temps);
    db.close();
  });
  } else {
    console.log("Error connecting to db");
    console.log(err);
    res.json([]);
  }
});
}
