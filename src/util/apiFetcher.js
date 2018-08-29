import 'whatwg-fetch'
import { fetchJsonResponseHandler } from './fetchJsonResponseHandler.js'
import { API_URL } from '../config.js'
const DEFAULT_LAST_QUERY = 'FIRST_RUN'

var lastQueryValue = DEFAULT_LAST_QUERY
var lastQueryTime = new Date(0)
var lastOffset = -1

const queryHasNotChanged = (query, offset) => {
  return query === lastQueryValue && lastOffset === offset
}

const queryHasChanged = (query, offset) => {
  return query !== lastQueryValue || lastOffset !== offset
}

const nSecondsHaveElapsed = seconds => {
  return new Date() - new Date(lastQueryTime) > seconds * 1000
}

export async function apiFetchData(query, offset, actions) {
  if (typeof offset === 'undefined') {
    offset = 0
  }
  if (query === '') {
    // clear current data
    actions.fetchDataComplete()
  } else if (
    queryHasChanged(query, offset) ||
    (queryHasNotChanged(query, offset) && nSecondsHaveElapsed(5))
  ) {
    // fetch from api
    fetchData(query, offset, actions)
  }
}

export async function fetchData(query, offset, actions) {
  lastQueryValue = query
  lastQueryTime = new Date()
  lastOffset = offset
  actions.fetchDataStart(query)
  try {
    let response = await fetch(API_URL + '?offset=' + offset + '&q=' + query, {
      headers: { 'Content-Type': 'application/json' }
    })
    let data = await fetchJsonResponseHandler(response)
    // got data
    actions.fetchDataComplete(data, offset !== 0)
  } catch (error) {
    let msg = error
    // display error
    if (error && error.message) {
      msg = error.message
    }
    actions.setError('API Error', msg)
    actions.fetchDataComplete()
  }
}
