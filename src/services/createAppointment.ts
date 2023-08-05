import Appointment from '../models/appointment'
import { IAppointmentProps, IAppointmentsRepository } from '../interfaces'

export default class CreateAppointment {
  constructor(
    private _appointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({ customerName, startsAt, endsAt }: IAppointmentProps): Promise<Appointment> {
    const isOverlapping = await this._appointmentsRepository.findOverlappingAppointment(startsAt, endsAt)
    if (isOverlapping) throw new Error('Overlapping appointments')

    const newAppointment = new Appointment({ customerName, startsAt, endsAt })
    await this._appointmentsRepository.create(newAppointment)

    return newAppointment
  }
}
