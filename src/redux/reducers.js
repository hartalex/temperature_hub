import defaultAction from './reducers/default'
import fetchDataStart from './reducers/fetchDataStart'
import fetchDataComplete from './reducers/fetchDataComplete'
import setError from './reducers/setError'
import clearError from './reducers/clearError'

export const initialState = {
  loadingIsHidden:true,
  error: null,
  data: [],
  data_page: {
    total:0,
    offset:0,
    count: 0
  },
  query:'',
  offset: 0
}

export function reduce(state, action) {
  if (typeof state === 'undefined') { state = initialState }
  let getNextState
  switch(action.type) {
    case 'FetchDataStart':
      getNextState = fetchDataStart
      break;
    case 'FetchDataComplete':
      getNextState = fetchDataComplete
      break;
    case 'SetError':
      getNextState = setError
      break;
    case 'ClearError':
      getNextState = clearError
      break;
    default:
      getNextState = defaultAction
  }
  return getNextState(state, action)
}
