import Colors from './colors'

module.exports = function (temp) {
  var retval
  if (temp === 0) {
    retval = Colors.White
  } else
  if (temp > 75) {
    retval = Colors.SoftRed
  } else if (temp > 63) {
    retval = Colors.SoftGreen
  } else {
    retval = Colors.SoftBlue
  }
  return retval
}
