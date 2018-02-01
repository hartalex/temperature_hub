var assert = require('assert')
var validation = require('../../server/api/data/validation')

describe('validation', function () {
  describe('#isTypeObject()', function () {
    it('should reject because null not isTypeObject', function () {
      return validation.isTypeObject(null, 'null')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'null is not an object')
      })
    }) // it should reject because null not isTypeObject

    it('should succeed because isTypeObject', function () {
      return validation.isTypeObject({}, 'object')
    }) // it should succeed because isTypeObject

    it('should fail because undefined not isTypeObject', function () {
      return validation.isTypeObject(undefined, 'undefined')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'undefined is not an object')
      })
    }) // it should fail because undefined not isTypeObject
  }) // describe #isTypeObject

  describe('#isTypeString()', function () {
    it('should reject because null not isTypeString', function () {
      return validation.isTypeString(null, 'null')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'null is not a string')
      })
    }) // it should reject because null not isTypeString

    it('should fail because object is not isTypeString', function () {
      return validation.isTypeString({}, 'object')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'object is not a string')
      })
    }) // it should fail because object is not isTypeString

    it('should fail because undefined not isTypeString', function () {
      return validation.isTypeString(undefined, 'undefined')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'undefined is not a string')
      })
    }) // it should fail because undefined not isTypeString

    it('should succeed because isTypeString', function () {
      return validation.isTypeString('', 'string')
    }) // it should succeed because isTypeString
  }) // describe #isTypeString

  describe('#isTypeNumber()', function () {
    it('should reject because null not isTypeNumber', function () {
      return validation.isTypeNumber(null, 'null')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'null is not a number')
      })
    }) // it should reject because null not isTypeNumber

    it('should succeed because isTypeNumber', function () {
      return validation.isTypeNumber(0, 'number')
    }) // it should succeed because isTypeNumber

    it('should fail because undefined not isTypeNumber', function () {
      return validation.isTypeNumber(undefined, 'undefined')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'undefined is not a number')
      })
    }) // it should fail because undefined not isTypeNumber
  }) // describe #isTypeNumber

  describe('#isTypeBoolean()', function () {
    it('should reject because null not isTypeBoolean', function () {
      return validation.isTypeBoolean(null, 'null')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'null is not a boolean')
      })
    }) // it should reject because null not isTypeBoolean

    it('should succeed because isTypeBoolean', function () {
      return validation.isTypeBoolean(false, 'boolean')
    }) // it should succeed because isTypeNumber

    it('should fail because undefined not isTypeBoolean', function () {
      return validation.isTypeBoolean(undefined, 'undefined')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'undefined is not a boolean')
      })
    }) // it should fail because undefined not isTypeBoolean
  }) // describe #isTypeBoolean


  describe('#isNotNull()', function () {
    it('should reject because null is Null', function () {
      return validation.isNotNull(null, 'null')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'null is null')
      })
    }) // it should reject because null is Null

    it('should succeed because isNotNull', function () {
      return validation.isNotNull({}, 'object')
    }) // it should succeed because isNotNull

    it('should succeed because undefined not isNotNull', function () {
      return validation.isNotNull(undefined, 'undefined')
    }) // it should succeed because undefined not isNotNull
  }) // describe #isNotNull

  describe('#isNotUndefined()', function () {
    it('should succeed because null isNotUndefined', function () {
      return validation.isNotUndefined(null, 'null')
    }) // it should succeed because null isNotUndefined

    it('should succeed because isNotUndefined', function () {
      return validation.isNotUndefined({}, 'object')
    }) // it should succeed because isNotNull

    it('should succeed because undefined not is Undefined', function () {
      return validation.isNotUndefined(undefined, 'undefined')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'undefined is undefined')
      })
    }) // it should fail because undefined not is Undefined
  }) // describe #isNotUndefined

  describe('#stringHasLength()', function () {
    it('should fail because null is an empty string', function () {
      return validation.stringHasLength(null, 'null')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'null is an empty string')
      })
    }) // it should fail because null is an empty string

    it('should fail because object is an empty string', function () {
      return validation.stringHasLength({}, 'object')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'object is an empty string')
      })
    }) // it should fail because object is an empty string

    it('should fail because undefined is an empty string', function () {
      return validation.stringHasLength(undefined, 'undefined')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'undefined is an empty string')
      })
    }) // it should fail because undefined is an empty string

    it('should fail because empty string is an empty string', function () {
      return validation.stringHasLength('', 'empty string')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'empty string is an empty string')
      })
    }) // it should fail because empty string is an empty string

    it('should fail because true is an empty string', function () {
      return validation.stringHasLength(true, 'true')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'true is an empty string')
      })
    }) // it should fail because empty string is an empty string

    it('should succeed because string is not an empty string', function () {
      return validation.stringHasLength('test string', 'string')
    }) // it should succeed because string is not an empty string
  }) // describe #stringHasLength

  describe('#hasProperty()', function () {
    it('should fail because null doesnt have props', function () {
      return validation.hasProperty(null, 'test')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'Property test is missing')
      })
    }) // it should fail because null doesnt have props

    it('should fail because object doesnt have props', function () {
      return validation.hasProperty({}, 'test')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'Property test is missing')
      })
    }) // it should fail because object doesnt have props

    it('should fail because undefined doesnt have props', function () {
      return validation.hasProperty(undefined, 'test')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'Property test is missing')
      })
    }) // it should fail because undefined doesnt have props

    it('should fail because true doesnt have props', function () {
      return validation.hasProperty(true, 'test')
      .then(function () {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'Property test is missing')
      })
    }) // it should fail because true doesnt have props

    it('should succeed because object has a test prop', function () {
      return validation.hasProperty({test:0}, 'test')
    }) // it should succeed because object has a test prop
  }) // describe #hasProperty

}) // descibe validation
