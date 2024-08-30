import { InvalidValueError } from '../errors/invalid-value.error';
import { ValueObject } from './value-object';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class Uuid extends ValueObject {
  constructor(value?: string) {
    super(value || uuidv4());
  }

  public validate(): void {
    if (!uuidValidate(this.value)) {
      throw new InvalidValueError('uuid');
    }
  }
}
