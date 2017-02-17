const db = require('../db/mongodb');
const dburl = require('../db/url');

module.exports = function(req, res) {
    // Use connect method to connect to the Server
    db.connect(dburl, function(err, dbobj) {
        if (err == null) {
            var query = {};
            if ("sensorId" in req.params) {
                query = {
                    sensorId: req.params.sensorId
                };
            }
            db.queryData(dbobj, query, 'temperatures', function(temps) {
                res.json(temps);
                dbobj.close();
            });
        } else {
            console.log("Error connecting to mongo db");
            console.log(err);
            res.json([]);
        }
    });
}
