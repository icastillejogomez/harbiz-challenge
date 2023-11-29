import { NumberValueObject } from './NumberValueObject'

export class IntegerValueObject extends NumberValueObject {
  constructor (value: number) {
    super(value)
    this.ensureValueIsValid()
  }

  protected ensureValueIsValid (): void {
    if (!Number.isInteger(this.getValue())) {
      throw new Error('Value must be an integer')
    }
  }
}
