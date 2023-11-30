import { Calendar } from './contexts/calendars/domain/Calendar'

const calendarPrimitives = {
  id: 123,
  durationBefore: 10,
  durationAfter: 10,
  slots: {
    '10-04-2023': [
      { start: '10:00', end: '14:00' },
      { start: '15:00', end: '17:00' }
    ],
    '10-05-2023': [
      { start: '10:00', end: '13:00' }
    ]
  },
  sessions: {
    '10-04-2023': [
      { start: '12:00', end: '13:00' }
    ],
    '10-05-2023': [
      { start: '10:30', end: '11:30' }
    ]
  }
}

const calendar = new Calendar(calendarPrimitives)
console.log(calendar.getAvailableSpots('10-05-2023', 40))
