import weather from "./weather";
import doTest from "./do_test";

describe("weather", function() {
  describe("#function (req, res)", function() {
    it("weather fail no config api key", function(done) {
      doTest(
        done,
        weather,
        {},
        {
          status: 500,
          result: "fail",
          reason: "weather api key not found in configuration"
        }
      );
    });

    it.skip("weather fail bad fetch url", function(done) {
      doTest(
        done,
        weather,
        {
          config: {
            openweathermap_key: "key",
            zipCode: "zipCode",
            weatherUrl: "http://127.0.0.1/badweather"
          },
          method: "get",
          url: "empty"
        },
        {
          status: 500,
          result: "fail",
          reason:
            "FetchError: request to http://127.0.0.1/badweather?zip=zipCode,us&units=imperial&APPID=key failed, reason: connect ECONNREFUSED 127.0.0.1:80"
        }
      );
    });
  });
});
