import { buildRes, buildReq, buildNext } from 'utils/generate';
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
test('responds with 401 for express-jwt Unauthorized Error', () => {
  const req = buildReq()
  // create a normal response object just as we have it set up in buildRes
  const res = buildRes()
  const next = buildNext()
  const code = 'some_error_code'
  const message = 'Some message'
  const error = new UnauthorizedError(code, {message})
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({code: error.code, message: error.message})
  expect(res.json).toHaveBeenCalledTimes(1)
} )

// 🐨 Write a test for the headersSent case
test('calls next if headersSent is true', () => {
  const req = buildReq()
  const next = buildNext()
  // build a res, this time with a headersSent property
  const res = buildRes({headersSent: true})
  const error = new Error('error')
  errorMiddleware(error, req, res, next)
  expect(next).toHaveBeenCalledWith(error)
  expect(next).toHaveBeenCalledTimes(1)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

// 🐨 Write a test for the else case (responds with a 500)
test('responds with 500 and the error object', () => {
  const req = buildReq()
  const next = buildNext()
  const res = buildRes()
  const error = new Error('error')
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({message: error.message, stack: error.stack})
  expect(res.json).toHaveBeenCalledTimes(1)
} )