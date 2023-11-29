import { IntegerValueObject } from '../../../shared/domain'

export class CalendarDurationBefore extends IntegerValueObject {
  constructor (value: number) {
    super(value)
    this.ensureValueIsValid()
  }

  protected ensureValueIsValid (): void {
    const value = this.getValue()
    if (value < 0) {
      throw new Error('Calendar duration before cannot be less than zero')
    }
  }
}
