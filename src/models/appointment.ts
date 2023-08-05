import { IAppointmentProps } from '../interfaces'

export default class Appointment {
  private _customerName: string
  private _startsAt: Date
  private _endsAt: Date

  constructor({ customerName, startsAt, endsAt }: IAppointmentProps) {
    this._customerName = customerName
    this.startsAt = startsAt
    this.endsAt = endsAt
  }

  get customerName() { return this._customerName }

  get startsAt() { return this._startsAt }

  get endsAt() { return this._endsAt }

  set startsAt(value: Date) {
    const now = new Date()
    now.setMinutes(now.getMinutes() - 10)

    if (value >= now) {
      this._startsAt = value
    } else {
      throw new Error('startsAt must be in the future')
    }
  }

  set endsAt(value: Date) {
    if (value > this._startsAt) {
      this._endsAt = value
    } else {
      throw new Error('endsAt must be after startsAt')
    }
  }
}
