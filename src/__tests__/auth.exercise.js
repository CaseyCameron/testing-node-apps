import axios from 'axios'
import {getData, handleRequestFailure, resolve} from 'utils/async'
import {resetDb} from 'utils/db-utils'
import * as generate from 'utils/generate'
import startServer from '../start'

let api, server

beforeAll(async () => {
  server = await startServer()
  const baseURL = `http://localhost:${server.address().port}/api`
  api = axios.create({baseURL})
  // on responses, intercept and manipulate with getData on success
  // or handleRequestFailure on failure
  api.interceptors.response.use(getData, handleRequestFailure)
})

afterAll(() => server.close())
beforeEach(() => resetDb)

test('auth flow', async () => {
  // register
  const {username, password} = generate.loginForm()
  const rData = await api.post('auth/register', {
    username,
    password,
  })

  expect(rData.user).toMatchObject({
    id: expect.any(String),
    username: expect.any(String),
    token: expect.any(String),
  })

  // login
  const lData = await api.post('auth/login', {
    username,
    password,
  })
  expect(lData.user).toEqual(rData.user)

  // get user
  const mData = await api.get('auth/me', {
    headers: {
      Authorization: `Bearer ${lData.user.token}`,
    },
  })
  expect(mData.user).toEqual(lData.user)
})

test('username must be unique', async () => {
  const {username, password} = generate.loginForm()
  await api.post('auth/register', {
    username,
    password,
  })

  const error = await api
    .post('auth/register', {
      username,
      password,
    })
    .catch(resolve)
  expect(error).toMatchInlineSnapshot(
    `[Error: 400: {"message":"username taken"}]`,
  )
})
