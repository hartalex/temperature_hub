import DoorGraph from './doorGraphComponent.js'
import TemperatureGraph from './temperatureGraphComponent.js'
import Temperature from './tempComponent.js'
import Weather from './weatherComponent.js'
import Forecast3Day from './forecast3DayComponent.js'
import React from 'react'
import Colors from '../colors'
export function renderRoot () {
  var style = { 'backgroundColor': Colors.Black,
    textAlign: 'center',
    margin: 'auto',
    width: '90%' }
  return (
    <div className='body' style={style}>
      <DoorGraph title='Doors' duration='24h' updateIntervalInMinutes='5'/>
      <Temperature sensorName='Basement' updateIntervalInMinutes='5'/>
      <Temperature sensorName='Living Room' updateIntervalInMinutes='5'/>
      <TemperatureGraph title='Temperatures' duration='24h' updateIntervalInMinutes='5'/>
      <Temperature sensorName='Fish Tank' updateIntervalInMinutes='5'/>
      <Temperature sensorName='Bedroom' updateIntervalInMinutes='5'/>
      <Temperature sensorName='Outside' updateIntervalInMinutes='5'/>
      <Weather zipCode='53012' updateIntervalInMinutes='60' />
      <Forecast3Day zipCode='53012' updateIntervalInMinutes='60' />
    </div>
  )
}
