import { Entity } from '../entities/entity';

export interface IUnitOfWork {
  start(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getTransaction(): any;
  do<T>(workFn: (uow: IUnitOfWork) => Promise<T>): Promise<T>;
  addEntity(entity: Entity): void;
  getEntities(): Entity[];
}
