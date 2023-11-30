/**
 * Return a Date instance from given date and time
 * @param date "DD-MM-YYYY"
 * @param time "HH:mm"
 */
export function getDateInstanceFromDateAndTime (date: string, time: string): Date {
  const [day, month, year] = date.split('-')
  const [hours, minutes, seconds] = time.split(':')

  if (!day || !month || !year || day.length !== 2 || month.length !== 2 || year.length !== 4) {
    throw new Error('Invalid date format')
  }

  if (!hours || !minutes || hours.length !== 2 || minutes.length !== 2) {
    throw new Error('Invalid time format')
  }

  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds ?? '00'}.000Z`

  if (isNaN(Date.parse(isoString))) {
    throw new Error('Invalid date')
  }

  return new Date(isoString)
}
