module.exports = {
  // determines if duplicate data is inserted into the database.
  // if false then the data that hasn't changed recently will still be inserted into the database.
  // if true then only data changes will be inserted into the database.
  NoDuplicateData: false,
  domains: ['home.hartcode.com'],
  email: 'alex@hartcode.com'
}
