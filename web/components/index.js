import DoorGraph from './doorGraphComponent.js'
import TemperatureGraph from './temperatureGraphComponent.js'
import Temperature from './tempComponent.js'
import React from 'react'
import Colors from '../colors'
export function renderRoot () {
  var style = { 'backgroundColor': Colors.Black,
    textAlign: 'center' }
  return (
    <div className='body' style={style}>
      <DoorGraph title='Doors' duration='24h' updateInterval='5'/>
      <TemperatureGraph title='Temperatures' duration='24h' updateInterval='5'/>
      <Temperature sensorName='Basement' updateInterval='5'/>
      <Temperature sensorName='Living Room' updateInterval='5'/>
      <Temperature sensorName='Fish Tank' updateInterval='5'/>
      <Temperature sensorName='Outside' updateInterval='5'/>
      <Temperature sensorName='Bedroom' updateInterval='5'/>
    </div>
  )
}
