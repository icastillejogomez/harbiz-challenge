import { CalendarSlotRangeEnd } from './CalendarSlotRangeEnd'
import { CalendarSlotRangeStart } from './CalendarSlotRangeStart'

export class CalendarSlotRange {
  private readonly start: CalendarSlotRangeStart
  private readonly end: CalendarSlotRangeEnd

  constructor (start: string, end: string) {
    this.start = new CalendarSlotRangeStart(start)
    this.end = new CalendarSlotRangeEnd(end)
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
