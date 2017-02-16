const db = require('../db/mongodb');
const dburl = require('../db/url');

module.exports = function(req, res) {
  // Use connect method to connect to the Server
  db(dburl, function(err, db) {
  if (err == null) {
    queryData(db, {}, 'services', function(svcs) {
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
