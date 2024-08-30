import { Sequelize, Transaction } from 'sequelize';
import { IUnitOfWork } from 'src/core/shared/domain/contracts/unit-of-work.interface';
import { Entity } from 'src/core/shared/domain/entities/entity';

export default class UnitOfWork implements IUnitOfWork {
  private _transaction: Transaction | null;
  private _entities: Set<Entity> = new Set<Entity>();

  constructor(public sequelize: Sequelize) {}

  async start(): Promise<void> {
    if (!this._transaction)
      this._transaction = await this.sequelize.transaction();
  }

  async commit(): Promise<void> {
    this.validateTransaction();

    await this._transaction!.commit();
    this._transaction = null;
  }

  async rollback(): Promise<void> {
    this.validateTransaction();

    await this._transaction!.rollback();
    this._transaction = null;
  }

  async do<T>(workFn: (uow: IUnitOfWork) => Promise<T>): Promise<T> {
    let isAutoTransaction = false;

    try {
      if (this._transaction) {
        const result = await workFn(this);
        this._transaction = null;
        return result;
      }

      return await this.sequelize.transaction(async (t) => {
        isAutoTransaction = true;
        this._transaction = t;
        const result = await workFn(this);
        this._transaction = null;
        return result;
      });
    } catch (error) {
      if (!isAutoTransaction) this._transaction?.rollback();
      this._transaction = null;
      throw error;
    }
  }

  addEntity(entity: Entity): void {
    if (entity) this._entities.add(entity);
  }

  addEntities(entities: Entity[]): void {
    if (entities)
      for (const entity of entities) {
        this.addEntity(entity);
      }
  }

  getEntities(): Entity[] {
    return [...this._entities];
  }

  getTransaction() {
    return this._transaction;
  }

  private validateTransaction() {
    if (!this._transaction) {
      throw new Error('No transaction started');
    }
  }
}
