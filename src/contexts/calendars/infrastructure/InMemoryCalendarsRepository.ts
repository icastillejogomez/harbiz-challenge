// Domain imports
import { Calendar, CalendarPrimitives, CalendarRepository } from '../domain'

type ICalendar = {
  id: number
  durationBefore: number
  durationAfter: number
  slots: {
    // eslint-disable-next-line no-unused-vars
    [key in string]: Array<{
      start: string
      end: string
    }>
  }
  sessions: {
    // eslint-disable-next-line no-unused-vars
    [key in string]: Array<{
      start: string
      end: string
    }>
  }
}

export class InMemoryCalendarsRepository implements CalendarRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly calendars: ICalendar[]) {}

  private parseICalendarToPrimitives (calendar: ICalendar): CalendarPrimitives {
    // It's not necessary to parse anything because both types match but in real-life could mismatch
    return calendar
  }

  public async find (id: number): Promise<Calendar | null> {
    const calendar = this.calendars.find((calendar) => calendar.id === id)
    if (!calendar) return null

    return new Calendar(this.parseICalendarToPrimitives(calendar))
  }
}
