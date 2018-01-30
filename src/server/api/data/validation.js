module.exports = {
  isTypeObject: function(val, valueName) {
    return new Promise(function (resolve, reject) {
      if (val !== null && typeof val === 'object') {
        resolve()
      } else {
        reject(valueName + ' is not an object')
      }
    }) // Promise
  }, // isTypeObject
  isTypeString: function(val, valueName) {
    return new Promise(function (resolve, reject) {
      if (typeof val === 'string') {
        resolve()
      } else {
        reject(valueName + ' is not a string')
      }
    }) // Promise
  }, // isTypeString
  isNotNull: function(val, valueName) {
    return new Promise(function (resolve, reject) {
      if (val !== null) {
        resolve()
      } else {
        reject(valueName + ' is null')
      }
    }) // Promise
  }, // isNotNull
  isNotUndefined: function(val, valueName) {
    return new Promise(function (resolve, reject) {
      if (typeof val !== 'undefined') {
        resolve()
      } else {
        reject(valueName + ' is undefined')
      }
    }) // Promise
  }, // isNotUndefined
  stringHasLength: function(val, valueName) {
    return new Promise(function (resolve, reject) {
      if (val && val.length && val.length > 0) {
        resolve()
      } else {
        reject(valueName + ' is an empty string')
      }
    }) // Promise
  }, // stringHasLength
  hasProperty: function(val, property) {
    return new Promise(function (resolve, reject) {
      if (val && typeof val !== 'boolean' && property in val) {
        resolve()
      } else {
        reject('Property ' + property + ' is missing')
      }
    }) // Promise
  } // hasProperty
}
