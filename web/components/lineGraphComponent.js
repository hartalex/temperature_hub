import { Chart } from 'react-google-charts'
import React from 'react'
import Colors from '../colors'

class LineGraphComponent extends React.Component {
  constructor (props, graphId, getData) {
    super(props)
    this.state = {
      graph_id: graphId,
      options: {
        title: props.title,
        backgroundColor: Colors.Black,
        curveType: 'none',
        titleTextStyle: { color: Colors.White },
        vAxis: {textStyle: { color: Colors.White }},
        hAxis: {textStyle: { color: Colors.White }},
        legend: {textStyle: { color: Colors.White }, position: 'bottom'}
      },
      data: null,
      style: {
        width: '1000px',
        height: '400px',
        fontSize: '250%',
        backgroundColor: Colors.Black,
        textAlign: 'center',
        color: Colors.White
      }
    }
    var that = this
    getData(props.duration, that)
  }
  render () {
    var retval
    if (this.state.data !== null) {
      retval = (<Chart
        chartType='LineChart'
        data={this.state.data}
        options={this.state.options}
        graph_id={this.state.graph_id}
        width={this.state.style.width}
        height={this.state.style.height}
        legend_toggle
      />)
    } else {
      retval = (<div style={this.state.style}>Loading Graph</div>)
    }
    return retval
  }
}
export default LineGraphComponent
