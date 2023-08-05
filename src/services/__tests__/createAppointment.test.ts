import { beforeEach, describe, expect, it } from 'vitest'
import CreateAppointment from '../createAppointment'
import Appointment from '../../models/appointment'
import AppointmentsRepository from '../../repositories/appointmentRepository'
import { IAppointmentsRepository } from '../../interfaces'

describe('CreateAppointment service', () => {
  const today = new Date()

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  let repo: IAppointmentsRepository
  let c: CreateAppointment

  beforeEach(() => {
    repo = new AppointmentsRepository()
    c = new CreateAppointment(repo)
  })

  it('should create an appointment', () => {
    expect(c.execute({
      customerName: 'John Doe',
      startsAt: today,
      endsAt: tomorrow
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('shouldn\'t create an appointment with overlapping dates', async () => {
    await c.execute({
      customerName: 'John Doe',
      startsAt: today,
      endsAt: tomorrow
    })

    expect(c.execute({
      customerName: 'John Doe',
      startsAt: today,
      endsAt: tomorrow
    })).rejects.toThrow('Overlapping appointments')
  })
})
