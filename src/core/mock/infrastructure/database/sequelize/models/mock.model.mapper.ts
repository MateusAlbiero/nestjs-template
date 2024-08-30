import { MockEntity } from '../../../../domain/entities/mock.entity';
import MockModel from './mock.model';

export class MockModelMapper {
  static toModel(entity: MockEntity) {
    return MockModel.build({
      id: entity.id.value,
    });
  }

  static toEntity(model: MockModel) {
    return MockEntity.create({
      id: model.id,
      createdAt: model.created_at,
      updatedAt: model.updated_at,
      deletedAt: model.deleted_at,
    });
  }
}
