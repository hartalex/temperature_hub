var MongoClient = require('mongodb').MongoClient;

module.exports = function(url, callback) {
  MongoClient.connect(url, callback);
}

var queryData = function(db, query, collection, callback) {
  var dbcollection = db.collection(collection);
  dbcollection.find(query).toArray(function(err, docs) {
    if (err == null) {
      callback(docs);
    } else {
      console.log("Error finding data in db");
      console.log(err);
      callback([]);
    }
  });
}

var querydistinctData = function(db, query, collection, callback) {
  var dbcollection = db.collection(collection);
  dbcollection.find(query).toArray(function(err, docs) {
  var sensors = dbcollection.distinct(query).then(function(docs) {
    callback(docs);
  }).catch( function(error) {
     console.log(error);
     callback([]);
  });
});
}

var queryOneData = function(db, find, collection, callback) {
  var collection = db.collection(collection);
  collection.findOne(find,function(err, obj) {
    if (err == null) {
      callback(obj);
    } else {
      console.log("Error finding one data in db");
      console.log(err);
      callback(null);
    }
  });
}

var queryAggregateData = function(db, query, collection, callback) {
  var dbcollection = db.collection(collection);
  dbcollection.aggregate(query).toArray(function(err, docs) {
    if (err == null) {
      callback(docs);
    } else {
      console.log("Error finding temperatures in mongo db");
      console.log(err);
      callback([]);
    }
  });
}


var insertData = function(db, collection, obj, callback) {
  var dbcollection = db.collection(collection);
  dbcollection.insert(obj, {w:1}, function(err, result) {
    if (err == null) {
      callback(result);
    } else {
      console.log("Error inserting data in db");
      console.log(err);
      callback(null);
    }
  });
}

var deleteData = function(db, collection, obj, callback) {
  var dbcollection = db.collection(collection);
  dbcollection.remove(obj, {w:1}, function(err, result) {
    if (err == null) {
      callback(result);
    } else {
      console.log("Error deleting data in db");
      console.log(err);
      callback(null);
    }
  });
}
