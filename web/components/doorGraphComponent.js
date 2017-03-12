import { Chart } from 'react-google-charts'
import React from 'react'

class DoorGraph extends React.Component {
  constructor (props) {
    super(props)
    var duration = '12h'
    fetch('http://hub.hartcode.com/door/sensor/list').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (sensorjson) {
      fetch('http://hub.hartcode.com/door/' + duration + '/graph').then(function (response) {
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
        var lastArrayRow = [null, 0, 0]
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
        this.state.data = google.visualization.arrayToDataTable(arraydata)
      })
    })

    this.state = {
      options: {
        title: 'Doors',
        backgroundColor: 'black',
        curveType: 'none',
        vAxis: {textStyle: { color: 'white' }},
        hAxis: {textStyle: { color: 'white' }},
        legend: {textStyle: { color: 'white' }, position: 'bottom'}
      },
      data: {}
    }
  }
  render () {
    return (
      <Chart
        chartType='LineChart'
        data={this.state.data}
        options={this.state.options}
        graph_id='DoorGraph'
        width='1000px'
        height='400px'
        legend_toggle
      />
    )
  }
}
export default DoorGraph
