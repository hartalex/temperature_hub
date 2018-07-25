var simple = require("simple-mock");

module.exports = {
  init: function() {
    var mockdb = {};
    simple.mock(mockdb, "close");
    simple.mock(this, "connect").resolveWith({ close: function() {} });
    simple
      .mock(this, "queryLastData")
      .callbackWith(null, { tempInFarenheit: 0 });
    simple.mock(this, "queryOneData").callbackWith(null, null);
    simple.mock(this, "insertData").rejectWith(null, {});
    return this;
  }
}.init();
