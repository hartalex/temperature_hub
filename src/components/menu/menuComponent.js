import React from 'react'
import MenuDay from './menuDayComponent.js'
import "./menuComponent.css"
class MenuComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
  }
  render () {
    var retval
    retval = (
      <div className="menu">
        <div style={{textAlign: 'left'}}>Menu</div>
        <MenuDay day='Today' date='Today' updateIntervalInMinutes='60' />
        <MenuDay day='Tomorrow' date='Tomorrow' updateIntervalInMinutes='60' />
        <MenuDay day='NextDay' date='NextDay' updateIntervalInMinutes='60' />
      </div>)
    return retval
  }
}
export default MenuComponent
