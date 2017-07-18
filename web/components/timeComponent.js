import React from 'react'
import PropTypes from 'prop-types'

class TimeComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    this.state = {
      data: {
        name: '',
        hour: '00',
        minute: '00',
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
    that.state.data.hour = props.hour
    that.state.data.minute = props.minute
    if (that.state.data.hour > 12) {
      that.state.data.hour = that.state.data.hour - 12
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
  componentDidUpdate(prevProps, prevState) {
   var data = prevState.data
   if (prevProps.name !== data.name ||
       prevProps.hour !== data.hour ||
       prevProps.minute !== data.minute ||
       prevProps.pmam !== data.pmam) {
      data.hour = prevProps.hour
      data.minute = prevProps.minute
      data.pmam = prevProps.pmam
      data.name = prevProps.name
      if (data.hour > 12) {
        data.hour = data.hour - 12
        data.pmam = 'pm'
      }
      this.setState({data: data})
    }
  }
}

TimeComponent.propTypes = {
  name: PropTypes.string,
  hour: PropTypes.string,
  minute: PropTypes.string,
  pmam: PropTypes.string
}


export default TimeComponent
