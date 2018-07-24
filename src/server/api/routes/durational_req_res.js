import jsonResponsePromise from "../../jsonResponsePromise";
const config = require("../../config");
const slack = require("../data/slack")(config.slackUrl);
const errorHandler = require("./errorHandler")(slack);
const doAggregateQuery = require("./aggregateQuery");

module.exports = {
  durational_req_res: function(getAggregateQuery, collection) {
    let months = doAggregateQuery
      .findDataByTime(doAggregateQuery.months, getAggregateQuery, collection)
      .bind(doAggregateQuery);
    let days = doAggregateQuery
      .findDataByTime(doAggregateQuery.days, getAggregateQuery, collection)
      .bind(doAggregateQuery);
    let hours = doAggregateQuery
      .findDataByTime(doAggregateQuery.hours, getAggregateQuery, collection)
      .bind(doAggregateQuery);
    return function(req, res, done) {
      let duration;
      if ("duration" in req.params) {
        duration = req.params.duration;
      }
      duration = this.validateDuration(duration);
      // Use connect method to connect to the Server
      return new Promise(function(resolve, reject) {
        let resolveCallback = (error, temps) => {
          if (error) {
            throw error;
          }
          resolve(temps);
        };
        console.log(req.db);
        if (duration.indexOf("h") > -1) {
          hours(req.db, parseInt(duration), resolveCallback);
        } else if (duration.indexOf("d") > -1) {
          days(req.db, parseInt(duration), resolveCallback);
        } else if (duration.indexOf("m") > -1) {
          months(req.db, parseInt(duration), resolveCallback);
        } else {
          reject("Duration could not be handled " + duration);
        }
      })
        .then(jsonResponsePromise(res, done))
        .catch(errorHandler(req, res, done));
    };
  },
  validDurations: [
    "1h",
    "12h",
    "24h",
    "3d",
    "7d",
    "14d",
    "28d",
    "1m",
    "3m",
    "6m",
    "12m",
    "00"
  ],
  validateDuration: function(duration) {
    var retval = this.validDurations[0];
    if (this.validDurations.indexOf(duration) !== -1) {
      retval = this.validDurations[this.validDurations.indexOf(duration)];
    }
    return retval;
  }
};
