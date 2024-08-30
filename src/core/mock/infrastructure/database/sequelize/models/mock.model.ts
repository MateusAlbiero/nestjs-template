import { Table } from 'sequelize-typescript';
import BaseModel from '../../../../../shared/infrastructure/database/sequelize/model';

export type MockModelProps = {
  id: string;
};

@Table({
  tableName: 'mocks',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
})
export default class MockModel extends BaseModel<MockModelProps> {}
