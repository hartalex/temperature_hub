import React from 'react'
import Colors from '../colors'
import getWeekDay from '../weekDay.js'
import PropTypes from 'prop-types'
import ClientConfig from '../config.js'
import Util from '../util.js'

class MenuDayComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var renderInterval = 60000
    var backgroundColor = Colors.Black
    var foreColor = Colors.White
    var date = Util.calculateTodayTomorrowNextDay(props.day)
    if (updateInterval === 0) {
      updateInterval = 60000
    }
    var day = new Date(date).getDay() + 1
    if (day > 6) {
      day = 0
    }
    if (day >= 1 && day <= 5) {
      backgroundColor = Colors.SoftYellow
      foreColor = Colors.Black
    }
    this.state = {
      data: {
        date: date,
        firstOption: null,
        secondOption: null,
        otherStuff: null,
        day: props.day,
        lastUpdate: '2017-01-01T00:00:00.000Z'
      },
      style: {
        height: '90px',
        width: '123px',
        background: backgroundColor,
        textAlign: 'center',
        float: 'left',
        color: foreColor,
        fontSize: '10px',
        padding: '10px 0'
      }
    }
    var that = this

    setInterval(() => {
      var date = Util.calculateTodayTomorrowNextDay(props.date)

      if (that.state.data.date !== date) {
        that.state.data.date = date
      }
      that.setState(that.state)
    }, renderInterval)

    this.getData(this)
    setInterval(() => {
      that.getData(that)
    }, updateInterval)
  }
  getData (that) {
    fetch(ClientConfig.hub_api_url + '/menu/list/' + that.state.data.date)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
      .then(function (currentjson) {
        if (currentjson.data && currentjson.data.length > 0) {
          var menu = currentjson.data[0]
          that.state.data.date = menu.date
          that.state.data.firstOption = menu.firstOption
          that.state.data.secondOption = menu.secondOption
          that.state.data.otherStuff = menu.otherStuff
          var style = JSON.parse(JSON.stringify(that.state.style))
          style.backgroundColor = Colors.Black
          style.color = Colors.White
          that.state.style = style
        } else {
          that.state.data.firstOption = null
          that.state.data.secondOption = null
          that.state.data.otherStuff = null

          var day = new Date(that.state.data.date).getDay() + 1
          if (day > 6) {
            day = 0
          }
          if (day >= 1 && day <= 5) {
            var styleClone = JSON.parse(JSON.stringify(that.state.style))
            styleClone.backgroundColor = Colors.SoftYellow
            styleClone.color = Colors.Black
            that.state.style = styleClone
            that.state.data.firstOption = 'No Lunch'
          }
        }
        that.state.data.lastUpdate = new Date().toISOString()
        that.setState(that.state)
      })
      .catch(function (error) {
        that.state.data = {
          date: that.state.data.date,
          firstOption: null,
          secondOption: null,
          otherStuff: null,
          day: that.state.data.day,
          lastUpdate: '2017-01-01T00:00:00.000Z'
        }
        that.setState(that.state)
      })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      var day = new Date(this.state.data.date).getDay() + 1
      if (day > 6) {
        day = 0
      }
      retval = (
        <div style={this.state.style}>
          <div style={{ textAlign: 'center' }}>{getWeekDay(day)}</div>
          <ol style={{ fontSize: '10px', textAlign: 'left', margin: 0, padding: '5px' }}>
            {this.state.data.firstOption !== null && (
              <li style={{ fontSize: '8px', clear: 'left' }}>{this.state.data.firstOption}</li>
            )}
            {this.state.data.secondOption !== null && (
              <li style={{ fontSize: '8px', clear: 'left' }}>Or {this.state.data.secondOption}</li>
            )}
          </ol>
          <div style={{ fontSize: '8px', clear: 'left' }}>{this.state.data.otherStuff}</div>
        </div>
      )
    } else {
      retval = <div style={this.state.style}>Fetching Data</div>
    }
    return retval
  }
}
MenuDayComponent.propTypes = {
  updateIntervalInMinutes: PropTypes.number,
  day: PropTypes.number,
  date: PropTypes.string
}

export default MenuDayComponent
