import React from 'react'
import Colors from '../colors'
import Util from '../util'
import weatherIcons from '../weatherIcons'
import temperatureColor from '../temperatureColor'
// 3 Day Forecast
class Forecast3DayComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var alertCheckInterval = updateInterval * 1.5
    var renderInterval = 60000
    this.state = {
      data: null,
      style: {
        width: '440px',
        height: '200px',
        border: '5px solid darkgray',
        background: Colors.Black,
        textAlign: 'center',
        float: 'left',
        color: Colors.White
      },
      innerStyle: {
        width: '140px',
        float: 'left',
        padding: '10px 0'
      }
    }
    this.state.data = { forecast:
    [{
      weatherDescription: 'Clear',
      temperature: 30,
      temperatureMin: 32,
      temperatureMax: 34,
      icon: '01d',
      day: 'Today',
      dt: '1489687200'
    }, {
      weatherDescription: 'Clear',
      temperature: 30,
      temperatureMin: 32,
      temperatureMax: 34,
      icon: '01d',
      day: 'Tomorrow',
      dt: '1489770000'
    }, {
      weatherDescription: 'Clear',
      temperature: 30,
      temperatureMin: 32,
      temperatureMax: 34,
      icon: '01d',
      day: 'Next Day',
      dt: '1489856400'
    }
    ],
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

    this.getData(props.zipCode, this)
    setInterval(() => { that.getData(props.zipCode, that) }, updateInterval)
  }
  getData (zipCode, that) {
    fetch('http://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zipCode + ',us&cnt=3&units=imperial&APPID=ff0a82517e493281a9716e1e350d1ebf').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (currentjson) {
      if (currentjson.list) {
        for (var i = 0; i < 3; i++) {
          that.state.data.forecast[i].weatherDescription = currentjson.list[i].weather[0].description
          that.state.data.forecast[i].icon = currentjson.list[i].weather[0].icon
          that.state.data.forecast[i].temperature = currentjson.list[i].temp.day
          that.state.data.forecast[i].temperatureMin = currentjson.list[i].temp.min
          that.state.data.forecast[i].temperatureMax = currentjson.list[i].temp.max
          that.state.data.forecast[i].dt = currentjson.list[i].dt
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
            <div style={{padding: '5px 0', color: Colors.White}}>{obj.day}</div>
            <img src={weatherIcons(obj.icon)} />
            <div style={{margin: 'auto', width: '50%'}}>
              <div style={{color: temperatureColor(obj.temperature), fontSize: '300%', float: 'left'}}>{Math.trunc(obj.temperature)}</div>
              <div style={{float: 'left', padding: '10px 2px'}}>
                <div style={{color: temperatureColor(obj.temperatureMax)}}>{Math.trunc(obj.temperatureMax)}</div>
                <div style={{color: temperatureColor(obj.temperatureMin)}}>{Math.trunc(obj.temperatureMin)}</div>
              </div>
            </div>
            <div style={{color: Colors.White, clear: 'left'}}>{obj.weatherDescription}</div>
          </div>
          )}
          <div style={{clear: 'left', color: Colors.White, fontSize: '50%', textAlign: 'right'}}>{updateTimeInMinutes}</div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
export default Forecast3DayComponent
