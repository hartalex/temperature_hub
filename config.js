module.exports = {
  // determines if duplicate data is inserted into the database.
  // if false then the data that hasn't changed recently will still be inserted into the database.
  // if true then only data changes will be inserted into the database.
  NoDuplicateData: false,
  greenlock_domains: ['hub.hartcode.com', 'hub2.hartcode.com', 'temperature.hartcode.com'],
  greenlock_email: 'alex@hartcode.com',
  greenlock_staging: true
}
