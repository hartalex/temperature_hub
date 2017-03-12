module.exports = function (duration, google) {
  // first get the list of temperature sensors
  fetch('http://hub.hartcode.com/temp/sensor/list').then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server')
    }
    return response.json()
  }).then(function (sensorjson) {
    // then get the teperature data for the given duration
    fetch('http://hub.hartcode.com/temp/' + duration + '/graph').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (json) {
      var arraydata = []
      var titleRow = ['Time']
      sensorjson.forEach(function (sensor) {
        var sensorName = sensor.sensorId
        if ('name' in sensor) {
          sensorName = sensor.name
        } titleRow.push(sensorName)
      })
      arraydata.push(titleRow)
      var lastArrayRow = [null, null, null, null, null, null, null, null, null]
      json.forEach(function (element) {
        var datestring = element._id.minute
        if (datestring.charAt(datestring.length - 1) !== 'Z') {
          datestring += ':00.000Z'
        }
        var arrayRow = [new Date(datestring)]
        for (var i = 0; i < sensorjson.length; i++) {
          var sensor = sensorjson[i]

          var tempData = lastArrayRow[i + 1]
          element.results.forEach(function (temp) {
            if (sensor.sensorId === temp.sensorId) {
              tempData = temp.tempInFarenheit
            }
          })
          arrayRow.push(tempData)
        }
        arraydata.push(arrayRow)
        lastArrayRow = arrayRow
      })
      var arrayRow = JSON.parse(JSON.stringify(arraydata[arraydata.length - 1]))
      arrayRow[0] = new Date()
      arraydata.push(arrayRow)
      var data = google.visualization.arrayToDataTable(arraydata)
      var options = {
        title: 'Temperatures',
        backgroundColor: 'black',
        curveType: 'function',
        vAxis: {textStyle: { color: 'white' }},
        hAxis: {textStyle: { color: 'white' }},
        legend: {textStyle: { color: 'white' }, position: 'bottom'} }

      var divId = 'temperature'
      var chartdiv = document.getElementById(divId)
      if (chartdiv == null) {
        chartdiv = document.createElement('div')
        chartdiv.setAttribute('style', 'width: 1000px; height: 400px')
        chartdiv.id = divId
        document.body.appendChild(chartdiv)
      }

      var chart = new google.visualization.LineChart(chartdiv)
      chart.draw(data, options)
    }).catch(function (err) {
      console.log(err)
    })
  }).catch(function (err) {
    console.log(err)
  })
}
