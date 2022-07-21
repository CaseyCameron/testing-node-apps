import {isPasswordAllowed} from '../auth'

describe('isPasswordAllowed only allows some passwords', () => {
  const allowedPasswords = ['!aBc12x']
  const disallowedPasswords = [
    'a2c!',
    '123456!',
    'ABCdef!',
    'abc123!',
    'ABCdef123',
    'ABC123!',
  ]
  allowedPasswords.forEach(password => {
    test(`allows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true)
    })
  })
  
  disallowedPasswords.forEach(password => {
    test(`disallows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(false)
    })
  })
})
