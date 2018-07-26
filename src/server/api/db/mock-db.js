var simple = require("simple-mock");
const error = "error";

module.exports = (() => {
  function makeArray(obj) {
    var result = [];
    if (typeof obj !== "undefined") {
      result.push(obj);
    }
    return result;
  }

  return {
    all: function() {
      simple.mock(this, "collection").returnWith({
        remove: function(obj, query, callback) {
          callback(null, {});
        },
        insert: function(obj, query, callback) {
          callback(null, {});
        },
        aggregate: function(query) {
          return {
            toArray: function() {
              return {};
            }
          };
        },
        find: function(query) {
          return {
            sort: function(sort) {
              return {
                limit: function(limit) {
                  return {
                    toArray: function() {
                      return [{}];
                    }
                  };
                }
              };
            }
          };
        },
        findOne: function(query) {
          return {};
        },
        distinct: function(query) {
          return new Promise(function(resolve, reject) {
            resolve([{}]);
          });
        }
      });
      return this;
    },
    remove: function() {
      simple.mock(this, "collection").returnWith({
        remove: function(obj, query, callback) {
          callback(null, {});
        }
      });
      return this;
    },
    removeFail: function() {
      simple.mock(this, "collection").returnWith({
        remove: function(obj, query, callback) {
          callback(error);
        }
      });
      return this;
    },
    insert: function() {
      simple.mock(this, "collection").returnWith({
        insert: function(obj, query, callback) {
          callback(null, {});
        }
      });
      return this;
    },
    insertFail: function() {
      simple.mock(this, "collection").returnWith({
        insert: function(obj, query, callback) {
          callback(error);
        }
      });
      return this;
    },
    queryAggregateData: function() {
      simple.mock(this, "collection").returnWith({
        aggregate: function(query) {
          return {
            toArray: function() {
              return {};
            }
          };
        }
      });
      return this;
    },
    queryAggregateDataFail: function() {
      simple.mock(this, "collection").returnWith({
        aggregate: function(query) {
          return {
            toArray: function() {
              throw error;
            }
          };
        }
      });
      return this;
    },
    queryLastData: function(obj) {
      simple.mock(this, "collection").returnWith({
        find: function(query) {
          return {
            sort: function(sort) {
              return {
                limit: function(limit) {
                  return {
                    toArray: function(callback) {
                      callback(null, makeArray(obj));
                    }
                  };
                }
              };
            }
          };
        }
      });
      return this;
    },
    queryLastDataFail: function() {
      simple.mock(this, "collection").returnWith({
        find: function(query) {
          return {
            sort: function(sort) {
              return {
                limit: function(limit) {
                  return {
                    toArray: function(callback) {
                      callback(error);
                    }
                  };
                }
              };
            }
          };
        }
      });
      return this;
    },
    queryOneData: function() {
      simple.mock(this, "collection").returnWith({
        findOne: function(query) {
          return {};
        }
      });
      return this;
    },
    queryOneDataFail: function() {
      simple.mock(this, "collection").returnWith({
        findOne: function(query, callback) {
          callback(error);
        }
      });
      return this;
    },
    querydistinctData: function() {
      simple.mock(this, "collection").returnWith({
        distinct: function(query) {
          return [{}];
        }
      });
      return this;
    },
    querydistinctDataFail: function() {
      simple.mock(this, "collection").returnWith({
        distinct: function(query) {
          throw error;
        }
      });
      return this;
    },
    queryData: function(obj) {
      simple.mock(this, "collection").returnWith({
        find: function(query) {
          return {
            toArray: function() {
              return makeArray(obj);
            }
          };
        }
      });
      return this;
    },
    queryDataFail: function() {
      simple.mock(this, "collection").returnWith({
        find: function(query) {
          return {
            toArray: function() {
              throw error;
            }
          };
        }
      });
      return this;
    },
    mockDbObject: { _id: "db_id" }
  };
})();
