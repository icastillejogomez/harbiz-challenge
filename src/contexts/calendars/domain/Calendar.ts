// Types imports
import { CalendarPrimitives } from './CalendarPrimitives'
import { CalendarDurationAfter, CalendarDurationBefore, CalendarId, CalendarSession, CalendarSlot } from './value-objects'

export class Calendar {
  private readonly id: CalendarId
  private readonly durationBefore: CalendarDurationBefore
  private readonly durationAfter: CalendarDurationAfter
  private readonly slots: CalendarSlot[]
  private readonly sessions: CalendarSession[]

  constructor (primitives: CalendarPrimitives) {
    this.id = new CalendarId(primitives.id)
    this.durationBefore = new CalendarDurationBefore(primitives.durationBefore)
    this.durationAfter = new CalendarDurationAfter(primitives.durationAfter)

    this.slots = Object.keys(primitives.slots).map((date) => {
      const slots = primitives.slots[date]
      return new CalendarSlot(date, slots)
    })

    this.sessions = Object.keys(primitives.sessions).map((date) => {
      const sessions = primitives.sessions[date]
      return new CalendarSession(date, sessions)
    })
  }

  public getDurationBefore (): number {
    return this.durationBefore.getValue()
  }

  public getDurationAfter (): number {
    return this.durationAfter.getValue()
  }

  public getDateSlots (date: string) {
    return this.slots.find((slot) => slot.date === date)?.slots ?? []
  }

  public getDateSessions (date: string) {
    return this.sessions.find((session) => session.date === date)?.sessions ?? []
  }
}
