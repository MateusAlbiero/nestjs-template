import { isEqual } from 'lodash';

export abstract class ValueObject {
  private readonly _value: any;

  constructor(value: any, needsValidation: boolean = true) {
    this._value = value;

    if (needsValidation) this.validate();
  }

  public get value() {
    return this._value;
  }

  public equal(vo: this): boolean {
    if (vo === null || vo === undefined) return false;

    if (vo.constructor.name !== this.constructor.name) return false;

    return isEqual(vo, this);
  }

  public abstract validate(): void;
}
