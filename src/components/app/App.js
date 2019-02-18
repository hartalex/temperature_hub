import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { DoorGraph } from '../doorGraph/doorGraphComponent.js'
import { TemperatureGraph } from '../temperatureGraph/temperatureGraphComponent.js'
import { TemperatureComponent } from '../temperature/temperatureComponent.js'
import { TemperatureDataFetcherComponent } from '../temperature/temperatureDataFetcherComponent.js'
import { MenuComponent } from '..//menu/menuComponent.js'
import { Forecast3DayComponent } from '../forecast3Day/forecast3DayComponent.js'
import { MoonComponent } from '../moon/moonComponent.js'
import { MemoryComponent } from '../memory/memoryComponent.js'
import { reducers } from '../../redux/reducers.js'
import './App.css'

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export class App extends Component {
  render() {
    var style = {
      textAlign: 'center',
      fontFamily: 'Roboto'
    }
    return (
      <Provider store={store}>
        <div className="body" style={style}>
          <DoorGraph title="Doors" duration="24h" updateIntervalInMinutes="5" />
          <TemperatureGraph
            title="Temperatures"
            duration="24h"
            updateIntervalInMinutes="5"
          />

          <TemperatureComponent sensorName="Living Room" />
          <TemperatureComponent sensorName="Fish Tank" />
          <TemperatureComponent sensorName="Bedroom" />
          <TemperatureComponent sensorName="Outside" />
          <TemperatureComponent sensorName="Garage" />
          <Forecast3DayComponent updateIntervalInMinutes="60" />
          <MoonComponent updateIntervalInMinutes="60" />
          <TemperatureDataFetcherComponent updateIntervalInMinutes="5" />
        </div>
      </Provider>
    )
  }
}

//

//
