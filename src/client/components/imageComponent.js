import React from 'react'
import Colors from '../colors'
import PropTypes from 'prop-types'
import ClientConfig from '../config.js'

class ImageComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var renderInterval = 60000
    var backgroundColor = Colors.Black
    var foreColor = Colors.White

    if (updateInterval === 0) {
      updateInterval = 60000
    }

    this.state = {
      data: {
        name: props.name,
        imageurl: null,
        lastUpdate: '2017-01-01T00:00:00.000Z'
      },
      style: {
        width: '290px',
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
      that.setState(that.state)
    }, renderInterval)

    this.getData(this)
    setInterval(() => { that.getData(that) }, updateInterval)
  }
  getData (that) {
    fetch(ClientConfig.home_url + ':1000/?action=snapshot').then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.blob()
    }).then(function(blob) {
      that.state.data.imageurl = URL.createObjectURL(blob)
      that.setState(that)
    }).catch(function(error) {
      that.state.data = {
        name: that.state.data.name,
        imageurl: null,
        lastUpdate: '2017-01-01T00:00:00.000Z'
      }
      that.setState(that.state)
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      retval = (
        <div style={this.state.style}>
          <div style={{textAlign: 'center'}}>{this.state.data.name}</div>
          <img src={this.state.data.imageurl} height='170' width='270'/>
        </div>
      )
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
ImageComponent.propTypes = {
  name: PropTypes.string,
  updateIntervalInMinutes: PropTypes.number,
  }

export default ImageComponent
