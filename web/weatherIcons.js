import icon01d from './weatherIcons/icon01d.png'
import icon01n from './weatherIcons/icon01n.png'
import icon02d from './weatherIcons/icon02d.png'
import icon02n from './weatherIcons/icon02n.png'
import icon03d from './weatherIcons/icon03d.png'
import icon03n from './weatherIcons/icon03n.png'
import icon04d from './weatherIcons/icon04d.png'
import icon04n from './weatherIcons/icon04n.png'
import icon09d from './weatherIcons/icon09d.png'
import icon09n from './weatherIcons/icon09n.png'
import icon10d from './weatherIcons/icon10d.png'
import icon10n from './weatherIcons/icon10n.png'
import icon11d from './weatherIcons/icon11d.png'
import icon11n from './weatherIcons/icon11n.png'
import icon13d from './weatherIcons/icon13d.png'
import icon13n from './weatherIcons/icon13n.png'
import icon50d from './weatherIcons/icon50d.png'
import icon50n from './weatherIcons/icon50n.png'

module.exports = function (icon) {
  var retval
  if (icon === '01d') {
    retval = icon01d
  } else if (icon === '01n') {
    retval = icon01n
  } else if (icon === '02d') {
    retval = icon02d
  } else if (icon === '02n') {
    retval = icon02n
  } else if (icon === '03d') {
    retval = icon03d
  } else if (icon === '03n') {
    retval = icon03n
  } else if (icon === '04d') {
    retval = icon04d
  } else if (icon === '04n') {
    retval = icon04n
  } else if (icon === '09d') {
    retval = icon09d
  } else if (icon === '09n') {
    retval = icon09n
  } else if (icon === '10d') {
    retval = icon10d
  } else if (icon === '10n') {
    retval = icon10n
  } else if (icon === '11d') {
    retval = icon11d
  } else if (icon === '11n') {
    retval = icon11n
  } else if (icon === '13d') {
    retval = icon13d
  } else if (icon === '13n') {
    retval = icon13n
  } else if (icon === '50d') {
    retval = icon50d
  } else if (icon === '50n') {
    retval = icon50n
  }
  return retval
}
