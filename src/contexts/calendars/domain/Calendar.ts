// Types imports
import { CalendarSpot } from './types'
import { CalendarPrimitives } from './CalendarPrimitives'

// Domain imports
import { CalendarDurationAfter, CalendarDurationBefore, CalendarId, CalendarSession, CalendarSlot } from './value-objects'
import { AggregateRoot } from '../../shared/domain'

// Utils imports
import { getDateInstanceFromDateAndTime } from '../../../utils'

export class Calendar extends AggregateRoot<CalendarPrimitives> {
  private readonly id: CalendarId
  private readonly durationBefore: CalendarDurationBefore
  private readonly durationAfter: CalendarDurationAfter
  private readonly slots: CalendarSlot[]
  private readonly sessions: CalendarSession[]

  constructor (primitives: CalendarPrimitives) {
    super()

    this.id = new CalendarId(primitives.id)
    this.durationBefore = new CalendarDurationBefore(primitives.durationBefore)
    this.durationAfter = new CalendarDurationAfter(primitives.durationAfter)

    this.slots = Object.keys(primitives.slots).reduce<CalendarSlot[]>((slots, date) => {
      const dateSlots: CalendarSlot[] = primitives.slots[date].map((slot) => {
        const start = getDateInstanceFromDateAndTime(date, slot.start)
        const end = getDateInstanceFromDateAndTime(date, slot.end)
        return new CalendarSlot(start, end)
      })

      return slots.concat(dateSlots)
    }, [])

    this.sessions = Object.keys(primitives.sessions).reduce<CalendarSession[]>((sessions, date) => {
      const dateSessions: CalendarSession[] = primitives.sessions[date].map((session) => {
        const start = getDateInstanceFromDateAndTime(date, session.start)
        const end = getDateInstanceFromDateAndTime(date, session.end)
        return new CalendarSession(start, end)
      })

      return sessions.concat(dateSessions)
    }, [])
  }

  private getDateSlot (date: string): CalendarSlot[] {
    return this.slots.filter((slot) => {
      const startSlotDate = slot.getSlot().start
      return date === startSlotDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
    })
  }

  private getDateSession (date: string): CalendarSession[] {
    return this.sessions.filter((session) => {
      const startSessionDate = session.getSession().start
      return date === startSessionDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
    })
  }

  public getAvailableSpots (date: string, durationMinutes: number): CalendarSpot[] {
    // Get date slots and sessions
    const dateSlots = this.getDateSlot(date).map((slot) => slot.getSlot())
    const dateSessions = this.getDateSession(date).map((session) => session.getSession())

    // Calculate the total session duration in minutes
    const totalSessionDurationMinutes = this.durationBefore.getValue() + durationMinutes + this.durationAfter.getValue()

    // Search spots in each slot
    const spots = dateSlots.reduce<CalendarSpot[]>((spots, currentSlot) => {
      const possibleSpotsInThisSlot: CalendarSpot[] = this.sliceSlotInSpots(currentSlot, totalSessionDurationMinutes).map((spot) => {
        const clientStart = new Date(spot.start)
        const clientEnd = new Date(spot.end)

        clientStart.setMinutes(clientStart.getMinutes() + this.durationBefore.getValue())
        clientEnd.setMinutes(clientEnd.getMinutes() - this.durationAfter.getValue())
        return {
          startHour: spot.start.toISOString(),
          endHour: spot.end.toISOString(),
          clientStartHour: clientStart.toISOString(),
          clientEndHour: clientEnd.toISOString()
        }
      })
      return spots.concat(possibleSpotsInThisSlot)
    }, [])

    // Remove already conflicts with other sessions
    const availableSpots = spots.filter((spot) => {
      const isAnySessionOverlapping = dateSessions.some((session) => {
        return this.isSessionOverlappingSpot(spot, session)
      })
      return !isAnySessionOverlapping
    })

    return availableSpots
  }

  private isSessionOverlappingSpot (spot: CalendarSpot, session: { start: Date; end: Date}): boolean {
    const spotStart = new Date(spot.startHour).getTime()
    const spotEnd = new Date(spot.endHour).getTime()
    const sessionStart = session.start.getTime()
    const sessionEnd = session.end.getTime()
    return (sessionStart >= spotStart && sessionStart < spotEnd) || (sessionEnd > spotStart && sessionEnd <= spotEnd) || (sessionStart < spotStart && sessionEnd > spotEnd)
  }

  private sliceSlotInSpots (slot: { start: Date; end: Date }, spotTotalDurationMinutes: number): { start: Date; end: Date}[] {
    const spotDurationMs = spotTotalDurationMinutes * 60 * 1000
    const spots:{ start: Date; end: Date}[] = []
    for (let i = slot.start.getTime(); i < slot.end.getTime(); i += spotDurationMs) {
      const start = new Date(i)
      const end = new Date(i + spotDurationMs)
      if (end.getTime() <= slot.end.getTime()) spots.push({ start, end })
    }
    return spots
  }

  public toPrimitives (): CalendarPrimitives {
    throw new Error('Method not implemented.')
  }
}
