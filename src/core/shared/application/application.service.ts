import { IUnitOfWork } from '../domain/contracts/unit-of-work.interface';

export class ApplicationService {
  constructor(public readonly uow: IUnitOfWork) {}

  async start() {
    await this.uow.start();
  }

  async finish() {
    await this.uow.commit();
  }

  async fail(_error: any, notRollback: boolean = false) {
    if (notRollback) {
      await this.uow.commit();
    } else {
      await this.uow.rollback();
    }
  }

  async run<T>(callback: () => Promise<T>): Promise<T> {
    await this.start();

    try {
      const result = await callback();

      await this.finish();

      return result;
    } catch (error) {
      await this.fail(error);

      throw error;
    }
  }
}
