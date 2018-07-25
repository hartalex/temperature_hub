import { convertToDoor } from "./doorModel.js";

describe("temperature model", () => {
  it("model success", async () => {
    var input = {
      sensorId: "test",
      isOpen: true,
      utc_timestamp: "20180101"
    };

    const result = await convertToDoor(input);
    expect(result.sensorId).toEqual(input.sensorId);
    expect(result.isOpen).toEqual(input.isOpen);
    expect(result.utc_timestamp).toEqual(input.utc_timestamp);
  });
});
