import DoorGraph from './doorGraphComponent.js'
import TemperatureGraph from './temperatureGraphComponent.js'
import Temperature from './tempComponent.js'
import TempDataFetcherComponent from './tempDataFetcherComponent.js'
import Menu from './menuComponent.js'
import Forecast3Day from './forecast3DayComponent.js'
import Moon from './moonComponent.js'
import Memory from './memoryComponent.js'

import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducers from '../reducers'

let store = createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export function renderRoot () {
  // TODO: make this a data point, I don't want to have to manually turn this off and again
  var isSummer = false

  var style = {
    textAlign: 'center',
    fontFamily: 'Roboto'
  }
  return (
    <Provider store={store}>
      <div className="body" style={style}>
        {!isSummer && <Menu />}
        {!isSummer && <Memory updateIntervalInMinutes="60" />}
        <Temperature sensorName="Basement" />
        <Temperature sensorName="Living Room" />
        <Temperature sensorName="Fish Tank" />
        <Forecast3Day updateIntervalInMinutes="60" />
        <Temperature sensorName="Bedroom" />
        <Temperature sensorName="Outside" />
        <Temperature sensorName="Garage" />
        <Moon updateIntervalInMinutes="60" />
        <DoorGraph title="Doors" duration="24h" updateIntervalInMinutes="5" />
        <TemperatureGraph title="Temperatures" duration="24h" updateIntervalInMinutes="5" />
      </div>
    </Provider>
  )
}
