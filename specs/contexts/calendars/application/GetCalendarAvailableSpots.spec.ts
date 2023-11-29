// Domain imports
import { CalendarSpot } from '../../../../src/contexts/calendars/domain'

// Application imports
import { GetCalendarAvailableSpots } from '../../../../src/contexts/calendars/application/GetCalendarAvailableSpots'

// Infrastructure imports
import { InMemoryCalendarsRepository } from '../../../../src/contexts/calendars/infrastructure'

// Mocks imports
import calendar1 from '../../../__mocks__/calendar.1.json'
import calendar2 from '../../../__mocks__/calendar.2.json'
import calendar3 from '../../../__mocks__/calendar.3.json'

const calendars = [calendar1, calendar2, calendar3]
const calendarRepository = new InMemoryCalendarsRepository(calendars)
const getCalendarAvailableSpots = new GetCalendarAvailableSpots(calendarRepository)

describe('Use cases', () => {
  describe('GetCalendarAvailableSpots', () => {
    describe('using calendar 1 mock...', () => {
      it('Should get 1 available spot requesting 30 minutes on 10-04-2023', async () => {
        const date = '10-04-2023'
        const durationMinutes = 30
        const expectedSpots = [
          {
            startHour: new Date('2023-04-10T16:00:00.000Z'),
            endHour: new Date('2023-04-10T16:50:00.000Z'),
            clientStartHour: new Date('2023-04-10T16:10:00.000Z'),
            clientEndHour: new Date('2023-04-10T16:30:00.000Z')
          }
        ]

        const spots = await getCalendarAvailableSpots.execute(1, date, durationMinutes)
        expect(spots).toBeArrayOfSize(1)
        expect(spots).toStrictEqual<CalendarSpot[]>(expectedSpots)
      })
    })

    describe('using calendar 2 mock...', () => {
      it('Should get 1 available spot requesting 25 minutes on 13-04-2023', async () => {
        const date = '13-04-2023'
        const durationMinutes = 25
        const expectedSpots = [
          {
            startHour: new Date('2023-04-13T18:00:00.000Z'),
            endHour: new Date('2023-04-13T18:25:00.000Z'),
            clientStartHour: new Date('2023-04-13T18:00:00.000Z'),
            clientEndHour: new Date('2023-04-13T18:25:00.000Z')
          }
        ]

        const spots = await getCalendarAvailableSpots.execute(2, date, durationMinutes)
        expect(spots).toBeArrayOfSize(1)
        expect(spots).toStrictEqual<CalendarSpot[]>(expectedSpots)
      })
    })

    describe('using calendar 3 mock...', () => {
      it('Should get 0 available spots requesting 25 minutes on 16-04-2023', async () => {
        const date = '16-04-2023'
        const durationMinutes = 25
        const spots = await getCalendarAvailableSpots.execute(3, date, durationMinutes)
        expect(spots).toBeArrayOfSize(0)
      })
    })
  })
})
