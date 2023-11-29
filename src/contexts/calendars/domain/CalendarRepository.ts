import { Calendar } from './Calendar'

export interface CalendarRepository {
  find(id: number): Promise<Calendar | null>
}
