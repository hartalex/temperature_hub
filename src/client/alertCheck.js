import Colors from '../colors'

module.exports = function(that, alertCheckInterval) {
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
}