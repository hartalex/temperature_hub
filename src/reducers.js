const initialState = {tempData: [{"tempInFarenheit":0,"lastUpdate":"2018-02-05T18:42:00.789Z","sensorName":"Living Room","outdated":true},
{"tempInFarenheit":0,"lastUpdate":"2018-02-05T18:42:00.789Z","sensorName":"Basement","outdated":true},
{"tempInFarenheit":0,"lastUpdate":"2018-02-05T18:42:00.789Z","sensorName":"Fish Tank","outdated":true},
{"tempInFarenheit":0,"lastUpdate":"2018-02-05T18:42:00.789Z","sensorName":"Bedroom","outdated":true},
{"tempInFarenheit":0,"lastUpdate":"2018-02-05T18:42:00.789Z","sensorName":"Outside","outdated":true},
{"tempInFarenheit":0,"lastUpdate":"2018-02-05T18:42:00.789Z","sensorName":"Garage","outdated":true}]}

function reduce(state, action) {
  if (typeof state === 'undefined') {
    state = initialState
  }
  var nextState = {}
  if (action.type === 'SetTemps') {
    nextState.tempData = action.tempData
  } else if (action.type === 'SetTempsFail') {
    nextState.tempData = initialState.tempData
  } else {
    nextState = state
  }
  return nextState
}

module.exports = reduce
