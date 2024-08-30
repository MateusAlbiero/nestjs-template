import { Entity } from '../entities/entity';

export class NotFoundError extends Error {
  constructor(id: any[] | any, entityClass: new (...args: any[]) => Entity) {
    super(
      `${entityClass.name} not found using ID ${
        Array.isArray(id) ? id.join(', ') : id
      }`,
    );
    this.name = 'NotFoundError';
  }
}
