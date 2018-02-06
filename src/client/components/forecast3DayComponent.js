import React from 'react'
import Colors from '../colors'
import Util from '../util'
import temperatureColor from '../temperatureColor'
import getWeekDay from '../weekDay.js'
import PropTypes from 'prop-types'
import ClientConfig from '../config.js'
import AlertCheck from '../alertCheck'

// 3 Day Forecast
class Forecast3DayComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var alertCheckInterval = updateInterval * 1.5
    var renderInterval = 60000

    if (updateInterval === 0) {
      updateInterval = 60000
    }
    this.state = {
      data: {
        forecast:
      [{
        weatherDescription: 'Clear',
        temperature: 30,
        temperatureMin: 32,
        temperatureMax: 34,
        icon: '',
        day: 'Today',
        dt: '1489687200'
      }, {
        weatherDescription: 'Clear',
        temperature: 30,
        temperatureMin: 32,
        temperatureMax: 34,
        icon: '',
        day: 'Tomorrow',
        dt: '1489770000'
      }, {
        weatherDescription: 'Clear',
        temperature: 30,
        temperatureMin: 32,
        temperatureMax: 34,
        icon: '',
        day: 'Next Day',
        dt: '1489856400'
      }
      ],
        lastUpdate: '2017-01-01T00:00:00.000Z'
      },
      style: {
        width: '440px',
        height: '200px',
        border: '5px solid darkgray',
        background: Colors.Black,
        textAlign: 'center',
        float: 'left',
        color: Colors.White,
        fontSize: '14px'
      },
      innerStyle: {
        width: '140px',
        float: 'left',
        padding: '10px 0'
      }
    }
    var that = this

    setInterval(AlertCheck(that, alertCheckInterval), renderInterval)

    this.getData(this)
    setInterval(() => { that.getData(that) }, updateInterval)
  }
  getData (that) {
    fetch(ClientConfig.hub_api_url + '/forecast').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (currentjson) {
      if (currentjson.simpleforecast) {
        if (currentjson.simpleforecast.forecastday) {
        for (var i = 0; i < 3; i++) {

          that.state.data.forecast[i].weatherDescription = currentjson.simpleforecast.forecastday[i].conditions
          that.state.data.forecast[i].icon = currentjson.simpleforecast.forecastday[i].icon_url.replace('http:','https:')
          that.state.data.forecast[i].temperatureMax = currentjson.simpleforecast.forecastday[i].high.fahrenheit
          that.state.data.forecast[i].temperatureMin = currentjson.simpleforecast.forecastday[i].low.fahrenheit
          that.state.data.forecast[i].dt = currentjson.simpleforecast.forecastday[i].date.epoch
          that.state.data.forecast[i].pop = currentjson.simpleforecast.forecastday[i].pop
        }
        that.state.data.forecast[0].day = 'Today'
        that.state.data.forecast[1].day = 'Tomorrow'
        that.state.data.forecast[2].day = 'Next Day'
        that.state.data.lastUpdate = new Date().toISOString()
      } else {
        // bad call
        var styleCloneBad = JSON.parse(JSON.stringify(that.state.style))
        styleCloneBad.backgroundColor = Colors.Blue
        that.state.style = styleCloneBad
      }
      that.setState(that.state)
    }
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      const updateTimeInMinutes = Util.timeAgo(this.state.data.lastUpdate)
      retval = (
        <div style={this.state.style}>
          <div style={{textAlign: 'left', color: Colors.White}}>Forecast</div>
          {this.state.data.forecast.map((obj) =>
            <div key={obj.dt} style={this.state.innerStyle}>
            <div style={{padding: '5px 0', color: Colors.White}}>{getWeekDay(new Date(parseInt(obj.dt * 1000)).getDay())}</div>
            <img src={obj.icon} />
            <div style={{margin: 'auto', width: '100px', fontSize: '25px'}}>
                <div style={{float: 'left', paddingLeft: '20px', color: temperatureColor(obj.temperatureMin)}}>{Math.trunc(obj.temperatureMin)}</div>
                <div style={{float: 'left', paddingLeft: '10px', color: temperatureColor(obj.temperatureMax)}}>{Math.trunc(obj.temperatureMax)}</div>
            </div>
            <div style={{color: Colors.White, clear: 'left'}}>{obj.weatherDescription}</div>
            <div style={{color: Colors.White, clear: 'left'}}>{obj.pop}%</div>
          </div>
          )}
          <div style={{clear: 'left', color: Colors.White, fontSize: '7px', textAlign: 'right'}}>{updateTimeInMinutes}</div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
Forecast3DayComponent.propTypes = {
  updateIntervalInMinutes: PropTypes.number
}
export default Forecast3DayComponent
