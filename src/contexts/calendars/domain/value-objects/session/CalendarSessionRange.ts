import { CalendarSessionRangeEnd } from './CalendarSessionRangeEnd'
import { CalendarSessionRangeStart } from './CalendarSessionRangeStart'

export class CalendarSessionRange {
  private readonly start: CalendarSessionRangeStart
  private readonly end: CalendarSessionRangeEnd

  constructor (start: string, end: string) {
    this.start = new CalendarSessionRangeStart(start)
    this.end = new CalendarSessionRangeEnd(end)
  }

  public getStart (): string {
    return this.start.getValue()
  }

  public getEnd (): string {
    return this.end.getValue()
  }

  public getRange (): { start: string; end: string } {
    return {
      start: this.getStart(),
      end: this.getEnd()
    }
  }
}
