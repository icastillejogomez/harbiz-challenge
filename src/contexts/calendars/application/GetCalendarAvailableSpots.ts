// Domain imports
import { CalendarRepository } from '../domain'

export class GetCalendarAvailableSpots {
  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly repository: CalendarRepository) {}

  public async execute (calendarId: number, date: string, durationMinutes: number) {
    const calendar = await this.repository.find(calendarId)
    if (!calendar) throw new Error('Calendar was not found')

    const availableSpots = calendar.getAvailableSpots(date, durationMinutes)
    return availableSpots
  }
}
