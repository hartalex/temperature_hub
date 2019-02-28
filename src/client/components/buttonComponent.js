import React from 'react'
import Colors from '../colors'
import Util from '../util'
import PropTypes from 'prop-types'
import ClientConfig from '../config.js'
import AlertCheck from '../alertCheck'
import socketio from 'socket.io-client'

class ButtonComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInSeconds * 1000
    if (updateInterval === 0) {
      updateInterval = 60000
    }
    var alertCheckInterval = updateInterval * 1.5
    var renderInterval = 30000
    this.state = {
      data: {
        count: 0,
        lastUpdate: '2017-01-01T00:00:00.000Z'
      },
      style: {
        width: '127px',
        height: '125px',
        border: '1px solid darkgray',
        background: Colors.Black,
        textAlign: 'center',
        float: 'left',
        color: Colors.White,
        fontSize: '10px'
      },
      innerStyle: {
        padding: '2px 0'
      }
    }
    var that = this

    const socket = socketio(ClientConfig.hub_api_url + '/buttonSocket')
    socket.on('button', function (button) {
      if (button.count) {
        that.state.data.count = button.count
      }
      that.state.data.lastUpdate = new Date().toISOString()
      var styleClone = JSON.parse(JSON.stringify(that.state.style))
      that.state.style = styleClone
      that.setState(that.state)
    })
  }
  render () {
    var retval
    if (this.state && this.state.data !== null) {
      const updateTimeInMinutes = Util.timeAgo(this.state.data.lastUpdate)
      retval = (
        <div style={this.state.style}>
          <div style={this.state.innerStyle}>
            <div style={{ margin: 'auto', width: '100px' }}>
              <div style={{ fontSize: '32px', float: 'left' }}>{this.state.data.count}</div>
            </div>
          </div>
          <div style={{ color: Colors.White, fontSize: '7px', textAlign: 'right' }}>{updateTimeInMinutes}</div>
        </div>
      )
    } else {
      retval = <div style={this.state.style}>Fetching Data</div>
    }
    return retval
  }
}

ButtonComponent.propTypes = {
  updateIntervalInSeconds: PropTypes.number
}

export default ButtonComponent
