import { Colors } from 'src/colors.js'
import {temperatureColor} from 'util/temperatureColor.js'
describe("TemperatureColor", async () => {
  it("White", async() => {
    const expectedRetval = Colors.White;
    const retval = temperatureColor(0);
    expect(retval).toEqual(expectedRetval);
  })
  it("Red", async() => {
    const expectedRetval = Colors.SoftRed;
    const retval = temperatureColor(76);
    expect(retval).toEqual(expectedRetval);
  })
  it("Green", async() => {
    const expectedRetval = Colors.SoftGreen;
    const retval = temperatureColor(64);
    expect(retval).toEqual(expectedRetval);
  })
  it("Blue", async() => {
    const expectedRetval = Colors.SoftBlue;
    const retval = temperatureColor(50);
    expect(retval).toEqual(expectedRetval);
  })
})
