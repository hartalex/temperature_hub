import { init } from "../data/data";
var mockSuccess = require("../data/mock-success");
var mockFail = require("../data/mock-fail");
var mockmongodb = require("../db/mock-mongodb");
const mockdata = init(mockmongodb);
const menuAdd = require("./menu/menu_add");
const doTest = require("./do_test");

describe("menu_add", function() {
  describe("#function (req, res)", function() {
    it("menuAdd success", function(done) {
      const input = {};
      doTest(
        done,
        menuAdd,
        {
          body: input,
          data: mockSuccess
        },
        {
          status: 200,
          result: "ok",
          data: input
        }
      );
    });

    it("menuAdd failure", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {},
          data: mockFail
        },
        {
          status: 500,
          result: "fail",
          reason: "mock error"
        }
      );
    });

    it("menuAdd no mock fail - input is undefined", function(done) {
      doTest(
        done,
        menuAdd,
        { data: mockdata },
        {
          status: 500,
          result: "fail",
          reason: "Input is undefined"
        }
      );
    });

    it("menuAdd no mock fail - input is null", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: null,
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "Input is null"
        }
      );
    });

    it("menuAdd no mock fail - date missing", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {},
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "Property date is missing"
        }
      );
    });

    it("menuAdd no mock fail - date not string", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: 0
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "date is not a string"
        }
      );
    });

    it("menuAdd no mock fail - date empty string", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: ""
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "date is an empty string"
        }
      );
    });

    it("menuAdd no mock fail - firstOption missing", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " "
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "Property firstOption is missing"
        }
      );
    });

    it("menuAdd no mock fail - firstOption not string", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " ",
            firstOption: 0
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "firstOption is not a string"
        }
      );
    });

    it("menuAdd no mock fail - firstOption empty string", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " ",
            firstOption: ""
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "firstOption is an empty string"
        }
      );
    });
    it("menuAdd no mock fail - secondOption missing", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " ",
            firstOption: " "
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "Property secondOption is missing"
        }
      );
    });

    it("menuAdd no mock fail - secondOption not string", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " ",
            firstOption: " ",
            secondOption: 0
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "secondOption is not a string"
        }
      );
    });

    it("menuAdd no mock fail - secondOption empty string", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " ",
            firstOption: " ",
            secondOption: ""
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "secondOption is an empty string"
        }
      );
    });

    it("menuAdd no mock fail - otherStuff missing", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " ",
            firstOption: " ",
            secondOption: " "
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "Property otherStuff is missing"
        }
      );
    });

    it("menuAdd no mock fail - otherStuff not string", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " ",
            firstOption: " ",
            secondOption: " ",
            otherStuff: 0
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "otherStuff is not a string"
        }
      );
    });

    it("menuAdd no mock fail - otherStuff empty string", function(done) {
      doTest(
        done,
        menuAdd,
        {
          body: {
            date: " ",
            firstOption: " ",
            secondOption: " ",
            otherStuff: ""
          },
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "otherStuff is an empty string"
        }
      );
    });
  });
});
