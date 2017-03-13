import LineGraphComponent from './lineGraphComponent'

class TemperatureGraph extends LineGraphComponent {
  constructor (props) {
    super(props,
      'TemperatureGraph',
    function (duration, that) {
      fetch('http://hub.hartcode.com/temp/sensor/list').then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      }).then(function (sensorjson) {
        fetch('http://hub.hartcode.com/temp/' + props.duration + '/graph').then(function (response) {
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
          that.setState({options: that.state.options, data: arraydata})
        })
      })
    })
  }
}
export default TemperatureGraph
