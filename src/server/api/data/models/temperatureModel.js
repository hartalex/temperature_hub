module.exports =
  (input) => {
    return new Promise((resolve, reject) => {
      var temperature = {}
      temperature.sensorId = input.id
      temperature.tempInFarenheit = input.t
      temperature.humidity = input.h  // optional
      temperature.utc_timestamp = input.utc_timestamp
      resolve(temperature)
    }) // Promise
  }
