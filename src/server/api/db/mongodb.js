var realMongoClient = require('mongodb').MongoClient

module.exports = {
  MongoClient: realMongoClient,
  connect: function (url) {
    var myMongoClient = this.MongoClient
    return new Promise(function (resolve, reject) {
      if (url === null) {
        reject('url cannot be null')
      } else {
        if (typeof url !== 'string') {
          reject('url must be a string')
        } else {
          myMongoClient.connect(url, function (err, dbobj) {
            if (err === null) {
              resolve(dbobj)
            } else {
              reject(err)
            }
          })
        }
      }
    })
  },

  queryData: function (db, query, collection, callback) {
    var empty = []
    if (db === null || query === null || collection === null) {
      callback(empty)
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.find(query).toArray(function (err, docs) {
        if (err === null) {
          callback(docs)
        } else {
          callback(empty)
        }
      })
    }
  },

  querydistinctData: function (db, query, collection, callback) {
    var empty = []
    if (db === null || query === null || collection === null) {
      callback(empty)
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.distinct(query).then(function (docs) {
        callback(docs)
      }).catch(function (error) {
        callback(empty)
      })
    }
  },

  queryOneData: function (db, query, collection, callback) {
    var empty = []
    if (db === null || query === null || collection === null) {
      callback(empty)
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.findOne(query, function (err, obj) {
        if (err == null) {
          callback(obj)
        } else {
          callback(null)
        }
      })
    }
  },

  queryLastData: function (db, query, sort, collection, callback) {
    var empty = []
    if (db === null || query === null || sort === null || collection === null) {
      callback(empty)
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.find(query).sort(sort).limit(1).toArray(function (err, docs) {
        if (err == null) {
          if (docs.length > 0) {
            callback(docs[0])
          } else {
            callback(null)
          }
        } else {
          callback(null)
        }
      })
    }
  },

  queryAggregateData: function (db, query, collection, callback) {
    var empty = []
    if (db === null || query === null || collection === null) {
      callback(empty)
    } else {
      var dbcollection = db.collection(collection)
      dbcollection.aggregate(query).toArray(function (err, docs) {
        if (err == null) {
          callback(docs)
        } else {
          callback(empty)
        }
      })
    }
  },

  insertData: function (db, collection, obj) {
    return new Promise(function (resolve, reject) {
      if (db === null) {
        reject('parameter db is null')
      } else if (collection === null) {
        reject('parameter collection is null')
      } else if (obj === null) {
        reject('parameter obj is null')
      } else {
        var dbcollection = db.collection(collection)
        dbcollection.insert(obj, {w: 1}, function (err, result) {
          if (err == null) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      }
    })
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
          callback(null)
        }
      })
    }
  }
}
