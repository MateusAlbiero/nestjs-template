export class InvalidValueError extends Error {
  constructor(field: string) {
    super(`Invalid value field ${field}`);
    this.name = 'InvalidValueError';
  }
}
