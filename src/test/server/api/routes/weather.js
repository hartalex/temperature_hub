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

    // TODO(alex) : need to rethink this.
    // we get different error reasons, depending on if their is a network connection or not.
    it('weather fail bad fetch url', function(done) {
      this.timeout(15000)
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
        reason: 'Error: Bad response from server'
      })
    })
  })
})
