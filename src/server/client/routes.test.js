import routes from 'server/client/routes.js'

describe("routes", async () => {
  it("setup routes", async() => {
    const req = null;
    const res = {
      sendFile: jest.fn(),
      render: jest.fn()
    }
    const app = {
      get: (route, routeFunction) => {
        routeFunction(req, res)
      }
    }
    routes(app)
    expect(res.sendFile.mock.calls.length).toBe(2)
    expect(res.render.mock.calls.length).toBe(2)
  })
})
