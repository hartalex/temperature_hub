var MongoClient = require('mongodb').MongoClient

module.exports = {
  connect: function (url, callback) {
    if (url === null) {
      callback('url cannot be null')
    } else {
      if (typeof url !== 'string') {
        callback('url must be a string')
      } else {
        MongoClient.connect(url, callback)
      }
    }
  },

  queryData: function (db, query, collection, callback) {
    if (db === null || query === null || collection === null) {
      callback([])
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.find(query).toArray(function (err, docs) {
        if (err === null) {
          callback(docs)
        } else {
          console.log('Error finding data in db')
          console.log(err)
          callback([])
        }
      })
    }
  },

  querydistinctData: function (db, query, collection, callback) {
    if (db === null || query === null || collection === null) {
      callback([])
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.distinct(query).then(function (docs) {
        callback(docs)
      }).catch(function (error) {
        console.log('Error finding distinct data in db')
        console.log(error)
        callback([])
      })
    }
  },

  queryOneData: function (db, query, collection, callback) {
    if (db === null || query === null || collection === null) {
      callback([])
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.findOne(query, function (err, obj) {
        if (err == null) {
          callback(obj)
        } else {
          console.log('Error finding one data in db')
          console.log(err)
          callback(null)
        }
      })
    }
  },

  queryLastData: function (db, query, sort, collection, callback) {
    if (db === null || query === null || sort === null || collection === null) {
      callback([])
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.find(query).sort(sort).limit(1).toArray(function (err, docs) {
        if (err == null) {
          console.log(docs)
          if (docs.length > 0) {
            callback(docs[0])
          } else {
            callback(null)
          }
        } else {
          console.log('Error finding data in db')
          console.log(err)
          callback(null)
        }
      })
    }
  },

  queryAggregateData: function (db, query, collection, callback) {
    if (db === null || query === null || collection === null) {
      callback([])
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.aggregate(query).toArray(function (err, docs) {
        if (err == null) {
          callback(docs)
        } else {
          console.log('Error finding data in mongo db')
          console.log(err)
          callback([])
        }
      })
    }
  },

  insertData: function (db, collection, obj, callback) {
    if (db === null || collection === null || obj === null) {
      callback(null)
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.insert(obj, {
        w: 1
      }, function (err, result) {
        if (err == null) {
          callback(result)
        } else {
          console.log('Error inserting data in db')
          console.log(err)
          callback(null)
        }
      })
    }
  },

  deleteData: function (db, collection, obj, callback) {
    if (db === null || collection === null || obj === null) {
      callback(null)
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.remove(obj, {
        w: 1
      }, function (err, result) {
        if (err == null) {
          callback(result)
        } else {
          console.log('Error deleting data in db')
          console.log(err)
          callback(null)
        }
      })
    }
  }
}
