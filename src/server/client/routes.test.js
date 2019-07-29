import routes from './routes.js'
import express from 'express'
import request from 'supertest'

describe('routes', () => {
  describe('#function (app)', () => {
    it('routes count 4', () => {
      const app = {
        get: jest.fn()
      }
      routes(app)
      expect(app.get).toHaveBeenCalledTimes(4)
    })
  })
  describe('integration', () => {
    const app = express()
    app.set('view engine', 'ejs')

    routes(app)
    app.listen(8080)
    it('/', async done => {
      request(app)
        .get('/')
        .expect(200, done)
    })
    it('/menuEntry', async done => {
      request(app)
        .get('/menuEntry')
        .expect(200, done)
    })
    it('/memoryEntry', async done => {
      request(app)
        .get('/memoryEntry')
        .expect(200, done)
    })
    it('/info', async done => {
      request(app)
        .get('/info')
        .expect(200, done)
    })
  })
})
