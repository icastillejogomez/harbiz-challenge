import { ValueObject } from './ValueObject'

export class DateValueObject extends ValueObject<Date> {
  constructor (date: Date | string) {
    super(new Date(date))
  }
}
