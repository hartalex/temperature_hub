var simple = require('simple-mock')
const error = 'error'
module.exports = {
  remove: function () {
    simple.mock(this, 'collection').returnWith({remove: function (obj, query, callback) {callback(null, {})}})
    return this
  },
  removeFail: function () {
    simple.mock(this, 'collection').returnWith({remove: function (obj, query, callback) {callback(error, {})}})
    return this
  },
  insert: function () {
    simple.mock(this, 'collection').returnWith({insert: function (obj, query, callback) {callback(null, {})}})
    return this
  },
  insertFail: function () {
    simple.mock(this, 'collection').returnWith({insert: function (obj, query, callback) {callback(error, {})}})
    return this
  },
  queryAggregateData: function () {
    simple.mock(this, 'collection').returnWith({aggregate: function (query) { return {toArray: function (callback) { callback(null, {})}}}})
    return this
  },
  queryAggregateDataFail: function () {
    simple.mock(this, 'collection').returnWith({aggregate: function (query) { return {toArray: function (callback) { callback(error, {})}}}})
    return this
  },
  queryLastData: function () {
    simple.mock(this, 'collection').returnWith(
      {find: function (query) {
        return { 
          sort: function () {
            return {
              limit: function() {
                return {toArray: function(callback) { callback(null, [{}])}}
              }
            }
          }
        }
      }})
    return this
  },
  queryLastDataFail: function () {
    simple.mock(this, 'collection').returnWith(
      {find: function (query) { return {sort: function () { return {limit: function() { return {toArray: function(callback) {callback(error, [{}])}}}}}}}})
    return this
  },
  queryLastDataFail2: function () {
    simple.mock(this, 'collection').returnWith(
      {find: function (query) { return {sort: function () { return {limit: function() { return {toArray: function(callback) {callback(null, [])}}}}}}}})
    return this
  },
  queryOneData: function () {
    simple.mock(this, 'collection').returnWith({findOne: function (query, callback) { callback(null, {})}})
    return this
  },
  queryOneDataFail: function () {
    simple.mock(this, 'collection').returnWith({findOne: function (query, callback) { callback(error, {})}})
    return this
  },
  querydistinctData: function () {
    simple.mock(this, 'collection').returnWith({distinct: function (query) { return new Promise(function (resolve, reject) { resolve([{}])})}})
    return this
  },
  querydistinctDataFail: function () {
    simple.mock(this, 'collection').returnWith({distinct: function (query) { return new Promise(function (resolve, reject) { reject(error)})}})
    return this
  },
  queryData: function () {
    simple.mock(this, 'collection').returnWith(
      {find: function (query) { return {toArray: function(callback) { callback(null, [])}}}})
    return this
  },
  queryDataFail: function () {
    simple.mock(this, 'collection').returnWith(
      {find: function (query) { return {toArray: function(callback) { callback(error, [])}}}})
    return this
  }
}
