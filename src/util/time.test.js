import {timeAgo, calculateTodayTomorrowNextDay} from 'util/time.js'

describe("TimeAgo", async () => {
  it("TimeAgo Seconds", async () => {
    const expectedResult = "10 sec"
    const time = new Date() - 10000;
    const result = timeAgo(time);
    expect(result).toEqual(expectedResult)
  })

  it("TimeAgo Minutes", async () => {
    const expectedResult = "10 min"
    const time = new Date() - 600000;
    const result = timeAgo(time);
    expect(result).toEqual(expectedResult)
  })

  it("TimeAgo Hours", async () => {
    const expectedResult = "1 hour"
    const time = new Date() - 6000000;
    const result = timeAgo(time);
    expect(result).toEqual(expectedResult)
  })
})

describe("calculateTodayTomorrowNextDay", async () => {
  it("Day is NextDay", async () => {
    const expectedResult = new Date(
      new Date().getTime() +
        24 * 2 * 60 * 60 * 1000 -
        new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .substring(0, 10)
    const propDay = "NextDay"
    const result = calculateTodayTomorrowNextDay(propDay);
    expect(result).toEqual(expectedResult)
  })

  it("Day is Tomorrow", async () => {
    const expectedResult = new Date(
      new Date().getTime() +
        24 * 1 * 60 * 60 * 1000 -
        new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .substring(0, 10)
    const propDay = "Tomorrow"
    const result = calculateTodayTomorrowNextDay(propDay);
    expect(result).toEqual(expectedResult)
  })

  it("Day is Today", async () => {
    const expectedResult = new Date(
      new Date().getTime() +
        24 * 0 * 60 * 60 * 1000 -
        new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .substring(0, 10)
    const propDay = "Today"
    const result = calculateTodayTomorrowNextDay(propDay);
    expect(result).toEqual(expectedResult)
  })

  it("Day is undefined", async () => {
    const expectedResult = new Date(
      new Date().getTime() +
        24 * 0 * 60 * 60 * 1000 -
        new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .substring(0, 10)
    const result = calculateTodayTomorrowNextDay();
    expect(result).toEqual(expectedResult)
  })
})
