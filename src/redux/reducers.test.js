import {reducers} from './reducers.js'

it('reducers FetchDataStart', () => {
  expect(reducers({}, {type:'FetchDataStart'})).toEqual(
    {
      'data': undefined,
      'data_page': undefined,
      'error': null,
      'loadingIsHidden': false,
      'offset': undefined,
      'query': undefined})
})

it('reducers FetchDataComplete Clear', () => {
expect(reducers({}, {type:'FetchDataComplete'})).toEqual(
  {'data': undefined,
   'error': undefined,
   'loadingIsHidden': true,
   'offset': undefined,
   'query': undefined}
)
})

it('reducers FetchDataComplete new Data', () => {
expect(reducers({data:[]}, {type:'FetchDataComplete', data: []})).toEqual({
  'data': undefined,
  'data_page': {
    'count': undefined,
    'offset': undefined,
    'total': undefined},
   'error': undefined,
   'loadingIsHidden': true,
   'offset': undefined,
   'query': undefined}
)
})

it('reducers FetchDataComplete isMore', () => {
expect(reducers({data:[]}, {type:'FetchDataComplete', data: {data:[]}, isMore: true})).toEqual({
  'data': [],
  'data_page': {
    'count': undefined,
    'offset': undefined,
    'total': undefined},
   'error': undefined,
   'loadingIsHidden': true,
   'offset': undefined,
   'query': undefined}
)
})

it('reducers SetError', () => {
expect(reducers({}, {type:'SetError'})).toEqual({})
})

it('reducers ClearError', () => {
  expect(reducers({}, {type:'ClearError'})).toEqual(
    {data:undefined,
     data_page:undefined,
     error: null,
     loadingIsHidden:undefined,
     offset: undefined,
     query: undefined})
})

it('reducers Default', () => {
  expect(reducers({}, {type:'default'})).toEqual({})
})
