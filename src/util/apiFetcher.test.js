import {apiFetchData, fetchData} from './apiFetcher'

const fetchDataGood = (offset) => {
  it('fetchData Good', async () => {
    let query = ''
    let actions = {}
    actions.fetchDataStart = jest.fn()
    actions.fetchDataComplete = jest.fn()
    actions.setError = jest.fn()
    global.fetch = jest.fn().mockResolvedValue({ok:true, status:200, json: () => {return {}} })
    global.fetchJsonResponseHandler = jest.fn().mockResolvedValue({})
    await fetchData(query, offset, actions)
    expect(actions.fetchDataStart).toBeCalledWith(query)
    expect(actions.fetchDataComplete).toBeCalledWith({}, offset !== 0)
  })
}

const fetchDataBad = (error, errorString) => {
  it('fetchData Error', async () => {
    let query = ''
    let offset = 0
    let actions = {}
    actions.fetchDataStart = jest.fn()
    actions.fetchDataComplete = jest.fn()
    actions.setError = jest.fn()
    global.fetch = jest.fn().mockRejectedValue(error)
    await fetchData(query, offset, actions)
    expect(actions.fetchDataStart).toHaveBeenCalledWith(query)
    expect(actions.setError).toHaveBeenCalledWith('API Error', errorString)
    expect(actions.fetchDataComplete).toHaveBeenCalled()
  })
}


fetchDataGood(0)
fetchDataGood(1)

fetchDataBad('error', 'error')
fetchDataBad({message:'error'}, 'error')


it('apiFetchData empty query', async () => {
  let query = ''
  let offset = 0
  let actions = {}
  actions.fetchDataComplete = jest.fn()
  global.fetchData = jest.fn()
  await apiFetchData(query, offset, actions)
  expect(actions.fetchDataComplete).toBeCalled()
})

it('apiFetchData query', async () => {
  let query = 'test'
  let offset = 0
  let actions = {}
  actions.fetchDataStart = jest.fn()
  actions.fetchDataComplete = jest.fn()
  actions.setError = jest.fn()
  global.fetchData = jest.fn()
  global.lastOffset = -1
  global.lastQueryTime = new Date(0)
  global.lastQueryValue = ''
  await apiFetchData(query, offset, actions)
})

it('apiFetchData query has not changed', async () => {
  let query = 'test'
  let offset = 0
  let actions = {}
  actions.fetchDataStart = jest.fn()
  actions.fetchDataComplete = jest.fn()
  actions.setError = jest.fn()
  global.fetchData = jest.fn()
  global.lastOffset = 0
  global.lastQueryTime = new Date(0)
  global.lastQueryValue = 'test'
  await apiFetchData(query, offset, actions)
})

it('apiFetchData query has not changed offset undefined', async () => {
  let query = 'test'
  let offset = undefined
  let actions = {}
  actions.fetchDataStart = jest.fn()
  actions.fetchDataComplete = jest.fn()
  actions.setError = jest.fn()
  global.fetchData = jest.fn()
  global.lastOffset = 0
  global.lastQueryTime = new Date(0)
  global.lastQueryValue = 'test'
  await apiFetchData(query, offset, actions)
})
