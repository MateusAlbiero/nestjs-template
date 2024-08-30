import { MockEntity } from '../../domain/entities/mock.entity';

export type MockOutput = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class MockOutputMapper {
  static toOutput(entity: MockEntity): MockOutput {
    return entity.toJSON();
  }
}
