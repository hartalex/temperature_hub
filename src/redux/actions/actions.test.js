import { getActions } from './actions.js'

it('actions fetchDataStart', () => {
  const dispatch = jest.fn()
  const actions = getActions(dispatch)
  actions.actions.fetchDataStart('query')
  expect(dispatch).toBeCalledWith({ type: 'FetchDataStart', query: 'query' })
})

it('actions fetchDataComplete', () => {
  const dispatch = jest.fn()
  const actions = getActions(dispatch)
  actions.actions.fetchDataComplete('data', 'isMore')
  expect(dispatch).toBeCalledWith({
    type: 'FetchDataComplete',
    data: 'data',
    isMore: 'isMore'
  })
})

it('actions setError', () => {
  const dispatch = jest.fn()
  const actions = getActions(dispatch)
  actions.actions.setError('title', 'message')
  expect(dispatch).toBeCalledWith({
    type: 'SetError',
    error: { title: 'title', description: 'message' }
  })
})
