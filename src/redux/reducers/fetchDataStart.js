export default function reduce(state, action) {
  var retval = {}
  retval.data = state.data
  retval.loadingIsHidden = false
  retval.error = null // invalidate error
  retval.data_page = state.data_page
  retval.query = action.query
  retval.offset = state.offset
  return retval
}
