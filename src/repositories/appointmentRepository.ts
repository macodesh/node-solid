import { IAppointmentsRepository } from '../interfaces'
import Appointment from '../models/appointment'
import { areIntervalsOverlapping } from 'date-fns'

export default class AppointmentsRepository implements IAppointmentsRepository {
  public appointments: Appointment[] = []

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment)
  }

  async findOverlappingAppointment(start: Date, end: Date): Promise<Appointment | null> {
    const overlapping = this.appointments.find((a) => {
      return areIntervalsOverlapping(
        { start, end },
        { start: a.startsAt, end: a.endsAt },
        { inclusive: true }
      )
    })

    if (!overlapping) return null
    else return overlapping
  }
}
