import React from 'react'
import Colors from '../colors'
// Current Weather Map
class WeatherMapComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var renderInterval = 60000 * 15 // 15 minutes
    var originalMapUrl = 'http://images.intellicast.com/WxImages/1kmStormWatchLoop/msn_None_anim.gif?a='
    var originalWatchBoxesUrl = 'url(http://images.intellicast.com/WxImages/1kmWatchBoxes/msn.gif?a='
    this.state = {
      data: {
        lastUpdate: '2017-01-01T00:00:00.000Z',
        mapUrl: originalMapUrl,
        watchBoxesUrl: originalWatchBoxesUrl + ')'
      },
      style: {
        width: '290px',
        height: '200px',
        border: '5px solid darkgray',
        background: Colors.Black,
        textAlign: 'center',
        float: 'left',
        color: Colors.White,
        fontSize: '14px'
      },
      imageHeight: '200px',
      imageWidth: '290px'
    }
    var that = this

    setInterval(() => {
      that.state.data.lastUpdate = new Date().toISOString()
      that.state.data.mapUrl = originalMapUrl + that.state.data.lastUpdate
      that.state.data.watchBoxesUrl = originalWatchBoxesUrl + that.state.data.lastUpdate + ')'
      that.setState(that.state)
    }, renderInterval)
  }
  render () {
    var retval
    if (this.state.data !== null) {
      retval = (
        <div style={this.state.style}>
          <div id='ctl00_ctl00_master_body_map_basemap' style={{ width: this.state.imageWidth, height: this.state.imageHeight, backgroundSize: this.state.imageWidth + ' ' + this.state.imageHeight, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(../weatherMaps/baseMap.jpg)' }}>
              <div id='ctl00_ctl00_master_body_map_counties' style={{ width: this.state.imageWidth, height: this.state.imageHeight, backgroundSize: this.state.imageWidth + ' ' + this.state.imageHeight, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(../weatherMaps/counties.gif)' }}>
                <div id='ctl00_ctl00_master_body_map_highways' style={{ width: this.state.imageWidth, height: this.state.imageHeight, backgroundSize: this.state.imageWidth + ' ' + this.state.imageHeight, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(../weatherMaps/highways.gif)' }}>
                  <div id='ctl00_ctl00_master_body_map_watchboxes' style={{ width: this.state.imageWidth, height: this.state.imageHeight, backgroundSize: this.state.imageWidth + ' ' + this.state.imageHeight, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: this.state.data.watchBoxesUrl }}>
                    <div id='ctl00_ctl00_master_body_map_cities' style={{ width: this.state.imageWidth, height: this.state.imageHeight, backgroundSize: this.state.imageWidth + ' ' + this.state.imageHeight, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(../weatherMaps/cities.gif)' }}>
                      <img id='map' src={this.state.data.mapUrl} alt='' width={this.state.imageWidth} height={this.state.imageHeight} style={{width: this.state.imageWidth, height: this.state.imageHeight}} useMap='#onekmMap' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
export default WeatherMapComponent
