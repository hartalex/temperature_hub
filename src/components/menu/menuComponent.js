import React, { Component } from 'react'
import { MenuDayComponent } from './menuDayComponent.js'
import './menuComponent.css'

export class MenuComponent extends Component {
  constructor(props, graphId, getData) {
    super(props)
  }
  render() {
    var retval
    retval = (
      <div className="menu">
        <div style={{ textAlign: 'left' }}>Menu</div>
        <MenuDayComponent
          day="Today"
          date="Today"
          updateIntervalInMinutes="60"
        />
        <MenuDayComponent
          day="Tomorrow"
          date="Tomorrow"
          updateIntervalInMinutes="60"
        />
        <MenuDayComponent
          day="NextDay"
          date="NextDay"
          updateIntervalInMinutes="60"
        />
      </div>
    )
    return retval
  }
}
