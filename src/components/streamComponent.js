import React from 'react'
import Colors from '../colors'
import PropTypes from 'prop-types'

class StreamComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)

    var backgroundColor = Colors.Black
    var foreColor = Colors.White

    this.state = {
      data: {
        name: props.name,
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
  }
  render () {
    var retval
      retval = (
        <div style={this.state.style}>
          <div style={{textAlign: 'center'}}>{this.state.data.name}</div>
          <img src='http://home.hartcode.com:1000/?action=stream' height='170' width='270'/>
        </div>
      )
    return retval
  }
}
StreamComponent.propTypes = {
  name: PropTypes.string
}

export default StreamComponent
