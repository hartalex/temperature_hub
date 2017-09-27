import React from 'react'
import Colors from '../colors'
import MenuDay from './menuDayComponent.js'
class MenuComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    var backgroundColor = Colors.Black
    var foreColor = Colors.White

    this.state = {
      data: null,
      style: {
        width: '440px',
        height: '200px',
        border: '5px solid darkgray',
        background: backgroundColor,
        textAlign: 'center',
        float: 'left',
        color: foreColor,
        fontSize: '14px'
      }
    }
  }
  render () {
    var retval
    retval = (
      <div style={this.state.style}>
        <div style={{textAlign: 'left'}}>Menu</div>
        <MenuDay day='Today' date='Today' updateIntervalInMinutes='60' />
        <MenuDay day='Tomorrow' date='Tomorrow' updateIntervalInMinutes='60' />
        <MenuDay day='NextDay' date='NextDay' updateIntervalInMinutes='60' />
      </div>)
    return retval
  }
}
export default MenuComponent
