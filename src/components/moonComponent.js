import React from 'react'
import Colors from '../colors'
import {timeAgo} from '../util'
import PropTypes from 'prop-types'
import moonIcons from '../moonIcons'
import Time from './timeComponent.js'
import {hub_api_url} from '../config0.js'
import AlertCheck from '../alertCheck'

class MoonComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    if (updateInterval === 0) {
      updateInterval = 60000
    }
    var alertCheckInterval = updateInterval * 1.5
    var renderInterval = 60000
    this.state = {
      data: {
        percentIlluminated:0,
        ageOfMoon:0,
        phaseofMoon:'',
        sunrise: {
          hour:'00',
          minute:'00'},
        sunset: {
          hour:'00',
          minute:'00'},
        moonrise: {
          hour:'00',
          minute:'00'},
        moonset: {
          hour:'00',
          minute:'00'},
        lastUpdate: '2017-01-01T00:00:00.000Z'
      },
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
        padding: '2px 0'
      }
    }
    var that = this

    setInterval(AlertCheck(that, alertCheckInterval), renderInterval)

    this.getData(this)
    setInterval(() => { that.getData(that) }, updateInterval)
  }
  getData (that) {
    fetch(hub_api_url + '/moonPhases').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (currentjson) {
        var moonData = currentjson
        that.state.data.percentIlluminated = moonData.percentIlluminated
        that.state.data.ageOfMoon = moonData.ageOfMoon
        that.state.data.phaseofMoon = moonData.phaseofMoon
        that.state.data.sunrise.hour = moonData.sunrise.hour
        that.state.data.sunrise.minute = moonData.sunrise.minute
        that.state.data.sunset.hour = moonData.sunset.hour
        that.state.data.sunset.minute = moonData.sunset.minute
        that.state.data.moonrise.hour = moonData.moonrise.hour
        that.state.data.moonrise.minute = moonData.moonrise.minute
        that.state.data.moonset.hour = moonData.moonset.hour
        that.state.data.moonset.minute = moonData.moonset.minute
        that.state.data.lastUpdate = new Date().toISOString()

        var styleClone = JSON.parse(JSON.stringify(that.state.style))
        that.state.style = styleClone
        that.setState(that.state)
    }).catch(function(error) {
      that.state.data ={
        percentIlluminated:0,
        ageOfMoon:0,
        phaseofMoon:'',
        sunrise: {
          hour:'00',
          minute:'00'},
        sunset: {
          hour:'00',
          minute:'00'},
        moonrise: {
          hour:'00',
          minute:'00'},
        moonset: {
          hour:'00',
          minute:'00'},
        lastUpdate: '2017-01-01T00:00:00.000Z'
      }
      that.setState(that.state)
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      const updateTimeInMinutes = timeAgo(this.state.data.lastUpdate)
      retval = (
        <div style={this.state.style}>
          <div style={this.state.innerStyle}>
            <div style={{margin: 'auto', width: '130px'}}>
             <img src={moonIcons(this.state.data.ageOfMoon)} alt="moon" height='96' width='96'/>
              <div style={{clear: 'both', color: Colors.White}} >{this.state.data.phaseofMoon}</div>
              <div style={{float: 'left', paddingLeft: '20px', paddingRight: '20px'}}>{this.state.data.percentIlluminated}% </div>
              <div style={{float: 'left'}}> Age {this.state.data.ageOfMoon}</div>

              <div style={{clear: 'both', fontSize: '8px', float: 'left', textAlign: 'center', paddingTop: '20px'}}>
                <div style={{width: '65px', fontSize: '10px'}}>Sun</div>
                <Time name='rise' hour={this.state.data.sunrise.hour} minute={this.state.data.sunrise.minute}/>
                <Time name='set' hour={this.state.data.sunset.hour} minute={this.state.data.sunset.minute}/>
              </div>

              <div style={{float: 'left', fontSize: '8px', textAlign: 'center', paddingTop: '20px'}}>
                <div style={{width: '65px', fontSize: '10px'}}>Moon</div>
                <Time name='rise' hour={this.state.data.moonrise.hour} minute={this.state.data.moonrise.minute}/>
                <Time name='set' hour={this.state.data.moonset.hour} minute={this.state.data.moonset.minute}/>
              </div>
            </div>
          </div>
          <div style={{clear: 'both', color: Colors.White, fontSize: '7px', textAlign: 'right'}}>{updateTimeInMinutes}</div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}

MoonComponent.propTypes = {
  updateIntervalInMinutes: PropTypes.string
}

export default MoonComponent
