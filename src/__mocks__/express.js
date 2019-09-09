export const express = jest.fn().mockReturnValue({
  use: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  listen: jest.fn(),
  address: jest.fn(),
  port: jest.fn()
})
express.static = jest.fn()
export default express
