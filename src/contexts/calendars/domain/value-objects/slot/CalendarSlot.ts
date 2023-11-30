import { CalendarSlotEnd } from './CalendarSlotEnd'
import { CalendarSlotStart } from './CalendarSlotStart'

export class CalendarSlot {
  private readonly start: CalendarSlotStart
  private readonly end: CalendarSlotEnd

  constructor (start: Date, end: Date) {
    this.start = new CalendarSlotStart(start)
    this.end = new CalendarSlotEnd(end)
    this.ensureSlotIsValid()
  }

  protected ensureSlotIsValid (): void {
    if (this.start.getValue().getTime() >= this.end.getValue().getTime()) {
      throw new Error('Calendar slot end datetime cannot be before the start datetime')
    }
  }

  public getSlot () {
    return {
      start: this.start.getValue(),
      end: this.end.getValue()
    }
  }
}
