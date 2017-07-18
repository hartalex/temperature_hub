import React from 'react'
import PropTypes from 'prop-types'

class TimeComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    this.state = {
      data: {
        name: '',
        hour: props.hour,
        minute: props.minute,
        pmam: 'am'
      }
    }
    var that = this
    if (props.pmam) {
      that.state.data.pmam = props.pmam
    }
    if (props.name) {
      that.state.data.name = props.name
    }
    if (that.state.data.hour > 12) {
      that.state.data.hour -= 12
      that.state.data.pmam = 'pm'
    }
    that.setState(that.state)
  }
  render () {
    var retval
    if (this.state.data.name !== '') {
      retval = (<div>{this.state.data.name}: {this.state.data.hour}:{this.state.data.minute} {this.state.data.pmam}</div>)
    } else {
      retval = (<div>{this.state.data.hour}:{this.state.data.minute} {this.state.data.pmam}</div>)
    }
    return retval
  }
}

TimeComponent.propTypes = {
  name: PropTypes.string,
  hour: PropTypes.number,
  minute: PropTypes.number,
  pmam: PropTypes.string
}


export default TimeComponent
