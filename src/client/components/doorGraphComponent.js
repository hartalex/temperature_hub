import {LineGraphComponent} from './lineGraphComponent';
import ClientConfig from '../config.js';

const getDoorData = async function(duration, that) {
  try {
    const fetchResponse = await fetch(
      ClientConfig.hub_api_url + '/door/sensor/list',
    );
    if (fetchResponse.status >= 400) {
      throw new Error('Bad response from server');
    }
    const sensorjson = await fetchResponse.json();
    const graphResponse = await fetch(
      ClientConfig.hub_api_url + '/door/' + duration + '/graph',
    );
    if (graphResponse.status >= 400) {
      throw new Error('Bad response from server');
    }
    const json = await graphResponse.json();
    var arraydata = [];
    var titleRow = ['Time'];
    var lastArrayRow = [null];
    sensorjson.data.forEach(function(sensor) {
      var sensorName = sensor.sensorId;
      if ('name' in sensor) {
        sensorName = sensor.name;
      }
      titleRow.push(sensorName);
      lastArrayRow.push(0);
    });
    arraydata.push(titleRow);

    json.data.forEach(function(element) {
      var datestring = element._id.minute;
      if (datestring.charAt(datestring.length - 1) !== 'Z') {
        datestring += ':00.000Z';
      }
      var arrayRow = [new Date(datestring)];
      for (var i = 0; i < sensorjson.data.length; i++) {
        var sensor = sensorjson.data[i];
        var tempData = lastArrayRow[i + 1];
        element.results.forEach(function(temp) {
          if (sensor.sensorId === temp.sensorId) {
            if (temp.isOpen === true) {
              tempData = 1;
            } else {
              tempData = 0;
            }
            tempData *= i + 1;
          }
        });
        arrayRow.push(tempData);
      }
      lastArrayRow[0] = new Date(new Date(arrayRow[0] - 60000).toISOString());

      arraydata.push(lastArrayRow);
      arraydata.push(arrayRow);
      lastArrayRow = [];
      for (var ix = 0; ix < arrayRow.length; ix++) {
        lastArrayRow.push(arrayRow[ix]);
      }
    });
    var arrayRow = JSON.parse(JSON.stringify(arraydata[arraydata.length - 1]));
    arrayRow[0] = new Date();
    arraydata.push(arrayRow);
    that.setState({
      options: that.state.options,
      data: {array: arraydata, lastUpdate: new Date().toISOString()},
    });
  } catch (error) {
    that.state.data = null;
    that.setState(that.state);
    console.error(error);
  }
};

class DoorGraph extends LineGraphComponent {
  constructor(props) {
    super(props, 'DoorGraph', getDoorData);
  }
}
export default DoorGraph;
