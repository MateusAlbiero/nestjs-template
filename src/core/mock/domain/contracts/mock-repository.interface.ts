import {
  IBaseRepository,
  InputParams,
  OutputParams,
} from '../../../shared/domain/contracts/base-repository.interface';
import { MockEntity, MockId } from '../entities/mock.entity';

export type MockFilter = string;

export class MockInputParams extends InputParams<MockFilter> {}

export class MockOutputParams extends OutputParams<MockEntity> {}

export interface IMockRepository
  extends IBaseRepository<
    MockEntity,
    MockId,
    MockFilter,
    MockInputParams,
    MockOutputParams
  > {}
