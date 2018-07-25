import { convertToTemperature } from "./temperatureModel.js";

describe("temperature model", async () => {
  it("model success temp", async () => {
    var input = {
      id: "test",
      t: 50,
      utc_timestamp: "20180101"
    };
    const result = await convertToTemperature(input);
    expect(result.sensorId).toEqual(input.id);
    expect(result.tempInFarenheit).toEqual(input.t);
    expect(result.humidity).toEqual(input.h);
    expect(result.utc_timestamp).toEqual(input.utc_timestamp);
  });

  it("model success temp and humidity", async () => {
    var input = {
      id: "test",
      t: 50,
      h: 65,
      utc_timestamp: "20180101"
    };
    const result = await convertToTemperature(input);
    expect(result.sensorId).toEqual(input.id);
    expect(result.tempInFarenheit).toEqual(input.t);
    expect(result.humidity).toEqual(input.h);
    expect(result.utc_timestamp).toEqual(input.utc_timestamp);
  });
});
