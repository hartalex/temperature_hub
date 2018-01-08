import React from 'react'
import Colors from '../colors'
import PropTypes from 'prop-types'
import ClientConfig from '../config.js'

class MemoryComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var renderInterval = 60000
    var backgroundColor = Colors.Black
    var foreColor = Colors.White
    var date

    date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10)

    this.state = {
      data: {
        date: date,
        firstMemory: null,
        secondMemory: null,
        lastUpdate: '2017-01-01T00:00:00.000Z'
      },
      style: {
        width: '440px',
        height: '200px',
        border: '5px solid darkgray',
        background: backgroundColor,
        textAlign: 'center',
        float: 'left',
        color: foreColor,
        fontSize: '14px'
      }
    }
    var that = this

    setInterval(() => {
      var date
        date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10)
      if (that.state.data.date !== date) {
        that.state.data.date = date
      }
      that.setState(that.state)
    }, renderInterval)

    this.getData(this)
    setInterval(() => { that.getData(that) }, updateInterval)
  }
  getData (that) {
    fetch(ClientConfig.hub_api_url + '/memory/list/' + that.state.data.date).then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (currentjson) {
      if (currentjson.length > 0) {
        var menu = currentjson[0]
        that.state.data.date = menu.date
        that.state.data.firstMemory = menu.firstMemory
        that.state.data.secondMemory = menu.secondMemory
        var style = JSON.parse(JSON.stringify(that.state.style))
        style.backgroundColor = Colors.Black
        style.color = Colors.White
        that.state.style = style
      } else {
        that.state.data.firstMemory = null
        that.state.data.secondMemory = null
      }
      that.state.data.lastUpdate = new Date().toISOString()
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
          <div style={{textAlign: 'center'}}>Memory</div>
          <ol style={{fontSize: '10px', textAlign: 'left', margin: 0, padding: '20px'}}>
          { this.state.data.firstMemory !== null &&
          <li style={{fontSize: '12px', clear: 'left'}}>{this.state.data.firstMemory}</li>
          }
          { this.state.data.secondMemory !== null &&
            <li style={{fontSize: '12px', padding: '5px 0', clear: 'left'}}>Or {this.state.data.secondMemory}</li>
          }
          </ol>
        </div>
      )
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
MemoryComponent.propTypes = {
  updateIntervalInMinutes: PropTypes.number,
  day: PropTypes.number,
  date: PropTypes.string
}

export default MemoryComponent
