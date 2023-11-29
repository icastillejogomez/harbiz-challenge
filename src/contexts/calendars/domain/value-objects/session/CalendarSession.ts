import { CalendarSessionDate } from './CalendarSessionDate'
import { CalendarSessionRange } from './CalendarSessionRange'

export class CalendarSession {
  private readonly date: CalendarSessionDate
  private readonly sessions: CalendarSessionRange[]

  constructor (date: string, sessions:{ start: string; end: string }[]) {
    this.date = new CalendarSessionDate(date)
    this.sessions = sessions.map(({ start, end }) => new CalendarSessionRange(start, end))
  }

  public getDate (): string {
    return this.date.getValue()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getSessions (): any[] {
    return this.sessions.map((range) => range.getRange())
  }
}
