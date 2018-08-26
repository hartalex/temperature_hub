import LineGraphComponent from './lineGraphComponent'
import ClientConfig from '../config0.js'
import PropTypes from 'prop-types'

const getData = function (duration, that) {
  fetch(ClientConfig.hub_api_url + '/door/sensor/list').then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server')
    }
    return response.json()
  }).then(function (sensorjson) {
    fetch(ClientConfig.hub_api_url + '/door/' + duration + '/graph').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (json) {
      var arraydata = []
      var titleRow = ['Time']
      var lastArrayRow = [null]
      sensorjson.forEach(function (sensor) {
        var sensorName = sensor.sensorId
        if ('name' in sensor) {
          sensorName = sensor.name
        } titleRow.push(sensorName)
        lastArrayRow.push(0)
      })
      arraydata.push(titleRow)

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
              if (temp.isOpen === true) {
                tempData = 1
              } else {
                tempData = 0
              }
              tempData *= (i+1)
            }
          })
          arrayRow.push(tempData)
        }
        lastArrayRow[0] = new Date(new Date(arrayRow[0] - 60000).toISOString())

        arraydata.push(lastArrayRow)
        arraydata.push(arrayRow)
        lastArrayRow = []
        for (var ix = 0; ix < arrayRow.length; ix++) {
          lastArrayRow.push(arrayRow[ix])
        }
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

class DoorGraph extends LineGraphComponent {
  constructor (props) {
    super(props,
      'DoorGraph',
    getData)
  }
}

DoorGraph.propTypes = {
    updateIntervalInMinutes: PropTypes.string
}

export default DoorGraph
