import Colors from './colors'

module.exports = function(that, alertCheckInterval) {
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
