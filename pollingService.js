require('es6-promise').polyfill();
require('isomorphic-fetch');

var task_is_running = false;
var time_interval_in_milliseconds = 60 *1000;


function pollForTemperatures() {
  var time = new Date();
  console.log("polling for temperatures");
  fetch('http://localhost:8811/services/list').then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  }).then(function(services) {
    services.forEach(function(element) {
      fetch(element.url).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(sensorData) {
         sensorData.forEach(function(sensor) {
          sensor.utc_timestamp = time.toISOString();
          fetch('http://localhost:8811/temp/add',{method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'}, body:JSON.stringify(sensor)});  
         });
      }).catch(function(err) {
        console.log(err);
      });
    });
  }).catch(function(err) {
    console.log(err);
});
}

        pollForTemperatures();
