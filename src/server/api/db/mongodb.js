var realMongoClient = require('mongodb').MongoClient
const winston = require('winston')
const dbname = 'temphub'
const logging = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({timestamp: true})
  ]
})

module.exports = function(client){
  if (typeof client === 'undefined') {
    client = realMongoClient
  }
  return {
    connect: function (url, retryMax) {
      if (typeof retryMax === 'undefined') {
        retryMax = 0
      }
      return new Promise(function (resolve, reject) {
      if (url === null) {
        reject('url cannot be null')
      } else {
        if (typeof url !== 'string') {
          reject('url must be a string')
        } else {

          const connectCallback = (retryMax, retryCnt) => {
            if (typeof retryCnt === 'undefined') {
              retryCnt = 0
            }
            return (err, connection) => {
              if (err === null) {
                resolve(connection.db(dbname))
              } else {
                // retry()
                if (retryCnt < retryMax) {
                  retryCnt++
                  logging.log('info', 'MongoConnectionFailed: (' + retryCnt + ' of ' + retryMax + '): ' + err)
                  setTimeout(()=>{client.connect(url, connectCallback(retryMax, retryCnt))}, 15000)
                } else {
                  logging.log('info', 'MongoConnectionFailed: No More Retries: ' + err)
                  reject(err)
                }
              }
            }
          }
          client.connect(url, connectCallback(retryMax))
        }
      }
    })
  },
  checkArg: (obj, objName, callback) => {
    var retval = true
    if (obj === null) {
      callback(new Error(objName + ' is null'))
      retval = false
    }
    return retval
  },
  checkArgs: function (db, query, collection, callback) {
    return this.checkArg(db, 'db', callback) &&
      this.checkArg(query, 'query', callback) &&
      this.checkArg(collection, 'collection', callback)
  },
  checkArgsDCO: function (db, collection, obj, callback) {
    return this.checkArg(db, 'db', callback) &&
      this.checkArg(collection, 'collection', callback) &&
      this.checkArg(obj, 'obj', callback)
  },
  checkArgsSort: function (db, query, sort, collection, callback) {
    return this.checkArg(db, 'db', callback) &&
      this.checkArg(query, 'query', callback) &&
      this.checkArg(sort, 'sort', callback) &&
      this.checkArg(collection, 'collection', callback)
  },

  queryData: function (db, query, collection, callback) {
    if (this.checkArgs(db, query, collection, callback)) {
      var dbcollection = db.collection(collection)
      dbcollection.find(query).toArray(callback)
    }
  },

  querydistinctData: function (db, query, collection, callback) {
    if (this.checkArgs(db, query, collection, callback)) {
      var dbcollection = db.collection(collection)
      dbcollection.distinct(query, callback)
    }
  },

  queryOneData: function (db, query, collection, callback) {
    if (this.checkArgs(db, query, collection, callback)) {
      var dbcollection = db.collection(collection)
      dbcollection.findOne(query, callback)
    }
  },

  queryLastData: function (db, query, sort, collection, callback) {
    if (this.checkArgsSort(db, query, sort, collection, callback)) {
      var dbcollection = db.collection(collection)
      dbcollection.find(query).sort(sort).limit(1).toArray(function (err, docs) {
          if (err === null && docs.length && docs.length > 0) {
            callback(err, docs[0])
          } else {
            callback(err, docs)
          }
      })
    }
  },

  queryAggregateData: function (db, query, collection, callback) {
    if (this.checkArgs(db, query, collection, callback)) {
      var dbcollection = db.collection(collection)
      dbcollection.aggregate(query).toArray(callback)
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
            resolve(obj)
          } else {
            reject(err)
          }
        })
      }
    })
  },

  deleteData: function (db, collection, obj, callback) {
    if (this.checkArgsDCO(db, collection, obj, callback)) {
      var dbcollection = db.collection(collection)
      dbcollection.remove(obj, {
        w: 1
      }, callback)
    }
  }
}
}
