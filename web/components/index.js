import DoorGraph from './doorGraphComponent.js'
import TemperatureGraph from './temperatureGraphComponent.js'
import React from 'react'
import Colors from '../colors'
export function renderRoot () {
  var style = { 'backgroundColor': Colors.White,
    textAlign: 'center' }
  return (
    <div className='body' style={style}>
      <DoorGraph duration='24h'/>
      <TemperatureGraph duration='24h'/>
    </div>
  )
}
