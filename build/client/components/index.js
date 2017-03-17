'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderRoot = renderRoot;

var _doorGraphComponent = require('./doorGraphComponent.js');

var _doorGraphComponent2 = _interopRequireDefault(_doorGraphComponent);

var _temperatureGraphComponent = require('./temperatureGraphComponent.js');

var _temperatureGraphComponent2 = _interopRequireDefault(_temperatureGraphComponent);

var _tempComponent = require('./tempComponent.js');

var _tempComponent2 = _interopRequireDefault(_tempComponent);

var _weatherComponent = require('./weatherComponent.js');

var _weatherComponent2 = _interopRequireDefault(_weatherComponent);

var _forecast3DayComponent = require('./forecast3DayComponent.js');

var _forecast3DayComponent2 = _interopRequireDefault(_forecast3DayComponent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colors = require('../colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderRoot() {
  var style = { 'backgroundColor': _colors2.default.Black,
    textAlign: 'center',
    fontFamily: 'Roboto'
  };
  return _react2.default.createElement(
    'div',
    { className: 'body', style: style },
    _react2.default.createElement(_doorGraphComponent2.default, { title: 'Doors', duration: '24h', updateIntervalInMinutes: '5' }),
    _react2.default.createElement(_temperatureGraphComponent2.default, { title: 'Temperatures', duration: '24h', updateIntervalInMinutes: '5' }),
    _react2.default.createElement(_tempComponent2.default, { sensorName: 'Basement', updateIntervalInMinutes: '5' }),
    _react2.default.createElement(_tempComponent2.default, { sensorName: 'Living Room', updateIntervalInMinutes: '5' }),
    _react2.default.createElement(_tempComponent2.default, { sensorName: 'Fish Tank', updateIntervalInMinutes: '5' }),
    _react2.default.createElement(_tempComponent2.default, { sensorName: 'Bedroom', updateIntervalInMinutes: '5' }),
    _react2.default.createElement(_forecast3DayComponent2.default, { zipCode: '53012', updateIntervalInMinutes: '60' }),
    _react2.default.createElement(_tempComponent2.default, { sensorName: 'Outside', updateIntervalInMinutes: '5' }),
    _react2.default.createElement(_weatherComponent2.default, { zipCode: '53012', updateIntervalInMinutes: '60' })
  );
}