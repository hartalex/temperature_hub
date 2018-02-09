import LineGraphComponent from './lineGraphComponent'
import ClientConfig from '../config.js'

const getdata = function (duration, that) {
  fetchSensorData().then(function (sensorjson) {
    fetchGraphData(duration).then(function (json) {
      var arraydata = []
      setTitle(sensorjson, arraydata)
      var lastArrayRow = [null, null, null, null, null, null, null, null, null]
      json.forEach(function (element) {
        var datestring = element._id.minute
        if (datestring.charAt(datestring.length - 1) !== 'Z') {
          datestring += ':00.000Z'
        }
        var arrayRow = [new Date(datestring)]
        setDataRow(arrayRow, sensorjson, lastArrayRow, element)
        arraydata.push(arrayRow)
        lastArrayRow = arrayRow
      })
      var arrayRow = JSON.parse(JSON.stringify(arraydata[arraydata.length - 1]))
      arrayRow[0] = new Date()
      arraydata.push(arrayRow)
      that.setState({options: that.state.options, data: {array: arraydata, lastUpdate: new Date().toISOString()}})
    }).catch(function(error) {
      that.state.data = null
      that.setState(that.state)
    })
  }).catch(function(error) {
    that.state.data = null
    that.setState(that.state)
  })
}

const setDataRow = function (arrayRow, sensorjson, lastArrayRow, element) {
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
}

const setTitle = function(sensorjson, arraydata) {
  var titleRow = ['Time']
  sensorjson.forEach(function (sensor) {
    var sensorName = sensor.sensorId
    if ('name' in sensor) {
      sensorName = sensor.name
    } titleRow.push(sensorName)
  })
  arraydata.push(titleRow)
  return arraydata
}

const fetchSensorData = function() {
  return fetch(ClientConfig.hub_api_url + '/temp/sensor/list').then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server')
    }
    return response.json()
  })
}
const fetchGraphData = function (duration) {
  return fetch(ClientConfig.hub_api_url + '/temp/' + duration + '/graph').then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server')
    }
    return response.json()
  })
}

class TemperatureGraph extends LineGraphComponent {

  constructor (props) {
    super(props,
      'TemperatureGraph', getdata )
  }

}
export default TemperatureGraph
