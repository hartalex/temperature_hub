export default function reduce(state, action) {
  var retval ={}
    retval.loadingIsHidden = true
    if (typeof action.data === 'undefined') {
      retval.data = action.data
    } else {
      if (action.isMore)
      {
        retval.data = state.data.concat(action.data.data)
      } else {
        retval.data = action.data.data
      }
      retval.data_page = {
        total:action.data.result_total,
        offset:action.data.result_offset,
        count: action.data.result_count
      }
    }
    retval.error = state.error
    retval.query = state.query
    retval.offset = state.offset
  return retval
}
