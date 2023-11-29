export class CalendarSlot {
  readonly date: string
  readonly slots: { start: string; end: string }[]

  constructor (date: string, slots:{ start: string; end: string }[]) {
    this.date = date
    this.slots = slots
  }
}
