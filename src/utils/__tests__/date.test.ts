import { expect, it } from 'vitest'
import { getFutureDate } from '../date'

it('should return a date one year later', () => {
  const year = new Date().getFullYear()
  expect(getFutureDate(`${year}-08-05`).getFullYear()).toBe(year + 1)
})
