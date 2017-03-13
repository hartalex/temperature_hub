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
  }

}
