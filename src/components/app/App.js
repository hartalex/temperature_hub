import DoorGraph from '../doorGraphComponent.js'
import TemperatureGraph from '../temperatureGraphComponent.js'
import Temperature from '../tempComponent.js'
import TempDataFetcherComponent from '../tempDataFetcherComponent.js'
import Menu from '..//menu/menuComponent.js'
import Forecast3Day from '../forecast3DayComponent.js'
import Moon from '../moonComponent.js'
import Memory from '../memoryComponent.js'

import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducers from '../../reducers'
import './App.css'

let store = createStore(Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends Component {
  render () {
    var style = {
      textAlign: 'center',
      fontFamily: 'Roboto',
      }
    return (
      <Provider store={store}>
      <div className='body' style={style}>
        <DoorGraph title='Doors' duration='24h' updateIntervalInMinutes='5'/>
        <TemperatureGraph title='Temperatures' duration='24h' updateIntervalInMinutes='5'/>
        <Temperature sensorName='Greenhouse'/>
        <Temperature sensorName='Living Room'/>
        <Temperature sensorName='Fish Tank'/>

        <Forecast3Day updateIntervalInMinutes='60' />
        <Temperature sensorName='Bedroom'/>
        <Temperature sensorName='Outside'/>
        <Temperature sensorName='Garage'/>
        <Moon updateIntervalInMinutes='60' />
        <Menu />
        <Memory updateIntervalInMinutes='60' />

      <TempDataFetcherComponent updateIntervalInMinutes='5'/>
      </div>
      </Provider>
    )
  }

}

export default App
