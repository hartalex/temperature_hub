var mockMenuSuccess = require('../data/mock-menu-success')
var mockMenuFail = require('../data/mock-menu-fail')
const menuAdd = require('../../server/api/routes/menu_add')
const doTest = require('./do_test')

describe('menu_add', function () {
  describe('#function (req, res)', function () {
    
  
    it('menuAdd success', function (done) {
      doTest(done, menuAdd, {body: {}, data: mockMenuSuccess}, {status:200, result: 'ok'})
    })

    it('menuAdd failure', function (done) {
       doTest(done, menuAdd, {body: {}, data: mockMenuFail}, {status:500, result: 'fail', reason: 'mock error'})
    })
    
    it('menuAdd no mock fail - input is undefined', function (done) {
        doTest(done, menuAdd, {}, {status:500, result: 'fail', reason: 'Input is undefined'})
    })
    
    it('menuAdd no mock fail - input is null', function (done) {
        doTest(done, menuAdd, {body: null}, {status:500, result: 'fail', reason: 'Input is null'})
    })

    it('menuAdd no mock fail - date missing', function (done) {
      doTest(done, menuAdd, {body: {}}, {status:500, result: 'fail', reason: 'Property date is missing'})
    })
    
    it('menuAdd no mock fail - date not string', function (done) {
      doTest(done, menuAdd, {body: {date: 0}}, {status:500, result: 'fail', reason: 'Property date is not a string'})
    })
    
    it('menuAdd no mock fail - date empty string', function (done) {
      doTest(done, menuAdd, {body: {date: ''}}, {status:500, result: 'fail', reason: 'Property date is an empty string'})
    })
    
    it('menuAdd no mock fail - firstOption missing', function (done) {
      doTest(done, menuAdd, {body: {date: ' '}}, {status:500, result: 'fail', reason: 'Missing firstOption property'})
    })
    
    it('menuAdd no mock fail - firstOption not string', function (done) {
      doTest(done, menuAdd, {body: {date: ' ', firstOption: 0}}, {status:500, result: 'fail', reason: 'Property firstOption is not a string'})
    })
    
    it('menuAdd no mock fail - firstOption empty string', function (done) {
      doTest(done, menuAdd, {body: {date: ' ', firstOption: ''}}, {status:500, result: 'fail', reason: 'Property firstOption is an empty string'})
    })
    it('menuAdd no mock fail - secondOption missing', function (done) {
      doTest(done, menuAdd, {body: {date: ' ', firstOption: ' '}}, {status:500, result: 'fail', reason: 'Missing secondOption property'})
    })
    
    it('menuAdd no mock fail - secondOption not string', function (done) {
      doTest(done, menuAdd, {body: {date: ' ', firstOption: ' ', secondOption: 0}}, {status:500, result: 'fail', reason:  'Property secondOption is not a string'})
    })
    
    it('menuAdd no mock fail - secondOption empty string', function (done) {
      doTest(done, menuAdd, {body: {date: ' ', firstOption: ' ', secondOption: ''}}, {status:500, result: 'fail', reason: 'Property secondOption is an empty string'})
    })
    
    it('menuAdd no mock fail - otherStuff missing', function (done) {
      doTest(done, menuAdd, {body: {date: ' ', firstOption: ' ', secondOption: ' '}}, {status:500, result: 'fail', reason: 'Missing otherStuff property'})
    })
    
    it('menuAdd no mock fail - otherStuff not string', function (done) {
      doTest(done, menuAdd, {body: {date: ' ', firstOption: ' ', secondOption: ' ', otherStuff: 0}}, {status:500, result: 'fail', reason: 'Property otherStuff is not a string'})
    })
    
    it('menuAdd no mock fail - otherStuff empty string', function (done) {
      doTest(done, menuAdd, {body: {date: ' ', firstOption: ' ', secondOption: ' ', otherStuff: ''}}, {status:500, result: 'fail', reason: 'Property otherStuff is an empty string'})
    })
    
  })
})
