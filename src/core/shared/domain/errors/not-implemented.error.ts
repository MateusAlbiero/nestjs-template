export default class NotImplementedError extends Error {
  constructor() {
    super('Method not implemented');
    this.name = 'NotImplementedError';
  }
}
