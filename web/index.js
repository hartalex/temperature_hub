import { renderRoot } from './components/index.js'
import React from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'
// import temperatureGraph from './temperatureGraph'
// import doorGraph from './doorGraph'
// import Analytics from './components/analytics.js'
// Analytics.analytics()

var root = document.getElementById('root')
if (root !== null) {
  render(renderRoot(), root)
}

/* google.charts.load('current', {'packages': ['corechart']})
google.charts.setOnLoadCallback(drawChart)
var fiveMinutes = 60 * 1000 * 5
setInterval(drawChart, fiveMinutes)
function drawChart () {
  var datetime = new Date()
  var duration = '12h'

  //temperatureGraph(duration, google)

  //doorGraph(duration, google)

  var divId = 'updateTime'
  var chartdiv = document.getElementById(divId)
  if (chartdiv == null) {
    chartdiv = document.createElement('div')
    chartdiv.id = divId
    document.body.appendChild(chartdiv)
    chartdiv.setAttribute('style', 'color: white; text-align: right; width: 1000px')
  }
  chartdiv.innerHTML = datetime.toISOString()
}*/
