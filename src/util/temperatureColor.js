import { Colors } from '../colors.js'

export const temperatureColor = temp => {
  let retval
  if (temp === 0) {
    retval = Colors.White
  } else if (temp > 75) {
    retval = Colors.SoftRed
  } else if (temp > 63) {
    retval = Colors.SoftGreen
  } else {
    retval = Colors.SoftBlue
  }
  return retval
}
