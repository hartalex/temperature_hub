import React from 'react'
import Colors from '../colors'
import Util from '../util'
import temperatureColor from '../temperatureColor'

class TemperatureComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var alertCheckInterval = updateInterval * 1.5
    var renderInterval = 60000
    this.state = {
      data: null,
      style: {
        width: '140px',
        height: '200px',
        border: '5px solid darkgray',
        background: Colors.Black,
        textAlign: 'center',
        float: 'left',
        color: Colors.White
      },
      innerStyle: {
        padding: '50px 0'
      }
    }
    this.state.data = {name: props.sensorName,
      temperature: 0,
      lastUpdate: '2017-01-01T00:00:00.000Z'
    }
    var that = this

    setInterval(() => {
      if (new Date() - new Date(that.state.data.lastUpdate) > alertCheckInterval) {
        var style = JSON.parse(JSON.stringify(that.state.style))
        style.backgroundColor = Colors.Red
        that.state.style = style
      } else if (that.state.style.backgroundColor !== Colors.Black) {
        var styleClone = JSON.parse(JSON.stringify(that.state.style))
        styleClone.backgroundColor = Colors.Black
        that.state.style = styleClone
      }
      that.setState(that.state)
    }, renderInterval)

    this.getData(props.sensorName, this)
    setInterval(() => { that.getData(props.sensorName, that) }, updateInterval)
  }
  getData (sensorName, that) {
    fetch('http://hub.hartcode.com/temp/current').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (currentjson) {
      for (var i = 0; i < currentjson.length; i++) {
        var sensor = currentjson[i]
        if (sensor.sensorName === sensorName) {
          that.state.data.temperature = sensor.tempInFarenheit
          that.state.data.lastUpdate = new Date().toISOString()
          var styleClone = JSON.parse(JSON.stringify(that.state.style))
          styleClone.color = temperatureColor(that.state.data.temperature)
          that.state.style = styleClone
          that.setState(that.state)
        }
      }
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      const updateTimeInMinutes = Util.timeAgo(this.state.data.lastUpdate)
      retval = (
        <div style={this.state.style}>
          <div style={this.state.innerStyle}>
            <div style={{fontSize: '400%'}}>{Math.trunc(this.state.data.temperature)}</div>
            <div style={{color: Colors.White}} >{this.state.data.name}</div>
          </div>
          <div style={{color: Colors.White, fontSize: '50%', textAlign: 'right'}}>{updateTimeInMinutes}</div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
export default TemperatureComponent
