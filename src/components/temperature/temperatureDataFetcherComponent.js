import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hub_api_url } from '../../config.js'

class TempDataFetcherComponent extends Component {
  constructor(props) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    if (updateInterval === 0) {
      updateInterval = 60000
    }
    this.getData(props.setTempData, props.setTempDataFail, this)
    setInterval(() => {
      this.getData(props.setTempData, props.setTempDataFail, this)
    }, updateInterval)
  }
  getData(setTempData, setTempDataFail, obj) {
    fetch(hub_api_url + '/temp/current', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      mode: 'no-cors'
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server, ' + response.status)
        }
        return response.json()
      })
      .then(function(currentjson) {
        var tempData = []
        for (var i = 0; i < currentjson.length; i++) {
          var sensor = currentjson[i]
          var tempDataItem = {
            lastUpdate: new Date().toISOString(),
            sensorName: sensor.sensorName,
            outdated: sensor.outdated
          }
          if (!tempDataItem.outdated) {
            tempDataItem.tempInFarenheit = sensor.tempInFarenheit
          } else {
            tempDataItem.tempInFarenheit = 0
          }
          tempData.push(tempDataItem)
        }
        return tempData
      })
      .then(function(data) {
        setTempData(data)
      })
      .catch(function(error) {
        setTempDataFail()
      })
  }
  render() {
    return <div />
  }
}

TempDataFetcherComponent.propTypes = {
  updateIntervalInMinutes: PropTypes.string,
  setTempData: PropTypes.func,
  setTempDataFail: PropTypes.func
}

const mapDispatchToProps = dispatch => {
  return {
    setTempData: function(tempData) {
      dispatch({ type: 'SetTemps', tempData: tempData })
    },
    setTempDataFail: function() {
      dispatch({ type: 'SetTempsFail' })
    }
  }
}

export const TemperatureDataFetcherComponent = connect(
  null,
  mapDispatchToProps
)(TempDataFetcherComponent)
