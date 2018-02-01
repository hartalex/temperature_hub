module.exports = {
  timeAgo (time) {
    var retval = Math.trunc((new Date() - new Date(time)) / 1000)
    if (retval > 60) {
      retval = Math.trunc(retval / 60)
      if (retval > 60) {
        retval = Math.trunc(retval / 60)
        retval = retval + ' hour'
      } else {
        retval = retval + ' min'
      }
    } else {
      retval = retval + ' sec'
    }
    return retval
  },
  calculateTodayTomorrowNextDay(propDay) {
    var retval
    if (propDay === 'Today') {
      retval = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10)
    } else if (propDay === 'Tomorrow') {
      retval = new Date((new Date().getTime() + 24 * 60 * 60 * 1000) - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10)
    } else if (propDay === 'NextDay') {
      retval = new Date((new Date().getTime() + 48 * 60 * 60 * 1000) - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10)
    }
    return retval
  }

}
