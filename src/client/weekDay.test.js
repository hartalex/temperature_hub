var assert = require("assert");
var weekDay = require("./weekDay");

describe("weekDay", () => {
  it("Sunday", () => {
    assert.equal(weekDay(0), "Sunday");
  });
  it("Monday", () => {
    assert.equal(weekDay(1), "Monday");
  });
  it("Tuesday", () => {
    assert.equal(weekDay(2), "Tuesday");
  });
  it("Wednesday", () => {
    assert.equal(weekDay(3), "Wednesday");
  });
  it("Thursday", () => {
    assert.equal(weekDay(4), "Thursday");
  });
  it("Friday", () => {
    assert.equal(weekDay(5), "Friday");
  });
  it("Saturday", () => {
    assert.equal(weekDay(6), "Saturday");
  });
});
