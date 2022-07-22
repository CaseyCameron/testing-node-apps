import axios from 'axios'
import {resetDb} from 'utils/db-utils'
import * as generate from 'utils/generate'
import startServer from '../start'

let server
beforeAll(async () => {
  server = await startServer({port: 8000})
})

afterAll(() => server.close())
beforeEach(() => resetDb)

const baseURL = 'http://localhost:8000/api'
const api = axios.create({baseURL})

test('auth flow', async () => {
  // register
  const {username, password} = generate.loginForm()
  const registrationResult = await api.post('auth/register', {
  username, password
  })
  expect(registrationResult.data.user).toMatchObject({
    id: expect.any(String),
    username: expect.any(String),
    token: expect.any(String)
  })
  
  // login
  const loginResult = await api.post('auth/login', {
    username,
    password,
    })
  expect(loginResult.data.user).toEqual(registrationResult.data.user)

  // get user
  const getResult = await api.get('auth/me', {
    headers: {
      Authorization: `Bearer ${loginResult.data.user.token}`
    }
  })
  expect(getResult.data.user).toEqual(loginResult.data.user)
})
