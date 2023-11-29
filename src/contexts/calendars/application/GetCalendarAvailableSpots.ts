import moment from 'moment'

// Domain imports
import { CalendarRepository } from '../domain'

export class GetCalendarAvailableSpots {
  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly repository: CalendarRepository) {}

  public async execute (calendarId: number, date: string, durationMinutes: number) {
    const calendar = await this.repository.find(calendarId)
    if (!calendar) throw new Error('Calendar was not found')

    const durationBefore = calendar.getDurationBefore()
    const durationAfter = calendar.getDurationAfter()

    // Parse requested date
    const dateISO = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')

    // Get requested date slots from calendar
    const dateSlots = calendar.getDateSlots(date)

    // Get current date sessions
    const sessions = calendar.getDateSessions(date)

    // Remove conflicts slots
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const realSpots: any[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dateSlots.forEach((daySlot: any) => {
      if (!sessions.length) {
        return realSpots.push(daySlot)
      }

      let noConflicts = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sessions.forEach((sessionSlot: any) => {
        const sessionStart = moment(dateISO + ' ' + sessionSlot.start).valueOf()
        const sessionEnd = moment(dateISO + ' ' + sessionSlot.end).valueOf()
        const start = moment(dateISO + ' ' + daySlot.start).valueOf()
        const end = moment(dateISO + ' ' + daySlot.end).valueOf()
        if (sessionStart > start && sessionEnd < end) {
          realSpots.push({ start: daySlot.start, end: sessionSlot.start })
          realSpots.push({ start: sessionSlot.end, end: daySlot.end })
          noConflicts = false
        } else if (sessionStart === start && sessionEnd < end) {
          realSpots.push({ start: sessionSlot.end, end: daySlot.end })
          noConflicts = false
        } else if (sessionStart > start && sessionEnd === end) {
          realSpots.push({ start: daySlot.start, end: sessionSlot.start })
          noConflicts = false
        } else if (sessionStart === start && sessionEnd === end) {
          noConflicts = false
        }
      })

      if (noConflicts) {
        realSpots.push(daySlot)
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arrSlot: any[] = []
    realSpots.forEach(function (slot) {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      let init = 0
      let startHour
      let endHour
      let clientStartHour
      let clientEndHour

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function getMomentHour (hour: any) {
        const finalHourForAdd = moment(dateISO + ' ' + hour)
        return finalHourForAdd
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function addMinutes (hour: any, minutes: any) {
        const result = moment(hour).add(minutes, 'minutes').format('HH:mm')
        return result
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
      function removeMinutes (hour: any, minutes: any) {
        const result = moment(hour).subtract(minutes, 'minutes').format('HH:mm')
        return result
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function getOneMiniSlot (startSlot: any, endSlot: any) {
        const startHourFirst = getMomentHour(startSlot)

        startHour = startHourFirst.format('HH:mm')
        endHour = addMinutes(startHourFirst, durationBefore + durationMinutes + durationAfter)
        clientStartHour = addMinutes(startHourFirst, durationBefore)
        clientEndHour = addMinutes(startHourFirst, durationMinutes)

        if (moment.utc(endHour, 'HH:mm').valueOf() > moment.utc(endSlot, 'HH:mm').valueOf()) {
          return null
        }

        const objSlot = {
          startHour: moment.utc(dateISO + ' ' + startHour)
            .toDate(),
          endHour: moment.utc(dateISO + ' ' + endHour)
            .toDate(),
          clientStartHour: moment.utc(dateISO + ' ' + clientStartHour)
            .toDate(),
          clientEndHour: moment.utc(dateISO + ' ' + clientEndHour)
            .toDate()
        }

        init += 1
        return objSlot
      }

      let start = slot.start
      let resultSlot
      do {
        resultSlot = getOneMiniSlot(start, slot.end)
        if (resultSlot) {
          arrSlot.push(resultSlot)
          start = moment.utc(resultSlot.endHour).format('HH:mm')
        }
      } while (resultSlot)

      return arrSlot
    })

    return arrSlot
  }
}
