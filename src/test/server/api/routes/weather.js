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
  })
})
