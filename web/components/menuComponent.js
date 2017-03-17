import React from 'react'
import Colors from '../colors'

class MenuComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var updateInterval = props.updateIntervalInMinutes * 60000
    var renderInterval = 60000
    var backgroundColor = Colors.Black
    var foreColor = Colors.White
    var day = new Date(props.date).getDay() + 1
    console.log(day)
    if (day >= 1 && day <= 5) {
      backgroundColor = Colors.SoftYellow
      foreColor = Colors.Black
    }
    console.log(props.date)
    this.state = {
      data: null,
      style: {
        width: '140px',
        height: '200px',
        border: '5px solid darkgray',
        background: backgroundColor,
        textAlign: 'center',
        float: 'left',
        color: foreColor,
        fontSize: '14px'
      },
      innerStyle: {
        padding: '10px 0'
      }
    }
    this.state.data = {
      date: '2017-03-17',
      firstOption: 'No Lunch',
      secondOption: null,
      otherStuff: null,
      day: props.day,
      lastUpdate: '2017-01-01T00:00:00.000Z'
    }
    var that = this

    setInterval(() => {
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
          var style = JSON.parse(JSON.stringify(that.state.style))
          style.backgroundColor = Colors.Black
          style.color = Colors.White
          that.state.style = style
        } else {
          that.state.data.date = date
          that.state.data.firstOption = 'No Lunch'
          that.state.data.secondOption = null
          that.state.data.otherStuff = null
          var day = new Date().getDay() + 1
          if (day >= 1 && day <= 5) {
            var styleClone = JSON.parse(JSON.stringify(that.state.style))
            styleClone.backgroundColor = Colors.SoftYellow
            styleClone.color = Colors.Black
            that.state.style = styleClone
          }
        }
        that.state.data.lastUpdate = new Date().toISOString()
        that.setState(that.state)
      }
    })
  }
  render () {
    var retval
    if (this.state.data !== null) {
      retval = (
        <div style={this.state.style}>
          <div style={{textAlign: 'left'}}>Menu</div>
          <div style={this.state.innerStyle}>
            <div style={{textAlign: 'center'}}>{this.state.data.day}</div>
            <ol style={{fontSize: '10px', textAlign: 'left', margin: 0, padding: '20px'}}>
            <li style={{clear: 'left'}}>{this.state.data.firstOption}</li>
            { this.state.data.secondOption !== null &&
              <li style={{padding: '5px 0', clear: 'left'}}>Or {this.state.data.secondOption}</li>
            }
            </ol>
            <div style={{fontSize: '10px', padding: '5px 0', clear: 'left'}}>{this.state.data.otherStuff}</div>
          </div>
        </div>)
    } else {
      retval = (<div style={this.state.style}>Fetching Data</div>)
    }
    return retval
  }
}
export default MenuComponent
