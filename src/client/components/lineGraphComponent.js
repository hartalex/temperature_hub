import {Chart} from 'react-google-charts';
import React from 'react';
import Colors from '../colors';
import Util from '../util';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class LineGraphComponent extends React.Component {
  constructor(props, graphId, getData) {
    super(props);
    var updateInterval = props.updateIntervalInMinutes * 60000;
    var renderInterval = 60000;
    if (updateInterval === 0) {
      updateInterval = 60000;
    }
    this.state = {
      graph_id: graphId,
      options: {
        title: props.title,
        backgroundColor: Colors.Black,
        curveType: 'none',
        titleTextStyle: {color: Colors.White},
        vAxis: {textStyle: {color: Colors.White}},
        hAxis: {textStyle: {color: Colors.White}},
        legend: {textStyle: {color: Colors.White}, position: 'bottom'},
      },
      data: null,
      style: {
        width: '500px',
        height: '125px',
        border: '1px solid darkgray',
        background: Colors.Black,
        textAlign: 'center',
        color: Colors.White,
        float: 'left',
        fontSize: '10px',
      },
    };
    var that = this;
    (async () => {
      await getData(props.duration, that);
    })();
    setInterval(async () => {
      await getData(props.duration, that);
    }, updateInterval);

    setInterval(() => {
      that.setState(that.state);
    }, renderInterval);
  }
  render() {
    var retval;
    if (this.state.data !== null) {
      const updateTimeInMinutes = Util.timeAgo(this.state.data.lastUpdate);
      retval = (
        <div style={this.state.style}>
          <Chart
            chartType="LineChart"
            data={this.state.data.array}
            options={this.state.options}
            graph_id={this.state.graph_id}
            width={this.state.style.width}
            height="110px"
            legend_toggle
          />
          <div
            style={{
              fontSize: '50%',
              textAlign: 'right',
              color: this.state.style.color,
            }}>
            {updateTimeInMinutes}
          </div>
        </div>
      );
    } else {
      retval = <div style={this.state.style}>Fetching Data</div>;
    }
    return retval;
  }
}

LineGraphComponent.propTypes = {
  updateIntervalInMinutes: PropTypes.number,
  title: PropTypes.string,
  duration: PropTypes.number,
};

const mapDispatchToProps = dispatch => {
  return {
    setData: function(data) {
      dispatch({type: 'Data'});
    },
  };
};

const reduxLineGraphComponent = connect(
  null,
  mapDispatchToProps,
)(LineGraphComponent);

export default reduxLineGraphComponent;
