import React from 'react'
import Colors from '../colors'
import Util from '../util'

class TemperatureComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateInterval * 60000
    var renderInterval = 60000
    this.state = {
      data: null,
      style: {
        width: '200px',
        height: '400px',
        fontSize: '250%',
        backgroundColor: Colors.Black,
        textAlign: 'center',
        float: 'left',
        color: Colors.White
      }
    }
    this.state.data = {name: props.sensorName,
      temperature: 0,
      lastUpdate: '2017-01-01T00:00:00.000Z'
    }
    var that = this

    setInterval(() => {
      if (new Date() - new Date(that.state.data.lastUpdate) > updateInterval) {
        that.state.style.backgroundColor = Colors.Red
      } else {
        that.state.style.backgroundColor = Colors.Black
      }
      that.setState(that.state)
    }, renderInterval)

    this.getData(props.sensorName, this)
    setInterval(() => { that.getData(props.sensorName, that) }, updateInterval)
  }
  getData (sensorName, that) {
    console.log('here')
    fetch('http://hub.hartcode.com/temp/current').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (currentjson) {
      console.log('found current')
      for (var i = 0; i < currentjson.length; i++) {
        var sensor = currentjson[i]
        if (sensor.sensorName === sensorName) {
          that.state.data.temperature = sensor.tempInFarenheit
          that.state.data.lastUpdate = new Date().toISOString()
          that.setState(that.state)
        }
      }
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      const updateTimeInMinutes = Util.timeAgo(this.state.data.lastUpdate)
      retval = (<div style={this.state.style}>
        <div style={{fontSize: '400%'}}>{Math.trunc(this.state.data.temperature)}</div>
        <div>{this.state.data.name}</div>
        <div style={{fontSize: '50%', textAlign: 'right'}}>{updateTimeInMinutes}</div>
      </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
export default TemperatureComponent
