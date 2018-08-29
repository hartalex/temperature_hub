import { defaultReduce } from './reducers/defaultReduce.js'
import { setTemps } from './reducers/setTemps.js'
import { setTempsFail } from './reducers/setTempsFail.js'

const initialState = {
  tempData: [
    {
      tempInFarenheit: 0,
      lastUpdate: '2018-02-05T18:42:00.789Z',
      sensorName: 'Living Room',
      outdated: true
    },
    {
      tempInFarenheit: 0,
      lastUpdate: '2018-02-05T18:42:00.789Z',
      sensorName: 'Basement',
      outdated: true
    },
    {
      tempInFarenheit: 0,
      lastUpdate: '2018-02-05T18:42:00.789Z',
      sensorName: 'Fish Tank',
      outdated: true
    },
    {
      tempInFarenheit: 0,
      lastUpdate: '2018-02-05T18:42:00.789Z',
      sensorName: 'Bedroom',
      outdated: true
    },
    {
      tempInFarenheit: 0,
      lastUpdate: '2018-02-05T18:42:00.789Z',
      sensorName: 'Outside',
      outdated: true
    },
    {
      tempInFarenheit: 0,
      lastUpdate: '2018-02-05T18:42:00.789Z',
      sensorName: 'Garage',
      outdated: true
    }
  ]
}

export const reducers = (state, action) => {
  if (typeof state === 'undefined') {
    state = initialState
  }
  let getNextState
  switch (action.type) {
    case 'SetTemps':
      getNextState = setTemps
      break
    case 'SetTempsFail':
      getNextState = setTempsFail
      break
    default:
      getNextState = defaultReduce
  }
  return getNextState(state, action)
}
