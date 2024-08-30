export default class NoContentError extends Error {
  constructor() {
    super(`No content`);
    this.name = 'NoContentError';
  }
}
