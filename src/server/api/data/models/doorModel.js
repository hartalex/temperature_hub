module.exports =
  function(input) {
    return new Promise(function (resolve, reject) {
      var door = {}
      door.sensorId = input.sensorId
      door.isOpen = input.isOpen
      door.utc_timestamp = input.utc_timestamp
      resolve(door)
    }) // Promise
  }
