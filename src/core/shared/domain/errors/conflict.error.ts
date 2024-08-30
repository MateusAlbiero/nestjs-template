export default class ConflictError extends Error {
  constructor(field: string) {
    super(`${field} already registered`);
    this.name = 'ConflictError';
  }
}
