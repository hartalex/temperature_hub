import { fetchJsonResponseHandler } from './fetchJsonResponseHandler.js'

it('fetchJsonResponseHandler ok', () => {
  let response = {}
  response.ok = true
  response.json = jest.fn()
  response.json.mockReturnValue(1)
  let retval = fetchJsonResponseHandler(response)
  expect(retval).toBe(1)
})

it('fetchJsonResponseHandler not ok', () => {
  let response = {}
  response.ok = false
  expect(() => {
    fetchJsonResponseHandler(response)
  }).toThrow()
})

it('fetchJsonResponseHandler status 200', () => {
  let response = {}
  response.status = 200
  response.json = jest.fn()
  response.json.mockReturnValue(1)
  let retval = fetchJsonResponseHandler(response)
  expect(retval).toBe(1)
})

it('fetchJsonResponseHandler status not 200', () => {
  let response = {}
  response.status = 404
  expect(() => {
    fetchJsonResponseHandler(response)
  }).toThrow()
})
