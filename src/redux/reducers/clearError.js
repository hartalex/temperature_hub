export default function reduce(state, action) {
  var retval = {}
  retval.error = null
  retval.loadingIsHidden =state.loadingIsHidden
  retval.data = state.data
  retval.data_page = state.data_page
  retval.query = state.query
  retval.offset = state.offset
  return retval
}
