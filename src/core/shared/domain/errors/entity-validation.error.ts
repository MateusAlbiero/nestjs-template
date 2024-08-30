import { FieldsError } from '../contracts/validator-fields.interface';

export abstract class BaseValidationError extends Error {
  constructor(
    public error: FieldsError[],
    message = 'Validation error',
  ) {
    super(message);
  }

  count() {
    return Object.keys(this.error).length;
  }
}

export class EntityValidationError extends BaseValidationError {
  constructor(public error: FieldsError[]) {
    super(error, 'Entity validation error');
    this.name = 'EntityValidationError';
  }
}
