import { CalendarSessionEnd } from './CalendarSessionEnd'
import { CalendarSessionStart } from './CalendarSessionStart'

export class CalendarSession {
  private readonly start: CalendarSessionStart
  private readonly end: CalendarSessionEnd

  constructor (start: Date, end: Date) {
    this.start = new CalendarSessionStart(start)
    this.end = new CalendarSessionEnd(end)
    this.ensureSessionIsValid()
  }

  protected ensureSessionIsValid (): void {
    if (this.start.getValue().getTime() >= this.end.getValue().getTime()) {
      throw new Error('Calendar session end datetime cannot be before the start datetime')
    }
  }

  public getSession () {
    return {
      start: this.start.getValue(),
      end: this.end.getValue()
    }
  }
}
