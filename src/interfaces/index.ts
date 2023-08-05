import Appointment from '../models/appointment'

export interface IAppointmentProps {
  customerName: string
  startsAt: Date
  endsAt: Date
}

export interface IAppointmentsRepository {
  create(appointment: Appointment): Promise<void>
  findOverlappingAppointment(start: Date, ends: Date): Promise<Appointment | null>
}
