import { StringValueObject } from './StringValueObject'

export class NonEmptyStringValueObject extends StringValueObject {
  constructor (value: string) {
    super(value)
    this.ensureValueIsNotAnEmptyString()
  }

  private ensureValueIsNotAnEmptyString (): void {
    if (this.getValue() === '') {
      throw new Error('Value cannot be empty')
    }
  }
}
