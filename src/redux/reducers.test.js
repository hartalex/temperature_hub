import {reduce} from './reducers.js'

it('reduce FetchDataStart', () => {
  expect(reduce({}, {type:'FetchDataStart'})).toEqual(
    {
      'data': undefined,
      'data_page': undefined,
      'error': null,
      'loadingIsHidden': false,
      'offset': undefined,
      'query': undefined})
})

it('reduce FetchDataComplete Clear', () => {
expect(reduce({}, {type:'FetchDataComplete'})).toEqual(
  {'data': undefined,
   'error': undefined,
   'loadingIsHidden': true,
   'offset': undefined,
   'query': undefined}
)
})

it('reduce FetchDataComplete new Data', () => {
expect(reduce({data:[]}, {type:'FetchDataComplete', data: []})).toEqual({
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

it('reduce FetchDataComplete isMore', () => {
expect(reduce({data:[]}, {type:'FetchDataComplete', data: {data:[]}, isMore: true})).toEqual({
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

it('reduce SetError', () => {
expect(reduce({}, {type:'SetError'})).toEqual({})
})

it('reduce ClearError', () => {
  expect(reduce({}, {type:'ClearError'})).toEqual(
    {data:undefined,
     data_page:undefined,
     error: null,
     loadingIsHidden:undefined,
     offset: undefined,
     query: undefined})
})

it('reduce Default', () => {
  expect(reduce({}, {type:'default'})).toEqual({})
})
