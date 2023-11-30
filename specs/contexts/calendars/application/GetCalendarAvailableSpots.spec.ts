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
import calendar4 from '../../../__mocks__/calendar.4.json'

const calendars = [calendar1, calendar2, calendar3, calendar4]
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
            startHour: '2023-04-10T16:00:00.000Z',
            endHour: '2023-04-10T16:50:00.000Z',
            clientStartHour: '2023-04-10T16:10:00.000Z',
            clientEndHour: '2023-04-10T16:40:00.000Z'
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
            startHour: '2023-04-13T18:00:00.000Z',
            endHour: '2023-04-13T18:25:00.000Z',
            clientStartHour: '2023-04-13T18:00:00.000Z',
            clientEndHour: '2023-04-13T18:25:00.000Z'
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

    describe('using calendar 4 mock...', () => {
      it('Should get 6 available spots requesting 40 minutes on 01-01-2023', async () => {
        const date = '01-01-2023'
        const durationMinutes = 40
        const expectedSpots = [
          {
            startHour: '2023-01-01T10:00:00.000Z',
            endHour: '2023-01-01T11:00:00.000Z',
            clientStartHour: '2023-01-01T10:10:00.000Z',
            clientEndHour: '2023-01-01T10:50:00.000Z'
          },
          {
            startHour: '2023-01-01T12:00:00.000Z',
            endHour: '2023-01-01T13:00:00.000Z',
            clientStartHour: '2023-01-01T12:10:00.000Z',
            clientEndHour: '2023-01-01T12:50:00.000Z'
          },
          {
            startHour: '2023-01-01T13:00:00.000Z',
            endHour: '2023-01-01T14:00:00.000Z',
            clientStartHour: '2023-01-01T13:10:00.000Z',
            clientEndHour: '2023-01-01T13:50:00.000Z'
          },
          {
            startHour: '2023-01-01T18:00:00.000Z',
            endHour: '2023-01-01T19:00:00.000Z',
            clientStartHour: '2023-01-01T18:10:00.000Z',
            clientEndHour: '2023-01-01T18:50:00.000Z'
          },
          {
            startHour: '2023-01-01T19:00:00.000Z',
            endHour: '2023-01-01T20:00:00.000Z',
            clientStartHour: '2023-01-01T19:10:00.000Z',
            clientEndHour: '2023-01-01T19:50:00.000Z'
          },
          {
            startHour: '2023-01-01T20:00:00.000Z',
            endHour: '2023-01-01T21:00:00.000Z',
            clientStartHour: '2023-01-01T20:10:00.000Z',
            clientEndHour: '2023-01-01T20:50:00.000Z'
          }
        ]

        const spots = await getCalendarAvailableSpots.execute(4, date, durationMinutes)
        expect(spots).toBeArrayOfSize(6)
        expect(spots).toStrictEqual<CalendarSpot[]>(expectedSpots)
      })
    })

    describe('using calendar 5 mock...', () => {
      it('should crash becasue calendar 5 mock does not exists', async () => {
        const useCase = async () => {
          await getCalendarAvailableSpots.execute(5, '01-01-2023', 30)
        }
        await expect(useCase()).rejects.toThrow('Calendar was not found')
      })
    })
  })
})
