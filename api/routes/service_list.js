const db = require('../db/mongodb');
const dburl = require('../db/url');

module.exports = function(req, res) {
    // Use connect method to connect to the Server
    db.connect(dburl, function(err, dbobj) {
        if (err == null) {
            db.queryData(dbobj, {}, 'services', function(svcs) {
                res.json(svcs);
                dbobj.close();
            });
        } else {
            console.log("Error connecting to mongo db");
            console.log(err);
            res.json([]);
        }
    });
}
