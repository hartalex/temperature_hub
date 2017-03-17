import React from 'react'
import Colors from '../colors'
import Util from '../util'
class MenuComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var alertCheckInterval = updateInterval * 1.5
    var renderInterval = 60000
    this.state = {
      data: null,
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
    this.state.data = {
      date: '2017-03-17',
      firstOption: 'Something',
      secondOption: 'Something Else',
      otherStuff: 'Other Stuff',
      day: 'Today',
      lastUpdate: '2017-01-01T00:00:00.000Z'
    }
    var that = this

    setInterval(() => {
      if (new Date() - new Date(that.state.data.lastUpdate) > alertCheckInterval) {
        var style = JSON.parse(JSON.stringify(that.state.style))
        style.backgroundColor = Colors.Red
        that.state.style = style
      } else if (that.state.style.backgroundColor !== Colors.Black) {
        var styleClone = JSON.parse(JSON.stringify(that.state.style))
        styleClone.backgroundColor = Colors.Black
        that.state.style = styleClone
      }
      that.setState(that.state)
    }, renderInterval)

    this.getData(props.date, this)
    setInterval(() => { that.getData(props.date, that) }, updateInterval)
  }
  getData (date, that) {
    fetch('http://hub.hartcode.com/menu/list/' + date).then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (currentjson) {
      for (var i = 0; i < currentjson.length; i++) {
        var menu = currentjson[i]
        if (menu.date === date) {
          that.state.data.date = menu.date
          that.state.data.firstOption = menu.firstOption
          that.state.data.secondOption = menu.secondOption
          that.state.data.otherStuff = menu.otherStuff
          that.state.data.day = 'Today'
          that.state.data.lastUpdate = new Date().toISOString()

          that.setState(that.state)
        }
      }
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      const updateTimeInMinutes = Util.timeAgo(this.state.data.lastUpdate)
      retval = (
        <div style={this.state.style}>
          <div style={{textAlign: 'left', color: Colors.White}}>Menu</div>
          <div style={this.state.innerStyle}>
            <div style={{padding: '5px 0', color: Colors.White}}>{this.state.data.day}</div>
            <div style={{color: Colors.White, clear: 'left'}}>{this.state.data.firstOption}</div>
            <div style={{color: Colors.White, clear: 'left'}}>Or {this.state.data.secondOption}</div>
            <div style={{color: Colors.White, clear: 'left'}}>{this.state.data.otherStuff}</div>
          </div>
          <div style={{color: Colors.White, fontSize: '7px', textAlign: 'right'}}>{updateTimeInMinutes}</div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
export default MenuComponent
