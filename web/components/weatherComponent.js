import React from 'react'
import Colors from '../colors'
import Util from '../util'
import temperatureColor from '../temperatureColor'
import PropTypes from 'prop-types'

// Current Weather
class WeatherComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var alertCheckInterval = updateInterval * 1.5
    var renderInterval = 60000
    this.state = {
      data: {
        weatherDescription: 'Clear',
        temperature: 30,
        temperatureMin: 32,
        temperatureMax: 34,
        icon: '01d',
        day: 'Now',
        lastUpdate: '2017-01-01T00:00:00.000Z'
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
        padding: '10px 0'
      }
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

    this.getData(this)
    setInterval(() => { that.getData(that) }, updateInterval)
  }
  getData (that) {
    fetch('http://hub.hartcode.com/forecast').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (currentjson) {
      if (currentjson.weather) {
        that.state.data.weatherDescription = currentjson.weather[0].description
        that.state.data.icon = currentjson.weather[0].icon
        that.state.data.temperature = currentjson.main.temp
        that.state.data.temperatureMin = currentjson.main.temp_min
        that.state.data.temperatureMax = currentjson.main.temp_max
        that.state.data.day = 'Now'
        that.state.data.lastUpdate = new Date().toISOString()
      } else {
        // bad call
        var styleCloneBad = JSON.parse(JSON.stringify(that.state.style))
        styleCloneBad.backgroundColor = Colors.Blue
        that.state.style = styleCloneBad
      }
      that.setState(that.state)
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      const updateTimeInMinutes = Util.timeAgo(this.state.data.lastUpdate)
      retval = (
        <div style={this.state.style}>
          <div style={{textAlign: 'left', color: Colors.White}}>Current</div>
          <div style={this.state.innerStyle}>
            <div style={{padding: '5px 0', color: Colors.White}}>{this.state.data.day}</div>
            <img src={this.state.data.icon} />
            <div style={{margin: 'auto', width: '100px'}}>
              <div style={{color: temperatureColor(this.state.data.temperature), fontSize: '50px', float: 'left'}}>{Math.trunc(this.state.data.temperature)}</div>
              <div style={{float: 'left', padding: '10px 2px'}}>
                <div style={{color: temperatureColor(this.state.data.temperatureMax)}}>{Math.trunc(this.state.data.temperatureMax)}</div>
                <div style={{color: temperatureColor(this.state.data.temperatureMin)}}>{Math.trunc(this.state.data.temperatureMin)}</div>
              </div>
            </div>
            <div style={{color: Colors.White, clear: 'left'}}>{this.state.data.weatherDescription}</div>
          </div>
          <div style={{color: Colors.White, fontSize: '7px', textAlign: 'right'}}>{updateTimeInMinutes}</div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
WeatherComponent.propTypes = {
  updateIntervalInMinutes: PropTypes.number
}

export default WeatherComponent
