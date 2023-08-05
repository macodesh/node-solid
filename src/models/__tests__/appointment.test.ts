import { it, expect, describe } from 'vitest'
import Appointment from '../appointment'

describe('Appointment model', () => {
  const today = new Date()

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  it('should create an appointment', () => {
    const a = new Appointment({
      customerName: 'John Doe',
      startsAt: today,
      endsAt: tomorrow
    })

    expect(a).toBeInstanceOf(Appointment)
    expect(a.customerName).toBe('John Doe')
  })

  it('should throw an error if endsAt isn\'t after startsAt', () => {
    expect(() => {
      return new Appointment({
        customerName: 'John Doe',
        startsAt: today,
        endsAt: today
      })
    }).toThrow('endsAt must be after startsAt')
  })

  it('should throw an error if startsAt is in the past', () => {
    expect(() => {
      return new Appointment({
        customerName: 'John Doe',
        startsAt: yesterday,
        endsAt: tomorrow
      })
    }).toThrow('startsAt must be in the future')
  })
})
