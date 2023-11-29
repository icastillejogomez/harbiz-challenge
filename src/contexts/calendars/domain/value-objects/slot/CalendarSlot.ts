import { CalendarSlotDate } from './CalendarSlotDate'
import { CalendarSlotRange } from './CalendarSlotRange'

export class CalendarSlot {
  private readonly date: CalendarSlotDate
  private readonly slots: CalendarSlotRange[]

  constructor (date: string, slots:{ start: string; end: string }[]) {
    this.date = new CalendarSlotDate(date)
    this.slots = slots.map(({ start, end }) => new CalendarSlotRange(start, end))
  }

  public getDate (): string {
    return this.date.getValue()
  }

  public getSlots () {
    return this.slots.map((slot) => slot.getRange())
  }
}
