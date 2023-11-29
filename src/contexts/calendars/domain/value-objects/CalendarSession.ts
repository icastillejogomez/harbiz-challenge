export class CalendarSession {
  readonly date: string
  readonly sessions: { start: string; end: string }[]

  constructor (date: string, sessions:{ start: string; end: string }[]) {
    this.date = date
    this.sessions = sessions
  }
}
