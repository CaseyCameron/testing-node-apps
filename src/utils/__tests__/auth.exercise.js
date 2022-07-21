import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

cases(
  'isPasswordsAllowed: valid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(true)
  },
  {
    'valid password': {password: '!aBc12x'},
  }
)

cases(
  'isPasswordsAllowed: invalid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(false)
  },
  {
    'too short': {password: 'a2c!'},
    'no letters':  {password: '123456!'},
    'no numbers':  {password: 'ABCdef!'},
    'no uppercase letters':  {password: 'abc123!'},
    'no lowercase letters':  {password: 'ABC123!'},
    'no non-alphanumeric characters':  {password: 'ABCdef123'},
  }
)
