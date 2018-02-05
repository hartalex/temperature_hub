import { connect } from 'react-redux'
import React from 'react'
import Colors from '../colors'
import Util from '../util'
import temperatureColor from '../temperatureColor'
import PropTypes from 'prop-types'

const TemperatureComponent = ({sensorName, myTempData}) => {
    var state = {
      style: {
        width: '140px',
        height: '200px',
        border: '5px solid darkgray',
        background: Colors.Black,
        textAlign: 'center',
        float: 'left',
        color: Colors.White,
        fontSize: '14px'
      },
      innerStyle: {
        padding: '50px 0'
      }
    }
    var retval
      const updateTimeInMinutes = Util.timeAgo(myTempData.lastUpdate)
      var temp = Math.trunc(myTempData.tempInFarenheit)
      var tempDecimal = Math.abs(Math.trunc((myTempData.tempInFarenheit - temp) * 100))
      state.style.color = temperatureColor(tempDecimal)
      if (myTempData.tempInFarenheit === 0) {
        temp = '--'
        tempDecimal = '--'
      }
      retval = (
        <div style={state.style}>
          <div style={state.innerStyle}>
            <div style={{margin: 'auto', width: '100px'}}>
              <div style={{fontSize: '62px', float: 'left'}}>{temp}</div>
              <div style={{float: 'left', padding: '44px 2px 0px 0px'}}>{tempDecimal}</div>
            </div>
            <div style={{clear: 'both', color: Colors.White}} >{myTempData.sensorName}</div>
          </div>
          <div style={{color: Colors.White, fontSize: '7px', textAlign: 'right'}}>{updateTimeInMinutes}</div>
        </div>)
    return retval
}

TemperatureComponent.propTypes = {
  sensorName: PropTypes.string,
  myTempData: PropTypes.shape({
      lastUpdate: PropTypes.string,
      sensorName: PropTypes.string,
      outdated: PropTypes.boolean,
      tempInFarenheit: PropTypes.number
    })
}

const getTempData = (tempData, name) => {
  for (var i = 0; i < tempData.length; i++) {
    var dataItem = tempData[i]
    if (dataItem.sensorName === name) {
        return dataItem
    }
  }
}

const mapStateToProps = function(state, props) {
  return {
    myTempData: getTempData(state.tempData, props.sensorName)
  }
}

const reduxTemperatureComponent = connect(
  mapStateToProps  
)(TemperatureComponent)

export default reduxTemperatureComponent
