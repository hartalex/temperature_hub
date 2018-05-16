import weather from '../../../../server/api/routes/weather'
import doTest from './do_test'

describe('weather', function() {
  describe('#function (req, res)', function() {
    it('weather fail no config api key', function(done) {
      doTest(done, weather, {}, {
        status: 500,
        result: 'fail',
        reason: 'weather api key not found in configuration'
      })
    })

    it('weather fail bad fetch url', function(done) {
      doTest(done, weather, {
        config: {
          openweathermap_key: 'key',
          zipCode: 'zipCode'
        },
        method: 'get',
        url:'empty'
      }, {
        status: 500,
        result: 'fail',
        reason: 'FetchError: network timeout at: https://api.openweathermap.org/data/2.5/weather?zip=zipCode,us&units=imperial&APPID=key'
      })
    })
  })
})
