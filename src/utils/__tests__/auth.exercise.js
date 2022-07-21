import {isPasswordAllowed} from '../auth'

test('isPasswordAllowed returns true for valid passwords', () => {
  expect(isPasswordAllowed('!aBc12x')).toBe(true)
})


test('isPasswordAllowed returns false for invalid passwords', () => {
  expect(isPasswordAllowed('a2c!')).toBe(false)
  expect(isPasswordAllowed('123456!')).toBe(false)
  expect(isPasswordAllowed('ABCdef!')).toBe(false)
  expect(isPasswordAllowed('abc123!')).toBe(false)
  expect(isPasswordAllowed('ABCdef123')).toBe(false)
  expect(isPasswordAllowed('ABC123!')).toBe(false)
})
