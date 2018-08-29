import { reducers } from './reducers.js'

it('reducers SetTemps', () => {
  expect(reducers({}, { type: 'SetTemps', tempData: [] })).toEqual({
    tempData: []
  })
})

it('reducers SetTempsFail Clear', () => {
  expect(
    reducers({ tempData: { currentState: true } }, { type: 'SetTempsFail' })
  ).toEqual({
    tempData: { currentState: true }
  })
})

it('reducers Default', () => {
  expect(reducers({}, { type: 'default' })).toEqual({})
})
