const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
export const getWeekDay = i => {
  return weekdays[i % 7]
}

export const timeAgo = time => {
  var retval = Math.trunc((new Date() - new Date(time)) / 1000)
  if (retval > 60) {
    retval = Math.trunc(retval / 60)
    if (retval >= 60) {
      retval = Math.trunc(retval / 60)
      retval = retval + ' hour'
    } else {
      retval = retval + ' min'
    }
  } else {
    retval = retval + ' sec'
  }
  return retval
}

export const calculateTodayTomorrowNextDay = propDay => {
  var retval
  var day = 0
  if (propDay === 'Today') {
    day = 0
  } else if (propDay === 'Tomorrow') {
    day = 1
  } else if (propDay === 'NextDay') {
    day = 2
  }

  retval = new Date(
    new Date().getTime() +
      24 * day * 60 * 60 * 1000 -
      new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .substring(0, 10)
  return retval
}
