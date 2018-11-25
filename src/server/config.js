module.exports = {
  // determines if duplicate data is inserted into the database.
  // if false then the data that hasn't changed recently will still be inserted into the database.
  // if true then only data changes will be inserted into the database.
  NoDuplicateData: false,
  zipCode: 53012,
  wunderground_key: '',
  openweathermap_key: '',
  slackUrl: 'http://127.0.0.1:8080/slack',
  weatherUrl: 'https://api.openweathermap.org/data/2.5/weather'
}
