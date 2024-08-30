import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import UnitOfWork from '../../../../../shared/infrastructure/database/sequelize/unit-of-work';
import {
  IMockRepository,
  MockInputParams,
  MockOutputParams,
} from '../../../../domain/contracts/mock-repository.interface';
import { MockEntity, MockId } from '../../../../domain/entities/mock.entity';
import MockModel from '../models/mock.model';
import { MockModelMapper } from '../models/mock.model.mapper';

export class MockRepository implements IMockRepository {
  constructor(
    private readonly uow: UnitOfWork,
    private readonly model: typeof MockModel,
  ) {}

  sortableFields: string[];

  async getAll(props: MockInputParams): Promise<MockOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const { rows, count } = await this.model.findAndCountAll({
      offset,
      limit,
    });

    return new MockOutputParams({
      items: rows.map((row) => MockModelMapper.toEntity(row)),
      currentPage: props.page,
      perPage: props.perPage,
      total: count,
    });
  }

  async store(entity: MockEntity): Promise<void | MockEntity> {
    await this.model.create(MockModelMapper.toModel(entity).dataValues);
  }

  async getById(entity_id: MockId): Promise<MockEntity> {
    const model = await this.model.findOne({ where: { id: entity_id.value } });

    return model ? MockModelMapper.toEntity(model) : null;
  }

  async update(entity: MockEntity): Promise<void> {
    const [affectedCount] = await this.model.update(
      MockModelMapper.toModel(entity).dataValues,
      {
        where: {
          id: entity.id.value,
        },
        transaction: this.uow.getTransaction(),
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundError(entity.id.value, this.entity);
    }
  }

  async delete(entity_id: MockId): Promise<void> {
    const affectedCount = await this.model.destroy({
      where: {
        id: entity_id.value,
      },
      transaction: this.uow.getTransaction(),
    });

    if (affectedCount === 0) {
      throw new NotFoundError(entity_id.value, this.entity);
    }
  }

  get entity(): new (...args: any[]) => MockEntity {
    return MockEntity;
  }
}
