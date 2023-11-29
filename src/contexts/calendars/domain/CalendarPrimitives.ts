export interface CalendarPrimitives {
  id: number
  durationBefore: number
  durationAfter: number
  slots: {
    // eslint-disable-next-line no-unused-vars
    [key in string]: Array<{
      start: string
      end: string
    }>
  }
  sessions: {
    // eslint-disable-next-line no-unused-vars
    [key in string]: Array<{
      start: string
      end: string
    }>
  }
}
