import { Colors } from 'src/colors'
import {alertCheck} from "util/alertCheck.js"

describe("Alert Check", async () => {
  it("Alert Check is Within Interval", async () => {
    const that = {
      state: {
        data:{
          lastUpdate: new Date()
        },
        style: {
          backgroundColor: false
        }
      },
      setState: function (state) {
        this.state = state;
      }
    }
    const alertCheckInterval = 10;
    alertCheck(that, alertCheckInterval)();
    expect(that.state.style.backgroundColor).toEqual(Colors.Black)
  })

  it("Alert Check is After Interval", async () => {
    const that = {
      state: {
        data:{
          lastUpdate: new Date()+100
        },
        style: {
          backgroundColor: false
        }
      },
      setState: function (state) {
        this.state = state;
      }
    }
    const alertCheckInterval = 10;
    alertCheck(that, alertCheckInterval)();
    expect(that.state.style.backgroundColor).toEqual(Colors.Red)
  })
})
