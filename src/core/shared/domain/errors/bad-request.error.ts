export default class BadRequestError extends Error {
  constructor(field: string) {
    super(`${field}`);
    this.name = 'BadRequestError';
  }
}
