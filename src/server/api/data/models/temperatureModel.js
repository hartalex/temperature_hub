module.exports =
  function(input) {
    return new Promise(function (resolve, reject) {
      var temperature = {}
      temperature.sensorId = input.id
      temperature.tempInFarenheit = input.t
      temperature.utc_timestamp = input.utc_timestamp
      resolve(temperature)
    }) // Promise
  }
