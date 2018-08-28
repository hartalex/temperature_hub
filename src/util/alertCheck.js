import {Colors} from '../colors'

export const alertCheck = function(that, alertCheckInterval) {
  return () => {
    var color
    if (new Date() - new Date(that.state.data.lastUpdate) > alertCheckInterval) {
      color = Colors.Red
    } else {
      color = Colors.Black
    }
    var styleClone = JSON.parse(JSON.stringify(that.state.style))
    styleClone.backgroundColor = color
    that.state.style = styleClone
    that.setState(that.state)
  }
}
