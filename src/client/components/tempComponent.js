import React from 'react'
import Colors from '../colors'
import Util from '../util'
import temperatureColor from '../temperatureColor'
import PropTypes from 'prop-types'
import ClientConfig from '../config.js'

class TemperatureComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    if (updateInterval === 0) {
      updateInterval = 60000
    }
    var alertCheckInterval = updateInterval * 1.5
    var renderInterval = 60000
    this.state = {
      data: {
        name: props.sensorName,
        temperature: 0,
        lastUpdate: '2017-01-01T00:00:00.000Z',
        outdated: true
      },
      style: {
        width: '140px',
        height: '200px',
        border: '5px solid darkgray',
        background: Colors.Black,
        textAlign: 'center',
        float: 'left',
        color: Colors.White,
        fontSize: '14px'
      },
      innerStyle: {
        padding: '50px 0'
      }
    }
    setInterval(() => {
      this.reRender(alertCheckInterval)
    }, renderInterval)
    this.getData(props.sensorName, this)
    setInterval(() => { this.getData(props.sensorName, this) }, updateInterval)
  }
  reRender(alertCheckInterval) {
    var newState = this.state
    if (new Date() - new Date(this.state.data.lastUpdate) > alertCheckInterval) {
      var style = JSON.parse(JSON.stringify(this.state.style))
      style.backgroundColor = Colors.Red
      newState.style = style
    } else if (this.state.style.backgroundColor !== Colors.Black) {
      var styleClone = JSON.parse(JSON.stringify(this.state.style))
      styleClone.backgroundColor = Colors.Black
      newState.style = styleClone
    }
    this.setState(newState)
  }
  getData (sensorName, obj) {
    fetch(ClientConfig.hub_api_url + '/temp/current').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server, ' + response.status)
      }
      return response.json()
    }).then(function (currentjson) {
      for (var i = 0; i < currentjson.length; i++) {
        var sensor = currentjson[i]
        if (sensor.sensorName === sensorName) {
          var newState = obj.state
          newState.data.outdated = sensor.outdated
          if (!sensor.outdated) {
            newState.data.temperature = sensor.tempInFarenheit
          } else {
            newState.data.temperature = 0
          }
          newState.data.lastUpdate = new Date().toISOString()

          var styleClone = JSON.parse(JSON.stringify(newState.style))
          styleClone.color = temperatureColor(newState.data.temperature)
          newState.style = styleClone
          obj.setState(newState)
        }
      }
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      const updateTimeInMinutes = Util.timeAgo(this.state.data.lastUpdate)
      var temp = Math.trunc(this.state.data.temperature)
      var tempDecimal = Math.abs(Math.trunc((this.state.data.temperature - temp) * 100))
      if (this.state.data.temperature === 0) {
        temp = '--'
        tempDecimal = '--'
      }
      retval = (
        <div style={this.state.style}>
          <div style={this.state.innerStyle}>
            <div style={{margin: 'auto', width: '100px'}}>
              <div style={{fontSize: '62px', float: 'left'}}>{temp}</div>
              <div style={{float: 'left', padding: '44px 2px 0px 0px'}}>{tempDecimal}</div>
            </div>
            <div style={{clear: 'both', color: Colors.White}} >{this.state.data.name}</div>
          </div>
          <div style={{color: Colors.White, fontSize: '7px', textAlign: 'right'}}>{updateTimeInMinutes}</div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}

TemperatureComponent.propTypes = {
  updateIntervalInMinutes: PropTypes.number,
  sensorName: PropTypes.string
}


export default TemperatureComponent
